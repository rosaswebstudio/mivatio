// Mantiene el archivo histórico mensual del PVPC en src/data/mensual.json.
//
//   node scripts/mensual.mjs             -> repasa el mes en curso y el anterior
//   node scripts/mensual.mjs --todo      -> rellena desde el principio (2021-06-01)
//   node scripts/mensual.mjs --desde 2024-01
//
// POR QUÉ EMPIEZA EL 1 DE JUNIO DE 2021: ese día entró en vigor la tarifa 2.0TD, la
// actual, con sus tramos valle, llano y punta. El fichero oficial cambia de formato
// justo ahí: antes traía las columnas GEN/NOC/VHC (peaje general, nocturno y coche
// eléctrico) y desde entonces trae PCB/CYM. Mezclar los dos sería comparar productos
// distintos, así que el archivo arranca donde arranca la tarifa.
//
// De cada mes se guardan la media, el mínimo y el máximo con su día y su hora, la serie
// de medias diarias y la media de cada hora del día. Eso último es lo que permite
// responder a "¿a qué hora salía más barata la luz en enero?" con dato propio de ese mes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DESTINO = path.join(RAIZ, 'src', 'data', 'mensual.json');
const API = 'https://api.esios.ree.es/archives/70/download_json';
const ZONA = 'PCB'; // Península, Canarias y Baleares
const INICIO = '2021-06'; // entrada en vigor de la tarifa 2.0TD
const A_LA_VEZ = 4; // peticiones en paralelo, por no castigar una API pública

const arg = (nombre, fb) => {
  const i = process.argv.indexOf(nombre);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fb;
};
const tiene = (nombre) => process.argv.includes(nombre);

const iso = (d) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);

const red = (n, dec = 5) => {
  const f = 10 ** dec;
  return Math.round(n * f) / f;
};

/** "190,37" (EUR/MWh) -> 0.19037 (€/kWh). */
const precioKwh = (txt) => {
  const n = parseFloat(String(txt).replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) ? n / 1000 : null;
};

/** Los 24 precios de un día, o null si ese día no está publicado. */
async function descargarDia(fecha) {
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const res = await fetch(`${API}?date=${fecha}`, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      const filas = json.PVPC || [];
      // Un día sin publicar responde 200 con la lista vacía. No es un fallo.
      if (!filas.length) return null;
      const horas = filas
        .map((f) => ({ hora: parseInt(String(f.Hora).slice(0, 2), 10), precio: precioKwh(f[ZONA]) }))
        .filter((h) => Number.isFinite(h.hora) && h.precio != null)
        .sort((a, b) => a.hora - b.hora);
      // Los días de cambio de hora tienen 23 o 25 horas y son válidos igual.
      if (horas.length < 20) return null;
      return horas;
    } catch (err) {
      if (intento === 3) throw err;
      await new Promise((r) => setTimeout(r, 1200 * intento));
    }
  }
}

/** Meses AAAA-MM entre dos claves, ambas incluidas. */
function rangoMeses(desde, hasta) {
  const out = [];
  let [y, m] = desde.split('-').map(Number);
  const [hy, hm] = hasta.split('-').map(Number);
  while (y < hy || (y === hy && m <= hm)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`);
    if (++m > 12) {
      m = 1;
      y++;
    }
  }
  return out;
}

const diasDelMes = (clave) => {
  const [y, m] = clave.split('-').map(Number);
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
};

/** Recorre las tareas de `n` en `n` para no lanzar 1.900 peticiones de golpe. */
async function enLotes(tareas, n, fn) {
  const salida = [];
  for (let i = 0; i < tareas.length; i += n) {
    salida.push(...(await Promise.all(tareas.slice(i, i + n).map(fn))));
    await new Promise((r) => setTimeout(r, 120));
  }
  return salida;
}

/** Descarga un mes entero y lo resume. Devuelve null si no hubo ni un día. */
async function resumirMes(clave, hoy) {
  const total = diasDelMes(clave);
  const fechas = [];
  for (let d = 1; d <= total; d++) {
    const f = `${clave}-${String(d).padStart(2, '0')}`;
    if (f <= hoy) fechas.push(f); // nunca se piden días del futuro
  }
  if (!fechas.length) return null;

  const dias = await enLotes(fechas, A_LA_VEZ, async (f) => ({ fecha: f, horas: await descargarDia(f) }));

  const diaMedia = new Array(total).fill(null);
  const diaMin = new Array(total).fill(null);
  const diaMax = new Array(total).fill(null);
  const sumaHora = new Array(24).fill(0);
  const cuentaHora = new Array(24).fill(0);
  let min = null;
  let max = null;
  let suma = 0;
  let n = 0;

  for (const { fecha, horas } of dias) {
    if (!horas) continue;
    const d = Number(fecha.slice(8, 10));
    const precios = horas.map((h) => h.precio);
    const mediaDia = precios.reduce((a, b) => a + b, 0) / precios.length;
    diaMedia[d - 1] = red(mediaDia);
    diaMin[d - 1] = red(Math.min(...precios));
    diaMax[d - 1] = red(Math.max(...precios));
    suma += mediaDia;
    n++;
    for (const h of horas) {
      // En el día de 25 horas se repite la 2; sumar las dos y promediar es lo correcto.
      if (h.hora >= 0 && h.hora < 24) {
        sumaHora[h.hora] += h.precio;
        cuentaHora[h.hora]++;
      }
      if (!min || h.precio < min.v) min = { v: red(h.precio), d, h: h.hora };
      if (!max || h.precio > max.v) max = { v: red(h.precio), d, h: h.hora };
    }
  }

  if (!n) return null;
  return {
    n,
    completo: n === total,
    media: red(suma / n),
    min,
    max,
    diaMedia,
    diaMin,
    diaMax,
    horas: sumaHora.map((s, i) => (cuentaHora[i] ? red(s / cuentaHora[i]) : null)),
  };
}

function leerExistente() {
  try {
    return JSON.parse(fs.readFileSync(DESTINO, 'utf8'));
  } catch {
    return { actualizado: null, meses: {} };
  }
}

async function main() {
  const hoy = iso(new Date());
  const mesActual = hoy.slice(0, 7);
  const datos = leerExistente();

  let objetivo;
  if (tiene('--todo')) {
    objetivo = rangoMeses(INICIO, mesActual);
  } else if (arg('--desde', null)) {
    objetivo = rangoMeses(arg('--desde'), mesActual);
  } else {
    // Marcha normal del rebuild diario: el mes en curso siempre, y el anterior por si el
    // cambio de mes pilló al vuelo un día a medio publicar.
    const previos = rangoMeses(INICIO, mesActual);
    objetivo = previos.slice(-2);
  }

  // Un mes ya cerrado y completo no se vuelve a pedir: el PVPC pasado no cambia.
  const pendientes = objetivo.filter((m) => {
    const g = datos.meses[m];
    return !g || !g.completo || m === mesActual;
  });

  if (!pendientes.length) {
    console.log('Archivo mensual ya al día.');
    return;
  }
  console.log(`Meses por descargar: ${pendientes.length} (${pendientes[0]} … ${pendientes[pendientes.length - 1]})`);

  let fallos = 0;
  for (const clave of pendientes) {
    try {
      const resumen = await resumirMes(clave, hoy);
      if (resumen) {
        datos.meses[clave] = resumen;
        console.log(`  ${clave} ok · ${resumen.n} días · media ${(resumen.media * 100).toFixed(2)} cent`);
      } else {
        console.warn(`  ${clave} sin datos`);
        fallos++;
      }
    } catch (err) {
      console.warn(`  ${clave} FALLO: ${err.message}`);
      fallos++;
    }
  }

  // Se reescribe con las claves ordenadas, para que el diff del commit diario sea legible.
  const ordenado = {};
  for (const k of Object.keys(datos.meses).sort()) ordenado[k] = datos.meses[k];
  const salida = { actualizado: hoy, desde: INICIO, zona: ZONA, meses: ordenado };

  fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
  fs.writeFileSync(DESTINO, JSON.stringify(salida));
  const kb = Math.round(fs.statSync(DESTINO).size / 1024);
  console.log(`Guardado: ${Object.keys(ordenado).length} meses, ${kb} KB.`);
  if (fallos && !Object.keys(ordenado).length) process.exitCode = 1;
}

main();
