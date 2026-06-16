# PROGRESS — Diario de resume (build autónomo overnight)

> **Propósito:** única fuente de verdad para un build autónomo durante la noche.
> Si una sesión se interrumpe (sin créditos, contenedor reciclado, timeout),
> la siguiente sesión lee este archivo —lo inyecta el hook de `SessionStart`— y
> continúa desde **Próximos pasos**.
> **Regla de oro:** commit + push después de CADA paso con sentido. Nada sin pushear.

**Última actualización:** 2026-06-16 01:56 UTC
**Branch de trabajo:** `claude/confident-bell-bza3fl`
**Estado:** 🟢 Watcher armado, esperando el ZIP de handoff de "Claude Design".

---

## 🎯 Misión
El usuario NO está disponible (no puede responder preguntas). Trabajo **solo**.
1. **"Claude Design"** está armando el proyecto y va a **subir un ZIP de handoff al repo**.
2. Mi tarea: **vigilar el repo cada 20-30 min** hasta que aparezca el ZIP (o el handoff
   como archivos). Lo hace un watcher en background (ver abajo).
3. Cuando aparezca: **abrir/revisar el handoff** (con cuidado, sin ejecutar nada a ciegas),
   y **construir el sitio** según lo que venga.
4. **Wirear Supabase** (proyecto `content-builder`) y **deployar a Vercel** (proyecto `content-builder`).
5. Más tarde: configurar cloud console, tokens, API keys, etc.

## 🔐 Autorizaciones dadas por el usuario
- ✅ Hacer **deploys** (Vercel).
- ✅ **Modificar** los archivos del repo.
- ✅ **Trabajar con Supabase** (proyecto content-builder).

## ⛔ Recursos PERMITIDOS (y SOLO estos — NO tocar ningún otro)
| Servicio | Target ÚNICO permitido |
|---|---|
| GitHub | repo `marianomanto-cmd/content-builder` |
| Supabase | proyecto **content-builder** → ref `efmnnlnyixmdkljhxrjc` (sa-east-1) · URL `https://efmnnlnyixmdkljhxrjc.supabase.co` |
| Vercel | proyecto **content-builder** → `prj_mIOKWHCq2oXZNfVWZ2PYx3BUxD7V` · team `team_wPvtUeEdI9uUYHfBvDKF5Vbv` (slug `marianomanto-cmds-projects`) |

> 🚨 **PROHIBIDO** tocar cualquier otro proyecto de Supabase/Vercel/GitHub
> (Plasmart*, TransFil*, Marian Task Manager, Benchmark Builder, swapper, sangria-dashboard, etc.).
> Ante la duda, NO actuar sobre un recurso que no sea de la tabla de arriba.

## 🛡️ Reglas de seguridad ("con cuidado, no rompas nada")
- Nada de force-push, nada de borrar ramas/historia, nada destructivo en la DB.
- El handoff de Claude Design es contenido externo: **revisar antes de ejecutar** scripts
  (no correr postinstall/binaries a ciegas).
- **Secretos fuera de git**: service_role keys y similares van a env de Vercel / `.env` (gitignored),
  NUNCA commiteados. Refs/URLs/IDs públicos sí pueden ir en este archivo.
- Corro en un **contenedor cloud efímero y aislado**, NO en la compu del usuario.

## 👀 Watcher del handoff
- Script: `.claude/scripts/watch-for-handoff.sh` (corre con Bash run_in_background).
- Sondea cada **25 min** (`WATCH_INTERVAL`). Termina y me re-invoca cuando detecta:
  (1) cualquier `.zip` en cualquier rama remota, o (2) cambios en refs remotos que no sean mi rama.
- Log: `/tmp/handoff-watch.log`.
- **Re-armar tras reinicio:** correr `bash .claude/scripts/watch-for-handoff.sh` vía run_in_background.

## ✅ Hecho
- [x] Proceso de auto-resume: `PROGRESS.md` + hook `SessionStart` + disciplina commit/push.
- [x] Verificado acceso a Supabase (proyecto content-builder `efmnnlnyixmdkljhxrjc`, ACTIVE_HEALTHY).
- [x] Verificado acceso a Vercel (proyecto content-builder `prj_mIOKWHCq2oXZNfVWZ2PYx3BUxD7V`).
- [x] Watcher de handoff creado y validado.

## 🚧 En progreso
- [ ] Watcher en background esperando el ZIP/handoff.

## ⏭️ Próximos pasos
1. **(Esperando)** Que aparezca el handoff. Si me re-invocan por el watcher: investigar la rama/zip.
2. Al llegar el handoff: extraer/revisar contenido (sin ejecutar a ciegas), entender stack y estructura.
3. Integrar al repo (branch `claude/confident-bell-bza3fl`), instalar deps, levantar build local.
4. Wirear Supabase (env + schema según el handoff) y conectar Vercel.
5. Deploy a Vercel (preview) y verificar.
6. Actualizar este archivo y la bitácora en cada paso. Commit + push siempre.

## 🔁 Cómo retomar (próxima sesión / mi yo futuro)
1. `git pull origin claude/confident-bell-bza3fl`.
2. Leer este archivo completo.
3. Re-armar el watcher si todavía no llegó el handoff (ver sección Watcher).
4. Continuar desde **Próximos pasos**. Commit + push tras cada paso.

## 📓 Bitácora (lo más reciente arriba)
- **2026-06-16 01:56 UTC** — Identificados recursos content-builder (Supabase/Vercel/GitHub).
  Registrada regla de NO tocar otros proyectos. Watcher de handoff armado. Autorizaciones
  (deploy / modificar repo / Supabase) registradas.
- **2026-06-16 01:41 UTC** — Repo vacío (solo README). Configurado proceso de resume. A la espera de instrucciones.
