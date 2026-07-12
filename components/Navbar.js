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
      <div className="relative mx-auto grid h-[4.75rem] max-w-7xl grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
        {/* Sol — Giriş / admin */}
        <div className="flex items-center justify-start gap-2">
          {isAdmin ? (
            <>
              <Link
                href="/ilan-ver"
                className="inline-flex items-center gap-1.5 rounded-xl bg-bw-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-bw-800 sm:px-4 sm:text-sm"
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
          ) : (
            <Link
              href="/giris"
              className="rounded-xl border border-bw-900 bg-bw-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800"
            >
              Giriş
            </Link>
          )}
        </div>

        {/* Orta — Logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="shrink-0" aria-label="Mepotia ana sayfa">
            <Logo className="h-8 sm:h-10" priority />
          </Link>
        </div>

        {/* Sağ — Favoriler + kısa menü */}
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <nav className="mr-1 hidden items-center gap-0.5 md:flex">
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
          <Link
            href="/favoriler"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 text-bw-600 transition hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950"
            aria-label="Favoriler"
          >
            <Heart className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
