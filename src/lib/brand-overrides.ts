import { type Brand } from "./brands";

const KEY = "cb.brandOverrides";

export type BrandOverrides = Record<string, Partial<Brand>>;

export function loadOverrides(): BrandOverrides {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as BrandOverrides;
  } catch {
    return {};
  }
}

export function saveOverride(id: string, patch: Partial<Brand>) {
  try {
    const all = loadOverrides();
    all[id] = { ...(all[id] || {}), ...patch };
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}
