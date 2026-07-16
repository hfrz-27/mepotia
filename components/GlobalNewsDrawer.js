"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, X } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";

const OPEN_EVENT = "mepotia:open-news";
const EDGE_WIDTH = 72;
const SWIPE_DISTANCE = 22;

export default function GlobalNewsDrawer() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = useRef(null);
  const fetched = useRef(false);
  const openRef = useRef(false);

  const loadPosts = useCallback(async () => {
    if (fetched.current || loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/tech-news");
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts || []);
        fetched.current = true;
      }
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const openDrawer = useCallback(() => {
    setOpen(true);
    openRef.current = true;
    void loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const onOpen = () => openDrawer();

    const onStart = (event) => {
      if (window.innerWidth < 640) return;
      if (event.touches.length !== 1) return;
      start.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const onEnd = (event) => {
      if (window.innerWidth < 640) return;
      if (!start.current) return;
      const end = event.changedTouches[0];
      const deltaX = end.clientX - start.current.x;
      const deltaY = end.clientY - start.current.y;
      const fromEdge = start.current.x >= window.innerWidth - EDGE_WIDTH;
      start.current = null;

      if (openRef.current && deltaX >= SWIPE_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY)) {
        setOpen(false);
        return;
      }

      if (fromEdge && deltaX <= -SWIPE_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY)) {
        openDrawer();
      }
    };

    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [openDrawer]);

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-0 z-[75] bg-bw-950/30 opacity-0 transition-opacity duration-150 ${
          open ? "pointer-events-auto opacity-100" : ""
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        aria-label="Güncel teknoloji haberleri"
        className={`fixed inset-y-0 right-0 z-[80] flex w-[min(88vw,400px)] flex-col border-l border-bw-200 bg-bw-50 shadow-[-24px_0_70px_-34px_rgba(0,0,0,0.55)] transition-transform duration-150 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-bw-200 bg-white px-4 py-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-500 uppercase">
              Teknoloji Haberleri
            </p>
            <p className="mt-1 text-sm font-semibold text-bw-950">Güncel akış</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 text-bw-700 transition hover:bg-bw-50"
            aria-label="Haber panelini kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="hide-scrollbar flex-1 overflow-y-auto p-3">
          {loading && !posts.length ? (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-20 animate-pulse rounded-2xl border border-bw-200 bg-white" />
              ))}
            </div>
          ) : posts.length ? (
            <div className="space-y-2.5">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/teknoloji/${post.id}`}
                  onClick={() => setOpen(false)}
                  className="group flex gap-3 rounded-2xl border border-bw-200 bg-white p-2.5 shadow-[0_14px_30px_-26px_rgba(0,0,0,0.28)] transition hover:border-bw-300 hover:bg-bw-50"
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-bw-100">
                    {post.cover_url ? (
                      <Image
                        src={post.cover_url}
                        alt=""
                        fill
                        sizes="80px"
                        priority={index < 2}
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-bw-950 text-white/30">
                        <Newspaper className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 py-0.5">
                    <p className="text-[9px] font-semibold tracking-[0.14em] text-bw-400 uppercase">
                      {formatTechDate(post.created_at)}
                    </p>
                    <h2 className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-bw-950">
                      {post.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center text-center">
              <Newspaper className="h-6 w-6 text-bw-300" />
              <p className="mt-3 text-sm text-bw-500">Şu an haber bulunamadı.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export function openGlobalNewsDrawer() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
