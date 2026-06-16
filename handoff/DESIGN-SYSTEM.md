# Content Builder — Sistema de diseño (tokens exactos)

Dark-first. Chrome neutro near-black plum, un único acento caliente (sangría), oro **solo para datos**. La app NO compite visualmente con las marcas: cada marca aporta su propio color de acento, que resalta sobre el chrome neutro.

> Fuente: tokens en `source/_ds/phatia/tokens/*.css`. Replicalos como CSS variables / theme de Tailwind v4 (`@theme`).

---

## 1. Color

### Superficies (near-black plum) — el chrome de la app
```
--bg:        #0A0810   /* canvas base */
--surface:   #15131C   /* cards, plates */
--surface-2: #1C1924   /* superficies elevadas / anidadas */
--surface-3: #241F2E   /* chips, inputs */
```

### Tinta (texto warm paper sobre oscuro)
```
--text:       #F4F1EA   /* primario */
--text-muted: #8C8696   /* secundario */
--text-faint: #5A5563   /* terciario / meta / timestamps */
```

### Acento — SANGRÍA (el único color caliente del chrome)
```
--accent:       #F23A5E   /* CTAs, énfasis, estado activo, glow del core */
--accent-ink:   #0A0810   /* texto/ícono SOBRE el acento */
--accent-soft:  #241019   /* fill tinteado detrás de contenido de acento */
--accent-glow:  #FF7D9B   /* highlight brillante */
--accent-deep:  #6B1A36
```
Usar con **moderación**: botón primario, estado activo de nav, "AI", énfasis serif en itálica, dot del eyebrow, badges de notificación.

### Data / viz (oro — SOLO datos, nunca chrome)
```
--viz:        #E0A458   /* barras, stats, callouts, estado "Borrador" */
--viz-soft:   #2A2014
--viz-strong: #F0B86A
```

### Bordes (hairlines luminosos)
```
--border:        rgba(244,241,234,0.10)
--border-strong: rgba(244,241,234,0.18)
--border-accent: color-mix(in srgb, #F23A5E 62%, transparent)
```

### Estados semánticos
```
--positive:  #4FD08A   /* sync OK, "Publicado", tendencia + */
--warn:      #E0A458
--negative:  #F23A5E
```

### Tints de plataforma (solo dataviz / dots, nunca fondos)
```
--pf-instagram:#C13584  --pf-tiktok:#25F4EE  --pf-youtube:#FF0033  --pf-x:#E7E9EA
```

### Color de marca (CONTENIDO, no chrome)
Cada marca define `--brand` y `--brand-2` (versión oscura). Se setean en el root del workspace y todo el contenido de esa marca (tiles de assets/outputs, swatches, gráficos, acentos de tarjetas) usa `var(--brand)`. Marcas del prototipo:

| Marca | Categoría | `--brand` | `--brand-2` | Mono |
|-------|-----------|-----------|-------------|------|
| Lumen | Skincare | `#34D399` | `#0F766E` | LM |
| Cobalt | Fintech | `#5B8DEF` | `#2B4ACB` | CB |
| Fauna | Pet Food | `#F59E63` | `#B45309` | FA |
| Nimbus | SaaS B2B | `#A78BFA` | `#6D28D9` | NB |
| Solera | Vino | `#E0A458` | `#92400E` | SO |
| Mantra | Fitness | `#F472A6` | `#BE185D` | MN |

Cambiar de marca = re-setear `--brand`/`--brand-2` y recargar datos. El acento de la app (sangría) **no cambia**.

---

## 2. Tipografía

Tres familias, un trabajo cada una (Google Fonts):
```
--font-serif: "Newsreader", Georgia, serif    /* headlines editoriales · weight 400 · itálica = énfasis */
--font-sans:  "Geist", -apple-system, sans     /* TODA la UI / body / leads */
--font-mono:  "JetBrains Mono", monospace      /* eyebrows, labels, data, timestamps */
```

### Uso
- **Headlines / títulos de pantalla:** Newsreader 400, `line-height:0.96–1.02`, `letter-spacing:-0.02em`, `text-wrap:balance`. Énfasis = `<em>` en itálica color sangría. Sentence case (nunca all-caps).
- **Eyebrow / kicker:** JetBrains Mono, `0.75rem`, `letter-spacing:0.2em`, UPPERCASE, `--text-muted`, con un **dot sangría** de 0.5em antes.
- **Labels / data / timestamps:** JetBrains Mono, `0.7rem`, `letter-spacing:0.16em`, UPPERCASE, `--text-faint`. Números con `font-variant-numeric: tabular-nums`.
- **Body UI:** Geist `0.95rem`, `line-height:1.55`.
- **Lead:** Geist `1.05–1.3rem`, `line-height:1.6`, `--text-muted`.

Escala display (fluida): hero `clamp(1.9rem,3vw,2.7rem)`, sección `clamp(1.7rem,2.6vw,2.2rem)`.

---

## 3. Espaciado · Radios · Sombras

### Espaciado (4pt)
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96`

### Radios
```
--r-xs:3  --r-sm:6  --r-md:10  --r-lg:14  --r-xl:20  --r-2xl:28  --r-pill:999
```
Cards = `--r-lg` (14). Inputs/chips internos = `--r-md` (10). Botones/badges/chips = pill. Tarjetas grandes (brand cards, studio composer) = `--r-xl` (20).

### Sombras (ambient sobre oscuro)
```
--sh-1: 0 1px 2px rgba(0,0,0,.45)
--sh-2: 0 2px 10px rgba(0,0,0,.50)
--sh-3: 0 10px 30px rgba(0,0,0,.55)
--sh-4: 0 20px 60px rgba(0,0,0,.65)
--sh-pop: 0 30px 80px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.06)
```

### Glow (la incandescencia de marca — así se lee la profundidad sobre near-black)
```
--glow-accent: 0 0 24px color-mix(in srgb, #F23A5E 45%, transparent)
--glow-core:   0 0 48px ... , 0 0 16px ...   /* core del logo, botón generar */
```

### Glass (placas frosted)
```
background: color-mix(in srgb, #15131C 64%, transparent)
backdrop-filter: blur(14px) saturate(1.08)
border: 1px solid var(--border)
```
Usar para: callouts sobre imagen/vórtice, topbar, panel de ideas, chips sobre tiles.

---

## 4. Motion

```
--ease-converge: cubic-bezier(0.7,0.02,0.2,1)   /* ease de marca: rápido y asienta, no rebota */
--ease-out:      cubic-bezier(0.22,0.61,0.36,1) /* reveals, push-in */
--dur-1:120ms  --dur-2:240ms  --dur-3:450ms  --dur-4:900ms
```

- **Hover:** `translateY(-1px)` + `brightness(1.07)` en acento, o borde que sube a `--text`. Cards: `translateY(-3px)` + sombra + borde `--border-strong`.
- **Press:** `translateY(1px)`.
- **Reveal de propuestas generadas:** entrada escalonada (stagger ~80ms) con `--ease-converge`, scale `.975→1` + translateY.
- **Estado de generación:** el motivo del **vórtice** (señales que espiralan hacia un core incandescente). En el stack usalo como canvas animado / componente Magic UI equivalente. Honrar `prefers-reduced-motion`.
- **Skeletons:** shimmer lineal 1.4s sobre `--surface-2 → --surface-3`.
- Spinners: borde con `border-top-color:var(--accent)`, spin 0.8s lineal.

---

## 5. Dirección de componentes (shadcn customizado)

- **Botón primario:** pill, fill sangría, texto mono UPPERCASE `0.06em`, glow-accent. Secundario: outline `--border-strong` o ghost glass.
- **Badge/chip:** pill, mono `0.68rem` UPPERCASE. Tonos: default (hairline), accent (sangría soft), data (oro), glass.
- **Segmented control:** track `--surface-3` con pill activo `--surface` + `--sh-1`. (Studio: Single/Carrusel/Video; Calendario: Mes/Semana.)
- **Toggle/switch:** off `--surface-3`, on sangría con knob `--accent-ink`.
- **Card:** `--surface`, borde `--border`, radio 14, hover lift.
- **Nav item:** activo = `--surface-2` + barra sangría 3px a la izquierda.
- **Inputs:** fondo `--bg`/`--surface-3`, borde `--border`, focus borde → `--border-accent`.

Íconos: **Lucide**, stroke 1.5–2px, `--text-muted` o `--accent`. **Sin emoji.**
