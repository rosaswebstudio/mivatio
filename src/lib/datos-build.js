// Descarga el PVPC horario para generar las páginas EN EL BUILD.
//
// FUENTE: el fichero oficial del PVPC de ESIOS (Red Eléctrica). Es público, no pide token
// y sirve CORS abierto, así que lo usan igual el build y la app del navegador.
//
// Por qué no la otra API de REE (`precios-mercados-tiempo-real`): esa devuelve UNA sola
// serie de PVPC y **ignora los parámetros de zona** (`geo_ids` y `geo_limit`). Comprobado
// pidiéndole el mismo día para Península, Canarias y Ceuta: los tres dan valores
// idénticos. Este fichero, en cambio, trae las dos series territoriales que de verdad
// existen, y que algunos días se separan mucho.
//
// La API devuelve EUR/MWh en texto con coma decimal; aquí se pasa a €/kWh sin impuestos.
const API = 'https://api.esios.ree.es/archives/70/download_json';

// Las DOS zonas del PVPC. No son cinco: el propio fichero oficial agrupa Península,
// Canarias y Baleares en una sola serie (PCB) y deja aparte Ceuta y Melilla (CYM).
export const ZONA_PCB = 'PCB'; // Península, Canarias y Baleares
export const ZONA_CYM = 'CYM'; // Ceuta y Melilla

// Nombre anterior, mantenido para no romper llamadas existentes.
export const GEO_PENINSULA = ZONA_PCB;

/** "190,37" (EUR/MWh) -> 0.19037 (€/kWh). */
function precioKwh(txt) {
  const n = parseFloat(String(txt).replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) ? n / 1000 : null;
}

/** Fecha de hoy en la zona horaria peninsular, aunque el build corra en UTC. */
export function fechaMadrid(d = new Date()) {
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
  return p; // en-CA da directamente AAAA-MM-DD
}

let cache = null;

/** Precios horarios (€/kWh sin impuestos) del día y la zona indicados. */
export async function cargarPrecios(fecha = fechaMadrid(), zona = ZONA_PCB) {
  const clave = `${fecha}:${zona}`;
  if (cache && cache.clave === clave) return cache.datos;

  const url = `${API}?date=${fecha}`;
  let ultimo;
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      const filas = json.PVPC || [];
      // Cuando el día aún no está publicado, el servidor responde 200 con la lista
      // vacía en vez de dar error. No es un fallo: es que todavía no existe.
      if (filas.length < 20) throw new Error('serie incompleta (' + filas.length + ')');
      const horas = filas
        .map((f) => ({
          hora: parseInt(String(f.Hora).slice(0, 2), 10),
          precio: precioKwh(f[zona]),
        }))
        .filter((h) => Number.isFinite(h.hora) && h.precio != null);
      if (horas.length < 20) throw new Error('zona ' + zona + ' sin datos suficientes');
      const datos = { fecha, zona, horas };
      cache = { clave, datos };
      return datos;
    } catch (err) {
      ultimo = err;
      if (intento < 3) await new Promise((r) => setTimeout(r, 1500 * intento));
    }
  }
  throw new Error('No se pudo descargar el PVPC para el build: ' + ultimo.message);
}

/**
 * Igual que `cargarPrecios`, pero devuelve null en vez de reventar el build.
 *
 * Hace falta para la página de mañana: Red Eléctrica publica los precios del día
 * siguiente a partir de las 20:15, así que cualquier build anterior a esa hora se
 * encuentra sin datos, y eso no es un error, es lo normal media jornada.
 */
export async function cargarPreciosOpcional(fecha, zona = ZONA_PCB) {
  try {
    return await cargarPrecios(fecha, zona);
  } catch {
    return null;
  }
}

/** Día siguiente a una fecha AAAA-MM-DD, sin líos de zona horaria. */
export function diaSiguiente(fecha) {
  const [a, m, d] = fecha.split('-').map(Number);
  const dt = new Date(Date.UTC(a, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + 1);
  return dt.toISOString().slice(0, 10);
}

/** "2026-08-06" -> "jueves, 6 de agosto de 2026". */
export function fechaLarga(fecha) {
  const [a, m, d] = fecha.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d)).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Las `n` horas más baratas del día, de más barata a menos. No tienen por qué ser
 * seguidas: es la respuesta a "¿a qué horas pongo la lavadora?", no a "¿qué bloque cojo?".
 */
export function horasMasBaratas(horas, n = 5) {
  return [...horas].sort((a, b) => a.precio - b.precio).slice(0, n);
}

/**
 * Franja contigua de `duracion` horas más barata y más cara del día.
 * No se da la vuelta a medianoche: son bloques dentro del mismo día.
 */
export function franjas(horas, duracion) {
  const n = horas.length;
  const largo = Math.max(1, Math.min(duracion, n));
  let mejor = null;
  let peor = null;
  for (let i = 0; i + largo <= n; i++) {
    const bloque = horas.slice(i, i + largo);
    const media = bloque.reduce((a, b) => a + b.precio, 0) / largo;
    const cand = { inicio: bloque[0].hora, fin: bloque[largo - 1].hora, media };
    if (!mejor || media < mejor.media) mejor = cand;
    if (!peor || media > peor.media) peor = cand;
  }
  return { mejor, peor };
}

/** Estadísticas del día completo. */
export function resumenDia(horas) {
  const precios = horas.map((h) => h.precio);
  const min = Math.min(...precios);
  const max = Math.max(...precios);
  return {
    min,
    max,
    media: precios.reduce((a, b) => a + b, 0) / precios.length,
    horaMin: horas.find((h) => h.precio === min)?.hora ?? 0,
    horaMax: horas.find((h) => h.precio === max)?.hora ?? 0,
  };
}
