export type Proyecto = {
  titulo: string;
  categoria: string;
  anio: string;
  /** Clase de aspect-ratio del contenedor de imagen (literal, para el scanner de Tailwind). */
  ratio: string;
  /** Texto del placeholder mientras no exista la imagen final. */
  placeholder: string;
  /** Desfase vertical deliberado dentro de la fila. */
  desfasado?: boolean;
};

/**
 * TODO: nombres de proyecto y años son placeholder del diseño.
 * TODO: faltan las 6 imágenes de portafolio (README, "Assets pendientes" #2).
 * Los tres bloques reproducen el grid asimétrico de la referencia.
 */
export const proyectos = {
  fila1: [
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
      ratio: 'aspect-[4/5]',
      placeholder: 'Casa Brava',
      desfasado: true,
    },
    {
      titulo: 'Nómada',
      categoria: 'Strategy / Campaign',
      anio: '2025',
      ratio: 'aspect-[3/4]',
      placeholder: 'Nómada',
    },
  ] satisfies Proyecto[],
  destacado: {
    titulo: 'Verso',
    categoria: 'Paid Media / Producción',
    anio: '2026',
    ratio: 'aspect-[16/7] min-h-[220px]',
    placeholder: 'Verso',
  } satisfies Proyecto,
  fila2: [
    {
      titulo: 'Atria',
      categoria: 'Branding / Producto',
      anio: '2025',
      ratio: 'aspect-[4/3]',
      placeholder: 'Atria',
    },
    {
      titulo: 'Hoja Negra',
      categoria: 'Hospitality / Social',
      anio: '2026',
      ratio: 'aspect-[4/3]',
      placeholder: 'Hoja Negra',
    },
  ] satisfies Proyecto[],
};
