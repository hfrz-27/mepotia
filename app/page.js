import MepotiaResearchHome from "@/components/MepotiaResearchHome";
import { getPublishedProducts } from "@/lib/products";
import { getCategoryShowcase } from "@/lib/categories";

export const revalidate = 30;

export default async function HomePage() {
  const [categories, productsRes] = await Promise.all([
    getCategoryShowcase(),
    getPublishedProducts({ limit: 12, orderBy: "created_at" }),
  ]);

  return (
    <MepotiaResearchHome
      categories={categories || []}
      products={productsRes.data || []}
    />
  );
}
