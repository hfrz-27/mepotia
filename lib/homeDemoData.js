export const DEMO_REVIEWS = [
  {
    id: "demo-review-1",
    author_name: "Ahmet K.",
    stars: 5,
    body: "Ürün tam tarif edildiği gibiydi. Hızlı iletişim, güvenilir satıcı.",
  },
  {
    id: "demo-review-2",
    author_name: "Elif Y.",
    stars: 5,
    body: "İkinci el alışverişte en temiz deneyim. Fiyat şeffaf, süreç net.",
  },
  {
    id: "demo-review-3",
    author_name: "Murat D.",
    stars: 4,
    body: "MacBook'u kontrol ederek aldım. Paketleme özenli, memnun kaldım.",
  },
  {
    id: "demo-review-4",
    author_name: "Zeynep A.",
    stars: 5,
    body: "WhatsApp'tan yazdım, aynı gün dönüş geldi. Güvenle alışveriş.",
  },
  {
    id: "demo-review-5",
    author_name: "Can T.",
    stars: 5,
    body: "Ürün fotoğrafları gerçek, fiyat piyasaya göre çok iyi. Tavsiye ederim.",
  },
];

const IMG = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const DEMO_PRODUCTS = [
  {
    id: "demo-product-1",
    title: "iPhone 15 Pro 256GB",
    price: 48750,
    original_price: 52900,
    city: "İzmir",
    views: 1280,
    is_premium: true,
    is_featured: true,
    status: "published",
    product_images: [{ id: "d1", url: IMG("photo-1695048133142-1a20484d2569"), sort_order: 0 }],
    demo: true,
  },
  {
    id: "demo-product-2",
    title: "MacBook Pro 14\" M3",
    price: 62500,
    city: "Ankara",
    views: 2100,
    is_premium: true,
    is_featured: true,
    status: "published",
    product_images: [{ id: "d2", url: IMG("photo-1517336714731-489689fd1ca8"), sort_order: 0 }],
    demo: true,
  },
  {
    id: "demo-product-3",
    title: "Samsung Galaxy S24 Ultra",
    price: 38900,
    original_price: 42000,
    city: "İstanbul",
    views: 940,
    is_premium: false,
    is_featured: true,
    status: "published",
    product_images: [{ id: "d3", url: IMG("photo-1610945265064-0e34e5519bbf"), sort_order: 0 }],
    demo: true,
  },
  {
    id: "demo-product-4",
    title: "Sony WH-1000XM5 Kulaklık",
    price: 8900,
    city: "Bursa",
    views: 520,
    is_premium: false,
    is_featured: false,
    status: "published",
    product_images: [{ id: "d4", url: IMG("photo-1618366716010-80f0e6c3c0b5"), sort_order: 0 }],
    demo: true,
  },
  {
    id: "demo-product-5",
    title: "iPad Air M2 128GB",
    price: 21500,
    city: "İzmir",
    views: 680,
    is_premium: false,
    is_featured: true,
    status: "published",
    product_images: [{ id: "d5", url: IMG("photo-1544244015-0df4b3ffc6b0"), sort_order: 0 }],
    demo: true,
  },
  {
    id: "demo-product-6",
    title: "Logitech MX Master 3S",
    price: 3200,
    city: "Ankara",
    views: 310,
    is_premium: false,
    is_featured: false,
    status: "published",
    product_images: [{ id: "d6", url: IMG("photo-1527864550417-7fd91fc51a46"), sort_order: 0 }],
    demo: true,
  },
];

export function fillProducts(real = [], limit = 6) {
  const items = [...(real || [])];
  if (items.length >= limit) return items.slice(0, limit);

  const usedTitles = new Set(items.map((p) => p.title));
  for (const demo of DEMO_PRODUCTS) {
    if (items.length >= limit) break;
    if (!usedTitles.has(demo.title)) items.push(demo);
  }
  return items.slice(0, limit);
}

export function fillFeatured(real = [], limit = 6) {
  const featured = (real || []).filter((p) => p.is_featured);
  const base = featured.length ? featured : real || [];
  return fillProducts(base, limit);
}

export function fillReviews(real = [], limit = 5) {
  const items = [...(real || [])];
  if (items.length >= limit) return items.slice(0, limit);
  const needed = limit - items.length;
  return [...items, ...DEMO_REVIEWS.slice(0, needed)];
}
