import { redirect } from "next/navigation";

/** Public kayıt kapalı */
export default function KayitPage() {
  redirect("/giris");
}
