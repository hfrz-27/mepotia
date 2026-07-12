"use client";

import { useState } from "react";
import { Share2, Link2, MessageCircle, Check } from "lucide-react";

export default function ShareProductButtons({ title, url }) {
  const [copied, setCopied] = useState(false);
  const shareText = `${title} — Mepotia\n${url}`;
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

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
        return;
      } catch {
        // user cancelled
      }
    }
    copy();
  };

  return (
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
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Kopyalandı" : "Linki kopyala"}
      </button>
    </div>
  );
}
