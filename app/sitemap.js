import { SITE_URL } from "@/lib/site";
import { getPublishedProducts } from "@/lib/products";

const STATIC_PAGES = [
  "",
  "/ara",
  "/kategoriler",
  "/hakkimizda",
  "/iletisim",
  "/bana-sat",
  "/urun-iste",
  "/en-cok-bakilanlar",
  "/gizlilik",
  "/kvkk",
  "/kullanim-sartlari",
  "/sss",
];

export default async function sitemap() {
  const { data: products } = await getPublishedProducts({ limit: 500 });
  const now = new Date();

  const staticEntries = STATIC_PAGES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries = (products || []).map((product) => ({
    url: `${SITE_URL}/urun/${product.id}`,
    lastModified: product.updated_at || product.created_at || now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
