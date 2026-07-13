import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/");
  revalidatePath("/ara");
  revalidatePath("/en-cok-bakilanlar");
  revalidatePath("/kategoriler");
  revalidatePath("/teknoloji");
  return Response.json({ ok: true });
}
