import { site } from './site';

export type Pregunta = { pregunta: string; respuesta: string };

/**
 * Máximo seis preguntas en la home: las que se repiten antes de la primera
 * llamada. Lo demás va a una página de FAQ propia, si algún día existe.
 *
 * TODO: validar con el cliente las condiciones comerciales que se afirman aquí
 * (sin permanencia, propuesta con precio cerrado) y la ciudad — `site.location`
 * sigue siendo placeholder y estas respuestas dicen Madrid.
 */
export const faq: Pregunta[] = [
  {
    pregunta: '¿Con qué tipo de empresas trabajáis?',
    respuesta:
      'Con negocios que ya funcionan y quieren competir en otra categoría: pequeñas y medianas empresas, de producto o de servicio, con alguien capaz de tomar decisiones al otro lado. No hace falta que tengas un departamento de marketing; hace falta que haya un objetivo de negocio detrás.',
  },
  {
    pregunta: '¿Qué servicios se pueden combinar?',
    respuesta:
      'Todos. Branding, producción audiovisual, social media, paid media y web son piezas del mismo sistema y casi siempre rinden mejor juntas. Lo habitual es empezar por la marca y sumar después lo recurrente, pero el orden lo marca lo que el negocio necesite primero.',
  },
  {
    pregunta: '¿Existe permanencia en los servicios recurrentes?',
    respuesta:
      'No. Los servicios recurrentes se renuevan mes a mes y puedes pararlos avisando con antelación, sin penalización. Preferimos que la relación se sostenga por los resultados y no por una cláusula.',
  },
  {
    pregunta: '¿Cómo empieza un proyecto con La Otra Cara?',
    respuesta:
      'Con una conversación de media hora para entender el contexto, el objetivo y el punto de partida. Después recibes una propuesta con alcance, plazos y precio cerrado. Si encaja, arrancamos con una fase de inmersión antes de tocar nada visual.',
  },
  {
    pregunta: '¿Trabajáis únicamente en Madrid?',
    respuesta:
      'Estamos en Madrid y allí rodamos y nos vemos cuando el proyecto lo pide, pero el trabajo del día a día es remoto. Tenemos clientes fuera de la ciudad y fuera del país; solo la producción audiovisual depende de dónde esté el rodaje.',
  },
  {
    pregunta: '¿Cómo puedo solicitar un presupuesto?',
    respuesta: `Escríbenos a ${site.email} contándonos qué necesitas y en qué plazo. Con eso te damos una primera orientación de precio y, si tiene sentido, agendamos una llamada para cerrar el alcance.`,
  },
];
