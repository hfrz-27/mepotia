"use client";

import { useState } from "react";
import { Loader2, Send, X } from "lucide-react";
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
        className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-bw-300 bg-white px-3 text-xs font-semibold text-bw-800 transition hover:border-bw-950 hover:bg-bw-50 sm:w-auto"
      >
        <Send className="h-3.5 w-3.5" />
        Teklif et
      </button>

      {open ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 bg-bw-950/25 sm:hidden"
            aria-label="Teklif formunu kapat"
          />
          <form
            onSubmit={submit}
            className="fixed inset-x-3 bottom-3 z-30 rounded-[1.5rem] border border-bw-200 bg-white p-4 shadow-[0_28px_70px_-32px_rgba(0,0,0,0.5)] sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-0 sm:top-full sm:mt-2 sm:w-[22rem] sm:rounded-2xl sm:p-3"
          >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-bw-950">Bu ürün için teklif gönder</p>
              <p className="mt-1 text-xs text-bw-500">Teklifin doğrudan yönetim paneline düşer.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-bw-200 text-bw-600 sm:hidden"
              aria-label="Kapat"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
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
            className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-bw-950 px-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Teklifi gönder
          </button>
          </form>
        </>
      ) : null}
      {status ? <p className="mt-1 text-xs text-bw-600">{status}</p> : null}
    </div>
  );
}
