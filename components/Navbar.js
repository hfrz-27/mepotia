"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, Newspaper, PenLine, Eye, X } from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

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
        const next = window.scrollY > 12;
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
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
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
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", u.id)
        .single();
      const admin = data?.role === "admin";
      setIsAdmin(admin);
      if (!admin) {
        setNotifCount(0);
        return;
      }
      const [{ count: offerCount }, { count: reqCount }, { count: fbCount }] =
        await Promise.all([
          supabase
            .from("sell_offers")
            .select("id", { count: "exact", head: true })
            .eq("status", "new"),
          supabase
            .from("product_requests")
            .select("id", { count: "exact", head: true })
            .eq("status", "new"),
          supabase
            .from("site_feedback")
            .select("id", { count: "exact", head: true })
            .eq("status", "new"),
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
      className={`sticky top-0 z-50 border-b border-[#2a2a30] bg-[#070708]/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)]" : ""
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        <div className="relative z-20 flex min-w-[5.5rem] items-center justify-start gap-1.5" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-[#2a2a30] text-zinc-200 transition hover:border-[#ff4d1a] hover:text-white"
            aria-label="Menü"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <Link
            href="/en-cok-bakilanlar"
            className="flex h-10 w-10 items-center justify-center border border-[#2a2a30] text-zinc-400 transition hover:border-[#ff4d1a] hover:text-white"
            aria-label="En çok bakılanlar"
          >
            <Eye className="h-4 w-4" />
          </Link>

          {menuOpen ? (
            <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden border border-[#2a2a30] bg-[#111114] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
              <p className="px-4 py-2.5 text-[10px] font-bold tracking-[0.2em] text-[#ff4d1a] uppercase">
                Menü
              </p>
              {[
                { href: "/", label: "Anasayfa" },
                { href: "/urunler", label: "Ürünler" },
                { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır" },
                { href: "/kategoriler", label: "Teknoloji ürünleri" },
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/bana-sat", label: "Bize Ürün Sat" },
                { href: "/urun-iste", label: "Ürün İste" },
                { href: "/iletisim", label: "İletişim" },
                ...(isAdmin ? [{ href: "/admin", label: "Yönetim", badge: notifCount }] : []),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between border-t border-[#2a2a30] px-4 py-3 text-sm font-medium transition hover:bg-[#18181c] ${
                    pathname === item.href ? "bg-[#18181c] text-white" : "text-zinc-300"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge > 0 ? (
                    <span className="flex h-5 min-w-5 items-center justify-center bg-[#ff4d1a] px-1.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
              <div className="border-t border-[#2a2a30]">
                {user ? (
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-zinc-400 hover:bg-[#18181c]"
                  >
                    <LogOut className="h-4 w-4" />
                    Çıkış
                  </button>
                ) : (
                  <Link
                    href="/giris"
                    className="block px-4 py-3 text-sm font-bold tracking-wide text-[#ff4d1a] hover:bg-[#18181c]"
                  >
                    GİRİŞ
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-x-0 flex justify-center">
          <Link href="/" className="pointer-events-auto shrink-0 logo-on-dark" aria-label="Mepotia ana sayfa">
            <Logo className="h-7 sm:h-8" priority />
          </Link>
        </div>

        <div className="relative z-10 flex min-w-[5.5rem] items-center justify-end gap-1.5 sm:min-w-[7rem]">
          <Link
            href="/teknoloji"
            className="flex h-10 w-10 items-center justify-center border border-[#2a2a30] text-zinc-400 transition hover:border-[#ff4d1a] hover:text-white"
            aria-label="Haberler"
          >
            <Newspaper className="h-4 w-4" />
          </Link>
          {user && isAdmin ? (
            <>
              <Link
                href="/ilan-ver"
                className="inline-flex items-center gap-1.5 bg-[#ff4d1a] px-2.5 py-2 text-xs font-bold tracking-wide text-white uppercase transition hover:bg-[#ff6a3d] sm:px-4 sm:text-sm"
              >
                <PenLine className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Paylaş</span>
              </Link>
              <Link
                href="/admin"
                className="relative inline-flex items-center px-2.5 py-2 text-xs font-medium text-zinc-400 transition hover:text-white sm:px-3 sm:text-sm"
              >
                Yönetim
                {notifCount > 0 ? (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center bg-[#ff4d1a] px-1.5 text-[10px] font-bold text-white">
                    {notifCount}
                  </span>
                ) : null}
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}

