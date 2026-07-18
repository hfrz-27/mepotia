import { NextResponse } from "next/server";
import { compareProductsSideBySide } from "@/lib/productVsCompare";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const queries = Array.isArray(body?.queries)
    ? body.queries
    : [body?.a, body?.b, body?.c].filter(Boolean);

  const result = await compareProductsSideBySide(queries);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
