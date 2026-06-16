import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import {
  autoMono,
  DEFAULT_PILLARS,
  HEX_RE,
  lightenHex,
  slugify,
} from "@/lib/brand-defaults";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sb = createSupabaseServer();
  if (!sb) {
    return NextResponse.json(
      { error: "Supabase no está configurado en este entorno." },
      { status: 501 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }
  const category = String(body.category ?? "").trim() || "Marca";
  const brand = HEX_RE.test(String(body.brand)) ? String(body.brand) : "#34d399";
  const brand2 = HEX_RE.test(String(body.brand2)) ? String(body.brand2) : "#0f766e";
  const mono = (String(body.mono ?? "").trim() || autoMono(name))
    .toUpperCase()
    .slice(0, 2);
  const tagline = String(body.tagline ?? "").trim() || `Sistema de diseño de ${name}.`;

  // Unique id from the name slug
  const base = slugify(name);
  let id = base;
  for (let i = 0; i < 6; i++) {
    const { data } = await sb.from("brands").select("id").eq("id", id).maybeSingle();
    if (!data) break;
    id = `${base}-${Math.random().toString(36).slice(2, 5)}`;
  }

  // Append at the end of the ordering
  const { data: maxRow } = await sb
    .from("brands")
    .select("sort")
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sort = (((maxRow?.sort as number) ?? 0) || 0) + 1;

  const tokens = {
    ink: "#0a0810",
    primary: brand2,
    accent: brand,
    tint: lightenHex(brand),
    paper: "#f4f1ea",
  };

  const row = {
    id,
    name,
    category,
    mono,
    brand,
    brand2,
    tagline,
    tokens,
    pillars: DEFAULT_PILLARS,
    stats: { outputsMonth: 0, trend: 0, scheduled: 0, assets: 0 },
    drive: { files: 0, lastSyncMin: 0 },
    voice: { do: [], avoid: [] },
    font_display: "Newsreader",
    font_body: "Geist",
    sort,
  };

  const { error } = await sb.from("brands").insert(row);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return in the app's Brand shape
  return NextResponse.json({
    id,
    name,
    category,
    mono,
    brand,
    brand2,
    tagline,
    tokens,
    pillars: DEFAULT_PILLARS,
    stats: row.stats,
    drive: row.drive,
    voice: row.voice,
    fontPair: { display: "Newsreader", body: "Geist" },
  });
}
