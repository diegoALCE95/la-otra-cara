import type { ImageMetadata } from 'astro';

import branding from '../assets/img/svc-01-branding-b.png';
// import social from '../assets/img/svc-02-social.png'; // Email Marketing, oculto.
import paid from '../assets/img/svc-03-paid.png';
import web from '../assets/img/svc-04-web.png';
import produccion from '../assets/img/svc-05-produccion.png';

/**
 * Bloques del cuerpo del acordeón. Un servicio puede alternar párrafos sueltos
 * con listas numeradas (las fases de un servicio), por eso el cuerpo es un
 * array de bloques y no una sola cadena.
 */
export type BloqueCuerpo =
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'fases'; items: { titulo: string; texto: string }[] };

export type Servicio = {
  titulo: string;
  /** Opcional: si falta, no se renderiza nada en su lugar. */
  subtitulo?: string;
  /** Cuerpo del acordeón: se despliega al abrir la fila. */
  cuerpo: BloqueCuerpo[];
  imagen: ImageMetadata;
  /** Filtro CSS por imagen: parte de la identidad visual, no un extra. */
  filtro: string;
};

/**
 * El orden del array define la numeración (01–05) y el índice del stage sticky.
 * El servicio activo por defecto es el primero.
 */
export const servicios: Servicio[] = [
  {
    titulo: 'Producción Audiovisual',
    subtitulo: 'Que el primer bocado empiece por los ojos',
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'Fotografiamos y grabamos los platos, el espacio y el ambiente del restaurante para crear imágenes y vídeos que despierten interés y reflejen la personalidad de cada propuesta. Las piezas se planifican para la web y las redes sociales según el alcance acordado.',
      },
    ],
    imagen: produccion,
    filtro: 'sepia(.06) saturate(1.08) contrast(1.04) brightness(1.04)',
  },
  {
    titulo: 'Social Media + Estrategia',
    subtitulo: 'De aparecer en el radar a despertar las ganas de venir',
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'Definimos la estrategia, el calendario, los textos y la publicación de contenidos para que las redes comuniquen mejor la propuesta del restaurante. Trabajamos tres fases:',
      },
      {
        tipo: 'fases',
        items: [
          {
            titulo: 'Alcance.',
            texto: 'Creamos contenido para que nuevas personas descubran el restaurante.',
          },
          {
            titulo: 'Interés y deseo.',
            texto:
              'Mostramos los platos, el espacio y la experiencia para despertar ganas de conocerlo.',
          },
          {
            titulo: 'Confianza y acción.',
            texto:
              'Cuidamos la información y la coherencia del perfil para que el cliente pueda valorar la propuesta y dar el siguiente paso.',
          },
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'El email marketing se ofrece como un servicio específico de fidelización ya que diseñamos motivos para Volver. Diseñamos campañas de email para comunicar novedades, menús de temporada y acciones del restaurante. El objetivo es mantener el vínculo con los clientes y favorecer que vuelvan.',
      },
    ],
    imagen: branding,
    filtro: 'sepia(.08) saturate(1.08) contrast(1.04) brightness(1.08)',
  },
  /*
   * Email Marketing queda oculto: su propuesta se cuenta dentro de
   * Social Media + Estrategia. Para recuperarlo, descomenta este bloque
   * y su import `social`; la numeración y el stage se recalculan solos.
   *
   * {
   *   titulo: 'Email Marketing',
   *   cuerpo: [
   *     {
   *       tipo: 'parrafo',
   *       texto:
   *         'Estrategia, campañas y automatizaciones para convertir la base de datos en una relación comercial más rentable.',
   *     },
   *   ],
   *   imagen: social,
   *   filtro: 'sepia(.08) saturate(1.08) contrast(1.04) brightness(1.08)',
   * },
   */
  {
    titulo: 'Diseño y Desarrollo Web',
    subtitulo: 'Una web que abre el apetito',
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'Diseñamos webs para restaurantes que ponen los platos y el espacio en primer plano. Cuidamos la fotografía y el vídeo, la navegación y la información que necesita el comensal para consultar la propuesta y contactar o reservar. Cuando el proyecto lo incluya, podemos sumar recursos visuales panorámicos o recorridos 360º.',
      },
    ],
    imagen: web,
    filtro: 'sepia(.06) saturate(1.08) contrast(1.04) brightness(1.06)',
  },
  {
    titulo: 'Consultoría y digitalización',
    subtitulo: 'Mejoramos cómo comunicas y cómo trabajas',
    cuerpo: [
      {
        tipo: 'parrafo',
        texto:
          'Analizamos las redes sociales, la estrategia digital y los procesos del día a día que podrían ser más eficientes.',
      },
      {
        tipo: 'parrafo',
        texto:
          'A partir de ese análisis, proponemos mejoras para ahorrar tiempo, reducir tareas manuales e incorporar herramientas de inteligencia artificial cuando realmente encajen con el negocio. Cada solución se concreta según las necesidades y el alcance acordado.',
      },
    ],
    imagen: paid,
    filtro: 'sepia(.06) saturate(1.10) contrast(1.06) brightness(1.18)',
  },
];
