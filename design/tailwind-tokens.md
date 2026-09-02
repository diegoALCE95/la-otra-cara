# Tokens listos para pegar

## Tailwind CSS v4 — `src/styles/global.css`

```css
@import "tailwindcss";

@theme {
  /* ── Color ─────────────────────────────────────────── */
  --color-ink: #080808;          /* fondo base oscuro / texto sobre crema */
  --color-ink-soft: #0B0B0B;     /* secciones oscuras alternas */
  --color-ink-well: #0d0d0d;     /* contenedores de imagen */
  --color-bone: #F4F1EB;         /* crema */
  --color-gold: #B99455;         /* acento sobre oscuro */
  --color-gold-deep: #8D6B3E;    /* acento sobre crema (AA) */
  --color-stone: #77736D;        /* labels sobre crema */
  --color-graphite: #3a3733;     /* párrafos sobre crema */
  --color-graphite-soft: #57534d;/* párrafos secundarios sobre crema */

  /* alfas del sistema */
  --color-bone-76: rgb(244 241 235 / .76);
  --color-bone-50: rgb(244 241 235 / .50);
  --color-bone-45: rgb(244 241 235 / .45);
  --color-bone-35: rgb(244 241 235 / .35);
  --color-bone-30: rgb(244 241 235 / .30);
  --color-hair: rgb(244 241 235 / .16);      /* borde estándar sobre oscuro */
  --color-hair-soft: rgb(244 241 235 / .14);
  --color-hair-faint: rgb(244 241 235 / .07);/* wordmark footer */
  --color-hair-ink: rgb(8 8 8 / .14);        /* borde estándar sobre crema */
  --color-hair-ink-strong: rgb(8 8 8 / .18);
  --color-hair-gold: rgb(185 148 85 / .18);  /* divisores dorados */
  --color-gold-55: rgb(185 148 85 / .55);    /* borde botón outline */
  --color-wash: rgb(244 241 235 / .03);      /* hover de fila de servicio */
  --color-scrim: rgb(8 8 8 / .82);           /* header con scroll */

  /* ── Tipografía ────────────────────────────────────── */
  --font-display: "DM Serif Display", Georgia, serif;
  --font-sans: "DM Sans", Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, Menlo, monospace;

  --text-hero: clamp(42px, 7.4vw, 124px);
  --text-hero--line-height: 1;
  --text-hero--letter-spacing: -0.022em;

  --text-h2-manifesto: clamp(34px, 5.4vw, 92px);
  --text-h2-manifesto--line-height: 1.03;
  --text-h2-manifesto--letter-spacing: -0.02em;

  --text-h2: clamp(34px, 5vw, 80px);
  --text-h2--line-height: 1;
  --text-h2--letter-spacing: -0.02em;

  --text-h2-mega: clamp(40px, 8vw, 130px);
  --text-h2-mega--line-height: 0.96;
  --text-h2-mega--letter-spacing: -0.03em;

  --text-h2-cta: clamp(38px, 6.6vw, 110px);
  --text-h2-cta--line-height: 0.98;
  --text-h2-cta--letter-spacing: -0.025em;

  --text-h2-team: clamp(32px, 4.6vw, 72px);
  --text-h2-team--line-height: 1.04;
  --text-h2-team--letter-spacing: -0.02em;

  --text-svc: clamp(24px, 3.1vw, 46px);
  --text-svc--line-height: 1.08;

  --text-card: clamp(20px, 1.9vw, 30px);
  --text-card-wide: clamp(22px, 2.4vw, 40px);

  --text-quote: clamp(26px, 4vw, 60px);
  --text-quote--line-height: 1.16;
  --text-quote--letter-spacing: -0.01em;

  --text-principle: clamp(22px, 2.2vw, 34px);
  --text-principle--line-height: 1.2;

  --text-step: clamp(52px, 6vw, 92px);
  --text-step--line-height: 0.9;

  --text-metric: clamp(34px, 3.4vw, 52px);
  --text-metric--line-height: 1;

  --text-body: clamp(15px, 1.2vw, 18px);
  --text-body--line-height: 1.7;

  --text-lede: clamp(14px, 1.1vw, 17px);
  --text-lede--line-height: 1.65;

  --text-wordmark: clamp(120px, 27vw, 400px);
  --text-wordmark--line-height: 0.68;
  --text-wordmark--letter-spacing: -0.03em;

  --text-watermark: clamp(180px, 34vw, 520px);
  --text-watermark--line-height: 0.7;

  /* ── Espaciado y layout ────────────────────────────── */
  --spacing-gutter: clamp(20px, 4vw, 64px);      /* padding lateral de sección */
  --spacing-section: clamp(90px, 14vh, 170px);   /* padding vertical estándar */
  --spacing-grid: clamp(20px, 2.6vw, 44px);      /* gap de grid de cards */
  --spacing-column: clamp(28px, 4vw, 72px);      /* gap entre columnas anchas */
  --container-shell: 1440px;

  /* ── Easing y radios ───────────────────────────────── */
  --ease-editorial: cubic-bezier(.2, .7, .2, 1);
  --ease-draw: cubic-bezier(.4, 0, .2, 1);
  --radius-none: 0px;

  /* ── Breakpoint único ──────────────────────────────── */
  --breakpoint-lg: 900px;

  /* ── Animaciones ───────────────────────────────────── */
  --animate-hero-drift: hero-drift 26s ease-in-out infinite alternate;
  --animate-marquee: marquee 44s linear infinite;
  --animate-spin-slow: spin-slow 68s linear infinite;
  --animate-spin-rev: spin-rev 46s linear infinite;
  --animate-draw: draw 9s var(--ease-draw) infinite;
  --animate-draw-slow: draw 11s var(--ease-draw) infinite .8s;
  --animate-breathe: breathe 7s ease-in-out infinite;
  --animate-sweep: sweep 6.5s cubic-bezier(.5,0,.3,1) infinite;
  --animate-scroll-hint: scroll-hint 2.6s var(--ease-draw) infinite;
}

@keyframes hero-drift {
  from { transform: scale(1.12) translate3d(0,0,0); }
  to   { transform: scale(1.2) translate3d(-2%,-1.5%,0); }
}
@keyframes marquee {
  from { transform: translate3d(0,0,0); }
  to   { transform: translate3d(-50%,0,0); }
}
@keyframes spin-slow { to { transform: rotate(360deg); } }
@keyframes spin-rev  { to { transform: rotate(-360deg); } }
@keyframes draw {
  0%        { stroke-dashoffset: 1200; }
  55%, 100% { stroke-dashoffset: 0; }
}
@keyframes breathe {
  0%, 100% { transform: scale(1);    opacity: .55; }
  50%      { transform: scale(1.05); opacity: 1; }
}
@keyframes sweep {
  0%        { transform: translateY(-30%); opacity: 0; }
  15%, 70%  { opacity: 1; }
  100%      { transform: translateY(130%); opacity: 0; }
}
@keyframes scroll-hint {
  0%   { transform: scaleY(0); transform-origin: top; }
  45%  { transform: scaleY(1); transform-origin: top; }
  55%  { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ── Resets del diseño ───────────────────────────────── */
html {
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}
body {
  margin: 0;
  background: var(--color-ink);
  color: var(--color-bone);
  font-family: var(--font-sans);
  overflow-x: hidden;
}
a { color: var(--color-gold); text-decoration: none; }
a:hover { color: var(--color-bone); }
::selection { background: var(--color-gold); color: var(--color-ink); }

/* ── Utilidades de composición ───────────────────────── */
@utility shell {
  max-width: var(--container-shell);
  margin-inline: auto;
}
@utility section-x {
  padding-inline: var(--spacing-gutter);
}
@utility section-y {
  padding-block: var(--spacing-section);
}

/* ── Movimiento reducido (OBLIGATORIO) ───────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```

### Uso

```html
<section class="shell section-x section-y">
  <h2 class="font-display text-h2 font-normal">
    Selected <em class="italic text-gold">Work</em>
  </h2>
</section>
```

Eyebrow reutilizable:

```html
<span class="text-[11px] font-semibold uppercase tracking-[.26em] text-gold">03 — Capacidades</span>
```

Botón primario del hero:

```html
<a href="#contacto"
   class="inline-flex min-h-14 items-center gap-3 bg-bone px-8 text-[11px] font-semibold
          uppercase tracking-[.2em] text-ink transition-colors duration-[400ms]
          hover:bg-gold focus-visible:outline-1 focus-visible:outline-offset-4
          focus-visible:outline-gold">
  Cuéntanos tu proyecto →
</a>
```

---

## Tailwind CSS v3 — `tailwind.config.mjs`

Solo si el proyecto queda anclado a v3.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    screens: { lg: '900px' },
    extend: {
      colors: {
        ink: { DEFAULT: '#080808', soft: '#0B0B0B', well: '#0d0d0d' },
        bone: '#F4F1EB',
        gold: { DEFAULT: '#B99455', deep: '#8D6B3E' },
        stone: '#77736D',
        graphite: { DEFAULT: '#3a3733', soft: '#57534d' },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(42px,7.4vw,124px)', { lineHeight: '1', letterSpacing: '-.022em' }],
        'h2-manifesto': ['clamp(34px,5.4vw,92px)', { lineHeight: '1.03', letterSpacing: '-.02em' }],
        h2: ['clamp(34px,5vw,80px)', { lineHeight: '1', letterSpacing: '-.02em' }],
        'h2-mega': ['clamp(40px,8vw,130px)', { lineHeight: '.96', letterSpacing: '-.03em' }],
        'h2-cta': ['clamp(38px,6.6vw,110px)', { lineHeight: '.98', letterSpacing: '-.025em' }],
        'h2-team': ['clamp(32px,4.6vw,72px)', { lineHeight: '1.04', letterSpacing: '-.02em' }],
        svc: ['clamp(24px,3.1vw,46px)', { lineHeight: '1.08' }],
        card: ['clamp(20px,1.9vw,30px)', { lineHeight: '1.1' }],
        'card-wide': ['clamp(22px,2.4vw,40px)', { lineHeight: '1.1' }],
        quote: ['clamp(26px,4vw,60px)', { lineHeight: '1.16', letterSpacing: '-.01em' }],
        principle: ['clamp(22px,2.2vw,34px)', { lineHeight: '1.2' }],
        step: ['clamp(52px,6vw,92px)', { lineHeight: '.9' }],
        metric: ['clamp(34px,3.4vw,52px)', { lineHeight: '1' }],
        body: ['clamp(15px,1.2vw,18px)', { lineHeight: '1.7' }],
        lede: ['clamp(14px,1.1vw,17px)', { lineHeight: '1.65' }],
        wordmark: ['clamp(120px,27vw,400px)', { lineHeight: '.68', letterSpacing: '-.03em' }],
        watermark: ['clamp(180px,34vw,520px)', { lineHeight: '.7' }],
      },
      spacing: {
        gutter: 'clamp(20px,4vw,64px)',
        section: 'clamp(90px,14vh,170px)',
        grid: 'clamp(20px,2.6vw,44px)',
        column: 'clamp(28px,4vw,72px)',
      },
      maxWidth: { shell: '1440px' },
      borderRadius: { none: '0' },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(.2,.7,.2,1)',
        draw: 'cubic-bezier(.4,0,.2,1)',
      },
      keyframes: {
        'hero-drift': {
          from: { transform: 'scale(1.12) translate3d(0,0,0)' },
          to: { transform: 'scale(1.2) translate3d(-2%,-1.5%,0)' },
        },
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'spin-rev': { to: { transform: 'rotate(-360deg)' } },
        draw: { '0%': { strokeDashoffset: '1200' }, '55%,100%': { strokeDashoffset: '0' } },
        breathe: {
          '0%,100%': { transform: 'scale(1)', opacity: '.55' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        sweep: {
          '0%': { transform: 'translateY(-30%)', opacity: '0' },
          '15%,70%': { opacity: '1' },
          '100%': { transform: 'translateY(130%)', opacity: '0' },
        },
        'scroll-hint': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        'hero-drift': 'hero-drift 26s ease-in-out infinite alternate',
        marquee: 'marquee 44s linear infinite',
        'spin-slow': 'spin 68s linear infinite',
        'spin-rev': 'spin-rev 46s linear infinite',
        draw: 'draw 9s cubic-bezier(.4,0,.2,1) infinite',
        breathe: 'breathe 7s ease-in-out infinite',
        sweep: 'sweep 6.5s cubic-bezier(.5,0,.3,1) infinite',
        'scroll-hint': 'scroll-hint 2.6s cubic-bezier(.4,0,.2,1) infinite',
      },
    },
  },
};
```

---

## Snippets de comportamiento

### `src/scripts/reveal.ts`

```ts
const EASE = 'cubic-bezier(.2,.7,.2,1)';

export function initReveals() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!nodes.length) return;

  const show = (el: HTMLElement) => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach(show);
    return;
  }

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          show(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  nodes.forEach((el) => io.observe(el));

  // failsafe: nada puede quedarse invisible
  setTimeout(() => {
    nodes.forEach(show);
    io.disconnect();
  }, 1600);
}
```

Markup del reveal (delay opcional):

```html
<div data-reveal
     class="translate-y-6 opacity-0 transition-[opacity,transform] duration-1000 ease-editorial"
     style="transition-delay:.12s">…</div>
```

### `src/scripts/header.ts`

```ts
export function initHeader() {
  const hdr = document.querySelector<HTMLElement>('[data-header]');
  if (!hdr) return;
  let raf = 0;
  const apply = () => {
    raf = 0;
    hdr.dataset.scrolled = String(window.scrollY > 40);
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(apply); }, { passive: true });
  apply();
}
```

```html
<header data-header
        class="fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-6
               section-x py-[22px] border-b border-transparent bg-transparent
               transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-editorial
               data-[scrolled=true]:bg-scrim data-[scrolled=true]:backdrop-blur-[14px]
               data-[scrolled=true]:backdrop-saturate-[1.4]
               data-[scrolled=true]:border-white/10 data-[scrolled=true]:py-[14px]">
```

### `src/scripts/servicios-hover.ts`

```ts
export function initServiceStage() {
  const list = document.querySelector<HTMLElement>('[data-svc-list]');
  const stage = document.querySelector<HTMLElement>('[data-svc-stage]');
  if (!list || !stage) return;

  const imgs = Array.from(stage.querySelectorAll<HTMLElement>('[data-svc-img]'));
  const show = (id: string) =>
    imgs.forEach((el) => { el.style.opacity = el.dataset.svcImg === id ? '1' : '0'; });

  list.addEventListener('mouseover', (e) => {
    const row = (e.target as Element).closest<HTMLElement>('[data-svc]');
    if (row?.dataset.svc) show(row.dataset.svc);
  });
  list.addEventListener('mouseleave', () => show('1')); // default: Producción de Contenido
  show('1');
}
```

### `src/scripts/work-cursor.ts`

```ts
export function initWorkCursor() {
  if (!matchMedia('(min-width: 900px) and (pointer: fine)').matches) return;

  const grid = document.querySelector<HTMLElement>('[data-work-grid]');
  if (!grid) return;

  const cur = document.createElement('div');
  cur.className =
    'pointer-events-none fixed left-0 top-0 z-[80] flex size-24 -translate-x-1/2 -translate-y-1/2 ' +
    'scale-[.6] items-center justify-center rounded-full border border-gold bg-ink/25 ' +
    'text-[9px] uppercase tracking-[.2em] text-gold opacity-0 ' +
    'transition-[opacity,transform] duration-[350ms] ease-editorial';
  cur.textContent = 'Ver';
  document.body.append(cur);

  const move = (e: PointerEvent) => {
    cur.style.left = `${e.clientX}px`;
    cur.style.top = `${e.clientY}px`;
  };

  grid.addEventListener('pointerover', (e) => {
    if (!(e.target as Element).closest('[data-work]')) return;
    cur.classList.remove('opacity-0', 'scale-[.6]');
    addEventListener('pointermove', move);
  });
  grid.addEventListener('pointerout', (e) => {
    if ((e.relatedTarget as Element | null)?.closest('[data-work]')) return;
    cur.classList.add('opacity-0', 'scale-[.6]');
    removeEventListener('pointermove', move);
  });
}
```
