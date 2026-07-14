import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StoryBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-bw-950">
      <div className="story-band-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-bw-950 via-bw-950/98 to-bw-900/95" />

      <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.28em] text-bw-400 uppercase">Hikâye</p>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-wide text-white sm:text-2xl">
              Geçmişten Gelen Güven
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-bw-300">
              <strong className="text-white">Mepotia</strong>, Mezopotamya&apos;dan ilham alır.
              Büyük vaatlerle değil; emek, sabır ve şeffaflıkla büyüyen kişisel bir ikinci el
              vitrin — her alışverişte güven inşa etmek için.
            </p>
          </div>
          <Link
            href="/hakkimizda"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Mepotia&apos;yı tanı
            <ArrowRight className="h-4 w-4" />
          </Link>
          </div>
        </div>
    </section>
  );
}
