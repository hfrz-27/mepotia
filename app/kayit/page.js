import { Suspense } from "react";
import KayitClient from "./KayitClient";

export default function KayitPage() {
  return (
    <Suspense
      fallback={
        <main className="p-10 text-center text-bw-500">Yükleniyor...</main>
      }
    >
      <KayitClient />
    </Suspense>
  );
}
