"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  LogOut,
  Menu,
  PenLine,
  Search,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";
import ProductImage from "@/components/ProductImage";
import { createClient } from "@/lib/supabase";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";

const NAV = [
  { key: "magaza", label: "Mağaza", mega: true },
  { href: "/urunler", label: "Ürünler" },
  { href: "/rehber", label: "Rehber" },
  { href: "/teknoloji", label: "Teknoloji" },
  { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır" },
];

const UTILITY = [
  { href: "/rehber", label: "Destek" },
  { href: "/hakkimizda", label: "Kurumsal için", external: true },
];

const MEGA_LINKS = [
  { href: "/kategoriler", label: "Tüm kategoriler" },
  { href: "/bana-sat", label: "Bana sat" },
  { href: "/urun-iste", label: "Ürün iste" },
  { href: "/takas", label: "Cihazını takas et" },
  { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır" },
  { href: "/rehber", label: "Alım rehberi" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const menuRef = useRef(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 10;
        if (next !== scrolledRef.current) {
          scrolledRef.current = next;
          setScrolled(next);
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const sync = async (u) => {
      setUser(u);
      if (!u) {
        setIsAdmin(false);
        setNotifCount(0);
        return;
      }
      const { data } = await supabase.from("profiles").select("role").eq("id", u.id).single();
      const admin = data?.role === "admin";
      setIsAdmin(admin);
      if (!admin) {
        setNotifCount(0);
        return;
      }
      const [{ count: offerCount }, { count: reqCount }, { count: fbCount }] = await Promise.all([
        supabase.from("sell_offers").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("product_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("site_feedback").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);
      setNotifCount((offerCount || 0) + (reqCount || 0) + (fbCount || 0));
    };
    supabase.auth.getUser().then(({ data }) => sync(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      sync(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await createClient().auth.signOut();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Üst yardımcı bant */}
      <div className="hidden border-b border-black/[0.06] bg-[#f5f5f7] md:block">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="flex h-8 items-center justify-end gap-5">
            {UTILITY.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-0.5 text-[11px] font-medium text-[#6e6e73] transition hover:text-[#1d1d1f]"
              >
                {item.label}
                {item.external ? <ArrowUpRight className="h-3 w-3" strokeWidth={2} /> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Ana bant */}
      <div
        onMouseLeave={() => setMegaOpen(false)}
        className={[
          "relative border-b bg-[rgba(245,245,247,0.9)] backdrop-blur-[20px] backdrop-saturate-150 transition",
          scrolled || megaOpen ? "border-black/[0.06]" : "border-black/[0.04]",
        ].join(" ")}
      >
        <div className="relative mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          {/* Logo — desktop sol */}
          <Link
            href="/"
            className="relative z-20 hidden shrink-0 opacity-90 transition hover:opacity-100 md:inline-flex"
            aria-label="Mepotia ana sayfa"
          >
            <Logo className="h-7" priority />
          </Link>

          {/* Logo — mobil orta */}
          <Link
            href="/"
            className="absolute left-1/2 z-20 -translate-x-1/2 opacity-90 transition hover:opacity-100 md:hidden"
            aria-label="Mepotia ana sayfa"
          >
            <Logo className="h-6" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Ana menü">
            {NAV.map((item) => {
              if (item.mega) {
                return (
                  <button
                    key={item.key}
                    type="button"
                    onMouseEnter={() => setMegaOpen(true)}
                    onClick={() => setMegaOpen((v) => !v)}
                    className={[
                      "inline-flex items-center gap-0.5 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] transition",
                      megaOpen ? "text-[#1d1d1f]" : "text-[#1d1d1f]/80 hover:text-[#1d1d1f]",
                    ].join(" ")}
                    aria-expanded={megaOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={[
                        "h-3.5 w-3.5 transition",
                        megaOpen ? "rotate-180" : "",
                      ].join(" ")}
                      strokeWidth={2}
                    />
                  </button>
                );
              }
              const on = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setMegaOpen(false)}
                  className={[
                    "rounded-full px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] transition",
                    on ? "text-[#1d1d1f]" : "text-[#1d1d1f]/80 hover:text-[#1d1d1f]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Sağ aksiyonlar */}
          <div className="relative z-20 ml-auto flex w-[4.5rem] items-center justify-end gap-0.5 sm:gap-1 md:w-auto" ref={menuRef}>
            <Link
              href="/ara"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1d1d1f] transition hover:bg-black/[0.05]"
              aria-label="Ara"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.7} />
            </Link>

            {user ? (
              <button
                type="button"
                onClick={logout}
                className="hidden h-9 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-normal text-[#1d1d1f]/80 transition hover:bg-black/[0.04] hover:text-[#1d1d1f] sm:inline-flex"
              >
                <LogOut className="h-3.5 w-3.5" />
                Çıkış
              </button>
            ) : null}

            {user && isAdmin ? (
              <>
                <Link
                  href="/ilan-ver"
                  className="hidden h-8 items-center gap-1 rounded-full bg-[#1d1d1f] px-3 text-[12px] font-normal text-white sm:inline-flex"
                >
                  <PenLine className="h-3.5 w-3.5" />
                  Paylaş
                </Link>
                <Link
                  href="/admin"
                  className="relative hidden h-9 items-center rounded-full px-2.5 text-[12px] font-normal text-[#1d1d1f]/80 hover:bg-black/[0.04] sm:inline-flex"
                >
                  Yönetim
                  {notifCount > 0 ? (
                    <span className="ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1d1d1f] px-1 text-[10px] font-semibold text-white">
                      {notifCount}
                    </span>
                  ) : null}
                </Link>
              </>
            ) : null}

            {/* Mobil menü */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1d1d1f] transition hover:bg-black/[0.04] md:hidden"
              aria-label="Menü"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {menuOpen ? (
              <div className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-64 overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] md:hidden">
                {[
                  { href: "/urunler", label: "Ürünler" },
                  { href: "/kategoriler", label: "Kategoriler" },
                  { href: "/rehber", label: "Rehber" },
                  { href: "/teknoloji", label: "Teknoloji" },
                  { href: "/bana-sat", label: "Bana sat" },
                  { href: "/urun-iste", label: "Ürün iste" },
                  { href: "/takas", label: "Takas" },
                  { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır" },
                  ...(isAdmin ? [{ href: "/admin", label: "Yönetim" }] : []),
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block border-b border-black/[0.04] px-4 py-3.5 text-sm font-medium text-[#0b0b0b] last:border-0 hover:bg-[#f5f5f5]"
                  >
                    {item.label}
                  </Link>
                ))}
                {user ? (
                  <div className="border-t border-black/[0.06] p-2">
                    <button
                      type="button"
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-[#525252] hover:bg-[#f5f5f5]"
                    >
                      <LogOut className="h-4 w-4" />
                      Çıkış
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {/* Mega menü */}
        {megaOpen ? (
          <div className="absolute inset-x-0 top-full hidden border-b border-black/[0.06] bg-white shadow-[0_24px_50px_-24px_rgba(0,0,0,0.25)] md:block">
            <div className="mx-auto max-w-[1240px] px-6 py-7">
              <div className="grid grid-cols-[1fr_auto] gap-8">
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">
                    Kategoriler
                  </p>
                  <div className="grid grid-cols-4 gap-x-4 gap-y-5 lg:grid-cols-5">
                    {TECH_CATEGORY_CATALOG.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/kategori/${cat.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex flex-col items-center gap-2 text-center"
                      >
                        <span className="relative h-16 w-16 overflow-hidden rounded-full bg-[#f5f5f7] ring-1 ring-black/[0.05] transition group-hover:ring-black/15">
                          <ProductImage
                            src={cat.photo}
                            alt={cat.name}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </span>
                        <span className="text-[12px] font-medium text-[#1d1d1f] transition group-hover:text-black">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="min-w-[190px] border-l border-black/[0.07] pl-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">
                    Keşfedin
                  </p>
                  <ul className="space-y-2.5">
                    {MEGA_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMegaOpen(false)}
                          className="inline-flex items-center gap-1 text-[14px] font-medium text-[#1d1d1f] transition hover:text-black"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
