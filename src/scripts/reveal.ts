/**
 * Reveals al scroll. El estado inicial lo pone la utilidad `reveal` en CSS;
 * aquí solo se libera. Lleva failsafe: nada puede quedarse invisible.
 */
export function initReveals() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!nodes.length) return;

  const show = (el: HTMLElement) => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach(show);
    return;
  }

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  nodes.forEach((el) => io.observe(el));

  // failsafe: si el observer no dispara, se revela todo a los 1.6s
  setTimeout(() => {
    nodes.forEach(show);
    io.disconnect();
  }, 1600);
}
