"use client";

import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { ADMIN_TABS } from "@/components/admin/adminNav";

export default function AdminLayout({
  tab,
  onTabChange,
  stats = {},
  title,
  subtitle,
  children,
  actions,
}) {
  return (
    <div className="min-h-screen bg-bw-50">
      <header className="sticky top-0 z-40 border-b border-bw-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-bw-400 uppercase">
              Mepotia
            </p>
            <h1 className="truncate font-display text-xl font-semibold tracking-wide text-bw-950 sm:text-2xl">
              Yönetim paneli
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-xl border border-bw-200 px-3 py-2 text-xs font-semibold text-bw-600 transition hover:border-bw-300 hover:text-bw-900 sm:inline-flex"
            >
              Siteyi aç
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/ilan-ver"
              className="inline-flex items-center gap-1.5 rounded-xl bg-bw-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-bw-800 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              Yeni ilan
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="hidden w-72 shrink-0 border-r border-bw-200 bg-white lg:block">
          <nav className="sticky top-[65px] max-h-[calc(100vh-65px)] overflow-y-auto p-4">
            {ADMIN_TABS.map((group) => (
              <div key={group.group} className="mb-6 last:mb-0">
                <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
                  {group.group}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = tab === item.id;
                    const badge = item.badgeKey ? stats[item.badgeKey] : 0;
                    const total = item.totalKey ? stats[item.totalKey] : null;

                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => onTabChange(item.id)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                            active
                              ? "bg-bw-950 text-white shadow-[0_12px_28px_-18px_rgba(0,0,0,0.45)]"
                              : "text-bw-700 hover:bg-bw-50"
                          }`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              active ? "bg-white/10" : "bg-bw-50 text-bw-600"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">{item.label}</span>
                            <span
                              className={`block truncate text-[11px] ${
                                active ? "text-bw-300" : "text-bw-400"
                              }`}
                            >
                              {item.hint}
                              {total != null ? ` · ${total}` : ""}
                            </span>
                          </span>
                          {badge > 0 ? (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                                active ? "bg-white text-bw-950" : "bg-bw-950 text-white"
                              }`}
                            >
                              {badge}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-5 lg:hidden">
            <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
              {ADMIN_TABS.flatMap((group) =>
                group.items.map((item) => {
                  const active = tab === item.id;
                  const badge = item.badgeKey ? stats[item.badgeKey] : 0;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onTabChange(item.id)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                        active
                          ? "border-bw-950 bg-bw-950 text-white"
                          : "border-bw-200 bg-white text-bw-700"
                      }`}
                    >
                      {item.label}
                      {badge > 0 ? (
                        <span
                          className={`rounded-full px-1.5 py-px text-[10px] font-bold ${
                            active ? "bg-white text-bw-950" : "bg-bw-950 text-white"
                          }`}
                        >
                          {badge}
                        </span>
                      ) : null}
                    </button>
                  );
                }),
              )}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
                {subtitle}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-3xl">
                {title}
              </h2>
            </div>
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
