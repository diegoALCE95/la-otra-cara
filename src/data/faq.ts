export type Pregunta = { pregunta: string; respuesta: string };

/**
 * Máximo seis preguntas en la home: las que se repiten antes de la primera
 * llamada. Lo demás va a una página de FAQ propia, si algún día existe.
 *
 * TODO: validar con el cliente las condiciones comerciales que se afirman aquí
 * (precios de referencia de social media y web, qué entra en cada servicio).
 */
export const faq: Pregunta[] = [
  {
    pregunta: '¿Con qué tipo de restaurantes trabajáis?',
    respuesta:
      'Somos una agencia especializada en marketing gastronómico para restaurantes. Trabajamos principalmente con restaurantes que quieren comunicar mejor su propuesta, mejorar su presencia digital y conectar con nuevos comensales. También valoramos proyectos de cafeterías, bares y hoteles cuando nuestros servicios encajan con sus necesidades.',
  },
  {
    pregunta: '¿Qué servicios de marketing gastronómico ofrecéis?',
    respuesta:
      'Unimos estrategia y gestión de redes sociales, producción audiovisual, diseño web y email marketing. También ofrecemos consultoría sobre comunicación digital, eficiencia y digitalización del restaurante. Los servicios pueden contratarse por separado o combinarse; antes de empezar, definimos qué incluye cada propuesta y qué acciones se realizarán.',
  },
  {
    pregunta: '¿La gestión de redes sociales incluye fotografía y vídeo profesional?',
    respuesta:
      'La gestión de redes sociales puede incluir estrategia, planificación, calendario de contenidos, redacción y publicación, según el plan contratado. La fotografía gastronómica, la grabación de vídeo y la edición de reels no se incluyen automáticamente: se contratan como servicio audiovisual o dentro de un pack personalizado.',
  },
  {
    pregunta: '¿Cómo puede el marketing digital ayudar a atraer nuevos comensales?',
    respuesta:
      'Trabajamos el alcance, el interés y la confianza. Primero, buscamos que nuevas personas descubran el restaurante; después, mostramos sus platos, su espacio y la experiencia que ofrece; por último, cuidamos la información digital para facilitar que el cliente valore la propuesta y dé el siguiente paso. El objetivo es aumentar la visibilidad y el interés, sin prometer un número concreto de reservas.',
  },
  {
    pregunta: '¿Cuánto cuesta contratar marketing para un restaurante?',
    respuesta:
      'El precio depende de los servicios, la frecuencia de los contenidos y la producción necesaria. Como referencia, la gestión de redes sociales con estrategia tiene un valor desde 490 € + IVA al mes y el diseño de una web para restaurante a partir de 890 € + IVA. La producción audiovisual y los demás servicios se presupuestan según el alcance acordado.',
  },
  {
    pregunta: '¿Cuánto se tarda en ver resultados con el marketing gastronómico?',
    respuesta:
      'No existe un plazo igual para todos los restaurantes. La visibilidad, las visitas al perfil y las consultas pueden mostrar señales antes que el efecto en reservas o recurrencia. Influyen la ubicación, la propuesta gastronómica, la reputación y la experiencia del local. Por eso acordamos qué indicadores revisar y ajustamos las acciones según lo que observemos, sin garantizar resultados concretos.',
  },
];
