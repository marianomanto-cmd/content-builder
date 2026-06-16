import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

/**
 * Browser Supabase client. Only NEXT_PUBLIC_* vars are visible in the browser
 * (they're inlined at build time), so we check the public name variants the
 * Vercel↔Supabase integration may inject. Returns null when unconfigured.
 */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  cached =
    url && key
      ? createClient(url, key, { auth: { persistSession: false } })
      : null;
  return cached;
}
