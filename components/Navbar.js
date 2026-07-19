"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, PenLine, Search, X } from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

const NAV = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/kategoriler", label: "Kategoriler" },
  { href: "/rehber", label: "Rehber" },
  { href: "/teknoloji", label: "Teknoloji" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "h-14 border-b border-black/[0.06] bg-[rgba(245,245,247,0.82)] shadow-none backdrop-blur-[20px] backdrop-saturate-150 sm:h-[3.75rem]"
          : "h-14 border-b border-transparent bg-[rgba(245,245,247,0.88)] pt-1 backdrop-blur-[20px] backdrop-saturate-150 sm:h-16 sm:pt-1.5",
      ].join(" ")}
    >
      <div className="relative mx-auto flex h-full max-w-[980px] items-center justify-between gap-3 px-4 sm:max-w-[1080px] sm:px-5 lg:max-w-[1200px] lg:px-6">
        {/* Sol boşluk — mobilde logo ortada kalsın diye dengeler */}
        <div className="z-10 w-[4.5rem] shrink-0 md:w-auto md:min-w-0">
          <Link
            href="/"
            className="relative z-20 hidden shrink-0 opacity-90 transition hover:opacity-100 md:inline-flex"
            aria-label="Mepotia ana sayfa"
          >
            <Logo className="h-7" priority />
          </Link>
        </div>

        {/* Logo — mobilde tam ortada, desktop’ta sol tarafta (yukarıda) */}
        <Link
          href="/"
          className="absolute left-1/2 z-20 -translate-x-1/2 opacity-90 transition hover:opacity-100 md:hidden"
          aria-label="Mepotia ana sayfa"
        >
          <Logo className="h-6" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="absolute inset-x-0 hidden items-center justify-center gap-0.5 md:flex" aria-label="Ana menü">
          {NAV.map((item) => {
            const on = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-3 py-1.5 text-[12px] font-normal tracking-[-0.01em] transition",
                  on ? "text-[#1d1d1f]" : "text-[#1d1d1f]/80 hover:text-[#1d1d1f]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="relative z-20 ml-auto flex w-[4.5rem] items-center justify-end gap-0.5 sm:gap-1 md:w-auto" ref={menuRef}>
          <Link
            href="/ara"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1d1d1f] transition hover:bg-black/[0.04]"
            aria-label="Ara"
          >
            <Search className="h-4 w-4" strokeWidth={1.6} />
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

          {/* Mobile menu */}
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
                ...NAV,
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
    </header>
  );
}
