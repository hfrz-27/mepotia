import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";
import { mergeCategoryProducts } from "@/lib/categoryDemoProducts";
import { getPublishedProducts } from "@/lib/products";

export async function getHomeCategoryProductMap(categories = []) {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const map = {};

  await Promise.all(
    TECH_CATEGORY_CATALOG.map(async (cat) => {
      const row = bySlug.get(cat.slug);
      let real = [];

      if (row?.id && !row.catalogOnly) {
        const { data } = await getPublishedProducts({ categoryId: row.id, limit: 8 });
        real = data || [];
      }

      map[cat.slug] = mergeCategoryProducts(real, cat.slug, 8);
    }),
  );

  return map;
}
