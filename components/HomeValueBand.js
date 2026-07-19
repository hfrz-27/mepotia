"use client";

import Link from "next/link";
import {
  BadgeCheck,
  BadgeDollarSign,
  Handshake,
  ShieldCheck,
} from "lucide-react";

/**
 * Samsung "Daha kazançlı çıkın" tarzı — sol başlık + sağ buton, ikonlu kartlar.
 */
const REASONS = [
  {
    icon: ShieldCheck,
    title: "Güvenle al · sat",
    text: "Şeffaf süreç, net iletişim. Her adım açık.",
    href: "/hakkimizda",
  },
  {
    icon: Handshake,
    title: "Dürüst ticaret",
    text: "Net açıklama. Ne görüyorsan o.",
    href: "/hakkimizda",
  },
  {
    icon: BadgeDollarSign,
    title: "Adil fiyat",
    text: "Piyasa uyumlu, değerini bilen fiyat.",
    href: "/fiyat-karsilastir",
  },
  {
    icon: BadgeCheck,
    title: "Özenli seçim",
    text: "Temiz vitrin — özenle seçilmiş teknoloji.",
    href: "/urunler",
  },
];

export default function HomeValueBand({ embedded = false, coverUrl = null }) {
  const body = (
    <>
      <header className="relative flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <h2 className="text-[1.35rem] font-bold leading-[1.15] tracking-[-0.035em] text-[#1d1d1f] sm:text-[2.1rem] md:text-[2.5rem]">
            Mepotia&apos;dan alın. Daha kazançlı çıkın.
          </h2>
          <p className="mt-1.5 max-w-xl text-[13px] leading-snug tracking-[-0.01em] text-[#6e6e73] sm:mt-2 sm:text-[15px]">
            Bizden alışveriş yapmak için şimdi daha da fazla sebebiniz var.
          </p>
        </div>
        <Link
          href="/hakkimizda"
          className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-[#1d1d1f]/25 bg-white px-5 py-2 text-[13px] font-semibold text-[#1d1d1f] transition hover:border-[#1d1d1f] active:scale-[0.98] sm:text-[14px]"
        >
          Daha fazla bilgi
        </Link>
      </header>

      {/* Mobil: 2×2 kompakt · lg: 4 */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 lg:grid-cols-4">
        {REASONS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group flex h-full flex-col rounded-[16px] border border-black/[0.08] bg-white p-3.5 transition hover:border-black/20 hover:shadow-md sm:rounded-[18px] sm:p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-blue-50 text-blue-600 sm:h-14 sm:w-14 sm:rounded-[14px]">
                <Icon className="h-4.5 w-4.5 sm:h-6 sm:w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-3 text-[13px] font-bold leading-snug tracking-[-0.02em] text-[#1d1d1f] sm:mt-5 sm:text-[19px]">
                {item.title}
              </h3>
              <p className="mt-1.5 flex-1 text-[11px] leading-snug text-[#52525b] sm:mt-2.5 sm:text-[14px] sm:leading-relaxed">
                {item.text}
              </p>
              <span className="mt-3 text-[11px] font-semibold text-[#1d1d1f] underline underline-offset-4 transition group-hover:text-blue-600 sm:mt-5 sm:text-[13px]">
                Daha fazla bilgi
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );

  if (embedded) {
    return <div className="mt-4 sm:mt-5">{body}</div>;
  }

  return (
    <section
      className="relative overflow-hidden bg-[#f5f5f7] py-5 sm:py-7 md:py-9"
      aria-label="Neden Mepotia"
    >
      {coverUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="pv-wrap relative">{body}</div>
    </section>
  );
}
