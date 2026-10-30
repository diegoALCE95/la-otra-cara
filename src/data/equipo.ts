import type { ImageMetadata } from 'astro';

import borja from '../assets/img/equipo-borja.jpg';
import pablo from '../assets/img/equipo-pablo.jpg';

export type Editorialista = {
  nombre: string;
  rol: string;
  /** Qué hace en el día a día: el párrafo del cuerpo de la card. */
  responsabilidad: string;
  /** Sin retrato todavía: se dibuja el hueco con `placeholder`. */
  foto: ImageMetadata | null;
  placeholder: string;
};

export const equipo: Editorialista[] = [
  {
    nombre: 'Borja Fernández',
    rol: 'Responsable de Contenidos y Estrategia Digital',
    responsabilidad:
      'Define la estrategia y el calendario de contenidos, coordina los rodajes, gestiona las redes y redacta los textos.',
    foto: borja,
    placeholder: 'Retrato fundador 01',
  },
  {
    nombre: 'Pablo Guillén',
    rol: 'Responsable de Producción Audiovisual',
    responsabilidad:
      'Se ocupa de la fotografía, la grabación, los guiones audiovisuales, la edición y la entrega del contenido final.',
    foto: pablo,
    placeholder: 'Retrato fundador 02',
  },
  {
    /**
     * TODO: falta el retrato de Lesley. El marco de la card es 5/7 y el
     * encuadre va horneado en el asset, no en CSS: recorte 5/7 con la cabeza
     * al 8% del alto, borde inferior del original conservado (así se ven los
     * brazos) y salida a 1400px de ancho. Los originales de Borja y Pablo
     * están en `design/source-media/retratos-equipo/` (fuera de git) para
     * poder rehacer los tres encuadres a la vez.
     */
    nombre: 'Lesley Salazar',
    rol: 'Responsable de Growth y Desarrollo de Negocio',
    responsabilidad:
      'Desarrolla oportunidades comerciales, campañas y seguimiento de prospectos, y participa en la consultoría para restaurantes.',
    foto: null,
    placeholder: 'Retrato fundador 03',
  },
];
