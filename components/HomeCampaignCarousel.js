"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const CONTENT = [
  { eyebrow: "Mepotia Store", title: "Teknoloji. Daha net bir seçim.", copy: "Seçilmiş ürünleri açık bilgi ve anlaşılır fiyatlarla keşfet.", href: "/urunler", action: "Ürünleri incele" },
  { eyebrow: "Mepotia’ya sat", title: "Eski cihazın yeni bir değere dönüşsün.", copy: "Modelini ve kondisyonunu paylaş, teklif sürecini başlat.", href: "/bana-sat", action: "Teklif al" },
  { eyebrow: "Mepotia Karşılaştır", title: "Farkları gör. Kararını net ver.", copy: "Fiyat ve teknik özellikleri tek ekranda yan yana getir.", href: "/urun-karsilastir", action: "Karşılaştır" },
  { eyebrow: "Mepotia Haber", title: "Teknolojinin gündemini yakından takip et.", copy: "Seçili gelişmeler, sade analizler ve stüdyo içerikleri.", href: "/teknoloji", action: "Haberleri aç" },
  { eyebrow: "Mepotia Rehber", title: "Doğru ürünü neye bakacağını bilerek seç.", copy: "Teknik ayrıntıları sadeleştiren adım adım satın alma rehberleri.", href: "/rehber", action: "Rehberi keşfet" },
];

export default function HomeCampaignCarousel({ images = [], content = {} }) {
  const slides = images.filter(Boolean).slice(0, 5).map((image, index) => ({ image, ...CONTENT[index] }));
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (!slides.length) return null;
  const go = (direction) => setActive((value) => (value + direction + slides.length) % slides.length);

  return (
    <section className="bg-[#f5f5f7] px-4 pt-4 sm:px-6 sm:pt-6" aria-label="Mepotia kampanyaları">
      <div
        className="relative mx-auto min-h-[430px] w-full max-w-[1320px] overflow-hidden rounded-[26px] bg-[#dfe3f3] text-[#1d1d1f] shadow-[0_28px_80px_-58px_rgba(0,0,0,.7)] sm:min-h-[520px] sm:rounded-[32px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, index) => (
          <div key={`${slide.image}-${index}`} className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "z-10 opacity-100" : "opacity-0"}`} aria-hidden={index !== active}>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${slide.image}")` }} role="img" aria-label="Mepotia lansman görseli" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/78" />
            <div className="relative ml-auto flex min-h-[430px] max-w-[610px] flex-col items-center justify-center px-8 py-14 text-center sm:min-h-[520px] sm:px-16 lg:mr-8">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0071e3] uppercase">{content.hero_eyebrow}</p>
              <h2 className="mt-4 text-[2.75rem] font-semibold leading-[0.94] tracking-[-0.06em] sm:text-[4.6rem]">{content.hero_title}</h2>
              <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-[#515154] sm:text-[17px]">{content.hero_copy}</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
                <Link href="/urunler" className="text-[14px] font-semibold underline underline-offset-8">{content.hero_link}</Link>
                <Link href="/urunler" className="inline-flex h-11 items-center rounded-full border border-[#1d1d1f] px-6 text-[13px] font-semibold transition hover:bg-[#1d1d1f] hover:text-white">{content.hero_action}</Link>
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 ? (
          <>
            <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-[#1d1d1f] shadow-md backdrop-blur transition hover:bg-white sm:left-5" aria-label="Önceki kampanya"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-[#1d1d1f] shadow-md backdrop-blur transition hover:bg-white sm:right-5" aria-label="Sonraki kampanya"><ChevronRight className="h-5 w-5" /></button>
            <div className="absolute right-5 bottom-5 z-20 flex items-center gap-3 rounded-full bg-black/45 px-3 py-2 backdrop-blur-md">
              <div className="flex gap-1.5">{slides.map((_, index) => <button key={index} type="button" onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} aria-label={`${index + 1}. kampanya`} />)}</div>
              <span className="text-[11px] font-semibold tabular-nums text-white/75">{active + 1}/{slides.length}</span>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
