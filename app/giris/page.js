import { Suspense } from "react";
import GirisClient from "./GirisClient";

export default function GirisPage() {
  return (
    <Suspense fallback={<main className="p-10 text-center text-navy-500">Yükleniyor...</main>}>
      <GirisClient />
    </Suspense>
  );
}
