// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { ARCHIVO_INDEXABLE_DESDE } from './src/lib/archivo.js';

// Los meses viejos del archivo llevan noindex, así que tampoco tienen que salir en el
// sitemap: ofrecer al buscador una URL que luego le dice que no la indexe es contradictorio
// y ensucia el informe de cobertura de Search Console.
const mesViejo = /\/precio-luz\/(\d{4})\/[a-zé]+\/$/;
const indexable = (url) => {
  const m = url.match(mesViejo);
  return !m || Number(m[1]) >= ARCHIVO_INDEXABLE_DESDE;
};

export default defineConfig({
  site: 'https://mivatio.es',
  integrations: [preact(), sitemap({ filter: indexable })],
  vite: {
    plugins: [tailwindcss()],
  },
});
