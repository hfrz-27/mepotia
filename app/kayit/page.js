import { redirect } from "next/navigation";

/** Public signup kapalı — sadece sen giriş yaparsın */
export default function KayitPage() {
  redirect("/giris");
}
