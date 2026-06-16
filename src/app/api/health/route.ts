import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Safe health check — reports which integration env vars are present (booleans,
 * never values) and whether Supabase is reachable with a live brands count.
 */
export async function GET() {
  const present = (k: string) => Boolean(process.env[k]);

  const env = {
    NEXT_PUBLIC_SUPABASE_URL: present("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: present("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: present("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    SUPABASE_URL: present("SUPABASE_URL"),
    SUPABASE_ANON_KEY: present("SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: present("SUPABASE_SERVICE_ROLE_KEY"),
    POSTGRES_URL: present("POSTGRES_URL"),
    ANTHROPIC_API_KEY: present("ANTHROPIC_API_KEY"),
  };

  const supabase: {
    configured: boolean;
    ok: boolean;
    brandCount: number | null;
    error: string | null;
  } = { configured: false, ok: false, brandCount: null, error: null };

  const sb = createSupabaseServer();
  if (sb) {
    supabase.configured = true;
    try {
      const { count, error } = await sb
        .from("brands")
        .select("*", { count: "exact", head: true });
      if (error) supabase.error = error.message;
      else {
        supabase.ok = true;
        supabase.brandCount = count ?? 0;
      }
    } catch (e) {
      supabase.error = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    env,
    supabase,
    browserClientReady:
      env.NEXT_PUBLIC_SUPABASE_URL &&
      (env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    anthropicReady: env.ANTHROPIC_API_KEY,
  });
}
