import { getSiteSettings } from "@/lib/categories";
import BanaSatClient from "./BanaSatClient";

export const metadata = {
  title: "Ürünümü sat | Mepotia",
  description: "İkinci el ürününü Mepotia'ya satış teklifi olarak gönder. Hızlı değerlendirme.",
};

export const revalidate = 60;

export default async function BanaSatPage() {
  const settings = await getSiteSettings();
  return (
    <BanaSatClient
      heroVideo={settings?.sell_hero_video || ""}
      heroImages={[
        settings?.sell_hero_bg_1,
        settings?.sell_hero_bg_2,
        settings?.sell_hero_bg_3,
      ].filter(Boolean)}
    />
  );
}
