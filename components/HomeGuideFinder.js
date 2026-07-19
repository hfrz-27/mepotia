"use client";

import Link from "next/link";
import { ChevronRight, Gamepad2, Headphones, Laptop, Smartphone, Sparkles, Tablet, Watch } from "lucide-react";
import { useState } from "react";

const OPTIONS = [
  { id: "telefon", label: "Telefon", copy: "Günlük kullanım", Icon: Smartphone },
  { id: "bilgisayar", label: "Bilgisayar", copy: "İş ve eğitim", Icon: Laptop },
  { id: "tablet", label: "Tablet", copy: "Üretim ve eğlence", Icon: Tablet },
  { id: "kulaklik", label: "Kulaklık", copy: "Müzik ve görüşme", Icon: Headphones },
  { id: "oyun", label: "Oyun", copy: "Performans", Icon: Gamepad2 },
  { id: "saat", label: "Akıllı saat", copy: "Sağlık ve hareket", Icon: Watch },
];

export default function HomeGuideFinder() {
  const [selected, setSelected] = useState("telefon");

  return (
    <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
      <div className="overflow-hidden rounded-[32px] bg-[#eeedea] ring-1 ring-black/[.045] lg:grid lg:min-h-[650px] lg:grid-cols-[.78fr_1.22fr] lg:rounded-[40px]">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
          <div className="absolute inset-0 bg-[url('/brand/actions/mepotia-guide-premium-v3.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/5 to-black/35 lg:bg-gradient-to-r lg:from-black/72 lg:via-black/20 lg:to-transparent" />
          <div className="relative flex min-h-[420px] flex-col p-7 text-white sm:p-10 lg:min-h-[650px] lg:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.17em] backdrop-blur-xl"><Sparkles className="h-3.5 w-3.5 text-[#64d2ff]" /> Mepotia Rehber</span>
            <div className="mt-auto max-w-md">
              <h2 className="text-[2.8rem] font-semibold leading-[.95] tracking-[-.06em] sm:text-[4rem]">Doğru teknolojiye kısa yol.</h2>
              <p className="mt-4 text-[14px] leading-relaxed text-white/68">Teknik terimlere boğulmadan, kullanımına ve bütçene uygun seçeneği adım adım bul.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-[#f7f7f8] p-5 sm:p-8 lg:p-10">
          <div className="w-full rounded-[26px] border border-black/[.05] bg-white p-5 shadow-[0_28px_80px_-58px_rgba(0,0,0,.42)] sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[.17em] text-[#0071e3]">Akıllı seçim</p>
            <h3 className="mt-3 text-[1.7rem] font-semibold leading-tight tracking-[-.045em] sm:text-[2.2rem]">Bugün ne seçmek istiyorsun?</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#86868b]">Bir kategori seç; ihtiyacına göre nelere bakman gerektiğini birlikte netleştirelim.</p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {OPTIONS.map(({ id, label, copy, Icon }) => {
                const active = selected === id;
                return (
                  <button key={id} type="button" onClick={() => setSelected(id)} aria-pressed={active} className={`group flex min-h-[112px] flex-col items-center justify-center rounded-[18px] border p-3 text-center transition duration-300 ${active ? "border-[#0071e3] bg-[#eef6ff] text-[#0071e3] shadow-[0_12px_35px_-24px_rgba(0,113,227,.65)]" : "border-black/[.055] bg-[#fafafa] text-[#424245] hover:border-black/15 hover:bg-white"}`}>
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full transition ${active ? "bg-[#0071e3] text-white" : "bg-[#eeeeef] text-[#6e6e73] group-hover:bg-[#e7e7e9]"}`}><Icon className="h-4.5 w-4.5" strokeWidth={1.6} /></span>
                    <span className="mt-2 text-[12px] font-semibold">{label}</span>
                    <span className="mt-0.5 text-[9px] opacity-60 sm:text-[10px]">{copy}</span>
                  </button>
                );
              })}
            </div>

            <Link href={`/rehber?kategori=${selected}`} className="mt-5 flex h-12 items-center justify-center gap-1 rounded-full bg-[#0071e3] px-6 text-[13px] font-semibold text-white transition hover:bg-[#0077ed]">Rehberi başlat <ChevronRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
