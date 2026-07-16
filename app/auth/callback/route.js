import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";
  const errorDescription = searchParams.get("error_description");

  if (errorDescription) {
    const url = new URL("/giris", origin);
    url.searchParams.set("error", errorDescription);
    return NextResponse.redirect(url);
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Only allow an in-app path; an absolute URL here would turn login into an open redirect.
      const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
      return NextResponse.redirect(new URL(safeNext, origin));
    }

    const url = new URL("/giris", origin);
    url.searchParams.set("error", error.message || "Giriş tamamlanamadı");
    return NextResponse.redirect(url);
  }

  return NextResponse.redirect(new URL("/giris", origin));
}
