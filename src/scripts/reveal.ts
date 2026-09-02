/**
 * Reveals al scroll. El estado inicial lo pone la utilidad `reveal` en CSS;
 * aquí solo se libera. Dos formas de uso:
 *
 *   [data-reveal]        elemento suelto: se revela al entrar en pantalla.
 *   [data-reveal-group]  contenedor: sus [data-reveal] se revelan en cascada
 *                        cuando el grupo entra, con un paso de
 *                        `data-reveal-step` ms (80 por defecto).
 *
 * Lleva failsafe: nada puede quedarse invisible.
 */
const PASO_MS = 80;
const FAILSAFE_MS = 1600;

export function initReveals() {
  const grupos = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal-group]'));

  /** Piezas de cada grupo, en orden de lectura, para la cascada. */
  const piezasPorGrupo = new Map<HTMLElement, HTMLElement[]>();
  const enGrupo = new Set<HTMLElement>();
  for (const grupo of grupos) {
    const piezas = Array.from(grupo.querySelectorAll<HTMLElement>('[data-reveal]'));
    piezas.forEach((pieza) => enGrupo.add(pieza));
    piezasPorGrupo.set(grupo, piezas);
  }

  const sueltos = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
    (el) => !enGrupo.has(el),
  );

  const objetivos = [...sueltos, ...grupos];
  if (!objetivos.length) return;

  const mostrar = (el: HTMLElement) => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  };

  const liberar = (objetivo: HTMLElement) => {
    const piezas = piezasPorGrupo.get(objetivo);
    if (!piezas) {
      mostrar(objetivo);
      return;
    }
    const paso = Number(objetivo.dataset.revealStep) || PASO_MS;
    piezas.forEach((pieza, i) => {
      pieza.style.setProperty('--reveal-delay', `${i * paso}ms`);
      mostrar(pieza);
    });
  };

  const pendientes = new Set(objetivos);
  const soltar = (objetivo: HTMLElement) => {
    liberar(objetivo);
    pendientes.delete(objetivo);
  };

  if (
    !('IntersectionObserver' in window) ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    objetivos.forEach(soltar);
    return;
  }

  let observadorVivo = false;
  const io = new IntersectionObserver(
    (entries) => {
      observadorVivo = true;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        soltar(entry.target as HTMLElement);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: '0px 0px -12% 0px' },
  );
  objetivos.forEach((el) => io.observe(el));

  // failsafe: si el observer no dispara, se revela todo a los 1.6s. Si sí
  // dispara, solo se rescata lo que ya está a la vista; el resto conserva su
  // reveal al scroll.
  setTimeout(() => {
    if (!observadorVivo) {
      pendientes.forEach(soltar);
      io.disconnect();
      return;
    }
    pendientes.forEach((objetivo) => {
      const caja = objetivo.getBoundingClientRect();
      if (caja.top < innerHeight && caja.bottom > 0) {
        soltar(objetivo);
        io.unobserve(objetivo);
      }
    });
  }, FAILSAFE_MS);
}
