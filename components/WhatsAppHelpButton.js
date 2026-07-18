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
      className="fixed right-4 bottom-[5.25rem] z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-[#0b0b0b] text-white shadow-[0_12px_32px_-10px_rgba(0,0,0,0.4)] transition hover:scale-105 hover:bg-[#262626] active:scale-95 md:right-6 md:bottom-6 md:h-14 md:w-14"
      aria-label="Yardım al — WhatsApp"
      title="Yardım al"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Yardım al</span>
    </a>
  );
}
