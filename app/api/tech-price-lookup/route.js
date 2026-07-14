import { NextResponse } from "next/server";
import { lookupTechModelPrice } from "@/lib/techPriceLookup";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const result = await lookupTechModelPrice(body?.query, {
    referencePrice: body?.referencePrice,
  });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
