"use client";

import { useMemo, useState } from "react";
import { Users, MessageCircle, Plus } from "lucide-react";
import type { QuartierPost, QuartierPostType } from "@/lib/types";
import { QUARTIER_POST_TYPES } from "@/lib/phase3-data";
import { IdentityBadge } from "./IdentityBadge";
import { useToast } from "./Toast";

const TYPE_META: Record<QuartierPostType, { label: string; emoji: string; tone: string }> = {
  frage: { label: "Frage", emoji: "❓", tone: "bg-amber-100 text-amber-900" },
  empfehlung: { label: "Empfehlung", emoji: "👍", tone: "bg-emerald-100 text-emerald-900" },
  beobachtung: { label: "Beobachtung", emoji: "👀", tone: "bg-slate-100 text-slate-900" },
  treffen: { label: "Treffen", emoji: "🤝", tone: "bg-sky-100 text-sky-900" },
  sorge: { label: "Sorge", emoji: "⚠️", tone: "bg-rose-100 text-rose-900" },
  "hilfe-angebot": { label: "Hilfe", emoji: "🙌", tone: "bg-indigo-100 text-indigo-900" },
};

interface Props {
  posts: QuartierPost[];
  district: string;
  activeCount?: number;
  variant?: "section" | "fullpage";
  onPivotChange?: () => void;
}

export function QuartierLayer({
  posts,
  district,
  activeCount = 247,
  variant = "section",
  onPivotChange,
}: Props) {
  const [typeFilter, setTypeFilter] = useState<QuartierPostType | "alle">("alle");
  const { push } = useToast();

  const filtered = useMemo(() => {
    if (typeFilter === "alle") return posts;
    return posts.filter((p) => p.type === typeFilter);
  }, [posts, typeFilter]);

  return (
    <div className="rounded-2xl border border-amber-200/70 bg-amber-50/40 overflow-hidden">
      <div className="px-5 py-4 border-b border-amber-200/70 bg-amber-100/40 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-800" strokeWidth={2} />
          <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-amber-900">
            Quartier-Layer
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg leading-tight text-ink">
            Dein Quartier: {district}
          </p>
          <p className="text-[12px] text-ink-muted">
            <strong className="text-ink">{activeCount}</strong> verifizierte
            Nachbarn aktiv diese Woche · nur für Wohnsitz-Verifizierte sichtbar
          </p>
        </div>
        {onPivotChange && (
          <button
            onClick={onPivotChange}
            className="text-[11.5px] font-medium text-amber-900 hover:underline"
          >
            Nachbarschaft entdecken →
          </button>
        )}
      </div>

      <div className="px-5 py-3 border-b border-amber-200/50 flex flex-wrap gap-1.5">
        <button
          onClick={() => setTypeFilter("alle")}
          className={`text-[11.5px] px-2.5 py-1 rounded-full border transition-colors ${
            typeFilter === "alle"
              ? "bg-ink text-paper border-ink"
              : "bg-card border-line text-ink-muted hover:border-burgundy"
          }`}
        >
          Alle
        </button>
        {QUARTIER_POST_TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => setTypeFilter(t.key)}
            className={`text-[11.5px] px-2.5 py-1 rounded-full border transition-colors inline-flex items-center gap-1 ${
              typeFilter === t.key
                ? "bg-ink text-paper border-ink"
                : "bg-card border-line text-ink-muted hover:border-burgundy"
            }`}
          >
            <span aria-hidden>{t.emoji}</span> {t.label}
          </button>
        ))}
      </div>

      <ul
        className={`p-4 space-y-3 ${
          variant === "fullpage" ? "" : "max-h-[640px] overflow-y-auto"
        }`}
      >
        {filtered.map((p) => {
          const meta = TYPE_META[p.type];
          return (
            <li
              key={p.id}
              className="bg-card border border-line rounded-xl p-4 card-shadow"
            >
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.avatar}
                  alt=""
                  className="w-9 h-9 rounded-full bg-paper-dim shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap text-[11.5px]">
                    <span className="font-medium">@{p.author}</span>
                    <IdentityBadge tier={p.identity} compact />
                    <span className="text-ink-faint">· {p.district} · {p.ago}</span>
                    <span
                      className={`ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-medium ${meta.tone}`}
                    >
                      {meta.emoji} {meta.label}
                    </span>
                  </div>
                  <p className="text-[13.5px] mt-1.5 leading-relaxed">{p.text}</p>
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt=""
                      className="mt-2 w-full max-h-56 object-cover rounded-lg"
                      loading="lazy"
                    />
                  )}
                  <div className="mt-2 flex items-center gap-3 text-[11.5px] text-ink-faint">
                    <button
                      onClick={() => push("✓ Reaktion (Demo)", "success")}
                      className="inline-flex items-center gap-1 hover:text-burgundy"
                    >
                      <MessageCircle className="w-3 h-3" />
                      {p.reactions} {p.reactionLabel}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="px-5 py-3 border-t border-amber-200/50 bg-amber-100/30 flex items-center justify-between">
        <p className="text-[11.5px] text-amber-900">
          Posten nur für wohnsitz-verifizierte Nachbarn
        </p>
        <button
          onClick={() => push("Posting-Flow folgt — nur für verifizierte Nachbarn (Demo)")}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-900 text-paper text-[12px] font-medium hover:bg-amber-950"
        >
          <Plus className="w-3 h-3" /> Im Quartier posten
        </button>
      </div>
    </div>
  );
}
