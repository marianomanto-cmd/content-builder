# PROGRESS — Diario de build autónomo (overnight)

> **Propósito:** única fuente de verdad para un build autónomo durante la noche.
> Si una sesión se interrumpe (sin créditos, contenedor reciclado, timeout), la
> siguiente sesión lee este archivo —lo inyecta el hook de `SessionStart`— y
> continúa desde **Próximos pasos**.
> **Regla de oro:** commit + push después de CADA paso con sentido. Nada sin pushear.

**Última actualización:** 2026-06-16 ~04:40 UTC
**Branch de trabajo:** `claude/confident-bell-bza3fl`
**Estado:** 🟢 Handoff recibido y procesado. Construyendo la app. Base + chrome + pantalla Marcas listas y compilando.

---

## 🎯 Misión
Construir **Content Builder**: app web interna, dark-first (estilo Linear/Vercel/Raycast),
para un marketer que maneja varias marcas y genera anuncios de imagen/video con IA.
El handoff de diseño (de "Claude Design") llegó por **upload** (no por el repo) y está
vendoreado en `handoff/` (README, DESIGN-SYSTEM, COMPONENTS, SCREENS, screenshots, source).

Replicar **1:1** las 9 pantallas y el sistema de diseño. Luego wirear Supabase y deployar a Vercel.

## 🧱 Stack (elegido según el handoff)
- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** (scaffold con create-next-app).
- Tokens del handoff portados a `src/app/globals.css` (`@theme` + CSS vars). Fonts: Newsreader (serif),
  Geist (sans), JetBrains Mono (mono) vía `next/font`.
- Libs instaladas: `lucide-react`, `motion`, `cmdk`, `sonner`, `vaul`, radix (dropdown/dialog/tooltip/switch/slot/tabs/popover),
  `@dnd-kit/*`, `embla-carousel-react`, `clsx`, `tailwind-merge`.

## 🔐 Recursos PERMITIDOS (SOLO estos — NO tocar ningún otro proyecto)
| Servicio | Target ÚNICO permitido |
|---|---|
| GitHub | repo `marianomanto-cmd/content-builder` |
| Supabase | proyecto **content-builder** → ref `efmnnlnyixmdkljhxrjc` (sa-east-1) · `https://efmnnlnyixmdkljhxrjc.supabase.co` |
| Vercel | proyecto **content-builder** → `prj_mIOKWHCq2oXZNfVWZ2PYx3BUxD7V` · team `team_wPvtUeEdI9uUYHfBvDKF5Vbv` (`marianomanto-cmds-projects`) |

> 🚨 PROHIBIDO tocar cualquier otro proyecto (Plasmart*, TransFil*, Marian Task Manager, etc.). Ante la duda, no actuar.

## 🛡️ Reglas de seguridad
- Nada destructivo (no force-push, no borrar ramas/historia, no DROP en DB).
- Secretos (service_role, etc.) fuera de git → env de Vercel / `.env` gitignored. Refs/URLs/IDs públicos sí.
- Contenedor cloud efímero y aislado.

## ✅ Hecho
- [x] Auto-resume: `PROGRESS.md` + hook `SessionStart`.
- [x] Verificado acceso Supabase + Vercel (proyectos content-builder).
- [x] Handoff recibido (ZIP por upload), inspeccionado (seguro, sin scripts), vendoreado en `handoff/`.
- [x] Scaffold Next.js 16 + Tailwind v4 + TS; deps del stack instaladas.
- [x] **Design system** portado a `globals.css` (colores, tipografía, espaciado, radios, sombras, glow, glass, motion, breakpoint nav 860px).
- [x] **Datos**: `lib/brands.ts` (6 marcas), `lib/data.ts` (outputs/assets/eventos/ideas/copys), `lib/brand-context.tsx` (re-theming en vivo).
- [x] **Primitivas**: Button, Badge, Card, SegmentedControl, Switch, Skeleton, Eyebrow.
- [x] **Chrome**: AppShell, Sidebar (nav + barra sangría), Topbar (brand selector, ⌘K, Drive, campana, Generar), BrandSelector (dropdown), CommandPalette (cmdk), MobileTabBar, PageHeader, Logo.
- [x] **Pantalla Marcas** (home) con BrandCard. Stubs para las otras 7.
- [x] `next build` pasa limpio (12 rutas).

## 🚧 En progreso
- [ ] Pantallas reales: Dashboard, Studio, Biblioteca, Outputs, Calendario, Sistema de diseño, Settings.

## ⏭️ Próximos pasos
1. **Deploy temprano a Vercel** (validar pipeline + URL viva).
2. Construir **Dashboard** (bento grid + stat callouts + charts + vórtice).
3. Construir **Studio** (composer + estados idle/generando/done + Vortex + propuestas).
4. **Biblioteca** (chips de pilar + dropzone + tiles drag&drop).
5. **Outputs** (galería cronológica), **Calendario** (mes/semana + drawer ideas vaul), **Sistema de diseño** (tokens), **Settings**.
6. Estados transversales (vacío/loading/error), a11y, reduced-motion.
7. Wirear **Supabase** (schema + seed) y env en Vercel. Redeploy.
8. Commit + push tras cada paso.

## 🔁 Cómo retomar (próxima sesión)
1. `git pull origin claude/confident-bell-bza3fl`.
2. `npm install` si `node_modules` no está (no se commitea).
3. Leer este archivo. Mirar `handoff/SCREENS.md` + screenshots para la pantalla en curso.
4. Continuar desde **Próximos pasos**. `npm run build` antes de pushear. Commit + push siempre.

## 📓 Bitácora (lo más reciente arriba)
- **2026-06-16 ~04:40 UTC** — Handoff procesado. Scaffold + design system + chrome + pantalla Marcas. Build limpio. A deployar.
- **2026-06-16 ~02:00 UTC** — Watcher armado esperando handoff (luego llegó por upload).
- **2026-06-16 ~01:56 UTC** — Identificados recursos content-builder. Reglas de no tocar otros proyectos.
