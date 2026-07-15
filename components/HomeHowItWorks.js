import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Handshake, Search, ShoppingBag } from "lucide-react";
import HomeSectionHeader from "@/components/HomeSectionHeader";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Keşfet",
    text: "Vitrinde ara, kategorilere göz at veya popüler ilanlara bak.",
  },
  {
    step: "02",
    icon: BadgeDollarSign,
    title: "Karşılaştır",
    text: "Mepotia fiyatını piyasa ile yan yana gör, bilinçli karar ver.",
  },
  {
    step: "03",
    icon: ShoppingBag,
    title: "Güvenle al",
    text: "Şeffaf açıklama ve net fiyatla güvenli ikinci el alışveriş.",
  },
  {
    step: "04",
    icon: Handshake,
    title: "Sat veya iste",
    text: "Ürününü değerlendir ya da aradığın model için talep oluştur.",
  },
];

export default function HomeHowItWorks() {
  return (
    <section className="border-y border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <HomeSectionHeader
          eyebrow="Nasıl çalışır"
          title="Dört adımda Mepotia deneyimi"
          description="Keşfet, karşılaştır, güvenle al — satış ve talep süreçleri de aynı şeffaflıkla."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="relative flex h-full flex-col rounded-2xl border border-bw-200 bg-bw-50/50 p-5 text-center sm:rounded-[1.35rem] sm:p-6"
            >
              <span className="mx-auto text-[10px] font-bold tracking-[0.28em] text-bw-400">
                {item.step}
              </span>
              <span className="mx-auto mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-bw-950 text-white">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-wide text-bw-950 sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-bw-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
          <Link
            href="/fiyat-karsilastir"
            className="inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-bw-800"
          >
            Fiyat karşılaştır
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/ara"
            className="inline-flex items-center gap-2 rounded-2xl border border-bw-200 bg-white px-5 py-3 text-sm font-semibold text-bw-900 transition hover:border-bw-400"
          >
            Vitrini keşfet
          </Link>
        </div>
      </div>
    </section>
  );
}
