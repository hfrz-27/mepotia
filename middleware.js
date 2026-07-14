import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const ADMIN_PATHS = ["/admin", "/ilan-ver"];

function applySecurityHeaders(response) {
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
}

export async function middleware(request) {
  const host = request.headers.get("host") || "";
  const proto = request.headers.get("x-forwarded-proto");
  const path = request.nextUrl.pathname;

  if (proto === "http" && !host.includes("localhost")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return applySecurityHeaders(NextResponse.redirect(url, 301));
  }

  let supabaseResponse = applySecurityHeaders(NextResponse.next({ request }));

  const needsAdmin = ADMIN_PATHS.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );

  if (!needsAdmin) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = applySecurityHeaders(NextResponse.next({ request }));
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/giris";
    url.searchParams.set("next", path);
    return applySecurityHeaders(NextResponse.redirect(url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return applySecurityHeaders(NextResponse.redirect(url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon.png|favicon-48.png|icon-512.png|apple-touch-icon.png|mepotia-logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt)$).*)",
  ],
};
