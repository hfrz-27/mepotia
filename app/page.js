import MepotiaResearchHome from "@/components/MepotiaResearchHome";
import { getPublishedProducts } from "@/lib/products";
import { getCategoryShowcase, getSiteSettings } from "@/lib/categories";
import { getTechPosts } from "@/lib/techPosts";

export const revalidate = 30;

export default async function HomePage() {
  const [categories, productsRes, settings, newsRes] = await Promise.all([
    getCategoryShowcase(),
    getPublishedProducts({ limit: 12, orderBy: "created_at" }),
    getSiteSettings(),
    getTechPosts({ limit: 4, featuredFilter: "all" }),
  ]);

  const cleanHero = "/brand/actions/mepotia-home-hero-clean-v2.svg";
  const adminHeroMatch = String(settings?.hero_bg_1 || "").match(/hero_bg_1-(\\d+)/);
  const adminHeroTimestamp = Number(adminHeroMatch?.[1] || 0);
  const heroImage = adminHeroTimestamp > 1784516990945 ? settings.hero_bg_1 : cleanHero;

  return (
    <MepotiaResearchHome
      categories={categories || []}
      products={productsRes.data || []}
      news={newsRes.data || []}
      campaignImages={[heroImage]}
      content={settings?.content || {}}
      media={{ phone: settings?.home_products_cover, computer: settings?.home_featured_cover, tablet: settings?.home_curated_cover, trade: settings?.home_popular_cover, guide: settings?.home_news_cover, compare: settings?.home_value_cover }}
    />
  );
}
