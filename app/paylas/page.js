import Link from "next/link";
import { Share2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getPublishedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ürünleri paylaş — Mepotia",
  description: "Mepotia vitrinindeki ürünleri incele ve paylaş.",
};

export default async function PaylasPage() {
  const { data: products } = await getPublishedProducts({
    limit: 48,
    orderBy: "created_at",
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Paylaş</p>
        <h1 className="mt-2 flex items-center gap-3 font-display text-4xl font-semibold tracking-wide text-bw-950">
          <Share2 className="h-8 w-8" />
          Ürünleri paylaş
        </h1>
        <p className="mt-4 text-base leading-relaxed text-bw-600">
          Vitrindeki ürünlere gir, fotoğrafları büyüt, linki veya WhatsApp ile
          paylaş. Beğendiğin üründe yardım için sağ alttaki yuvarlak butona da
          basabilirsin.
        </p>
      </div>

      {!products?.length ? (
        <div className="mt-12 rounded-[2rem] border border-dashed border-bw-300 bg-white px-6 py-20 text-center text-sm text-bw-500">
          Henüz paylaşılacak ürün yok.{" "}
          <Link href="/" className="underline">
            Vitrine dön
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
