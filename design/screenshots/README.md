# Screenshots de referencia

Capturas del diseño real a **1578px de ancho** (desktop, ≥900px), tomadas del archivo
`design-reference/La Otra Cara - Homepage v5.html`. Todos los reveals están en su estado final.

| Archivo | Sección |
|---|---|
| `00-header.png` | Header fijo, estado inicial (transparente). @2x |
| `01-hero.png` | Hero centrado sobre media difuminada + indicador de scroll |
| `02-manifiesto.png` | Manifiesto (02) + anillos animados + métricas + marca de agua "cara" |
| `03-servicios.png` | Los 5 servicios + imagen sticky (estado por defecto: 01 Producción) |
| `04-proyectos.png` | Selected Work — grid asimétrico completo |
| `05-principios.png` | "Somos La Otra Cara." + principios I / II / III |
| `06-equipo.png` | Editorialistas — retratos placeholder |
| `07-proceso.png` | Proceso 01–04 (fondo crema) |
| `08-clientes.png` | Grid de logos de clientes (placeholders) |
| `09-testimonio.png` | Testimonio centrado |
| `10-cta.png` | CTA final + retrato que invade la esquina |
| `11-footer.png` | Footer + wordmark "LOC" recortado |

Notas al leer las capturas:

- Los rectángulos `#0d0d0d` con label mono son **placeholders**: faltan las fotos de hero, portafolio, fundadores y CTA, y los logos de clientes (ver "Assets pendientes" en el README).
- La marquesina de disciplinas está entre 02 y 03; no tiene captura propia porque es una banda en movimiento (44s linear).
- No hay capturas móviles: el layout se adapta con `clamp()` y `auto-fit`, y el único cambio estructural bajo 900px es el menú overlay (documentado en el README).
