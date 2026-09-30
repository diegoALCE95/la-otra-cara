/**
 * Acordeón de preguntas frecuentes: un solo listener delegado en la lista.
 * Una respuesta abierta a la vez; la altura la anima el CSS (0fr → 1fr) y aquí
 * solo se cambia el estado y se marca el panel cerrado como `inert`, para que
 * su texto no exista para el teclado ni para los lectores de pantalla.
 */
export function initFaqAcordeon() {
  const list = document.querySelector<HTMLElement>('[data-faq-list]');
  if (!list) return;

  const toggles = Array.from(list.querySelectorAll<HTMLButtonElement>('[data-faq-toggle]'));
  if (!toggles.length) return;

  const abrir = (toggle: HTMLButtonElement, abierto: boolean) => {
    const panel = document.getElementById(toggle.getAttribute('aria-controls') ?? '');
    if (!panel) return;

    toggle.setAttribute('aria-expanded', String(abierto));
    panel.dataset.open = String(abierto);
    panel.inert = !abierto;
  };

  list.addEventListener('click', (event) => {
    const toggle = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-faq-toggle]');
    if (!toggle) return;

    const abrirlo = toggle.getAttribute('aria-expanded') !== 'true';
    for (const otro of toggles) abrir(otro, otro === toggle && abrirlo);
  });
}
