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
  {
    slug: 'que-gasta-cada-electrodomestico',
    tema: 'Consumo de la casa',
    titulo: 'Qué gasta de verdad cada electrodoméstico de tu casa',
    description:
      'Los veinte aparatos de una casa ordenados por lo que consumen al año, no por lo que parece que consumen, con el coste en euros al precio medio de la luz.',
    resumen:
      'El que más gasta no es el que más ruido hace. Ordenados por kWh al año, con la cuenta hecha.',
    minutos: 9,
    actualizada: '2026-08-26',
  },
  {
    slug: 'consumo-fantasma',
    tema: 'Consumo de la casa',
    titulo: 'El consumo fantasma: qué gastan los aparatos apagados',
    description:
      'Cuánta luz consumen los aparatos en espera, qué parte de la factura representan de verdad, cuáles merece la pena desenchufar y cuáles no cambian nada.',
    resumen:
      'Existe, se puede medir y no es lo que te han contado: ni es despreciable ni son los cargadores del móvil.',
    minutos: 8,
    actualizada: '2026-08-26',
  },
  {
    slug: 'aire-acondicionado-consumo',
    tema: 'Consumo de la casa',
    titulo: 'Aire acondicionado: cuánto cuesta cada grado',
    description:
      'Qué consume un aire acondicionado por hora, cuánto sube la factura por cada grado que bajas el termostato y qué ajustes reducen el gasto sin renunciar al frescor.',
    resumen:
      'Entre poner 24 y poner 21 hay más diferencia en la factura que en la sensación.',
    minutos: 8,
    actualizada: '2026-08-26',
  },
  {
    slug: 'calefaccion-electrica',
    tema: 'Consumo de la casa',
    titulo: 'Calefacción eléctrica: qué sistema sale más barato',
    description:
      'Radiadores, emisores térmicos, acumuladores, bomba de calor y aire acondicionado en modo calor, comparados por lo que cuesta cada kilovatio hora de calor entregado.',
    resumen:
      'Todos los radiadores eléctricos gastan lo mismo. Lo que cambia el recibo es no usar una resistencia.',
    minutos: 9,
    actualizada: '2026-08-26',
  },
  {
    slug: 'termo-electrico',
    tema: 'Consumo de la casa',
    titulo: 'El termo eléctrico: cuánto se lleva de tu factura',
    description:
      'Cuánto consume un termo eléctrico al día, a qué temperatura conviene dejarlo, si compensa apagarlo cuando no estás y cuánto se ahorra programándolo por horas.',
    resumen:
      'Es de los tres que más gastan en una casa sin calefacción eléctrica, y de los más fáciles de domar.',
    minutos: 8,
    actualizada: '2026-08-26',
  },
  {
    slug: 'frigorifico-y-congelador',
    tema: 'Consumo de la casa',
    titulo: 'Frigorífico y congelador: el aparato que nunca se apaga',
    description:
      'Cuánto consume un frigorífico al año, por qué su gasto depende más de dónde está colocado que de su potencia, y cuándo compensa cambiar uno viejo.',
    resumen:
      'Consume poco por hora y muchísimo al año, porque son 8.760 horas seguidas.',
    minutos: 8,
    actualizada: '2026-08-26',
  },
  {
    slug: 'etiqueta-energetica',
    tema: 'La casa y la energía',
    titulo: 'La etiqueta energética, traducida a euros',
    description:
      'Qué significan las letras de la etiqueta energética tras el reescalado de 2021, qué mide realmente el consumo anual que aparece en ella y cuánto vale en dinero subir una clase.',
    resumen:
      'La A de hoy no es la A de antes, y la diferencia entre clases se puede convertir en euros al año.',
    minutos: 8,
    actualizada: '2026-08-26',
  },
  {
    slug: 'donde-se-escapa-el-calor',
    tema: 'La casa y la energía',
    titulo: 'Por dónde se escapa el calor de tu casa',
    description:
      'Ventanas, cerramientos, puentes térmicos y ventilación: por dónde se pierde de verdad la calefacción de una vivienda y qué arreglos compensan según lo que cuestan.',
    resumen:
      'Calentar una casa que pierde calor es llenar un cubo agujereado. Primero el cubo.',
    minutos: 9,
    actualizada: '2026-08-26',
  },
  {
    slug: 'bomba-de-calor-o-radiadores',
    tema: 'La casa y la energía',
    titulo: 'Bomba de calor o radiadores: por qué no gastan lo mismo',
    description:
      'Qué es el COP de una bomba de calor, por qué entrega más calor del que consume en electricidad y cuántos años tarda en pagarse frente a una calefacción de resistencia.',
    resumen:
      'Un radiador convierte un kWh en un kWh de calor. Una bomba de calor lo convierte en tres o cuatro.',
    minutos: 9,
    actualizada: '2026-08-26',
  },
  {
    slug: 'placas-solares-amortizacion',
    tema: 'La casa y la energía',
    titulo: 'Placas solares: cuánto cuestan y cuándo se pagan solas',
    description:
      'Qué cuesta una instalación fotovoltaica doméstica, cuánta de tu factura puede cubrir según tus horas de consumo, y en cuántos años se recupera la inversión.',
    resumen:
      'La cuenta no depende de cuánto produces, sino de cuánto de eso consumes tú en el momento.',
    minutos: 10,
    actualizada: '2026-08-26',
  },
  {
    slug: 'bombillas-led',
    tema: 'La casa y la energía',
    titulo: 'Bombillas LED: cuánto ahorran y cómo elegirlas',
    description:
      'Cuánto consume una LED frente a una halógena, qué significan los lúmenes y los grados kelvin, y por qué el precio de la bombilla es lo de menos en la cuenta.',
    resumen:
      'El cambio ya está hecho en casi todas las casas. Lo que sigue mal elegido es la luz que dan.',
    minutos: 7,
    actualizada: '2026-08-26',
  },
  {
    slug: 'cocinar-induccion-vitro-o-gas',
    tema: 'La casa y la energía',
    titulo: 'Inducción, vitrocerámica o gas: qué sale más barato cocinar',
    description:
      'Cuánta energía se pierde en cada sistema de cocina, qué cuesta hervir un litro de agua en cada uno y qué hay que mirar además del precio del kWh.',
    resumen:
      'La inducción gasta menos kWh que la vitrocerámica, pero el kWh de gas es más barato. La cuenta decide.',
    minutos: 8,
    actualizada: '2026-08-26',
  },
  {
    slug: 'kw-y-kwh',
    tema: 'Factura',
    titulo: 'kW y kWh: por qué no son lo mismo y por qué importa',
    description:
      'La diferencia entre potencia y energía explicada con la factura delante: qué mide cada una, cuál pagas por tenerla y cuál por consumirla, y por qué confundirlas lleva a decisiones caras.',
    resumen:
      'Una es el grifo y la otra el agua. En la factura las pagas por separado y por motivos distintos.',
    minutos: 8,
    actualizada: '2026-10-07',
  },
  {
    slug: 'leer-el-contador-de-la-luz',
    tema: 'Factura',
    titulo: 'Cómo leer el contador de la luz y comprobar tu factura',
    description:
      'Qué botones tiene un contador digital, qué significa cada lectura, cómo comprobar si tu factura es real o estimada y cómo medir lo que gasta tu casa en un día.',
    resumen:
      'El contador contesta en treinta segundos preguntas que la factura tarda un mes en responder.',
    minutos: 9,
    actualizada: '2026-10-07',
  },
  {
    slug: 'factura-estimada-y-regularizacion',
    tema: 'Factura',
    titulo: 'Facturas estimadas y regularizaciones: qué son y qué hacer',
    description:
      'Por qué llega una factura estimada, cómo reconocerla, qué pasa cuando llega la regularización y cómo evitar el susto de un recibo que multiplica por tres al anterior.',
    resumen:
      'La estimada no es un error; la sorpresa llega después, cuando se cuadran las cuentas.',
    minutos: 8,
    actualizada: '2026-10-07',
  },
  {
    slug: 'alquiler-del-contador',
    tema: 'Factura',
    titulo: 'El alquiler del contador: qué es y si se puede evitar',
    description:
      'Qué concepto es ese de tu factura, quién lo cobra y por qué, cuánto supone al año y qué pasa realmente si compras tu propio contador.',
    resumen:
      'Son unos céntimos al mes que casi nadie mira, y hay una decisión que tomar detrás.',
    minutos: 6,
    actualizada: '2026-10-07',
  },
  {
    slug: 'quien-puede-tener-pvpc',
    tema: 'Contrato',
    titulo: 'Quién puede contratar el PVPC y a quién le conviene',
    description:
      'Los requisitos para estar en la tarifa regulada, qué diferencia hay con el mercado libre, qué perfil de consumo le saca partido y cómo se solicita el cambio.',
    resumen:
      'No todo el mundo puede, y no a todo el mundo le conviene. Las dos cosas tienen condiciones concretas.',
    minutos: 9,
    actualizada: '2026-10-07',
  },
  {
    slug: 'bateria-virtual-de-excedentes',
    tema: 'Contrato',
    titulo: 'Batería virtual de excedentes: qué es y cuándo compensa',
    description:
      'Cómo funciona la batería virtual frente a la compensación simple de excedentes, qué se puede descontar con cada una y qué preguntar antes de contratarla.',
    resumen:
      'No guarda electricidad en ningún sitio: guarda euros. Y eso cambia toda la cuenta.',
    minutos: 9,
    actualizada: '2026-10-07',
  },
  {
    slug: 'por-que-la-luz-es-cara-por-la-tarde',
    tema: 'Mercado',
    titulo: 'Por qué la luz es cara a las nueve de la noche',
    description:
      'La curva diaria de precios explicada: por qué el hueco barato cae a mediodía, por qué el pico llega al anochecer y cómo cambia esa forma entre verano e invierno.',
    resumen:
      'El precio de cada hora lo decide la última central que hace falta encender. Esa es toda la explicación.',
    minutos: 9,
    actualizada: '2026-10-07',
  },
  {
    slug: 'precio-negativo-de-la-luz',
    tema: 'Mercado',
    titulo: 'Precios negativos de la luz: qué significan y qué pasa en tu factura',
    description:
      'Por qué el mercado eléctrico llega a marcar precios por debajo de cero, cuándo ocurre en España, qué ve un consumidor con PVPC en esas horas y qué no cambia aunque el precio sea negativo.',
    resumen:
      'No es un error del sistema. Es lo que pasa cuando sobra energía y parar cuesta más que regalarla.',
    minutos: 8,
    actualizada: '2026-10-07',
  },
  {
    slug: 'enchufes-inteligentes',
    tema: 'Consumo de la casa',
    titulo: 'Enchufes inteligentes y programadores: cuáles sirven para ahorrar',
    description:
      'Qué hace un enchufe con wifi frente a un temporizador de toda la vida, qué aparatos tiene sentido programar, cuánto consumen ellos mismos y qué límites de potencia hay que respetar.',
    resumen:
      'El aparato de 15 euros que convierte la franja barata en ahorro automático. Con tres advertencias.',
    minutos: 8,
    actualizada: '2026-10-07',
  },
  {
    slug: 'medir-el-consumo-de-casa',
    tema: 'Consumo de la casa',
    titulo: 'Cómo medir de verdad lo que consume cada aparato de tu casa',
    description:
      'Tres formas de medir el consumo real, de la más barata a la más completa: el contador, el medidor de enchufe y el monitor de consumo. Qué mide cada una y cómo interpretar el resultado.',
    resumen:
      'Dejar de estimar y empezar a medir cambia la lista de sospechosos casi siempre.',
    minutos: 9,
    actualizada: '2026-10-07',
  },
  {
    slug: 'cargar-el-coche-electrico-en-casa',
    tema: 'Consumo de la casa',
    titulo: 'Cargar el coche eléctrico en casa: potencia, coste y cuánto se ahorra',
    description:
      'Qué potencia hace falta, en cuántas horas carga cada opción, cuánto cuesta realmente cada 100 km y por qué programar la carga es el mayor ahorro por horario que puede hacer un hogar.',
    resumen:
      'Es el consumo doméstico más grande que existe y el más fácil de mover a la hora barata.',
    minutos: 10,
    actualizada: '2026-10-07',
  },
  {
    slug: 'termostato-y-programacion',
    tema: 'La casa y la energía',
    titulo: 'El termostato: lo que más ahorra de toda la calefacción',
    description:
      'Qué temperatura poner, por qué subir el termostato no calienta más rápido, cómo programar por franjas y qué cambia entre un sistema de inercia y uno de respuesta rápida.',
    resumen:
      'Un grado son en torno a un 7% de consumo. Es la pieza más barata y la que más mueve la factura.',
    minutos: 9,
    actualizada: '2026-10-07',
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
