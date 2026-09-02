/** Estado `scrolled` del header fijo (umbral 40px). */
export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  let raf = 0;
  const apply = () => {
    raf = 0;
    header.dataset.scrolled = String(window.scrollY > 40);
  };

  addEventListener(
    'scroll',
    () => {
      if (!raf) raf = requestAnimationFrame(apply);
    },
    { passive: true },
  );
  apply();
}
