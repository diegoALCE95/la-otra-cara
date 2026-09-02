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
 * en móvil (<900px) no se descarga — se queda el poster, que bajo `blur(26px)`
 * es indistinguible. Ver `src/scripts/hero-video.ts`.
 * Recodificado a 640x360 pre-difuminado (438 KB desde 25,8 MB del original).
 */
export const heroMedia = {
  video: '/hero-video.mp4' as string | null,
  poster: '/hero-poster.jpg' as string | null,
};
