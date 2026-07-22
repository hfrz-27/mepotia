"use client";

import Link from "next/link";
import { ChevronRight, Gamepad2, Headphones, Laptop, Smartphone, Sparkles, Tablet, Watch } from "lucide-react";
import { useState } from "react";

const OPTIONS = [
  { id: "telefon", label: "Telefon", copy: "Günlük kullanım", Icon: Smartphone, guideSlug: "telefon-alma-rehberi" },
  { id: "bilgisayar", label: "Bilgisayar", copy: "İş ve eğitim", Icon: Laptop, guideSlug: "bilgisayar-alma-rehberi" },
  { id: "tablet", label: "Tablet", copy: "Üretim ve eğlence", Icon: Tablet, guideSlug: "tablet-alma-rehberi" },
  { id: "kulaklik", label: "Kulaklık", copy: "Müzik ve görüşme", Icon: Headphones, guideSlug: "kulaklik-alma-rehberi" },
  { id: "oyun", label: "Oyun", copy: "Performans", Icon: Gamepad2, guideSlug: "oyun-alma-rehberi" },
  { id: "saat", label: "Akıllı saat", copy: "Sağlık ve hareket", Icon: Watch, guideSlug: "akilli-saat-alma-rehberi" },
];

export default function HomeGuideFinder({ content, image }) {
  const [selected, setSelected] = useState("telefon");
  const selectedGuideSlug = OPTIONS.find((o) => o.id === selected)?.guideSlug || "telefon-alma-rehberi";

  return (
    <section className="home-shell py-8 sm:py-12">
      <div className="overflow-hidden rounded-[28px] bg-[#eeedea] ring-1 ring-black/[.045] lg:grid lg:min-h-[600px] lg:grid-cols-[.78fr_1.22fr] lg:rounded-[36px]">
        <div className="relative min-h-[320px] overflow-hidden sm:min-h-[380px] lg:min-h-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${image || "/brand/actions/mepotia-guide-premium-v3.png"}")` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/5 to-black/35 lg:bg-gradient-to-r lg:from-black/72 lg:via-black/20 lg:to-transparent" />
          <div className="relative flex min-h-[320px] flex-col p-6 text-white sm:min-h-[380px] sm:p-9 lg:min-h-[600px] lg:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.17em] backdrop-blur-xl"><Sparkles className="h-3.5 w-3.5 text-[#64d2ff]" /> Mepotia Rehber</span>
            <div className="mt-auto max-w-md">
              <h2 className="text-[2.8rem] font-semibold leading-[.95] tracking-[-.06em] sm:text-[4rem]">{content.guide_title}</h2>
              <p className="mt-4 text-[14px] leading-relaxed text-white/68">{content.guide_copy}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-[#f7f7f8] p-3 sm:p-8 lg:p-10">
          <div className="w-full rounded-[22px] border border-black/[.05] bg-white p-4 sm:rounded-[26px] sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[.17em] text-[#0071e3]">Akıllı seçim</p>
            <h3 className="mt-2 text-[1.4rem] font-semibold leading-tight tracking-[-.045em] sm:mt-3 sm:text-[2.2rem]">Bugün ne seçmek istiyorsun?</h3>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#86868b] sm:mt-2 sm:text-[13px]">Bir kategori seç; ihtiyacına göre nelere bakman gerektiğini birlikte netleştirelim.</p>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-2.5">
              {OPTIONS.map(({ id, label, copy, Icon }) => {
                const active = selected === id;
                return (
                  <button key={id} type="button" onClick={() => setSelected(id)} aria-pressed={active} className={`group flex min-h-[72px] flex-col items-center justify-center rounded-[14px] border p-2 text-center transition duration-300 sm:min-h-[104px] sm:rounded-[16px] sm:p-2.5 ${active ? "border-[#0071e3] bg-[#eef6ff] text-[#0071e3]" : "border-black/[.055] bg-[#fafafa] text-[#424245] hover:border-black/15 hover:bg-white"}`}>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full transition sm:h-9 sm:w-9 ${active ? "bg-[#0071e3] text-white" : "bg-[#eeeeef] text-[#6e6e73] group-hover:bg-[#e7e7e9]"}`}><Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={1.6} /></span>
                    <span className="mt-1.5 text-[10px] font-semibold sm:mt-2 sm:text-[12px]">{label}</span>
                    <span className="mt-0.5 hidden text-[10px] opacity-60 sm:block">{copy}</span>
                  </button>
                );
              })}
            </div>

            <Link href={`/rehber/${selectedGuideSlug}`} className="mt-4 flex h-11 items-center justify-center gap-1 rounded-full bg-[#0071e3] px-5 text-[12px] font-semibold text-white transition hover:bg-[#0077ed] sm:mt-5 sm:h-12 sm:px-6 sm:text-[13px]">Rehberi başlat <ChevronRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
