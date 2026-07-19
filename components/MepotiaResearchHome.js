import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  CircleDollarSign,
  Headphones,
  Laptop,
  MessageCircleMore,
  RefreshCcw,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage } from "@/lib/productDisplay";

const CATEGORY_META = {
  telefon: { icon: Smartphone, image: "/brand/categories/mepotia-phone-v2.webp" },
  bilgisayar: { icon: Laptop, image: "/brand/categories/mepotia-computer-v2.webp" },
  tablet: { icon: Smartphone, image: "/brand/categories/mepotia-accessories-v2.webp" },
  kulaklik: { icon: Headphones, image: "/brand/categories/mepotia-gaming-v2.webp" },
  aksesuar: { icon: RefreshCcw, image: "/brand/categories/mepotia-accessories-v2.webp" },
  "oyun-konsol": { icon: Headphones, image: "/brand/categories/mepotia-gaming-v2.webp" },
};

const FALLBACK_CATEGORIES = [
  { slug: "telefon", name: "Telefon" },
  { slug: "bilgisayar", name: "Bilgisayar" },
  { slug: "tablet", name: "Tablet" },
  { slug: "kulaklik", name: "Kulaklık" },
  { slug: "aksesuar", name: "Aksesuar" },
  { slug: "oyun-konsol", name: "Oyun" },
];

const FEATURE_CARDS = [
  {
    eyebrow: "Telefon",
    title: "Günlük hayatına hazır.",
    copy: "Kondisyonu net anlatılmış, özenle seçilmiş akıllı telefonlar.",
    image: "/brand/categories/mepotia-phone-v2.webp",
    href: "/kategori/telefon",
    dark: false,
  },
  {
    eyebrow: "Bilgisayar",
    title: "İşine güç kat.",
    copy: "Okul, iş ve üretkenlik için dengeli bilgisayar seçenekleri.",
    image: "/brand/categories/mepotia-computer-v2.webp",
    href: "/kategori/bilgisayar",
    dark: false,
  },
  {
    eyebrow: "Oyun",
    title: "Oyuna hazır ol.",
    copy: "Konsol, kontrolcü ve oyuncu ekipmanlarını tek vitrinde keşfet.",
    image: "/brand/categories/mepotia-gaming-v2.webp",
    href: "/kategori/oyun-konsol",
    dark: true,
  },
];

const TRUST = [
  { icon: BadgeCheck, title: "Net ürün bilgisi", text: "Kondisyon ve bilinen detaylar açıkça anlatılır." },
  { icon: ShieldCheck, title: "Seçilmiş vitrin", text: "İlan kalabalığı yerine kontrollü ürün sunumu." },
  { icon: MessageCircleMore, title: "Doğrudan iletişim", text: "Sorunu doğrudan Mepotia’ya sor, cevabını al." },
  { icon: CircleDollarSign, title: "Karşılaştırılabilir fiyat", text: "Fiyatı ve özellikleri görerek bilinçli karar ver." },
];

function BlueLink({ href, children }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-[14px] font-medium text-[#0066cc] transition hover:underline">
      {children}<ChevronRight className="h-4 w-4" strokeWidth={2} />
    </Link>
  );
}

function ProductRail({ products }) {
  if (!products.length) return null;
  return (
    <section className="py-12 sm:py-16" aria-label="Son ürünler">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[2rem] font-semibold leading-none tracking-[-0.045em] sm:text-[3rem]">Son eklenenler. <span className="text-black/38">Vitrine yeni geldi.</span></h2>
          <BlueLink href="/urunler">Tümü</BlueLink>
        </div>
        <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.slice(0, 10).map((product) => (
            <Link key={product.id} href={`/urun/${product.id}`} className="group min-h-[430px] w-[280px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:w-[330px] sm:p-7">
              <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[#f5f5f7]">
                <ProductImage src={getPrimaryImage(product)} alt={product.title} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-5 text-[10px] font-semibold tracking-[0.12em] text-[#b15d00] uppercase">Yeni</p>
              <h3 className="mt-1 line-clamp-2 text-[18px] font-semibold leading-tight tracking-[-0.025em]">{product.title}</h3>
              <p className="mt-2 text-[13px] text-[#6e6e73]">{product.price != null ? formatPrice(product.price) : "Fiyat için iletişime geç"}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MepotiaResearchHome({ categories = [], products = [] }) {
  const categoryMap = new Map(categories.map((item) => [item.slug, item]));
  const categoryItems = FALLBACK_CATEGORIES.map((fallback) => ({
    ...fallback,
    ...(categoryMap.get(fallback.slug) || {}),
    ...CATEGORY_META[fallback.slug],
  }));

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <section className="mx-auto max-w-[1200px] px-4 pt-12 sm:px-6 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <h1 className="max-w-4xl text-[3rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[5.4rem]">
            Mepotia Store. <span className="text-black/38">Teknolojiyi seçmenin daha net yolu.</span>
          </h1>
          <div className="space-y-4 lg:pb-2">
            <Link href="/bana-sat" className="flex items-center gap-3 text-[14px] font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"><RefreshCcw className="h-4 w-4" /></span>
              Cihazını satmak için teklif al <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/ara" className="flex items-center gap-3 text-[14px] font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"><Search className="h-4 w-4" /></span>
              Aradığın ürünü hemen bul <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex snap-x gap-6 overflow-x-auto pb-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-16">
          {categoryItems.map(({ slug, name, image, icon: Icon }) => (
            <Link key={slug} href={`/kategori/${slug}`} className="group w-[116px] shrink-0 snap-start text-center">
              <span className="relative mx-auto block h-[92px] w-[116px] overflow-hidden rounded-[18px] bg-white">
                <Image src={image} alt="" fill sizes="116px" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold">{name}<Icon className="hidden h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="text-[2rem] font-semibold tracking-[-0.045em] sm:text-[3rem]">Öne çıkanlar. <span className="text-black/38">Doğru ürüne kısa yol.</span></h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {FEATURE_CARDS.map((card) => (
              <Link key={card.title} href={card.href} className={["group relative min-h-[520px] overflow-hidden rounded-[28px] p-7 shadow-[0_10px_35px_rgba(0,0,0,0.07)] sm:p-9", card.dark ? "bg-black text-white" : "bg-white"].join(" ")}>
                <Image src={card.image} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                <span className={card.dark ? "absolute inset-0 bg-gradient-to-b from-black/80 via-black/5 to-black/20" : "absolute inset-0 bg-gradient-to-b from-white via-white/65 to-transparent"} />
                <div className="relative">
                  <p className={["text-[11px] font-semibold tracking-[0.12em] uppercase", card.dark ? "text-white/45" : "text-black/42"].join(" ")}>{card.eyebrow}</p>
                  <h3 className="mt-2 text-[2rem] font-semibold leading-none tracking-[-0.045em] sm:text-[2.5rem]">{card.title}</h3>
                  <p className={["mt-3 max-w-sm text-[14px] leading-relaxed", card.dark ? "text-white/58" : "text-black/55"].join(" ")}>{card.copy}</p>
                  <span className={["mt-5 inline-flex items-center gap-1 text-[14px] font-medium", card.dark ? "text-[#2997ff]" : "text-[#0066cc]"].join(" ")}>İncele<ChevronRight className="h-4 w-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductRail products={products} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="text-[2rem] font-semibold tracking-[-0.045em] sm:text-[3rem]">Neden Mepotia? <span className="text-black/38">Kararını kolaylaştıran detaylar.</span></h2>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {TRUST.map(({ icon: Icon, title, text }) => (
              <article key={title} className="min-h-[230px] rounded-[24px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-7">
                <Icon className="h-7 w-7" strokeWidth={1.55} />
                <h3 className="mt-7 text-[17px] font-semibold tracking-[-0.025em] sm:text-[20px]">{title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6e6e73] sm:text-[14px]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-20">
        <div className="mx-auto grid max-w-[1200px] overflow-hidden bg-black text-white lg:grid-cols-2 lg:rounded-[30px]">
          <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">Mepotia’ya sat</p>
            <h2 className="mt-3 text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.4rem]">Eski cihazın. Yeni bir değere dönüşsün.</h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/55">Modelini ve kondisyonunu paylaş. Fotoğraflarını ekle. Teklif sürecini tek yerden takip et.</p>
            <div className="mt-7"><Link href="/bana-sat" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0071e3] px-5 text-[14px] font-medium text-white transition hover:bg-[#0077ed]">Teklif al<ChevronRight className="h-4 w-4" /></Link></div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <Image src="/brand/mepotia-sell-tech.webp" alt="Mepotia'ya cihaz sat" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
