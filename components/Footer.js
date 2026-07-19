"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  MessageCircleMore,
  Phone,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import FooterSurvey from "@/components/FooterSurvey";
import FooterWidgets from "@/components/FooterWidgets";

const SHOP_LINKS = [
  { href: "/urunler", label: "Tüm ürünler" },
  { href: "/kategoriler", label: "Kategoriler" },
  { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır" },
  { href: "/urun-karsilastir", label: "Model karşılaştır" },
  { href: "/rehber", label: "Satın alma rehberi" },
];

const ACTION_LINKS = [
  { href: "/bana-sat", label: "Cihazını sat" },
  { href: "/urun-iste", label: "Ürün iste" },
  { href: "/takas", label: "Takas teklifi" },
  { href: "/teknoloji", label: "Teknoloji haberleri" },
  { href: "/iletisim", label: "İletişim" },
];

const COMPANY_LINKS = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sss", label: "Sık sorulan sorular" },
  { href: "/gizlilik", label: "Gizlilik" },
  { href: "/kvkk", label: "KVKK" },
  { href: "/kullanim-sartlari", label: "Kullanım şartları" },
];

function FooterColumn({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10 py-3 last:border-0 sm:border-0 sm:py-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-1 text-left sm:pointer-events-none"
      >
        <span className="text-[10px] font-semibold tracking-[0.18em] text-white/42 uppercase">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-white/35 transition sm:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${open ? "mt-3 block pb-2" : "hidden"} sm:mt-5 sm:block sm:pb-0`}>
        {children}
      </div>
    </div>
  );
}

function FooterLinks({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-[13px] text-white/58 transition hover:text-white sm:text-[14px]"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer({ whatsapp, phone, email }) {
  const wa = whatsapp
    ? `https://wa.me/${String(whatsapp).replace(/\D/g, "")}`
    : "https://wa.me/905059574122";
  const tel = phone ? `tel:${phone}` : "tel:05300000000";
  const mail = email ? `mailto:${email}` : "mailto:info@mepotia.com";

  return (
    <footer className="mt-auto bg-[#09090c] text-white">
      <div className="relative overflow-hidden border-t border-white/10">

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:pb-14">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase">
                Mepotia · İkinci el teknoloji
              </p>
              <h2 className="mt-3 max-w-3xl text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[3.5rem]">
                Teknolojiye daha açık,
                <span className="block text-white">
                  daha güvenli bir yol.
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row lg:justify-end">
              <Link
                href="/urunler"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-black transition hover:bg-white/90"
              >
                Vitrini keşfet
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/bana-sat"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/18 bg-white/[0.06] px-6 text-[13px] font-semibold text-white transition hover:bg-white/[0.12]"
              >
                Cihazını sat
              </Link>
            </div>
          </div>

          <div className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-3 sm:gap-3">
            {[
              [BadgeCheck, "Açık ürün bilgisi", "Kondisyon ve detaylar net biçimde sunulur."],
              [ShieldCheck, "Güvenli karar", "Karşılaştır, sorunu sor ve bilinçli seçim yap."],
              [MessageCircleMore, "Doğrudan iletişim", "Mepotia ile hızlıca iletişime geç."],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-[18px] bg-white/[0.055] p-4 ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-white" strokeWidth={1.6} />
                <p className="mt-3 text-[13px] font-semibold text-white">{title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/45">{text}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-7 py-9 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr] lg:gap-x-12 lg:py-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-[2rem] font-semibold tracking-[-0.055em] text-white">MEPOTIA</p>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/45">
                Tek elden seçilmiş, durumu açıkça anlatılmış ikinci el teknoloji vitrini.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-emerald-500 px-4 text-[12px] font-semibold text-white transition hover:bg-emerald-400"
                >
                  <MessageCircleMore className="h-4 w-4" /> WhatsApp
                </a>
                <a href={tel} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:bg-white/10 hover:text-white" aria-label="Telefon">
                  <Phone className="h-4 w-4" />
                </a>
                <a href={mail} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:bg-white/10 hover:text-white" aria-label="E-posta">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <FooterColumn title="Vitrin" defaultOpen>
              <FooterLinks items={SHOP_LINKS} />
            </FooterColumn>
            <FooterColumn title="Hızlı işlemler">
              <FooterLinks items={ACTION_LINKS} />
            </FooterColumn>
            <FooterColumn title="Mepotia">
              <FooterLinks items={COMPANY_LINKS} />
            </FooterColumn>
          </div>

          <div className="rounded-[22px] bg-white p-2 text-[#1d1d1f] sm:rounded-[28px] sm:p-3">
            <FooterSurvey />
          </div>
        </div>
      </div>

      <div className="bg-[#f5f5f7] text-[#1d1d1f]">
        <FooterWidgets />
      </div>

      <div className="border-t border-white/10 bg-[#09090c]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[10px] text-white/32 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Mepotia. Tüm hakları saklıdır.</p>
          <p>Güven · Şeffaflık · Doğrudan iletişim</p>
        </div>
      </div>
    </footer>
  );
}
