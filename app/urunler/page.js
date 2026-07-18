import SearchPage from "../ara/page";

export const revalidate = 60;

export const metadata = {
  title: "Tüm Ürünler | Mepotia",
  description: "Mepotia'daki tüm teknoloji ürünlerini keşfedin ve filtreleyin.",
};

/** /urunler → aynı filtreli ürün vitrini */
export default SearchPage;
