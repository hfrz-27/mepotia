"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Logo from "@/components/Logo";
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

    const { email: clean, fixed, suggestion } = fixEmailTypos(email);
    if (fixed) {
      setEmail(suggestion);
      setError(
        `E-posta düzeltilmeli: "${email}" → "${suggestion}". Tekrar dene.`,
      );
      return;
    }
    if (!isValidEmail(clean)) {
      setError("Geçerli bir e-posta yaz (örn. isim@gmail.com).");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email: clean,
      password,
      options: {
        data: { full_name: fullName.trim() || null },
      },
    });

    setLoading(false);

    if (authError) {
      const msg = authError.message || "";
      if (/invalid/i.test(msg)) {
        setError(
          "E-posta geçersiz görünüyor. @gmail.com gibi doğru yazdığından emin ol (.coom değil .com).",
        );
      } else {
        setError(msg);
      }
      return;
    }

    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }

    setInfo(
      "Kayıt alındı. E-posta onayı açıksa gelen kutunu kontrol et, sonra giriş yap.",
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
          Favori eklemek ve takip için hesap oluştur
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
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
