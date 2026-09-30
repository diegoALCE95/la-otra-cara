/**
 * Acordeón de servicios: un solo listener delegado en la lista.
 * Solo una fila abierta a la vez; la altura la anima el CSS (0fr → 1fr) y aquí
 * únicamente se cambia el estado y se marca el panel cerrado como `inert`, para
 * que su texto no exista para el teclado ni para los lectores de pantalla.
 */
export function initServiciosAcordeon() {
  const list = document.querySelector<HTMLElement>('[data-svc-list]');
  if (!list) return;

  const toggles = Array.from(list.querySelectorAll<HTMLButtonElement>('[data-svc-toggle]'));
  if (!toggles.length) return;

  const panelDe = (toggle: HTMLButtonElement) =>
    document.getElementById(toggle.getAttribute('aria-controls') ?? '');

  const abrir = (toggle: HTMLButtonElement, abierto: boolean) => {
    const panel = panelDe(toggle);
    if (!panel) return;

    toggle.setAttribute('aria-expanded', String(abierto));
    panel.dataset.open = String(abierto);
    panel.inert = !abierto;
  };

  list.addEventListener('click', (event) => {
    const toggle = (event.target as Element | null)?.closest<HTMLButtonElement>(
      '[data-svc-toggle]',
    );
    if (!toggle) return;

    const abrirlo = toggle.getAttribute('aria-expanded') !== 'true';
    for (const otro of toggles) abrir(otro, otro === toggle && abrirlo);
  });
}
