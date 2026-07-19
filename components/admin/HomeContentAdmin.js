"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { HOME_CONTENT_DEFAULTS } from "@/lib/homeContent";

const GROUPS = [
  ["Ana kapak", ["hero_eyebrow", "hero_title", "hero_copy", "hero_link", "hero_action"]],
  ["Öne çıkan kategoriler", ["phone_title", "phone_copy", "computer_title", "computer_copy", "tablet_title", "tablet_copy"]],
  ["Takas", ["trade_title", "trade_copy", "trade_action"]],
  ["Karşılaştırma", ["compare_title", "compare_copy", "compare_action"]],
  ["Ürün iste", ["request_title", "request_accent", "request_copy", "request_action"]],
  ["Rehber", ["guide_title", "guide_copy"]],
  ["Cihazını sat", ["sell_title", "sell_accent", "sell_copy"]],
  ["Soru cevap", ["faq_eyebrow", "faq_title", "faq_accent", "faq_copy", "faq_support_title", "faq_support_copy"]],
];

const LABELS = Object.fromEntries(Object.keys(HOME_CONTENT_DEFAULTS).map((key) => [key, key.replaceAll("_", " ")]));

export default function HomeContentAdmin() {
  const [values, setValues] = useState(HOME_CONTENT_DEFAULTS);
  const [root, setRoot] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    createClient().from("site_settings").select("content").eq("id", 1).maybeSingle().then(({ data, error }) => {
      if (error) setMessage("SQL gerekli: supabase/home_content.sql");
      else { const content = data?.content || {}; setRoot(content); setValues({ ...HOME_CONTENT_DEFAULTS, ...(content.home || {}) }); }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true); setMessage("");
    const { error } = await createClient().from("site_settings").update({ content: { ...root, home: values }, updated_at: new Date().toISOString() }).eq("id", 1);
    setMessage(error ? error.message : "Ana sayfa içerikleri kaydedildi.");
    if (!error) setRoot((prev) => ({ ...prev, home: values }));
    setSaving(false);
  };

  if (loading) return <p className="text-sm text-bw-500">Yükleniyor...</p>;
  return <div className="mt-6 rounded-2xl border border-bw-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-xl font-semibold">Ana sayfa içerikleri</h2><p className="mt-2 text-sm text-bw-600">Başlık, açıklama ve buton yazılarını buradan değiştir.</p><div className="mt-6 space-y-6">{GROUPS.map(([title, keys]) => <section key={title}><h3 className="mb-3 text-sm font-semibold text-bw-950">{title}</h3><div className="grid gap-3 sm:grid-cols-2">{keys.map((key) => <label key={key} className={key.endsWith("copy") ? "sm:col-span-2" : ""}><span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-bw-500">{LABELS[key]}</span>{key.endsWith("copy") ? <textarea rows={3} value={values[key]} onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))} className="w-full rounded-xl border border-bw-200 px-3 py-2 text-sm" /> : <input value={values[key]} onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))} className="w-full rounded-xl border border-bw-200 px-3 py-2 text-sm" />}</label>)}</div></section>)}</div>{message ? <p className="mt-4 text-sm text-bw-600">{message}</p> : null}<button onClick={save} disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Kaydet</button></div>;
}
