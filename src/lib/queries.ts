import { BRANDS, type Brand } from "./brands";
import { createSupabaseServer } from "./supabase/server";

interface BrandRow {
  id: string;
  name: string;
  category: string;
  mono: string;
  brand: string;
  brand2: string;
  tagline: string;
  font_display: string;
  font_body: string;
  tokens: Brand["tokens"];
  pillars: Brand["pillars"];
  stats: Brand["stats"];
  drive: Brand["drive"];
  voice: Brand["voice"];
}

function rowToBrand(r: BrandRow): Brand {
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    mono: r.mono,
    brand: r.brand,
    brand2: r.brand2,
    tagline: r.tagline,
    tokens: r.tokens,
    pillars: r.pillars,
    stats: r.stats,
    drive: r.drive,
    voice: r.voice,
    fontPair: { display: r.font_display, body: r.font_body },
  };
}

/**
 * Brands come from Supabase when configured, otherwise from the bundled
 * static set. Either path returns the same shape, so the UI never breaks.
 */
export async function getBrands(): Promise<Brand[]> {
  const supabase = createSupabaseServer();
  if (!supabase) return BRANDS;
  try {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .order("sort");
    if (error || !data || data.length === 0) return BRANDS;
    return (data as BrandRow[]).map(rowToBrand);
  } catch {
    return BRANDS;
  }
}
