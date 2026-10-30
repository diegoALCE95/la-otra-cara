import type { ImageMetadata } from 'astro';

import logo01 from '../assets/img/1.png';
import logo02 from '../assets/img/2.png';
import logo03 from '../assets/img/3.png';
import logo04 from '../assets/img/4.png';
import logo05 from '../assets/img/5.png';
import logo06 from '../assets/img/6.png';

export type Restaurante = {
  nombre: string;
  logo: ImageMetadata;
  /** TODO: URL real de cada restaurante; de momento todas apuntan a '#'. */
  href: string;
  /**
   * Corrección óptica por logo: multiplica la altura base de la pista.
   * Los logos compactos o circulares necesitan más altura que los
   * horizontales para pesar lo mismo dentro de la fila.
   */
  escala?: number;
};

export const restaurantes: Restaurante[] = [
  { nombre: 'Rubén Miralles', logo: logo01, href: '#', escala: 1 },
  { nombre: 'In Bocca al Lupo', logo: logo02, href: '#', escala: 1 },
  { nombre: 'La Mar de Bien', logo: logo03, href: '#', escala: 1.6 },
  // TODO: 4.png es un disco claro opaco con el grafismo en gris de muy bajo
  // contraste: sobre el fondo oscuro se lee como una mancha. Falta la versión
  // monocroma blanca sobre transparente, como el resto de logos.
  { nombre: 'Albert Guzmán Restaurant', logo: logo04, href: '#', escala: 2.6 },
  { nombre: 'Santamaría Coctelería', logo: logo05, href: '#', escala: 2 },
  { nombre: 'Café del Art', logo: logo06, href: '#', escala: 2.1 },
];
