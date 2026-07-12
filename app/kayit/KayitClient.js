"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Logo from "@/components/Logo";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { fixEmailTypos, isValidEmail } from "@/lib/email";

export default function KayitClient() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      setInfo(`E-posta düzeltildi: ${suggestion}`);
    }
    if (!isValidEmail(clean)) {
      setError(
        "Geçerli bir e-posta yaz (örn. isim@gmail.com — .coom değil .com).",
      );
      return;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalı.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const origin = window.location.origin;

    const { data, error: authError } = await supabase.auth.signUp({
      email: clean,
      password,
      options: {
        data: { full_name: fullName.trim() || null },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (authError) {
      const msg = (authError.message || "").toLowerCase();
      const status = authError.status || authError.code;
      if (
        status === 429 ||
        msg.includes("rate") ||
        msg.includes("over_request")
      ) {
        setError(
          "Çok fazla deneme yapıldı. 2–5 dakika bekle, sonra tekrar dene.",
        );
      } else if (msg.includes("already") || msg.includes("registered")) {
        setError("Bu e-posta zaten kayıtlı. Giriş yapmayı dene.");
      } else if (msg.includes("invalid") || msg.includes("email")) {
        setError(
          "E-posta kabul edilmedi. Doğru yaz: ornek@gmail.com (.coom değil).",
        );
      } else if (msg.includes("signup") && msg.includes("disabled")) {
        setError("Kayıt şu an kapalı. Supabase Auth ayarlarını kontrol et.");
      } else {
        setError(authError.message);
      }
      return;
    }

    const identities = data.user?.identities;
    if (data.user && Array.isArray(identities) && identities.length === 0) {
      setError("Bu e-posta zaten kayıtlı. Giriş sayfasından dene.");
      return;
    }

    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }

    setInfo(
      "Kayıt alındı. E-posta adresine doğrulama linki gönderildi. Spam klasörünü de kontrol et, linke tıkla, sonra giriş yap.",
    );
  };

  const field =
    "w-full rounded-2xl border border-bw-200 bg-white px-4 py-3 text-sm outline-none focus:border-bw-500";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-[2rem] border border-bw-200 bg-white p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.3)]">
        <div className="flex justify-center">
          <Logo className="h-9" />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-semibold tracking-wide text-bw-950">
          Kayıt Ol
        </h1>
        <p className="mt-2 text-center text-sm text-bw-500">
          Google ile hızlı kayıt veya e-posta doğrulama
        </p>

        <div className="mt-6">
          <GoogleAuthButton label="Google ile kayıt ol" />
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-bw-200" />
          <span className="text-xs tracking-wide text-bw-400 uppercase">veya</span>
          <div className="h-px flex-1 bg-bw-200" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ad Soyad"
            className={field}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta"
            className={field}
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre (en az 6 karakter)"
            className={field}
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
            {loading ? "Kaydediliyor..." : "E-posta ile kayıt ol"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-bw-500">
          Hesabın var mı?{" "}
          <Link href="/giris" className="font-medium text-bw-950 underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </main>
  );
}
