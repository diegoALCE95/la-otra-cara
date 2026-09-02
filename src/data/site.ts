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
 * Media del hero. Pendiente de entrega (README, "Assets pendientes" #1).
 * Mientras `video` sea null se muestra solo el gradiente radial difuminado,
 * que es el fallback previsto por el diseño.
 * TODO: subir hero-video.mp4 (< 3 MB, sin audio) y su poster a public/.
 */
export const heroMedia = {
  video: null as string | null,
  poster: null as string | null,
};
