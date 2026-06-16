/* ============================================================
 * Mock content — deterministic per brand so the demo is stable.
 * Stands in for what would come from Supabase + the generation engine.
 * ========================================================== */

import {
  type Brand,
  type OutputKind,
  type Platform,
  type Ratio,
} from "./brands";
import { seeded } from "./utils";

const PLATFORMS: Platform[] = ["instagram", "tiktok", "youtube", "x"];
const RATIOS: Ratio[] = ["4:5", "1:1", "9:16", "16:9"];

export type EventStatus = "scheduled" | "draft" | "idea" | "published";

export const STATUS_META: Record<
  EventStatus,
  { label: string; varName: string }
> = {
  scheduled: { label: "Programado", varName: "var(--accent)" },
  draft: { label: "Borrador", varName: "var(--viz)" },
  idea: { label: "Idea", varName: "var(--text-faint)" },
  published: { label: "Publicado", varName: "var(--positive)" },
};

// ---------- Outputs (chronological gallery) ----------
export interface OutputItem {
  id: string;
  kind: OutputKind;
  ratio: Ratio;
  pillar: string;
  platform: Platform;
  group: "hoy" | "ayer" | "semana";
  label: string;
}

const KIND_LABEL: Record<OutputKind, string> = {
  image: "Single image",
  carousel: "Carrusel",
  video: "Video",
};

function ratioForKind(kind: OutputKind, seed: string): Ratio {
  if (kind === "video") return seeded(seed) > 0.5 ? "9:16" : "16:9";
  return seeded(seed) > 0.5 ? "4:5" : "1:1";
}

export function getOutputs(brand: Brand): OutputItem[] {
  const groups: OutputItem["group"][] = ["hoy", "ayer", "semana"];
  const perGroup = [4, 5, 6];
  const items: OutputItem[] = [];
  groups.forEach((group, gi) => {
    for (let i = 0; i < perGroup[gi]; i++) {
      const seed = `${brand.id}-out-${group}-${i}`;
      const r = seeded(seed);
      const kind: OutputKind = r > 0.78 ? "video" : r > 0.5 ? "carousel" : "image";
      const pillar = brand.pillars[Math.floor(seeded(seed + "p") * brand.pillars.length)];
      items.push({
        id: seed,
        kind,
        ratio: ratioForKind(kind, seed + "r"),
        pillar: pillar.name,
        platform: PLATFORMS[Math.floor(seeded(seed + "pf") * PLATFORMS.length)],
        group,
        label:
          KIND_LABEL[kind] +
          (kind === "carousel" ? ` · ${3 + Math.floor(seeded(seed + "n") * 4)}` : "") +
          (kind === "video" ? ` · ${6 + Math.floor(seeded(seed + "s") * 12)}s` : ""),
      });
    }
  });
  return items;
}

export const OUTPUT_GROUP_LABEL: Record<OutputItem["group"], { title: string; date: string }> = {
  hoy: { title: "Hoy", date: "15 jun" },
  ayer: { title: "Ayer", date: "14 jun" },
  semana: { title: "Esta semana", date: "9–13 jun" },
};

// ---------- Assets (library) ----------
export interface AssetItem {
  id: string;
  name: string;
  pillar: string;
  ratio: Ratio;
  isVideo: boolean;
  synced: boolean;
}

const ASSET_NOUNS = [
  "hero", "textura", "modelo", "flatlay", "detalle", "lifestyle", "packshot",
  "behind", "closeup", "ambiente", "grid", "retrato",
];

export function getAssets(brand: Brand): AssetItem[] {
  const items: AssetItem[] = [];
  let n = 0;
  brand.pillars.forEach((pillar) => {
    for (let i = 0; i < pillar.count; i++) {
      const seed = `${brand.id}-asset-${pillar.id}-${i}`;
      const noun = ASSET_NOUNS[Math.floor(seeded(seed) * ASSET_NOUNS.length)];
      const isVideo = seeded(seed + "v") > 0.78;
      items.push({
        id: seed,
        name: `${noun}-${String(n + 1).padStart(2, "0")}`,
        pillar: pillar.name,
        ratio: isVideo
          ? seeded(seed + "r") > 0.5 ? "9:16" : "16:9"
          : seeded(seed + "r") > 0.5 ? "4:5" : "1:1",
        isVideo,
        synced: seeded(seed + "s") > 0.12,
      });
      n++;
    }
  });
  return items;
}

// ---------- Calendar events ----------
export interface CalendarEvent {
  id: string;
  day: number; // day of month
  title: string;
  platform: Platform;
  status: EventStatus;
  time: string;
}

const TITLE_TEMPLATES = [
  "Reel — {p}",
  "Carrusel 3 mitos",
  "Hook {p}",
  "Short antes/después",
  "{p} en 15s",
  "UGC cliente",
  "Tip educativo",
  "Promo flash",
  "Detrás de escena",
  "Carrusel noche",
  "{p} destacado",
  "Pregunta a la comunidad",
];

export function getEvents(brand: Brand, _year: number, _month: number): CalendarEvent[] {
  // Fixed-ish layout across the month, themed by brand pillars
  const slots: { day: number; status: EventStatus }[] = [
    { day: 3, status: "scheduled" },
    { day: 5, status: "draft" },
    { day: 9, status: "scheduled" },
    { day: 9, status: "draft" },
    { day: 12, status: "published" },
    { day: 15, status: "scheduled" },
    { day: 17, status: "scheduled" },
    { day: 19, status: "draft" },
    { day: 21, status: "idea" },
    { day: 23, status: "scheduled" },
    { day: 26, status: "published" },
    { day: 28, status: "draft" },
  ];
  return slots.map((slot, i) => {
    const seed = `${brand.id}-ev-${slot.day}-${i}`;
    const pillar = brand.pillars[Math.floor(seeded(seed + "p") * brand.pillars.length)];
    const tpl = TITLE_TEMPLATES[Math.floor(seeded(seed + "t") * TITLE_TEMPLATES.length)];
    const hour = 9 + Math.floor(seeded(seed + "h") * 11);
    return {
      id: seed,
      day: slot.day,
      title: tpl.replace("{p}", pillar.name.toLowerCase()),
      platform: PLATFORMS[Math.floor(seeded(seed + "pf") * PLATFORMS.length)],
      status: slot.status,
      time: `${String(hour).padStart(2, "0")}:00`,
    };
  });
}

// ---------- AI ideas (drawer) ----------
export interface IdeaItem {
  id: string;
  pillar: string;
  platform: Platform;
  kind: OutputKind;
  hook: string;
  suggestedDay: string;
}

const HOOK_TEMPLATES = [
  "3 señales de que tu {p} funciona",
  "El gesto de 30 segundos que cambia tu noche",
  "Mito vs. realidad: lo que nadie te cuenta",
  "Lo que tu rutina dice de vos",
  "No es magia, es constancia",
  "Tres razones para no postergarlo",
  "Antes de comprar, mirá esto",
  "La pregunta que todos hacen sobre {p}",
];

export function getIdeas(brand: Brand): IdeaItem[] {
  const days = ["Mié 17", "Vie 19", "Sáb 20", "Lun 22", "Jue 25"];
  return Array.from({ length: 5 }).map((_, i) => {
    const seed = `${brand.id}-idea-${i}`;
    const pillar = brand.pillars[Math.floor(seeded(seed + "p") * brand.pillars.length)];
    const kinds: OutputKind[] = ["image", "carousel", "video"];
    return {
      id: seed,
      pillar: pillar.name,
      platform: PLATFORMS[Math.floor(seeded(seed + "pf") * PLATFORMS.length)],
      kind: kinds[Math.floor(seeded(seed + "k") * kinds.length)],
      hook: HOOK_TEMPLATES[i % HOOK_TEMPLATES.length].replace("{p}", pillar.name.toLowerCase()),
      suggestedDay: days[i],
    };
  });
}

// ---------- Studio: generated proposals (copy) ----------
export interface CopyProposal {
  id: string;
  hook: string;
  body: string;
  tags: string[];
  cta: string;
}

const COPY_BANK: CopyProposal[] = [
  {
    id: "c1",
    hook: "Lo que tu rutina dice de vos",
    body: "Pequeños gestos, gran diferencia. Sumá este paso y notá el cambio en una semana.",
    tags: ["#rutina", "#bienestar"],
    cta: "Probalo hoy",
  },
  {
    id: "c2",
    hook: "No es magia. Es constancia.",
    body: "Diseñamos cada detalle para que lo difícil se sienta simple. Vos solo disfrutá el resultado.",
    tags: ["#constancia", "#resultados"],
    cta: "Quiero empezar",
  },
  {
    id: "c3",
    hook: "Tres razones para no postergarlo",
    body: "Lo bueno también se hace esperar, pero esto no. Empezá hoy y lo vas a agradecer.",
    tags: ["#hoy", "#decisión"],
    cta: "Seguir",
  },
  {
    id: "c4",
    hook: "El detalle que cambia todo",
    body: "Está en lo simple. Una elección que se nota desde el primer día y se sostiene en el tiempo.",
    tags: ["#detalle", "#calidad"],
    cta: "Descubrir",
  },
];

export function getCopyProposals(count: number): CopyProposal[] {
  return Array.from({ length: count }).map((_, i) => COPY_BANK[i % COPY_BANK.length]);
}
