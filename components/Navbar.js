"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PenLine, Heart } from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        {/* Sol — Favoriler */}
        <div className="flex min-w-[5.5rem] items-center justify-start gap-1 sm:min-w-[7rem]">
          <Link
            href="/favoriler"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 text-bw-600 transition hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950"
            aria-label="Favoriler"
          >
            <Heart className="h-4 w-4" />
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex">
            {[
              { href: "/ara", label: "Keşfet" },
              { href: "/hakkimizda", label: "Hakkında" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  pathname === l.href
                    ? "bg-bw-100 text-bw-950"
                    : "text-bw-500 hover:bg-bw-50 hover:text-bw-950"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Orta — Logo (absolute center, overlap yok) */}
        <div className="pointer-events-none absolute inset-x-0 flex justify-center">
          <Link
            href="/"
            className="pointer-events-auto shrink-0"
            aria-label="Mepotia ana sayfa"
          >
            <Logo className="h-7 sm:h-9" priority />
          </Link>
        </div>

        {/* Sağ — Giriş / Kayıt / admin */}
        <div className="relative z-10 flex min-w-[5.5rem] items-center justify-end gap-1.5 sm:min-w-[7rem] sm:gap-2">
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
              <button
                type="button"
                onClick={logout}
                aria-label="Çıkış"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 text-bw-500 hover:bg-bw-50"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : user ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-800 transition hover:bg-bw-50 sm:px-4 sm:text-sm"
            >
              Çıkış
            </button>
          ) : (
            <>
              <Link
                href="/giris"
                className="rounded-xl border border-bw-300 bg-white px-2.5 py-2 text-xs font-semibold text-bw-900 transition hover:border-bw-950 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Giriş
              </Link>
              <Link
                href="/kayit"
                className="rounded-xl border border-bw-900 bg-bw-950 px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-bw-800 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Kayıt
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
