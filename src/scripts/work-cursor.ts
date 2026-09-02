/** Cursor "Ver" sobre las cards de proyecto. Solo ≥900px y con puntero fino. */
export function initWorkCursor() {
  if (!matchMedia('(min-width: 900px) and (pointer: fine)').matches) return;

  const grid = document.querySelector<HTMLElement>('[data-work-grid]');
  const cursor = document.querySelector<HTMLElement>('[data-work-cursor]');
  if (!grid || !cursor) return;

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

  grid.addEventListener('pointerover', (event) => {
    if (!(event.target as Element | null)?.closest('[data-work]')) return;
    move(event);
    cursor.dataset.on = 'true';
    addEventListener('pointermove', move, { passive: true });
  });

  grid.addEventListener('pointerout', (event) => {
    if ((event.relatedTarget as Element | null)?.closest('[data-work]')) return;
    cursor.dataset.on = 'false';
    removeEventListener('pointermove', move);
  });
}
