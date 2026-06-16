import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client. Reads whatever the Vercel↔Supabase integration
 * (or manual env) injects — the integration's names vary, so we accept several.
 * Returns null when nothing is configured so callers fall back to static data.
 */
export function createSupabaseServer() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? // server-only, bypasses RLS (read/write)
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
