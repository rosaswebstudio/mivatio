// Término de potencia del peaje 2.0TD (el de los hogares) y cálculo de la potencia que
// hace falta contratar.
//
// LAS CIFRAS SON OFICIALES Y ESTÁN VERIFICADAS CONTRA LA FUENTE PRIMARIA, no copiadas de
// un comparador. El término de potencia son dos cosas sumadas:
//
//   1. PEAJES de transporte y distribución -> los fija la CNMC.
//      Resolución de 18 de diciembre de 2025 (RAP/DE/009/25), anexo I.
//      2.0 TD: P1 = 23,324952 €/kW año | P2 = 0,443770 €/kW año
//      (esos totales son la suma de transporte 3,233054 + distribución 20,091898, y
//      0,003283 + 0,440487, comprobado que cuadra al céntimo).
//
//   2. CARGOS del sistema eléctrico -> los fija el Ministerio.
//      Orden TED/1524/2025, de 23 de diciembre (BOE-A-2025-26705), tabla de cargos.
//      2.0 TD: P1 = 4,379461 €/kW año | P2 = 0,281653 €/kW año
//
// OJO CON LA TABLA DE CARGOS: no dice "2.0TD", numera "segmentos tarifarios" del 1 al 5.
// El 2.0TD es el SEGMENTO 1, no el 2. Se distingue porque es el único con solo dos
// periodos de potencia (los demás tienen seis), y porque el total en valle que sale
// coincide con el precio publicado del PVPC. Tomar el segmento 2 da las cifras de la
// tarifa industrial 3.0TD, casi cuatro veces más caras en valle.
//
// ACTUALIZAR CADA ENERO: ambos documentos se publican en la última quincena de diciembre.

export const ANIO_DATOS = 2026;

export const TERMINO_POTENCIA = {
  // €/kW y año, sin impuestos.
  punta: { peajes: 23.324952, cargos: 4.379461 },
  valle: { peajes: 0.44377, cargos: 0.281653 },
};

export const PUNTA_ANUAL = TERMINO_POTENCIA.punta.peajes + TERMINO_POTENCIA.punta.cargos;
export const VALLE_ANUAL = TERMINO_POTENCIA.valle.peajes + TERMINO_POTENCIA.valle.cargos;

/** Lo que cuesta cada kW contratado al año, contando los dos periodos. Sin impuestos. */
export const COSTE_KW_ANUAL = PUNTA_ANUAL + VALLE_ANUAL;

// Impuesto especial sobre la electricidad e IVA general. El impuesto se aplica sobre la
// suma de potencia y energía, y el IVA sobre todo lo anterior.
export const IMPUESTO_ELECTRICO = 0.0511;
export const IVA = 0.21;

/** El mismo coste, ya con impuestos: es lo que de verdad se nota en la factura. */
export const COSTE_KW_ANUAL_CON_IMPUESTOS = COSTE_KW_ANUAL * (1 + IMPUESTO_ELECTRICO) * (1 + IVA);

/**
 * Escalones de potencia habituales en vivienda monofásica. Desde 2021 se puede contratar
 * cualquier valor, pero los interruptores y las ofertas siguen moviéndose en estos.
 */
export const ESCALONES = [2.3, 3.45, 4.6, 5.75, 6.9, 8.05, 9.2, 10.35, 11.5, 14.49];

/**
 * Aparatos con su potencia típica en vatios, y si son de los que pueden coincidir.
 *
 * Los vatios son ORIENTATIVOS: varían mucho según modelo y antigüedad, y por eso la
 * página deja cambiarlos. `simultaneo: false` marca los que casi nunca se encienden a la
 * vez que el resto (el horno y la vitro sí, la lavadora se programa).
 */
export const APARATOS = [
  { id: 'frigorifico', nombre: 'Frigorífico', vatios: 250, siempre: true },
  { id: 'iluminacion', nombre: 'Iluminación y pequeños aparatos', vatios: 300, siempre: true },
  { id: 'tv', nombre: 'Televisión y router', vatios: 150, siempre: true },
  { id: 'vitroceramica', nombre: 'Vitrocerámica o inducción', vatios: 2000 },
  { id: 'horno', nombre: 'Horno eléctrico', vatios: 2200 },
  { id: 'microondas', nombre: 'Microondas', vatios: 1000 },
  { id: 'lavadora', nombre: 'Lavadora', vatios: 2000 },
  { id: 'lavavajillas', nombre: 'Lavavajillas', vatios: 1800 },
  { id: 'secadora', nombre: 'Secadora', vatios: 2500 },
  { id: 'termo', nombre: 'Termo eléctrico', vatios: 1500 },
  { id: 'aire', nombre: 'Aire acondicionado', vatios: 1000 },
  { id: 'calefaccion', nombre: 'Calefacción eléctrica', vatios: 1500 },
  { id: 'plancha', nombre: 'Plancha', vatios: 1200 },
  { id: 'secador', nombre: 'Secador de pelo', vatios: 1800 },
  { id: 'coche', nombre: 'Cargador de coche eléctrico', vatios: 3700 },
];

/**
 * Potencia recomendada a partir de los vatios que pueden coincidir.
 * Se añade un 20% de margen: el ICP salta por picos de arranque (motores, compresores)
 * que superan un rato el consumo nominal, y quedarse justo es quedarse a oscuras.
 */
export function recomendar(vatiosSimultaneos) {
  const kw = (vatiosSimultaneos * 1.2) / 1000;
  const escalon = ESCALONES.find((e) => e >= kw) ?? ESCALONES[ESCALONES.length - 1];
  return { kwCalculado: kw, escalon };
}

/** Lo que se ahorra al año bajando la potencia contratada, con y sin impuestos. */
export function ahorroAnual(kwActual, kwNueva) {
  const diff = Math.max(0, kwActual - kwNueva);
  return {
    kw: diff,
    sinImpuestos: diff * COSTE_KW_ANUAL,
    conImpuestos: diff * COSTE_KW_ANUAL_CON_IMPUESTOS,
  };
}
