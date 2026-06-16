import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (public read with the publishable/anon key).
 * Returns null when env is not configured so callers can fall back to static
 * data — the app stays deployable without Supabase env vars.
 */
export function createSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
