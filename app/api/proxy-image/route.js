import { NextResponse } from "next/server";

export async function GET(request) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url required" }, { status: 400 });
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  const allowed =
    parsed.hostname.endsWith("supabase.co") ||
    parsed.hostname === "images.unsplash.com" ||
    parsed.hostname === "mepotia.com" ||
    parsed.hostname === "www.mepotia.com" ||
    parsed.hostname.endsWith(".vercel.app") ||
    parsed.hostname.endsWith(".netlify.app");

  if (!allowed) {
    return NextResponse.json({ error: "host not allowed" }, { status: 403 });
  }

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json({ error: "fetch failed" }, { status: 502 });
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "proxy failed" }, { status: 502 });
  }
}
