import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Bell, Camera, ChevronRight, CircleDollarSign, MessageCircleMore, Newspaper, ScanLine, Search, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage } from "@/lib/productDisplay";
import HomeCampaignCarousel from "@/components/HomeCampaignCarousel";
import HomeTradeQuickStart from "@/components/HomeTradeQuickStart";
import HomeGuideFinder from "@/components/HomeGuideFinder";
import { CustomerReviews, HomeReviewsProvider } from "@/components/HomeReviews";
import { formatTechDate } from "@/lib/techPostUtils";

const FEATURES = [
  ["Telefon", "Günlük hayatına hazır.", "Kondisyonu açıkça anlatılmış akıllı telefonlar.", "/brand/categories/mepotia-phone-v2.webp", "/kategori/telefon"],
  ["Bilgisayar", "İşine güç kat.", "Okul, iş ve üretkenlik için dengeli seçenekler.", "/brand/categories/mepotia-computer-v2.webp", "/kategori/bilgisayar"],
  ["Tablet", "Her fikrine hazır.", "Çalışmak, üretmek ve eğlenmek için güçlü tabletleri keşfet.", "/brand/categories/mepotia-tablet-v3.png", "/kategori/tablet"],
];

const SERVICES = [
  { eyebrow: "Mepotia Takas", title: "Eski cihazınla yenisine yaklaş.", copy: "Cihazını anlat, istediğin modeli seç. Değer farkını açık ve anlaşılır bir süreçle birlikte hesaplayalım.", href: "/takas", action: "Takas teklifi al", image: "/brand/actions/mepotia-trade-premium-v3.png" },
  { eyebrow: "Mepotia Karşılaştır", title: "Farkları gör. Kararını net ver.", copy: "Fiyatı, ekranı, performansı ve bataryayı aynı yerde karşılaştır. İhtiyacına uyan modeli güvenle seç.", href: "/urun-karsilastir", action: "Karşılaştırmaya başla", image: "/brand/actions/mepotia-compare-light-v4.png" },
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

function SellDeviceSection() {
  return (
    <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
      <div className="relative overflow-hidden rounded-[32px] bg-[#ebe9e4] px-6 py-16 text-[#1d1d1f] ring-1 ring-black/[.045] sm:px-10 sm:py-20 lg:rounded-[40px] lg:px-16">
        <div className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-white/80 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[360px] w-[360px] rounded-full bg-[#0071e3]/10 blur-[90px]" />
        <div className="relative mx-auto max-w-4xl text-center"><p className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#0071e3]">Mepotia’ya Sat</p><h2 className="mt-5 text-[3rem] font-semibold leading-[.94] tracking-[-.065em] sm:text-[5rem]">Cihazın sende beklemesin.<br /><span className="text-black/35">Değeri sana dönsün.</span></h2><p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#6e6e73] sm:text-[16px]">Birkaç ayrıntı ve fotoğraf paylaş. Cihazını açık, anlaşılır ve takip edilebilir bir süreçle değerlendirelim.</p></div>
        <div className="relative mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-3">
          {[[ScanLine, "01", "Cihazını tanımla", "Modeli ve temel özellikleri seç."], [Camera, "02", "Durumunu göster", "Kondisyonu ve fotoğrafları ekle."], [WalletCards, "03", "Teklifini değerlendir", "Sana iletilen değeri net biçimde gör."]].map(([Icon, number, title, copy]) => <article key={number} className="group rounded-[24px] border border-white/80 bg-white/58 p-6 text-left shadow-[0_22px_60px_-48px_rgba(0,0,0,.34)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white/85 sm:p-7"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1d1d1f] text-white"><Icon className="h-5 w-5" strokeWidth={1.5} /></span><span className="text-[11px] font-semibold tracking-[.15em] text-[#86868b]">{number}</span></div><h3 className="mt-8 text-[1.35rem] font-semibold tracking-[-.04em]">{title}</h3><p className="mt-2 text-[13px] leading-relaxed text-[#6e6e73]">{copy}</p></article>)}
        </div>
        <div className="relative mx-auto mt-5 flex max-w-5xl flex-col items-center justify-between gap-5 rounded-[24px] bg-[#1d1d1f] p-6 text-white shadow-[0_30px_80px_-50px_rgba(0,0,0,.7)] sm:flex-row sm:px-8"><div className="text-center sm:text-left"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/45">Hazırsan başlayalım</p><p className="mt-1 text-[1.25rem] font-semibold tracking-[-.035em]">Cihazının teklif sürecini şimdi başlat.</p></div><Link href="/bana-sat" className="inline-flex h-12 shrink-0 items-center gap-1 rounded-full bg-[#0071e3] px-6 text-[14px] font-semibold transition hover:bg-[#0077ed]">Teklif al <ChevronRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  );
}

function WhyMepotiaCards() {
  return (
    <section className="py-8 sm:py-12">
      <SectionTitle muted="Bizden seçim yapmak için daha fazla sebebin var.">Neden Mepotia?</SectionTitle>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {TRUST.map(([Icon, title, text], index) => (
          <article key={title} className="group min-h-[260px] rounded-[24px] bg-white p-5 shadow-[0_18px_45px_-32px_rgba(0,0,0,.38)] ring-1 ring-black/[.035] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_65px_-36px_rgba(0,0,0,.42)] sm:min-h-[290px] sm:p-7">
            <span className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${index === 0 ? "bg-[#eaf4ff] text-[#0071e3]" : index === 1 ? "bg-[#ecf8f0] text-[#16833b]" : index === 2 ? "bg-[#fff4e5] text-[#b15d00]" : "bg-[#f1ecff] text-[#7255d9]"}`}><Icon className="h-6 w-6" strokeWidth={1.65} /></span>
            <h3 className="mt-7 text-[1.35rem] font-semibold leading-[1.08] tracking-[-.04em] sm:text-[1.65rem]">{title}</h3>
            <p className="mt-3 text-[12px] leading-relaxed text-[#6e6e73] sm:text-[13px]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function MepotiaResearchHome({ products = [], campaignImages = [], news = [] }) {
  const newsItems = news.slice(0, 3);
  const leadNews = newsItems[0];
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <HomeCampaignCarousel images={campaignImages} />
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-[#0071e3]/[.09] blur-[120px]" />
        <div className="relative mx-auto max-w-[1368px] px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#0071e3]">Mepotia Haber</p>
              <h1 className="mt-3 text-[2.8rem] font-semibold leading-[.96] tracking-[-.06em] sm:text-[4.5rem]">Teknoloji gündemi.<br /><span className="text-black/35">Net, hızlı, seçilmiş.</span></h1>
            </div>
            <Link href="/teknoloji" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#0071e3]">Tüm haberleri keşfet <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>

          {leadNews ? (
            <div className="grid gap-5 lg:grid-cols-[1.45fr_.75fr]">
              <Link href={`/teknoloji/${leadNews.id}`} className="group relative min-h-[520px] overflow-hidden rounded-[30px] bg-black text-white shadow-[0_35px_85px_-55px_rgba(0,0,0,.85)] sm:min-h-[650px] sm:rounded-[38px]">
                {leadNews.cover_url ? <Image src={leadNews.cover_url} alt={leadNews.title} fill sizes="(max-width:1024px) 100vw, 850px" className="object-cover transition duration-[1100ms] ease-out group-hover:scale-[1.045]" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-white/30 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-11">
                  <span className="inline-flex rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] backdrop-blur-xl">Öne çıkan · {formatTechDate(leadNews.created_at)}</span>
                  <h2 className="mt-5 max-w-3xl text-[2.2rem] font-semibold leading-[1.02] tracking-[-.045em] sm:text-[3.6rem]">{leadNews.title}</h2>
                  <p className="mt-4 line-clamp-2 max-w-2xl text-[14px] leading-relaxed text-white/65 sm:text-[16px]">{leadNews.excerpt || "Günün öne çıkan teknoloji gelişmesini Mepotia'nın sade anlatımıyla keşfet."}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold">Haberi oku <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                </div>
              </Link>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {newsItems.slice(1).map((post) => (
                  <Link key={post.id} href={`/teknoloji/${post.id}`} className="group relative min-h-[310px] overflow-hidden rounded-[28px] bg-[#111114] text-white shadow-[0_28px_65px_-52px_rgba(0,0,0,.9)] sm:rounded-[32px]">
                    {post.cover_url ? <Image src={post.cover_url} alt={post.title} fill sizes="(max-width:1024px) 50vw, 430px" className="object-cover transition duration-[900ms] group-hover:scale-[1.06]" /> : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-white/55">{formatTechDate(post.created_at)}</p>
                      <h3 className="mt-3 line-clamp-3 text-[1.45rem] font-semibold leading-[1.08] tracking-[-.035em]">{post.title}</h3>
                      <ArrowUpRight className="mt-5 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link href="/teknoloji" className="group relative flex min-h-[480px] items-end overflow-hidden rounded-[30px] bg-black p-8 text-white sm:rounded-[38px] sm:p-12">
              <Image src="/brand/editorial/mepotia-podcast-studio-v2.png" alt="Mepotia teknoloji stüdyosu" fill sizes="100vw" className="object-cover transition duration-[1100ms] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="relative"><Newspaper className="h-7 w-7 text-[#2997ff]" /><h2 className="mt-5 text-[2.6rem] font-semibold tracking-[-.05em] sm:text-[4rem]">Haber merkezi hazırlanıyor.</h2><p className="mt-3 text-white/60">Teknoloji gündemini çok yakında burada bulacaksın.</p></div>
            </Link>
          )}
        </div>
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

      <HomeGuideFinder />

      <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
        <SectionTitle muted="Her işlem için daha kısa yol.">Mepotia servisleri.</SectionTitle>
        <div className="mt-9 space-y-8">
          {SERVICES.map((item, index) => index === 2 ? (
            <article key={item.title} className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#eef6ff_0%,#f7f4ff_48%,#edf9ff_100%)] px-6 py-16 text-center shadow-[0_35px_100px_-72px_rgba(0,71,227,.65)] ring-1 ring-[#0071e3]/10 sm:px-10 sm:py-20 lg:min-h-[650px] lg:rounded-[40px]">
              <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#64d2ff]/25 blur-[80px]" />
              <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#bf5af2]/15 blur-[90px]" />
              <div className="relative mx-auto max-w-4xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.17em] text-[#0071e3] shadow-sm backdrop-blur-xl"><Sparkles className="h-3.5 w-3.5" /> Mepotia Ürün İste</span>
                <h3 className="mx-auto mt-7 max-w-4xl text-[3rem] font-semibold leading-[.94] tracking-[-.065em] text-[#1d1d1f] sm:text-[5rem]">Aklındaki ürünü söyle.<br /><span className="bg-gradient-to-r from-[#0071e3] to-[#7d5cff] bg-clip-text text-transparent">Bulunca haber verelim.</span></h3>
                <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#6e6e73] sm:text-[16px]">Modeli ve bütçeni paylaş. Sana uygun ürün vitrinde yerini aldığında ilk bilen sen ol.</p>

                <div className="relative mx-auto mt-10 max-w-3xl rounded-[26px] border border-white bg-white/78 p-3 shadow-[0_30px_90px_-46px_rgba(64,80,140,.38)] backdrop-blur-2xl sm:p-4">
                  <div className="flex min-h-14 items-center gap-3 rounded-[18px] bg-[#f5f5f7] px-4 text-left ring-1 ring-black/[.04] sm:min-h-16 sm:px-5">
                    <Search className="h-5 w-5 shrink-0 text-[#86868b]" />
                    <span className="min-w-0 flex-1 truncate text-[13px] text-[#6e6e73] sm:text-[15px]">Örn. 256 GB, iyi durumda bir telefon...</span>
                    <Bell className="hidden h-5 w-5 text-[#0071e3] sm:block" />
                  </div>
                  <div className="mt-3 flex flex-wrap justify-center gap-2 px-1">
                    {["Telefon", "Tablet", "Bilgisayar", "Akıllı saat", "Kulaklık"].map((label) => <span key={label} className="rounded-full border border-black/[.06] bg-white px-3 py-1.5 text-[10px] font-medium text-[#6e6e73] sm:text-[11px]">{label}</span>)}
                  </div>
                  <Link href={item.href} className="mt-4 flex h-12 items-center justify-center gap-1 rounded-full bg-[#0071e3] px-6 text-[13px] font-semibold text-white transition hover:bg-[#0077ed]">Ürün isteği oluştur <ChevronRight className="h-4 w-4" /></Link>
                </div>
                <p className="mt-5 inline-flex items-center gap-2 text-[11px] text-[#86868b]"><Bell className="h-3.5 w-3.5" /> Eşleşme olduğunda doğrudan bilgilendirilirsin.</p>
              </div>
            </article>
          ) : (
            <div key={item.title} className={index === 1 ? "space-y-8" : ""}>
            <article className={`grid overflow-hidden rounded-[32px] shadow-[0_36px_100px_-65px_rgba(0,0,0,.9)] lg:min-h-[620px] lg:grid-cols-[.9fr_1.1fr] lg:rounded-[40px] ${index === 1 ? "bg-white text-[#1d1d1f] ring-1 ring-black/[.05]" : "bg-black text-white"}`}>
              <div className={`flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16 ${index % 2 ? "lg:order-2" : ""}`}>
                <p className="text-[11px] font-semibold tracking-[.17em] text-[#0071e3] uppercase">{item.eyebrow}</p>
                <h3 className="mt-5 text-[3rem] font-semibold leading-[.94] tracking-[-.065em] sm:text-[4.6rem]">{item.title}</h3>
                <p className={`mt-6 max-w-lg text-[16px] leading-relaxed ${index === 1 ? "text-[#6e6e73]" : "text-white/55"}`}>{item.copy}</p>
                {index === 1 ? <div className="mt-6 flex flex-wrap gap-2">{["Fiyat", "Ekran", "Performans", "Batarya"].map((detail) => <span key={detail} className="rounded-full bg-[#f5f5f7] px-3 py-1.5 text-[11px] font-medium text-[#6e6e73] ring-1 ring-black/[.05]">{detail}</span>)}</div> : null}
                <Link href={item.href} className="mt-8 inline-flex h-12 w-fit items-center gap-1 rounded-full bg-[#0071e3] px-6 text-[14px] font-semibold text-white hover:bg-[#0077ed]">{item.action}<ChevronRight className="h-4 w-4" /></Link>
              </div>
              <div className={`group relative min-h-[520px] overflow-hidden lg:min-h-[620px] ${index === 1 ? "bg-[#f5f7fa]" : "bg-[#0b0b0d]"} ${index % 2 ? "lg:order-1" : ""}`}>
                <div
                  role="img"
                  aria-label={`${item.eyebrow} görseli`}
                  className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition duration-[1200ms] group-hover:scale-[1.025]"
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                {index === 0 ? <HomeTradeQuickStart /> : null}
              </div>
            </article>
            {index === 1 ? <WhyMepotiaCards /> : null}
            </div>
          ))}
        </div>
      </section>

      <SellDeviceSection />

      {products.length ? (
        <section className="mx-auto max-w-[1368px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-5"><SectionTitle muted="Vitrine yeni geldi.">Son eklenenler.</SectionTitle><Link href="/urunler" className="hidden text-[14px] font-semibold text-[#0071e3] sm:inline-flex">Tüm ürünler <ChevronRight className="h-4 w-4" /></Link></div>
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {products.slice(0, 8).map((product) => <Link key={product.id} href={`/urun/${product.id}`} className="group overflow-hidden rounded-[24px] bg-white p-3 ring-1 ring-black/[.04] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-50px_rgba(0,0,0,.55)] sm:p-5"><div className="relative aspect-square overflow-hidden rounded-[18px] bg-[#f5f5f7]"><ProductImage src={getPrimaryImage(product)} alt={product.title} fill className="object-cover transition duration-700 group-hover:scale-[1.035]" /></div><p className="mt-4 text-[10px] font-semibold tracking-[.14em] text-[#b15d00] uppercase">Yeni</p><h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-tight tracking-[-.025em] sm:text-[18px]">{product.title}</h3><p className="mt-2 text-[12px] text-[#6e6e73] sm:text-[13px]">{product.price != null ? formatPrice(product.price) : "Fiyat için iletişime geç"}</p></Link>)}
          </div>
        </section>
      ) : null}

      <HomeReviewsProvider><CustomerReviews /></HomeReviewsProvider>

    </main>
  );
}
