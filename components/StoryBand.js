import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PILLARS = ["Kökler", "Dürüstlük", "Özen"];

export default function StoryBand() {
  return (
    <section className="border-y border-bw-200 bg-bw-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p className="text-[10px] tracking-[0.28em] text-bw-500 uppercase">Hikâye</p>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-wide text-white sm:text-2xl">
          Geçmişten Gelen Güven
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-bw-400">
          <strong className="text-bw-200">Mepotia</strong>, Mezopotamya&apos;dan ilham alır. Emek,
          sabır ve şeffaflıkla büyüyen kişisel bir ikinci el vitrin.
        </p>

        <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          {PILLARS.map((item) => (
            <span
              key={item}
              className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-bw-300"
            >
              {item}
            </span>
          ))}
        </div>

        <Link
          href="/hakkimizda"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-bw-200"
        >
          Mepotia&apos;yı tanı
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
