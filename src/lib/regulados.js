// Peajes y cargos del TÉRMINO DE ENERGÍA en la tarifa 2.0TD (la de los hogares).
//
// Complementa a potencia.js, que tiene los del término de potencia. Mismo criterio: las
// cifras salen de la fuente primaria, no de un comparador.
//
//   1. PEAJES de transporte y distribución -> los fija la CNMC.
//      Resolución de 18 de diciembre de 2025 (BOE-A-2025-26348), anexo I, apartado 1.b.
//      2.0 TD, €/kWh:
//        P1 punta = 0,004576 (transporte) + 0,028685 (distribución) = 0,033261
//        P2 llano = 0,002195 + 0,014214 = 0,016409
//        P3 valle = 0,000004 + 0,000073 = 0,000077
//      Comprobación cruzada: el término de POTENCIA de ese mismo anexo da 23,324952 y
//      0,443770 €/kW año, que es exactamente lo que ya había verificado potencia.js por
//      separado. Si dos lecturas independientes del mismo anexo cuadran al decimal, la
//      tabla de energía sale de donde dice.
//
//   2. CARGOS del sistema eléctrico -> los fija el Ministerio.
//      Orden TED/1524/2025, de 23 de diciembre (BOE-A-2025-26705), tabla "Término de
//      energía de los cargos (euros/kWh)", SEGMENTO TARIFARIO 1, que es el 2.0TD.
//        P1 = 0,064292 | P2 = 0,012858 | P3 = 0,003215
//      Se reconoce el segmento porque solo tiene tres periodos de energía (los demás
//      llegan a seis) y porque guarda la proporción exacta 5:1 entre punta y llano y 4:1
//      entre llano y valle, que es como está construida esa tabla.
//
// ACTUALIZAR CADA ENERO, a la vez que potencia.js: los dos documentos salen en la
// segunda quincena de diciembre.

export const ANIO_DATOS = 2026;

/** €/kWh, sin impuestos. */
export const TERMINO_ENERGIA = {
  punta: { peajes: 0.033261, cargos: 0.064292 },
  llano: { peajes: 0.016409, cargos: 0.012858 },
  valle: { peajes: 0.000077, cargos: 0.003215 },
};

/** Lo que se suma al precio de la energía en cada periodo, peajes y cargos juntos. */
export const REGULADO_KWH = {
  punta: TERMINO_ENERGIA.punta.peajes + TERMINO_ENERGIA.punta.cargos,
  llano: TERMINO_ENERGIA.llano.peajes + TERMINO_ENERGIA.llano.cargos,
  valle: TERMINO_ENERGIA.valle.peajes + TERMINO_ENERGIA.valle.cargos,
};

/**
 * Tramos horarios del 2.0TD. Son los que mandan en peajes y cargos, y en las tarifas de
 * mercado libre con discriminación horaria. NO son los que mandan en el precio de la
 * energía del PVPC, que cambia hora a hora con el mercado.
 *
 * Sábados, domingos y festivos de ámbito nacional son valle las 24 horas. Los festivos
 * autonómicos y locales no cuentan: ese día se factura como laborable.
 */
export const TRAMOS = [
  { id: 'punta', nombre: 'Punta', horas: 'De 10:00 a 14:00 y de 18:00 a 22:00', dias: 'Solo días laborables' },
  { id: 'llano', nombre: 'Llano', horas: 'De 8:00 a 10:00, de 14:00 a 18:00 y de 22:00 a 24:00', dias: 'Solo días laborables' },
  { id: 'valle', nombre: 'Valle', horas: 'De 00:00 a 8:00', dias: 'Laborables, y las 24 horas de sábados, domingos y festivos nacionales' },
];

/** Formatea un €/kWh como céntimos con los decimales que hacen falta para no mentir. */
export const centKwh = (n) =>
  (n * 100).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
