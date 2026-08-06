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
  {
    slug: 'frigorifico',
    nombre: 'Frigorífico',
    accion: 'tener el frigorífico',
    kwh: 0.8,
    rango: [0.4, 1.6],
    horas: 24,
    usosSemana: 7,
    unidad: 'día',
    unidadPlural: 'días',
    programable: false,
    detalle:
      'El frigorífico gasta poco de golpe pero no se apaga nunca, y eso lo convierte en el aparato que más electricidad consume al año en la mayoría de las casas. Un modelo antiguo puede gastar el triple que uno moderno de la misma capacidad.',
    consejo:
      'Al no poder apagarlo, aquí no sirve elegir la hora: lo que ahorra de verdad es separarlo de la pared para que ventile, no meter comida caliente y revisar las gomas de la puerta.',
  },
  {
    slug: 'microondas',
    nombre: 'Microondas',
    accion: 'usar el microondas',
    kwh: 0.15,
    rango: [0.05, 0.4],
    horas: 0.15,
    usosSemana: 14,
    unidad: 'uso',
    unidadPlural: 'usos',
    programable: false,
    detalle:
      'Un microondas de 1.000 W funcionando cinco minutos gasta poco más de 0,08 kWh. Aunque su potencia asusta, se usa tan poco rato que sale muy barato: para calentar un plato es bastante más eficiente que encender el horno.',
    consejo:
      'Para recalentar o descongelar, el microondas gasta mucho menos que el horno o la vitrocerámica, que tienen que calentar también el recipiente y el aire.',
  },
  {
    slug: 'plancha',
    nombre: 'Plancha',
    accion: 'planchar',
    kwh: 1.1,
    rango: [0.6, 2.2],
    horas: 1,
    usosSemana: 1,
    unidad: 'sesión',
    unidadPlural: 'sesiones',
    programable: true,
    detalle:
      'Una plancha de unos 1.200 W durante una hora ronda los 1,1 kWh, aunque no consume de forma continua: el termostato la enciende y la apaga para mantener la temperatura.',
    consejo:
      'Planchar todo de una vez sale mucho más barato que en varias tandas: buena parte del gasto está en el calentamiento inicial. Y como es una tarea que se puede mover de hora, elegir una franja barata sí compensa.',
  },
  {
    slug: 'calefaccion-electrica',
    nombre: 'Calefacción eléctrica',
    accion: 'poner la calefacción eléctrica',
    kwh: 1.5,
    rango: [0.8, 2.5],
    horas: 1,
    usosSemana: 35,
    unidad: 'hora',
    unidadPlural: 'horas',
    programable: true,
    detalle:
      'Un radiador o convector eléctrico de 1.500 W gasta 1,5 kWh por cada hora encendido a plena potencia. Es de los consumos más altos y sostenidos de la casa: en invierno puede ser la mitad de la factura.',
    consejo:
      'Los radiadores eléctricos convierten en calor toda la electricidad que reciben, ni más ni menos, así que ninguno es más eficiente que otro por mucho que lo anuncien. Lo que sí ahorra es bajar un grado el termostato y aislar bien ventanas y puertas.',
  },
  {
    slug: 'bomba-de-calor',
    nombre: 'Bomba de calor',
    accion: 'poner la bomba de calor',
    kwh: 0.5,
    rango: [0.3, 1.0],
    horas: 1,
    usosSemana: 35,
    unidad: 'hora',
    unidadPlural: 'horas',
    programable: true,
    detalle:
      'Una bomba de calor (el aire acondicionado en modo calor) no genera calor: lo mueve de fuera hacia dentro. Por eso da unas tres o cuatro veces más calor que la electricidad que consume, y calienta la misma habitación por bastante menos que un radiador eléctrico.',
    consejo:
      'Es la forma más barata de calentar con electricidad. Rinde menos cuanto más frío hace fuera, así que en zonas muy frías conviene combinarla con otro sistema.',
  },
  {
    slug: 'depuradora-piscina',
    nombre: 'Depuradora de piscina',
    accion: 'filtrar el agua de la piscina',
    kwh: 5.5,
    rango: [2.5, 12],
    horas: 8,
    usosSemana: 7,
    unidad: 'día',
    unidadPlural: 'días',
    programable: true,
    detalle:
      'Una bomba de filtración de 3/4 de caballo ronda los 700 W y en verano tiene que estar funcionando entre seis y diez horas al día. Sumado, es el aparato que más dispara la factura de julio y agosto en una casa con piscina, por encima del aire acondicionado.',
    consejo:
      'Es el caso donde más se nota elegir la hora, porque son muchas horas seguidas y se programan con un reloj de toda la vida. En verano el tramo barato cae a mediodía por la producción solar, justo cuando además interesa filtrar por el calor y el uso del vaso.',
  },
  {
    slug: 'freidora-de-aire',
    nombre: 'Freidora de aire',
    accion: 'usar la freidora de aire',
    kwh: 0.5,
    rango: [0.25, 0.9],
    horas: 1,
    usosSemana: 4,
    unidad: 'uso',
    unidadPlural: 'usos',
    programable: false,
    detalle:
      'Tira de unos 1.500 W, parecido a un horno pequeño, pero cocina en un espacio mínimo y en la cuarta parte de tiempo: unos veinte minutos frente a la hora larga del horno contando el precalentado. Ahí está el ahorro, no en la potencia.',
    consejo:
      'Para raciones de una o dos personas sale bastante más barata que encender el horno. Cuando la bandeja se llena de verdad, el horno vuelve a compensar porque cocina mucha más cantidad de una vez.',
  },
  {
    slug: 'television',
    nombre: 'Televisión',
    accion: 'tener la televisión encendida',
    kwh: 0.4,
    rango: [0.15, 1.2],
    horas: 4,
    usosSemana: 7,
    unidad: 'día',
    unidadPlural: 'días',
    programable: false,
    detalle:
      'Una televisión de 55 pulgadas ronda los 100 W, así que cuatro horas diarias salen por unos 0,4 kWh. Lo que marca la diferencia es el tamaño y la tecnología: una OLED grande con el brillo al máximo puede triplicar el consumo de una LED mediana.',
    consejo:
      'Bajar el brillo y desactivar el modo tienda o dinámico recorta el consumo de forma apreciable sin que se note en el sofá. El gasto en reposo, en cambio, es hoy de menos de 0,5 W: desenchufarla cada noche ya no compensa la molestia.',
  },
  {
    slug: 'ordenador',
    nombre: 'Ordenador',
    accion: 'usar el ordenador',
    kwh: 0.6,
    rango: [0.15, 2.5],
    horas: 4,
    usosSemana: 7,
    unidad: 'día',
    unidadPlural: 'días',
    programable: false,
    detalle:
      'Aquí el rango es enorme y por eso la media engaña: un portátil se mueve en 30 o 50 W y un sobremesa para juegos puede pasar de 500 W con la tarjeta gráfica a tope. Entre uno y otro hay diez veces de diferencia haciendo lo mismo durante las mismas horas.',
    consejo:
      'Si trabajas muchas horas, el portátil frente al sobremesa es de los cambios que más se notan al cabo del año. Y suspender en vez de dejarlo encendido durante las pausas largas ahorra más que cualquier ajuste de pantalla.',
  },
  {
    slug: 'deshumidificador',
    nombre: 'Deshumidificador',
    accion: 'tener el deshumidificador',
    kwh: 2.4,
    rango: [1, 5],
    horas: 8,
    usosSemana: 7,
    unidad: 'día',
    unidadPlural: 'días',
    programable: true,
    detalle:
      'Los de compresor consumen entre 250 y 400 W, pero funcionan muchas horas seguidas, y ahí está el gasto. En la costa, donde se usan casi todo el invierno, acaban pesando en la factura más que aparatos de mucha más potencia que solo se encienden un rato.',
    consejo:
      'Con el higrostato puesto en el 50 o 55 % arranca y para solo, en vez de trabajar sin parar. Y como no importa a qué hora seque el aire, es un candidato claro para programarlo en la franja barata.',
  },
  {
    slug: 'secador-de-pelo',
    nombre: 'Secador de pelo',
    accion: 'secarte el pelo',
    kwh: 0.17,
    rango: [0.08, 0.35],
    horas: 1,
    usosSemana: 7,
    unidad: 'uso',
    unidadPlural: 'usos',
    programable: false,
    detalle:
      'Es el ejemplo perfecto de que potencia y gasto no son lo mismo. Un secador de 2.000 W es de los aparatos más potentes de la casa, más que la lavadora, pero como se usa cinco minutos gasta unos 0,17 kWh: céntimos.',
    consejo:
      'No merece la pena organizarse por esto. Si quieres bajar la factura del baño, el termo del agua caliente está en otra liga: una ducha larga cuesta bastante más que secarse el pelo entero.',
  },
  {
    slug: 'router-wifi',
    nombre: 'Router wifi',
    accion: 'tener el router encendido',
    kwh: 0.24,
    rango: [0.1, 0.5],
    horas: 24,
    usosSemana: 7,
    unidad: 'día',
    unidadPlural: 'días',
    programable: false,
    detalle:
      'Consume unos 10 W, una miseria por hora, pero no se apaga nunca: son 24 horas al día los 365 días del año, unos 87 kWh anuales. Es el mismo caso que el frigorífico, poca potencia sostenida en el tiempo.',
    consejo:
      'Apagarlo por la noche ahorra poco y deja sin conexión a la tele, la cámara o el teléfono fijo. Si te preocupa el consumo que no se ve, sale más a cuenta buscar los aparatos que están en reposo todo el día: entre todos suelen sumar bastante más que el router.',
  },
];

export const porSlug = (slug) => ELECTRODOMESTICOS.find((e) => e.slug === slug) || null;
