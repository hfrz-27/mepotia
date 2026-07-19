import MepotiaResearchHome from "@/components/MepotiaResearchHome";
import { getPublishedProducts } from "@/lib/products";
import { getCategoryShowcase, getSiteSettings } from "@/lib/categories";

export const revalidate = 30;

export default async function HomePage() {
  const [categories, productsRes, settings] = await Promise.all([
    getCategoryShowcase(),
    getPublishedProducts({ limit: 12, orderBy: "created_at" }),
    getSiteSettings(),
  ]);

  return (
    <MepotiaResearchHome
      categories={categories || []}
      products={productsRes.data || []}
      campaignImages={[
        settings?.hero_bg_1 || "/brand/actions/mepotia-compare-premium-v3.png",
        settings?.hero_bg_2 || "/brand/actions/mepotia-trade-premium-v3.png",
        settings?.hero_bg_3 || "/brand/actions/mepotia-guide-premium-v3.png",
        settings?.home_featured_cover || "/brand/editorial/mepotia-podcast-studio-v2.png",
        settings?.home_curated_cover || "/brand/mepotia-hero-tech.webp",
      ]}
    />
  );
}
