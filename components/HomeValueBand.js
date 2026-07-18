"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BadgeDollarSign,
  Handshake,
  ShieldCheck,
} from "lucide-react";

/**
 * Apple “Neden Apple Store?” tarzı — mobil uyumlu + Hakkında.
 */
const REASONS = [
  {
    icon: ShieldCheck,
    title: "Güvenle al · sat",
    text: "Şeffaf süreç, net iletişim. Her adım açık.",
  },
  {
    icon: Handshake,
    title: "Dürüst ticaret",
    text: "Net açıklama. Ne görüyorsan o.",
  },
  {
    icon: BadgeDollarSign,
    title: "Adil fiyat",
    text: "Piyasa uyumlu, değerini bilen fiyat.",
  },
  {
    icon: BadgeCheck,
    title: "Özenli seçim",
    text: "Temiz vitrin — özenle seçilmiş teknoloji.",
  },
];

export default function HomeValueBand({ embedded = false }) {
  const body = (
    <>
      <header className="mx-auto max-w-2xl px-1 text-center">
        <h2 className="text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.035em] text-[#1d1d1f] sm:text-[2.1rem] md:text-[2.5rem]">
          Neden Mepotia?
        </h2>
        <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-snug tracking-[-0.01em] text-[#6e6e73] sm:mt-2.5 sm:max-w-xl sm:text-[16px] md:text-[18px]">
          Bizden alışveriş yapmak için şimdi daha da fazla sebebiniz var.
        </p>
      </header>

      {/* Mobil: 2×2 kompakt · sm+: 2 · lg: 4 */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 lg:grid-cols-4">
        {REASONS.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-[16px] bg-white p-3 ring-1 ring-black/[0.04] sm:rounded-[22px] sm:p-5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] sm:h-11 sm:w-11">
                <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" strokeWidth={1.55} />
              </span>
              <h3 className="mt-2.5 text-[12px] font-semibold leading-snug tracking-[-0.02em] text-[#1d1d1f] sm:mt-3.5 sm:text-[17px]">
                {item.title}
              </h3>
              <p className="mt-1 flex-1 text-[11px] leading-snug text-[#6e6e73] sm:mt-1.5 sm:text-[13px] sm:leading-relaxed">
                {item.text}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col items-center gap-2.5 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
        <Link
          href="/hakkimizda"
          className="inline-flex min-h-[44px] w-full max-w-xs items-center justify-center rounded-full bg-black px-6 py-2.5 text-[13px] font-semibold text-white active:scale-[0.98] sm:w-auto sm:text-[14px]"
        >
          Hakkında
        </Link>
        <Link
          href="/urunler"
          className="inline-flex min-h-[40px] items-center gap-1 text-[13px] font-semibold text-[#1d1d1f] sm:text-[14px]"
        >
          Vitrine göz at
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
        </Link>
      </div>
    </>
  );

  if (embedded) {
    return <div className="mt-4 sm:mt-5">{body}</div>;
  }

  return (
    <section
      className="bg-[#f5f5f7] py-5 sm:py-7 md:py-9"
      aria-label="Neden Mepotia"
    >
      <div className="pv-wrap">{body}</div>
    </section>
  );
}
