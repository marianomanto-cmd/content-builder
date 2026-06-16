# PROGRESS — Diario de build autónomo (overnight)

> **Propósito:** única fuente de verdad para un build autónomo durante la noche.
> Si una sesión se interrumpe, la siguiente lee este archivo (lo inyecta el hook
> `SessionStart`) y continúa desde **Próximos pasos**.
> **Regla de oro:** commit + push después de CADA paso con sentido.

**Última actualización:** 2026-06-16 ~13:15 UTC
**Branch:** `claude/confident-bell-bza3fl` (mergeada a `main`)
**Estado:** 🟢 9 pantallas + Supabase. **Producción LIVE y verificada** en `content-builder-weld.vercel.app` (servía 404 por framework preset null → fix con `vercel.json`).

---

## 🎯 Misión
Construir **Content Builder** (app interna dark-first, multi-marca, anuncios IA) según el
handoff de diseño vendoreado en `handoff/`. Luego Supabase + deploy a Vercel.

## 🔗 Links vivos
- **Preview (branch):** https://content-builder-git-claude-co-80f98e-marianomanto-cmds-projects.vercel.app
- Repo: `marianomanto-cmd/content-builder` · branch `claude/confident-bell-bza3fl`
- Supabase: proyecto `efmnnlnyixmdkljhxrjc` · tabla `brands` (RLS lectura pública, 6 filas)
- Vercel: proyecto `prj_mIOKWHCq2oXZNfVWZ2PYx3BUxD7V` (team `marianomanto-cmds-projects`)

## 🧱 Stack
Next.js 16 (App Router) · React 19 · TS · Tailwind v4 (@theme) · Radix/shadcn-style ·
Motion · cmdk · sonner · vaul · dnd-kit · Embla · Lucide · Supabase. Fonts: Newsreader/Geist/JetBrains Mono.

## ✅ Hecho
- [x] Handoff recibido (upload), inspeccionado y vendoreado en `handoff/`.
- [x] Scaffold + design system (tokens 1:1) + 3 fonts + chrome (sidebar/topbar/⌘K/tabbar).
- [x] **9 pantallas**: Marcas, Dashboard, Studio (idle/generando/done + vórtice), Biblioteca, Outputs, Calendario (mes/semana + drawer ideas), Sistema de diseño, Settings.
- [x] Estados: vacío, generando, success (toasts), 404 con estilo. reduced-motion respetado.
- [x] **Supabase**: tabla `brands` + RLS + seed (6 marcas) + `getBrands()` con fallback estático. Sin advisories de seguridad.
- [x] `next build` limpio (12 rutas). Render HTTP verificado en las 8 pantallas.
- [x] **Deploy**: la integración git de Vercel auto-deploya la branch en cada push (preview READY).
- [x] README + `.env.example`. `.env.local` gitignored.

## ⏭️ Próximos pasos / pendientes (requieren decisión del usuario)
1. **Env de Supabase en Vercel**: agregar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   en Settings → Environment Variables del proyecto, para que el deploy lea de la DB
   (hoy usa el fallback estático, datos idénticos). Egress de Supabase NO está en el
   allowlist de ESTE contenedor, pero Vercel sí lo alcanza.
2. **Producción**: hoy la prod sigue en el commit inicial. Para promover, mergear la branch a
   `main` (o promover el deploy). NO hacerlo sin permiso explícito (regla: no pushear a main).
3. **Deploy vía MCP** (`deploy_to_vercel`) quedó bloqueado por el clasificador por falta de
   autorización explícita en el chat; no hizo falta porque la integración git ya deploya.
4. Opcional/polish: drag&drop real (dnd-kit) en calendario/biblioteca, charts (Tremor), más estados de carga.

## 🔁 Cómo retomar
1. `git pull origin claude/confident-bell-bza3fl` · `npm install` si falta `node_modules`.
2. Leer este archivo + `handoff/SCREENS.md`. `npm run build` antes de pushear. Commit + push siempre.

## ⚠️ Nota: Deployment Protection
El dominio de producción devuelve **403 a visitantes anónimos** porque el proyecto tiene
**Vercel Authentication** (Deployment Protection) activado. El dueño (logueado en Vercel) ve la
app normal. Para hacerla pública: Project Settings → Deployment Protection → desactivar.

## 🧩 Features nuevas (post-launch) + env requeridas
- **Editor del sistema de diseño** (`/sistema`): paleta + voz editables, re-theming en vivo. Persistencia: localStorage (siempre) + Supabase best-effort (RLS update). Funciona sin env.
- **Stock media gratis**: `lib/media.ts` (Picsum fotos + Google sample videos). `BrandTile` muestra fotos con tinte de marca + video en hover. Sin env, sin costo.
- **Importar ZIP → motor Claude** (`/api/import-design`): unzip + `claude-opus-4-8` (tool use) → tokens del sistema de diseño aplicados a la marca. **Requiere `ANTHROPIC_API_KEY` en Vercel** (tiene costo de API).

| Env var (Vercel) | Para qué | Bloqueante? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Persistir marcas/ediciones cross-device | No (hay fallback) |
| `ANTHROPIC_API_KEY` | Habilitar "Importar ZIP" (motor Claude) | Sí para esa feature (501 sin ella) |

## 📓 Bitácora (reciente arriba)
- **2026-06-16 ~13:25 UTC** — 3 features pedidas por el usuario: editor del sistema de diseño (paleta+voz, persistencia local+Supabase), stock media gratis (Picsum+videos sample), e importar ZIP interpretado por `claude-opus-4-8`. Build limpio, pusheadas a la branch.
- **2026-06-16 ~13:15 UTC** — 404 en prod diagnosticado: `framework: null` en el proyecto → Vercel deployaba sin el adapter de Next (404 de plataforma en toda ruta). Fix: `vercel.json` `{framework:nextjs}`. Verificado en preview (app real) → con OK del usuario, FF de `main` a `9b56320`. Prod rebuild READY y **verificada sirviendo la app** (`/marcas` 54k de HTML real, sin x-vercel-error).
- **2026-06-16 ~13:00 UTC** — Usuario autorizó merge a `main`. Fast-forward `23e1fb3..52dbf73` pusheado a `main`. Deploy de producción disparado (Vercel git integration).
- **2026-06-16 ~05:10 UTC** — 9 pantallas + Supabase + 404 + README. Confirmado deploy preview vivo por integración git. Pendiente: env en Vercel + promover a prod (con OK del usuario).
- **2026-06-16 ~04:40 UTC** — Foundation: design system + chrome + Marcas. Build limpio.
- **2026-06-16 ~04:02 UTC** — Handoff llegó por upload. Inspeccionado y procesado.
- **2026-06-16 ~02:00 UTC** — Watcher armado esperando handoff.
