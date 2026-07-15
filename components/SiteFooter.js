import { getSiteSettings } from "@/lib/categories";
import Footer from "@/components/Footer";

export default async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <Footer
      whatsapp={settings?.whatsapp}
      phone={settings?.phone}
      email={settings?.email}
    />
  );
}
