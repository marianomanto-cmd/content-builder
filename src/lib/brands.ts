/* ============================================================
 * Brand model — the 6 demo brands from the handoff.
 * Each brand carries its own --brand / --brand-2 (content color),
 * its design tokens, pillars, stats, Drive status and voice.
 * The app chrome (sangría accent) never changes with the brand.
 * ========================================================== */

export type Platform = "instagram" | "tiktok" | "youtube" | "x";
export type Ratio = "4:5" | "1:1" | "9:16" | "16:9";
export type OutputKind = "image" | "carousel" | "video";

export interface Pillar {
  id: string;
  name: string;
  count: number;
}

export interface BrandTokens {
  ink: string;
  primary: string;
  accent: string;
  tint: string;
  paper: string;
}

export interface Brand {
  id: string;
  name: string;
  category: string;
  mono: string;
  /** content accent */
  brand: string;
  /** darker content accent (gradients) */
  brand2: string;
  tagline: string;
  tokens: BrandTokens;
  pillars: Pillar[];
  fontPair: { display: string; body: string };
  stats: {
    outputsMonth: number;
    trend: number;
    scheduled: number;
    assets: number;
  };
  drive: { files: number; lastSyncMin: number };
  voice: { do: string[]; avoid: string[] };
}

export const BRANDS: Brand[] = [
  {
    id: "lumen",
    name: "Lumen",
    category: "Skincare",
    mono: "LM",
    brand: "#34d399",
    brand2: "#0f766e",
    tagline: "Rituales simples, piel que se nota.",
    tokens: { ink: "#0a0810", primary: "#0f766e", accent: "#34d399", tint: "#bfe7c7", paper: "#f4f1ea" },
    pillars: [
      { id: "producto", name: "Producto", count: 4 },
      { id: "lifestyle", name: "Lifestyle", count: 3 },
      { id: "educacion", name: "Educación", count: 2 },
      { id: "detras", name: "Detrás de escena", count: 2 },
      { id: "promos", name: "Promos", count: 2 },
      { id: "ugc", name: "UGC", count: 2 },
    ],
    fontPair: { display: "Newsreader", body: "Geist" },
    stats: { outputsMonth: 128, trend: 24, scheduled: 7, assets: 342 },
    drive: { files: 342, lastSyncMin: 4 },
    voice: {
      do: ["Hablá de rituales, no de milagros", "Tono cálido y cercano", "Mostrá texturas reales", "Sentence case siempre"],
      avoid: ["Promesas médicas", "Antes/después extremos", "Jerga clínica fría", "ALL CAPS gritando"],
    },
  },
  {
    id: "cobalt",
    name: "Cobalt",
    category: "Fintech",
    mono: "CB",
    brand: "#5b8def",
    brand2: "#2b4acb",
    tagline: "Tu dinero, con claridad.",
    tokens: { ink: "#0a0810", primary: "#2b4acb", accent: "#5b8def", tint: "#c5d6fb", paper: "#f4f1ea" },
    pillars: [
      { id: "producto", name: "Producto", count: 5 },
      { id: "educacion", name: "Educación financiera", count: 4 },
      { id: "confianza", name: "Confianza", count: 2 },
      { id: "promos", name: "Promos", count: 2 },
      { id: "ugc", name: "Casos reales", count: 1 },
    ],
    fontPair: { display: "Newsreader", body: "Geist" },
    stats: { outputsMonth: 96, trend: 12, scheduled: 5, assets: 218 },
    drive: { files: 218, lastSyncMin: 11 },
    voice: {
      do: ["Claridad ante todo", "Números honestos", "Explicá sin tecnicismos", "Transmití seguridad"],
      avoid: ["Promesas de ganancias", "Letra chica escondida", "Urgencia artificial", "Jerga de trading"],
    },
  },
  {
    id: "fauna",
    name: "Fauna",
    category: "Pet Food",
    mono: "FA",
    brand: "#f59e63",
    brand2: "#b45309",
    tagline: "Comida real para amigos reales.",
    tokens: { ink: "#0a0810", primary: "#b45309", accent: "#f59e63", tint: "#fbd9b8", paper: "#f4f1ea" },
    pillars: [
      { id: "producto", name: "Producto", count: 3 },
      { id: "mascotas", name: "Mascotas", count: 5 },
      { id: "nutricion", name: "Nutrición", count: 3 },
      { id: "ugc", name: "UGC", count: 4 },
      { id: "promos", name: "Promos", count: 2 },
    ],
    fontPair: { display: "Newsreader", body: "Geist" },
    stats: { outputsMonth: 74, trend: 31, scheduled: 6, assets: 410 },
    drive: { files: 410, lastSyncMin: 2 },
    voice: {
      do: ["Calidez y juego", "Mascotas como familia", "Ingredientes reales", "Humor amable"],
      avoid: ["Culpa al tutor", "Comparaciones agresivas", "Tono veterinario frío", "Stock genérico"],
    },
  },
  {
    id: "nimbus",
    name: "Nimbus",
    category: "SaaS B2B",
    mono: "NB",
    brand: "#a78bfa",
    brand2: "#6d28d9",
    tagline: "Equipos que avanzan sin fricción.",
    tokens: { ink: "#0a0810", primary: "#6d28d9", accent: "#a78bfa", tint: "#ddd2fc", paper: "#f4f1ea" },
    pillars: [
      { id: "producto", name: "Producto", count: 6 },
      { id: "casos", name: "Casos de uso", count: 3 },
      { id: "educacion", name: "Thought leadership", count: 3 },
      { id: "comunidad", name: "Comunidad", count: 2 },
    ],
    fontPair: { display: "Newsreader", body: "Geist" },
    stats: { outputsMonth: 112, trend: 18, scheduled: 9, assets: 167 },
    drive: { files: 167, lastSyncMin: 7 },
    voice: {
      do: ["Concreto y útil", "Mostrá el producto en acción", "Datos que importan", "Respeto por el tiempo"],
      avoid: ["Buzzwords vacíos", "Promesas de hype", "Demos eternas", "Tono corporativo rígido"],
    },
  },
  {
    id: "solera",
    name: "Solera",
    category: "Vino",
    mono: "SO",
    brand: "#e0a458",
    brand2: "#92400e",
    tagline: "El tiempo, en cada copa.",
    tokens: { ink: "#0a0810", primary: "#92400e", accent: "#e0a458", tint: "#f3dcae", paper: "#f4f1ea" },
    pillars: [
      { id: "producto", name: "Etiquetas", count: 4 },
      { id: "maridaje", name: "Maridaje", count: 3 },
      { id: "terroir", name: "Terroir", count: 2 },
      { id: "momentos", name: "Momentos", count: 3 },
      { id: "promos", name: "Promos", count: 1 },
    ],
    fontPair: { display: "Newsreader", body: "Geist" },
    stats: { outputsMonth: 58, trend: 9, scheduled: 4, assets: 289 },
    drive: { files: 289, lastSyncMin: 16 },
    voice: {
      do: ["Sensorial y pausado", "Honrá el origen", "Invitá a la mesa", "Elegancia sin pretensión"],
      avoid: ["Snobismo", "Puntajes como única medida", "Apuro", "Promesas de status"],
    },
  },
  {
    id: "mantra",
    name: "Mantra",
    category: "Fitness",
    mono: "MN",
    brand: "#f472a6",
    brand2: "#be185d",
    tagline: "Constancia que se siente.",
    tokens: { ink: "#0a0810", primary: "#be185d", accent: "#f472a6", tint: "#fbcfe2", paper: "#f4f1ea" },
    pillars: [
      { id: "rutinas", name: "Rutinas", count: 5 },
      { id: "motivacion", name: "Motivación", count: 4 },
      { id: "nutricion", name: "Nutrición", count: 2 },
      { id: "comunidad", name: "Comunidad", count: 3 },
      { id: "promos", name: "Promos", count: 2 },
    ],
    fontPair: { display: "Newsreader", body: "Geist" },
    stats: { outputsMonth: 134, trend: 27, scheduled: 8, assets: 376 },
    drive: { files: 376, lastSyncMin: 3 },
    voice: {
      do: ["Energía honesta", "Progreso, no perfección", "Inclusivo en todos los cuerpos", "Constancia sobre intensidad"],
      avoid: ["Vergüenza corporal", "Resultados express", "Comparaciones tóxicas", "Culpa como motor"],
    },
  },
];

export const DEFAULT_BRAND_ID = "lumen";

export function getBrand(id: string): Brand {
  return BRANDS.find((b) => b.id === id) ?? BRANDS[0];
}

export const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
};

export const PLATFORM_VAR: Record<Platform, string> = {
  instagram: "var(--pf-instagram)",
  tiktok: "var(--pf-tiktok)",
  youtube: "var(--pf-youtube)",
  x: "var(--pf-x)",
};

export const RATIO_DIMS: Record<Ratio, { w: number; h: number }> = {
  "4:5": { w: 4, h: 5 },
  "1:1": { w: 1, h: 1 },
  "9:16": { w: 9, h: 16 },
  "16:9": { w: 16, h: 9 },
};
