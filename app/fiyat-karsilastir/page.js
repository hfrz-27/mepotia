import TechPriceLookupSection from "@/components/TechPriceLookupSection";

export const metadata = {
  title: "Fiyat Karşılaştır",
  description: "Mepotia vitrin fiyatlarını piyasa fiyatlarıyla karşılaştır.",
};

export default function PriceComparisonPage() {
  return (
    <main className="min-h-screen bg-bw-50">
      <TechPriceLookupSection />
    </main>
  );
}
