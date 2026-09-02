import type { ImageMetadata } from 'astro';

import branding from '../assets/img/svc-01-branding-b.png';
import social from '../assets/img/svc-02-social.png';
import paid from '../assets/img/svc-03-paid.png';
import web from '../assets/img/svc-04-web.png';
import produccion from '../assets/img/svc-05-produccion.png';

export type Servicio = {
  titulo: string;
  descripcion: string;
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
    titulo: 'Producción de Contenido',
    descripcion: 'Fotografía, video, dirección creativa y piezas para campañas.',
    imagen: produccion,
    filtro: 'sepia(.06) saturate(1.08) contrast(1.04) brightness(1.04)',
  },
  {
    titulo: 'Branding & Estrategia',
    descripcion: 'Posicionamiento, identidad de marca, dirección visual y sistemas gráficos.',
    imagen: branding,
    filtro: 'sepia(.08) saturate(1.08) contrast(1.04) brightness(1.08)',
  },
  {
    titulo: 'Social Media',
    descripcion: 'Estrategia, contenido, dirección creativa y gestión de comunidades.',
    imagen: social,
    filtro: 'sepia(.08) saturate(1.08) contrast(1.04) brightness(1.08)',
  },
  {
    titulo: 'Paid Media',
    descripcion: 'Campañas digitales orientadas a crecimiento, adquisición y performance.',
    imagen: paid,
    filtro: 'sepia(.06) saturate(1.10) contrast(1.06) brightness(1.18)',
  },
  {
    titulo: 'Diseño & Desarrollo Web',
    descripcion: 'Experiencias digitales enfocadas en marca, conversión y posicionamiento.',
    imagen: web,
    filtro: 'sepia(.06) saturate(1.08) contrast(1.04) brightness(1.06)',
  },
];
