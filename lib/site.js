const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mepotia.com";

export const SITE_URL = RAW_SITE_URL.replace(/\/$/, "").replace(/^http:/, "https:");

export const SITE_NAME = "Mepotia";

export const SITE_DESCRIPTION =
  "Özenle seçilmiş ikinci el teknoloji vitrini. Şeffaf fiyat, gerçek görseller, güvenilir alışveriş.";

export const SITE_OG_DESCRIPTION =
  "İkinci el teknoloji vitrini · Güvenilir alışveriş · Şeffaf fiyat · Doğrudan iletişim";

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
