/**
 * Overlay de navegación móvil: toggle, cierre con Escape y al navegar,
 * trap de foco y aislamiento del resto de la página con `inert`.
 * El bloqueo de scroll del body lo hace CSS (`body:has([data-menu][data-open="true"])`).
 */
const FOCUSABLE = 'a[href], button:not([disabled])';

export function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  const outside = Array.from(
    document.querySelectorAll<HTMLElement>('[data-header], [data-outside]'),
  );

  const isOpen = () => menu.dataset.open === 'true';

  const setOpen = (open: boolean, moveFocus = true) => {
    menu.dataset.open = String(open);
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));

    for (const el of outside) {
      el.inert = open;
      if (open) el.setAttribute('aria-hidden', 'true');
      else el.removeAttribute('aria-hidden');
    }

    if (!moveFocus) return;
    if (open) menu.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    else toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  menu.addEventListener('click', (event) => {
    if ((event.target as Element | null)?.closest('[data-menu-close]')) setOpen(false);
  });

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (event.key !== 'Tab') return;

    const items = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // El overlay solo existe por debajo de 900px: si se pasa a desktop, se cierra.
  const desktop = matchMedia('(min-width: 900px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches && isOpen()) setOpen(false);
  });

  setOpen(false, false);
}
