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
  /**
   * Corrección óptica por logo: multiplica la altura base de la pista.
   * Los logos compactos o circulares necesitan más altura que los
   * horizontales para pesar lo mismo dentro de la fila.
   */
  escala?: number;
};

export const restaurantes: Restaurante[] = [
  { nombre: 'Rubén Miralles', logo: logo01, escala: 1 },
  { nombre: 'In Bocca al Lupo', logo: logo02, escala: 1 },
  { nombre: 'La Mar de Bien', logo: logo03, escala: 1.6 },
  // 4.png es un logotipo horizontal en mayúsculas de trazo grueso: pesa más
  // que los manuscritos de al lado, así que va algo por debajo de la base.
  { nombre: 'Albert Guzmán Restaurant', logo: logo04, escala: 0.85 },
  { nombre: 'Santamaría Coctelería', logo: logo05, escala: 2 },
  { nombre: 'Café del Art', logo: logo06, escala: 2.1 },
];
