/** Datos transversales del sitio. Los marcados con TODO son placeholder. */

export const site = {
  name: 'La Otra Cara',
  tagline: 'Agencia de Marketing',
  title: 'La Otra Cara — Agencia Creativa & Marketing',
  description:
    'Agencia boutique de marketing, branding y crecimiento digital. Estrategia, identidad y comunicación para marcas que quieren competir en otra categoría.',
  email: 'hola@laotracara.com',
  // TODO: número real de WhatsApp (https://wa.me/<código+número>).
  whatsapp: 'https://wa.me/',
  // TODO: handle real de Instagram.
  instagram: 'https://instagram.com/',
  // TODO: ciudad y país reales del estudio.
  location: 'Ciudad — País',
  locationNote: 'Trabajamos con marcas en toda LATAM.',
  year: 2026,
} as const;

/**
 * Media del hero. El video es decorativo: se difiere por JS tras el `load` y
 * en móvil (<900px) no se descarga — se queda el poster, que bajo el `blur(3px)`
 * del hero apenas se distingue del primer fotograma. Ver `src/scripts/hero-video.ts`.
 * Recodificado a 1280x720 / 25 fps, sin audio y con el desenfoque horneado
 * (`gblur sigma=0.6`): 1,5 MB desde los 204 MB del máster, que vive fuera del
 * repo en `design/source-media/`. A 720p la comida y las personas siguen
 * siendo reconocibles bajo el blur del hero; a 640x360 se empastaban.
 */
export const heroMedia = {
  video: '/hero-video.mp4' as string | null,
  poster: '/hero-poster.jpg' as string | null,
};
