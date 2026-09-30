export type Proyecto = {
  titulo: string;
  categoria: string;
  anio: string;
  /** Clase de aspect-ratio del contenedor de imagen (literal, para el scanner de Tailwind). */
  ratio: string;
  /** Texto del placeholder mientras no exista la imagen final. */
  placeholder: string;
};

/**
 * TODO: nombres de proyecto y años son placeholder del diseño.
 * TODO: faltan las 6 imágenes de portafolio (README, "Assets pendientes" #2).
 * Un único array: el carrusel muestra tres columnas y avanza de uno en uno, así
 * que todas las piezas comparten proporción.
 */
export const proyectos: Proyecto[] = [
  {
    titulo: 'NØR Studio',
    categoria: 'Branding / Digital',
    anio: '2026',
    ratio: 'aspect-[3/4]',
    placeholder: 'NØR Studio',
  },
  {
    titulo: 'Casa Brava',
    categoria: 'Branding / Social',
    anio: '2026',
    ratio: 'aspect-[3/4]',
    placeholder: 'Casa Brava',
  },
  {
    titulo: 'Nómada',
    categoria: 'Strategy / Campaign',
    anio: '2025',
    ratio: 'aspect-[3/4]',
    placeholder: 'Nómada',
  },
  {
    titulo: 'Verso',
    categoria: 'Paid Media / Producción',
    anio: '2026',
    ratio: 'aspect-[3/4]',
    placeholder: 'Verso',
  },
  {
    titulo: 'Atria',
    categoria: 'Branding / Producto',
    anio: '2025',
    ratio: 'aspect-[3/4]',
    placeholder: 'Atria',
  },
  {
    titulo: 'Hoja Negra',
    categoria: 'Hospitality / Social',
    anio: '2026',
    ratio: 'aspect-[3/4]',
    placeholder: 'Hoja Negra',
  },
];
