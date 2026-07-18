import Link from "next/link";
import {
  ArrowUpRight,
  BadgeDollarSign,
  GitCompareArrows,
  HandCoins,
  Search,
} from "lucide-react";

const OPS = [
  {
    href: "/fiyat-karsilastir",
    icon: BadgeDollarSign,
    k: "01",
    t: "Fiyat radar",
    d: "Vitrin vs mağaza — farkı saniyede gör.",
    steps: ["Model ara", "Fiyatları yan yana oku", "Karar ver"],
  },
  {
    href: "/urun-karsilastir",
    icon: GitCompareArrows,
    k: "02",
    t: "Spek collab",
    d: "2–3 cihazı tek tabloda ezberleme.",
    steps: ["Modelleri seç", "Spek oku", "Doğru olanı al"],
  },
  {
    href: "/bana-sat",
    icon: HandCoins,
    k: "03",
    t: "Cihazı sat",
    d: "Foto + model → adil teklif.",
    steps: ["Durumu yaz", "Foto yükle", "Teklifi al"],
  },
  {
    href: "/urun-iste",
    icon: Search,
    k: "04",
    t: "Talep aç",
    d: "Yoksa buluruz. Modelini bırak.",
    steps: ["Model yaz", "Bütçe ekle", "Haber bekle"],
  },
];

export default function HomeOpsV3() {
  return (
    <section className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12">
        <p className="text-[11px] font-bold tracking-[0.3em] text-lime-400 uppercase">Ops</p>
        <h2 className="mt-2 max-w-xl text-3xl font-black tracking-tight sm:text-5xl">
          Dört komut.
          <br />
          Tek vitrin.
        </h2>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {OPS.map((op) => {
            const Icon = op.icon;
            return (
              <Link
                key={op.href}
                href={op.href}
                className="group flex min-h-[240px] flex-col border border-white/10 bg-zinc-950 p-6 transition hover:border-lime-400 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center bg-lime-400 text-black">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <span className="text-xs font-black tracking-[0.25em] text-white/30">{op.k}</span>
                </div>
                <h3 className="mt-6 text-2xl font-black tracking-tight sm:text-3xl">{op.t}</h3>
                <p className="mt-2 text-sm text-white/50">{op.d}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <ol className="space-y-1 text-xs text-white/40">
                    {op.steps.map((s, i) => (
                      <li key={s}>
                        <span className="text-lime-400">{i + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                  <ArrowUpRight className="h-6 w-6 text-white/30 transition group-hover:text-lime-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
