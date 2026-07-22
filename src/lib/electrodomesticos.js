// Catálogo de electrodomésticos para las páginas "cuánto cuesta poner...".
//
// IMPORTANTE: los consumos son VALORES TÍPICOS, no medidas exactas. Un mismo aparato
// varía mucho según modelo, antigüedad, programa y temperatura, por eso cada ficha
// lleva su rango y la web deja al visitante ajustar el consumo a su caso.

export const ELECTRODOMESTICOS = [
  {
    slug: 'lavadora',
    nombre: 'Lavadora',
    accion: 'poner la lavadora',
    kwh: 1.0,
    rango: [0.5, 2.0],
    horas: 2,
    usosSemana: 4,
    unidad: 'lavado',
    unidadPlural: 'lavados',
    programable: true,
    detalle:
      'Un lavado corto en frío puede bajar de 0,5 kWh, mientras que un programa largo a 60 grados se acerca a 2 kWh. Calentar el agua es lo que dispara el consumo: la mayor parte del gasto no está en mover el tambor.',
    consejo:
      'Lavar a 30 o 40 grados en lugar de a 60 recorta el consumo casi a la mitad, y la ropa de diario queda igual de limpia.',
  },
  {
    slug: 'lavavajillas',
    nombre: 'Lavavajillas',
    accion: 'poner el lavavajillas',
    kwh: 1.2,
    rango: [0.7, 1.8],
    horas: 2,
    usosSemana: 5,
    unidad: 'lavado',
    unidadPlural: 'lavados',
    programable: true,
    detalle:
      'El programa eco gasta menos aunque dure más, porque calienta el agua de forma más lenta y progresiva. Los programas intensivos son los que más consumen.',
    consejo:
      'Ponlo siempre lleno y en modo eco: es la combinación que menos cuesta por vajilla lavada.',
  },
  {
    slug: 'secadora',
    nombre: 'Secadora',
    accion: 'poner la secadora',
    kwh: 2.5,
    rango: [1.5, 4.0],
    horas: 2,
    usosSemana: 3,
    unidad: 'secado',
    unidadPlural: 'secados',
    programable: true,
    detalle:
      'Es de los aparatos que más consumen de la casa. Las de bomba de calor gastan bastante menos que las de condensación o evacuación, que son las que se van a los 4 kWh.',
    consejo:
      'Centrifugar bien antes de secar reduce el tiempo de secadora, y tender cuando el tiempo acompaña es gratis.',
  },
  {
    slug: 'termo-electrico',
    nombre: 'Termo eléctrico',
    accion: 'calentar el agua con el termo',
    kwh: 2.0,
    rango: [1.2, 3.5],
    horas: 3,
    usosSemana: 7,
    unidad: 'día',
    unidadPlural: 'días',
    programable: true,
    detalle:
      'Un termo de unos 80 litros para dos personas ronda los 2 kWh diarios. Depende mucho del tamaño del depósito, del aislamiento y de la temperatura del agua de entrada, que en invierno es bastante más fría.',
    consejo:
      'Programarlo para que caliente de madrugada y bajar el termostato a unos 60 grados es de los ahorros más grandes y menos molestos que hay.',
  },
  {
    slug: 'aire-acondicionado',
    nombre: 'Aire acondicionado',
    accion: 'poner el aire acondicionado',
    kwh: 4.5,
    rango: [2.0, 9.0],
    horas: 5,
    usosSemana: 7,
    unidad: 'día',
    unidadPlural: 'días',
    programable: false,
    detalle:
      'Un split de habitación consume del orden de 0,9 kWh por hora, así que cinco horas se van a unos 4,5 kWh. Un equipo grande o mal dimensionado para la estancia puede doblar esa cifra.',
    consejo:
      'Cada grado que subes el termostato en verano ahorra alrededor de un 7% de consumo. De 22 a 25 grados la diferencia en la factura se nota.',
  },
  {
    slug: 'horno-electrico',
    nombre: 'Horno eléctrico',
    accion: 'usar el horno',
    kwh: 2.0,
    rango: [1.0, 3.5],
    horas: 1,
    usosSemana: 2,
    unidad: 'uso',
    unidadPlural: 'usos',
    programable: false,
    detalle:
      'Un horno tira entre 1,5 y 2,5 kW mientras calienta, aunque no consume de forma continua: una vez alcanza la temperatura va parando y arrancando para mantenerla.',
    consejo:
      'Aprovecha el calor residual apagándolo unos minutos antes, y evita abrir la puerta, que cada vez pierde buena parte del calor acumulado.',
  },
  {
    slug: 'vitroceramica',
    nombre: 'Vitrocerámica o inducción',
    accion: 'cocinar con la vitrocerámica',
    kwh: 1.0,
    rango: [0.4, 2.0],
    horas: 1,
    usosSemana: 7,
    unidad: 'comida',
    unidadPlural: 'comidas',
    programable: false,
    detalle:
      'La inducción es bastante más eficiente que la vitrocerámica tradicional porque calienta directamente el recipiente y casi no desperdicia calor.',
    consejo:
      'Tapar las ollas y usar recipientes del tamaño del fuego reduce el tiempo de cocción y, con él, el consumo.',
  },
  {
    slug: 'coche-electrico',
    nombre: 'Coche eléctrico',
    accion: 'cargar el coche eléctrico',
    kwh: 45,
    rango: [20, 100],
    horas: 6,
    usosSemana: 2,
    unidad: 'carga',
    unidadPlural: 'cargas',
    programable: true,
    detalle:
      'Una carga completa de un utilitario eléctrico ronda los 45 kWh. Es, con diferencia, el mayor consumo puntual de una casa, y también donde más dinero hay en juego al elegir bien la hora.',
    consejo:
      'Programar la carga de madrugada es lo más rentable que puedes hacer con un coche eléctrico: es cuando la luz suele estar más barata.',
  },
];

export const porSlug = (slug) => ELECTRODOMESTICOS.find((e) => e.slug === slug) || null;
