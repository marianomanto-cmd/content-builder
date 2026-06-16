# Content Builder — Spec de pantallas

Para cada pantalla: layout, contenido y **todos los estados**. Mirá la captura correspondiente y el prototipo navegable.

---

## 1. Layout global (en todas las pantallas)

**Grid:** `sidebar 248px | main 1fr`, `height:100vh`. En **mobile (<860px)**: sidebar oculta → **bottom tab bar** (Home · Assets · Studio[FAB central] · Outputs · Plan); el topbar simplifica (oculta search y categoría de marca).

**Sidebar** (gradiente `#0C0A13 → --bg`, borde derecho hairline):
- Logo: core incandescente (dot con `--glow-core`) + wordmark "CONTENT / BUILDER" en mono.
- Label "{Marca} · Workspace".
- Nav primario: Dashboard · Studio (badge "AI" sangría) · Biblioteca · Outputs · Calendario · Sistema de diseño.
- Abajo: Marcas · Settings · usuario (avatar + nombre + "6 marcas · Plan Studio").
- Item activo: fondo `--surface-2` + barra sangría 3px a la izquierda.

**Topbar** (sticky, glass blur):
- **Brand selector** (prominente, izquierda): tile con `--brand` + mono, nombre, categoría, chevron. Click → **dropdown** con las 6 marcas (cada una con su color), check en la activa, y "+ Nueva marca". Cambiar de marca **re-contextualiza toda la app**.
- **Command palette trigger**: input fake "Buscar o ejecutar acción…" + `⌘K`. Abre overlay cmdk.
- Derecha: pill "DRIVE OK" (dot `--positive`), campana con dot sangría, **botón Generar** (sangría + glow).

**Command palette (⌘K):** overlay glass, input con cursor parpadeante, secciones "Acciones de IA · {Marca}" (generar single image, animar a video, tirame ideas) y "Ir a" (Studio, Biblioteca, Calendario, cambiar de marca). Esc cierra. Implementar con **cmdk**.

---

## 2. Marcas (home) — `03-marcas`
- Header editorial: eyebrow "TUS MARCAS", h1 serif "6 marcas, un mismo *estudio*.", lead, botón "+ Nueva marca".
- **Grid 3 col** de brand cards: banda superior con gradiente `--brand-2 → --brand`, badge de categoría glass, monograma 54px que monta sobre la banda (margin-top negativo), nombre serif, fila de stats (Outputs / Assets / Pilares) + chevron. Marca activa lleva pill "ACTIVA". Hover: lift.
- Tile final punteado "Agregar marca".
- Click en card → abre esa marca en su Dashboard.

---

## 3. Dashboard de marca — `01-dashboard`
- Header: eyebrow "DASHBOARD · {Marca}", h1 "Buen día, Valentina.", lead "Hoy hay *movimiento* en {Marca}.", botones "Ver calendario" / "Abrir Studio".
- **Bento grid (12 col)**:
  - **Studio hero** (span 7 × 2 filas): vórtice animado de fondo + scrim, prompt de ejemplo en serif itálica, lead, CTA "Empezar a generar" + chip "NANO BANANA PRO · KLING 3.0".
  - **Stat callouts** (span 5): Outputs/mes (número serif grande) + tendencia `+24%` positiva | Programadas.
  - **Sistema de diseño** (span 5): swatches de la paleta de marca + muestra de 3 familias tipográficas. Click → Sistema de diseño.
  - **Biblioteca** (span 4): barras por pilar con conteo. Click → Biblioteca.
  - **Últimos outputs** (span 8): grid de 6 thumbnails con ratio + pilar + "hace X".
  - **Próximas publicaciones** (span 4): lista con fecha/hora, barra de color de red, título, estado; CTA "Tirame ideas".

---

## 4. Sistema de diseño (por marca) — `07-sistema-diseno`
Vista de **tokens editable** (botón "Editar"):
- **Paleta**: 5 swatches (Ink, Primario, Acento, Tint, Paper) con hex.
- **Escala tipográfica**: Display / Título / Cuerpo / Label con specs (familia · tamaño · tracking).
- **Logos**: lockup sobre fondo oscuro y sobre paper.
- **Voz / tono**: dos columnas "Hacé" (checks verdes) / "Evitá" (cruces sangría).

---

## 5. Biblioteca de assets — `04-biblioteca` · mobile `03-biblioteca`
- Header: "Assets por *pilar*", pill "DRIVE SINCRONIZADO · hace 4 min" (check positivo), botón "Subir".
- **Filtros por pilar** (chips con conteo, "Todos" + pilares de la marca). Toggle vista grid/lista.
- **Grid**: primera celda = **drop zone** punteada ("Arrastrá tus archivos / o pegá un link de Drive · se categorizan por pilar"). Resto = tiles `--brand` con badge de pilar, ratio, ícono play si es video, badge de alerta si NO está sincronizado. `cursor:grab` (drag&drop con **dnd-kit**).
- Mobile: tiles a 2 columnas.

---

## 6. Studio de generación (HERO) — `02-studio`, `02b-studio-resultados` · mobile `02-studio`
Pantalla central del producto. **3 estados** en el área bajo el composer:

**Composer (siempre visible):**
- Título "¿Qué creamos hoy para *{Marca}*?".
- Caja de prompt grande (radio xl, doble borde) con texto + cursor parpadeante.
- Controles: segmented **Single / Carrusel / Video**, select de **pilar**, stepper **Propuestas** (1·2·3·4·6 — cantidad configurable), botón **Generar**.
- Sub-controles de **Video** (si type=Video): "Animar imagen", toggles **Voiceover** y **Música** (Kling 3.0).
- Fila de **Formato/red** (Feed 4:5 · Cuadrado · Story 9:16 · Horizontal).

**Estado IDLE:** chips de sugerencias ("3 single image para Producto…", etc.) + dos placas glass ("Usa tus N assets" / "Respeta el sistema de diseño").

**Estado GENERANDO (premium):** placa con **vórtice** animado denso + scrim radial, eyebrow "GENERANDO · NANO BANANA PRO", título serif itálica "Convergiendo N propuestas…", pasos con check/spinner ("Assets cargados", "Componiendo imagen", "Generando copy"). ~2.6s.

**Estado DONE:** header "N imágenes · N copys" + "Regenerar todo" / "Guardar todo". Grid de dos columnas:
- **Imágenes** (2 col): tiles `--brand` con badge formato + overlay de acciones en hover (**Variar**, **Guardar**).
- **Copys**: cards con número, acciones (variar/copiar), **hook** en serif, body, hashtags en `--brand`, CTA en sangría.
Reveal escalonado (stagger). Usar **Embla** para carruseles si se ven muchas propuestas.

---

## 7. Outputs — `05-outputs`
Galería **cronológica** por marca. Filtros (Todos/Imagen/Carrusel/Video + Red). Agrupado por **Hoy / Ayer / Esta semana** (cada grupo con separador). Tiles `--brand` con: dot de red arriba-izq, ícono play si video, badge ratio. Pilar + tipo debajo.

---

## 8. Calendario — `06-calendario`, `06b-calendario-ideas` · mobile `04-calendario`
- Header: "Junio 2026", flechas prev/next, segmented **Mes / Semana**, botón **Tirame ideas** (sangría).
- **Leyenda de estados**: Programado (sangría) · Borrador (oro) · Idea (faint) · Publicado (positivo).
- **Vista mes**: grid 7×5, día con número (HOY resaltado sangría), eventos como chips con borde-izq color de red + dot de estado. **Drag&drop** de piezas entre días (dnd-kit). En mobile: scroll horizontal (`min-width:660px`).
- **Vista semana**: 7 columnas con eventos detallados (hora + título).
- **Panel "Tirame ideas"** (drawer lateral, **vaul**): "5 ideas para *{Marca}*", cards con pilar·red, hook serif, día sugerido, botón "Agregar". CTA "Crear todo en Studio". Las ideas se basan en lo que se viene creando + huecos del mes.

---

## 9. Settings — `08-settings`
Mínimo: 
- **Google Drive**: estado conectado (dot positivo, "sync cada 5 min · N archivos"), botón Desconectar.
- **Generación**: propuestas por defecto (segmented 1·2·3·4·6), formato por red (IG 4:5 / TikTok 9:16 / YouTube 16:9), motor de video (Kling 3.0).
- **Video por defecto**: toggles Voiceover automático / Música de fondo.

---

## Estados transversales a implementar
- **Vacío** (con personalidad): p.ej. una marca sin outputs → ilustración con el core/vórtice + CTA al Studio. Una biblioteca vacía → drop zone protagonista.
- **Loading / skeleton**: shimmer en tiles y listas mientras carga.
- **Generación en progreso**: ver Studio (estado premium con vórtice).
- **Error**: placa con borde sangría, mensaje claro, acción "Reintentar".
- **Success**: toast (**sonner**) "Guardado en Outputs" / "Programado para Mié 17".
