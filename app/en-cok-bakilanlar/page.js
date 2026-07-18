import { redirect } from "next/navigation";

export const revalidate = 30;

/** Eski URL → koleksiyon sayfası (sadece seçili ürünler) */
export default function EnCokBakilanlarRedirect() {
  redirect("/koleksiyon/en-cok-bakilanlar");
}
