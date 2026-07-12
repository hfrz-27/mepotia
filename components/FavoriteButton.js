"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function FavoriteButton({ productId }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: row } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", data.user.id)
        .eq("product_id", productId)
        .maybeSingle();
      setFav(!!row);
    });
  }, [productId]);

  const toggle = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = `/giris?next=/urun/${productId}`;
      return;
    }
    if (fav) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productId);
      setFav(false);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, product_id: productId });
      setFav(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-medium transition ${
        fav
          ? "border-bw-950 bg-bw-950 text-white"
          : "border-bw-300 bg-white text-bw-800 hover:border-bw-500"
      }`}
    >
      <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
      Favori
    </button>
  );
}
