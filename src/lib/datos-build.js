// Descarga el PVPC horario para generar las páginas "cuánto cuesta poner..." EN EL BUILD.
// Misma fuente y misma conversión que la app (Vatio.jsx): la API devuelve EUR/MWh y se
// pasa a €/kWh dividiendo entre 1000, sin impuestos, igual que el precio por defecto de la app.

const API = 'https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real';

// Península. Es la zona de la inmensa mayoría del tráfico; las páginas lo indican.
export const GEO_PENINSULA = '8741';

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

/** Precios horarios (€/kWh sin impuestos) del día indicado. Se cachea por proceso. */
export async function cargarPrecios(fecha = fechaMadrid(), geoId = GEO_PENINSULA) {
  const clave = `${fecha}:${geoId}`;
  if (cache && cache.clave === clave) return cache.datos;

  const url = `${API}?start_date=${fecha}T00:00&end_date=${fecha}T23:59&time_trunc=hour&geo_ids=${geoId}`;
  let ultimo;
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      const series = (json.included || []).filter((s) => s?.attributes?.values?.length);
      // Se prioriza la serie PVPC, igual que hace la app.
      const pvpc =
        series.find((s) => `${s.attributes.title || s.type || ''}`.toUpperCase().includes('PVPC')) ||
        series[0];
      const values = pvpc?.attributes?.values || [];
      if (values.length < 20) throw new Error('serie incompleta (' + values.length + ')');
      const horas = values.map((v) => ({
        hora: parseInt(v.datetime.slice(11, 13), 10),
        precio: v.value / 1000, // EUR/MWh -> €/kWh
      }));
      const datos = { fecha, horas };
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
