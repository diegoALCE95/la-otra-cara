# AGENTS.md — La Otra Cara (Astro + Tailwind)

Reglas operativas para agentes de código (Claude Code) en este repositorio.
El diseño de referencia y todas las medidas están en `/README.md`.
**Abre `design/design-reference/La Otra Cara - Homepage v5.html` en el navegador antes de escribir código.** Es la fuente de verdad visual.

---

## 1. Regla de oro

El HTML de `design-reference/` es una **referencia de diseño**, no código a portar. Recréalo en Astro + Tailwind con markup semántico y utilidades. No copies el runtime del prototipo (`support.js`, `image-slot.js`, `<x-dc>`, atributos `style-hover`) — nada de eso va al repo.

Fidelidad **pixel-perfect** en colores, tipografía, escalas `clamp()`, espaciados, transiciones y estados. Si una medida no está en el README, léela del HTML de referencia; no la inventes.

## 2. Stack y comandos

- **Astro** (última estable) + **Tailwind CSS v4** vía `@tailwindcss/vite`.
- TypeScript en modo `strict`.
- Sin framework de UI (React/Vue/Svelte) a menos que se pida: esta homepage es HTML + CSS + un puñado de líneas de JS vanilla.
- Gestor de paquetes: **pnpm**.

```bash
pnpm dev            # servidor de desarrollo
pnpm build          # build de producción (debe pasar sin warnings)
pnpm astro check    # tipos y diagnósticos — obligatorio antes de dar algo por hecho
pnpm preview        # revisar el build
```

Antes de decir que una tarea está lista: `pnpm astro check && pnpm build` en verde.

## 3. Estructura de archivos

```
src/
├─ layouts/BaseLayout.astro        # <head>, fuentes, meta/SEO, skip-link, slot
├─ pages/index.astro               # compone las secciones en orden, nada más
├─ components/
│  ├─ Header.astro
│  ├─ MobileMenu.astro
│  ├─ Hero.astro
│  ├─ Manifiesto.astro
│  ├─ ManifiestoRings.astro        # SVG decorativo + animaciones
│  ├─ Marquee.astro
│  ├─ Servicios.astro
│  ├─ SelectedWork.astro
│  ├─ WorkCard.astro
│  ├─ Principios.astro
│  ├─ Equipo.astro
│  ├─ Proceso.astro
│  ├─ Clientes.astro
│  ├─ Testimonio.astro
│  ├─ CtaFinal.astro
│  ├─ Footer.astro
│  └─ ui/                          # Button.astro, Eyebrow.astro, SectionShell.astro
├─ data/                           # servicios.ts, proyectos.ts, proceso.ts, principios.ts, nav.ts
├─ scripts/                        # header.ts, reveal.ts, servicios-hover.ts, work-cursor.ts, menu.ts
├─ styles/global.css               # @import tailwindcss + @theme + @font-face + @keyframes + resets
└─ assets/                         # imágenes procesadas por astro:assets
public/                            # video del hero, favicons, og image
```

Reglas de estructura:

- **Una sección = un componente `.astro`.** `index.astro` solo importa y ordena; no debe contener markup de sección.
- **El contenido repetido va en `src/data/*.ts` tipado**, no hardcodeado en el markup: servicios, proyectos, pasos del proceso, principios, links de nav y footer. Un componente itera sobre el array.
- No crees componentes "por si acaso". Si un patrón aparece menos de 3 veces, déjalo inline.
- Crea variables con nombres legibles y código legible por humanos.

## 4. Tailwind: cómo escribir estilos

- Tokens en `@theme` dentro de `src/styles/global.css`. Copia los valores de `tailwind-tokens.md` **sin cambiarlos ni "redondearlos"**.
- Usa los tokens (`bg-ink`, `text-bone`, `text-gold`, `border-hair`), nunca hex sueltos en las clases. Si necesitas un color que no está en `@theme`, primero pregúntate si de verdad hace falta; el sistema es cerrado a propósito.
- Las escalas tipográficas fluidas son **valores arbitrarios con `clamp()`** o utilidades definidas en `@theme` (`text-display-hero`, etc.). No las aproximes con `text-6xl md:text-8xl`.
- Padding lateral de sección: **siempre** `px-[clamp(20px,4vw,64px)]`. Extráelo a un componente `SectionShell.astro` o a un `@utility`.
- **`rounded-*` está prohibido.** El diseño es 100 % de esquinas rectas, salvo `rounded-full` en los anillos decorativos y el cursor "Ver".
- **`shadow-*` está prohibido.** La jerarquía se hace con contraste y hairlines de 1px.
- Nada de gradientes decorativos nuevos. Los únicos gradientes permitidos son los tres del hero, documentados en el README.
- Hover/focus con variantes de Tailwind (`hover:`, `focus-visible:`, `group-hover:`), no con JS.
- Un `<style>` en el `.astro` es aceptable para lo que Tailwind expresa mal (keyframes locales, `@supports`, selectores complejos del SVG). Preferir siempre utilidades.
- Móvil primero. El único breakpoint funcional es **900px** — defínelo como `lg` custom o usa `min-[900px]:` de forma consistente. No inventes breakpoints extra.

## 5. Tipografía

- `DM Serif Display` (400 + italic) para display; `DM Sans` (variable, 300/400/500/600) para UI y texto.
- Autoaloja con `@fontsource-variable/dm-sans` y `@fontsource/dm-serif-display` (o `@font-face` local con `font-display: swap`). **No cargues Google Fonts por CDN en producción.**
- El *italic* del serif es semántico: marca el fragmento clave de cada titular. Consérvalo exactamente donde está en la referencia; no lo añadas en otros sitios.
- `text-wrap: balance` en el H1 del hero, `text-wrap: pretty` en H2 largos y párrafos.
- Un solo `<h1>` por página (el del hero). Jerarquía de headings correcta, sin saltos.

## 6. JavaScript

- Vanilla TS en `src/scripts/`, cargado desde el componente con `<script>` (Astro lo bundlea y le pone `type="module"`, es diferido por defecto).
- Cero dependencias de animación (sin GSAP, Framer Motion, AOS, Lenis). Todo con CSS + `IntersectionObserver`.
- Listeners de `scroll` y `resize` siempre `{ passive: true }` y con `requestAnimationFrame` para las escrituras al DOM.
- **Delegación de eventos** para el hover de servicios y las cards: un listener en el contenedor, no uno por elemento.
- Los reveals llevan **failsafe**: timeout de ~1.6s que revela todo lo pendiente. El contenido nunca puede quedarse invisible por un observer que no dispara.
- Si añades View Transitions de Astro, reinicializa los scripts en `astro:page-load`, no solo en `DOMContentLoaded`.
- El cursor "Ver" solo se activa con `matchMedia('(min-width: 900px) and (pointer: fine)')`.

## 7. Accesibilidad (no negociable)

- `lang="es"` en `<html>`. Textos en español; los términos de industria en inglés (Branding, Paid Media, Social Media, Selected Work) se mantienen tal cual.
- Contraste: sobre crema usa **`#8D6B3E` (`gold-deep`)**, nunca `#B99455` — este último es solo para fondos oscuros.
- Anillos de foco visibles en todos los interactivos: `focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold` (o `gold-deep` sobre crema). No elimines outlines sin reemplazo.
- Overlay móvil: trap de foco, cierre con `Escape`, `aria-expanded` en el botón, `inert`/`aria-hidden` en el resto mientras está abierto, y bloqueo de scroll del body.
- Elementos decorativos (anillos, marca de agua "cara", wordmark "LOC", segunda pista de la marquesina, `◆`) con `aria-hidden="true"`.
- El video del hero: `muted`, `playsinline`, `loop`, `preload="metadata"`, `poster`, y `aria-hidden` (es decorativo). Nunca contiene información.
- **Implementa `@media (prefers-reduced-motion: reduce)`**: anula marquesina, drift del hero, anillos, sweep, scroll-hint y reveals (deja todo en su estado final). Falta en el prototipo; en el repo es obligatorio.
- Skip-link al contenido principal. Objetivos táctiles ≥ 44px.
- Imágenes con `alt` descriptivo; `alt=""` solo si son puramente decorativas.

## 8. Imágenes y media

- Todo lo que sea contenido va por `astro:assets` (`<Image>` / `<Picture>`) desde `src/assets/`: WebP/AVIF, `width`/`height` explícitos, `loading="lazy"` + `decoding="async"` salvo el hero (`loading="eager"`, `fetchpriority="high"`).
- Los contenedores de imagen llevan su `aspect-ratio` (3/4, 4/5, 4/3, 16/7) y `overflow-hidden`. Nada de saltos de layout (CLS 0).
- Aplica los **filtros CSS por imagen de servicio** documentados en el README — son parte de la identidad visual, no un extra.
- Placeholders mientras faltan assets: contenedor `bg-ink-well` con la proporción correcta y un label mono 10px `uppercase tracking-[.14em]` en `rgba(244,241,235,.3)`. Nunca un `<img>` roto, nunca un layout colapsado.
- `hero-video.mp4` en `public/`, con `poster` de fallback y ocultado por JS si falla la carga.
- **No generes imágenes ni ilustraciones SVG figurativas.** Si falta un asset, deja el placeholder y anótalo.

## 9. Contenido

- El copy de la referencia es **final**: no lo reescribas, no lo "mejores", no lo traduzcas.
- Nombres de proyectos, fundadores, testimonio, ciudad y logos de clientes son **placeholder**. Márcalos como `TODO:` en `src/data/` en lugar de inventar datos plausibles.
- **Sin emojis** en ningún lado — ni en UI, ni en copy, ni en commits.
- No añadas secciones, badges, "features", contadores animados ni social proof que no estén en el diseño. Si crees que falta algo, **propónlo; no lo implementes**.

## 10. SEO y performance

- `BaseLayout.astro` centraliza `title`, `description`, canonical, Open Graph, Twitter card y `JSON-LD` de tipo `Organization`/`ProfessionalService`.
- `sitemap` (`@astrojs/sitemap`) y `robots.txt`.
- Objetivo: Lighthouse ≥ 95 en las cuatro categorías, **0 KB de JS de framework**. El JS total de la página debe quedar por debajo de ~10 KB.
- Cero fuentes o scripts de terceros sin aprobación explícita (nada de analytics, chat widgets o pixels añadidos por iniciativa propia).

## 11. Cómo trabajar (proceso del agente)

1. Lee este archivo y el `README.md` del handoff. Abre el HTML de referencia.
2. Planifica: enumera los componentes que vas a tocar antes de escribir.
3. Trabaja **sección por sección**, de arriba abajo. Termina y verifica una antes de empezar la siguiente.
4. Verifica cada sección con el HTML de referencia al lado, a **375px, 900px y 1440px**.
5. Cambios quirúrgicos: si te piden ajustar un color o un texto, cambia solo eso. No refactorices por gusto, no reordenes clases, no "modernices" lo que ya funciona.
6. `pnpm astro check && pnpm build` antes de reportar.
7. Si algo del diseño es ambiguo o falta un asset, **pregunta o deja un `TODO:` explícito**. Nunca improvises contenido de marca.

## 12. Anti-patrones (rechazar de plano)

- Esquinas redondeadas, sombras, gradientes decorativos nuevos.
- `text-4xl md:text-7xl` en lugar de los `clamp()` del sistema.
- Colores hex sueltos en clases, o un `gold` distinto del par `#B99455` / `#8D6B3E`.
- Librerías de animación, de carruseles o de scroll.
- Añadir React/Vue para un toggle de menú.
- Componentizar de más (un `.astro` por cada `<span>`).
- Portar `support.js` / `image-slot.js` / `<x-dc>` al repo.
- Reescribir el copy en español o traducirlo al inglés.
- Emojis.
- Dar por terminada una sección sin comprobarla a 375px.
