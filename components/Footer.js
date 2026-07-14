"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import FooterSurvey from "@/components/FooterSurvey";
import FooterWidgets from "@/components/FooterWidgets";

const EXPLORE_LINKS = [
  { href: "/teknoloji", label: "Teknoloji" },
  { href: "/", label: "Vitrin" },
  { href: "/ara", label: "Keşfet" },
  { href: "/hakkimizda", label: "Hakkında" },
  { href: "/en-cok-bakilanlar", label: "En çok bakılanlar" },
  { href: "/bana-sat", label: "Ürünümü sat" },
  { href: "/urun-iste", label: "Ürün iste" },
  { href: "/iletisim", label: "İletişim" },
];

const LEGAL_LINKS = [
  { href: "/gizlilik", label: "Gizlilik" },
  { href: "/kvkk", label: "KVKK" },
  { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
  { href: "/sikayet", label: "Şikayet" },
];

function FooterGroup({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-bw-100 pb-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-bw-900 uppercase">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-bw-500 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul className={`${open ? "mt-4 block" : "hidden"} space-y-2 text-sm text-bw-500`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-bw-950">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <p className="max-w-md text-sm leading-relaxed text-bw-500">
          Mepotia adını Mezopotamya&apos;dan alır. Güvenin, emeğin ve ticaretin köklü geçmişinden
          ilham alan bu isim, bugün dürüst ve şeffaf bir ikinci el alışveriş anlayışını temsil
          eder.
        </p>
        <FooterGroup title="Keşfet" links={EXPLORE_LINKS} />
        <FooterGroup title="Yasal" links={LEGAL_LINKS} />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <FooterSurvey />
      </div>

      <FooterWidgets />

      <div className="border-t border-bw-100 text-center">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-bw-400 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Mepotia. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
