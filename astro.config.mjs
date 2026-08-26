// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// El archivo mensual va entero al sitemap. Antes se recortaba a la vez que se le ponia
// noindex a los meses anteriores a 2024, para no ofrecerle a Google una URL y decirle
// acto seguido que no la indexara.
//
// Aquello se hizo tras el primer rechazo de AdSense, y fue un error por dos motivos. Uno:
// noindex es una instruccion para el indice de Google Search, y la revision de AdSense no
// consulta ese indice, entra por la portada y sigue enlaces, asi que seguia viendo las 111
// paginas. Y dos: esas paginas no eran el problema. Cada mes trae 918 palabras con el
// precio de cada dia, la hora mas cara y la mas barata y el coste por aparato, y solo 32
// palabras se repiten entre unas y otras. Se estaba escondiendo contenido bueno y
// perdiendo su trafico a cambio de nada.

export default defineConfig({
  site: 'https://mivatio.es',
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
