import { type Pillar } from "./brands";

/** Mix a hex color toward white — used to derive a light "tint" token. */
export function lightenHex(hex: string, amount = 0.62): string {
  const m = hex.replace("#", "");
  if (m.length !== 6) return hex;
  const n = parseInt(m, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return (
    "#" +
    [mix(r), mix(g), mix(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

export const DEFAULT_PILLARS: Pillar[] = [
  { id: "producto", name: "Producto", count: 0 },
  { id: "lifestyle", name: "Lifestyle", count: 0 },
  { id: "educacion", name: "Educación", count: 0 },
  { id: "promos", name: "Promos", count: 0 },
  { id: "ugc", name: "UGC", count: 0 },
];

export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "marca"
  );
}

export function autoMono(name: string): string {
  const parts = name.trim().split(/\s+/);
  const letters =
    (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "");
  return (letters.toUpperCase().slice(0, 2) || "NB").padEnd(2, "·").slice(0, 2);
}

export const HEX_RE = /^#[0-9a-fA-F]{6}$/;
