/**
 * Yerel haber senkronu
 *
 * Kullanım:
 *   SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/sync-news.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { syncTechNews } from "../lib/techNewsSync.js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Eksik env: NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const result = await syncTechNews(supabase, { limit: 10 });
console.log(JSON.stringify(result, null, 2));
