# Handoff: La Otra Cara — Homepage

## Overview

Sitio one-page (homepage) de **La Otra Cara**, agencia boutique de marketing, branding y crecimiento digital. Editorial oscuro, tipografía serif display, acento dorado, sin esquinas redondeadas. Copy en español (LATAM).

El objetivo del sitio: comunicar posicionamiento premium, mostrar capacidades y portafolio, y llevar a contacto (mail / WhatsApp).

**Stack destino: Astro + Tailwind CSS.** Las reglas operativas para el agente están en `AGENTS.md` (cópialo a la raíz del repo Astro).

## About the Design Files

Los archivos de `design-reference/` son **referencias de diseño hechas en HTML** — prototipos que muestran el look y el comportamiento previstos, **no código de producción para copiar y pegar**.

- `design-reference/La Otra Cara - Homepage v5.html` — archivo único autocontenido, ábrelo en el navegador para ver el diseño real (fuentes, imágenes y scripts incrustados). **Esta es la fuente de verdad visual.**
- `design-reference/source/*` — el fuente del prototipo (runtime propio de la herramienta de diseño). Útil para leer estilos exactos y la lógica JS; **no lo portes literalmente**.

La tarea es **recrear el diseño en Astro + Tailwind** con componentes `.astro`, HTML semántico y utilidades de Tailwind, respetando los tokens y medidas de este documento.

## Fidelity

**Alta fidelidad (hifi).** Colores, tipografías, escalas `clamp()`, espaciados, transiciones y estados están definidos y deben reproducirse con precisión. Lo único intencionalmente pendiente es el **contenido real**: fotografías del hero/portafolio/fundadores, logos de clientes, nombres reales y el video del hero. Ver "Assets pendientes".

---

## Estructura de la página (orden de secciones)

| # | id | Fondo | Contenido |
|---|----|-------|-----------|
| 1 | `#top` | Negro + media difuminada | Hero centrado |
| 2 | — | Negro (fixed) | Header |
| 3 | `#agencia` | Crema `#F4F1EB` | Manifiesto (02) + animación de anillos + 2 párrafos + 2 métricas |
| 4 | — | Negro | Marquesina de disciplinas |
| 5 | `#servicios` | Negro | Lista de 5 servicios + imagen sticky en hover (03) |
| 6 | `#proyectos` | Negro | Selected Work — 6 proyectos, grid asimétrico |
| 7 | — | `#0B0B0B` | "Somos La Otra Cara" + 3 principios (I / II / III) |
| 8 | — | Negro | Editorialistas / equipo (2 retratos) |
| 9 | — | Crema | Proceso (01–04) |
| 10 | — | Negro | Logos de clientes (grid 6) |
| 11 | — | `#0B0B0B` | Testimonio |
| 12 | `#contacto` | Crema | CTA final + retrato en esquina |
| 13 | — | Negro | Footer + wordmark gigante "LOC" |

Ritmo cromático deliberado: **negro → crema → negro → negro → crema → negro → crema → negro**. No introduzcas fondos nuevos.

---

## Design Tokens

### Colores

| Token | Hex | Uso |
|---|---|---|
`ink` | `#080808` | Fondo base oscuro, texto sobre crema
`ink-soft` | `#0B0B0B` | Fondo alterno de secciones oscuras (principios, testimonio)
`ink-well` | `#0d0d0d` | Fondo de contenedores de imagen (placeholder)
`bone` | `#F4F1EB` | Crema: fondo de secciones claras, texto sobre oscuro
`white` | `#FFFFFF` | Solo el `<h1>` del hero
`gold` | `#B99455` | Acento sobre fondo oscuro
`gold-deep` | `#8D6B3E` | Acento sobre fondo crema (contraste AA)
`stone` | `#77736D` | Eyebrows / labels sobre crema
`graphite` | `#3a3733` | Párrafos sobre crema (manifiesto)
`graphite-soft` | `#57534d` | Párrafos secundarios sobre crema (proceso)

Alfas recurrentes (úsalas tal cual, son parte del look):

```
/* sobre oscuro */
texto secundario      rgba(244,241,235,.76)  /* subtítulo hero */
texto terciario       rgba(244,241,235,.5)   /* descripciones */
texto cuaternario     rgba(244,241,235,.45)  /* metadatos */
placeholder / mono    rgba(244,241,235,.3)
bordes                rgba(244,241,235,.16)
bordes suaves         rgba(244,241,235,.14)
borde header scroll   rgba(244,241,235,.12)
borde botón outline   rgba(244,241,235,.28)
borde botón menú      rgba(244,241,235,.2)
hover fila servicio   rgba(244,241,235,.03)
wordmark footer       rgba(244,241,235,.07)
divisor dorado        rgba(185,148,85,.18)
borde botón dorado    rgba(185,148,85,.55)
header con scroll     rgba(8,8,8,.82) + blur(14px) saturate(140%)

/* sobre crema */
bordes                rgba(8,8,8,.14)
borde proceso         rgba(8,8,8,.18)
borde divisor         rgba(8,8,8,.22) / .24
borde link subrayado  rgba(8,8,8,.3)
marca de agua "cara"  rgba(8,8,8,.045)
```

Gradientes del hero (tres capas apiladas, z-index 0 → 1):

```css
/* capa media, con blur y drift */
background: radial-gradient(70% 60% at 40% 35%, #2a2419 0%, #141210 45%, #080808 100%);
filter: blur(26px) saturate(.72) brightness(.62);
transform: scale(1.12);

/* viñeta */
background: radial-gradient(120% 90% at 50% 45%, rgba(8,8,8,.28) 0%, rgba(8,8,8,.72) 55%, rgba(8,8,8,.94) 100%);

/* fundido superior/inferior */
background: linear-gradient(180deg, rgba(8,8,8,.85) 0%, rgba(8,8,8,0) 26%, rgba(8,8,8,0) 68%, rgba(8,8,8,.95) 100%);
```

### Tipografía

- **Display / headings:** `DM Serif Display` — 400 y 400 italic. El *italic* es un recurso semántico: siempre marca el fragmento clave de la frase ("*la otra cara*", "*la que nadie puede ignorar*", "*Work*", "*responsables*").
- **UI / texto:** `DM Sans` (variable, `opsz 9..40`) — 300, 400, 500, 600.
- **Mono (solo placeholders):** `ui-monospace, Menlo, monospace`.

Escala (usar los `clamp()` exactos):

| Rol | Valor |
|---|---|
H1 hero | `font-size: clamp(42px,7.4vw,124px); line-height:1; letter-spacing:-.022em` |
H2 manifiesto | `clamp(34px,5.4vw,92px); lh 1.03; ls -.02em; max-width:20ch` |
H2 sección (Servicios / Work) | `clamp(34px,5vw,80px); lh 1; ls -.02em` |
H2 "Somos La Otra Cara" | `clamp(40px,8vw,130px); lh .96; ls -.03em` |
H2 CTA final | `clamp(38px,6.6vw,110px); lh .98; ls -.025em; max-width:22ch` |
H2 editorialistas | `clamp(32px,4.6vw,72px); lh 1.04; ls -.02em; max-width:16ch` |
Título de servicio | `clamp(24px,3.1vw,46px); lh 1.08` |
Título de proyecto | `clamp(20px,1.9vw,30px)` (destacado ancho: `clamp(22px,2.4vw,40px)`) |
Blockquote testimonio | `clamp(26px,4vw,60px); lh 1.16; ls -.01em` |
Principio (I/II/III) | `clamp(22px,2.2vw,34px); lh 1.2` |
Número de proceso | `clamp(52px,6vw,92px); lh .9` |
Métrica manifiesto | `clamp(34px,3.4vw,52px); lh 1` |
Wordmark footer "LOC" | `clamp(120px,27vw,400px); lh .68; ls -.03em` |
Marca de agua "cara" | `clamp(180px,34vw,520px); lh .7` italic |
Body | `clamp(15px,1.2vw,18px); lh 1.7; weight 300` |
Body pequeño | `14px; lh 1.6–1.65; weight 300` |
Nav | `12px; ls .16em; uppercase; 500` |
Eyebrow | `11px; ls .26em–.30em; uppercase; 600` |
Botón | `11px; ls .20em–.22em; uppercase; 600` |
Metadato de card | `11px; ls .2em; uppercase` |
Footer link | `13px` (headings de columna `10px; ls .26em`) |
Placeholder mono | `10px; ls .12em–.14em; uppercase` |

`text-wrap: balance` en el H1 del hero; `text-wrap: pretty` en H2 largos, subtítulo del hero y párrafos.

### Espaciado y layout

```
contenedor           max-width: 1440px; margin-inline: auto
padding lateral      clamp(20px, 4vw, 64px)   /* usar SIEMPRE este valor */
padding vertical     clamp(90px, 14vh, 170px) /* sección estándar */
  hero               clamp(120px,18vh,190px) top / clamp(96px,14vh,150px) bottom
  manifiesto         clamp(90px,15vh,190px)
  CTA final          clamp(90px,16vh,190px)
  testimonio         clamp(100px,18vh,210px)
  clientes           clamp(70px,11vh,130px)
  footer             clamp(64px,10vh,110px) top, 0 bottom
gap de grid          clamp(20px, 2.6vw, 44px)
gap ancho (columnas) clamp(28px, 4vw, 72px)
header               padding 22px → 14px (con scroll); nav gap clamp(22px,2.6vw,42px)
fila de servicio     padding-block clamp(22px,3.4vh,38px); gap clamp(16px,3vw,48px)
sticky de servicios  top: 120px; flex: 0 0 clamp(280px,26vw,420px); aspect-ratio 3/4
```

### Radios, sombras, bordes

- **`border-radius: 0` en todo** (excepto círculos: `50%` en los anillos decorativos y el cursor personalizado). No añadas `rounded-*` en ningún lado.
- **Sin box-shadows.** La jerarquía se construye con contraste y hairlines de 1px.
- Bordes siempre 1px.

### Ratios de imagen

`3/4` (proyecto vertical, sticky de servicios, CTA), `4/5` (proyecto, retratos de equipo), `4/3` (proyectos inferiores), `16/7` (proyecto destacado ancho, `min-height:220px`).

### Filtros CSS de las imágenes de servicio

Parte de la coherencia visual — aplicar al contenedor de cada imagen:

```
svc-01 branding      sepia(.08) saturate(1.08) contrast(1.04) brightness(1.08)
svc-02 social        sepia(.08) saturate(1.08) contrast(1.04) brightness(1.08)
svc-03 paid          sepia(.06) saturate(1.10) contrast(1.06) brightness(1.18)
svc-04 web           sepia(.06) saturate(1.08) contrast(1.04) brightness(1.06)
svc-05 producción    sepia(.06) saturate(1.08) contrast(1.04) brightness(1.04)
```

---

## Secciones en detalle

### 1. Header (fixed)

- `position: fixed; inset: 0 0 auto; z-index: 60`, `display:flex; justify-content:space-between; align-items:center; gap:24px`.
- Izquierda: `loc-logo-mark.png`, `height:40px` (menú móvil: 42px), link a `#top`.
- Centro (≥900px): nav con Inicio · Agencia · Servicios · Proyectos · Contacto.
- Derecha (≥900px): botón outline "Hablemos" — `padding:13px 26px`, borde `rgba(185,148,85,.55)`, hover `background:#B99455; border-color:#B99455; color:#080808`.
- <900px: botón hamburguesa `52×52px`, borde `rgba(244,241,235,.2)`, dos barras de 1px (`#F4F1EB` y `#B99455`, `gap:6px`, padding lateral 12px).
- Estado inicial: fondo transparente, borde inferior transparente. **Con `scrollY > 40`:** fondo `rgba(8,8,8,.82)`, `backdrop-filter: saturate(140%) blur(14px)`, borde inferior `rgba(244,241,235,.12)`, padding-block 22px → 14px. Transición `.5s cubic-bezier(.2,.7,.2,1)`.

### 2. Menú móvil (overlay)

`position:fixed; inset:0; z-index:90; background:#080808`, columna. Arriba: logo + botón cerrar (`52×52`, glifo `✕`). Nav empujado con `margin-top:auto`: links en DM Serif Display `clamp(38px,11vw,64px)`, `gap:6px`; "Contacto" en dorado + italic. Abajo: botón sólido dorado full-width `min-height:56px`, "Hablemos →", `margin-top:44px`. Cerrar el menú al navegar.

### 3. Hero (`#top`)

- `min-height:100svh`, contenido centrado (flex column, `text-align:center`), `overflow:hidden`.
- Fondo: capa `inset:-8%` con la media (video `hero-video.mp4` en loop/muted/playsinline/autoplay, `object-fit:cover`; fallback a imagen) + gradiente radial, `filter: blur(26px) saturate(.72) brightness(.62)`, `transform: scale(1.12)`, animación `hero-drift` 26s ease-in-out infinite alternate. Si el video falla → ocultarlo y quedarse con el gradiente/imagen.
- Encima: viñeta radial + fundido lineal (ver gradientes arriba), `pointer-events:none`.
- Contenido (`max-width:1180px`): eyebrow "Agencia Creativa & Marketing" en dorado entre dos rayas de 1px (`width: clamp(24px,4vw,56px)`) → H1 "Mostramos *la otra cara* de tu marca." (blanco, con el italic en `#F4F1EB`) → párrafo `max-width:52ch` → dos botones.
- Botón primario: fondo `#F4F1EB`, texto `#080808`, `min-height:56px`, `padding-inline:32px`, hover fondo `#B99455`. Secundario: outline `rgba(244,241,235,.28)`, hover borde y texto dorados.
- Indicador de scroll abajo (`bottom: clamp(24px,5vh,44px)`): línea vertical de 1px × 44px dorada con animación `scroll-hint` (2.6s, escala en Y desde arriba y sale por abajo) + label "Scroll".

### 4. Manifiesto (`#agencia`)

- Fondo crema. Marca de agua "cara" en italic, `left:-4vw; bottom:-6vh`, `rgba(8,8,8,.045)`, `white-space:nowrap`, `user-select:none`.
- Eyebrow: `02` (serif, `gold-deep`) + raya de 56px + "Manifiesto".
- H2 con italic en `#8D6B3E`.
- Grid de 3 columnas (`auto-fit, minmax(280px,1fr)`, gap `clamp(28px,4vw,72px)`) sobre borde superior: dos párrafos + una columna con las métricas `12 / Marcas al año` y `05 / Disciplinas` (número serif + label uppercase, alineados en baseline, `gap:14px`).
- **Animación decorativa (solo ≥900px, detrás del texto, `pointer-events:none`, `z-index:0`)**, `top: clamp(40px,7vh,110px); right:0; width: clamp(240px,27vw,440px); aspect-ratio:1`:
  - anillo externo SVG girando `spin` 68s + arco dorado `#8D6B3E` con trazo animado (`draw` 9s);
  - anillo interno (`inset:13%`) girando `spin-rev` 46s, círculo punteado (`stroke-dasharray:3 9`) + arco `rgba(141,107,62,.55)` (`draw` 11s, delay .8s);
  - círculo (`inset:30%`) con `breathe` 7s;
  - cruz de dos hairlines con gradiente a transparente;
  - barrido horizontal dorado que recorre el tercio superior (`sweep` 6.5s);
  - punto central dorado de 5px con `breathe`.

### 5. Marquesina

Banda negra entre dos hairlines dorados `rgba(185,148,85,.18)`, `padding-block:22px`, `overflow:hidden`. Pista duplicada (`width:max-content`) con animación `marquee` 44s linear infinite (`translateX(0 → -50%)`). Alterna palabras serif grandes (`clamp(20px,2.2vw,34px)`) y labels uppercase 11px, separadas por `◆` dorado: Branding · Dirección de arte · *Social Media* (italic) · Paid Media · Web · Producción. El segundo bloque va `aria-hidden`.

### 6. Servicios (`#servicios`)

- Cabecera: H2 "Lo que hacemos" + eyebrow "03 — Capacidades", alineados a `flex-end` y separados.
- Layout `display:flex; gap: clamp(28px,4vw,72px); align-items:flex-start`. Columna izquierda `flex: 1 1 520px`.
- Cinco filas (`<a href="#contacto">`), cada una con hairline inferior: número serif dorado (`width:34px`) · título serif + descripción (`max-width:46ch`) · flecha `→` dorada. Hover: `padding-left: 18px` y fondo `rgba(244,241,235,.03)`, transición `.5s cubic-bezier(.2,.7,.2,1)`.

  1. **01 Producción de Contenido** — Fotografía, video, dirección creativa y piezas para campañas. → `svc-05-produccion.png`
  2. **02 Branding & Estrategia** — Posicionamiento, identidad de marca, dirección visual y sistemas gráficos. → `svc-01-branding-b.png`
  3. **03 Social Media** — Estrategia, contenido, dirección creativa y gestión de comunidades. → `svc-02-social.png`
  4. **04 Paid Media** — Campañas digitales orientadas a crecimiento, adquisición y performance. → `svc-03-paid.png`
  5. **05 Diseño & Desarrollo Web** — Experiencias digitales enfocadas en marca, conversión y posicionamiento. → `svc-04-web.png`

- Columna derecha (solo ≥900px): stage `position:sticky; top:120px`, `aspect-ratio:3/4`, con las cinco imágenes apiladas en absoluto. Solo la de la fila en hover tiene `opacity:1`; el resto 0, transición `opacity .6s ease`. **Estado por defecto y al salir de la lista: Producción de Contenido** (la primera fila).

### 7. Selected Work (`#proyectos`)

Cabecera: H2 "Selected *Work*" + "Proyectos que hablan por nosotros. Selección 2025 — 2026." (`max-width:32ch`), sobre hairline inferior.

Grid asimétrico, en tres bloques:

1. Fila de 3 (`auto-fit, minmax(300px,1fr)`): **NØR Studio** (3/4, Branding / Digital, 2026) · **Casa Brava** (4/5, Branding / Social, 2026, `align-self:end` para desfasarla) · **Nómada** (3/4, Strategy / Campaign, 2025).
2. Destacado ancho: **Verso** (16/7, Paid Media / Producción, 2026).
3. Fila de 2 (4/3): **Atria** (Branding / Producto, 2025) · **Hoja Negra** (Hospitality / Social, 2026).

Pie de cada card: hairline superior con `padding-top:16px; margin-top:16px`, título serif + categoría uppercase 11px `rgba(244,241,235,.45)` a la izquierda, año serif dorado 13px a la derecha, baseline compartida.

Hover de card: la imagen escala a `1.045` en `1.1s cubic-bezier(.2,.7,.2,1)` (contenedor con `overflow:hidden`) y aparece el **cursor personalizado**: círculo de 96px, borde 1px `#B99455`, fondo `rgba(8,8,8,.25)`, texto "Ver" (DM Sans, 9px, `ls .2em`, uppercase, dorado), centrado en el puntero, `opacity 0→1` y `scale .6→1` en `.35s`. Solo ≥900px.

### 8. Principios (`#0B0B0B`)

Eyebrow "No somos otra agencia" (dorado) → H2 "Somos *La Otra Cara.*" → grid de 3 (`auto-fit, minmax(240px,1fr)`, `gap:0`) con hairlines: borde superior en el grid, `border-bottom` en cada celda y `border-left` en las celdas 2 y 3. La primera celda no lleva padding izquierdo; la última no lleva padding derecho (`padding: clamp(26px,4vh,44px) clamp(20px,2.4vw,40px)`).

Numeración romana serif dorada (I, II, III), frase serif `clamp(22px,2.2vw,34px)` y apoyo 14px:

- **I — Estrategia antes que estética.** Nada se diseña sin una decisión de negocio detrás.
- **II — Ideas antes que tendencias.** Lo que hoy es viral, mañana es ruido. La idea permanece.
- **III — Resultados antes que ruido.** Medimos lo que importa y ajustamos sin ego.

### 9. Editorialistas / equipo

H2 "Las ideas tienen *responsables.*" + cita "“Estrategia, creatividad y ejecución bajo una misma visión.”" (`max-width:34ch`). Grid de 2 (`minmax(300px,1fr)`): retrato 4/5 + pie (nombre serif, rol uppercase, índice `01`/`02` serif dorado). **Nombres y roles son placeholder.**

### 10. Proceso (crema)

Eyebrow: raya de 56px + "Proceso". Grid de 4 (`auto-fit, minmax(220px,1fr)`, gap `clamp(28px,3vw,56px)`), cada columna con borde superior `rgba(8,8,8,.18)` y `padding-top:22px`: número serif gigante → label uppercase → apoyo.

`01 Descubrir` Entendemos la marca, su mercado y sus objetivos. · `02 Definir` Convertimos información en estrategia. · `03 Crear` Construimos una identidad y comunicación propias. · `04 Escalar` Ejecutamos, medimos y optimizamos.

### 11. Clientes

Label "Marcas que confiaron en ver las cosas diferente." → grid `auto-fit, minmax(150px,1fr)` con hairlines superior/izquierdo en el contenedor y derecho/inferior en cada celda, `min-height:110px`, logo centrado. Hoy: 6 placeholders mono ("logo cliente 01"…).

### 12. Testimonio (`#0B0B0B`)

Centrado, `max-width:1100px`. Comilla `“` serif dorada `clamp(48px,7vw,110px)` con `line-height:.6` → blockquote serif → raya dorada de 40px → nombre uppercase + "Founder — Casa Brava". **Atribución placeholder.**

### 13. CTA final (`#contacto`, crema)

Retrato en la esquina inferior derecha (`width: clamp(180px,26vw,420px)`, `aspect-ratio:3/4`, `transform: translateY(12%)`, contenedor `overflow:hidden`) — invade el borde a propósito. Contenido por encima (`position:relative`): eyebrow "Siguiente paso" (`gold-deep`) → H2 "¿Le mostramos al mundo *la otra cara* de tu marca?" → botón sólido negro `min-height:60px; padding-inline:38px` (hover fondo dorado, texto negro) + `hola@laotracara.com` en serif con subrayado de 1px.

### 14. Footer

Grid de 4 (`auto-fit, minmax(200px,1fr)`, gap `clamp(32px,4vw,72px)`):

1. `loc-logo-trim.png` (`height:58px`) + "Agencia boutique de marketing, branding y crecimiento digital." (`max-width:26ch`).
2. **Navegación** — Inicio, Agencia, Servicios, Proyectos, Contacto.
3. **Contacto** — hola@laotracara.com, WhatsApp (`https://wa.me/…`), Instagram.
4. **Estudio** — "Ciudad — País" + "Trabajamos con marcas en toda LATAM."

Barra inferior sobre hairline: "© 2026 La Otra Cara" / "Agencia de Marketing" (11px uppercase, `rgba(244,241,235,.35)`).

Debajo, wordmark "LOC" centrado, serif, `clamp(120px,27vw,400px)`, `rgba(244,241,235,.07)`, `margin-bottom:-.16em` para que quede cortado por el borde inferior.

---

## Interactions & Behavior

### Reveals al scroll

Todos los bloques marcados como revelables arrancan en `opacity:0; transform: translateY(18–28px)` y pasan a `opacity:1; translateY(0)`.

- Transición: `opacity 1s ease, transform 1s cubic-bezier(.2,.7,.2,1)`; variantes de `.9s` en la sección Proceso.
- Delays escalonados dentro de un grupo: `.1s / .12s / .14s / .2s / .24s / .25s / .3s / .35s`.
- Disparo: `IntersectionObserver` con `threshold: 0.12`, `rootMargin: '0px 0px -8% 0px'`, y `unobserve` tras revelar (una sola vez).
- **Failsafe obligatorio:** un timeout (~1.6s) que revela todo lo pendiente, para que el contenido nunca quede invisible si el observer no dispara.

### Keyframes

| Nombre | Duración / easing | Qué hace |
|---|---|---|
`hero-drift` | 26s ease-in-out infinite alternate | `scale(1.12)` → `scale(1.2) translate3d(-2%,-1.5%,0)` |
`marquee` | 44s linear infinite | `translateX(0)` → `translateX(-50%)` |
`spin` / `spin-rev` | 68s / 46s linear infinite | rotación ±360° |
`draw` | 9s / 11s cubic-bezier(.4,0,.2,1) infinite | `stroke-dashoffset: 1200 → 0` (0→55%, luego mantiene) |
`breathe` | 7s ease-in-out infinite | `scale(1)/.55` → `scale(1.05)/1` → vuelta |
`sweep` | 6.5s cubic-bezier(.5,0,.3,1) infinite | `translateY(-30% → 130%)` con fade in/out (15%–70% opaco) |
`scroll-hint` | 2.6s cubic-bezier(.4,0,.2,1) infinite | `scaleY(0→1)` desde `top`, luego `1→0` hacia `bottom` |

### Otros comportamientos

- **Header:** ver sección 1 (umbral `scrollY > 40`).
- **Servicios:** hover por fila cambia la imagen sticky; al salir de la lista vuelve a la 01. Implementar con delegación de eventos (un único listener), no un listener por fila.
- **Cards de proyecto:** zoom de imagen + cursor "Ver" (solo ≥900px, y ocultar si el puntero no es fino).
- **Navegación:** anclas internas con `scroll-behavior: smooth` en `html`.
- **`::selection`:** fondo `#B99455`, texto `#080808`.
- **`-webkit-font-smoothing: antialiased`** en `html`; `overflow-x: hidden` en `body`.
- **Falta y hay que añadirlo:** `@media (prefers-reduced-motion: reduce)` que anule marquesina, drift, anillos, sweep, scroll-hint y reveals (dejar todo en estado final).

### Responsive

Un solo breakpoint funcional: **900px**.

- **≥900px:** nav horizontal + botón, imagen sticky de servicios, anillos del manifiesto, cursor "Ver".
- **<900px:** hamburguesa + overlay full-screen, sin sticky de servicios, sin anillos, sin cursor. Todo lo demás se adapta con `clamp()` y `auto-fit`.
- Objetivos táctiles ≥ 44px (los botones ya usan `min-height: 56–60px`; hamburguesa 52px).

## State Management

Mínimo. En Astro basta con islas/scripts puntuales:

| Estado | Dónde | Notas |
|---|---|---|
`menuOpen` | overlay móvil | toggle; cerrar al navegar y con `Escape`; bloquear scroll del body mientras está abierto |
`isDesktop` | ≥900px | preferir CSS/media queries; en JS solo para el cursor y el hover del sticky |
`scrolled` | header | booleano derivado de `scrollY > 40`, listener `passive` |
`activeService` | 1–5 | índice de la imagen sticky visible; default 1 (Producción) |

Sin data fetching. Sin backend. El formulario de contacto **no existe**: hoy los CTA son `mailto:` y WhatsApp. Si se pide formulario, hay que diseñarlo.

## Assets

### Incluidos (`assets/`)

- `loc-logo.png`, `loc-logo-mark.png` (header/menú, 40–42px de alto), `loc-logo-trim.png` (footer, 58px de alto).
- `img/svc-01-branding-b.png`, `svc-02-social.png`, `svc-03-paid.png`, `svc-04-web.png`, `svc-05-produccion.png` — imágenes de servicio. Paleta común: negro `#080808`, dorado `#B99455`, luz dura, low-key. Aplicar los filtros CSS de arriba.
- Fuentes: **DM Serif Display** y **DM Sans** (Google Fonts / `@fontsource`, licencia OFL).

### Pendientes (bloquean el lanzamiento)

1. `hero-video.mp4` — personas reunidas, se muestra difuminado (`blur(26px)`); con poster de fallback. Idealmente < 3 MB, sin audio.
2. Seis imágenes de portafolio: NØR Studio, Casa Brava, Nómada, Verso (16/7), Atria, Hoja Negra.
3. Dos retratos de fundadores (4/5, b/n, luz contrastada) + nombres y roles reales.
4. Retrato editorial para el CTA final (3/4).
5. Seis logos de clientes (SVG monocromo preferible).
6. Datos reales: ciudad/país, WhatsApp, handle de Instagram, atribución del testimonio.

Mientras falten, usar placeholders con la misma proporción y el fondo `#0d0d0d` (no romper el layout).

## Files

```
design_handoff_homepage/
├─ README.md                  ← este documento
├─ AGENTS.md                  ← reglas para Claude Code en el repo Astro (copiar a la raíz)
├─ tailwind-tokens.md         ← tokens listos para pegar (Tailwind v4 y v3) + keyframes
├─ assets/                    ← logos e imágenes de servicio
├─ screenshots/               ← capturas por sección @1578px + índice
└─ design-reference/
   ├─ La Otra Cara - Homepage v5.html   ← ÁBRELO: diseño real, autocontenido
   └─ source/                            ← fuente del prototipo (referencia de estilos y JS)
```
