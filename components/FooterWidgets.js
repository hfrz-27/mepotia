"use client";

import { useEffect, useState } from "react";
import { CloudSun, Coins, TrendingUp } from "lucide-react";

function formatRate(value) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

function WidgetItem({ icon: Icon, label, value, sub }) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-2 px-3 py-1.5 sm:gap-2 sm:px-3.5 sm:py-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-bw-400" strokeWidth={1.75} />
      <div className="flex min-w-0 items-baseline gap-1.5 sm:gap-2">
        <span className="shrink-0 text-[10px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
          {label}
        </span>
        <span className="truncate text-xs font-semibold text-bw-950 sm:text-sm">{value}</span>
        {sub ? (
          <span className="hidden truncate text-[10px] text-bw-500 lg:inline">{sub}</span>
        ) : null}
      </div>
    </div>
  );
}

export default function FooterWidgets() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = () => {
      fetch("/api/footer-widgets")
        .then((r) => r.json())
        .then(setData)
        .catch(() => setData(null));
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(load, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const widgets = [
    data?.usd
      ? {
          id: "usd",
          icon: Coins,
          label: "Dolar",
          value: `${formatRate(data.usd)} ₺`,
          sub: "USD",
        }
      : null,
    data?.eur
      ? {
          id: "eur",
          icon: TrendingUp,
          label: "Euro",
          value: `${formatRate(data.eur)} ₺`,
          sub: "EUR",
        }
      : null,
    data?.gold
      ? {
          id: "gold",
          icon: Coins,
          label: "Altın",
          value: `${formatRate(data.gold)} ₺`,
          sub: "Gram",
        }
      : null,
    data?.weather
      ? {
          id: "weather",
          icon: CloudSun,
          label: data.weather.city || "Hava",
          value: `${data.weather.temp}°`,
          sub: data.weather.label,
        }
      : null,
  ].filter(Boolean);

  const fallback = [
    { id: "loading", icon: Coins, label: "Piyasa", value: "Yükleniyor…", sub: null },
  ];

  const items = widgets.length ? widgets : fallback;

  return (
    <div className="border-b border-bw-100">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:hidden">
          {items.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1 rounded-full border border-bw-200 bg-white px-2.5 py-1 text-[10px] font-medium text-bw-600"
            >
              <item.icon className="h-3 w-3 text-bw-400" />
              <span className="text-bw-400">{item.label}</span>
              {item.value}
            </span>
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-xl border border-bw-200 bg-white sm:flex sm:divide-x sm:divide-bw-200">
          {items.map((item) => (
            <WidgetItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              value={item.value}
              sub={item.sub}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

