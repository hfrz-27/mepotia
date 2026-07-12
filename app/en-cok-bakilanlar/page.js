import Link from "next/link";
import { Eye } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getPublishedProducts } from "@/lib/products";

export const revalidate = 60;

export const metadata = {
  title: "En çok bakılanlar — Mepotia",
  description: "Mepotia vitrininde en çok görüntülenen ürünler.",
};

export default async function EnCokBakilanlarPage() {
  const { data: products } = await getPublishedProducts({
    limit: 48,
    orderBy: "views",
    ascending: false,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Popüler</p>
        <h1 className="mt-2 flex items-center gap-3 font-display text-4xl font-semibold tracking-wide text-bw-950">
          <Eye className="h-8 w-8" />
          En çok bakılanlar
        </h1>
        <p className="mt-4 text-base leading-relaxed text-bw-600">
          Ziyaretçilerin en çok incelediği ürünler.
        </p>
      </div>

      {!products?.length ? (
        <div className="mt-12 rounded-[2rem] border border-dashed border-bw-300 bg-white px-6 py-20 text-center text-sm text-bw-500">
          Henüz ürün yok.{" "}
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
