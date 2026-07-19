function resolveSiteUrl() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "https://mepotia.com").trim();
  const cleaned = raw.replace(/\/$/, "").replace(/^http:/i, "https:");
  try {
    // Vercel pull bazen placeholder/boş değer bırakır
    if (!cleaned || cleaned === "[SENSITIVE]" || !/^https?:\/\//i.test(cleaned)) {
      return "https://mepotia.com";
    }
    // throws if invalid
    // eslint-disable-next-line no-new
    new URL(cleaned);
    return cleaned;
  } catch {
    return "https://mepotia.com";
  }
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "MEPOTIA";

export const SITE_DESCRIPTION =
  "Özenle seçilmiş ikinci el teknoloji vitrini. Şeffaf fiyat, gerçek görseller, güvenilir alışveriş.";

export const SITE_OG_DESCRIPTION =
  "İkinci el teknoloji vitrini · Güvenilir alışveriş · Şeffaf fiyat · Doğrudan iletişim";

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
