export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: '#agencia', label: 'Agencia' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
];

export type FooterItem = { label: string; href?: string; muted?: boolean };
export type FooterColumn = { titulo: string; items: FooterItem[] };

export const footerColumns: FooterColumn[] = [
  { titulo: 'Navegación', items: navLinks.map((link) => ({ label: link.label, href: link.href })) },
  {
    titulo: 'Contacto',
    items: [
      { label: 'Email', href: 'mailto:hola@laotracara.com' },
      // TODO: handle real de Instagram.
      { label: 'Instagram', href: 'https://instagram.com/' },
    ],
  },
  {
    titulo: 'Ubicación',
    items: [
      { label: 'Madrid · España.' },
      { label: 'Trabajamos con empresas de Latam', muted: true },
    ],
  },
  {
    titulo: 'Legal',
    items: [
      // TODO: crear las páginas legales; por ahora los href apuntan a rutas que no existen.
      { label: 'Aviso Legal', href: '/aviso-legal' },
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
];
