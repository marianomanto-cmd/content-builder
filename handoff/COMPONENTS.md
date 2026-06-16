# Content Builder — Inventario de componentes reutilizables

Construir una **librería** (shadcn customizado + componentes propios) con estos elementos. Todos dark-first, tokens de `DESIGN-SYSTEM.md`.

## Primitivas (shadcn re-estilado)
| Componente | Notas |
|---|---|
| `Button` | variantes: `primary` (pill sangría + glow), `outline` (border-strong), `ghost` (glass). tamaños sm/md/lg. Texto mono UPPERCASE 0.06em. |
| `Badge` / `Chip` | pill mono UPPERCASE. tonos: default, accent, data (oro), glass, solid. opcional con conteo. |
| `SegmentedControl` | track surface-3, pill activo surface + sh-1. |
| `Switch` | off surface-3 / on sangría, knob accent-ink. |
| `Card` | surface + border + r-lg, hover lift (translateY -3px + sh-3). |
| `Input` / `Textarea` | bg bg/surface-3, focus border-accent. |
| `Tooltip`, `DropdownMenu`, `Dialog`, `Drawer`(vaul), `Tabs`, `Select` | base Radix, re-estilados. |
| `Eyebrow` | mono UPPERCASE 0.2em + dot sangría. |
| `Skeleton` | shimmer 1.4s. |
| `Toast` | sonner, estilo glass. |

## Layout / chrome
| Componente | Dónde |
|---|---|
| `AppShell` | grid sidebar+main, responsive → bottom tabbar en mobile. |
| `Sidebar` + `NavItem` | item activo con barra sangría. |
| `Topbar` | sticky glass. |
| `BrandSelector` + `BrandMenu` | dropdown de marcas; re-contextualiza la app. |
| `CommandPalette` | cmdk overlay, secciones AI + navegación. |
| `MobileTabBar` | 5 items con FAB central (Studio). |

## Dominio
| Componente | Dónde |
|---|---|
| `BrandCard` | Marcas home. banda gradiente + monograma + stats. |
| `BentoTile` | Dashboard. variantes hero/stat/snapshot. |
| `StatCallout` | número serif + tendencia. |
| `PillarBar` | barra por pilar con conteo (gradiente brand). |
| `AssetTile` | tile brand, badge pilar/ratio, video/sync flags, draggable (dnd-kit). |
| `DropZone` | subida drag&drop. |
| `PromptComposer` | caja prompt + controles + sub-controles video. |
| `ProposalImage` | tile resultado con overlay Variar/Guardar. |
| `ProposalCopy` | card hook serif + body + tags + CTA. |
| `GeneratingState` | placa vórtice + pasos. |
| `OutputTile` + `OutputGroup` | galería cronológica. |
| `CalendarMonth` / `CalendarWeek` | grid + eventos draggables. |
| `EventChip` | borde-izq red + dot estado. |
| `IdeasPanel` | drawer de ideas IA (vaul). |
| `TokenPalette` / `TypeScale` / `VoiceList` | Sistema de diseño. |
| `Vortex` | canvas animado del motivo (señales → core). Base en `source/_ds/phatia/assets/vortex.js` (port a React/Magic UI). Honra reduced-motion. |

## Charts (dashboard)
Tremor o shadcn charts, tinteados con `--brand` (series cliente) y monocromo para comparativas. Oro (`--viz`) solo para barras/stats.

## Notas de implementación
- **Theming de marca**: exponé `--brand` / `--brand-2` en un provider; cambialos al switchear marca. El acento sangría de la app es global y fijo.
- **Motion**: envolvé reveals con `motion` y `--ease-converge`. Stagger en grids de propuestas.
- **a11y**: foco visible (border-accent), targets ≥44px en mobile, Radix/React-Aria para menús, contraste AA sobre near-black. Soportá `prefers-reduced-motion` (cortar vórtice/aurora).
- **Responsive**: breakpoint ~860px. Bento → 1 col, grids → 2 col, calendario → scroll-x, sidebar → tabbar.
