// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción. Vercel redirige laotracaramkt.es → www, así que el
  // canónico es www. Al cambiarlo, actualizar también public/robots.txt.
  site: 'https://www.laotracaramkt.es',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
