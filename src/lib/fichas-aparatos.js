// Contenido propio de cada ficha de "cuánto cuesta poner...".
//
// Por qué está separado del catálogo: en electrodomesticos.js viven los números (consumo
// típico, rango, usos por semana) que mueven la calculadora. Aquí vive lo que hace que la
// ficha de la lavadora y la del frigorífico no sean la misma página con otro nombre y otra
// cifra: cómo se mira el consumo real de ESE aparato, qué lo dispara y qué creencia
// extendida sobre ÉL es falsa.
//
// Regla: nada que valga igual para los veinte aparatos. Si una frase se puede copiar a
// otra ficha cambiando el nombre, no va aquí.

export const FICHAS = {
  lavadora: {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'La etiqueta energética de las lavadoras no da el consumo por lavado, sino los <strong>kWh por 100 ciclos</strong> del programa eco 40-60. Divide esa cifra entre 100 y tienes el consumo de un lavado eco: una lavadora etiquetada con 49 kWh/100 ciclos gasta 0,49 kWh por colada. Ojo, porque esa es la cifra del programa más eficiente y a 40-60 grados reales medidos dentro del tambor; el programa de algodón a 60 que mucha gente usa a diario puede consumir el doble. Si no encuentras la etiqueta, busca el modelo en la base de datos europea EPREL, que es pública y obligatoria desde 2021.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'Entre el 80 % y el 90 % de la electricidad de un lavado se va en <strong>calentar el agua</strong>, no en girar el tambor. Por eso la temperatura es casi la única variable que importa: pasar de 60 a 40 grados recorta alrededor de la mitad, y lavar en frío deja el consumo en poco más de 0,2 kWh. Lo demás apenas mueve la aguja. La velocidad de centrifugado sí cambia algo, pero donde se nota es después: cuanto más seca sale la ropa del tambor, menos tiempo tiene que estar la secadora, que gasta dos o tres veces más.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Creer que el <strong>programa rápido gasta menos</strong>. Normalmente gasta más por kilo de ropa: para lavar en media hora tiene que calentar el agua más deprisa y compensar el poco tiempo de remojo con más temperatura y más agua. El programa eco gasta menos precisamente porque dura más. El otro error es lavar con media carga: una lavadora medio llena no consume la mitad, consume alrededor de tres cuartas partes de lo mismo.',
    },
  },

  lavavajillas: {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'Igual que las lavadoras, la etiqueta del lavavajillas da <strong>kWh por 100 ciclos</strong> del programa eco, no por lavado. Un modelo moderno de 14 cubiertos ronda los 60-75 kWh/100 ciclos, es decir, 0,6-0,75 kWh por vajilla. También indica el consumo de agua por ciclo en litros, que es un dato que conviene mirar junto al eléctrico: buena parte de la electricidad se va justamente en calentar esa agua, así que menos litros suele significar menos kWh.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La temperatura del programa y el secado. Un programa intensivo a 70 grados puede gastar el doble que el eco a 50. El secado por condensación (abrir la puerta al terminar y dejar que se evapore) ahorra la resistencia de secado, que en algunos modelos es un tercio del ciclo. Y el <strong>agua caliente de entrada</strong>: si tu lavavajillas se conecta a la toma de agua fría, tiene que calentarla toda él.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Enjuagar los platos bajo el grifo antes de meterlos. Un minuto de grifo con agua caliente gasta más energía que el ciclo entero de aclarado de la máquina, y los detergentes modernos necesitan algo de suciedad para trabajar bien. Basta con retirar los restos sólidos. El segundo error es poner el <strong>medio programa</strong> pensando que cuesta la mitad: casi nunca baja del 70 % del consumo completo, así que compensa más esperar a llenarlo.',
    },
  },

  secadora: {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'Aquí lo decisivo no es la letra de la etiqueta sino <strong>la tecnología</strong>, y hay tres muy distintas. Las de evacuación y las de condensación clásicas calientan aire con una resistencia y gastan del orden de 3,5-4 kWh por secado de 7 kg. Las de <strong>bomba de calor</strong> reutilizan el calor del aire que sale y hacen el mismo secado con 1,5-2 kWh: menos de la mitad. Si no sabes cuál tienes, mírale la ficha: si menciona bomba de calor o condensador refrigerado, es la eficiente; si solo dice condensación, es la de resistencia.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La <strong>humedad con la que entra la ropa</strong>, que depende del centrifugado de la lavadora. Pasar de centrifugar a 800 rpm a hacerlo a 1.400 saca entre un 10 % y un 15 % más de agua, y eso recorta el tiempo de secadora de forma directa. Secar es, en el fondo, evaporar agua: cada litro que no entra en el tambor es energía que no hay que gastar. Lo segundo es la carga: una secadora sobrecargada no seca más, seca peor y durante más tiempo.',
    },
    errores: {
      h: 'El error habitual',
      p: 'No limpiar el filtro de pelusa y, en las de condensación, el condensador. Un filtro obstruido reduce el caudal de aire y alarga el ciclo sin que lo notes: el aparato sigue funcionando igual, solo que media hora más. Es el ahorro más barato que existe en toda la casa y no cuesta nada. También conviene no usar la secadora para rematar prendas casi secas: el arranque es la parte cara del ciclo.',
    },
  },

  'termo-electrico': {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'La etiqueta del termo no se lee en kWh por uso sino por <strong>perfil de carga</strong> (S, M, L, XL, según el agua caliente que da al día) más un consumo anual. Pero el número que de verdad manda es otro, y está en la ficha técnica: las <strong>pérdidas de mantenimiento</strong>, en vatios. Un termo de 80 litros bien aislado ronda los 35-45 W de pérdidas; uno viejo puede doblarlo. Esos vatios se gastan las 24 horas estés o no en casa: 40 W sostenidos son casi 1 kWh al día, unos 350 kWh al año solo por mantener el depósito caliente.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'El <strong>tamaño del depósito frente a lo que gastas</strong>. Calentar 150 litros para una persona es pagar pérdidas de un depósito que no se usa. Y la temperatura del agua de red, que en enero entra a 8-10 grados y en agosto a 18-20: subir 50 grados cuesta el doble que subir 25, así que el mismo termo gasta casi el doble en invierno que en verano. Por eso un termo es el aparato de la casa donde más cambia la factura entre estaciones.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Bajar el termostato por debajo de 60 grados para ahorrar. Por debajo de esa temperatura el agua estancada del depósito es un medio donde puede proliferar la <strong>legionela</strong>, y el ahorro no compensa el riesgo: 60 grados es el mínimo recomendado para acumuladores. Lo que sí funciona es programarlo para que caliente en la franja barata y no a demanda, y aislar las primeras tuberías de salida, por donde se escapa buena parte del calor.',
    },
  },

  'aire-acondicionado': {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'El dato que busca todo el mundo son las <strong>frigorías</strong>, pero eso es potencia de frío, no consumo. La conversión es directa: 1 frigoría/hora equivale a 1,163 W de frío, así que un equipo de 3.000 frigorías da unos 3,5 kW de frío. Lo que gasta depende del <strong>SEER</strong>, que viene en la etiqueta: con SEER 6, esos 3,5 kW de frío se consiguen con unos 580 W de electricidad. La cuenta es frío dividido entre SEER. Un equipo antiguo con SEER 2,5 necesitaría 1.400 W para lo mismo.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La <strong>diferencia de temperatura</strong> entre la calle y la consigna, no las horas encendido. Cada grado que bajas el termostato añade alrededor de un 7 % al consumo, así que poner 22 en vez de 25 es más o menos un 20 % más de factura. Lo segundo es el dimensionado: un equipo demasiado grande arranca y para todo el rato, y los arranques son la parte cara en los compresores que no son inverter. Y lo tercero, el aislamiento de la estancia: enfriar con la persiana subida a pleno sol es tirar frío a la calle.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Poner 17 grados al llegar a casa <strong>para que enfríe antes</strong>. No enfría antes: el compresor da el frío que da, y lo único que cambia es que seguirá trabajando pasado el punto en el que estarías cómodo. Lo que sí acelera la bajada es el ventilador en velocidad alta durante los primeros minutos. El otro error, en modo calor, es apagarlo y encenderlo: en un equipo inverter mantener una consigna estable gasta menos que los arranques.',
    },
  },

  'horno-electrico': {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'La etiqueta del horno da el consumo <strong>por ciclo</strong>, y da dos cifras: una para calor convencional y otra para aire forzado (ventilador). Un horno moderno ronda 0,7-1 kWh por ciclo en convencional y algo menos en ventilado. Esa cifra se mide con una carga estándar y un ciclo corto, así que un asado de hora y media gasta bastante más: la referencia práctica es que un horno doméstico tira entre 1,5 y 2,5 kW mientras la resistencia está activa, y esa resistencia está activa quizá la mitad del tiempo una vez alcanzada la temperatura.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'El <strong>precalentado</strong> y el tamaño de la cavidad. Llevar un horno de 60 litros de frío a 200 grados cuesta del orden de 0,4-0,6 kWh antes de meter nada dentro, y es un coste fijo que no depende de si vas a hacer una pizza o cuatro. De ahí que cocinar varias cosas seguidas aprovechando el horno ya caliente salga tan barato en comparación. El modo ventilado permite bajar unos 20 grados la temperatura para el mismo resultado, lo que también resta consumo.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Precalentar siempre. Hay cosas que lo necesitan (bollería, masas que tienen que subir de golpe, pizza) y muchas que no: asados, guisos, verduras y gratinados se pueden meter con el horno frío y aprovechar la subida. El segundo error es <strong>abrir la puerta</strong> para mirar: cada apertura deja escapar buena parte del aire caliente y obliga a la resistencia a recuperar. Para eso está la luz interior.',
    },
  },

  vitroceramica: {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'Las placas de cocina <strong>no llevan etiqueta energética</strong>, así que no hay cifra oficial que mirar: lo único que trae el aparato es la potencia máxima de cada fuego, que no es lo que consume sino el tope. Lo que marca la diferencia es la tecnología. Una placa de inducción aprovecha en torno al 85-90 % de la electricidad, porque genera el calor en el propio fondo del recipiente. Una vitrocerámica radiante se queda en el 60-70 %: tiene que calentar primero el cristal y buena parte de ese calor se va al aire y a la encimera.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La <strong>tapa</strong> y el tamaño del recipiente. Hervir dos litros de agua destapados puede costar el doble que tapados, porque el vapor se lleva el calor. Y en inducción, el diámetro del fondo tiene que coincidir con el de la zona: si el fondo es más pequeño, parte del campo no acopla y se pierde eficiencia. En vitrocerámica radiante pasa lo mismo pero peor, porque la corona de cristal que queda fuera de la olla calienta la cocina en vez de la comida.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Dejar el fuego al máximo una vez que el agua hierve. El agua no pasa de 100 grados por mucho que subas la potencia: lo único que consigues es evaporar más deprisa y gastar el doble para la misma cocción. En cuanto rompe a hervir, bajar al mínimo que mantenga el borboteo. El otro error, al comprar, es pensar que una <strong>inducción necesita más potencia contratada</strong>: la mayoría tiene gestión de potencia y se puede limitar desde el menú del propio aparato.',
    },
  },

  'coche-electrico': {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'El dato útil no es la capacidad de la batería sino el consumo en <strong>kWh por 100 km</strong>, que el propio coche muestra en el cuadro. Un utilitario ronda 15-17 kWh/100 km, un SUV eléctrico 20-24. Con eso, el coste real por kilómetro es inmediato: 16 kWh/100 km a 0,10 €/kWh son 1,6 € los 100 km. Y hay un número que casi nadie cuenta: las <strong>pérdidas de carga</strong>. Entre el cargador, el cableado y la gestión térmica de la batería se pierde del orden de un 10-15 % en carga lenta, así que meter 45 kWh en la batería significa pagar unos 50 kWh en el contador.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La <strong>velocidad</strong> y el frío. A 120 km/h un eléctrico puede gastar un 40 % más que a 90, porque la resistencia del aire crece con el cuadrado de la velocidad y aquí no hay motor térmico que disimule. El invierno es el otro factor: calentar el habitáculo sale de la batería (no hay calor de motor que aprovechar) y la propia química de la batería rinde peor en frío. Un trayecto corto a 0 grados puede gastar un 30 % más que el mismo en mayo.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Cargar al 100 % siempre y hacerlo nada más llegar a casa. Lo primero castiga la batería sin necesidad: para el uso diario, el rango recomendado por casi todos los fabricantes es cargar hasta el 80 % y reservar el 100 % para los viajes largos. Lo segundo es dinero tirado: una carga de 45 kWh movida de la tarde a la madrugada es, con diferencia, <strong>el mayor ahorro por elegir la hora</strong> que puede hacer una casa española, muy por encima de cualquier electrodoméstico.',
    },
  },

  frigorifico: {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'La etiqueta del frigorífico da el consumo en <strong>kWh al año</strong>, que es el formato cómodo para este aparato porque no se apaga nunca. Divide entre 365 y tienes el consumo diario: un combi moderno de clase C con 200 kWh/año gasta 0,55 kWh al día; uno de clase F de la misma capacidad puede irse a 350 kWh/año, casi 1 kWh diario. Entre los dos hay unos 150 kWh al año de diferencia, y como el frigorífico suele ser el aparato que más consume de la casa al cabo del año, es de las pocas sustituciones que se amortizan solas.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La <strong>temperatura de la cocina</strong>, mucho más de lo que parece. El frigorífico no fabrica frío, saca calor de dentro y lo suelta por detrás; si el aire de alrededor está a 30 grados le cuesta bastante más que a 20. Un frigorífico pegado al horno, al lado de un radiador o en un garaje sin ventilar puede gastar un 20-30 % más haciendo exactamente lo mismo. Lo segundo es el hielo acumulado en los modelos sin no-frost: una capa de escarcha de medio centímetro actúa de aislante y obliga al compresor a trabajar de más.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Ponerlo al máximo de frío pensando que conserva mejor. Lo recomendable son <strong>4-5 grados en el frigorífico y -18 en el congelador</strong>; cada grado de más por debajo de eso añade consumo sin aportar nada a la conservación. El otro error es creer que en este aparato se puede ahorrar eligiendo la hora: el frigorífico arranca cuando le pide el termostato, de día y de noche, así que aquí la franja barata no sirve de nada. Lo que sirve es separarlo 5-10 cm de la pared y limpiar la rejilla trasera.',
    },
  },

  microondas: {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'Aquí hay una confusión muy extendida: los <strong>vatios que anuncia un microondas no son los que consume</strong>. Un microondas de 800 W entrega 800 W de potencia de calentamiento, pero para eso tira del enchufe unos 1.200-1.300 W, porque el magnetrón tiene un rendimiento de alrededor del 65 %. Esa es la cifra que cuenta en la factura. Suele venir en la placa de características de la parte trasera, como "potencia de entrada" o "input".',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'Solo el <strong>tiempo</strong>, porque la potencia es casi constante. Y hay un detalle: cuando seleccionas el 50 % de potencia, el microondas no calienta a media potencia, enciende y apaga el magnetrón alternando. Gasta aproximadamente la mitad, sí, pero tarda el doble, así que el consumo total del plato acaba siendo parecido. Lo que sí ahorra de verdad es tapar el recipiente: el vapor se queda dentro y calienta la comida en lugar de escaparse.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Tenerle miedo por su potencia. Un microondas es de los aparatos más <strong>baratos de usar</strong> de toda la cocina, no por eficiente sino porque se usa durante minutos: calentar un plato cinco minutos cuesta del orden de 0,1 kWh, céntimos. Para recalentar, descongelar o cocer verduras es la opción más barata que hay en casa, muy por delante del horno y por delante de la vitrocerámica. El consumo que sí conviene mirar es el del reloj en reposo, que en modelos antiguos puede rondar los 3 W las 24 horas.',
    },
  },

  plancha: {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'Las planchas no llevan etiqueta energética, así que el único dato es la <strong>potencia de la placa</strong>: entre 1.800 y 2.400 W las de vapor domésticas, y hasta 2.800 W los centros de planchado. Pero esa potencia no se consume de forma continua: el termostato enciende y apaga la resistencia para mantener la temperatura, y una plancha en régimen trabaja quizá el 40-50 % del tiempo. Una sesión de una hora con una plancha de 2.200 W sale por algo más de 1 kWh, no por 2,2.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'El <strong>vapor</strong>, que obliga a evaporar agua y es la parte que más energía pide, y el calentamiento inicial, que es un coste fijo por sesión. De ahí la regla práctica: planchar cuarenta minutos seguidos gasta mucho menos que cuatro sesiones de diez minutos repartidas en la semana, porque el arranque se paga una vez en lugar de cuatro. En los centros de planchado con caldera, el calentamiento inicial es todavía más caro, pero luego mantienen mejor.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Dejarla calentando mientras se dobla la ropa o se atiende otra cosa. Una plancha olvidada encendida media hora cuesta más que la mitad de la colada que estabas planchando. Y como es una tarea que se puede <strong>mover de hora sin ninguna molestia</strong>, es de los pocos aparatos de la casa donde elegir la franja barata tiene sentido real: planchar un domingo a mediodía en vez de un martes a las nueve de la noche puede costar tres veces menos.',
    },
  },

  'calefaccion-electrica': {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'Con la calefacción eléctrica por resistencia la cuenta es la más sencilla de toda la casa y no hace falta etiqueta: <strong>1.000 W encendidos una hora son 1 kWh</strong>, exactamente. Un radiador de 1.500 W a plena potencia gasta 1,5 kWh por hora; si el termostato lo tiene funcionando la mitad del tiempo, 0,75. Eso vale para radiadores de aceite, convectores, paneles de mica, toalleros, emisores térmicos y placas de cerámica: todos ellos.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'Las <strong>pérdidas de la vivienda</strong>, no el aparato. Un radiador tiene que reponer exactamente el calor que se escapa por ventanas, paredes y rendijas, así que la factura la decide el aislamiento y la temperatura de consigna. Bajar un grado el termostato recorta alrededor de un 7 % del consumo de calefacción. Y calentar solo la habitación que se usa, con la puerta cerrada, cambia la factura de forma mucho más drástica que cualquier ajuste del propio radiador.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Comprar un radiador <strong>"de bajo consumo"</strong>. No existe. Todos los calefactores eléctricos de resistencia convierten en calor el 100 % de la electricidad que reciben: ni uno solo puede dar más calor que otro con los mismos vatios. Lo que cambia entre un radiador de aceite y un convector es el reparto del calor y la inercia, no el consumo. El único aparato eléctrico que de verdad calienta por menos es la <strong>bomba de calor</strong>, que no genera calor sino que lo trae de fuera y por eso puede dar tres o cuatro kWh de calor por cada kWh pagado.',
    },
  },

  'bomba-de-calor': {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'El número que define una bomba de calor es el <strong>COP</strong> (rendimiento instantáneo) y, en la etiqueta, el <strong>SCOP</strong> (rendimiento estacional, que es el que vale para calcular la temporada). Un SCOP de 4 significa que por cada kWh de electricidad que pagas entrega 4 kWh de calor en la vivienda. Para saber lo que gasta, divide el calor que necesitas entre el SCOP: una estancia que pide 2 kW de calor con un equipo de SCOP 4 consume unos 500 W. Es la razón de que calentar con bomba de calor cueste entre un tercio y un cuarto que hacerlo con radiadores eléctricos.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La <strong>temperatura exterior</strong>. El rendimiento no es fijo: a 12 grados fuera, una bomba de calor puede estar en COP 4,5; a 0 grados baja a 2,5-3; y por debajo de cero entra en juego el <strong>desescarche</strong>, ciclos en los que invierte su funcionamiento para derretir el hielo de la unidad exterior y durante los cuales no calienta pero sí consume. Por eso el mismo equipo sale baratísimo en Málaga y bastante menos ventajoso en Burgos.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Usarla como un radiador: encenderla a tope al llegar y apagarla al salir. Un equipo inverter es más eficiente trabajando de forma continua a baja potencia que arrancando y parando, porque el compresor modula. En una casa que se ocupa todo el día sale más barato dejarla a 20 grados constantes que subirla a 24 dos horas. El otro error es olvidar los <strong>filtros</strong>: sucios reducen el caudal de aire y tiran el rendimiento abajo sin dar ningún aviso.',
    },
  },

  'depuradora-piscina': {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'En la placa de la bomba vienen dos datos: la potencia en CV o kW y el <strong>caudal en m³/h</strong>. El segundo es el que determina cuántas horas tienes que filtrar: la regla de mantenimiento habitual es pasar todo el volumen del vaso por el filtro una o dos veces al día. Una piscina de 48 m³ con una bomba de 8 m³/h necesita 6 horas para un ciclo completo. La potencia eléctrica real suele rondar 600-750 W en una bomba de 3/4 CV, así que esas 6 horas son unos 4 kWh diarios.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'Si la bomba es de <strong>velocidad variable</strong>, muchísimo. En una bomba centrífuga el consumo no baja de forma proporcional a la velocidad sino aproximadamente con el cubo: a mitad de velocidad mueve la mitad de caudal pero consume en torno a la octava parte. Filtrar el doble de horas a media velocidad mueve el mismo agua gastando una fracción. Es, de lejos, el mayor ahorro disponible en una piscina, muy por encima de mover las horas de filtrado. Lo segundo es el filtro sucio: un manómetro por encima de su presión normal significa que la bomba está forzando.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Filtrar de noche porque "la luz es más barata". En verano, con la fotovoltaica en el sistema, <strong>el tramo barato del PVPC cae de día</strong>, típicamente entre las 11 y las 17, y encima es cuando interesa filtrar: es el momento de más calor, más uso del vaso y más actividad de las algas. Filtrar al mediodía suele ser a la vez lo más barato y lo más eficaz. El otro error es filtrar siempre las mismas horas todo el verano sin ajustar a la temperatura del agua.',
    },
  },

  'freidora-de-aire': {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'No llevan etiqueta energética; el único dato es la potencia de la placa, entre 1.400 y 2.100 W en los modelos domésticos. Pero esa potencia engaña: la freidora de aire es, en el fondo, un <strong>horno pequeño con un ventilador muy potente</strong>, y lo que la hace barata no es consumir poco sino tener que calentar un volumen mínimo. Donde un horno tiene que poner a temperatura 60 litros de aire más el propio chasis, ella calienta 4 o 5 litros. Esa es toda la diferencia.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La <strong>cantidad de comida</strong>, por lo que ocupa en la cesta. Una freidora de aire va bien hasta dos o tres raciones; a partir de ahí hay que hacer tandas, y cada tanda vuelve a pagar su tiempo completo. Dos tandas de 20 minutos a 1.700 W son 1,1 kWh, que ya es más que un ciclo de horno en el que habría cabido todo de una vez. La cuenta cambia de bando según cuánta gente coma.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Darla por más barata siempre. Para una o dos personas lo es con claridad: unos 0,4-0,5 kWh frente a los 1,5-2 kWh de encender el horno. Para una familia de cinco, el horno vuelve a ganar porque cocina todo a la vez. El otro error es <strong>precalentarla</strong> cinco minutos por costumbre: con ese volumen de aire tan pequeño, la mayoría de las recetas funcionan metiendo la comida en frío y sumando un par de minutos al tiempo.',
    },
  },

  television: {
    etiqueta: {
      h: 'Cómo saber lo que gasta la tuya',
      p: 'La etiqueta de los televisores da el consumo en <strong>kWh por 1.000 horas</strong>, y desde el rescalado de 2021 da dos cifras: una en SDR (contenido normal) y otra en <strong>HDR</strong>, que es bastante más alta porque el panel trabaja a más brillo. Una tele de 55 pulgadas típica ronda 70-90 kWh/1.000 h en SDR y puede irse a 130-150 en HDR. Divide entre 1.000 y tienes los kW: 80 kWh/1.000 h son 80 W de consumo medio.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'El <strong>brillo</strong> y el tamaño, en ese orden. El modo "dinámico" o "tienda" que traen de fábrica pone el panel casi al máximo y puede duplicar el consumo frente al modo cine o estándar, sin que la imagen mejore en el salón de una casa. Y el tamaño pesa mucho: pasar de 43 a 65 pulgadas más o menos dobla la superficie que hay que iluminar. En las OLED hay un matiz: consumen según lo que se ve en pantalla, así que una película oscura gasta bastante menos que un partido con el campo iluminado.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Desenchufarla cada noche por el consumo en reposo. La normativa europea limita el <strong>standby a 0,5 W</strong>, lo que son menos de 4,4 kWh al año: unos céntimos. La molestia no compensa, y además deja sin actualizar el aparato. Si te preocupa el consumo invisible de la casa, los candidatos reales son otros: descodificadores antiguos, amplificadores, equipos de sonido y cargadores con transformador que sí pueden estar en varios vatios cada uno.',
    },
  },

  ordenador: {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'No hay etiqueta, y el dato que todo el mundo mira es justo el equivocado: la <strong>potencia de la fuente de alimentación no es el consumo</strong>. Una fuente de 750 W es el máximo que puede entregar, no lo que entrega. Un sobremesa de oficina con esa fuente consume 40-70 W navegando. Para saber lo tuyo, lo fiable es un medidor de enchufe de 10-15 €; como referencia: portátil 30-50 W, sobremesa de oficina 50-90 W, sobremesa con tarjeta gráfica dedicada 150-250 W en uso normal y 400-600 W jugando.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'La <strong>tarjeta gráfica</strong>, y solo cuando trabaja. Un mismo equipo puede moverse entre 60 W escribiendo un correo y 500 W en un juego exigente: diez veces, con el mismo aparato y las mismas horas. El monitor suma aparte, entre 15 y 40 W según tamaño y brillo, y en los equipos con dos o tres pantallas eso deja de ser anecdótico. En los portátiles la diferencia entre el modo de máximo rendimiento y el equilibrado también es real, del orden de un 30 %.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Dejarlo encendido todo el día "porque arrancar gasta más". El pico de arranque dura segundos y equivale a unos pocos minutos de funcionamiento normal: no compensa ni de lejos ocho horas encendido. Para pausas de menos de una hora, <strong>suspender</strong> (que deja el equipo en 1-3 W); para el resto del día, apagar. El otro error es poner el salvapantallas en movimiento: no ahorra nada, mantiene el equipo trabajando. Apagar la pantalla sí.',
    },
  },

  deshumidificador: {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'La cifra grande del envase son los <strong>litros al día</strong>, y es la que más engaña: se mide a 30 grados y 80 % de humedad, condiciones de laboratorio que en una casa española en invierno no se dan nunca. A 15 grados, el mismo aparato de "20 litros/día" puede estar sacando 6 o 7. El dato de consumo está en la placa, en vatios: 250-450 W para los de compresor de uso doméstico. Y hay una familia aparte, los <strong>desecantes</strong>, que funcionan con una resistencia y consumen bastante más (500-700 W) aunque rinden mejor en frío.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'Las <strong>horas seguidas</strong>, porque es un aparato de potencia media que trabaja sin parar. 350 W durante ocho horas son 2,8 kWh al día, y en la costa eso se repite medio invierno: más de 400 kWh en la temporada, por encima de lo que gasta al año muchos aparatos que parecen más voraces. Lo segundo es el volumen de la estancia y si la puerta está abierta: un deshumidificador con la casa entera abierta no termina nunca.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Dejarlo en marcha continua en vez de usar el <strong>higrostato</strong>. Puesto en 50-55 % de humedad objetivo, el aparato arranca y para solo, y pasa de funcionar ocho horas a funcionar tres o cuatro. Es el mismo resultado por la mitad. Y como da igual a qué hora se seque el aire, es de los aparatos de la casa que mejor se prestan a programarse en la franja barata con un simple enchufe temporizador.',
    },
  },

  'secador-de-pelo': {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'Sin etiqueta: lo único que hay es la potencia del mango, entre 1.600 y 2.400 W en los domésticos. La cuenta es directa porque no hay termostato que module gran cosa: 2.000 W durante 8 minutos son <strong>0,27 kWh</strong>. Con el precio medio del PVPC eso son unos tres céntimos. Es literalmente el aparato más potente de muchas casas y uno de los que menos dinero mueve, porque el tiempo de uso es ridículo comparado con todo lo demás.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'Solo los <strong>minutos</strong>. El aire frío consume mucho menos (solo el motor, sin resistencia, unos 100-150 W), así que terminar con aire frío no solo fija mejor el peinado sino que es casi gratis. Los modelos de motor digital sin escobillas secan antes moviendo más aire con menos potencia, que es por donde ahorran: no por consumir menos por minuto, sino por necesitar menos minutos.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Preocuparse por él. Si tu factura de la luz se ha disparado, el secador no es el culpable: 0,27 kWh por uso diario son unos 100 kWh al año, menos que el router. En el cuarto de baño el consumo de verdad está en el <strong>agua caliente</strong>: una ducha de diez minutos con termo eléctrico puede costar 1,5-2 kWh, cinco o seis veces más que secarse el pelo entero. Si quieres ahorrar en el baño, acorta la ducha antes que el secado.',
    },
  },

  'router-wifi': {
    etiqueta: {
      h: 'Cómo saber lo que gasta el tuyo',
      p: 'No hay etiqueta; el dato está en el <strong>transformador</strong>, donde pone la salida en voltios y amperios. Multiplicados dan los vatios máximos: un adaptador de 12 V y 1,5 A son 18 W de tope, y en funcionamiento normal el router estará por debajo, en 8-12 W. Ojo con contar solo uno: en una instalación de fibra hay <strong>ONT más router</strong>, y si hay repetidores, un descodificador de televisión o un switch, el conjunto se puede ir a 30-40 W permanentes.',
    },
    queCambia: {
      h: 'Qué dispara el consumo',
      p: 'Prácticamente nada: es un consumo plano. Un router gasta casi lo mismo descargando una película que de madrugada sin nadie en casa, porque lo que consume es la electrónica encendida, no el tráfico. La única variable real es <strong>cuántos aparatos de red tengas</strong>. Diez vatios sostenidos son 87 kWh al año; con ONT y dos repetidores la instalación de red de una casa puede rondar los 250 kWh anuales, más que un frigorífico moderno.',
    },
    errores: {
      h: 'El error habitual',
      p: 'Apagarlo por la noche para ahorrar. Son unos 3 kWh al mes como mucho, deja sin conexión al teléfono fijo, a las cámaras y a las actualizaciones, y en algunas instalaciones de fibra la resincronización al arrancar tarda minutos. Si de verdad quieres atacar el consumo invisible de la casa, el camino es otro: pasar un medidor de enchufe por los aparatos que están siempre conectados. Entre descodificadores antiguos, equipos de sonido, cargadores y pequeños electrodomésticos en reposo suele haber <strong>bastantes más vatios permanentes</strong> que en el router.',
    },
  },
};

export const fichaDe = (slug) => FICHAS[slug] || null;
