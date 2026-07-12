"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PenLine, Eye, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", u.id)
        .single();
      setIsAdmin(data?.role === "admin");
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
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-bw-200 bg-white/90 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-bw-200/80 bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        {/* En sol — Menü, yanında En çok bakılanlar */}
        <div
          className="relative z-20 flex min-w-[5.5rem] items-center justify-start gap-1.5"
          ref={menuRef}
        >
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 text-bw-700 transition hover:bg-bw-50"
            aria-label="Menü"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <Link
            href="/en-cok-bakilanlar"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 text-bw-600 transition hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950"
            aria-label="En çok bakılanlar"
          >
            <Eye className="h-4 w-4" />
          </Link>

          {menuOpen ? (
            <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-2xl border border-bw-200 bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
              <p className="px-4 py-2.5 text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
                Ana Menü
              </p>
              {[
                { href: "/", label: "Anasayfa" },
                { href: "/ara", label: "Ürünler" },
                { href: "/kategoriler", label: "Kategoriler" },
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/bana-sat", label: "Bize Ürün Sat" },
                { href: "/urun-iste", label: "Ürün İste" },
                { href: "/iletisim", label: "İletişim" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block border-t border-bw-100 px-4 py-3 text-sm font-medium transition hover:bg-bw-50 ${
                    pathname === item.href
                      ? "bg-bw-50 text-bw-950"
                      : "text-bw-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-bw-100">
                {user ? (
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-bw-600 hover:bg-bw-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Çıkış
                  </button>
                ) : (
                  <Link
                    href="/giris"
                    className="block px-4 py-3 text-sm font-medium text-bw-500 hover:bg-bw-50 hover:text-bw-950"
                  >
                    Giriş
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Orta — Logo */}
        <div className="pointer-events-none absolute inset-x-0 flex justify-center">
          <Link
            href="/"
            className="pointer-events-auto shrink-0"
            aria-label="Mepotia ana sayfa"
          >
            <Logo className="h-7 sm:h-9" priority />
          </Link>
        </div>

        {/* Sağ — sadece admin kısayolları */}
        <div className="relative z-10 flex min-w-[5.5rem] items-center justify-end gap-1.5 sm:min-w-[7rem]">
          {user && isAdmin ? (
            <>
              <Link
                href="/ilan-ver"
                className="inline-flex items-center gap-1.5 rounded-xl bg-bw-950 px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-bw-800 sm:px-4 sm:text-sm"
              >
                <PenLine className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Paylaş</span>
              </Link>
              <Link
                href="/admin"
                className="hidden rounded-xl px-3 py-2 text-sm font-medium text-bw-600 transition hover:bg-bw-100 hover:text-bw-950 md:inline"
              >
                Yönetim
              </Link>
            </>
          ) : (
            <span className="w-10" aria-hidden />
          )}
        </div>
      </div>
    </header>
  );
}
