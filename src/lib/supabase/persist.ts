import { type Brand } from "../brands";
import { getSupabaseBrowser } from "./client";

/**
 * Best-effort write of brand edits to Supabase. No-ops when env is missing or
 * the request fails — localStorage remains the source of truth for the session.
 */
export function persistBrand(id: string, patch: Partial<Brand>) {
  const sb = getSupabaseBrowser();
  if (!sb) return;
  const row: Record<string, unknown> = {};
  if (patch.tagline !== undefined) row.tagline = patch.tagline;
  if (patch.tokens !== undefined) row.tokens = patch.tokens;
  if (patch.voice !== undefined) row.voice = patch.voice;
  if (patch.brand !== undefined) row.brand = patch.brand;
  if (patch.brand2 !== undefined) row.brand2 = patch.brand2;
  if (patch.name !== undefined) row.name = patch.name;
  if (patch.category !== undefined) row.category = patch.category;
  if (Object.keys(row).length === 0) return;
  void sb
    .from("brands")
    .update(row)
    .eq("id", id)
    .then(({ error }) => {
      if (error) console.warn("persistBrand:", error.message);
    });
}
