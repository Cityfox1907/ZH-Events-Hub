"use client";

import { ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { PulsVerifiedUpdate, PulsSourceKind } from "@/lib/types";

const KIND_STYLE: Record<PulsSourceKind, string> = {
  zvv: "bg-sky-100 text-sky-900",
  sbb: "bg-rose-100 text-rose-900",
  vbz: "bg-blue-100 text-blue-900",
  meteo: "bg-amber-100 text-amber-900",
  stadt: "bg-slate-100 text-slate-900",
  polizei: "bg-indigo-100 text-indigo-900",
  erz: "bg-emerald-100 text-emerald-900",
  stadtrat: "bg-purple-100 text-purple-900",
  "local-hero": "bg-cyan-100 text-cyan-900",
};

interface Props {
  updates: PulsVerifiedUpdate[];
  variant?: "wall" | "list";
  limit?: number;
  showFooter?: boolean;
}

export function PulsVerifiedWall({ updates, variant = "wall", limit, showFooter = true }: Props) {
  const items = limit ? updates.slice(0, limit) : updates;

  if (variant === "list") {
    return (
      <ul className="divide-y divide-line bg-card border border-line rounded-2xl card-shadow overflow-hidden">
        {items.map((u) => (
          <li key={u.id} className="px-5 py-3 flex items-start gap-3">
            <span
              className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${KIND_STYLE[u.sourceKind]}`}
            >
              {u.source}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] leading-snug">{u.text}</p>
              <p className="text-[11px] text-ink-faint mt-1">
                {u.district && `${u.district} · `}
                {u.ago}
                <span className="ml-1">🟢</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  // Wall = horizontal scrolling band with blue accent
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50/60 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-sky-200 bg-sky-100/50">
        <ShieldCheck className="w-4 h-4 text-sky-700" strokeWidth={2} />
        <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-sky-900">
          Verifizierte Stadt-Wand
        </p>
        <span className="text-[11px] text-sky-700/80 ml-auto">
          {updates.length} Updates · Live
        </span>
      </div>
      <div className="px-3 py-3 overflow-x-auto">
        <ul className="flex gap-2 min-w-min">
          {items.map((u) => (
            <li
              key={u.id}
              className="shrink-0 w-[280px] md:w-[320px] bg-card border border-sky-200/70 rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${KIND_STYLE[u.sourceKind]}`}
                >
                  {u.source}
                </span>
                <span className="text-[10px] text-ink-faint">🟢 verifiziert</span>
              </div>
              <p className="text-[12.5px] leading-snug text-ink">{u.text}</p>
              <p className="text-[10.5px] text-ink-faint mt-1">
                {u.district && `${u.district} · `}
                {u.ago}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {showFooter && (
        <div className="px-4 py-2 border-t border-sky-200 bg-sky-100/30 flex items-center justify-end">
          <Link
            href="/puls/live"
            className="inline-flex items-center gap-1 text-[11.5px] font-medium text-sky-900 hover:underline"
          >
            Vollständige Wand <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
