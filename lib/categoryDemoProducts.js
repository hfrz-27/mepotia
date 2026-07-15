import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";

const IMG = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const CATEGORY_DEMO_PRODUCTS = {
  telefon: [
    {
      id: "demo-telefon-1",
      title: "iPhone 15 Pro 256GB",
      price: 48750,
      original_price: 52900,
      city: "İzmir",
      views: 1280,
      is_featured: true,
      status: "published",
      category_slug: "telefon",
      product_images: [{ id: "t1", url: IMG("photo-1695048133142-1a20484d2569"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-telefon-2",
      title: "Samsung Galaxy S24 Ultra",
      price: 38900,
      city: "İstanbul",
      views: 940,
      is_featured: true,
      status: "published",
      category_slug: "telefon",
      product_images: [{ id: "t2", url: IMG("photo-1610945265064-0e34e5519bbf"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-telefon-3",
      title: "iPhone 13 128GB",
      price: 24500,
      city: "Ankara",
      views: 620,
      status: "published",
      category_slug: "telefon",
      product_images: [{ id: "t3", url: IMG("photo-1592286920312-a0f5cff626bc"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-telefon-4",
      title: "Xiaomi 14 Pro",
      price: 28900,
      city: "Bursa",
      views: 410,
      status: "published",
      category_slug: "telefon",
      product_images: [{ id: "t4", url: IMG("photo-1511707171634-5f897ff02aa9"), sort_order: 0 }],
      demo: true,
    },
  ],
  bilgisayar: [
    {
      id: "demo-bilgisayar-1",
      title: 'MacBook Pro 14" M3',
      price: 62500,
      city: "Ankara",
      views: 2100,
      is_featured: true,
      status: "published",
      category_slug: "bilgisayar",
      product_images: [{ id: "b1", url: IMG("photo-1517336714731-489689fd1ca8"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-bilgisayar-2",
      title: 'MacBook Air M2 13"',
      price: 34500,
      city: "İzmir",
      views: 880,
      status: "published",
      category_slug: "bilgisayar",
      product_images: [{ id: "b2", url: IMG("photo-1611186873608-619586e977e8"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-bilgisayar-3",
      title: "Lenovo ThinkPad X1",
      price: 29800,
      city: "İstanbul",
      views: 540,
      status: "published",
      category_slug: "bilgisayar",
      product_images: [{ id: "b3", url: IMG("photo-1496181133206-80ce9b88a853"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-bilgisayar-4",
      title: "Dell XPS 15 OLED",
      price: 41200,
      city: "Antalya",
      views: 390,
      status: "published",
      category_slug: "bilgisayar",
      product_images: [{ id: "b4", url: IMG("photo-1588879138554-7eed0a3ed3cf"), sort_order: 0 }],
      demo: true,
    },
  ],
  tablet: [
    {
      id: "demo-tablet-1",
      title: "iPad Air M2 128GB",
      price: 21500,
      city: "İzmir",
      views: 680,
      is_featured: true,
      status: "published",
      category_slug: "tablet",
      product_images: [{ id: "tb1", url: IMG("photo-1544244015-0df4b3ffc6b0"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-tablet-2",
      title: 'iPad Pro 12.9" M2',
      price: 38900,
      city: "İstanbul",
      views: 520,
      status: "published",
      category_slug: "tablet",
      product_images: [{ id: "tb2", url: IMG("photo-1561154464-82e9adf32764"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-tablet-3",
      title: "Samsung Galaxy Tab S9",
      price: 18700,
      city: "Ankara",
      views: 310,
      status: "published",
      category_slug: "tablet",
      product_images: [{ id: "tb3", url: IMG("photo-1632470020389-5e3956e7c489"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-tablet-4",
      title: "iPad mini 6 64GB",
      price: 14200,
      city: "Bursa",
      views: 280,
      status: "published",
      category_slug: "tablet",
      product_images: [{ id: "tb4", url: IMG("photo-1607880582953-0abf6989bdbc"), sort_order: 0 }],
      demo: true,
    },
  ],
  kulaklik: [
    {
      id: "demo-kulaklik-1",
      title: "Sony WH-1000XM5",
      price: 8900,
      city: "Bursa",
      views: 520,
      is_featured: true,
      status: "published",
      category_slug: "kulaklik",
      product_images: [{ id: "k1", url: IMG("photo-1618366716010-80f0e6c3c0b5"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-kulaklik-2",
      title: "AirPods Pro 2",
      price: 7200,
      city: "İstanbul",
      views: 890,
      status: "published",
      category_slug: "kulaklik",
      product_images: [{ id: "k2", url: IMG("photo-1606220945770-b5b6c2c55bf1"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-kulaklik-3",
      title: "JBL Tune 770NC",
      price: 2800,
      city: "İzmir",
      views: 210,
      status: "published",
      category_slug: "kulaklik",
      product_images: [{ id: "k3", url: IMG("photo-1484704849700-f032a568e944"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-kulaklik-4",
      title: "SteelSeries Arctis 7",
      price: 4500,
      city: "Ankara",
      views: 340,
      status: "published",
      category_slug: "kulaklik",
      product_images: [{ id: "k4", url: IMG("photo-1599669454699-248893623440"), sort_order: 0 }],
      demo: true,
    },
  ],
  "kilif-koruma": [
    {
      id: "demo-kilif-1",
      title: "iPhone 15 Pro Silikon Kılıf",
      price: 450,
      city: "İstanbul",
      views: 180,
      status: "published",
      category_slug: "kilif-koruma",
      product_images: [{ id: "kk1", url: IMG("photo-1601784551446-20c9e07cdbdb"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-kilif-2",
      title: "Ekran Koruyucu Cam Seti",
      price: 280,
      city: "İzmir",
      views: 120,
      status: "published",
      category_slug: "kilif-koruma",
      product_images: [{ id: "kk2", url: IMG("photo-1556656793-08538706f9c8"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-kilif-3",
      title: "MagSafe Şeffaf Kılıf",
      price: 520,
      city: "Ankara",
      views: 95,
      status: "published",
      category_slug: "kilif-koruma",
      product_images: [{ id: "kk3", url: IMG("photo-1603313058503-9fecc618b3d0"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-kilif-4",
      title: "iPad Smart Folio Kılıf",
      price: 890,
      city: "Bursa",
      views: 70,
      status: "published",
      category_slug: "kilif-koruma",
      product_images: [{ id: "kk4", url: IMG("photo-1561154464-82e9adf32764"), sort_order: 0 }],
      demo: true,
    },
  ],
  "sarj-kablo": [
    {
      id: "demo-sarj-1",
      title: "Apple 20W USB-C Adaptör",
      price: 650,
      city: "İstanbul",
      views: 240,
      status: "published",
      category_slug: "sarj-kablo",
      product_images: [{ id: "s1", url: IMG("photo-1591292187111-9c4c75a7e9d9"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-sarj-2",
      title: "Anker PowerCore 20000",
      price: 1850,
      city: "İzmir",
      views: 310,
      is_featured: true,
      status: "published",
      category_slug: "sarj-kablo",
      product_images: [{ id: "s2", url: IMG("photo-1609091839313-d5365f9ff1e5"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-sarj-3",
      title: "USB-C to Lightning Kablo",
      price: 320,
      city: "Ankara",
      views: 150,
      status: "published",
      category_slug: "sarj-kablo",
      product_images: [{ id: "s3", url: IMG("photo-1625948515291-69613b4f6c69"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-sarj-4",
      title: "MagSafe Şarj Standı",
      price: 2400,
      city: "Bursa",
      views: 190,
      status: "published",
      category_slug: "sarj-kablo",
      product_images: [{ id: "s4", url: IMG("photo-1583863788434-e58a36437cf0"), sort_order: 0 }],
      demo: true,
    },
  ],
  aksesuar: [
    {
      id: "demo-aksesuar-1",
      title: "Logitech MX Master 3S",
      price: 3200,
      city: "Ankara",
      views: 310,
      status: "published",
      category_slug: "aksesuar",
      product_images: [{ id: "a1", url: IMG("photo-1527864550417-7fd91fc51a46"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-aksesuar-2",
      title: "Telefon Masa Standı",
      price: 380,
      city: "İstanbul",
      views: 140,
      status: "published",
      category_slug: "aksesuar",
      product_images: [{ id: "a2", url: IMG("photo-1586953208448-b95a79798f07"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-aksesuar-3",
      title: "MagSafe Cüzdan",
      price: 1200,
      city: "İzmir",
      views: 200,
      status: "published",
      category_slug: "aksesuar",
      product_images: [{ id: "a3", url: IMG("photo-1603313058503-9fecc618b3d0"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-aksesuar-4",
      title: "Bluetooth Klavye K380",
      price: 1450,
      city: "Bursa",
      views: 175,
      status: "published",
      category_slug: "aksesuar",
      product_images: [{ id: "a4", url: IMG("photo-1587829741301-dc798b83add3"), sort_order: 0 }],
      demo: true,
    },
  ],
  "akilli-saat": [
    {
      id: "demo-saat-1",
      title: "Apple Watch Series 9",
      price: 14200,
      city: "İstanbul",
      views: 560,
      is_featured: true,
      status: "published",
      category_slug: "akilli-saat",
      product_images: [{ id: "as1", url: IMG("photo-1434493789847-2f02dc6ca35d"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-saat-2",
      title: "Galaxy Watch 6 Classic",
      price: 9800,
      city: "Ankara",
      views: 320,
      status: "published",
      category_slug: "akilli-saat",
      product_images: [{ id: "as2", url: IMG("photo-1523275335684-37898b6baf30"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-saat-3",
      title: "Apple Watch SE 2",
      price: 8900,
      city: "İzmir",
      views: 410,
      status: "published",
      category_slug: "akilli-saat",
      product_images: [{ id: "as3", url: IMG("photo-1546862511-555dafe1c02c"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-saat-4",
      title: "Spor Kordon Seti (3'lü)",
      price: 420,
      city: "Bursa",
      views: 90,
      status: "published",
      category_slug: "akilli-saat",
      product_images: [{ id: "as4", url: IMG("photo-1579586337278-3befd40fd17f"), sort_order: 0 }],
      demo: true,
    },
  ],
  "oyun-konsol": [
    {
      id: "demo-oyun-1",
      title: "PlayStation 5 Slim",
      price: 22400,
      city: "İstanbul",
      views: 1200,
      is_featured: true,
      status: "published",
      category_slug: "oyun-konsol",
      product_images: [{ id: "o1", url: IMG("photo-1606813907291-d86efa9b94db"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-oyun-2",
      title: "Xbox Series S",
      price: 12800,
      city: "Ankara",
      views: 640,
      status: "published",
      category_slug: "oyun-konsol",
      product_images: [{ id: "o2", url: IMG("photo-1621259182978-fbf93132c53b"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-oyun-3",
      title: "Nintendo Switch OLED",
      price: 11200,
      city: "İzmir",
      views: 780,
      status: "published",
      category_slug: "oyun-konsol",
      product_images: [{ id: "o3", url: IMG("photo-1578303512597-81e6ccdfab2f"), sort_order: 0 }],
      demo: true,
    },
    {
      id: "demo-oyun-4",
      title: "DualSense Edge Kol",
      price: 5400,
      city: "Bursa",
      views: 290,
      status: "published",
      category_slug: "oyun-konsol",
      product_images: [{ id: "o4", url: IMG("photo-1593305841991-05c297ba4575"), sort_order: 0 }],
      demo: true,
    },
  ],
};

export function getDemoProductsForCategory(slug, limit = 8) {
  return (CATEGORY_DEMO_PRODUCTS[slug] || []).slice(0, limit);
}

export function mergeCategoryProducts(real = [], slug, limit = 8) {
  const items = [...(real || [])];
  if (items.length >= limit) return items.slice(0, limit);

  const used = new Set(items.map((p) => p.id || p.title));
  for (const demo of getDemoProductsForCategory(slug, limit)) {
    if (items.length >= limit) break;
    if (!used.has(demo.id) && !used.has(demo.title)) {
      items.push(demo);
      used.add(demo.id);
    }
  }
  return items.slice(0, limit);
}

export async function getHomeCategoryProductMap(categories = []) {
  const { getPublishedProducts } = await import("@/lib/products");
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

export function getCategoryHref(slug, categories = []) {
  const row = categories.find((c) => c.slug === slug);
  if (!row || row.catalogOnly) {
    const cat = TECH_CATEGORY_CATALOG.find((c) => c.slug === slug);
    return `/ara?q=${encodeURIComponent(cat?.name || slug)}`;
  }
  return `/kategori/${slug}`;
}
