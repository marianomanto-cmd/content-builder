#!/bin/bash
# Watcher del handoff de "Claude Design".
# Sondea el repo cada ~25 min y EMITE UNA línea (y termina) cuando detecta:
#   1) cualquier archivo .zip en cualquier rama remota, o
#   2) cualquier cambio en refs remotos que NO sean la mía (rama nueva, o main
#      con commits nuevos) => posible handoff (zip o archivos sueltos).
# Diseñado para correr con Bash run_in_background: al salir, me re-invoca.
# Eficiente en créditos: mientras espera no usa el modelo, solo git fetch.
#
# Re-armar (p. ej. tras reinicio de sesión), idealmente vía run_in_background:
#   bash .claude/scripts/watch-for-handoff.sh

MYBRANCH="claude/confident-bell-bza3fl"
INTERVAL="${WATCH_INTERVAL:-1500}"   # segundos entre chequeos (25 min por defecto)
LOG="/tmp/handoff-watch.log"
cd "$(dirname "$0")/../.." || exit 1

snapshot() {
  git for-each-ref --format='%(refname) %(objectname)' refs/remotes/origin/ \
    | grep -v "origin/$MYBRANCH" | sort
}

echo "[$(date -u +%FT%TZ)] watcher armado (intervalo ${INTERVAL}s)" >> "$LOG"
git fetch --all --prune --tags --quiet 2>>"$LOG" || true
baseline="$(snapshot)"

while true; do
  ts=$(date -u +%FT%TZ)
  git fetch --all --prune --tags --quiet 2>>"$LOG" || true

  # 1) ¿Algún .zip en cualquier ref remoto? (señal más específica)
  for ref in $(git for-each-ref --format='%(refname)' refs/remotes/origin/); do
    hit=$(git ls-tree -r --name-only "$ref" 2>/dev/null | grep -iE '\.zip$' || true)
    if [ -n "$hit" ]; then
      echo "ZIP_DETECTED ($ts) en $ref :: $(echo "$hit" | tr '\n' ' ')"
      exit 0
    fi
  done

  # 2) ¿Cambió algún ref remoto que no sea el mío? (rama nueva o main con commits)
  current="$(snapshot)"
  if [ "$current" != "$baseline" ]; then
    echo "REPO_CHANGE ($ts): posible handoff. Cambios en refs:"
    diff <(printf '%s\n' "$baseline") <(printf '%s\n' "$current") | grep -E '^[<>]' || true
    exit 0
  fi

  echo "[$ts] sin novedades, sigo esperando" >> "$LOG"
  sleep "$INTERVAL"
done
