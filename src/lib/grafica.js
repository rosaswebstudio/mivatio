// Matemática de la gráfica de línea/área: a partir de una serie {fecha, valor} calcula
// las coordenadas SVG, la curva suavizada (Catmull-Rom → Bézier) y los ejes.
// Puro cálculo, sin DOM: lo usan tanto GraficaLinea.astro (build) como su script de hover
// en el cliente (mismo criterio de escala, para que el crosshair caiga justo en la curva).

const PAD = { arriba: 16, abajo: 28, izquierda: 8, derecha: 8 };

/**
 * @param {{fecha: string, valor: number}[]} serie - ya filtrada de nulos, en orden.
 * @param {{ancho: number, alto: number, numEtiquetasX?: number}} opciones
 */
export function calcularGrafica(serie, { ancho, alto, numEtiquetasX = 6 }) {
  const n = serie.length;
  const valores = serie.map((p) => p.valor);
  const vMin = Math.min(...valores);
  const vMax = Math.max(...valores);
  // Un 8% de aire arriba y abajo para que el trazo no toque el borde del área de dibujo.
  const margen = (vMax - vMin || vMax || 1) * 0.08;
  const yMin = vMin - margen;
  const yMax = vMax + margen;

  const x0 = PAD.izquierda;
  const x1 = ancho - PAD.derecha;
  const y0 = alto - PAD.abajo;
  const y1 = PAD.arriba;

  const xDe = (i) => (n <= 1 ? (x0 + x1) / 2 : x0 + ((x1 - x0) * i) / (n - 1));
  const yDe = (v) => y0 + ((y1 - y0) * (v - yMin)) / (yMax - yMin);

  const puntos = serie.map((p, i) => ({ ...p, x: xDe(i), y: yDe(p.valor), i }));

  return {
    puntos,
    baseY: y0,
    areaTop: y1,
    pathLinea: puntos.length > 1 ? suavizar(puntos, false) : '',
    pathArea: puntos.length > 1 ? `${suavizar(puntos, true)} L${xDe(n - 1)},${y0} L${xDe(0)},${y0} Z` : '',
    ejeY: [
      { y: yDe(yMax), valor: vMax },
      { y: yDe((vMin + vMax) / 2), valor: (vMin + vMax) / 2 },
      { y: yDe(vMin), valor: vMin },
    ],
    ejeX: etiquetasX(serie, xDe, numEtiquetasX),
    escala: { x0, x1, y0, y1, yMin, yMax, xDe, yDe },
  };
}

/** Curva Catmull-Rom pasada a Bézier cúbica: curva suave que pasa por todos los puntos. */
function suavizar(puntos, soloLinea) {
  const p = puntos;
  let d = `M${p[0].x},${p[0].y}`;
  for (let i = 0; i < p.length - 1; i += 1) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

/** Reparte ~numEtiquetas fechas a lo largo del eje X, siempre incluyendo la primera y la última. */
function etiquetasX(serie, xDe, numEtiquetas) {
  const n = serie.length;
  if (n === 0) return [];
  if (n <= numEtiquetas) return serie.map((p, i) => ({ x: xDe(i), texto: p.etiqueta }));
  const paso = (n - 1) / (numEtiquetas - 1);
  const indices = new Set([...Array(numEtiquetas)].map((_, k) => Math.round(k * paso)));
  return [...indices].sort((a, b) => a - b).map((i) => ({ x: xDe(i), texto: serie[i].etiqueta }));
}
