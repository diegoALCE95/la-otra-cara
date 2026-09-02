/**
 * Cursor que sigue al puntero dentro de una zona. Sustituye a `work-cursor.ts`:
 * lo usan Proyectos ("Ver") y Servicios (flecha), con un solo listener delegado
 * por zona.
 *
 * Markup esperado: `[data-cursor-zone="<id>"]` como contenedor,
 * `[data-cursor-target]` en los elementos que lo activan y
 * `[data-cursor="<id>"]` en el círculo.
 *
 * Solo ≥900px y con puntero fino: en táctil no hay cursor que seguir.
 */
export function initHoverCursors() {
  if (!matchMedia('(min-width: 900px) and (pointer: fine)').matches) return;

  for (const zone of document.querySelectorAll<HTMLElement>('[data-cursor-zone]')) {
    const id = zone.dataset.cursorZone;
    const cursor = document.querySelector<HTMLElement>(`[data-cursor="${id}"]`);
    if (id && cursor) bind(zone, cursor);
  }
}

function bind(zone: HTMLElement, cursor: HTMLElement) {
  let raf = 0;
  let x = 0;
  let y = 0;

  const paint = () => {
    raf = 0;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  const move = (event: PointerEvent) => {
    x = event.clientX;
    y = event.clientY;
    if (!raf) raf = requestAnimationFrame(paint);
  };

  zone.addEventListener('pointerover', (event) => {
    if (!(event.target as Element | null)?.closest('[data-cursor-target]')) return;
    move(event);
    cursor.dataset.on = 'true';
    addEventListener('pointermove', move, { passive: true });
  });

  zone.addEventListener('pointerout', (event) => {
    if ((event.relatedTarget as Element | null)?.closest('[data-cursor-target]')) return;
    cursor.dataset.on = 'false';
    removeEventListener('pointermove', move);
  });
}
