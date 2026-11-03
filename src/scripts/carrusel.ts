/**
 * Carrusel genérico. Una columna por debajo de 900px y las que indique
 * `data-carrusel-por-vista` (3 por defecto) por encima; siempre avanza de una
 * en una.
 *
 * El desplazamiento es un `translate3d` sobre la pista con la transición del
 * sistema, y el arrastre se atiende con eventos de puntero: sin librerías.
 * La posición de cada slide se lee de `offsetLeft`, así que el gap y el ancho
 * de columna siguen viviendo solo en el CSS.
 */
const ARRASTRE_MIN = 8; // px a partir de los cuales el gesto es un arrastre
const UMBRAL = 0.18; // fracción del paso que hace falta para cambiar de vista
const LANZAMIENTO = 0.45; // px/ms: un gesto corto pero rápido también avanza
const RESISTENCIA = 0.3; // fracción del arrastre que se aplica más allá de los extremos

export function initCarrusel() {
  for (const raiz of document.querySelectorAll<HTMLElement>('[data-carrusel]')) montar(raiz);
}

function montar(raiz: HTMLElement) {
  const viewport = raiz.querySelector<HTMLElement>('[data-carrusel-viewport]');
  const pista = raiz.querySelector<HTMLElement>('[data-carrusel-track]');
  const slides = Array.from(raiz.querySelectorAll<HTMLElement>('[data-carrusel-slide]'));
  const puntos = Array.from(raiz.querySelectorAll<HTMLButtonElement>('[data-carrusel-dot]'));
  const primero = slides[0];
  if (!viewport || !pista || !primero) return;

  let indice = 0;
  let paginas = 1;
  let porVista = 1;
  // Columnas visibles a partir de 900px. Por debajo siempre es una.
  const columnas = Number(raiz.dataset.carruselPorVista) || 3;

  /** Desplazamiento de un slide respecto al primero: incluye el gap del CSS. */
  const offset = (i: number) => (slides[i]?.offsetLeft ?? 0) - primero.offsetLeft;
  const paso = () => offset(1) || viewport.clientWidth;

  const colocar = (x: number, animado: boolean) => {
    pista.style.transitionDuration = animado ? '' : '0ms';
    pista.style.transform = `translate3d(${x}px,0,0)`;
  };

  const medir = () => {
    porVista = matchMedia('(min-width: 900px)').matches ? columnas : 1;
    paginas = Math.max(1, slides.length - porVista + 1);
    indice = Math.min(indice, paginas - 1);

    puntos.forEach((punto, i) => {
      punto.hidden = i >= paginas;
    });
    // Con todo a la vista el carrusel sobra: los puntos desaparecen enteros.
    raiz.querySelector<HTMLElement>('[data-carrusel-dots]')?.toggleAttribute('hidden', paginas < 2);
  };

  const ir = (destino: number, animado = true) => {
    indice = Math.max(0, Math.min(destino, paginas - 1));
    colocar(-offset(indice), animado);
    puntos.forEach((punto, i) => punto.setAttribute('aria-current', String(i === indice)));
  };

  // ── Puntos ──────────────────────────────────────────
  for (const punto of puntos) {
    punto.addEventListener('click', () => ir(Number(punto.dataset.carruselDot)));
  }

  // ── Teclado: una card fuera de vista no puede quedarse escondida ──
  pista.addEventListener('focusin', (evento) => {
    const objetivo = evento.target as Element | null;
    const slide = objetivo?.closest<HTMLElement>('[data-carrusel-slide]');
    if (!slide) return;
    // El navegador intenta revelar el foco desplazando el recorte; se deshace
    // y se resuelve moviendo el carrusel, que es lo que conserva el layout.
    viewport.scrollLeft = 0;

    // Solo el foco de teclado mueve el carrusel, y solo si la card está fuera
    // de vista. Con ratón, el `<a>` también toma el foco al pulsar, y sin este
    // filtro la vista saltaba a la card pulsada al empezar un arrastre.
    if (!objetivo?.matches(':focus-visible')) return;
    const i = slides.indexOf(slide);
    if (i >= indice && i < indice + porVista) return;
    ir(i < indice ? i : i - porVista + 1);
  });

  // ── Arrastre ────────────────────────────────────────
  let base = 0;
  let inicio = 0;
  let delta = 0;
  let arrastrando = false;
  let movido = false;
  // Última muestra del puntero, para medir la velocidad al soltar.
  let ultimoX = 0;
  let ultimoT = 0;
  let velocidad = 0;

  // Las cards son enlaces con imagen: con ratón, el navegador arrancaría su
  // arrastre nativo de enlace/imagen, que cancela el puntero (`pointercancel`)
  // y devuelve el carrusel a su sitio a los pocos píxeles.
  pista.addEventListener('dragstart', (evento) => evento.preventDefault());

  pista.addEventListener('pointerdown', (evento) => {
    if (evento.pointerType === 'mouse' && evento.button !== 0) return;
    if (paginas < 2) return;

    arrastrando = true;
    movido = false;
    inicio = evento.clientX;
    delta = 0;
    base = -offset(indice);
    ultimoX = evento.clientX;
    ultimoT = evento.timeStamp;
    velocidad = 0;
  });

  pista.addEventListener(
    'pointermove',
    (evento) => {
      if (!arrastrando) return;
      delta = evento.clientX - inicio;

      const dt = evento.timeStamp - ultimoT;
      if (dt > 0) velocidad = (evento.clientX - ultimoX) / dt;
      ultimoX = evento.clientX;
      ultimoT = evento.timeStamp;

      if (!movido) {
        if (Math.abs(delta) < ARRASTRE_MIN) return;
        movido = true;
        pista.setPointerCapture(evento.pointerId);
      }

      // Más allá del primero o del último, el arrastre cede con resistencia.
      const limite = -offset(paginas - 1);
      let x = base + delta;
      if (x > 0) x *= RESISTENCIA;
      else if (x < limite) x = limite + (x - limite) * RESISTENCIA;
      colocar(x, false);
    },
    { passive: true },
  );

  const soltar = (evento: PointerEvent) => {
    if (!arrastrando) return;
    arrastrando = false;
    if (!movido) return;

    // Una pausa antes de soltar anula el lanzamiento.
    if (evento.timeStamp - ultimoT > 80) velocidad = 0;

    // Se avanzan tantas vistas como pasos se hayan arrastrado; la última cuenta
    // en cuanto se supera el umbral. Un gesto rápido avanza al menos una.
    const pasos = Math.abs(delta) / paso();
    let salto = Math.floor(pasos + (1 - UMBRAL));
    if (salto === 0 && Math.abs(velocidad) > LANZAMIENTO) salto = 1;
    ir(indice + (delta < 0 ? salto : -salto));
  };

  pista.addEventListener('pointerup', soltar);
  pista.addEventListener('pointercancel', soltar);

  // Tras un arrastre, el `click` de la card llegaría igual y abriría el visor.
  pista.addEventListener(
    'click',
    (evento) => {
      if (!movido) return;
      movido = false;
      evento.preventDefault();
      evento.stopPropagation();
    },
    { capture: true },
  );

  // ── Medidas ──────────────────────────────────
  // Un `resize` de ventana no basta: el ancho de columna también cambia cuando
  // aparece la barra de scroll o cambia el zoom. Se observa la caja.
  let raf = 0;
  new ResizeObserver(() => {
    if (raf || arrastrando) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      medir();
      ir(indice, false);
    });
  }).observe(viewport);

  medir();
  ir(0, false);
}
