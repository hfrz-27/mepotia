import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || null,
    ref: process.env.VERCEL_GIT_COMMIT_REF || null,
    deployed: Boolean(process.env.VERCEL),
  });
}
