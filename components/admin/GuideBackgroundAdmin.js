"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Loader2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { displayImageUrl } from "@/lib/productImage";

const SLOTS = [
  { key: "phone_guide_hero", label: "Telefon rehberi" },
  { key: "computer_guide_hero", label: "Bilgisayar rehberi" },
];

export default function GuideBackgroundAdmin() {
  const [values, setValues] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [sqlMissing, setSqlMissing] = useState(false);

  useEffect(() => {
    createClient().from("site_settings").select(SLOTS.map((slot) => slot.key).join(", ")).eq("id", 1).maybeSingle().then(({ data, error }) => {
      setSqlMissing(Boolean(error));
      setValues(data || {});
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const supabase = createClient();
      const next = { ...values };
      for (const slot of SLOTS) {
        if (!files[slot.key]) continue;
        const file = files[slot.key];
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `guide-heroes/${slot.key}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, { upsert: false, contentType: file.type || "image/jpeg" });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        next[slot.key] = data.publicUrl;
      }
      const { error } = await supabase.from("site_settings").update({ ...next, updated_at: new Date().toISOString() }).eq("id", 1);
      if (error) throw error;
      setValues(next);
      setFiles({});
      setMessage("Rehber görselleri kaydedildi. Ürün sayfasını yenile.");
    } catch (error) {
      setMessage(error.message || "Kaydedilemedi.");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center gap-2 text-sm text-bw-500"><Loader2 className="h-4 w-4 animate-spin" /> Yükleniyor...</div>;
  if (sqlMissing) return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">Rehber görselleri için Supabase SQL Editor&apos;da <code>supabase/guide_hero.sql</code> dosyasını bir kez çalıştır.</div>;

  return <div className="mt-6 rounded-2xl border border-bw-200 bg-white p-5 shadow-sm sm:p-6">
    <p className="text-xs font-semibold uppercase tracking-[.2em] text-bw-500">Ürün rehberleri</p>
    <h2 className="mt-2 text-xl font-semibold text-bw-950">Rehber büyük görselleri</h2>
    <p className="mt-2 text-sm text-bw-600">Bu görseller, telefon veya bilgisayar kategorisindeki ürünlerin altında ilgili rehberde görünür.</p>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">{SLOTS.map((slot) => {
      const preview = files[slot.key] ? URL.createObjectURL(files[slot.key]) : values[slot.key] ? displayImageUrl(values[slot.key]) : null;
      return <div key={slot.key} className="rounded-2xl border border-bw-200 bg-bw-50 p-3"><p className="text-sm font-semibold text-bw-800">{slot.label}</p><div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-xl bg-bw-200">{preview ? <Image src={preview} alt="" fill className="object-cover" unoptimized /> : <div className="flex h-full items-center justify-center text-bw-400"><ImageIcon className="h-7 w-7" /></div>}</div><label className="mt-3 inline-flex cursor-pointer rounded-xl border border-bw-200 bg-white px-3 py-2 text-xs font-semibold text-bw-700 hover:border-bw-950">{preview ? "Görseli değiştir" : "Görsel seç"}<input type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) setFiles((current) => ({ ...current, [slot.key]: file })); }} /></label></div>;
    })}</div>
    {message ? <p className="mt-4 text-sm text-bw-600">{message}</p> : null}
    <button type="button" onClick={save} disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Kaydet</button>
  </div>;
}
