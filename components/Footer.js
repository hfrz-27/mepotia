"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import FooterSurvey from "@/components/FooterSurvey";
import FooterWidgets from "@/components/FooterWidgets";

const EXPLORE_LINKS = [
  { href: "/teknoloji", label: "Teknoloji" },
  { href: "/", label: "Vitrin" },
  { href: "/ara", label: "Keşfet" },
  { href: "/bana-sat", label: "Ürünümü sat" },
  { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır" },
];

const LEGAL_LINKS = [
  { href: "/gizlilik", label: "Gizlilik" },
  { href: "/kvkk", label: "KVKK" },
  { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
  { href: "/sikayet", label: "Şikayet" },
];

function FooterColumn({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`border-b border-bw-200/60 py-3 last:border-0 sm:border-0 sm:py-0 ${
        open ? "rounded-2xl bg-white px-3 sm:rounded-none sm:bg-transparent sm:px-0" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-1 text-left sm:pointer-events-none"
      >
        <span className="text-[11px] font-bold tracking-[0.22em] text-bw-900 uppercase">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-bw-400 transition sm:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${open ? "mt-2 block pb-1" : "hidden"} sm:mt-4 sm:block sm:pb-0`}>{children}</div>
    </div>
  );
}

function FooterLinkList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.href + item.label}>
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-bw-600 transition hover:text-bw-950"
            >
              {item.label}
            </a>
          ) : (
            <Link
              href={item.href}
              className="group inline-flex items-center gap-1 text-sm text-bw-600 transition hover:text-bw-950"
            >
              {item.label}
              <ArrowUpRight className="h-3 w-3 text-bw-300 opacity-0 transition group-hover:opacity-100" strokeWidth={2} />
            </Link>
          )}
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
    <footer className="mt-auto border-t border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          {/* Marka bloğu */}
          <div>
            <Link href="/" aria-label="Mepotia ana sayfa" className="inline-block">
              <Logo className="h-8" />
            </Link>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-bw-500 sm:text-sm">
              Mezopotamya&apos;dan ilham alan dürüst vitrin. Şeffaf fiyat, özenli seçim, net süreç.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-bw-950 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-bw-800"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href={tel}
                className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-4 py-2 text-xs font-semibold text-bw-800 transition hover:border-bw-400"
              >
                <Phone className="h-3.5 w-3.5" />
                Ara
              </a>
              <a
                href={mail}
                className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-4 py-2 text-xs font-semibold text-bw-800 transition hover:border-bw-400"
              >
                <Mail className="h-3.5 w-3.5" />
                Mail
              </a>
            </div>
          </div>

          {/* Link sütunları */}
          <div className="grid gap-0 sm:grid-cols-3 sm:gap-x-10 lg:gap-x-12">
            <FooterColumn title="Destek" defaultOpen>
              <FooterLinkList
                items={[
                  { href: "/hakkimizda", label: "Hakkımızda" },
                  { href: "/urun-iste", label: "Ürün iste" },
                  { href: "/takas", label: "Takas" },
                  { href: "/en-cok-bakilanlar", label: "En çok bakılanlar" },
                ]}
              />
            </FooterColumn>

            <FooterColumn title="Keşfet">
              <FooterLinkList items={EXPLORE_LINKS} />
            </FooterColumn>

            <FooterColumn title="Yasal">
              <FooterLinkList items={LEGAL_LINKS} />
            </FooterColumn>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <FooterSurvey />
        </div>
      </div>

      <div className="border-t border-bw-200 bg-[#f5f5f7]">
        <FooterWidgets />
        <div className="border-t border-bw-100">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1.5 px-4 py-3.5 sm:flex-row sm:px-6 lg:px-8">
            <p className="text-xs text-bw-400">
              © {new Date().getFullYear()} Mepotia. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-bw-400">Türkiye · Türkçe</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
