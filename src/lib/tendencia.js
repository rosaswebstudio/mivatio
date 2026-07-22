// Analiza la serie del precio medio diario del PVPC para describir su tendencia.
// Describe lo que ha pasado; no predice (la luz no se puede almacenar, así que aquí
// no hay "compra hoy o espera": es solo contexto sobre cómo evoluciona el precio).

const media = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

// Por debajo de este cambio semanal el movimiento es ruido, no tendencia.
const UMBRAL = 0.01; // 1%

/**
 * @param {(number|null)[]} valores serie diaria, del día más antiguo al más reciente
 */
export function analizar(valores) {
  const serie = (valores || []).filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (serie.length < 8) return null; // sin dos semanas no hay tendencia que valga

  const actual = serie[serie.length - 1];
  const m = media(serie);

  const m7 = media(serie.slice(-7));
  const previos = serie.slice(-14, -7);
  const mPrev = previos.length >= 3 ? media(previos) : m7;
  const variacionSemanal = mPrev ? (m7 - mPrev) / mPrev : 0;

  let estado = 'estable';
  if (variacionSemanal > UMBRAL) estado = 'subiendo';
  else if (variacionSemanal < -UMBRAL) estado = 'bajando';

  return {
    actual,
    media: m,
    media7: m7,
    minimo: Math.min(...serie),
    maximo: Math.max(...serie),
    cambioPct: mPrev ? (m7 - mPrev) / mPrev : 0,
    estado,
    vsMediaPct: m ? (actual - m) / m : 0,
    dias: serie.length,
  };
}

/** Titular y explicación de la tendencia del precio de la luz. */
export function veredicto(a) {
  if (!a) return null;
  const pct = Math.abs(a.cambioPct * 100).toFixed(0);

  if (a.estado === 'subiendo') {
    return {
      titulo: 'El precio de la luz está subiendo',
      texto: `La media diaria del PVPC ha subido en torno a un ${pct}% en la última semana respecto a la anterior. Mientras dure la subida, cobra más importancia concentrar el consumo en las horas baratas del día.`,
      color: 'rojo',
    };
  }
  if (a.estado === 'bajando') {
    return {
      titulo: 'El precio de la luz está bajando',
      texto: `La media diaria del PVPC ha bajado alrededor de un ${pct}% en la última semana respecto a la anterior. Aun así, la diferencia entre las horas caras y baratas de cada día sigue siendo lo que más pesa en la factura.`,
      color: 'verde',
    };
  }
  return {
    titulo: 'El precio de la luz está estable',
    texto: 'La media diaria del PVPC apenas se ha movido en la última semana. Lo que de verdad cambia tu factura no es tanto el día que elijas como la hora: dentro de una misma jornada hay diferencias enormes entre las horas caras y las baratas.',
    color: 'neutro',
  };
}

/** Puntos de una polilínea SVG a partir de la serie (ignora huecos). */
export function puntosSparkline(valores, ancho, alto) {
  const idx = [];
  (valores || []).forEach((v, i) => {
    if (typeof v === 'number' && Number.isFinite(v)) idx.push([i, v]);
  });
  if (idx.length < 2) return '';
  const vs = idx.map(([, v]) => v);
  const min = Math.min(...vs);
  const max = Math.max(...vs);
  const rango = max - min || 1;
  const n = valores.length - 1 || 1;
  return idx
    .map(([i, v]) => {
      const x = (i / n) * ancho;
      const y = alto - ((v - min) / rango) * alto;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}
