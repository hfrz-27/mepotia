"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function ProductOfferForm({ productId, title, condition }) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (!phone.trim() || message.trim().length < 5) {
      setStatus("Telefonunu ve teklifini yaz.");
      return;
    }

    setSending(true);
    setStatus("");
    const { error } = await createClient().from("sell_offers").insert({
      contact_name: "Ürün teklifi",
      phone: phone.trim(),
      title,
      condition: condition || "used",
      description: `Ürün ID: ${productId}\n\nAlıcı teklifi:\n${message.trim()}`,
    });
    setSending(false);

    if (error) {
      setStatus("Teklif gönderilemedi. Lütfen tekrar dene.");
      return;
    }

    setPhone("");
    setMessage("");
    setStatus("Teklifin yönetim paneline iletildi.");
    setOpen(false);
  };

  return (
    <div className="relative flex-1 sm:flex-none">
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          setStatus("");
        }}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-bw-300 bg-white px-3 py-2 text-xs font-semibold text-bw-800 transition hover:border-bw-950 hover:bg-bw-50 sm:w-auto"
      >
        <Send className="h-3.5 w-3.5" />
        Teklif et
      </button>

      {open ? (
        <form
          onSubmit={submit}
          className="absolute z-20 mt-2 w-[min(100%,22rem)] rounded-2xl border border-bw-200 bg-white p-3 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.35)]"
        >
          <p className="text-xs font-semibold text-bw-950">Bu ürün için teklif gönder</p>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Telefon numaran"
            type="tel"
            required
            className="mt-3 w-full rounded-xl border border-bw-200 bg-bw-50 px-3 py-2.5 text-sm outline-none focus:border-bw-500"
          />
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Teklifin veya mesajın"
            required
            minLength={5}
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border border-bw-200 bg-bw-50 px-3 py-2.5 text-sm outline-none focus:border-bw-500"
          />
          <button
            type="submit"
            disabled={sending}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bw-950 px-3 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Teklifi gönder
          </button>
        </form>
      ) : null}
      {status ? <p className="mt-1 text-xs text-bw-600">{status}</p> : null}
    </div>
  );
}
