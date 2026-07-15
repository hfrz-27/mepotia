import HeroSection from "@/components/HeroSection";
import TechNewsSection from "@/components/TechNewsSection";
import HomePriceCompareSection from "@/components/HomePriceCompareSection";
import HomeProductSection from "@/components/HomeProductSection";
import HomeValueBand from "@/components/HomeValueBand";
import { getPublishedProducts } from "@/lib/products";
import { getCategoriesWithSubs, getSiteSettings } from "@/lib/categories";
import { fillFeatured, fillProducts } from "@/lib/homeDemoData";
import { CustomerReviews, HomeReviewsProvider } from "@/components/HomeReviews";

const WA = "https://wa.me/905059574122";
const PRODUCT_LIMIT = 12;

export const revalidate = 60;

export default async function HomePage() {
  const [settings, categories, latestRes, featuredRes, popularRes] = await Promise.all([
    getSiteSettings(),
    getCategoriesWithSubs(),
    getPublishedProducts({ limit: PRODUCT_LIMIT, orderBy: "created_at" }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, featured: true }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, orderBy: "views" }),
  ]);
  const latest = fillProducts(latestRes.data, PRODUCT_LIMIT);
  const featured = fillFeatured(featuredRes.data, PRODUCT_LIMIT);
  const popular = fillProducts(popularRes.data, PRODUCT_LIMIT);
  const vitrinError = latestRes.error;

  const wa = settings?.whatsapp
    ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}`
    : WA;

  return (
    <HomeReviewsProvider>
      <main>
        <HeroSection
          heroVideo={settings?.hero_video || ""}
          heroImages={[settings?.hero_bg_1, settings?.hero_bg_2, settings?.hero_bg_3].filter(Boolean)}
        />

        <TechNewsSection categories={categories} />

        <HomePriceCompareSection heroImage={settings?.price_compare_bg_1} />

        {featured.length ? (
          <HomeProductSection
            eyebrow="Özenle seçilenler"
            title="Yeni sahibini bekleyenler"
            description="Fırsat olarak işaretlenen vitrin ürünleri."
            href="/ara"
            linkLabel="Tüm vitrin"
            products={featured.slice(0, PRODUCT_LIMIT)}
            prefetchCount={3}
            ariaLabel="Öne çıkan ürünler"
          />
        ) : null}

        {latest.length ? (
          <HomeProductSection
            id="vitrin"
            tone="bw-50"
            eyebrow="Vitrin"
            title="Özenle seçilmiş ürünler"
            description="En yeni ikinci el teknoloji ilanları."
            href="/ara"
            linkLabel="Tümünü gör"
            products={latest.slice(0, PRODUCT_LIMIT)}
            prefetchCount={3}
            ariaLabel="Vitrin ürünleri"
          />
        ) : (
          <section id="vitrin" className="scroll-mt-28 border-y border-bw-200 bg-bw-50">
            <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 sm:py-10 lg:px-8">
              <p className="font-display text-xl text-bw-900">
                {vitrinError ? "Vitrin yüklenemedi" : "Henüz ürün yok"}
              </p>
              <p className="mt-2 text-sm text-bw-500">
                {vitrinError ? "Sayfayı yenile veya biraz sonra tekrar dene." : "Yakında vitrin dolacak."}
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-xl bg-bw-950 px-4 py-2.5 text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>
          </section>
        )}

        <HomeValueBand />

        {popular.length ? (
          <HomeProductSection
            tone="footer"
            eyebrow="Popüler"
            title="En çok bakılanlar"
            description="Ziyaretçilerin en çok ilgi gösterdiği ilanlar."
            href="/en-cok-bakilanlar"
            linkLabel="Popüler liste"
            products={popular.slice(0, PRODUCT_LIMIT)}
            prefetchCount={3}
            ariaLabel="Popüler ürünler"
          />
        ) : null}

        <CustomerReviews />
      </main>
    </HomeReviewsProvider>
  );
}
