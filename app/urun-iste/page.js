import UrunIsteClient from "./UrunIsteClient";

export const metadata = {
  title: "Ürün iste — Mepotia",
  description: "Aradığın ürünü ve fiyat aralığını yaz, Mepotia'ya ilet.",
};

export default function UrunIstePage() {
  return <UrunIsteClient />;
}
