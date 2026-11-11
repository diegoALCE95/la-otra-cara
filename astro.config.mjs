// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: confirmar el dominio de producción; probablemente no es este. Al cambiarlo,
  // actualizar también public/robots.txt y el email de src/data/site.ts.
  site: 'https://laotracara.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
