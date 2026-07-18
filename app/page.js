import TechNewsSection from "@/components/TechNewsSection";
import HomeAllProductsGrid from "@/components/HomeAllProductsGrid";
import HomeCompareGate from "@/components/HomeCompareGate";
import HomeFeaturedCollection from "@/components/HomeFeaturedCollection";
import HomeValueBand from "@/components/HomeValueBand";
import HomeActionRail from "@/components/HomeActionRail";
import HomeTradeGate from "@/components/HomeTradeGate";
import HomeIntroHero from "@/components/HomeIntroHero";
import { getPublishedProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/categories";
import { fillFeatured, fillProducts } from "@/lib/homeDemoData";
import { CustomerReviews, HomeReviewsProvider } from "@/components/HomeReviews";

const WA = "https://wa.me/905059574122";
const PRODUCT_LIMIT = 12;
const GRID_LIMIT = 21;

export const revalidate = 30;

export default async function HomePage() {
  const [settings, latestRes, featuredRes, popularRes, allRes] = await Promise.all([
    getSiteSettings(),
    getPublishedProducts({ limit: PRODUCT_LIMIT, orderBy: "created_at" }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, featured: true }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, orderBy: "views" }),
    getPublishedProducts({ limit: GRID_LIMIT, orderBy: "created_at" }),
  ]);
  const latest = fillProducts(latestRes.data, PRODUCT_LIMIT);
  const featured = fillFeatured(featuredRes.data, PRODUCT_LIMIT);
  const popular = fillProducts(popularRes.data, PRODUCT_LIMIT);
  const allProducts = fillProducts(allRes.data, GRID_LIMIT);
  const vitrinError = latestRes.error;

  const wa = settings?.whatsapp
    ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}`
    : WA;

  return (
    <HomeReviewsProvider>
      <main>
        <HomeIntroHero />

        {/* Haber → koleksiyonlar / işlemler → kategoriler → ürünler → yorumlar */}
        <TechNewsSection />

        {featured.length ? (
          <HomeFeaturedCollection
            products={featured.slice(0, PRODUCT_LIMIT)}
            href="/urunler"
            linkLabel="Koleksiyonu keşfet"
            eyebrow="Öne çıkan"
            title="Yeni sahibini bekleyenler."
            description="Fırsat olarak işaretlenen vitrin ürünleri — özenle seçilmiş, hazır."
            variant="mosaic"
            ariaLabel="Öne çıkan koleksiyon"
            priority
          />
        ) : null}

        <HomeActionRail />

        {latest.length ? (
          <HomeFeaturedCollection
            id="vitrin"
            products={latest.slice(0, PRODUCT_LIMIT)}
            href="/urunler"
            linkLabel="Tümünü gör"
            eyebrow="Vitrin"
            title="Özenle seçilmiş ürünler."
            description="En yeni ikinci el teknoloji ilanları."
            tone="mist"
            variant="split"
            ariaLabel="Vitrin koleksiyonu"
          />
        ) : (
          <section id="vitrin" className="scroll-mt-16 bg-[#f5f5f7]">
            <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
              <p className="text-[32px] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[40px]">
                {vitrinError ? "Vitrin yüklenemedi." : "Henüz ürün yok."}
              </p>
              <p className="mt-3 text-[17px] text-[#6e6e73]">
                {vitrinError ? "Sayfayı yenile veya biraz sonra tekrar dene." : "Yakında vitrin dolacak."}
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#1d1d1f] px-5 py-2.5 text-[15px] font-normal text-white transition hover:bg-[#000000]"
              >
                WhatsApp
              </a>
            </div>
          </section>
        )}

        <HomeCompareGate />

        {popular.length ? (
          <HomeFeaturedCollection
            products={popular.slice(0, PRODUCT_LIMIT)}
            href="/en-cok-bakilanlar"
            linkLabel="Popüler liste"
            eyebrow="Popüler"
            title="En çok bakılanlar."
            description="Ziyaretçilerin en çok ilgi gösterdiği ilanlar."
            variant="cinema"
            ariaLabel="Popüler koleksiyon"
          />
        ) : null}

        <HomeTradeGate />

        <HomeValueBand />

        <HomeAllProductsGrid products={allProducts} href="/urunler" />

        <CustomerReviews />
      </main>
    </HomeReviewsProvider>
  );
}
