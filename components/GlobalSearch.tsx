"use client";

import { Search, X, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { searchAll, SEARCH_SUGGESTIONS } from "@/lib/data";

export function GlobalSearchTrigger({
  variant = "input",
}: {
  variant?: "input" | "icon";
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {variant === "input" ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-line bg-card max-w-xs w-full text-left"
        >
          <Search className="w-4 h-4 text-ink-faint shrink-0" />
          <span className="text-[13px] text-ink-faint">Suchen in Zürich…</span>
          <kbd className="ml-auto text-[10px] text-ink-faint border border-line rounded px-1 py-0.5 hidden lg:inline">
            ⌘K
          </kbd>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Suche öffnen"
          className="p-2 rounded-full border border-line hover:border-burgundy"
        >
          <Search className="w-4 h-4" />
        </button>
      )}
      {open && <GlobalSearchModal onClose={() => setOpen(false)} />}
    </>
  );
}

function GlobalSearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const results = searchAll(q);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/40 fade-in pt-16 md:pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-card rounded-2xl border border-line overflow-hidden"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
          <Search className="w-5 h-5 text-ink-faint shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Restaurant, Konzert, Erlebnis…"
            className="flex-1 bg-transparent text-[16px] focus:outline-none"
          />
          <button onClick={onClose} aria-label="Schliessen">
            <X className="w-5 h-5 text-ink-muted hover:text-ink" />
          </button>
        </div>

        {!q && (
          <div className="p-5">
            <div className="flex items-center gap-1.5 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-burgundy" />
              <span className="eyebrow">Trending Suchen</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SEARCH_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setQ(s)}
                  className="px-3 py-1.5 rounded-full border border-line text-[13px] hover:border-burgundy hover:text-burgundy"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {q && (
          <ul className="max-h-80 overflow-auto">
            {results.length === 0 ? (
              <li className="px-5 py-8 text-center text-[13px] text-ink-muted">
                Keine Treffer für „{q}" (Demo).
              </li>
            ) : (
              results.map((r) => (
                <li key={`${r.module}-${r.id}`}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-paper-dim transition-colors"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-burgundy w-20 shrink-0">
                      {r.module}
                    </span>
                    <span className="font-display text-[15px] flex-1 truncate">
                      {r.title}
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
