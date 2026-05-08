"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Plus, X } from "lucide-react";
import { POST_CATEGORIES } from "@/lib/pinnwand/categories";
import { SELECTABLE_QUARTIERE } from "@/lib/pinnwand/quartiere";
import type { PostCategoryId, QuartierId } from "@/lib/pinnwand/types";

const MAX_BODY = 500;
const MAX_HEADLINE = 80;
const DEFAULT_QUARTIER: QuartierId = "kreis-4";

interface Props {
  username?: string;
}

export function ComposeBox({ username = "Mira" }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<PostCategoryId | null>(null);
  const [quartier, setQuartier] = useState<QuartierId>(DEFAULT_QUARTIER);
  const [posted, setPosted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!expanded || !textareaRef.current) return;
    const ta = textareaRef.current;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [expanded, body]);

  function reset(): void {
    setHeadline("");
    setBody("");
    setCategory(null);
    setQuartier(DEFAULT_QUARTIER);
  }

  function handleClose(): void {
    reset();
    setExpanded(false);
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      handleClose();
    }, 1500);
  }

  const userQuartier = SELECTABLE_QUARTIERE.find((q) => q.id === DEFAULT_QUARTIER);

  if (!expanded) {
    return (
      <div className="bg-card border border-line rounded-xl p-4 sm:p-5 card-shadow">
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-full flex items-center gap-3 text-left group"
        >
          <span
            className="w-9 h-9 rounded-full bg-burgundy text-paper inline-flex items-center justify-center font-display text-[13px] shrink-0"
            aria-hidden
          >
            {username.charAt(0).toUpperCase()}
          </span>
          <span className="flex-1 min-w-0 text-[14px] text-ink-muted truncate">
            Was beschäftigt dich, {username}{" "}
            <span className="text-ink-faint">aus {userQuartier?.label}</span>?
          </span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-line text-ink-muted group-hover:bg-burgundy group-hover:text-paper group-hover:border-burgundy transition-colors shrink-0">
            <Plus className="w-4 h-4" strokeWidth={2} />
          </span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-line rounded-xl p-4 sm:p-6 card-shadow fade-in"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-10 h-10 rounded-full bg-burgundy text-paper inline-flex items-center justify-center font-display text-[15px] shrink-0"
            aria-hidden
          >
            {username.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <div className="text-[14px] font-medium text-ink leading-tight">{username}</div>
            <div className="text-[11px] text-ink-faint">postet als verifiziert · ZB-Mitglied</div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Schliessen"
          className="w-8 h-8 inline-flex items-center justify-center rounded-full text-ink-muted hover:bg-paper-dim transition-colors shrink-0"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>

      <input
        type="text"
        value={headline}
        onChange={(e) => setHeadline(e.target.value.slice(0, MAX_HEADLINE))}
        placeholder="Optionale Headline (z.B. Empfehlung, Frage, Beobachtung)"
        className="w-full font-display text-[20px] sm:text-[22px] leading-snug tracking-[-0.01em] text-ink placeholder:text-ink-faint bg-transparent outline-none border-b border-line py-2 mb-3 focus:border-burgundy transition-colors"
        maxLength={MAX_HEADLINE}
      />

      <textarea
        ref={textareaRef}
        value={body}
        onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
        placeholder="Was möchtest du teilen? Erzähl frei. Sei spezifisch, ehrlich, konstruktiv."
        rows={3}
        className="w-full text-[15px] leading-relaxed text-ink placeholder:text-ink-faint bg-transparent outline-none resize-none py-1"
        maxLength={MAX_BODY}
      />

      <div className="flex items-center justify-between mt-1 text-[11px] text-ink-faint tabular-nums">
        <span>
          {body.length}/{MAX_BODY}
        </span>
        <span>{headline.length > 0 ? `${headline.length}/${MAX_HEADLINE}` : ""}</span>
      </div>

      <div className="mt-5 pt-4 border-t border-line">
        <div className="text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-2 font-medium">
          Kategorie
        </div>
        <div className="flex flex-wrap gap-2">
          {POST_CATEGORIES.map((c) => {
            const isOn = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`inline-flex items-center gap-2 px-3 h-8 rounded-full text-[12px] font-medium border transition-colors ${
                  isOn
                    ? "border-ink text-ink bg-paper-dim"
                    : "border-line text-ink-muted hover:border-ink/40"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-line">
        <div className="text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-2 font-medium">
          Quartier
        </div>
        <select
          value={quartier}
          onChange={(e) => setQuartier(e.target.value as QuartierId)}
          className="w-full sm:w-auto bg-transparent border border-line rounded-full px-4 h-9 text-[13px] text-ink outline-none hover:border-ink/40 focus:border-burgundy transition-colors"
        >
          {SELECTABLE_QUARTIERE.map((q) => (
            <option key={q.id} value={q.id}>
              {q.label}
              {q.hint ? ` · ${q.hint}` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 h-9 rounded-full border border-line text-[12px] text-ink-muted hover:bg-paper-dim transition-colors"
        >
          <Camera className="w-3.5 h-3.5" strokeWidth={1.75} />
          Foto hinzufügen
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 h-9 rounded-full text-[13px] text-ink-muted hover:text-ink transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            disabled={!body || !category || posted}
            className="inline-flex items-center gap-2 px-5 h-9 rounded-full bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {posted ? "Gepostet ✓" : "Posten"}
          </button>
        </div>
      </div>
    </form>
  );
}
