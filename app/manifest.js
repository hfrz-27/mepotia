import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#09090b",
    lang: "tr",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/favicon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
    scope: SITE_URL,
  };
}
