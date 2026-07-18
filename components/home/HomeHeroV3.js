"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

export default function HomeHeroV3({ video, images = [] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const bg = images[0];

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-black text-white">
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src={video}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : bg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.35em] text-lime-400 uppercase">
          Mepotia · 2026 market OS
        </p>
        <h1 className="max-w-5xl text-[clamp(2.8rem,9vw,7rem)] leading-[0.9] font-black tracking-tighter uppercase">
          Teknolojiyi
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "2px #a3e635" }}>
            ikinci el
          </span>
          <br />
          yeniden yaz
        </h1>

        <form
          className="mt-10 flex w-full max-w-3xl flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            const t = q.trim();
            router.push(t ? `/ara?q=${encodeURIComponent(t)}` : "/ara");
          }}
        >
          <div className="flex flex-1 items-center gap-3 border border-white/20 bg-white/5 px-4 py-4 backdrop-blur">
            <Search className="h-5 w-5 text-lime-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="iPhone, MacBook, AirPods..."
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/35"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-400 px-8 py-4 text-sm font-black tracking-wide text-black uppercase transition hover:bg-lime-300"
          >
            Ara
          </button>
        </form>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { href: "/fiyat-karsilastir", label: "Fiyat radar" },
            { href: "/urun-karsilastir", label: "Spek collab" },
            { href: "/bana-sat", label: "Cihazı sat" },
            { href: "/urun-iste", label: "Talep aç" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-xs font-bold tracking-wider text-white/80 uppercase transition hover:border-lime-400 hover:text-lime-400"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
