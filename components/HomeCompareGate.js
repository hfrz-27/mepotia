"use client";

import { BadgeDollarSign, GitCompareArrows } from "lucide-react";
import ToolExpandStack from "@/components/ToolExpandStack";

const CARDS = [
  {
    href: "/fiyat-karsilastir",
    eyebrow: "01 · Fiyat",
    short: "Fiyat",
    title: "Piyasayı gör, farkı bil",
    description:
      "Vitrin fiyatı ile mağaza fiyatlarını yan yana koy. Ne kadar makul teklif aldığını saniyeler içinde anla.",
    howItWorks:
      "Model adını yaz. Vitrin ve mağaza fiyatlarını yan yana gör, abartılı ilanı eleyin.",
    points: ["Canlı piyasa", "Mağaza farkı", "Net karar"],
    steps: [
      "Model adını ara",
      "Vitrin ve mağaza fiyatını karşılaştır",
      "Makul aralığa göre karar ver",
    ],
    benefits: [
      "Piyasa fiyatları tek bakışta",
      "Almadan önce fiyat tuzağını eleyin",
    ],
    cta: "Fiyat karşılaştır",
    icon: BadgeDollarSign,
    accent: "#1f6b4a",
  },
  {
    href: "/urun-karsilastir",
    eyebrow: "02 · Özellik",
    short: "Özellik",
    title: "Spekleri yan yana koy",
    description:
      "2–3 modeli aynı tabloda incele. Ekran, RAM, batarya ve kritik spekler tek bakışta.",
    howItWorks:
      "2–3 model seç. Ekran, RAM, batarya ve diğer spekler tek tabloda hizalanır.",
    points: ["2–3 model", "Teknik tablo", "Hızlı seçim"],
    steps: [
      "İki veya üç model seç",
      "Spek tablosunu oku",
      "Sana uyan cihazı seç",
    ],
    benefits: [
      "Sadece fiyata bakmadan teknik karar ver",
      "Alım öncesi spek farkını saniyede gör",
    ],
    cta: "Özellik karşılaştır",
    icon: GitCompareArrows,
    accent: "#111110",
  },
];

export default function HomeCompareGate() {
  return (
    <ToolExpandStack
      eyebrow="Karşılaştırma"
      title="Almadan önce netleştir"
      subtitle="Fiyat ve spek — almadan önce net karar."
      cards={CARDS}
      tone="soft"
    />
  );
}
