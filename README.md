# Content Builder

App web interna, **dark-first**, para un marketer que maneja varias marcas y
produce anuncios de imagen y video con IA. Construida 1:1 a partir del handoff de
diseño (`handoff/`): estética Linear / Vercel / Raycast, chrome neutro near-black
plum con un único acento sangría, y color de marca por workspace.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (tokens del handoff portados a `@theme` + CSS vars)
- **shadcn-style primitives** sobre **Radix** · **Motion** · **cmdk** (⌘K) ·
  **sonner** (toasts) · **vaul** (drawers) · **dnd-kit** · **Embla** · **Lucide**
- Fuentes: **Newsreader** (serif editorial), **Geist** (UI), **JetBrains Mono** (data)
- **Supabase** para las marcas (lectura pública con RLS), con fallback estático

## Pantallas

`/marcas` · `/dashboard` · `/studio` · `/biblioteca` · `/outputs` ·
`/calendario` · `/sistema` · `/settings` — más el chrome global (sidebar, topbar
con brand switcher, command palette ⌘K, tab bar mobile).

## Desarrollo

```bash
npm install
cp .env.example .env.local   # opcional: setear Supabase
npm run dev                  # http://localhost:3000
npm run build                # build de producción
```

Sin las variables de Supabase, la app usa las marcas estáticas incluidas y
funciona igual.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable/anon key (segura para el cliente) |

## Estructura

```
src/
  app/                 rutas (una por pantalla) + layout + globals.css
  components/
    ui/                primitivas re-estiladas (Button, Badge, Card, …)
    chrome/            AppShell, Sidebar, Topbar, BrandSelector, CommandPalette
    domain/            BrandCard, BrandTile, Vortex, Studio/Calendar/Ideas, …
  lib/
    brands.ts          modelo + datos estáticos de las 6 marcas
    data.ts            generadores mock (outputs, assets, eventos, ideas, copys)
    brand-context.tsx  re-theming de marca en vivo
    queries.ts         getBrands() (Supabase + fallback)
    supabase/          cliente server
handoff/               diseño de referencia (specs + screenshots + tokens)
```

## Diseño

Los tokens exactos (color, tipografía, espaciado, radios, sombras, glow, motion)
están en `src/app/globals.css`, portados de `handoff/DESIGN-SYSTEM.md`. El acento
sangría (`--accent`) es global y fijo; cada marca aporta `--brand` / `--brand-2`
que re-contextualizan todo el contenido al cambiar de workspace.
