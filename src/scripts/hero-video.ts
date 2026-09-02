/**
 * Carga del video del hero. Es decorativo: se difiere hasta después del `load`
 * para que no compita con el LCP del titular, y se omite del todo cuando no
 * aporta nada — en móvil (<900px) queda el poster, que bajo `blur(26px)` es
 * indistinguible del video.
 *
 * La reproducción la arranca el atributo `autoplay` en cuanto aparece el `src`,
 * así que aquí no hace falta llamar a `play()`.
 */
export function initHeroVideo() {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  const src = video?.dataset.src;
  if (!video || !src) return;

  // El poster ya está pintado: en cualquiera de estos casos se queda así.
  const skip =
    !matchMedia('(min-width: 900px)').matches ||
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    // @ts-expect-error -- Network Information API, sin tipos estándar.
    navigator.connection?.saveData === true;
  if (skip) return;

  const load = () => {
    // Si el video falla, el poster sigue en su sitio; el diseño no se rompe.
    video.addEventListener('error', () => video.removeAttribute('src'), { once: true });
    video.src = src;
  };

  if (document.readyState === 'complete') load();
  else addEventListener('load', load, { once: true });
}
