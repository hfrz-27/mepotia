import TechNewsSection from "@/components/TechNewsSection";
import HomeAllProductsGrid from "@/components/HomeAllProductsGrid";
import HomeCompareGate from "@/components/HomeCompareGate";
import HomeFeaturedCollection from "@/components/HomeFeaturedCollection";
import HomeValueBand from "@/components/HomeValueBand";
import HomeActionRail from "@/components/HomeActionRail";
import HomeTradeGate from "@/components/HomeTradeGate";
import HomeIntroHero from "@/components/HomeIntroHero";
import { getPublishedProducts, HOME_COLLECTIONS } from "@/lib/products";
import { getSiteSettings } from "@/lib/categories";
import { fillProducts } from "@/lib/homeDemoData";
import { CustomerReviews, HomeReviewsProvider } from "@/components/HomeReviews";

const WA = "https://wa.me/905059574122";
const PRODUCT_LIMIT = 12;
const GRID_LIMIT = 21;

export const revalidate = 30;

export default async function HomePage() {
  const [settings, featuredRes, curatedRes, popularRes, allRes] = await Promise.all([
    getSiteSettings(),
    getPublishedProducts({ limit: PRODUCT_LIMIT, homeCollection: "featured" }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, homeCollection: "curated" }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, homeCollection: "popular" }),
    getPublishedProducts({ limit: GRID_LIMIT, orderBy: "created_at" }),
  ]);

  const featured = featuredRes.data || [];
  const curated = curatedRes.data || [];
  const popular = popularRes.data || [];
  const allProducts = fillProducts(allRes.data, GRID_LIMIT);

  const wa = settings?.whatsapp
    ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}`
    : WA;

  const c1 = HOME_COLLECTIONS.featured;
  const c2 = HOME_COLLECTIONS.curated;
  const c3 = HOME_COLLECTIONS.popular;

  // Admin kapakları (yoksa bileşen ürün fotoğraflarına düşer)
  const covers = {
    products: settings?.home_products_cover || null,
    featured: settings?.home_featured_cover || null,
    curated: settings?.home_curated_cover || null,
    popular: settings?.home_popular_cover || null,
    news: settings?.home_news_cover || null,
    value: settings?.home_value_cover || null,
  };

  return (
    <HomeReviewsProvider>
      <main>
        <HomeIntroHero />

        <TechNewsSection coverUrl={covers.news} />

        {/* 3 koleksiyon — her zaman açık (ürün admin’den seçilir) */}
        <HomeFeaturedCollection
          products={featured.slice(0, PRODUCT_LIMIT)}
          href={c1.href}
          linkLabel="Koleksiyonu aç"
          eyebrow={c1.eyebrow}
          title={c1.title}
          description={c1.description}
          variant="mosaic"
          ariaLabel={c1.label}
          coverUrl={covers.featured}
          priority
        />

        <HomeActionRail />

        <HomeFeaturedCollection
          id="vitrin"
          products={curated.slice(0, PRODUCT_LIMIT)}
          href={c2.href}
          linkLabel="Koleksiyonu aç"
          eyebrow={c2.eyebrow}
          title={c2.title}
          description={c2.description}
          variant="split"
          ariaLabel={c2.label}
          coverUrl={covers.curated}
        />

        <HomeCompareGate />

        <HomeFeaturedCollection
          products={popular.slice(0, PRODUCT_LIMIT)}
          href={c3.href}
          linkLabel="Koleksiyonu aç"
          eyebrow={c3.eyebrow}
          title={c3.title}
          description={c3.description}
          variant="cinema"
          ariaLabel={c3.label}
          coverUrl={covers.popular}
        />

        <HomeTradeGate />

        <HomeValueBand coverUrl={covers.value} />

        <HomeAllProductsGrid
          products={allProducts}
          href="/urunler"
          coverUrl={covers.products}
        />

        <CustomerReviews />
      </main>
    </HomeReviewsProvider>
  );
}
