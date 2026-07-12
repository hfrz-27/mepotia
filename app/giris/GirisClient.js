"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { fixEmailTypos, isValidEmail } from "@/lib/email";

export default function GirisClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const urlError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(urlError || "");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    let { email: clean, fixed, suggestion } = fixEmailTypos(email);
    if (fixed && suggestion) {
      clean = suggestion;
      setEmail(suggestion);
    }
    if (!isValidEmail(clean)) {
      setError("Geçerli bir e-posta yaz (örn. isim@gmail.com).");
      return;
    }

    setLoading(true);
    const { error: authError } = await createClient().auth.signInWithPassword({
      email: clean,
      password,
    });
    setLoading(false);
    if (authError) {
      const msg = (authError.message || "").toLowerCase();
      if (msg.includes("email not confirmed") || msg.includes("not confirmed")) {
        setError(
          "E-posta henüz doğrulanmamış. Gelen kutunu (Spam) kontrol et.",
        );
      } else if (/invalid/i.test(msg)) {
        setError("E-posta veya şifre hatalı.");
      } else {
        setError(authError.message);
      }
      return;
    }
    router.push(next);
    router.refresh();
  };

  const resendConfirm = async () => {
    setError("");
    setInfo("");
    let { email: clean, suggestion, fixed } = fixEmailTypos(email);
    if (fixed) clean = suggestion;
    if (!isValidEmail(clean)) {
      setError("Önce e-posta adresini yaz, sonra tekrar gönder.");
      return;
    }
    const origin = window.location.origin;
    const { error: resendError } = await createClient().auth.resend({
      type: "signup",
      email: clean,
      options: { emailRedirectTo: `${origin}/auth/callback` },
    });
    if (resendError) {
      setError(resendError.message);
      return;
    }
    setInfo("Doğrulama maili tekrar gönderildi. Spam klasörünü de bak.");
  };

  const field =
    "w-full rounded-2xl border border-bw-200 bg-white px-4 py-3 text-sm outline-none focus:border-bw-500";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-[2rem] border border-bw-200 bg-white p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.3)]">
        <h1 className="text-center font-display text-2xl font-semibold tracking-wide text-bw-950">
          Giriş
        </h1>
        <p className="mt-2 text-center text-sm text-bw-500">
          Site yönetimi için giriş
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta"
            className={field}
            autoComplete="email"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            className={field}
            autoComplete="current-password"
          />
          {error ? (
            <p className="rounded-2xl bg-bw-100 px-3 py-2 text-sm text-bw-700">
              {error}
            </p>
          ) : null}
          {info ? (
            <p className="rounded-2xl bg-bw-50 px-3 py-2 text-sm text-bw-700">
              {info}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-bw-950 py-3.5 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-70"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <button
          type="button"
          onClick={resendConfirm}
          className="mt-3 w-full text-center text-xs text-bw-500 underline underline-offset-2 hover:text-bw-950"
        >
          Doğrulama mailini tekrar gönder
        </button>

        <p className="mt-4 text-center text-sm text-bw-500">
          <Link href="/" className="font-medium text-bw-950 underline">
            Ana sayfa
          </Link>
        </p>
      </div>
    </main>
  );
}
