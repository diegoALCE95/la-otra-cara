/**
 * Modal del formulario de contacto (`CtaFinalModal.astro`). Igual que el
 * visor: `showModal()` pone el diálogo en el top layer y se encarga del trap
 * de foco, de Escape, del `inert` del resto de la página y de devolver el foco
 * al botón al cerrar. Aquí solo queda abrir y cerrar.
 *
 * El bloqueo de scroll del body y la animación son CSS (`global.css`).
 */
export function initContactoModal() {
  const modal = document.querySelector<HTMLDialogElement>('[data-contacto-modal]');
  if (!modal) return;

  // Delegación: los disparadores pueden estar en varias secciones.
  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest('[data-contacto-modal-open]');
    if (!trigger) return;

    event.preventDefault();
    modal.showModal();
  });

  modal.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    // El padding del diálogo rodea al panel: pulsar ahí fuera también cierra.
    if (target === modal || target?.closest('[data-contacto-modal-close]')) modal.close();
  });
}
