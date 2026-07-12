"use client";

import { useState } from "react";
import { Share2, Link2, MessageCircle, Check, Download } from "lucide-react";

export default function ShareProductButtons({
  title,
  url,
  imageUrl,
  price,
  storyMode = false,
}) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const shareText = `${title}${price ? ` — ${price}` : ""} — Mepotia\n${url}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
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
    const url = proxiedImage(src);
    try {
      const res = await fetch(url);
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
        img.src = url;
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

    // Base
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, W, H);

    // Full-bleed product photo
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

    // Top gradient — hafif, ürün görünsün
    const topGrad = ctx.createLinearGradient(0, 0, 0, 420);
    topGrad.addColorStop(0, "rgba(9,9,11,0.72)");
    topGrad.addColorStop(0.5, "rgba(9,9,11,0.2)");
    topGrad.addColorStop(1, "rgba(9,9,11,0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, W, 420);

    // Bottom gradient — yazı alanı
    const botGrad = ctx.createLinearGradient(0, H - 680, 0, H);
    botGrad.addColorStop(0, "rgba(9,9,11,0)");
    botGrad.addColorStop(0.4, "rgba(9,9,11,0.55)");
    botGrad.addColorStop(1, "rgba(9,9,11,0.92)");
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, H - 780, W, 780);

    // Brand top
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 54px Cinzel, Georgia, serif";
    ctx.fillText("MEPOTIA", W / 2, 130);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "500 24px Outfit, system-ui, sans-serif";
    ctx.fillText("Güvenin ve Değerin Buluşma Noktası", W / 2, 180);

    // Thin brand rule
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 90, 210);
    ctx.lineTo(W / 2 + 90, 210);
    ctx.stroke();

    // Ad badge — VİTRİNDE
    const badge = "VİTRİNDE";
    ctx.font = "700 22px Outfit, system-ui, sans-serif";
    const badgeW = ctx.measureText(badge).width + 48;
    const badgeX = (W - badgeW) / 2;
    const badgeY = H - 620;
    roundRect(ctx, badgeX, badgeY, badgeW, 52, 26);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.fillStyle = "#09090b";
    ctx.textAlign = "center";
    ctx.fillText(badge, W / 2, badgeY + 34);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 56px Outfit, system-ui, sans-serif";
    const lines = wrapText(ctx, title || "Ürün", W - 140);
    let ty = badgeY + 130;
    lines.slice(0, 3).forEach((line) => {
      ctx.fillText(line, W / 2, ty);
      ty += 66;
    });

    // Price — big ad number
    if (price) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 72px Outfit, system-ui, sans-serif";
      ctx.fillText(price, W / 2, ty + 40);
      ty += 90;
    }

    // CTA bar
    const ctaY = H - 220;
    roundRect(ctx, 120, ctaY, W - 240, 88, 44);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.fillStyle = "#09090b";
    ctx.font = "700 30px Outfit, system-ui, sans-serif";
    ctx.fillText("mepotia.com  ·  İncele", W / 2, ctaY + 56);

    // Footer whisper
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "400 22px Outfit, system-ui, sans-serif";
    ctx.fillText("Kişisel ikinci el vitrin", W / 2, H - 90);

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
      a.download = `mepotia-reklam-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    } finally {
      setSaving(false);
    }
  };

  const nativeShare = async () => {
    try {
      if (storyMode && navigator.share) {
        const canvas = await buildStoryCanvas();
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png", 0.95),
        );
        if (blob && navigator.canShare) {
          const file = new File([blob], "mepotia-reklam.png", {
            type: "image/png",
          });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title,
              text: shareText,
              files: [file],
            });
            return;
          }
        }
      }
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
        return;
      }
    } catch {
      // cancelled or unsupported
    }
    copy();
  };

  return (
    <div className="space-y-4">
      {storyMode ? (
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
          {/* Reklam hikaye önizleme */}
          <div className="w-full max-w-[240px] shrink-0">
            <p className="mb-2 text-center text-[10px] font-semibold tracking-[0.18em] text-bw-400 uppercase">
              Reklam hikaye
            </p>
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border border-bw-900 bg-bw-950 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]">
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
              <div className="absolute inset-0 bg-gradient-to-b from-bw-950/60 via-transparent to-bw-950/90" />
              <div className="relative flex h-full flex-col px-4 pb-5 pt-6">
                <p className="text-center font-display text-[12px] font-semibold tracking-[0.22em] text-white">
                  MEPOTIA
                </p>
                <p className="mt-1 text-center text-[8px] tracking-wide text-white/50">
                  Güvenin ve Değerin Buluşma Noktası
                </p>
                <div className="mt-auto space-y-2 text-center">
                  <span className="inline-block rounded-full bg-white px-3 py-1 text-[9px] font-bold tracking-wide text-bw-950">
                    VİTRİNDE
                  </span>
                  <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-white">
                    {title}
                  </p>
                  {price ? (
                    <p className="text-[16px] font-bold text-white">{price}</p>
                  ) : null}
                  <div className="mx-auto mt-2 rounded-full bg-white px-3 py-2 text-[9px] font-bold text-bw-950">
                    mepotia.com · İncele
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-sm space-y-3 text-center sm:pt-8 sm:text-left">
            <p className="font-display text-xl font-semibold tracking-wide text-bw-950">
              Hikaye reklamı
            </p>
            <p className="text-sm leading-relaxed text-bw-500">
              Instagram / WhatsApp hikayesine koyabileceğin dikey reklam
              görseli. İndir veya doğrudan paylaş.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <button
                type="button"
                onClick={downloadStory}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-60"
              >
                <Download className="h-4 w-4" />
                {saving ? "Hazırlanıyor…" : "Reklamı indir"}
              </button>
              <button
                type="button"
                onClick={nativeShare}
                className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-5 py-3.5 text-sm font-medium text-bw-800 hover:border-bw-950"
              >
                <Share2 className="h-4 w-4" />
                Paylaş
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {!storyMode ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={nativeShare}
            className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-4 py-3 text-sm font-medium text-bw-800 hover:border-bw-950"
          >
            <Share2 className="h-4 w-4" />
            Paylaş
          </button>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-4 py-3 text-sm font-medium text-bw-800 hover:border-bw-950"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-4 py-3 text-sm font-medium text-bw-800 hover:border-bw-950"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
            {copied ? "Kopyalandı" : "Linki kopyala"}
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 border-t border-bw-100 pt-4 sm:justify-start">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-4 py-3 text-sm font-medium text-bw-800 hover:border-bw-950"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-4 py-3 text-sm font-medium text-bw-800 hover:border-bw-950"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
            {copied ? "Kopyalandı" : "Linki kopyala"}
          </button>
        </div>
      )}
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
