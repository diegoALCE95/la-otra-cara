import type { ImageMetadata } from 'astro';

import posterArriero from '../assets/img/portfolio/01-arriero.jpg';
import posterAgora from '../assets/img/portfolio/02-agora.jpg';
import posterLasCumbres from '../assets/img/portfolio/03-las-cumbres.jpg';
import posterTngiers from '../assets/img/portfolio/04-tngiers.jpg';
import posterAkantojo from '../assets/img/portfolio/05-akantojo.jpg';
import posterLasCumbresLocal from '../assets/img/portfolio/06-las-cumbres.jpg';

export type Proyecto = {
  titulo: string;
  /** Opcional: si no se indica, la línea de categoría no se pinta. */
  categoria?: string;
  anio: string;
  /** Clase de aspect-ratio del contenedor de imagen (literal, para el scanner de Tailwind). */
  ratio: string;
  /** Fotograma del propio vídeo que hace de portada en la card y de `poster` en el visor. */
  poster: ImageMetadata;
  /** Ruta pública del vídeo vertical (9:16), comprimido a H.264 1080×1920 para web. */
  video: string;
};

/**
 * Piezas de vídeo de restaurantes, en el orden numerado de la carpeta original
 * (`public/RESTAURANTES/1. RESTAURANTES`).
 * TODO: los años son provisionales (asignados al azar entre 2022 y 2026).
 * Un único array: el carrusel muestra tres columnas y avanza de uno en uno, así
 * que todas las piezas comparten proporción.
 */
export const proyectos: Proyecto[] = [
  {
    titulo: 'Arriero',
    anio: '2024',
    ratio: 'aspect-[3/4]',
    poster: posterArriero,
    video: '/portfolio/01-arriero.mp4',
  },
  {
    titulo: 'Agora',
    anio: '2022',
    ratio: 'aspect-[3/4]',
    poster: posterAgora,
    video: '/portfolio/02-agora.mp4',
  },
  {
    titulo: 'Las Cumbres',
    anio: '2025',
    ratio: 'aspect-[3/4]',
    poster: posterLasCumbres,
    video: '/portfolio/03-las-cumbres.mp4',
  },
  {
    titulo: 'Tngiers',
    anio: '2023',
    ratio: 'aspect-[3/4]',
    poster: posterTngiers,
    video: '/portfolio/04-tngiers.mp4',
  },
  {
    titulo: 'Akantojo',
    anio: '2026',
    ratio: 'aspect-[3/4]',
    poster: posterAkantojo,
    video: '/portfolio/05-akantojo.mp4',
  },
  {
    titulo: 'Las Cumbres',
    anio: '2024',
    ratio: 'aspect-[3/4]',
    poster: posterLasCumbresLocal,
    video: '/portfolio/06-las-cumbres.mp4',
  },
];
