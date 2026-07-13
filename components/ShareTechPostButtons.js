"use client";

import { useState } from "react";
import { Share2, Link2, MessageCircle, Check, Download } from "lucide-react";

export default function ShareTechPostButtons({
  title,
  excerpt = "",
  url,
  imageUrl,
  storyMode = false,
  compact = false,
}) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const shareText = [
    `📰 ${title}`,
    excerpt ? `\n${excerpt}` : "",
    "\n\n✨ Mepotia Teknoloji — Güncel haberler",
    `🔗 ${url}`,
    "\n— MEPOTIA | mepotia.com",
  ]
    .join("")
    .trim();

  const wa = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const proxiedImage = (src) => {
    if (!src) return "";
    if (src.startsWith("/") || src.startsWith("blob:")) return src;
    return `/api/proxy-image?url=${encodeURIComponent(src)}`;
  };

  const loadImage = async (src) => {
    const imgUrl = proxiedImage(src);
    try {
      const res = await fetch(imgUrl);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      try {
        return await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = objectUrl;
        });
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    } catch {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imgUrl;
      });
    }
  };

  const buildStoryCanvas = async () => {
    const W = 1080;
    const H = 1920;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, W, H);

    if (imageUrl) {
      try {
        const img = await loadImage(imageUrl);
        const scale = Math.max(W / img.width, H / img.height);
        const iw = img.width * scale;
        const ih = img.height * scale;
        ctx.drawImage(img, (W - iw) / 2, (H - ih) / 2, iw, ih);
      } catch {
        ctx.fillStyle = "#18181b";
        ctx.fillRect(0, 0, W, H);
      }
    }

    const topGrad = ctx.createLinearGradient(0, 0, 0, 480);
    topGrad.addColorStop(0, "rgba(9,9,11,0.88)");
    topGrad.addColorStop(0.55, "rgba(9,9,11,0.35)");
    topGrad.addColorStop(1, "rgba(9,9,11,0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, W, 480);

    const botGrad = ctx.createLinearGradient(0, H - 820, 0, H);
    botGrad.addColorStop(0, "rgba(9,9,11,0)");
    botGrad.addColorStop(0.35, "rgba(9,9,11,0.6)");
    botGrad.addColorStop(1, "rgba(9,9,11,0.95)");
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, H - 900, W, 900);

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 54px Cinzel, Georgia, serif";
    ctx.fillText("MEPOTIA", W / 2, 120);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "500 24px Outfit, system-ui, sans-serif";
    ctx.fillText("Teknoloji Dünyasından", W / 2, 168);

    ctx.strokeStyle = "rgba(251,191,36,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 100, 198);
    ctx.lineTo(W / 2 + 100, 198);
    ctx.stroke();

    const badge = "GÜNCEL HABER";
    ctx.font = "700 22px Outfit, system-ui, sans-serif";
    const badgeW = ctx.measureText(badge).width + 52;
    const badgeX = (W - badgeW) / 2;
    const badgeY = H - 680;
    roundRect(ctx, badgeX, badgeY, badgeW, 52, 26);
    ctx.fillStyle = "#fbbf24";
    ctx.fill();
    ctx.fillStyle = "#09090b";
    ctx.fillText(badge, W / 2, badgeY + 34);

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 52px Outfit, system-ui, sans-serif";
    const titleLines = wrapText(ctx, title || "Haber", W - 120);
    let ty = badgeY + 110;
    titleLines.slice(0, 3).forEach((line) => {
      ctx.fillText(line, W / 2, ty);
      ty += 62;
    });

    if (excerpt) {
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      ctx.font = "400 32px Outfit, system-ui, sans-serif";
      const excerptLines = wrapText(ctx, excerpt, W - 140);
      excerptLines.slice(0, 2).forEach((line) => {
        ctx.fillText(line, W / 2, ty);
        ty += 44;
      });
    }

    const ctaY = H - 200;
    roundRect(ctx, 100, ctaY, W - 200, 88, 44);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.fillStyle = "#09090b";
    ctx.font = "700 30px Outfit, system-ui, sans-serif";
    ctx.fillText("mepotia.com  ·  Haberi Oku", W / 2, ctaY + 56);

    ctx.fillStyle = "rgba(255,255,255,0.38)";
    ctx.font = "400 22px Outfit, system-ui, sans-serif";
    ctx.fillText("Güvenin ve Değerin Buluşma Noktası", W / 2, H - 82);

    return canvas;
  };

  const downloadStory = async () => {
    setSaving(true);
    try {
      const canvas = await buildStoryCanvas();
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png", 0.95),
      );
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `mepotia-haber-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    } finally {
      setSaving(false);
    }
  };

  const nativeShare = async () => {
    try {
      if ((storyMode || compact) && navigator.share) {
        const canvas = await buildStoryCanvas();
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png", 0.95),
        );
        if (blob && navigator.canShare) {
          const file = new File([blob], "mepotia-haber.png", { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `${title} — Mepotia`,
              text: shareText,
              files: [file],
            });
            return;
          }
        }
      }
      if (navigator.share) {
        await navigator.share({ title: `${title} — Mepotia`, text: shareText, url });
        return;
      }
    } catch {
      // cancelled or unsupported
    }
    copy();
  };

  const btn =
    "inline-flex items-center gap-2 rounded-2xl text-sm font-semibold transition";
  const btnDark = `${btn} bg-white text-bw-950 hover:bg-bw-100`;
  const btnOutline = `${btn} border border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10`;
  const btnLight = `${btn} border border-bw-300 bg-white px-4 py-2.5 text-bw-800 hover:border-bw-950`;

  if (compact) {
    return (
      <div
        className="flex flex-wrap gap-2"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        <button type="button" onClick={nativeShare} className={btnLight}>
          <Share2 className="h-3.5 w-3.5" />
          Paylaş
        </button>
        <a href={wa} target="_blank" rel="noreferrer" className={btnLight}>
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {storyMode ? (
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
          <div className="w-full max-w-[240px] shrink-0">
            <p className="mb-2 text-center text-[10px] font-semibold tracking-[0.18em] text-bw-400 uppercase">
              Paylaşım önizleme
            </p>
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border border-white/15 bg-bw-950 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)]">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={proxiedImage(imageUrl)}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-bw-800" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-bw-950/75 via-transparent to-bw-950/95" />
              <div className="relative flex h-full flex-col px-4 pb-5 pt-6">
                <p className="text-center font-display text-[12px] font-semibold tracking-[0.22em] text-white">
                  MEPOTIA
                </p>
                <p className="mt-1 text-center text-[8px] tracking-wide text-white/50">
                  Teknoloji Dünyasından
                </p>
                <div className="mt-auto space-y-2 text-center">
                  <span className="inline-block rounded-full bg-amber-300 px-3 py-1 text-[9px] font-bold tracking-wide text-bw-950">
                    GÜNCEL HABER
                  </span>
                  <p className="line-clamp-3 text-[11px] font-semibold leading-snug text-white">
                    {title}
                  </p>
                  {excerpt ? (
                    <p className="line-clamp-2 text-[9px] leading-relaxed text-white/75">{excerpt}</p>
                  ) : null}
                  <div className="mx-auto mt-2 rounded-full bg-white px-3 py-2 text-[9px] font-bold text-bw-950">
                    mepotia.com · Haberi Oku
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-sm space-y-3 text-center sm:pt-6 sm:text-left">
            <p className="font-display text-xl font-semibold tracking-wide text-white">
              Haberi paylaş
            </p>
            <p className="text-sm leading-relaxed text-bw-400">
              Instagram veya WhatsApp hikayesine koyabileceğin premium Mepotia reklam görseli.
              Marka, başlık ve link hazır gelir.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <button
                type="button"
                onClick={downloadStory}
                disabled={saving}
                className={`${btnDark} px-5 py-3.5 disabled:opacity-60`}
              >
                <Download className="h-4 w-4" />
                {saving ? "Hazırlanıyor…" : "Görseli indir"}
              </button>
              <button type="button" onClick={nativeShare} className={`${btnOutline} px-5 py-3.5`}>
                <Share2 className="h-4 w-4" />
                Paylaş
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`flex flex-wrap gap-2 ${storyMode ? "justify-center border-t border-white/10 pt-4 sm:justify-start" : ""}`}
      >
        {!storyMode ? (
          <button type="button" onClick={nativeShare} className={btnLight}>
            <Share2 className="h-4 w-4" />
            Paylaş
          </button>
        ) : null}
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className={storyMode ? `${btnOutline} px-4 py-3` : btnLight}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={copy}
          className={storyMode ? `${btnOutline} px-4 py-3` : btnLight}
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          {copied ? "Kopyalandı" : "Metni kopyala"}
        </button>
      </div>
    </div>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}
