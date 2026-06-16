#!/bin/bash
# SessionStart hook — Auto-resume + (cuando exista) instalación de dependencias.
# Se ejecuta al iniciar / reanudar / limpiar / compactar una sesión.
# Objetivo: que una sesión nueva retome exactamente donde quedó la anterior.
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR"

# --- 1. Instalar dependencias en sesiones remotas (web). Idempotente. ---
#     Logs a stderr para no contaminar el contexto (stdout) con ruido de install.
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  {
    if [ -f package.json ] && command -v npm >/dev/null 2>&1; then
      npm install
    fi
    # (Se agregarán otros ecosistemas acá a medida que crezca el proyecto.)
  } 1>&2 || true
fi

# --- 2. Inyectar contexto de auto-resume (stdout se agrega al contexto). ---
echo "=== AUTO-RESUME CHECK ==="
echo "Si una sesión previa se interrumpió (sin créditos, contenedor reciclado, timeout),"
echo "leé PROGRESS.md (abajo) y CONTINUÁ desde la sección 'Próximos pasos'."
echo "Regla de oro: commit + push después de cada paso con sentido."
echo ""
if [ -f PROGRESS.md ]; then
  echo "--- PROGRESS.md ---"
  cat PROGRESS.md
else
  echo "(No hay PROGRESS.md todavía — creá uno cuando arranque el trabajo.)"
fi
