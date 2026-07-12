import { Suspense } from "react";
import IlanVerClient from "./IlanVerClient";

export default function IlanVerPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-2xl px-4 py-20 text-center text-bw-500">
          Yükleniyor...
        </main>
      }
    >
      <IlanVerClient />
    </Suspense>
  );
}
