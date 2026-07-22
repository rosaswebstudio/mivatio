// Mantiene el histórico del precio medio diario del PVPC en src/data/historico.json.
//
//   node scripts/historico.mjs            -> añade el día de hoy
//   node scripts/historico.mjs --dias 90  -> rellena hacia atrás los últimos 90 días
//
// La API de Red Eléctrica sirve fechas pasadas, así que el histórico se puede rellenar
// de golpe en vez de esperar meses. De cada día solo se guardan la media, el mínimo y
// el máximo (Península), de modo que el archivo queda pequeño.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DESTINO = path.join(RAIZ, 'src', 'data', 'historico.json');
const API = 'https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real';
const GEO = '8741'; // Península
const DIAS_MAX = 400;

const arg = (nombre, fb) => {
  const i = process.argv.indexOf(nombre);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fb;
};

// Fecha en la zona peninsular aunque el runner vaya en UTC.
const iso = (d) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(d);

const redondear = (n) => Math.round(n * 10000) / 10000;

async function descargarDia(fecha) {
  const url = `${API}?start_date=${fecha}T00:00&end_date=${fecha}T23:59&time_trunc=hour&geo_ids=${GEO}`;
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      const series = (json.included || []).filter((s) => s?.attributes?.values?.length);
      const pvpc =
        series.find((s) => `${s.attributes.title || s.type || ''}`.toUpperCase().includes('PVPC')) ||
        series[0];
      const valores = (pvpc?.attributes?.values || []).map((v) => v.value / 1000);
      if (valores.length < 20) throw new Error('serie incompleta (' + valores.length + ')');
      return {
        media: redondear(valores.reduce((a, b) => a + b, 0) / valores.length),
        min: redondear(Math.min(...valores)),
        max: redondear(Math.max(...valores)),
      };
    } catch (err) {
      if (intento === 3) throw err;
      await new Promise((r) => setTimeout(r, 1500 * intento));
    }
  }
}

function leerExistente() {
  try {
    return JSON.parse(fs.readFileSync(DESTINO, 'utf8'));
  } catch {
    return { fechas: [], media: [], min: [], max: [] };
  }
}

async function main() {
  const dias = Number(arg('--dias', '1'));
  const datos = leerExistente();
  const indice = new Map(datos.fechas.map((f, i) => [f, i]));

  const hoy = new Date();
  const pendientes = [];
  for (let i = 0; i < dias; i++) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    const f = iso(d);
    if (i === 0 || !indice.has(f)) pendientes.push(f); // hoy siempre se recalcula
  }

  if (!pendientes.length) {
    console.log('Histórico ya al día.');
    return;
  }
  console.log(`Descargando ${pendientes.length} día(s)...`);

  const nuevos = new Map();
  for (const f of pendientes.sort()) {
    try {
      nuevos.set(f, await descargarDia(f));
      console.log(`  ${f} ok`);
    } catch (err) {
      console.warn(`  ${f} FALLO: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  if (!nuevos.size) {
    console.log('No se descargó ningún día.');
    process.exitCode = 1;
    return;
  }

  const fechas = [...new Set([...datos.fechas, ...nuevos.keys()])].sort().slice(-DIAS_MAX);
  const campo = (nombre, f) => {
    const n = nuevos.get(f);
    if (n) return n[nombre];
    const i = indice.get(f);
    return i == null ? null : datos[nombre][i] ?? null;
  };

  const salida = {
    actualizado: iso(hoy),
    fechas,
    media: fechas.map((f) => campo('media', f)),
    min: fechas.map((f) => campo('min', f)),
    max: fechas.map((f) => campo('max', f)),
  };

  fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
  fs.writeFileSync(DESTINO, JSON.stringify(salida));
  const kb = Math.round(fs.statSync(DESTINO).size / 1024);
  console.log(`Guardado: ${fechas.length} días, ${kb} KB.`);
}

main();
