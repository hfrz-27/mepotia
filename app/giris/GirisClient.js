"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { fixEmailTypos, isValidEmail } from "@/lib/email";
import BackHomeLink from "@/components/BackHomeLink";

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
    "h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-[15px] text-[#1d1d1f] outline-none transition placeholder:text-[#86868b] focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/12";

  return (
    <main className="flex min-h-[78vh] items-center justify-center bg-[#f5f5f7] px-4 py-14 sm:px-6">
      <div className="w-full max-w-[460px] rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-55px_rgba(0,0,0,.5)] ring-1 ring-black/[0.05] sm:p-10">
        <p className="text-center text-[11px] font-semibold tracking-[0.16em] text-[#86868b] uppercase">Mepotia hesabı</p>
        <h1 className="mt-3 text-center text-[2.5rem] font-semibold leading-none tracking-[-0.055em] text-[#1d1d1f]">
          Giriş yap.
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-center text-[14px] leading-relaxed text-[#6e6e73]">
          Mepotia yönetimi ve kayıtlı işlemler için güvenli oturum.
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
            className="h-12 w-full rounded-full bg-[#0071e3] text-[14px] font-semibold text-white transition hover:bg-[#0077ed] disabled:opacity-70"
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

        <div className="mt-6 flex justify-center">
          <BackHomeLink variant="minimal" />
        </div>
      </div>
    </main>
  );
}
