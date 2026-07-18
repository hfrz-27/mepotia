"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, Newspaper, User } from "lucide-react";

const TABS = [
  { href: "/", label: "Ana", icon: Home, match: (p) => p === "/" },
  { href: "/ara", label: "Ara", icon: Search, match: (p) => p?.startsWith("/ara") },
  {
    href: "/kategoriler",
    label: "Kategori",
    icon: LayoutGrid,
    match: (p) => p?.startsWith("/kategori"),
  },
  {
    href: "/teknoloji",
    label: "Haber",
    icon: Newspaper,
    match: (p) => p?.startsWith("/teknoloji"),
  },
  { href: "/giris", label: "Hesap", icon: User, match: (p) => p?.startsWith("/giris") },
];

/**
 * Instagram-tarzı alt menü — sadece mobil, premium vitrin.
 */
export default function MobileTabBar() {
  const pathname = usePathname();

  // PDP'de sticky CTA var — tab bar gizle
  if (pathname?.startsWith("/urun/")) return null;
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;
  if (pathname === "/giris" || pathname?.startsWith("/giris/")) return null;

  return (
    <>
      <div className="h-16 md:hidden" aria-hidden />
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.06] bg-white/95 backdrop-blur-xl md:hidden"
        aria-label="Mobil menü"
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const on = tab.match(pathname);
            return (
              <li key={tab.href} className="flex-1">
                <Link
                  href={tab.href}
                  className={[
                    "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition active:scale-95",
                    on ? "text-[#0b0b0b]" : "text-[#a3a3a3]",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" strokeWidth={on ? 2 : 1.5} />
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
