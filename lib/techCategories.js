import {
  BatteryCharging,
  Gamepad2,
  Headphones,
  Laptop,
  Package,
  Shield,
  Smartphone,
  Tablet,
  Watch,
} from "lucide-react";

/** Teknoloji vitrin kategorileri — sıra ve görünüm burada sabit. */
export const TECH_CATEGORY_CATALOG = [
  {
    slug: "telefon",
    name: "Telefon",
    icon: Smartphone,
    tileGradient: "from-sky-100 to-sky-200",
    photo:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    description: "iPhone, Android ve ikinci el akıllı telefonlar.",
    subcategories: [
      { name: "iPhone", slug: "iphone" },
      { name: "Android", slug: "android" },
      { name: "Yedek parça", slug: "telefon-yedek-parca" },
    ],
  },
  {
    slug: "bilgisayar",
    name: "Bilgisayar",
    icon: Laptop,
    tileGradient: "from-indigo-100 to-indigo-200",
    photo:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    description: "Laptop, masaüstü, monitör ve bileşenler.",
    subcategories: [
      { name: "Laptop", slug: "laptop" },
      { name: "Masaüstü", slug: "masaustu" },
      { name: "Monitör", slug: "monitor" },
    ],
  },
  {
    slug: "tablet",
    name: "Tablet",
    icon: Tablet,
    tileGradient: "from-cyan-100 to-cyan-200",
    photo:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80",
    description: "iPad ve Android tabletler.",
    subcategories: [
      { name: "iPad", slug: "ipad" },
      { name: "Android tablet", slug: "android-tablet" },
    ],
  },
  {
    slug: "kulaklik",
    name: "Kulaklık",
    icon: Headphones,
    tileGradient: "from-violet-100 to-violet-200",
    photo:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description: "Kablolu, kablosuz ve oyun kulaklıkları.",
    subcategories: [
      { name: "Kablosuz", slug: "kablosuz-kulaklik" },
      { name: "Kablolu", slug: "kablolu-kulaklik" },
      { name: "Mikrofonlu", slug: "mikrofonlu-kulaklik" },
    ],
  },
  {
    slug: "kilif-koruma",
    name: "Kılıf",
    icon: Shield,
    tileGradient: "from-slate-100 to-slate-200",
    photo:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
    description: "Telefon kılıfı, cam, kılıf ve koruyucular.",
    subcategories: [
      { name: "Telefon kılıfı", slug: "telefon-kilifi" },
      { name: "Ekran koruyucu", slug: "ekran-koruyucu" },
      { name: "Tablet kılıfı", slug: "tablet-kilifi" },
    ],
  },
  {
    slug: "sarj-kablo",
    name: "Şarj",
    icon: BatteryCharging,
    tileGradient: "from-amber-100 to-amber-200",
    photo:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
    description: "Şarj aleti, powerbank, kablo ve adaptör.",
    subcategories: [
      { name: "Şarj aleti", slug: "sarj-aleti" },
      { name: "Powerbank", slug: "powerbank" },
      { name: "Kablo & adaptör", slug: "kablo-adaptor" },
    ],
  },
  {
    slug: "aksesuar",
    name: "Aksesuar",
    icon: Package,
    tileGradient: "from-emerald-100 to-emerald-200",
    photo:
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=900&q=80",
    description: "Stand, tutucu, kılıf aksesuarı ve daha fazlası.",
    subcategories: [
      { name: "Stand & tutucu", slug: "stand-tutucu" },
      { name: "Araç aksesuarı", slug: "arac-aksesuar" },
      { name: "Diğer aksesuar", slug: "diger-aksesuar" },
    ],
  },
  {
    slug: "akilli-saat",
    name: "Saat",
    icon: Watch,
    tileGradient: "from-rose-100 to-rose-200",
    photo:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    description: "Apple Watch, akıllı saat ve bileklik.",
    subcategories: [
      { name: "Apple Watch", slug: "apple-watch" },
      { name: "Akıllı saat", slug: "akilli-saat-genel" },
      { name: "Kordon & aksesuar", slug: "saat-aksesuar" },
    ],
  },
  {
    slug: "oyun-konsol",
    name: "Oyun",
    icon: Gamepad2,
    tileGradient: "from-blue-100 to-blue-200",
    photo:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80",
    description: "Konsol, oyun kolu ve oyuncu ekipmanı.",
    subcategories: [
      { name: "Konsol", slug: "konsol" },
      { name: "Oyun kolu", slug: "oyun-kolu" },
      { name: "Oyuncu ekipmanı", slug: "oyuncu-ekipmani" },
    ],
  },
];

export const TECH_CATEGORY_SLUGS = TECH_CATEGORY_CATALOG.map((c) => c.slug);

export function getTechCatalogItem(slug) {
  return TECH_CATEGORY_CATALOG.find((c) => c.slug === slug) || null;
}

/** DB kayıtlarını teknoloji kataloğu sırası ve meta ile birleştirir. */
export function mergeTechCategories(dbCategories = []) {
  const bySlug = new Map((dbCategories || []).map((c) => [c.slug, c]));

  const merged = TECH_CATEGORY_CATALOG.map((catalog, index) => {
    const row = bySlug.get(catalog.slug);
    if (row) {
      return {
        ...row,
        name: catalog.name,
        description: catalog.description,
        icon: catalog.icon,
        tileGradient: catalog.tileGradient,
        sort_order: index + 1,
        subcategories: (row.subcategories || []).length
          ? row.subcategories
          : catalog.subcategories.map((sub, subIndex) => ({
              ...sub,
              sort_order: subIndex + 1,
            })),
      };
    }

    return {
      id: `catalog-${catalog.slug}`,
      slug: catalog.slug,
      name: catalog.name,
      description: catalog.description,
      icon: catalog.icon,
      tileGradient: catalog.tileGradient,
      sort_order: index + 1,
      subcategories: catalog.subcategories.map((sub, subIndex) => ({
        ...sub,
        sort_order: subIndex + 1,
      })),
      catalogOnly: true,
    };
  });

  return merged;
}

export function isTechCategorySlug(slug) {
  return TECH_CATEGORY_SLUGS.includes(slug);
}

export function getCategoryHref(slug, categories = []) {
  return `/kategori/${slug}`;
}
