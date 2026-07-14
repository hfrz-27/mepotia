"use client";

import { useEffect, useState } from "react";
import { Link2, RefreshCw, Rss, Trash2 } from "lucide-react";
import { loadSavedFeedInput, parseFeedInput, saveFeedInput } from "@/lib/techNewsFeedInput";

async function requestSync(body) {
  let res = await fetch("/api/sync-tech-news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 404) {
    res = await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ syncTechNews: true, ...body }),
    });
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "İşlem başarısız.");
  return data;
}

export default function TechNewsSyncBox({
  variant = "inline",
  disabled = false,
  onSynced,
  className = "",
}) {
  const [feedInput, setFeedInput] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setFeedInput(loadSavedFeedInput());
  }, []);

  const formatResult = (data) => {
    const parts = [];
    if (data.deleted) parts.push(`${data.deleted} haber silindi.`);
    if (data.imported) parts.push(`${data.imported} yeni haber eklendi.`);
    if (data.updated) parts.push(`${data.updated} haber güncellendi.`);
    if (!data.deleted && !data.imported && !data.updated) parts.push("İşlem tamamlandı.");
    if (data.skipped) parts.push(`${data.skipped} haber atlandı.`);
    if (data.errors?.length) parts.push(`${data.errors.length} hata.`);
    if (data.feeds?.length) parts.push(`Kaynak: ${data.feeds.join(", ")}`);
    return parts.join(" ");
  };

  const onSync = async () => {
    const feedUrls = parseFeedInput(feedInput);
    if (!feedUrls.length) {
      setMsg("Site linkini gir. Örn: https://www.webtekno.com");
      return;
    }

    saveFeedInput(feedInput);
    setSyncing(true);
    setMsg("");

    try {
      const data = await requestSync({ feedUrls });
      setMsg(formatResult(data));
      if ((data.imported ?? 0) > 0 || (data.updated ?? 0) > 0) onSynced?.();
    } catch (err) {
      setMsg(err?.message || "Haberler alınamadı.");
    } finally {
      setSyncing(false);
    }
  };

  const onResetAndSync = async () => {
    const feedUrls = parseFeedInput(feedInput);
    if (!feedUrls.length) {
      setMsg("Önce site linkini gir, sonra silip yeniden çek.");
      return;
    }
    if (!confirm("Tüm haberler silinip linkteki haberler yeniden çekilecek. Emin misin?")) return;

    saveFeedInput(feedInput);
    setSyncing(true);
    setMsg("");

    try {
      const data = await requestSync({ feedUrls, resetAndSync: true });
      setMsg(formatResult(data));
      onSynced?.();
    } catch (err) {
      setMsg(err?.message || "İşlem başarısız.");
    } finally {
      setSyncing(false);
    }
  };

  const onDeleteAll = async () => {
    if (!confirm("Tüm teknoloji haberleri silinsin mi?")) return;

    setSyncing(true);
    setMsg("");

    try {
      const data = await requestSync({ deleteAll: true });
      setMsg(formatResult(data));
      onSynced?.();
    } catch (err) {
      setMsg(err?.message || "Silinemedi.");
    } finally {
      setSyncing(false);
    }
  };

  const isBanner = variant === "banner";
  const fieldClass = isBanner
    ? "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-bw-400 outline-none focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/20"
    : "w-full rounded-xl border border-bw-200 bg-white px-4 py-3 text-sm text-bw-900 outline-none transition focus:border-bw-500 focus:ring-2 focus:ring-bw-950/5";

  const primaryBtn = isBanner
    ? "inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-bw-950 hover:bg-bw-100 disabled:cursor-not-allowed disabled:opacity-50"
    : "inline-flex items-center gap-2 rounded-xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-50";

  const secondaryBtn = isBanner
    ? "inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
    : "inline-flex items-center gap-2 rounded-xl border border-bw-300 bg-white px-5 py-3 text-sm font-semibold text-bw-800 hover:border-bw-950 disabled:opacity-50";

  const dangerBtn = isBanner
    ? "inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-red-300/30 bg-red-500/15 px-5 py-3 text-sm font-semibold text-red-100 hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-50"
    : "inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50";

  return (
    <div className={className}>
      <label
        className={
          isBanner
            ? "block text-xs font-semibold tracking-wide text-bw-300"
            : "mb-1.5 block text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase"
        }
      >
        <span className="inline-flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5" />
          Haber sitesi linki
        </span>
      </label>
      <textarea
        value={feedInput}
        onChange={(e) => setFeedInput(e.target.value)}
        rows={2}
        disabled={disabled || syncing}
        placeholder={"https://www.webtekno.com\nhttps://www.donanimhaber.com"}
        className={`${fieldClass} mt-2 min-h-[72px] resize-y`}
      />
      <p className={`mt-2 text-xs ${isBanner ? "text-bw-400" : "text-bw-500"}`}>
        Normal site linki yapıştır. Kapak = haber fotoğrafı (yazı yok, kaynak sitesi gibi durmaz). Son 100 haber.
      </p>
      {msg ? (
        <p className={`mt-3 text-sm font-medium ${isBanner ? "text-amber-100" : "text-bw-700"}`}>{msg}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={onResetAndSync} disabled={disabled || syncing} className={primaryBtn}>
          <RefreshCw className="h-4 w-4" />
          {syncing ? "İşleniyor..." : "Sil ve yeniden çek"}
        </button>
        <button type="button" onClick={onSync} disabled={disabled || syncing} className={secondaryBtn}>
          <Rss className="h-4 w-4" />
          Haberleri çek
        </button>
        <button type="button" onClick={onDeleteAll} disabled={disabled || syncing} className={dangerBtn}>
          <Trash2 className="h-4 w-4" />
          Tümünü sil
        </button>
      </div>
    </div>
  );
}
