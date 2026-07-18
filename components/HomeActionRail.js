"use client";

import { HandCoins, Search } from "lucide-react";
import ToolExpandStack from "@/components/ToolExpandStack";

const CARDS = [
  {
    href: "/bana-sat",
    eyebrow: "01 · Satış",
    short: "Bana sat",
    title: "Ürününü bana sat",
    description:
      "Elinde cihaz varsa hızlı ve adil teklif al. Fotoğraf + model, net dönüş.",
    howItWorks:
      "Model ve durumunu yaz, fotoğraf ekle. Kısa sürede adil teklif alırsın.",
    points: ["Hızlı teklif", "Adil fiyat", "Kolay süreç"],
    steps: [
      "Model ve durumunu yaz",
      "Fotoğraf ekle, formu gönder",
      "Teklifi al ve onayla",
    ],
    benefits: [
      "Pazarlık yormadan net fiyat aralığı",
      "Güvenli ve hızlı satış yolu",
    ],
    cta: "Teklif al",
    icon: HandCoins,
    accent: "#1f6b4a",
  },
  {
    href: "/urun-iste",
    eyebrow: "02 · Talep",
    short: "Ürün iste",
    title: "Aradığın ürünü iste",
    description:
      "Vitrinde yoksa modelini yaz. Senin için arayalım, uygun ilan çıkınca haber verelim.",
    howItWorks:
      "Model ve bütçeni yaz. Uygun ilan çıkınca haber veririz.",
    points: ["Model yaz", "Biz bulalım", "Haber ver"],
    steps: [
      "Model ve tercihlerini yaz",
      "Bütçe notunu ekle",
      "Uygun ürün gelince haber al",
    ],
    benefits: [
      "Vitrinde olmayan ürünleri talep et",
      "Zaman kaybetmeden doğru modele ulaş",
    ],
    cta: "İstek gönder",
    icon: Search,
    accent: "#111110",
  },
];

export default function HomeActionRail() {
  return (
    <ToolExpandStack
      eyebrow="Al · Sat"
      title="Sat veya iste"
      subtitle="Satış teklifi veya ürün talebi — tek tıkla başla."
      cards={CARDS}
      tone="white"
    />
  );
}
