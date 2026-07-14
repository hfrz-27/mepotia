import { NextResponse } from "next/server";
import { getTechPosts } from "@/lib/techPosts";

export const revalidate = 60;

export async function GET() {
  const { data, error } = await getTechPosts({ limit: 24 });

  if (error) {
    return NextResponse.json({ error: "Haberler alınamadı." }, { status: 500 });
  }

  return NextResponse.json({ posts: data });
}
