// Reglas del bono social eléctrico.
//
// TODO ESTO ESTÁ VERIFICADO CONTRA EL TEXTO CONSOLIDADO, no contra comparadores ni
// contra resúmenes. Y hay un motivo concreto: el XML del BOE (`xml.php`) devuelve el
// texto ORIGINAL de 2017, cuyos umbrales YA NO ESTÁN VIGENTES (decía "2 veces el IPREM
// si hay un menor"; hoy es un sistema de incrementos por persona). El texto bueno es el
// consolidado en PDF:
//   https://www.boe.es/buscar/pdf/2017/BOE-A-2017-11505-consolidado.pdf
// Leído con pdftotext en modo -table y -raw, coincidiendo ambos.
//
// FUENTES:
//   - RD 897/2017, de 6 de octubre, arts. 3 y 4 (texto consolidado): quién es consumidor
//     vulnerable y vulnerable severo, y los umbrales de renta.
//   - RD-ley 7/2026, de 20 de marzo (BOE-A-2026-6544): prorroga para todo 2026 los
//     descuentos del 42,5% y 57,5%. OJO: son extraordinarios y con senda decreciente
//     hacia el régimen permanente del RD 897/2017 (25% y 40%). HAY QUE REVISARLO CADA AÑO.
//   - IPREM 2026: 8.400 €/año en 14 pagas (congelado desde 2022 por prórroga
//     presupuestaria; el de 12 pagas, 7.200 €, NO es el que usa esta norma).

export const ANIO_DATOS = 2026;

/** IPREM de 14 pagas: es el que cita el RD 897/2017, no el de 12. */
export const IPREM_14 = 8400;

export const DESCUENTOS = { vulnerable: 0.425, severo: 0.575 };

// Multiplicadores del artículo 3.
export const BASE = 1.5; // unidad de convivencia de una sola persona
export const POR_ADULTO_ADICIONAL = 0.3;
export const POR_MENOR = 0.5;
export const POR_CIRCUNSTANCIA_ESPECIAL = 1;

/**
 * Anexo I del texto consolidado: kWh al año a los que se aplica el descuento. Lo que se
 * consuma por encima se paga entero. Estas cifras SON las del consolidado (1.587 / 2.222 /
 * 2.698 / 4.761), no las del texto original de 2017 (1.200 / 1.680 / 2.040 / 3.600).
 */
export const LIMITES_ENERGIA = [
  { kwh: 1587, quien: 'Persona sola o unidad de convivencia de dos personas' },
  { kwh: 2222, quien: 'Tres personas, o dos siendo una de ellas menor, o pensionistas de cuantía mínima' },
  { kwh: 2698, quien: 'Cuatro personas, o tres siendo dos de ellas menores' },
  { kwh: 4761, quien: 'Cinco o más personas, o cuatro siendo tres menores, o familia numerosa' },
];

/** Las circunstancias del art. 3.3 que suman 1 al multiplicador. */
export const CIRCUNSTANCIAS = [
  'Discapacidad reconocida igual o superior al 33%',
  'Situación acreditada de violencia de género',
  'Condición de víctima de terrorismo',
  'Dependencia reconocida de grado II o III',
  'Unidad de convivencia de un solo progenitor con al menos un menor',
  'Persona con electrodependencia acreditada',
];

/**
 * Umbral de renta que aplica a una unidad de convivencia.
 * @param {number} adultos - personas mayores de edad (mínimo 1: el titular)
 * @param {number} menores
 * @param {boolean} circunstancia - si concurre alguna del art. 3.3
 */
export function umbral(adultos, menores, circunstancia) {
  const adultosExtra = Math.max(0, adultos - 1);
  let mult = BASE + adultosExtra * POR_ADULTO_ADICIONAL + menores * POR_MENOR;
  if (circunstancia) mult += POR_CIRCUNSTANCIA_ESPECIAL;
  return { multiplicador: mult, euros: mult * IPREM_14 };
}

/**
 * Resultado orientativo: si la unidad encaja como vulnerable, severo o ninguno.
 *
 * Devuelve también POR QUÉ, porque una respuesta de sí o no sin explicación no sirve
 * para reclamar ni para entender qué falta.
 */
export function evaluar({ adultos = 1, menores = 0, renta = 0, circunstancia = false, familiaNumerosa = false, pensionMinima = false, imv = false }) {
  const u = umbral(adultos, menores, circunstancia);

  // Vías de acceso que NO dependen del umbral general (art. 3.2.b, c y d).
  // El severo de estas vías tiene su propio umbral (art. 3.4).
  if (familiaNumerosa) {
    const severo = renta <= 2 * IPREM_14;
    return {
      nivel: severo ? 'severo' : 'vulnerable',
      via: 'familia numerosa',
      umbral: u,
      explicacion: severo
        ? `Con el título de familia numerosa se accede al bono social sin límite de renta. Además, al no superar dos veces el IPREM (${(2 * IPREM_14).toLocaleString('es-ES')} €), entra como vulnerable severo.`
        : 'Con el título de familia numerosa se accede al bono social sin límite de renta, como consumidor vulnerable.',
    };
  }

  if (pensionMinima) {
    const severo = renta <= IPREM_14;
    return {
      nivel: severo ? 'severo' : 'vulnerable',
      via: 'pensión mínima',
      umbral: u,
      explicacion: severo
        ? `Como pensionista de cuantía mínima con una renta que no supera una vez el IPREM (${IPREM_14.toLocaleString('es-ES')} €), entra como vulnerable severo.`
        : 'Cobrando la cuantía mínima de jubilación o incapacidad permanente, y sin otros ingresos por encima de 500 € al año, se accede como consumidor vulnerable.',
    };
  }

  if (imv) {
    const severo = renta <= u.euros * 0.5;
    return {
      nivel: severo ? 'severo' : 'vulnerable',
      via: 'ingreso mínimo vital',
      umbral: u,
      explicacion: 'Ser beneficiario del Ingreso Mínimo Vital da acceso al bono social por sí solo.',
    };
  }

  // Vía general por renta (art. 3.2.a).
  if (renta <= u.euros * 0.5) {
    return {
      nivel: 'severo',
      via: 'renta',
      umbral: u,
      explicacion: `La renta no llega a la mitad del umbral que corresponde a esta unidad de convivencia (${(u.euros * 0.5).toLocaleString('es-ES', { maximumFractionDigits: 0 })} €), así que entra como vulnerable severo.`,
    };
  }
  if (renta <= u.euros) {
    return {
      nivel: 'vulnerable',
      via: 'renta',
      umbral: u,
      explicacion: `La renta no supera el umbral de esta unidad de convivencia (${u.euros.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €), así que entra como consumidor vulnerable.`,
    };
  }
  return {
    nivel: 'no',
    via: 'renta',
    umbral: u,
    explicacion: `La renta supera el umbral que corresponde a esta unidad de convivencia (${u.euros.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €). Aun así, conviene mirar las otras vías: familia numerosa, pensión mínima o Ingreso Mínimo Vital dan acceso por sí solas.`,
  };
}
