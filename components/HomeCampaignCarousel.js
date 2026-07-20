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
  const usesImageButtons = !String(content.hero_title || "").trim() && !String(content.hero_copy || "").trim();

  return (
    <section className="home-shell pt-3 sm:pt-5" aria-label="Mepotia kampanyaları">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-[#dfe3f3] text-[#1d1d1f] ring-1 ring-black/[.04] sm:aspect-auto sm:min-h-[480px] sm:rounded-[30px] lg:min-h-[520px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, index) => (
          <div key={`${slide.image}-${index}`} className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "z-10 opacity-100" : "opacity-0"}`} aria-hidden={index !== active}>
            <div className="absolute inset-0 bg-contain bg-center bg-no-repeat sm:bg-cover" style={{ backgroundImage: `url("${slide.image}")` }} role="img" aria-label="Mepotia lansman görseli" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/78" />
            <div className="relative ml-auto flex h-full min-h-0 max-w-[610px] flex-col items-center justify-center px-5 py-4 text-center sm:h-auto sm:min-h-[480px] sm:px-16 sm:py-9 lg:mr-8 lg:min-h-[520px]">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0071e3] uppercase">{content.hero_eyebrow}</p>
              <h2 className="mt-3 text-[2.3rem] font-semibold leading-[0.94] tracking-[-0.06em] sm:mt-4 sm:text-[4.2rem]">{content.hero_title}</h2>
              <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-[#515154] sm:text-[17px]">{content.hero_copy}</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
                <Link href="/urunler" className="text-[14px] font-semibold underline underline-offset-8">{content.hero_link}</Link>
                <Link href="/urunler" className="inline-flex h-11 items-center rounded-full border border-[#1d1d1f] px-6 text-[13px] font-semibold transition hover:bg-[#1d1d1f] hover:text-white">{content.hero_action}</Link>
              </div>
            </div>
            {usesImageButtons ? (
              <>
                <div className="absolute inset-0 z-20 hidden sm:block">
                  <Link href="/urunler" aria-label="Ürünleri keşfet" title="Ürünleri keşfet" className="absolute left-[7%] top-[75%] h-[11%] w-[13.5%] rounded-[12px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]" />
                  <Link href="#neden-mepotia" aria-label="Neden Mepotia?" title="Neden Mepotia?" className="absolute left-[21%] top-[75%] h-[11%] w-[13.5%] rounded-[12px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]" />
                </div>
                <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-center gap-2 sm:hidden">
                  <Link href="/urunler" className="inline-flex h-10 items-center rounded-full bg-[#1d1d1f] px-4 text-[12px] font-semibold text-white">Ürünleri keşfet</Link>
                  <Link href="#neden-mepotia" className="inline-flex h-10 items-center rounded-full bg-white/90 px-4 text-[12px] font-semibold text-[#1d1d1f] ring-1 ring-black/10 backdrop-blur">Neden Mepotia?</Link>
                </div>
              </>
            ) : null}
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
