/**
 * Visor modal. El trap de foco, Escape, el `inert` del resto de la página y la
 * devolución del foco los hace `showModal()`; aquí solo queda abrir, cerrar y
 * cambiar de slide.
 *
 * Los disparadores llevan `data-lb-open="<id>"` o `data-lb-open="<id>:<índice>"`.
 * El media de cada slide se declara con `data-lb-media` + `data-src`: no se
 * descarga hasta que su slide se activa, así el visor no cuesta nada hasta que
 * alguien lo abre.
 */
export function initLightbox() {
  const boxes = new Map<string, HTMLDialogElement>();
  for (const box of document.querySelectorAll<HTMLDialogElement>('[data-lightbox]')) {
    if (box.dataset.lightbox) boxes.set(box.dataset.lightbox, box);
  }
  if (!boxes.size) return;

  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-lb-open]');
    if (!trigger) return;

    const [id, index] = (trigger.dataset.lbOpen ?? '').split(':');
    const box = id ? boxes.get(id) : undefined;
    if (!box) return;

    event.preventDefault();
    show(box, Number(index) || 0);
    box.showModal();
  });

  for (const box of boxes.values()) bind(box);
}

function bind(box: HTMLDialogElement) {
  const slides = Array.from(box.querySelectorAll<HTMLElement>('[data-lb-slide]'));
  if (!slides.length) return;

  const go = (step: number) => show(box, Number(box.dataset.index ?? 0) + step);

  box.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (target?.closest('[data-lb-close]')) {
      box.close();
      return;
    }
    if (target?.closest('[data-lb-prev]')) {
      go(-1);
      return;
    }
    if (target?.closest('[data-lb-next]')) {
      go(1);
      return;
    }
    // Fuera de la figura (fondo o barras) cierra.
    if (target === box || target?.hasAttribute('data-lb-backdrop')) box.close();
  });

  box.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') go(-1);
    else if (event.key === 'ArrowRight') go(1);
    else return;
    event.preventDefault();
  });

  // Al cerrar, ningún video sigue sonando ni consumiendo red de fondo.
  box.addEventListener('close', () => {
    for (const media of box.querySelectorAll<HTMLElement>('[data-lb-media]')) detener(media);
  });
}

function show(box: HTMLDialogElement, index: number) {
  const slides = Array.from(box.querySelectorAll<HTMLElement>('[data-lb-slide]'));
  if (!slides.length) return;

  // Se da la vuelta en los extremos: la galería es un ciclo.
  const total = slides.length;
  const current = ((index % total) + total) % total;
  box.dataset.index = String(current);

  slides.forEach((slide, i) => {
    const active = i === current;
    slide.hidden = !active;

    const media = slide.querySelector<HTMLElement>('[data-lb-media]');
    if (!media) return;

    // Solo el slide activo tiene media cargado: al pasar de uno a otro el
    // anterior se detiene, así nunca hay dos vídeos sonando a la vez.
    if (!active) {
      detener(media);
      return;
    }
    const src = media.dataset.src;
    if (src && !media.getAttribute('src')) media.setAttribute('src', src);
  });

  const counter = box.querySelector<HTMLElement>('[data-lb-counter]');
  if (counter) {
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }
}

/**
 * Deja un media en reposo. Un `<video>` basta con pausarlo; un `<iframe>` de
 * YouTube sigue reproduciendo aunque su slide esté oculto, así que se le quita
 * el `src` — `show()` lo repone desde `data-src` la próxima vez que se active.
 */
function detener(media: HTMLElement) {
  if (media instanceof HTMLVideoElement) media.pause();
  else media.removeAttribute('src');
}
