"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

export default function FavorilerPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setAuthed(false);
        setLoading(false);
        return;
      }
      const { data: favs, error } = await supabase
        .from("favorites")
        .select("product_id, products(*, product_images(*), categories(name,slug))")
        .eq("user_id", data.user.id);
      if (error) console.error(error);
      setProducts((favs || []).map((f) => f.products).filter(Boolean));
      setLoading(false);
    });
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold tracking-wide text-bw-950">Favoriler</h1>
      {!authed ? (
        <p className="mt-6 text-bw-500">
          <Link href="/giris?next=/favoriler" className="font-medium text-bw-950 underline">Giriş yap</Link>
        </p>
      ) : loading ? (
        <p className="mt-6 text-bw-500">Yükleniyor...</p>
      ) : !products.length ? (
        <p className="mt-6 text-bw-500">Henüz favori yok.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} initialFav />
          ))}
        </div>
      )}
    </main>
  );
}
