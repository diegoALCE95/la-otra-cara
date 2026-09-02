// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: confirmar el dominio de producción (derivado de hola@laotracara.com).
  site: 'https://laotracara.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
