import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";
import { mergeCategoryProducts, CATEGORY_PRODUCT_LIMIT } from "@/lib/categoryDemoProducts";
import { getPublishedProducts } from "@/lib/products";

export async function getHomeCategoryProductMap(categories = []) {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const map = {};

  await Promise.all(
    TECH_CATEGORY_CATALOG.map(async (cat) => {
      const row = bySlug.get(cat.slug);
      let real = [];

      if (row?.id && !row.catalogOnly) {
        const { data } = await getPublishedProducts({
          categoryId: row.id,
          limit: CATEGORY_PRODUCT_LIMIT,
        });
        real = data || [];
      }

      map[cat.slug] = mergeCategoryProducts(real, cat.slug, CATEGORY_PRODUCT_LIMIT);
    }),
  );

  return map;
}
