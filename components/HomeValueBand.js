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
 * Apple “Neden Apple Store?” tarzı — neden Mepotia.
 */
const REASONS = [
  {
    icon: ShieldCheck,
    title: "Güvenle al · sat",
    text: "Şeffaf süreç, net iletişim. Her adım açık; sürpriz yok.",
  },
  {
    icon: Handshake,
    title: "Dürüst ticaret",
    text: "Net açıklama ve doğru ürün bilgisi. Ne görüyorsan o.",
  },
  {
    icon: BadgeDollarSign,
    title: "Adil fiyat",
    text: "Piyasa uyumlu fiyatlandırma. Değerini bilen vitrin.",
  },
  {
    icon: BadgeCheck,
    title: "Özenli seçim",
    text: "Temiz vitrin — özenle seçilmiş ikinci el teknoloji.",
  },
];

export default function HomeValueBand({ embedded = false }) {
  const body = (
    <>
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[#1d1d1f] sm:text-[2.35rem] md:text-[2.75rem]">
          Neden Mepotia?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[14px] leading-snug tracking-[-0.01em] text-[#6e6e73] sm:mt-3 sm:text-[17px] md:text-[19px]">
          Bizden alışveriş yapmak için şimdi daha da fazla sebebiniz var.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {REASONS.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-[22px] bg-white p-5 ring-1 ring-black/[0.04] sm:rounded-[28px] sm:p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] sm:h-12 sm:w-12">
                <Icon className="h-5 w-5" strokeWidth={1.55} />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[18px]">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#6e6e73] sm:text-[14px]">
                {item.text}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <Link
          href="/urunler"
          className="inline-flex items-center gap-1 text-[14px] font-normal text-[#0066cc] transition hover:underline sm:text-[15px]"
        >
          Vitrine göz at
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
    </>
  );

  if (embedded) {
    return <div className="mt-6 sm:mt-8">{body}</div>;
  }

  return (
    <section
      className="bg-[#f5f5f7] py-12 sm:py-16 md:py-20"
      aria-label="Neden Mepotia"
    >
      <div className="pv-wrap">{body}</div>
    </section>
  );
}
