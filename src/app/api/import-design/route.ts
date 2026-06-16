import { NextResponse } from "next/server";
import { unzipSync, strFromU8 } from "fflate";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

const TEXT_EXT = /\.(css|scss|less|json|md|markdown|txt|html?|svg|ya?ml)$/i;
const MAX_CHARS = 48_000;

const DESIGN_TOOL: Anthropic.Tool = {
  name: "load_design_system",
  description:
    "Load the brand's interpreted design system into the app for this client.",
  input_schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      name: { type: "string", description: "Brand name, if discernible." },
      category: { type: "string", description: "Brand category/vertical, if discernible." },
      tagline: { type: "string", description: "A short brand tagline (max ~8 words)." },
      tokens: {
        type: "object",
        additionalProperties: false,
        description: "Core palette as #rrggbb hex values.",
        properties: {
          ink: { type: "string", description: "Darkest ink / near-black background." },
          primary: { type: "string", description: "Primary brand color (the darker brand tone)." },
          accent: { type: "string", description: "Vivid brand accent color." },
          tint: { type: "string", description: "Light tint of the brand color." },
          paper: { type: "string", description: "Light paper / off-white background." },
        },
        required: ["ink", "primary", "accent", "tint", "paper"],
      },
      voice: {
        type: "object",
        additionalProperties: false,
        properties: {
          do: { type: "array", items: { type: "string" }, description: "4 short 'do' voice guidelines." },
          avoid: { type: "array", items: { type: "string" }, description: "4 short 'avoid' voice guidelines." },
        },
        required: ["do", "avoid"],
      },
    },
    required: ["tagline", "tokens", "voice"],
  },
};

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "El motor de Claude no está configurado. Agregá ANTHROPIC_API_KEY en las variables de entorno (Vercel) para habilitar la importación.",
      },
      { status: 501 },
    );
  }

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
  } catch {
    /* fall through */
  }
  if (!file) {
    return NextResponse.json({ error: "No se recibió ningún archivo ZIP." }, { status: 400 });
  }
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: "El ZIP supera el límite de 20MB." }, { status: 413 });
  }

  // Unzip + collect text from design-relevant files
  let corpus = "";
  try {
    const buf = new Uint8Array(await file.arrayBuffer());
    const files = unzipSync(buf);
    for (const [name, data] of Object.entries(files)) {
      if (!TEXT_EXT.test(name) || name.startsWith("__MACOSX")) continue;
      if (data.length === 0 || data.length > 200_000) continue;
      const text = strFromU8(data);
      corpus += `\n\n===== FILE: ${name} =====\n${text}`;
      if (corpus.length > MAX_CHARS) {
        corpus = corpus.slice(0, MAX_CHARS);
        break;
      }
    }
  } catch {
    return NextResponse.json({ error: "No se pudo leer el ZIP (¿archivo corrupto?)." }, { status: 400 });
  }

  if (corpus.trim().length < 20) {
    return NextResponse.json(
      { error: "El ZIP no contiene archivos de diseño legibles (CSS/JSON/MD/etc.)." },
      { status: 422 },
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2048,
      tools: [DESIGN_TOOL],
      tool_choice: { type: "tool", name: "load_design_system" },
      system:
        "You are a design-systems expert. You receive raw files extracted from a brand's design-system handoff (CSS tokens, JSON, markdown specs). Interpret them and load a clean design system for this single brand. Map colors to: ink (darkest near-black background), primary (the darker brand tone), accent (the vivid brand color), tint (a light tint of the brand color), paper (a light off-white). All colors must be #rrggbb hex. Infer any missing value so the palette is cohesive. Voice guidelines must be short and specific. Respond ONLY by calling the load_design_system tool.",
      messages: [
        {
          role: "user",
          content: `Interpret this brand's design-system handoff and load it:\n${corpus}`,
        },
      ],
    });

    const block = message.content.find((b) => b.type === "tool_use");
    if (!block || block.type !== "tool_use") {
      return NextResponse.json({ error: "El motor no devolvió un sistema de diseño." }, { status: 502 });
    }
    return NextResponse.json(block.input);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: `Falló la interpretación con Claude: ${msg}` }, { status: 502 });
  }
}
