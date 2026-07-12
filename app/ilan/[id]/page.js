import { redirect } from "next/navigation";

export default async function LegacyIlanRedirect({ params }) {
  const { id } = await params;
  redirect(`/urun/${id}`);
}
