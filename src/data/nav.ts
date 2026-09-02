export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: '#top', label: 'Inicio' },
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
      { label: 'hola@laotracara.com', href: 'mailto:hola@laotracara.com' },
      // TODO: número real de WhatsApp y handle de Instagram.
      { label: 'WhatsApp', href: 'https://wa.me/' },
      { label: 'Instagram', href: 'https://instagram.com/' },
    ],
  },
  {
    titulo: 'Estudio',
    items: [
      // TODO: ciudad y país reales.
      { label: 'Ciudad — País' },
      { label: 'Trabajamos con marcas en toda LATAM.', muted: true },
    ],
  },
];
