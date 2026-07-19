import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ChevronRight, CircleDollarSign, MessageCircleMore, ShieldCheck } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage } from "@/lib/productDisplay";
import HomeCampaignCarousel from "@/components/HomeCampaignCarousel";

const FEATURES = [
  ["Telefon", "Günlük hayatına hazır.", "Kondisyonu açıkça anlatılmış akıllı telefonlar.", "/brand/categories/mepotia-phone-v2.webp", "/kategori/telefon"],
  ["Bilgisayar", "İşine güç kat.", "Okul, iş ve üretkenlik için dengeli seçenekler.", "/brand/categories/mepotia-computer-v2.webp", "/kategori/bilgisayar"],
  ["Oyun", "Oyuna hazır ol.", "Konsol ve oyuncu ekipmanlarını tek vitrinde keşfet.", "/brand/categories/mepotia-gaming-v2.webp", "/kategori/oyun-konsol"],
];

const SERVICES = [
  { eyebrow: "Mepotia Takas", title: "Eski cihazınla yenisine yaklaş.", copy: "Cihazını anlat, istediğin modeli seç. Değer farkını açık ve anlaşılır bir süreçle birlikte hesaplayalım.", href: "/takas", action: "Takas teklifi al", image: "/brand/actions/mepotia-trade-premium-v3.png" },
  { eyebrow: "Mepotia Karşılaştır", title: "Farkları gör. Kararını net ver.", copy: "Fiyatı, ekranı, performansı ve bataryayı aynı yerde karşılaştır. İhtiyacına uyan modeli güvenle seç.", href: "/urun-karsilastir", action: "Karşılaştırmaya başla", image: "/brand/actions/mepotia-compare-premium-v3.png" },
  { eyebrow: "Mepotia Ürün İste", title: "Aradığın yoksa, birlikte bulalım.", copy: "Modeli ve bütçeni paylaş. Uygun seçenek vitrinde belirdiğinde seni doğrudan bilgilendirelim.", href: "/urun-iste", action: "Ürün isteği oluştur", image: "/brand/actions/mepotia-guide-premium-v3.png" },
];

const TRUST = [
  [BadgeCheck, "Açık ürün bilgisi", "Kondisyon, fiyat ve bilinen ayrıntılar saklanmadan sunulur."],
  [ShieldCheck, "Kontrollü vitrin", "İlan kalabalığı yerine daha okunabilir, seçilmiş ürün akışı."],
  [CircleDollarSign, "Karşılaştırılabilir değer", "Piyasa fiyatı ve teknik özellikler kararından önce yanında."],
  [MessageCircleMore, "Doğrudan destek", "Satıştan takasa kadar sorunu doğrudan Mepotia’ya sor."],
];

function SectionTitle({ children, muted }) {
  return <h2 className="text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[3.25rem]">{children} <span className="text-black/38">{muted}</span></h2>;
}

export default function MepotiaResearchHome({ products = [], campaignImages = [] }) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <section className="border-b border-black/[0.035] bg-[#f5f5f7]">
        <div className="mx-auto max-w-[1368px] px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
            <h1 className="text-[4.5rem] font-semibold leading-[0.9] tracking-[-0.07em] sm:text-[6.2rem]">
              Mepotia<br />Store.
            </h1>
            <div className="lg:justify-self-end">
              <h2 className="max-w-sm text-[1.8rem] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[2.3rem]">Sevdiğin teknolojiyi seçmenin daha net yolu.</h2>
              <div className="mt-6 space-y-3 text-[14px]">
                <Link href="/iletisim" className="block font-medium text-[#0071e3] hover:underline">Bir uzmanla görüş ↗</Link>
                <Link href="/rehber" className="block font-medium text-[#0071e3] hover:underline">Satın alma rehberini aç ↗</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeCampaignCarousel images={campaignImages} />

      <section className="mx-auto max-w-[1368px] px-4 pb-14 sm:px-6 sm:pb-20">
        <Link href="/teknoloji" className="group relative block min-h-[620px] overflow-hidden rounded-[30px] bg-black text-white shadow-[0_35px_90px_-60px_rgba(0,0,0,.8)] sm:rounded-[36px]">
          <Image src="/brand/editorial/mepotia-podcast-studio-v2.png" alt="Mepotia teknoloji ve podcast stüdyosu" fill priority sizes="(max-width:1200px) 100vw, 1200px" className="object-cover transition duration-[1200ms] group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/68 to-transparent" />
          <div className="relative flex min-h-[620px] max-w-2xl flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/48 uppercase">Mepotia Haber · Stüdyo</p>
            <h2 className="mt-5 text-[3.2rem] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-[5rem]">Teknolojinin gündemi. Daha net bir sesle.</h2>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/58">Seçili gelişmeler, anlaşılır analizler, rehberler ve Mepotia stüdyosundan profesyonel içerikler.</p>
            <span className="mt-8 inline-flex h-12 w-fit items-center gap-1 rounded-full bg-[#0071e3] px-6 text-[14px] font-semibold">Haberleri keşfet <ChevronRight className="h-4 w-4" /></span>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
        <SectionTitle muted="Doğru ürüne kısa yol.">Öne çıkanlar.</SectionTitle>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {FEATURES.map(([eyebrow, title, copy, image, href], i) => (
            <Link key={title} href={href} className={`group relative min-h-[540px] overflow-hidden rounded-[30px] ${i === 2 ? "bg-black text-white" : "bg-white"}`}>
              <Image src={image} alt="" fill sizes="(max-width:1024px) 100vw, 400px" className="object-cover transition duration-[1000ms] group-hover:scale-[1.035]" />
              <div className={`absolute inset-0 ${i === 2 ? "bg-gradient-to-b from-black/85 via-black/20 to-transparent" : "bg-gradient-to-b from-white via-white/70 to-transparent"}`} />
              <div className="relative p-7 sm:p-9"><p className="text-[11px] font-semibold tracking-[.15em] opacity-45 uppercase">{eyebrow}</p><h3 className="mt-3 text-[2.35rem] font-semibold leading-none tracking-[-.05em]">{title}</h3><p className="mt-4 max-w-xs text-[14px] leading-relaxed opacity-55">{copy}</p><span className="mt-5 inline-flex items-center text-[14px] font-semibold text-[#0071e3]">İncele <ChevronRight className="h-4 w-4" /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
        <SectionTitle muted="Her işlem için daha kısa yol.">Mepotia servisleri.</SectionTitle>
        <div className="mt-9 space-y-8">
          {SERVICES.map((item, index) => (
            <article key={item.title} className="grid overflow-hidden rounded-[32px] bg-black text-white shadow-[0_36px_100px_-65px_rgba(0,0,0,.9)] lg:min-h-[620px] lg:grid-cols-[.9fr_1.1fr] lg:rounded-[40px]">
              <div className={`flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16 ${index % 2 ? "lg:order-2" : ""}`}>
                <p className="text-[11px] font-semibold tracking-[.17em] text-[#2997ff] uppercase">{item.eyebrow}</p>
                <h3 className="mt-5 text-[3rem] font-semibold leading-[.94] tracking-[-.065em] sm:text-[4.6rem]">{item.title}</h3>
                <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/55">{item.copy}</p>
                <Link href={item.href} className="mt-8 inline-flex h-12 w-fit items-center gap-1 rounded-full bg-[#0071e3] px-6 text-[14px] font-semibold hover:bg-[#0077ed]">{item.action}<ChevronRight className="h-4 w-4" /></Link>
              </div>
              <div className={`relative min-h-[420px] overflow-hidden bg-[#0b0b0d] lg:min-h-[620px] ${index % 2 ? "lg:order-1" : ""}`}><Image src={item.image} alt="" fill sizes="(max-width:1024px) 100vw, 660px" className="object-cover transition duration-[1200ms] hover:scale-[1.025]" /></div>
            </article>
          ))}
        </div>
      </section>

      {products.length ? (
        <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-5"><SectionTitle muted="Vitrine yeni geldi.">Son eklenenler.</SectionTitle><Link href="/urunler" className="hidden text-[14px] font-semibold text-[#0071e3] sm:inline-flex">Tüm ürünler <ChevronRight className="h-4 w-4" /></Link></div>
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {products.slice(0, 8).map((product) => <Link key={product.id} href={`/urun/${product.id}`} className="group overflow-hidden rounded-[24px] bg-white p-3 ring-1 ring-black/[.04] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-50px_rgba(0,0,0,.55)] sm:p-5"><div className="relative aspect-square overflow-hidden rounded-[18px] bg-[#f5f5f7]"><ProductImage src={getPrimaryImage(product)} alt={product.title} fill className="object-cover transition duration-700 group-hover:scale-[1.035]" /></div><p className="mt-4 text-[10px] font-semibold tracking-[.14em] text-[#b15d00] uppercase">Yeni</p><h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-tight tracking-[-.025em] sm:text-[18px]">{product.title}</h3><p className="mt-2 text-[12px] text-[#6e6e73] sm:text-[13px]">{product.price != null ? formatPrice(product.price) : "Fiyat için iletişime geç"}</p></Link>)}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
        <SectionTitle muted="Kararını kolaylaştıran bütün detaylar.">Neden Mepotia?</SectionTitle>
        <div className="mt-9 grid overflow-hidden rounded-[32px] bg-white ring-1 ring-black/[.05] sm:grid-cols-2 lg:rounded-[40px]">
          {TRUST.map(([Icon, title, text], i) => <article key={title} className={`min-h-[250px] p-7 sm:p-10 ${i % 2 ? "sm:border-l" : ""} ${i > 1 ? "border-t" : ""} border-black/[.06]`}><Icon className="h-8 w-8 text-[#0071e3]" strokeWidth={1.55}/><h3 className="mt-8 text-[1.7rem] font-semibold leading-none tracking-[-.045em]">{title}</h3><p className="mt-4 max-w-md text-[14px] leading-relaxed text-[#6e6e73]">{text}</p></article>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid overflow-hidden rounded-[32px] bg-white lg:min-h-[600px] lg:grid-cols-2 lg:rounded-[40px]">
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16"><p className="text-[11px] font-semibold tracking-[.17em] text-[#0071e3] uppercase">Mepotia Rehber</p><h2 className="mt-5 text-[3rem] font-semibold leading-[.95] tracking-[-.06em] sm:text-[4.5rem]">Doğru ürünü, neye bakacağını bilerek seç.</h2><p className="mt-6 text-[16px] leading-relaxed text-[#6e6e73]">Telefon, bilgisayar, tablet ve aksesuar seçiminde teknik terimleri sadeleştiren adım adım rehberler.</p><Link href="/rehber" className="mt-8 inline-flex h-12 w-fit items-center gap-1 rounded-full bg-[#0071e3] px-6 text-[14px] font-semibold text-white">Rehberleri keşfet <ChevronRight className="h-4 w-4" /></Link></div>
          <div className="relative min-h-[420px]"><Image src="/brand/actions/mepotia-guide-premium-v3.png" alt="Mepotia teknoloji satın alma rehberi" fill sizes="(max-width:1024px) 100vw, 600px" className="object-cover" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1368px] px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
        <div className="relative min-h-[560px] overflow-hidden rounded-[32px] bg-black text-white lg:rounded-[40px]"><Image src="/brand/mepotia-sell-tech.webp" alt="Mepotia'ya cihaz sat" fill sizes="(max-width:1200px) 100vw, 1200px" className="object-cover object-right"/><div className="absolute inset-0 bg-gradient-to-r from-black via-black/76 to-transparent"/><div className="relative flex min-h-[560px] max-w-2xl flex-col justify-center p-7 sm:p-12 lg:p-16"><p className="text-[11px] font-semibold tracking-[.17em] text-[#2997ff] uppercase">Mepotia’ya sat</p><h2 className="mt-5 text-[3rem] font-semibold leading-[.94] tracking-[-.065em] sm:text-[4.8rem]">Eski cihazın. Yeni bir değere dönüşsün.</h2><p className="mt-6 text-[16px] leading-relaxed text-white/55">Modelini, kondisyonunu ve fotoğraflarını paylaş. Teklif sürecini açık adımlarla tamamla.</p><Link href="/bana-sat" className="mt-8 inline-flex h-12 w-fit items-center gap-1 rounded-full bg-[#0071e3] px-6 text-[14px] font-semibold">Teklif al <ChevronRight className="h-4 w-4" /></Link></div></div>
      </section>
    </main>
  );
}
