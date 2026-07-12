const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mepotia.com";

export const SITE_URL = RAW_SITE_URL.replace(/\/$/, "").replace(/^http:/, "https:");

export const SITE_NAME = "Mepotia";

export const SITE_DESCRIPTION =
  "Mepotia — güvenin ve değerin buluşma noktası. Özenle seçilmiş ikinci el ürünler, şeffaf fiyat ve doğrudan iletişim.";

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
