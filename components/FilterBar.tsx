"use client";

import { SlidersHorizontal, X } from "lucide-react";

export interface FilterGroup {
  key: string;
  label: string;
  options: string[];
}

export type FilterState = Record<string, string | null>;

export function FilterBar({
  groups,
  active,
  onChange,
  onReset,
}: {
  groups: FilterGroup[];
  active: FilterState;
  onChange: (next: FilterState) => void;
  onReset?: () => void;
}) {
  function pick(key: string, value: string | null) {
    onChange({ ...active, [key]: active[key] === value ? null : value });
  }

  const activeCount = Object.values(active).filter(Boolean).length;

  return (
    <div className="bg-card border border-line rounded-2xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-ink-muted" />
          <span className="eyebrow">Filter</span>
          {activeCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-burgundy text-paper">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && onReset && (
          <button
            onClick={onReset}
            className="text-[11px] uppercase tracking-wider text-ink-muted hover:text-burgundy"
          >
            Zurücksetzen
          </button>
        )}
      </div>
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.key}>
            <p className="text-[11px] uppercase tracking-wider text-ink-faint mb-1.5">
              {g.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.options.map((opt) => {
                const isActive = active[g.key] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => pick(g.key, opt)}
                    className={`px-3 py-1.5 rounded-full text-[12px] border transition-colors ${
                      isActive
                        ? "bg-ink text-paper border-ink"
                        : "border-line bg-paper hover:border-burgundy"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FilterChips({
  active,
  onRemove,
}: {
  active: FilterState;
  onRemove: (key: string) => void;
}) {
  const chips = Object.entries(active).filter(([, v]) => Boolean(v));
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {chips.map(([key, val]) => (
        <button
          key={key}
          onClick={() => onRemove(key)}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ink text-paper text-[12px]"
        >
          {val}
          <X className="w-3 h-3" />
        </button>
      ))}
    </div>
  );
}
