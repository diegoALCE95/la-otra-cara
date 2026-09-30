import type { ImageMetadata } from 'astro';

import branding from '../assets/img/svc-01-branding-b.png';
import social from '../assets/img/svc-02-social.png';
import paid from '../assets/img/svc-03-paid.png';
import web from '../assets/img/svc-04-web.png';
import produccion from '../assets/img/svc-05-produccion.png';

export type Servicio = {
  titulo: string;
  /** Cuerpo del acordeón: se despliega al abrir la fila. */
  texto: string;
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
    texto:
      'No hacemos contenido para rellenar un feed. Creamos imágenes que construyen marca.',
    imagen: produccion,
    filtro: 'sepia(.06) saturate(1.08) contrast(1.04) brightness(1.04)',
  },
  {
    titulo: 'Social Media + Estrategia',
    texto:
      'Estrategia, contenido y gestión de redes para construir una presencia digital reconocible, coherente y con algo que decir. Porque estar en redes es fácil. Tener una razón para que te presten atención es otra historia.',
    imagen: branding,
    filtro: 'sepia(.08) saturate(1.08) contrast(1.04) brightness(1.08)',
  },
  {
    titulo: 'Email Marketing',
    texto:
      'Estrategia, campañas y automatizaciones para convertir la base de datos en una relación comercial más rentable.',
    imagen: social,
    filtro: 'sepia(.08) saturate(1.08) contrast(1.04) brightness(1.08)',
  },
  {
    titulo: 'Diseño y Desarrollo Web',
    texto:
      'Diseñamos y desarrollamos webs que enseñan la mejor cara de una marca y, sobre todo, ayudan a convertir visitas en oportunidades.',
    imagen: web,
    filtro: 'sepia(.06) saturate(1.08) contrast(1.04) brightness(1.06)',
  },
  {
    titulo: 'Automatizaciones & IA',
    texto:
      'Automatizamos tareas, conectamos herramientas y aplicamos inteligencia artificial para que tu equipo dedique menos tiempo a repetir y más tiempo a decidir.',
    imagen: paid,
    filtro: 'sepia(.06) saturate(1.10) contrast(1.06) brightness(1.18)',
  },
];
