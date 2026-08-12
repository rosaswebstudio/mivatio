# Vatio — Precio de la luz (Web 3)

Precio de la luz (PVPC) hoy y mañana, hora a hora y en directo, por comunidad. PWA instalable.
Datos oficiales de Red Eléctrica de España (REData/ESIOS), consultados en el cliente.

Stack: **Astro 7 + Preact (island)** + **Tailwind CSS v4** + fuentes self-hosted (Inter,
JetBrains Mono). La app interactiva es un island Preact (`client:load`); el resto (H1, intro,
FAQ, texto) es HTML estático para SEO.

## Qué se migró desde la base original

La base era un único `index.html` con React + ReactDOM + **Babel standalone** y **Tailwind por
CDN** (compilaba JSX en el navegador, ~2.5 MB por carga). Migrado a:

- **Island Preact compilado** (mismo código React, ~4 KB de runtime en vez de ~45 KB de React,
  y sin Babel en el navegador). API de React vía `preact/hooks`.
- **Tailwind v4** con build real (sin CDN).
- **Fuentes self-hosted** con `@fontsource` (offline, buen Lighthouse) en vez de Google Fonts CDN.
- **Capa SEO** nueva: H1, intro, FAQ (con las keywords "precio de la luz hoy", "a qué hora es
  más barata la luz"), texto descriptivo, JSON-LD (`WebApplication` + `FAQPage`), meta y sitemap.
- **PWA** bien montada: `manifest.json`, iconos 192/512, apple-touch-icon, theme-color.

La lógica de Vatio (fetch a REE, hoy/mañana, gráfico/lista, franjas por electrodoméstico,
impuestos, countdown a las 20:15) se mantiene intacta.


## Guías y archivo indexable (agosto 2026)

AdSense rechazó el sitio el 12/08/2026 por "contenido de poco valor": de 102 páginas, 89 eran
plantilla automática (70 meses del archivo + 19 fichas de aparatos) y el texto propio por página
era corto. Dos cambios para corregirlo:

1. **Sección `/guias/`**: ocho guías escritas, de 1.200 a 1.600 palabras cada una, con los importes
   oficiales importados de `src/lib/` (ni un número escrito a mano en el texto, así que se
   actualizan solas cuando en enero se tocan los peajes). El índice de guías vive en
   `src/lib/guias.js` y el layout de artículo en `src/layouts/GuiaLayout.astro`.
2. **Corte del archivo**: los meses anteriores a `ARCHIVO_INDEXABLE_DESDE` (`src/lib/archivo.js`)
   llevan `noindex` y quedan fuera del sitemap. Se siguen sirviendo y enlazando igual. **Es
   temporal**: cuando el sitio tenga recorrido propio, se baja el año o se pone a 0 y vuelven todos.

`src/lib/regulados.js` es nuevo: peajes y cargos del término de energía, con la fuente del BOE
anotada. Se actualiza cada enero junto con `potencia.js`.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # web estática en dist/
npm run preview
```

## Datos (REE / REData)

Se usa la API pública `apidatos.ree.es` (no requiere token y envía cabeceras CORS), no ESIOS con
clave. El fetch es client-side; los precios de mañana se publican sobre las 20:15h.

## Qué personalizar antes de publicar

1. **Dominio**: `site` en `astro.config.mjs` y la URL del `Sitemap:` en `public/robots.txt`.
2. **AdSense**: pon tu ID `ca-pub-...` en `src/layouts/Layout.astro` y descomenta el `<script async>`.
   El hueco de anuncio está en `src/pages/index.astro` (marcador "Publicidad").
3. **GA4**: `G-XXXXXXXXXX` en `src/layouts/Layout.astro`.
4. **Afiliado**: sustituye el `href="#"` del bloque "¿Pagas de más en tu factura?" por tu enlace
   de comparador/afiliado de tarifas de luz real (ya lleva `rel="sponsored"`).
5. **Imagen OpenGraph**: añade `public/og-image.png` (1200x630).

## Estructura

```
src/
  components/Vatio.jsx     # la app (island Preact)
  layouts/Layout.astro     # shell: SEO, PWA, fuentes
  pages/index.astro        # H1 + island + CTA + FAQ + texto SEO + JSON-LD
  styles/global.css        # Tailwind + keyframes + fuentes
public/manifest.json, icon-192.png, icon-512.png, apple-touch-icon.png, favicon.svg
```
