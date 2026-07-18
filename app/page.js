import HomeHeroV3 from "@/components/home/HomeHeroV3";
import HomeCatsV3 from "@/components/home/HomeCatsV3";
import HomeMarketBoard from "@/components/home/HomeMarketBoard";
import HomeNewsV3 from "@/components/home/HomeNewsV3";
import HomeOpsV3 from "@/components/home/HomeOpsV3";
import HomeProofV3 from "@/components/home/HomeProofV3";
import HomeStripV3 from "@/components/home/HomeStripV3";
import { getPublishedProducts } from "@/lib/products";
import { getCategoriesWithSubs, getSiteSettings } from "@/lib/categories";
import { fillFeatured, fillProducts } from "@/lib/homeDemoData";
import { getHomeCategoryProductMap } from "@/lib/getHomeCategoryProducts";
import { getTechPosts } from "@/lib/techPosts";
import { HomeReviewsProvider } from "@/components/HomeReviews";

const PRODUCT_LIMIT = 12;
export const revalidate = 60;

export default async function HomePage() {
  const [settings, categories, latestRes, featuredRes, popularRes, newsRes] = await Promise.all([
    getSiteSettings(),
    getCategoriesWithSubs(),
    getPublishedProducts({ limit: PRODUCT_LIMIT, orderBy: "created_at" }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, featured: true }),
    getPublishedProducts({ limit: PRODUCT_LIMIT, orderBy: "views" }),
    getTechPosts({ limit: 8 }),
  ]);

  const categoryMeta = categories.map((c) => ({
    slug: c.slug,
    catalogOnly: Boolean(c.catalogOnly),
  }));
  const productsMap = await getHomeCategoryProductMap(categoryMeta);

  const latest = fillProducts(latestRes.data, PRODUCT_LIMIT);
  const featured = fillFeatured(featuredRes.data, PRODUCT_LIMIT);
  const popular = fillProducts(popularRes.data, PRODUCT_LIMIT);
  const posts = newsRes?.data || [];

  return (
    <HomeReviewsProvider>
      <main className="min-h-screen bg-black text-white">
        <HomeHeroV3
          video={settings?.hero_video || ""}
          images={[settings?.hero_bg_1, settings?.hero_bg_2, settings?.hero_bg_3].filter(Boolean)}
        />

        <HomeStripV3 />

        {featured.length ? (
          <HomeMarketBoard
            kicker="Drop"
            title="Yeni sahibini bekleyenler"
            products={featured}
            href="/ara"
            linkLabel="Tüm drop"
          />
        ) : null}

        <HomeOpsV3 />

        <HomeCatsV3 categories={categoryMeta} productsByCategory={productsMap} />

        {latest.length ? (
          <HomeMarketBoard
            id="vitrin"
            kicker="Vitrin"
            title="Taze ilanlar"
            products={latest}
            href="/ara"
            linkLabel="Tüm vitrin"
          />
        ) : null}

        <HomeNewsV3 posts={posts} />

        {popular.length ? (
          <HomeMarketBoard
            kicker="Heat"
            title="En çok bakılanlar"
            products={popular}
            href="/en-cok-bakilanlar"
            linkLabel="Heat list"
          />
        ) : null}

        <HomeProofV3 />
      </main>
    </HomeReviewsProvider>
  );
}
