/** Datos transversales del sitio. Los marcados con TODO son placeholder. */

export const site = {
  name: 'La Otra Cara',
  tagline: 'Agencia de Marketing',
  title: 'Agencia de Marketing Gastronómico en Madrid | La Otra Cara',
  description:
    'Marketing gastronómico para restaurantes en Madrid: redes sociales, fotografía y vídeo, diseño web y estrategia digital para atraer nuevos comensales.',
  // TODO: email real. Este dominio se dedujo y probablemente no es el definitivo;
  // cambiarlo aquí lo actualiza en el footer, el CTA, el JSON-LD y las páginas legales.
  email: 'hola@laotracara.com',
  // TODO: número real de WhatsApp (https://wa.me/<código+número>).
  whatsapp: 'https://wa.me/',
  // TODO: handle real de Instagram.
  instagram: 'https://instagram.com/',
  location: 'Madrid · España',
  locationNote: 'Trabajamos con empresas de Latam',
  /** Para el JSON-LD. TODO: calle y código postal si el estudio tiene sede física abierta al público. */
  address: { locality: 'Madrid', region: 'Comunidad de Madrid', country: 'ES' },
  year: 2026,
} as const;

/**
 * Titular del sitio para el Aviso Legal y la Política de Privacidad (LSSI art. 10
 * y RGPD art. 13). TODO: todos son placeholder; sin estos datos las páginas
 * legales no cumplen. Si el titular es una sociedad, añadir también los datos
 * del Registro Mercantil.
 */
export const legal = {
  titular: 'TODO: nombre completo o razón social del titular',
  nif: 'TODO: NIF / CIF',
  domicilio: 'TODO: domicilio completo, Madrid',
  registro: null as string | null,
  actualizado: '10 de noviembre de 2026',
};

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
