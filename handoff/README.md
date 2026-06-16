# Content Builder — Handoff para Claude Code

App web interna para un marketer que maneja varias marcas y produce **anuncios de imagen y video con IA**. Este paquete contiene el diseño hi-fi completo (todas las pantallas, todos los estados, mobile + desktop) y las specs para implementarlo **tal cual**.

---

## ⚠️ Antes de empezar — leé esto

1. **El diseño de referencia es la fuente de verdad.** El archivo `source/Content Builder.dc.html` es un prototipo navegable y funcional de TODA la app (sidebar, brand switcher, command palette, las 9 pantallas, generación con estados, calendario, etc.). Abrilo en un navegador para ver interacciones, hover states, transiciones y el flujo real. **Replicá lo que ves ahí.**
2. **Las capturas** (`screenshots/desktop/*` y `screenshots/mobile/*`) muestran cada pantalla. Respetá el layout, la jerarquía, los colores y la tipografía **exactamente**.
3. **Los tokens exactos** (color, tipo, espaciado, radios, sombras, motion) están en `DESIGN-SYSTEM.md` y en `source/_ds/phatia/tokens/*.css`. **No inventes valores** — usá estos.
4. **No es una landing.** Es una herramienta densa, dark-first, estilo Linear / Vercel / Raycast / Framer. El chrome es neutro y sofisticado para que **el contenido colorido de cada marca resalte**.

---

## Stack objetivo (lo pedido — todo gratuito / MIT)

- **Next.js (App Router) + React + TypeScript + Tailwind CSS v4**
- **shadcn/ui** (sobre Radix) — **fuertemente customizado**, NO el look default. Re-estilá los componentes con los tokens de `DESIGN-SYSTEM.md`.
- **Motion** (ex Framer Motion) para animación · spring + view transitions
- **Magic UI / Aceternity** para momentos con impacto (hero del Studio, estado de generación)
- **Lucide** (íconos) · **cmdk** (command palette ⌘K) · **sonner** (toasts) · **dnd-kit** (drag&drop calendario + assets) · **Embla** (carruseles de propuestas) · **TanStack Query/Table** · **Tremor / shadcn charts** (dashboard) · **vaul** (drawers / panel de ideas)
- Usá **Context7** para traer docs actualizadas de Tailwind v4, Motion, shadcn, etc. antes de implementar.

> El prototipo de referencia está hecho en HTML/CSS plano por portabilidad. **No lo copies literal** — re-implementalo en el stack de arriba, pero respetando 1:1 el resultado visual y de interacción.

---

## Las 9 pantallas (ver `SCREENS.md` para el detalle de cada una)

| # | Pantalla | Archivo de captura |
|---|----------|--------------------|
| 1 | Layout global (sidebar + topbar + brand selector + ⌘K) | presente en todas |
| 2 | Marcas (home) — grid de tarjetas | `03-marcas` |
| 3 | Dashboard de marca — bento grid | `01-dashboard` |
| 4 | Sistema de diseño (por marca) — tokens editables | `07-sistema-diseno` |
| 5 | Biblioteca de assets — filtro por pilar + Drive + drag&drop | `04-biblioteca` |
| 6 | Studio de generación (hero) — prompt + controles + estados | `02-studio`, `02b-studio-resultados` |
| 7 | Outputs — galería cronológica | `05-outputs` |
| 8 | Calendario — mes/semana multi-red + "tirame ideas" | `06-calendario`, `06b-calendario-ideas` |
| 9 | Settings — Drive + config de generación | `08-settings` |

**Estados diseñados:** vacío (con personalidad), loading/skeleton, **generación en progreso** (premium, con el motivo del vórtice), error y success.

---

## Estructura de este paquete

```
handoff/
├── README.md                 ← este archivo
├── DESIGN-SYSTEM.md          ← tokens exactos + dirección de componentes
├── SCREENS.md                ← spec pantalla por pantalla, con estados
├── COMPONENTS.md             ← inventario de componentes reutilizables
├── screenshots/
│   ├── desktop/              ← 1440px-ish, las 9 pantallas + detalles
│   └── mobile/               ← 404px, pantallas clave
└── source/
    ├── Content Builder.dc.html   ← prototipo navegable (abrilo en el browser)
    └── _ds/phatia/               ← tokens CSS + fuentes + assets del sistema
```

## Cómo correr el prototipo de referencia
Abrí `source/Content Builder.dc.html` en un navegador (doble click). No necesita build. Navegá con la sidebar, probá el brand switcher arriba, ⌘K para la command palette, y en Studio tocá **Generar** para ver el estado de generación → resultados.
