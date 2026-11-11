import { site } from './site';

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Portfolio' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#contacto', label: 'Contacto' },
];

export type FooterItem = { label: string; href?: string; muted?: boolean };
export type FooterColumn = { titulo: string; items: FooterItem[] };

export const footerColumns: FooterColumn[] = [
  // `/#…` y no `#…`: el footer también sale en las páginas legales.
  {
    titulo: 'Navegación',
    items: navLinks.map((link) => ({ label: link.label, href: `/${link.href}` })),
  },
  {
    titulo: 'Contacto',
    items: [
      { label: 'Email', href: `mailto:${site.email}` },
      // TODO: handle real de Instagram.
      { label: 'Instagram', href: 'https://instagram.com/' },
    ],
  },
  {
    titulo: 'Ubicación',
    items: [
      { label: `${site.location}.` },
      { label: site.locationNote, muted: true },
    ],
  },
  {
    titulo: 'Legal',
    items: [
      { label: 'Aviso Legal', href: '/aviso-legal/' },
      { label: 'Privacidad', href: '/privacidad/' },
      { label: 'Cookies', href: '/cookies/' },
    ],
  },
];
