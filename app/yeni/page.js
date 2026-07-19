import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CircleDollarSign,
  Headphones,
  Laptop,
  MessageCircleMore,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const metadata = {
  title: "Mepotia 2.0 — Tasarım Önizlemesi",
  description: "Sıfırdan hazırlanan yeni Mepotia teknoloji vitrini.",
};

const categories = [
  { name: "Telefon", href: "#telefon", image: "/brand/categories/mepotia-phone-v2.webp", icon: Smartphone },
  { name: "Bilgisayar", href: "#bilgisayar", image: "/brand/categories/mepotia-computer-v2.webp", icon: Laptop },
  { name: "Oyun", href: "#oyun", image: "/brand/categories/mepotia-gaming-v2.webp", icon: Headphones },
  { name: "Aksesuar", href: "#aksesuar", image: "/brand/categories/mepotia-accessories-v2.webp", icon: RefreshCcw },
];

const products = [
  { name: "Akıllı telefonlar", copy: "Günlük kullanım için seçilmiş, kondisyonu açıkça belirtilmiş modeller.", price: "12.900 TL’den", image: "/brand/categories/mepotia-phone-v2.webp", tone: "bg-[#e8e4df]" },
  { name: "Dizüstü bilgisayarlar", copy: "Okul, iş ve üretkenlik için güçlü ve dengeli seçenekler.", price: "18.500 TL’den", image: "/brand/categories/mepotia-computer-v2.webp", tone: "bg-[#eeeef0]" },
  { name: "Oyun dünyası", copy: "Konsol, kontrolcü ve oyuncu ekipmanlarını tek vitrinde keşfet.", price: "2.750 TL’den", image: "/brand/categories/mepotia-gaming-v2.webp", tone: "bg-[#111116] text-white" },
  { name: "Akıllı aksesuarlar", copy: "Teknolojini tamamlayan sade, kullanışlı ve seçilmiş parçalar.", price: "790 TL’den", image: "/brand/categories/mepotia-accessories-v2.webp", tone: "bg-[#eee1d0]" },
];

const trust = [
  { icon: BadgeCheck, title: "Net kondisyon", text: "Ürünün durumu, eksikleri ve özellikleri saklanmadan anlatılır." },
  { icon: ShieldCheck, title: "Kontrollü vitrin", text: "Kalabalık ilan listeleri yerine seçilmiş teknoloji ürünleri sunulur." },
  { icon: MessageCircleMore, title: "Doğrudan iletişim", text: "Sorularını aracı kalabalığı olmadan doğrudan Mepotia’ya sorarsın." },
  { icon: CircleDollarSign, title: "Anlaşılır fiyat", text: "Fiyatı ve ürünü karşılaştırarak daha bilinçli karar verirsin." },
];

function PillLink({ href, children, light = false }) {
  return (
    <Link
      href={href}
      className={[
        "mp-focus inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-semibold transition active:scale-[0.98]",
        light ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/85",
      ].join(" ")}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export default function MepotiaV2PreviewPage() {
  return (
    <main className="mp-page">
      <section className="px-3 pt-3 sm:px-6 sm:pt-6">
        <div className="relative mx-auto min-h-[620px] max-w-[1240px] overflow-hidden rounded-[26px] bg-[#09090b] text-white sm:min-h-[700px] sm:rounded-[36px]">
          <Image
            src="/brand/mepotia-hero-tech.webp"
            alt="Mepotia teknoloji vitrini"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1240px"
            className="object-cover object-[66%_center] opacity-80"
          />
          <span className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/5" />
          <div className="relative flex min-h-[620px] items-center px-6 py-16 sm:min-h-[700px] sm:px-12 lg:px-16">
            <div className="max-w-[580px]">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-white/50 uppercase sm:text-[11px]">Mepotia · Yeni teknoloji vitrini</p>
              <h1 className="mt-5 text-[3rem] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-[5rem] lg:text-[5.7rem]">
                Teknoloji.
                <span className="block text-white/58">Daha net.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/58 sm:text-[18px]">
                İkinci el teknolojiyi karmaşık ilanlardan çıkarıp sade, seçilmiş ve güven veren bir deneyime dönüştürüyoruz.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <PillLink href="#urunler" light>Ürünleri keşfet</PillLink>
                <Link href="#sat" className="mp-focus inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-5 text-[13px] font-semibold text-white transition hover:bg-white/10">Cihazını sat</Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/45">
                <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5" /> Açık ürün bilgisi</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Kontrollü vitrin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mp-container py-6 sm:py-9" aria-label="Kategoriler">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
          {categories.map(({ name, href, image, icon: Icon }) => (
            <Link key={name} href={href} className="group relative min-h-[180px] overflow-hidden rounded-[20px] bg-white sm:min-h-[230px] sm:rounded-[26px]">
              <Image src={image} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black backdrop-blur sm:left-5 sm:top-5 sm:h-11 sm:w-11"><Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.6} /></span>
              <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[15px] font-semibold text-white sm:inset-x-5 sm:bottom-5 sm:text-[18px]">{name}<ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="urunler" className="mp-section bg-white">
        <div className="mp-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mp-eyebrow">Yeni vitrin</p>
            <h2 className="mp-title mt-3">İhtiyacına göre seç. Detayını net gör.</h2>
            <p className="mp-copy mx-auto mt-4 max-w-xl">Her kategori aynı sade sunum, anlaşılır bilgi ve güçlü görsel düzenle hazırlanır.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {products.map((product, index) => (
              <article key={product.name} id={categories[index]?.href.slice(1)} className={["group relative min-h-[470px] overflow-hidden rounded-[26px] p-6 sm:min-h-[560px] sm:rounded-[32px] sm:p-9", product.tone].join(" ")}>
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                <span className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/20 to-transparent group-odd:bg-gradient-to-b group-odd:from-white/95 group-odd:via-white/20" />
                {index === 2 ? <span className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/20" /> : null}
                <div className="relative max-w-sm">
                  <p className={index === 2 ? "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45" : "mp-eyebrow"}>Mepotia seçimi</p>
                  <h3 className={["mt-2 text-[2rem] font-semibold leading-none tracking-[-0.045em] sm:text-[2.7rem]", index === 2 ? "text-white" : "text-black"].join(" ")}>{product.name}</h3>
                  <p className={["mt-3 text-[13px] leading-relaxed sm:text-[15px]", index === 2 ? "text-white/55" : "text-black/55"].join(" ")}>{product.copy}</p>
                  <p className={["mt-4 text-[12px] font-semibold", index === 2 ? "text-white" : "text-black"].join(" ")}>{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sat" className="mp-section">
        <div className="mp-container grid overflow-hidden rounded-[28px] bg-[#101010] text-white lg:grid-cols-2 lg:rounded-[36px]">
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-white/40 uppercase">Mepotia’ya sat</p>
            <h2 className="mt-3 text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4rem]">Kullanmadığın teknoloji değerini bulsun.</h2>
            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-white/52 sm:text-[16px]">Cihazını anlat, fotoğraflarını ekle ve teklifini al. Karmaşık ilan oluşturma süreci yok.</p>
            <div className="mt-7"><PillLink href="/bana-sat" light>Teklif al</PillLink></div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[600px]">
            <Image src="/brand/mepotia-sell-tech.webp" alt="Mepotia'ya cihaz sat" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mp-section bg-white">
        <div className="mp-container">
          <div className="max-w-2xl">
            <p className="mp-eyebrow">Neden Mepotia?</p>
            <h2 className="mp-title mt-3">Güven, süslü bir söz değil. Sistemin kendisi.</h2>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
            {trust.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[20px] bg-[#f4f4f2] p-4 sm:rounded-[26px] sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"><Icon className="h-[18px] w-[18px]" strokeWidth={1.6} /></span>
                <h3 className="mt-4 text-[14px] font-semibold tracking-[-0.02em] sm:text-[18px]">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-black/48 sm:text-[13px]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-4 sm:px-6 sm:py-7">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center rounded-[26px] bg-[#dbe5ff] px-6 py-14 text-center sm:rounded-[36px] sm:py-20">
          <p className="mp-eyebrow">Mepotia 2.0</p>
          <h2 className="mt-3 max-w-3xl text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.5rem]">Teknolojiye yeni ve daha sade bir bakış.</h2>
          <p className="mp-copy mt-4 max-w-xl">Ürün keşfinden cihaz satışına kadar bütün akışlar aynı anlaşılır sistemde birleşir.</p>
          <div className="mt-7"><PillLink href="#urunler">Vitrine dön</PillLink></div>
        </div>
      </section>
    </main>
  );
}
