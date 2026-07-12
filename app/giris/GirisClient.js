"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Logo from "@/components/Logo";

export default function GirisClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: authError } = await createClient().auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (authError) {
      console.error(authError);
      setError(authError.message);
      return;
    }
    router.push(next);
    router.refresh();
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
          Giriş
        </h1>
        <p className="mt-2 text-center text-sm text-bw-500">Sadece site sahibi</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" className={field} />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" className={field} />
          {error ? <p className="rounded-2xl bg-bw-100 px-3 py-2 text-sm text-bw-700">{error}</p> : null}
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-bw-950 py-3.5 text-sm font-semibold text-white hover:bg-bw-800 disabled:opacity-70">
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-bw-400">
          <Link href="/" className="hover:text-bw-950">Ana sayfa</Link>
        </p>
      </div>
    </main>
  );
}
