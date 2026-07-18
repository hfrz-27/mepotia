import { getSiteSettings } from "@/lib/categories";
import UrunIsteClient from "./UrunIsteClient";

export const metadata = {
  title: "Ürün iste | Mepotia",
  description: "Aradığın ürünü ve bütçeni yaz — uygun ilan bulunca haber verelim.",
};

export const revalidate = 60;

export default async function UrunIstePage() {
  const settings = await getSiteSettings();
  return (
    <UrunIsteClient
      heroVideo={settings?.request_hero_video || ""}
      heroImages={[
        settings?.request_hero_bg_1,
        settings?.request_hero_bg_2,
        settings?.request_hero_bg_3,
      ].filter(Boolean)}
    />
  );
}
