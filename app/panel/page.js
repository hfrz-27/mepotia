import { redirect } from "next/navigation";

/** Satıcı paneli yok — yönetim /admin */
export default function PanelPage() {
  redirect("/admin");
}
