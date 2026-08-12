// Índice de las guías. Vive aquí y no en cada página para que el listado, los enlaces
// entre guías y el sitemap salgan todos de la misma fuente y no se desincronicen.
//
// `actualizada` es la fecha real de la última revisión del texto. Si se retoca una guía,
// se cambia aquí: es lo que se enseña al lector y lo que va en el JSON-LD.

export const GUIAS = [
  {
    slug: 'como-se-forma-el-precio-de-la-luz',
    tema: 'Mercado',
    titulo: 'Cómo se forma el precio de la luz en España, hora a hora',
    description:
      'Quién decide lo que cuesta el kWh cada hora: la subasta diaria, el precio marginal, por qué la solar hunde el precio del mediodía y cómo se traduce todo eso al PVPC.',
    resumen:
      'La subasta que fija el precio de cada hora, por qué una sola central puede marcar lo que pagan todas y qué cambió en el PVPC en 2026.',
    minutos: 9,
    actualizada: '2026-08-12',
  },
  {
    slug: 'como-leer-la-factura-de-la-luz',
    tema: 'Factura',
    titulo: 'Cómo leer la factura de la luz sin perderte',
    description:
      'Qué es cada línea de la factura: término de potencia, término de energía, peajes, cargos, impuesto eléctrico, alquiler del contador e IVA, con las cifras oficiales de 2026.',
    resumen:
      'Línea por línea, qué parte de tu factura depende de ti, cuál fija el Gobierno y cuál pone tu comercializadora.',
    minutos: 10,
    actualizada: '2026-08-12',
  },
  {
    slug: 'punta-llano-valle',
    tema: 'Factura',
    titulo: 'Punta, llano y valle: qué son y a quién afectan de verdad',
    description:
      'Los tres tramos horarios de la tarifa 2.0TD, con su horario exacto, y por qué en el PVPC importan menos de lo que parece.',
    resumen:
      'El horario exacto de los tres tramos, qué días no cuentan y por qué con PVPC no son la señal que debes mirar.',
    minutos: 7,
    actualizada: '2026-08-12',
  },
  {
    slug: 'bajar-la-potencia-contratada',
    tema: 'Ahorro',
    titulo: 'Cómo saber si te sobra potencia contratada y cómo bajarla',
    description:
      'La potencia se paga todos los días del año, la uses o no. Cómo comprobar la que necesitas de verdad, cuánto se ahorra al bajarla y cómo hacer el trámite.',
    resumen:
      'El ahorro más grande y más olvidado de la factura: cada kW que sobra se paga entero todos los días del año.',
    minutos: 9,
    actualizada: '2026-08-12',
  },
  {
    slug: 'bajar-la-factura-de-la-luz',
    tema: 'Ahorro',
    titulo: 'Cómo bajar la factura de la luz, ordenado por lo que de verdad se nota',
    description:
      'Las medidas que más bajan la factura, puestas en orden de impacto real y con los números delante, y los mitos de ahorro que no compensan el esfuerzo.',
    resumen:
      'Qué mover primero y qué es perder el tiempo, con el euro por delante en cada caso.',
    minutos: 11,
    actualizada: '2026-08-12',
  },
  {
    slug: 'te-ha-subido-la-factura',
    tema: 'Ahorro',
    titulo: 'Te ha subido la factura: cómo averiguar por qué',
    description:
      'Diagnóstico paso a paso para saber si la subida viene del precio, del consumo, de una lectura estimada o de un cambio de contrato, y qué hacer en cada caso.',
    resumen:
      'Separar precio de consumo es el primer paso, y casi siempre el que da la respuesta.',
    minutos: 9,
    actualizada: '2026-08-12',
  },
  {
    slug: 'cambiar-de-comercializadora',
    tema: 'Contrato',
    titulo: 'Cambiar de comercializadora: cómo se hace y qué mirar en una oferta',
    description:
      'Qué diferencia hay entre mercado libre y regulado, cómo se cambia de compañía sin quedarte sin luz y en qué fijarse para comparar dos ofertas de verdad.',
    resumen:
      'El cambio es gratis, no hay obra ni corte, y lo único que importa de una oferta cabe en tres números.',
    minutos: 9,
    actualizada: '2026-08-12',
  },
  {
    slug: 'autoconsumo-y-excedentes',
    tema: 'Contrato',
    titulo: 'Placas solares: cómo funciona la compensación de excedentes',
    description:
      'Qué pasa con la energía que producen tus placas y no consumes: cómo funciona la compensación simplificada, qué límites tiene y por qué la factura nunca baja a cero.',
    resumen:
      'La luz que sobra descuenta, pero solo hasta cierto punto: dónde está el techo y por qué existe.',
    minutos: 9,
    actualizada: '2026-08-12',
  },
];

export const guia = (slug) => {
  const g = GUIAS.find((x) => x.slug === slug);
  if (!g) throw new Error(`No existe la guía "${slug}" en src/lib/guias.js`);
  return g;
};

export const rutaGuia = (slug) => `/guias/${slug}/`;

/**
 * Las guías que siguen a esta, en círculo. Así cada una recomienda vecinas distintas y no
 * acaban las ocho apuntando a las tres primeras.
 */
export const otrasGuias = (slug, n = 3) => {
  const i = GUIAS.findIndex((g) => g.slug === slug);
  const desde = i === -1 ? 0 : i + 1;
  return Array.from({ length: Math.min(n, GUIAS.length - 1) }, (_, k) => GUIAS[(desde + k) % GUIAS.length]);
};

/** "12 de agosto de 2026" a partir del ISO corto. */
export const fechaLarga = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
