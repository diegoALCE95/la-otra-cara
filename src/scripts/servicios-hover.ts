/**
 * Imagen sticky de servicios: un solo listener delegado en la lista.
 * Al salir del bloque vuelve al primer servicio (Producción de Contenido).
 */
const DEFAULT_INDEX = '1';

export function initServiceStage() {
  const block = document.querySelector<HTMLElement>('[data-svc-block]');
  const list = block?.querySelector<HTMLElement>('[data-svc-list]');
  const stage = block?.querySelector<HTMLElement>('[data-svc-stage]');
  if (!block || !list || !stage) return;

  const images = Array.from(stage.querySelectorAll<HTMLElement>('[data-svc-img]'));

  const show = (index: string) => {
    for (const img of images) {
      img.style.opacity = img.dataset.svcImg === index ? '1' : '0';
    }
  };

  list.addEventListener('pointerover', (event) => {
    const row = (event.target as Element | null)?.closest<HTMLElement>('[data-svc]');
    if (row?.dataset.svc) show(row.dataset.svc);
  });
  list.addEventListener('focusin', (event) => {
    const row = (event.target as Element | null)?.closest<HTMLElement>('[data-svc]');
    if (row?.dataset.svc) show(row.dataset.svc);
  });
  block.addEventListener('pointerleave', () => show(DEFAULT_INDEX));

  show(DEFAULT_INDEX);
}
