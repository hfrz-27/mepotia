/**
 * Yerel haber senkronu — Vercel deploy beklemeden çalıştır.
 *
 * Kullanım:
 *   SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/sync-news.mjs
 *
 * Anahtarı: Supabase → Settings → API → service_role
 */
import { createClient } from "@supabase/supabase-js";
import { syncShiftDeleteNews } from "../lib/shiftDeleteFeed.js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Eksik env: NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.");
  console.error("Ornek: set SUPABASE_SERVICE_ROLE_KEY=eyJ... && node scripts/sync-news.mjs");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const result = await syncShiftDeleteNews(supabase, { limit: 10 });
console.log(JSON.stringify(result, null, 2));
