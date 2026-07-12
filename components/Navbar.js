"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PenLine, Search, Heart } from "lucide-react";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
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

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/ara?q=${encodeURIComponent(q)}` : "/ara");
  };

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
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Logo className="h-7 sm:h-8" priority />
        </Link>

        <nav className="ml-1 hidden items-center gap-1 md:flex">
          {[
            { href: "/", label: "Vitrin" },
            { href: "/ara", label: "Keşfet" },
            { href: "/hakkimizda", label: "Hakkında" },
            { href: "/iletisim", label: "İletişim" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                pathname === l.href
                  ? "bg-bw-950 text-white"
                  : "text-bw-600 hover:bg-bw-100 hover:text-bw-950"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden max-w-sm flex-1 lg:flex">
          <div className="flex w-full items-center rounded-2xl border border-bw-200 bg-bw-50 px-3.5 transition focus-within:border-bw-400 focus-within:bg-white">
            <Search className="h-4 w-4 text-bw-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün, marka ara..."
              className="w-full bg-transparent px-2.5 py-2.5 text-sm text-bw-900 outline-none placeholder:text-bw-400"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            href="/favoriler"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 text-bw-600 transition hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950"
            aria-label="Favoriler"
          >
            <Heart className="h-4 w-4" />
          </Link>

          {isAdmin ? (
            <>
              <Link
                href="/admin"
                className="hidden rounded-xl px-3 py-2 text-sm font-medium text-bw-600 transition hover:bg-bw-100 hover:text-bw-950 sm:inline"
              >
                Yönetim
              </Link>
              <Link
                href="/ilan-ver"
                className="inline-flex items-center gap-2 rounded-xl bg-bw-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800"
              >
                <PenLine className="h-4 w-4" />
                Paylaş
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
      </div>
    </header>
  );
}
