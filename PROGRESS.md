# PROGRESS — Diario de resume (build autónomo)

> **Propósito:** única fuente de verdad para un build autónomo de varias horas.
> Si una sesión se interrumpe (sin créditos, contenedor reciclado, timeout),
> la siguiente sesión lee este archivo —lo inyecta automáticamente el hook de
> `SessionStart`— y continúa desde **Próximos pasos**.
> **Regla de oro:** commit + push después de CADA paso con sentido. Nada sin pushear.

**Última actualización:** 2026-06-16 01:41 UTC
**Branch:** `claude/confident-bell-bza3fl`
**Estado:** ⏳ Esperando las instrucciones del proyecto que enviará el usuario.

---

## 🎯 Objetivo
_Pendiente: el usuario dijo "te voy a pasar instrucciones". Completar acá cuando lleguen._

## 🧱 Stack / decisiones
_TBD — definir al recibir instrucciones._

## ✅ Hecho
- [x] Montar el proceso de auto-resume (`PROGRESS.md` + hook `SessionStart` + disciplina de commit/push).

## 🚧 En progreso
- [ ] (nada todavía)

## ⏭️ Próximos pasos
1. Leer las instrucciones del proyecto cuando el usuario las envíe.
2. Completar **Objetivo** y **Stack** acá arriba.
3. Scaffold inicial del proyecto.
4. Arrancar el loop de build (implementar → validar → commit/push → actualizar este archivo).

## 🔁 Cómo retomar (para la próxima sesión / mi yo futuro)
1. `git pull origin claude/confident-bell-bza3fl` para traer lo último.
2. Leer este archivo completo.
3. Continuar desde **Próximos pasos**: hacer el siguiente ítem sin tildar.
4. Tras cada paso: actualizar este archivo y `git add -A && git commit -m "..." && git push`.
5. Nunca dejar trabajo sin commitear — el contenedor es efímero.

## 📓 Bitácora (lo más reciente arriba)
- **2026-06-16 01:41 UTC** — Repo vacío (solo README). Configurado el proceso de resume. A la espera de instrucciones del proyecto.
