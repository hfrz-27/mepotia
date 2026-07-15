import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Cpu,
  Eye,
  Package,
  Search,
  Sparkles,
} from "lucide-react";
import HomeSectionHeader from "@/components/HomeSectionHeader";

const TILES = [
  {
    href: "/fiyat-karsilastir",
    icon: BadgeDollarSign,
    eyebrow: "Akıllı alışveriş",
    title: "Fiyat Karşılaştır",
    text: "Mepotia fiyatını piyasa ile yan yana gör.",
    cta: "Karşılaştır",
    accent: true,
  },
  {
    href: "/teknoloji",
    icon: Cpu,
    eyebrow: "Güncel",
    title: "Teknoloji Haberleri",
    text: "Yapay zekâ, telefon ve oyun dünyasından son gelişmeler.",
    cta: "Haberler",
  },
  {
    href: "/ara",
    icon: Search,
    eyebrow: "Vitrin",
    title: "Ürün Keşfet",
    text: "Özenle seçilmiş ikinci el ürünleri filtrele ve incele.",
    cta: "Keşfet",
  },
  {
    href: "/bana-sat",
    icon: Package,
    eyebrow: "Satış",
    title: "Ürününü Sat",
    text: "Kullanmadığın ürünü paylaş, değerini birlikte bulalım.",
    cta: "Satış talebi",
  },
  {
    href: "/urun-iste",
    icon: Sparkles,
    eyebrow: "Talep",
    title: "Ürün İste",
    text: "Aradığın modeli yaz; uygun ilan çıkınca haber verelim.",
    cta: "İstek oluştur",
  },
  {
    href: "/en-cok-bakilanlar",
    icon: Eye,
    eyebrow: "Trend",
    title: "En Çok Bakılanlar",
    text: "Ziyaretçilerin en çok ilgi gösterdiği vitrin ürünleri.",
    cta: "Listeyi gör",
  },
];

function ExploreCard({ tile }) {
  const Icon = tile.icon;

  return (
    <Link
      href={tile.href}
      className={`group flex h-full flex-col rounded-2xl border bg-white p-5 transition duration-200 sm:rounded-[1.35rem] sm:p-6 lg:p-7 ${
        tile.accent
          ? "border-bw-950 shadow-[0_24px_56px_-32px_rgba(0,0,0,0.28)] ring-1 ring-bw-950"
          : "border-bw-200 hover:border-bw-400 hover:shadow-[0_24px_56px_-32px_rgba(0,0,0,0.14)]"
      }`}
    >
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-bw-950 text-white sm:mx-0">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>

      <p className="mt-4 text-center text-[10px] font-semibold tracking-[0.2em] text-bw-500 uppercase sm:text-left">
        {tile.eyebrow}
      </p>
      <h3 className="mt-1.5 text-center font-display text-xl font-semibold tracking-wide text-bw-950 sm:text-left sm:text-2xl">
        {tile.title}
      </h3>
      <p className="mt-2 flex-1 text-center text-sm leading-relaxed text-bw-600 sm:text-left">
        {tile.text}
      </p>
      <span className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-bw-950 sm:justify-start">
        {tile.cta}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function HomeExploreSection() {
  return (
    <section className="border-b border-bw-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <HomeSectionHeader
          eyebrow="Hızlı erişim"
          title="Mepotia'da nereye gitmek istersin?"
          description="Fiyat karşılaştırmadan vitrine, satıştan teknoloji haberlerine — simetrik ve hızlı erişim."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {TILES.map((tile) => (
            <ExploreCard key={tile.href} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
