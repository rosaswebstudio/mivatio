# Lanzamiento de Vatio — checklist del ciclo completo

Objetivo: validar el ciclo dominio → publicación → legales → consentimiento → AdSense →
afiliado con la web nº 1 del portafolio. Marca cada paso al completarlo.

## 0. Antes de empezar (decisión de cuentas)

- [ ] Decide el email con el que va TODO (registrador, Vercel, AdSense, Awin, GA4).
      Recomendado: un email de empresa nuevo (como planeaste para glambook), porque la
      cuenta de AdSense y los afiliados quedan ligados a él para siempre.

## 1. Dominio (~10 €/año)

- [ ] Comprueba disponibilidad y compra UNO (mi orden de preferencia):
      `vatio.es` → `vatioapp.es` → `precioluzhoy.es` → `vatio.app`.
      Registradores correctos: Namecheap, Cloudflare Registrar, o el propio Vercel.
- [ ] En `astro.config.mjs` pon el dominio real en `site`, y en `public/robots.txt` en la
      línea `Sitemap:`.

## 2. Publicación (gratis, 15 min)

- [ ] Sube el proyecto a un repo de GitHub (privado vale).
- [ ] Crea el proyecto en **Vercel** (framework: Astro; build `npm run build`, output `dist`).
- [ ] Conecta el dominio en Vercel (te dará los DNS a poner en el registrador).
- [ ] Comprueba: la web carga con HTTPS, el precio de la luz aparece, y
      `/aviso-legal`, `/privacidad` y `/cookies` funcionan.

## 3. Legales (hecho el 16-07-2026, solo faltan tus datos)

- [ ] Rellena los marcadores en ámbar de `/aviso-legal`, `/privacidad` y `/cookies`:
      `[NOMBRE...]`, `[NIF]`, `[EMAIL DE CONTACTO]`, `[TU-DOMINIO.es]`.
      (Buscar "placeholder" en `src/pages/*.astro`.)

## 4. Google Analytics 4 (gratis)

- [ ] Crea la propiedad GA4 en analytics.google.com y copia el `G-XXXXXXXXXX`.
- [ ] En `src/layouts/Layout.astro`: descomenta el bloque de **Consent Mode v2 (PASO 1)**
      y después el de GA4, con tu ID. Así GA4 respeta el consentimiento desde el día 1.
- [ ] Da de alta la web en **Google Search Console** (con el sitemap
      `https://tudominio/sitemap-index.xml`) para ver impresiones y consultas.

## 5. AdSense + banner de cookies (CMP)

- [ ] Con la web YA publicada y con contenido, solicita cuenta en adsense.google.com
      (revisión: de días a 2-4 semanas).
- [ ] Mientras esperas, NO hace falta banner de cookies (la web aún no pone cookies).
- [ ] Al aprobarte: en AdSense → **Privacidad y mensajes → GDPR**, crea el mensaje de
      consentimiento (es la **CMP certificada gratuita de Google**; cumple TCF).
- [ ] Pon tu `ca-pub-...` en `Layout.astro`, descomenta el script de AdSense (PASO 2) y
      los bloques `<ins>` de los dos huecos de anuncio de `index.astro`.
- [ ] Comprueba en un navegador limpio: aparece el banner de consentimiento y, tras
      aceptar, los anuncios.

## 6. Afiliado real (energía)

- [ ] Alta como afiliado en **Awin** (awin.com) — es donde están los comparadores y
      comercializadoras de energía en España — y/o en TradeDoubler.
- [ ] Dentro, busca anunciantes de "energía / luz / tarifas" y solicita 1-2 programas
      (comparadores de tarifas tipo Selectra/papernest o comercializadoras con CPA).
- [ ] Sustituye el `href="#"` del bloque "¿Pagas de más en tu factura?" de
      `src/pages/index.astro` por tu enlace (mantén `rel="sponsored"`); quita el texto
      "(enlace de ejemplo)".

## 7. Medir (las 2 primeras semanas)

- [ ] Search Console: ¿indexa? ¿con qué consultas aparece?
- [ ] GA4: visitas, % que vuelve (retención = la clave de Vatio), evento del uso.
- [ ] AdSense: RPM e ingresos por día. Afiliado: clics y conversiones.
- Con estos datos decidimos cuándo lanzar la nº 2 (Sueldo Neto).
