import TakasClient from "./TakasClient";

export const metadata = {
  title: "Takas | Mepotia",
  description:
    "İkinci el cihazını Mepotia ile takas et. Verdiğin cihaz ve istediğin model — adil fark, hızlı değerlendirme.",
};

export default function TakasPage() {
  return <TakasClient />;
}
