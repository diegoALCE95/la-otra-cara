export type Testimonio = {
  /** Cita de la card. El énfasis cierra la frase en cursiva serif. */
  cita: string;
  citaEnfasis: string;
  autor: string;
  cargo: string;
  /** Rótulo del hueco de la miniatura mientras no llega el retrato real. */
  placeholder: string;
  /** Frase breve que acompaña al vídeo dentro del visor. */
  citaVideo: string;
  /** ID de YouTube del testimonio en vídeo. */
  video: string;
};

/**
 * TODO: atribución real de los tres testimonios (nombre, cargo y empresa son
 * placeholder, igual que las citas 02 y 03).
 * TODO: faltan los tres retratos 4/5 de las miniaturas.
 * TODO: los tres vídeos apuntan al mismo placeholder — "Big Buck Bunny"
 * (Blender Foundation, CC-BY) — hasta que lleguen las piezas reales.
 */
export const testimonios: Testimonio[] = [
  {
    cita: 'No solo entendieron nuestra marca. Entendieron ',
    citaEnfasis: 'en qué podía convertirse.',
    autor: 'Nombre Apellido',
    cargo: 'Founder — Casa Brava',
    placeholder: 'Retrato 01',
    citaVideo: 'Entendieron perfectamente lo que necesitábamos.',
    video: 'aqz-KE-bpKQ',
  },
  {
    cita: 'Nos devolvieron una marca que ',
    citaEnfasis: 'ya no había que explicar.',
    autor: 'Nombre Apellido',
    cargo: 'Founder — Empresa 02',
    placeholder: 'Retrato 02',
    citaVideo: 'Trabajar con ellos cambió cómo nos ve el mercado.',
    video: 'aqz-KE-bpKQ',
  },
  {
    cita: 'Dejamos de competir por precio y empezamos a ',
    citaEnfasis: 'competir por criterio.',
    autor: 'Nombre Apellido',
    cargo: 'Founder — Empresa 03',
    placeholder: 'Retrato 03',
    citaVideo: 'El equipo entero se alineó en una sola dirección.',
    video: 'aqz-KE-bpKQ',
  },
];
