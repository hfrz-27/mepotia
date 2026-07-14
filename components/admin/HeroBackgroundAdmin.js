"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Loader2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { displayImageUrl } from "@/lib/productImage";

const SLOTS = [
  { key: "hero_bg_1", label: "Fotoğraf 1" },
  { key: "hero_bg_2", label: "Fotoğraf 2" },
  { key: "hero_bg_3", label: "Fotoğraf 3" },
];

export default function HeroBackgroundAdmin() {
  const [values, setValues] = useState({ hero_bg_1: "", hero_bg_2: "", hero_bg_3: "" });
  const [files, setFiles] = useState({ hero_bg_1: null, hero_bg_2: null, hero_bg_3: null });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [sqlMissing, setSqlMissing] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await createClient()
      .from("site_settings")
      .select("hero_bg_1, hero_bg_2, hero_bg_3")
      .eq("id", 1)
      .maybeSingle();

    if (error?.message?.includes("hero_bg")) {
      setSqlMissing(true);
      setLoading(false);
      return;
    }

    if (data) {
      setValues({
        hero_bg_1: data.hero_bg_1 || "",
        hero_bg_2: data.hero_bg_2 || "",
        hero_bg_3: data.hero_bg_3 || "",
      });
    }
    setSqlMissing(false);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadIfNeeded = async (supabase, key) => {
    const file = files[key];
    if (!file) return values[key];

    const path = `hero/${key}-${Date.now()}.jpg`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      upsert: true,
      contentType: file.type || "image/jpeg",
    });
    if (error) throw new Error(error.message);

    const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
    return pub.publicUrl;
  };

  const onSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      const supabase = createClient();
      const next = {};
      for (const slot of SLOTS) {
        next[slot.key] = await uploadIfNeeded(supabase, slot.key);
      }

      const { error } = await supabase
        .from("site_settings")
        .update({ ...next, updated_at: new Date().toISOString() })
        .eq("id", 1);

      if (error) throw new Error(error.message);

      setValues(next);
      setFiles({ hero_bg_1: null, hero_bg_2: null, hero_bg_3: null });
      setMsg("Hero arka planları kaydedildi. Ana sayfayı yenile.");
    } catch (err) {
      setMsg(err.message || "Kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-bw-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Yükleniyor...
      </div>
    );
  }

  if (sqlMissing) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
        <p className="font-semibold">SQL eksik</p>
        <p className="mt-1">
          Supabase&apos;de <code>supabase/hero_backgrounds.sql</code> çalıştır.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-bw-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-bw-500 uppercase">
        Ana sayfa hero
      </p>
      <h2 className="mt-1 font-display text-xl font-semibold text-bw-950">
        MEPOTIA arka plan fotoğrafları
      </h2>
      <p className="mt-2 text-sm text-bw-600">
        3 fotoğraf yükle. Ana sayfada yavaşça kayar ve tek fotoğraf gibi birleşir.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {SLOTS.map((slot) => {
          const preview = files[slot.key]
            ? URL.createObjectURL(files[slot.key])
            : values[slot.key]
              ? displayImageUrl(values[slot.key])
              : null;

          return (
            <div key={slot.key} className="rounded-2xl border border-bw-200 bg-bw-50 p-3">
              <p className="text-xs font-semibold text-bw-700">{slot.label}</p>
              <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-xl bg-bw-200">
                {preview ? (
                  <Image src={preview} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex h-full items-center justify-center text-bw-400">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )}
              </div>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-bw-200 bg-white px-3 py-2 text-xs font-semibold text-bw-700 hover:border-bw-300">
                Fotoğraf seç
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setFiles((prev) => ({ ...prev, [slot.key]: file }));
                  }}
                />
              </label>
            </div>
          );
        })}
      </div>

      {msg ? <p className="mt-4 text-sm text-bw-600">{msg}</p> : null}

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-50"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Kaydet
      </button>
    </div>
  );
}
