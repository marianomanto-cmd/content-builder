#!/bin/bash
# SessionStart hook — auto-resume + (cuando exista proyecto) instalar dependencias.
# Se ejecuta al iniciar/resumir/limpiar/compactar una sesión de Claude Code.
# Objetivo: que una sesión nueva o reanudada retome el trabajo sin perder contexto.
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR"

# --- 1. Instalar dependencias en sesiones remotas (web), de forma idempotente. ---
#     Los logs van a stderr para mantener stdout limpio (stdout = contexto inyectado).
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  {
    if [ -f package.json ] && command -v npm >/dev/null 2>&1; then
      npm install
    fi
    # A medida que crezca el proyecto, agregar acá otros ecosistemas:
    # [ -f requirements.txt ] && pip install -r requirements.txt
    # [ -f go.mod ] && go mod download
  } 1>&2 || true
fi

# --- 2. Inyectar contexto de resume en stdout (Claude lo suma al contexto). ---
echo "=== AUTO-RESUME CHECK ==="
echo "Si una sesión previa se interrumpió (sin créditos / contenedor reciclado),"
echo "leé PROGRESS.md (abajo) y CONTINUÁ desde la sección 'Próximos pasos'."
echo "Hacé commit + push después de cada paso con sentido. No dejes nada sin pushear."
echo ""
if [ -f PROGRESS.md ]; then
  echo "--- PROGRESS.md ---"
  cat PROGRESS.md
else
  echo "(No hay PROGRESS.md todavía — creá uno al empezar a trabajar.)"
fi
