// Lectura del archivo histórico mensual (src/data/mensual.json) para las páginas
// /precio-luz/[año]/ y /precio-luz/[año]/[mes]/.
//
// El JSON guarda lo justo (medias diarias, extremos y perfil horario); todo lo que se
// deriva de ahí (variaciones, rankings, franjas) se calcula aquí una sola vez y lo usan
// las tres plantillas, para que los números que se cruzan entre páginas nunca discrepen.

export const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
export const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** Nombre del mes a partir del número 1-12. */
export const nombreMes = (m) => MESES[m - 1];
/** "julio" -> 7, o null si no es un mes. */
export const mesDesdeSlug = (slug) => {
  const i = MESES.indexOf(String(slug).toLowerCase());
  return i < 0 ? null : i + 1;
};

export const rutaMes = (anio, mes) => `/precio-luz/${anio}/${MESES[mes - 1]}/`;
export const rutaAnio = (anio) => `/precio-luz/${anio}/`;

/** €/kWh -> céntimos con 2 decimales ("16,06"). */
export const cent = (n, dec = 2) =>
  (n * 100).toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });
/** €/kWh con los 5 decimales del dato oficial. */
export const eur = (n) =>
  n.toLocaleString('es-ES', { minimumFractionDigits: 5, maximumFractionDigits: 5 });
export const hh = (h) => `${String(h).padStart(2, '0')}:00`;
/** Variación en porcentaje, con signo y una cifra. */
export const pct = (n) =>
  `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toLocaleString('es-ES', { maximumFractionDigits: 1 })} %`;

/**
 * Franja seguida de `duracion` horas con la media más baja y más alta del perfil horario.
 * Sirve para decir "por las tardes" o "de madrugada" sin que sea una impresión: sale del dato.
 */
export function franjaHoraria(horas, duracion = 3) {
  const v = horas.map((x) => (typeof x === 'number' ? x : null));
  let mejor = null;
  let peor = null;
  for (let i = 0; i + duracion <= 24; i++) {
    const bloque = v.slice(i, i + duracion);
    if (bloque.some((x) => x == null)) continue;
    const media = bloque.reduce((a, b) => a + b, 0) / duracion;
    const cand = { inicio: i, fin: (i + duracion) % 24, media };
    if (!mejor || media < mejor.media) mejor = cand;
    if (!peor || media > peor.media) peor = cand;
  }
  return { mejor, peor };
}

/** Índice de la hora más barata y más cara de un perfil de 24 valores. */
export function extremosHorarios(horas) {
  let barata = -1;
  let cara = -1;
  horas.forEach((v, i) => {
    if (typeof v !== 'number') return;
    if (barata < 0 || v < horas[barata]) barata = i;
    if (cara < 0 || v > horas[cara]) cara = i;
  });
  return { barata, cara };
}

/**
 * Todos los meses del archivo, en orden cronológico y con lo derivado ya calculado:
 * variación contra el mes anterior, contra el mismo mes del año pasado y puesto en el
 * ranking de caros. Devolver la lista entera (y no el mes suelto) es lo que permite que
 * cada página se sitúe respecto a las demás.
 */
export function listaMeses(archivo) {
  const claves = Object.keys(archivo.meses).sort();
  const base = claves.map((clave) => {
    const g = archivo.meses[clave];
    const [anio, mes] = clave.split('-').map(Number);
    return {
      clave,
      anio,
      mes,
      nombreMes: MESES[mes - 1],
      nombre: `${MESES[mes - 1]} de ${anio}`,
      ruta: rutaMes(anio, mes),
      ...g,
    };
  });

  const porClave = new Map(base.map((m) => [m.clave, m]));
  // Ranking de más caro a más barato. Los meses a medias (el que está corriendo) también
  // entran: su media es la de los días que lleva, y así se dice en la página.
  const orden = [...base].sort((a, b) => b.media - a.media);
  const puesto = new Map(orden.map((m, i) => [m.clave, i + 1]));

  return base.map((m, i) => {
    const anterior = i > 0 ? base[i - 1] : null;
    const claveInter = `${m.anio - 1}-${String(m.mes).padStart(2, '0')}`;
    const interanual = porClave.get(claveInter) || null;
    return {
      ...m,
      anterior,
      siguiente: i < base.length - 1 ? base[i + 1] : null,
      variacion: anterior ? ((m.media - anterior.media) / anterior.media) * 100 : null,
      interanual,
      variacionInteranual: interanual ? ((m.media - interanual.media) / interanual.media) * 100 : null,
      puesto: puesto.get(m.clave),
      total: base.length,
    };
  });
}

/** Agrupa los meses por año natural, con la media anual ponderada por días. */
export function listaAnios(meses) {
  const porAnio = new Map();
  for (const m of meses) {
    if (!porAnio.has(m.anio)) porAnio.set(m.anio, []);
    porAnio.get(m.anio).push(m);
  }
  const anios = [...porAnio.entries()]
    .map(([anio, ms]) => {
      // Ponderada por número de días: un mes con 6 días no puede pesar lo mismo que uno
      // con 31 en la media del año.
      const dias = ms.reduce((a, m) => a + m.n, 0);
      const media = ms.reduce((a, m) => a + m.media * m.n, 0) / dias;
      const masBarato = ms.reduce((a, m) => (m.media < a.media ? m : a), ms[0]);
      const masCaro = ms.reduce((a, m) => (m.media > a.media ? m : a), ms[0]);
      // Perfil horario del año: media de las horas de sus meses, ponderada por días.
      const horas = Array.from({ length: 24 }, (_, h) => {
        let suma = 0;
        let n = 0;
        for (const m of ms) {
          if (typeof m.horas[h] === 'number') {
            suma += m.horas[h] * m.n;
            n += m.n;
          }
        }
        return n ? suma / n : null;
      });
      const minAbs = ms.reduce((a, m) => (m.min.v < a.min.v ? m : a), ms[0]);
      const maxAbs = ms.reduce((a, m) => (m.max.v > a.max.v ? m : a), ms[0]);
      return {
        anio,
        ruta: rutaAnio(anio),
        meses: ms,
        dias,
        media,
        completo: ms.length === 12 && ms.every((m) => m.completo),
        masBarato,
        masCaro,
        horas,
        min: { ...minAbs.min, mes: minAbs.mes },
        max: { ...maxAbs.max, mes: maxAbs.mes },
      };
    })
    .sort((a, b) => a.anio - b.anio);

  return anios.map((a, i) => ({
    ...a,
    anterior: i > 0 ? anios[i - 1] : null,
    siguiente: i < anios.length - 1 ? anios[i + 1] : null,
    variacion: i > 0 ? ((a.media - anios[i - 1].media) / anios[i - 1].media) * 100 : null,
  }));
}

/**
 * Los últimos `n` días con dato, en el formato de arrays paralelos que espera la gráfica
 * de tendencia de la portada.
 *
 * El archivo mensual ya guarda la media, el mínimo y el máximo de cada día, así que la
 * tendencia sale de aquí en vez de un segundo fichero: un solo origen de datos, un solo
 * script en el cron y ninguna posibilidad de que las dos series discrepen.
 */
export function ultimosDias(archivo, n = 90) {
  const fechas = [];
  const media = [];
  const min = [];
  const max = [];
  for (const clave of Object.keys(archivo.meses).sort()) {
    const g = archivo.meses[clave];
    g.diaMedia.forEach((v, i) => {
      if (typeof v !== 'number') return;
      fechas.push(`${clave}-${String(i + 1).padStart(2, '0')}`);
      media.push(v);
      min.push(g.diaMin[i]);
      max.push(g.diaMax[i]);
    });
  }
  return {
    fechas: fechas.slice(-n),
    media: media.slice(-n),
    min: min.slice(-n),
    max: max.slice(-n),
  };
}

/** Serie lista para GraficaLinea a partir de las medias diarias de un mes. */
export function serieDiaria(mes) {
  const out = [];
  mes.diaMedia.forEach((v, i) => {
    if (typeof v !== 'number') return;
    out.push({
      fecha: `${mes.clave}-${String(i + 1).padStart(2, '0')}`,
      valor: v,
      etiqueta: `${i + 1} de ${mes.nombreMes}`,
    });
  });
  return out;
}

/** Serie lista para GraficaLinea a partir de las medias mensuales. */
export function serieMensual(meses) {
  return meses.map((m) => ({
    fecha: m.clave,
    valor: m.media,
    etiqueta: `${MESES_CORTOS[m.mes - 1]} '${String(m.anio).slice(2)}`,
  }));
}

/**
 * Lectura escrita de un mes concreto.
 *
 * Las tablas de abajo ya dan el dato; esto da la conclusión, y la conclusión cambia de
 * un mes a otro porque lo que se mide es el COMPORTAMIENTO del precio, no su nivel:
 * cuánto se movió de un día a otro, si hubo horas regaladas o incluso negativas, cuánto
 * separó el fin de semana del día laborable y qué puesto ocupa el mes en todo el archivo.
 * Dos meses con la misma media pueden haber sido completamente distintos de vivir.
 */
export function analisisMes({ m, meses, indice }) {
  const bloques = [];
  const dias = (m.diaMedia || []).filter((v) => typeof v === 'number');
  if (dias.length < 10) return bloques;

  const c2 = (v) => cent(v, 2);
  const diaMin = Math.min(...dias);
  const diaMax = Math.max(...dias);

  /* --- 1. Cuánto se movió el precio dentro del mes --------------------- */
  {
    const veces = diaMin > 0.001 ? diaMax / diaMin : null;
    const p = [];
    if (veces && veces >= 3) {
      p.push(
        `${m.nombre} fue un mes movido: entre el día más barato (${c2(diaMin)} céntimos de media) y el más caro (${c2(diaMax)}) hubo ${veces.toLocaleString('es-ES', { maximumFractionDigits: 1 })} veces de diferencia. Con saltos así, mover un consumo grande (la lavadora, la secadora, cargar el coche) de un día a otro de la misma semana cambia más la factura que elegir la hora dentro del día.`
      );
    } else if (veces && veces >= 1.8) {
      p.push(
        `Dentro de ${m.nombre} el precio osciló de forma apreciable: el día más barato cerró en ${c2(diaMin)} céntimos de media y el más caro en ${c2(diaMax)}, ${veces >= 2 ? "algo más del doble" : "cerca del doble"}. Es un comportamiento normal para el PVPC, donde el viento y la demanda mueven el precio de un día para otro.`
      );
    } else {
      p.push(
        `${m.nombre} fue un mes tranquilo: entre el día más barato (${c2(diaMin)} céntimos) y el más caro (${c2(diaMax)}) apenas hubo recorrido. Cuando el precio se mantiene así de plano día tras día, lo único que queda para ahorrar es elegir bien la hora dentro de cada jornada.`
      );
    }
    bloques.push({ h: `Cuánto se movió el precio dentro de ${m.nombre}`, p });
  }

  /* --- 2. Horas regaladas o negativas (solo cuando ocurre) -------------- */
  if (m.min && typeof m.min.v === 'number') {
    const p = [];
    if (m.min.v < 0) {
      p.push(
        `En ${m.nombre} la luz llegó a tener <strong>precio negativo</strong>: el día ${m.min.d} a las ${hh(m.min.h)} el PVPC marcó ${c2(m.min.v)} céntimos el kWh. No es un error. Ocurre cuando hay más producción renovable de la que el sistema puede absorber en esa hora y sale más barato pagar por colocar la energía que parar las plantas.`
      );
      p.push(
        `Para una casa con PVPC significa que esa hora el término de energía no costó nada; lo que se sigue pagando son los peajes, los impuestos y el término de potencia. Son horas que conviene aprovechar para lo que se pueda mover: el termo, el coche, la lavadora.`
      );
      bloques.push({ h: 'El mes en que la luz valió menos que cero', p });
    } else if (m.min.v < 0.01) {
      p.push(
        `El mínimo de ${m.nombre} fue de ${c2(m.min.v)} céntimos el kWh, el día ${m.min.d} a las ${hh(m.min.h)}: prácticamente regalada. Son horas de exceso de producción renovable, y aunque duren poco, es cuando sale a cuenta poner en marcha todo lo que se pueda programar.`
      );
      bloques.push({ h: 'La hora más barata del mes', p });
    }
  }

  /* --- 3. Laborables frente a fin de semana ---------------------------- */
  if (m.anio && m.mes && dias.length >= 20) {
    const finde = [];
    const laboral = [];
    (m.diaMedia || []).forEach((v, i) => {
      if (typeof v !== 'number') return;
      const d = new Date(Date.UTC(m.anio, m.mes - 1, i + 1)).getUTCDay();
      (d === 0 || d === 6 ? finde : laboral).push(v);
    });
    if (finde.length >= 6 && laboral.length >= 10) {
      const mf = finde.reduce((a, b) => a + b, 0) / finde.length;
      const ml = laboral.reduce((a, b) => a + b, 0) / laboral.length;
      const dif = ml - mf;
      const pctDif = ml ? (dif / ml) * 100 : 0;
      const p = [];
      if (pctDif >= 8) {
        p.push(
          `El fin de semana salió notablemente más barato que el día laborable: ${c2(mf)} céntimos de media en sábados y domingos frente a ${c2(ml)} de lunes a viernes, un ${pctDif.toLocaleString('es-ES', { maximumFractionDigits: 0 })}% menos. La industria para, la demanda baja y el precio con ella.`
        );
        p.push(
          `Es un patrón que se repite casi todos los meses y que casi nadie aprovecha: dejar la colada, la plancha y el lavavajillas para el sábado por la mañana ahorra, sin tener que mirar ninguna tabla.`
        );
      } else if (pctDif >= 2) {
        p.push(
          `Los fines de semana de ${m.nombre} salieron algo más baratos que los días laborables (${c2(mf)} frente a ${c2(ml)} céntimos de media), la diferencia habitual que deja la caída de demanda industrial. No es espectacular, pero va en la dirección de siempre.`
        );
      } else {
        p.push(
          `En ${m.nombre} apenas hubo diferencia entre el fin de semana y el día laborable (${c2(mf)} frente a ${c2(ml)} céntimos de media). Cuando pasa esto, el precio no lo está marcando la demanda sino la generación: un mes de poco viento o de mucha, que afecta igual los siete días.`
        );
      }
      bloques.push({ h: 'Fin de semana o día laborable', p });
    }
  }

  /* --- 4. El mes dentro del archivo completo ---------------------------- */
  if (Array.isArray(meses) && meses.length >= 12 && typeof indice === 'number') {
    const orden = [...meses].sort((a, b) => a.media - b.media);
    const pos = orden.findIndex((x) => x.clave === m.clave) + 1;
    if (pos > 0) {
      const tot = orden.length;
      const p = [];
      if (pos <= 3) {
        p.push(
          `Puesto en contexto, ${m.nombre} fue <strong>uno de los meses más baratos</strong> de todo el archivo: el número ${pos} de los ${tot} registrados desde 2021, con ${c2(m.media)} céntimos de media.`
        );
      } else if (pos >= tot - 2) {
        p.push(
          `Puesto en contexto, ${m.nombre} fue <strong>de los meses más caros</strong> de todo el archivo: el número ${tot - pos + 1} empezando por arriba, de los ${tot} registrados desde 2021, con ${c2(m.media)} céntimos de media.`
        );
      } else {
        p.push(
          `En el conjunto del archivo, ${m.nombre} ocupa el puesto ${pos} de ${tot} meses ordenados de más barato a más caro, con ${c2(m.media)} céntimos de media.`
        );
      }
      const factura = m.media * 270;
      p.push(
        `Trasladado a una casa, con un consumo de 270 kWh al mes (lo típico de un hogar de tres personas) el término de energía de ese mes habría salido por unos ${factura.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €, a los que luego hay que sumar el término de potencia, los peajes y los impuestos.`
      );
      bloques.push({ h: `${m.nombre} frente al resto del archivo`, p });
    }
  }

  return bloques;
}
