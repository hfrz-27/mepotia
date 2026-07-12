"use client";

import { useState } from "react";
import { Share2, Link2, MessageCircle, Check, Download } from "lucide-react";

export default function ShareProductButtons({ title, url, imageUrl, price }) {
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

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = proxiedImage(src);
    });

  const buildStoryCanvas = async () => {
    const W = 1080;
    const H = 1920;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, W, H);

    // Soft vignette dots
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    for (let y = 40; y < H; y += 48) {
      for (let x = 40; x < W; x += 48) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Brand
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 42px Cinzel, Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("MEPOTIA", W / 2, 140);

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "500 22px Outfit, system-ui, sans-serif";
    ctx.fillText("Güvenin ve Değerin Buluşma Noktası", W / 2, 190);

    // Product photo frame
    const frameX = 90;
    const frameY = 280;
    const frameW = W - 180;
    const frameH = 980;
    const radius = 48;

    ctx.save();
    roundRect(ctx, frameX, frameY, frameW, frameH, radius);
    ctx.clip();
    ctx.fillStyle = "#18181b";
    ctx.fillRect(frameX, frameY, frameW, frameH);

    if (imageUrl) {
      try {
        const img = await loadImage(imageUrl);
        const scale = Math.max(frameW / img.width, frameH / img.height);
        const iw = img.width * scale;
        const ih = img.height * scale;
        const ix = frameX + (frameW - iw) / 2;
        const iy = frameY + (frameH - ih) / 2;
        ctx.drawImage(img, ix, iy, iw, ih);
      } catch {
        ctx.fillStyle = "#3f3f46";
        ctx.fillRect(frameX, frameY, frameW, frameH);
      }
    }
    ctx.restore();

    // Frame border
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 3;
    roundRect(ctx, frameX, frameY, frameW, frameH, radius);
    ctx.stroke();

    // Title + price
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 48px Outfit, system-ui, sans-serif";
    const lines = wrapText(ctx, title || "Ürün", frameW - 40);
    let ty = frameY + frameH + 90;
    lines.slice(0, 3).forEach((line) => {
      ctx.fillText(line, W / 2, ty);
      ty += 58;
    });

    if (price) {
      ctx.fillStyle = "#e4e4e7";
      ctx.font = "600 40px Outfit, system-ui, sans-serif";
      ctx.fillText(price, W / 2, ty + 20);
    }

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "400 26px Outfit, system-ui, sans-serif";
    ctx.fillText("mepotia.com", W / 2, H - 120);

    return canvas;
  };

  const downloadStory = async () => {
    setSaving(true);
    try {
      const canvas = await buildStoryCanvas();
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `mepotia-hikaye-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    } finally {
      setSaving(false);
    }
  };

  const nativeShare = async () => {
    try {
      if (navigator.share && imageUrl) {
        const canvas = await buildStoryCanvas();
        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png"),
        );
        if (blob && navigator.canShare) {
          const file = new File([blob], "mepotia-hikaye.png", {
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
      {/* Örnek hikaye önizlemesi */}
      <div className="mx-auto w-full max-w-[220px]">
        <p className="mb-2 text-center text-[10px] font-semibold tracking-[0.18em] text-bw-400 uppercase">
          Örnek hikaye
        </p>
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border border-bw-900 bg-bw-950 shadow-lg shadow-bw-950/20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative flex h-full flex-col px-3 pb-4 pt-5">
            <p className="text-center font-display text-[11px] font-semibold tracking-[0.2em] text-white">
              MEPOTIA
            </p>
            <div className="mt-3 flex-1 overflow-hidden rounded-2xl border border-white/15 bg-bw-800">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-bw-400">
                  Fotoğraf yok
                </div>
              )}
            </div>
            <p className="mt-3 line-clamp-2 text-center text-[11px] font-semibold leading-snug text-white">
              {title}
            </p>
            {price ? (
              <p className="mt-1 text-center text-[10px] text-bw-300">{price}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-4 py-3 text-sm font-medium text-bw-800 hover:border-bw-950"
        >
          <Share2 className="h-4 w-4" />
          Paylaş
        </button>
        <button
          type="button"
          onClick={downloadStory}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-2xl border border-bw-300 bg-white px-4 py-3 text-sm font-medium text-bw-800 hover:border-bw-950 disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          {saving ? "Hazırlanıyor…" : "Hikaye indir"}
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
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          {copied ? "Kopyalandı" : "Linki kopyala"}
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
