import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

/**
 * Browser Supabase client (publishable/anon key). Returns null when the public
 * env is not configured, so callers can no-op gracefully.
 */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cached =
    url && key
      ? createClient(url, key, { auth: { persistSession: false } })
      : null;
  return cached;
}
