# Tech Decisions

- **No iframe for chat** — n8n blocks iframe embedding; use `@n8n/chat` SDK via CDN instead
- **Widget injection** — loaded via Google Tag Manager on client sites
- **CSS** — plain CSS, sin framework. Design system con variables CSS definido en `index.html`
- **Client data store** — Google Sheets per client (simple, accessible for non-technical clients)

## Sistema de diseño (actualizado 2026-05-17)

Todas las páginas públicas del sitio comparten este sistema. Referencia canónica: `index.html`.

```css
--black:     #07090f   /* fondo principal */
--black-2:   #0d1218   /* fondo de cards/secciones alternas */
--black-3:   #131b27   /* fondo de elementos internos */
--white:     #f0e6d3   /* texto principal (blanco cálido) */
--muted:     #a09080   /* texto secundario / subtítulos */
--muted-2:   #3a4455   /* separadores oscuros */
--green:     #c8912b   /* acento dorado — botones, highlights */
--green-dim: rgba(200,145,43,0.15)   /* fondo hover dorado suave */
--border:    rgba(240,230,211,0.07)  /* bordes sutiles */
--border-2:  rgba(240,230,211,0.14)  /* bordes más visibles */
--font-h:    'Cormorant Garamond', Georgia, serif   /* headings */
--font-b:    'DM Sans', system-ui, sans-serif       /* cuerpo */
--font-m:    'DM Mono', monospace
```

**Logo:** `TIMELESS.` — Cormorant Garamond weight 500, letter-spacing 0.1em, punto final en `--green`.

**Nav:** `rgba(10,10,10,0.92)` + `backdrop-filter blur(20px)` + borde inferior `--border`. CTA button: `--green` bg, `--black` text.

**Páginas con branding propio (NO tocar con este sistema):**
- `chat-sunlife.html`, `panel-sunlife.html`, `dashboard-sunlife.html` — tema Sun Life (teal/gold)
