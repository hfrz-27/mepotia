import Link from "next/link";
import { ArrowRight, Gem, Handshake, ScrollText } from "lucide-react";

const PILLARS = [
  {
    icon: ScrollText,
    title: "Kökler",
    text: "Mezopotamya'dan ilham — ticaretin ve güvenin kadim mirası.",
  },
  {
    icon: Handshake,
    title: "Dürüstlük",
    text: "Net fiyat, gerçek görseller, doğrudan iletişim.",
  },
  {
    icon: Gem,
    title: "Özen",
    text: "Her ürün tek tek seçilir, değerini koruyarak sunulur.",
  },
];

export default function StoryBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-bw-950">
      <div className="story-band-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-bw-950 via-bw-950/98 to-bw-900/95" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.28em] text-bw-400 uppercase">Hikâye</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-white sm:text-3xl lg:text-4xl">
              Geçmişten Gelen Güven
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-bw-300 sm:text-base">
              <strong className="text-white">Mepotia</strong>, Mezopotamya&apos;dan ilham alır.
              Büyük vaatlerle değil; emek, sabır ve şeffaflıkla büyüyen kişisel bir ikinci el
              vitrin — her alışverişte güven inşa etmek için.
            </p>
            <Link
              href="/hakkimizda"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Mepotia&apos;yı tanı
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-2xl lg:flex-1">
            {PILLARS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
                  <item.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <p className="mt-3 text-xs font-semibold tracking-wide text-white uppercase">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-bw-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
