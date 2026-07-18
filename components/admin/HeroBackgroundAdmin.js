"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Loader2, Save, Trash2, Video } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { displayImageUrl } from "@/lib/productImage";

const TABS = [
  { id: "home", label: "Ana sayfa" },
  { id: "news", label: "Haberler" },
  { id: "price", label: "Fiyat karşılaştır" },
  { id: "specs", label: "Özellik karşılaştır" },
  { id: "guides", label: "Rehberler" },
  { id: "sell", label: "Bana sat" },
  { id: "request", label: "Ürün iste" },
];

const PANELS = {
  home: {
    title: "Ana sayfa hero",
    description: "Video öncelikli. Video yoksa 1–3 fotoğraf yavaşça kayar.",
    videoKey: "hero_video",
    slots: [
      { key: "hero_bg_1", label: "Fotoğraf 1" },
      { key: "hero_bg_2", label: "Fotoğraf 2" },
      { key: "hero_bg_3", label: "Fotoğraf 3" },
    ],
    storagePrefix: "hero",
    savedMsg: "Ana sayfa hero kaydedildi. Sayfayı yenile.",
  },
  news: {
    title: "Haberler hero",
    description: "Teknoloji haberleri sayfasının üst kapak alanı.",
    videoKey: "news_hero_video",
    slots: [{ key: "news_hero_bg_1", label: "Hero görseli" }],
    storagePrefix: "news-hero",
    savedMsg: "Haberler hero kaydedildi. Sayfayı yenile.",
  },
  price: {
    title: "Fiyat karşılaştır hero",
    description: "/fiyat-karsilastir sayfasının en üstü. Video öncelikli.",
    videoKey: "price_compare_video",
    slots: [
      { key: "price_compare_bg_1", label: "Fotoğraf 1" },
      { key: "price_compare_bg_2", label: "Fotoğraf 2" },
      { key: "price_compare_bg_3", label: "Fotoğraf 3" },
    ],
    storagePrefix: "price-compare",
    savedMsg: "Fiyat karşılaştır hero kaydedildi.",
  },
  specs: {
    title: "Özellik karşılaştır hero",
    description: "/urun-karsilastir sayfasının en üstü. Video öncelikli.",
    videoKey: "specs_compare_video",
    slots: [
      { key: "specs_compare_bg_1", label: "Fotoğraf 1" },
      { key: "specs_compare_bg_2", label: "Fotoğraf 2" },
      { key: "specs_compare_bg_3", label: "Fotoğraf 3" },
    ],
    storagePrefix: "specs-compare",
    savedMsg: "Özellik karşılaştır hero kaydedildi.",
  },
  guides: {
    title: "Rehber sayfaları hero",
    description:
      "/rehber listesi ve her rehber detayının üstü. Video öncelikli; yoksa fotoğraflar kullanılır.",
    videoKey: "guide_hero_video",
    slots: [
      { key: "guide_hero", label: "Fotoğraf 1" },
      { key: "guide_hero_2", label: "Fotoğraf 2" },
      { key: "guide_hero_3", label: "Fotoğraf 3" },
    ],
    storagePrefix: "guide-heroes",
    savedMsg: "Rehber hero kaydedildi.",
  },
  sell: {
    title: "Bana sat sayfası",
    description: "/bana-sat form sayfasının arka planı. Video veya 1–3 fotoğraf.",
    videoKey: "sell_hero_video",
    slots: [
      { key: "sell_hero_bg_1", label: "Fotoğraf 1" },
      { key: "sell_hero_bg_2", label: "Fotoğraf 2" },
      { key: "sell_hero_bg_3", label: "Fotoğraf 3" },
    ],
    storagePrefix: "sell-hero",
    savedMsg: "Bana sat hero kaydedildi.",
  },
  request: {
    title: "Ürün iste sayfası",
    description: "/urun-iste form sayfasının arka planı. Video veya 1–3 fotoğraf.",
    videoKey: "request_hero_video",
    slots: [
      { key: "request_hero_bg_1", label: "Fotoğraf 1" },
      { key: "request_hero_bg_2", label: "Fotoğraf 2" },
      { key: "request_hero_bg_3", label: "Fotoğraf 3" },
    ],
    storagePrefix: "request-hero",
    savedMsg: "Ürün iste hero kaydedildi.",
  },
};

const ALL_KEYS = Object.values(PANELS).flatMap((p) => [
  p.videoKey,
  ...p.slots.map((s) => s.key),
]);

const VIDEO_KEYS = Object.values(PANELS).map((p) => p.videoKey);

function emptyValues() {
  return ALL_KEYS.reduce((acc, key) => ({ ...acc, [key]: "" }), {});
}

function emptyFlags(keys) {
  return keys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
}

function videoExt(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".webm")) return "webm";
  if (name.endsWith(".mov")) return "mov";
  return "mp4";
}

export default function HeroBackgroundAdmin() {
  const [tab, setTab] = useState("home");
  const [values, setValues] = useState(emptyValues);
  const [files, setFiles] = useState({});
  const [removed, setRemoved] = useState(emptyFlags(ALL_KEYS.filter((k) => !k.includes("video"))));
  const [videoFiles, setVideoFiles] = useState({});
  const [videoRemoved, setVideoRemoved] = useState(emptyFlags(VIDEO_KEYS));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [sqlMissing, setSqlMissing] = useState(false);

  const panel = PANELS[tab];

  const load = async () => {
    setLoading(true);
    const { data, error } = await createClient()
      .from("site_settings")
      .select(ALL_KEYS.join(", "))
      .eq("id", 1)
      .maybeSingle();

    if (
      error?.message?.includes("hero_bg") ||
      error?.message?.includes("hero_video") ||
      error?.message?.includes("price_compare") ||
      error?.message?.includes("specs_compare") ||
      error?.message?.includes("guide_hero") ||
      error?.message?.includes("news_hero") ||
      error?.message?.includes("sell_hero") ||
      error?.message?.includes("request_hero") ||
      error?.message?.includes("specs_compare") ||
      error?.code === "42703"
    ) {
      setSqlMissing(true);
      setLoading(false);
      return;
    }

    if (data) {
      setValues(ALL_KEYS.reduce((acc, key) => ({ ...acc, [key]: data[key] || "" }), {}));
    }
    setRemoved(emptyFlags(ALL_KEYS.filter((k) => !k.includes("video") && !k.endsWith("_video"))));
    setVideoRemoved(emptyFlags(VIDEO_KEYS));
    setFiles({});
    setVideoFiles({});
    setSqlMissing(false);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const resolveSlot = async (supabase, key, prefix) => {
    if (files[key]) {
      const ext = (files[key].name.split(".").pop() || "jpg").toLowerCase();
      const path = `${prefix}/${key}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, files[key], {
        upsert: true,
        contentType: files[key].type || "image/jpeg",
      });
      if (error) throw new Error(error.message);
      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
      return pub.publicUrl;
    }
    if (removed[key]) return null;
    return values[key] || null;
  };

  const resolveVideo = async (supabase, videoKey, prefix) => {
    if (videoFiles[videoKey]) {
      const file = videoFiles[videoKey];
      const ext = videoExt(file);
      const path = `${prefix}/${videoKey}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, {
        upsert: true,
        contentType: file.type || "video/mp4",
      });
      if (error) throw new Error(error.message);
      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
      return pub.publicUrl;
    }
    if (videoRemoved[videoKey]) return null;
    return values[videoKey] || null;
  };

  const onSave = async () => {
    setSaving(true);
    setMsg("");
    try {
      const supabase = createClient();
      const next = {};

      for (const panelDef of Object.values(PANELS)) {
        for (const slot of panelDef.slots) {
          next[slot.key] = await resolveSlot(supabase, slot.key, panelDef.storagePrefix);
        }
        next[panelDef.videoKey] = await resolveVideo(
          supabase,
          panelDef.videoKey,
          panelDef.storagePrefix,
        );
      }

      const { error } = await supabase
        .from("site_settings")
        .update({ ...next, updated_at: new Date().toISOString() })
        .eq("id", 1);

      if (error) throw new Error(error.message);

      setValues(ALL_KEYS.reduce((acc, key) => ({ ...acc, [key]: next[key] || "" }), {}));
      setFiles({});
      setVideoFiles({});
      setRemoved(emptyFlags(ALL_KEYS.filter((k) => !VIDEO_KEYS.includes(k))));
      setVideoRemoved(emptyFlags(VIDEO_KEYS));
      setMsg(panel.savedMsg);
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
          Supabase SQL Editor&apos;da bir kez çalıştır:{" "}
          <code className="rounded bg-amber-100 px-1">supabase/page_heroes.sql</code>
        </p>
      </div>
    );
  }

  const videoKey = panel.videoKey;
  const hasVideo =
    Boolean(videoFiles[videoKey]) || (Boolean(values[videoKey]) && !videoRemoved[videoKey]);
  const videoPreview = videoFiles[videoKey]
    ? URL.createObjectURL(videoFiles[videoKey])
    : values[videoKey] && !videoRemoved[videoKey]
      ? values[videoKey]
      : null;
  const activeCount = panel.slots.filter(
    (slot) => !removed[slot.key] && (files[slot.key] || values[slot.key]),
  ).length;

  return (
    <div className="rounded-2xl border border-bw-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-bw-500 uppercase">Hero medya</p>
      <p className="mt-1 text-sm text-bw-600">
        Her sayfanın başındaki arka plan — fotoğraf veya video. Video varsa fotoğraf devre dışı.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setTab(item.id);
              setMsg("");
            }}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              tab === item.id
                ? "bg-bw-950 text-white"
                : "border border-bw-200 bg-bw-50 text-bw-700 hover:border-bw-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <h2 className="mt-4 font-display text-xl font-semibold text-bw-950">{panel.title}</h2>
      <p className="mt-2 text-sm text-bw-600">{panel.description}</p>
      <p className="mt-1 text-xs text-bw-500">
        Video: {hasVideo ? "aktif" : "yok"} · Fotoğraf: {activeCount}
      </p>

      <div className="mt-5 rounded-2xl border border-bw-200 bg-bw-50 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold text-bw-800">
          <Video className="h-4 w-4" />
          Hero videosu
        </p>
        <p className="mt-1 text-[10px] text-bw-500">MP4 / WebM · önerilen max ~15 MB · sessiz döngü</p>
        <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-xl bg-bw-900">
          {videoPreview ? (
            <video
              src={videoPreview}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <div className="flex h-full items-center justify-center text-bw-500">
              <Video className="h-8 w-8" />
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-bw-200 bg-white px-3 py-2 text-xs font-semibold text-bw-700 hover:border-bw-300">
            {hasVideo ? "Videoyu değiştir" : "Video seç"}
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setVideoFiles((prev) => ({ ...prev, [videoKey]: file }));
                setVideoRemoved((prev) => ({ ...prev, [videoKey]: false }));
              }}
            />
          </label>
          {hasVideo ? (
            <button
              type="button"
              onClick={() => {
                setVideoFiles((prev) => ({ ...prev, [videoKey]: null }));
                setValues((prev) => ({ ...prev, [videoKey]: "" }));
                setVideoRemoved((prev) => ({ ...prev, [videoKey]: true }));
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Videoyu sil
            </button>
          ) : null}
        </div>
      </div>

      <div className={`mt-5 grid gap-4 ${panel.slots.length === 1 ? "sm:max-w-md" : "sm:grid-cols-3"}`}>
        {panel.slots.map((slot) => {
          const hasFile = Boolean(files[slot.key]);
          const hasSaved = Boolean(values[slot.key]) && !removed[slot.key];
          const preview = hasFile
            ? URL.createObjectURL(files[slot.key])
            : hasSaved
              ? displayImageUrl(values[slot.key])
              : null;

          return (
            <div key={slot.key} className="rounded-2xl border border-bw-200 bg-bw-50 p-3">
              <p className="text-xs font-semibold text-bw-700">{slot.label}</p>
              <p className="mt-0.5 text-[10px] text-bw-400">Video yoksa kullanılır</p>
              <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-xl bg-bw-200">
                {preview ? (
                  <Image src={preview} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex h-full items-center justify-center text-bw-400">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-bw-200 bg-white px-3 py-2 text-xs font-semibold text-bw-700 hover:border-bw-300">
                  {hasSaved || hasFile ? "Değiştir" : "Fotoğraf seç"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setFiles((prev) => ({ ...prev, [slot.key]: file }));
                      setRemoved((prev) => ({ ...prev, [slot.key]: false }));
                    }}
                  />
                </label>
                {preview ? (
                  <button
                    type="button"
                    onClick={() => {
                      setFiles((prev) => ({ ...prev, [slot.key]: null }));
                      setValues((prev) => ({ ...prev, [slot.key]: "" }));
                      setRemoved((prev) => ({ ...prev, [slot.key]: true }));
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Sil
                  </button>
                ) : null}
              </div>
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
