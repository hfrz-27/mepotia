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

  // Koleksiyonlar: SADECE admin seçimi — demo ile doldurma yok
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

  return (
    <HomeReviewsProvider>
      <main>
        <HomeIntroHero />

        <TechNewsSection />

        {featured.length ? (
          <HomeFeaturedCollection
            products={featured.slice(0, PRODUCT_LIMIT)}
            href={c1.href}
            linkLabel="Koleksiyonu keşfet"
            eyebrow={c1.eyebrow}
            title={c1.title}
            description={c1.description}
            variant="mosaic"
            ariaLabel={c1.label}
            priority
          />
        ) : null}

        <HomeActionRail />

        {curated.length ? (
          <HomeFeaturedCollection
            id="vitrin"
            products={curated.slice(0, PRODUCT_LIMIT)}
            href={c2.href}
            linkLabel="Koleksiyonu gör"
            eyebrow={c2.eyebrow}
            title={c2.title}
            description={c2.description}
            tone="mist"
            variant="split"
            ariaLabel={c2.label}
          />
        ) : (
          <section id="vitrin" className="scroll-mt-16 bg-[#f5f5f7]">
            <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#86868b] uppercase">
                Vitrin
              </p>
              <p className="mt-2 text-[1.5rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[2rem]">
                Özenle seçilmiş ürünler.
              </p>
              <p className="mt-2 text-[15px] text-[#6e6e73]">
                Admin panilden bu koleksiyona ürün ekle.
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
            href={c3.href}
            linkLabel="Koleksiyonu gör"
            eyebrow={c3.eyebrow}
            title={c3.title}
            description={c3.description}
            variant="cinema"
            ariaLabel={c3.label}
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
