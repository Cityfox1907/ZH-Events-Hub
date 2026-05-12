"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export interface FilterGroup {
  key: string;
  label: string;
  options: string[];
}

export function FilterBar({
  groups,
  onChange,
}: {
  groups: FilterGroup[];
  onChange?: (active: Record<string, string | null>) => void;
}) {
  const [active, setActive] = useState<Record<string, string | null>>({});

  function pick(key: string, value: string | null) {
    const next = { ...active, [key]: active[key] === value ? null : value };
    setActive(next);
    onChange?.(next);
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="w-4 h-4 text-ink-muted" />
        <span className="eyebrow">Filter</span>
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
