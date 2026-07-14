import { NextResponse } from "next/server";

export async function GET() {
  const commit =
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
    process.env.COMMIT_REF?.slice(0, 7) ||
    null;

  return NextResponse.json({
    commit,
    ref: process.env.VERCEL_GIT_COMMIT_REF || process.env.BRANCH || null,
    deployed: Boolean(process.env.VERCEL || process.env.NETLIFY),
    platform: process.env.NETLIFY ? "netlify" : process.env.VERCEL ? "vercel" : "local",
  });
}
