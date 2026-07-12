"use client";

import { MessageCircle } from "lucide-react";

const WA = "https://wa.me/905059574122?text=" + encodeURIComponent(
  "Merhaba Mepotia, yardım almak istiyorum.",
);

export default function WhatsAppHelpButton() {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-bw-950 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)] transition hover:scale-105 hover:bg-bw-800 sm:right-6 sm:bottom-6"
      aria-label="Yardım al — WhatsApp"
      title="Yardım al"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Yardım al</span>
    </a>
  );
}
