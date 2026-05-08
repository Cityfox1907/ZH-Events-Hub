"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { POST_CATEGORIES } from "@/lib/pinnwand/categories";
import { SELECTABLE_QUARTIERE } from "@/lib/pinnwand/quartiere";
import { TIME_FILTERS, buildSearchString, isFiltersDefault } from "@/lib/pinnwand/filters";
import type {
  PinnwandFilterState,
  PostCategoryId,
  QuartierId,
  TimeFilter,
} from "@/lib/pinnwand/types";

interface Props {
  filters: PinnwandFilterState;
  resultCount: number;
}

export function FilterBar({ filters, resultCount }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<null | "quartier" | "kategorie" | "zeit">(null);
  const [mobileSheet, setMobileSheet] = useState(false);

  function update(next: PinnwandFilterState): void {
    router.push(`/pinnwand${buildSearchString(next)}`, { scroll: false });
  }

  function toggleQuartier(id: QuartierId): void {
    const exists = filters.quartiere.includes(id);
    update({
      ...filters,
      quartiere: exists
        ? filters.quartiere.filter((q) => q !== id)
        : [...filters.quartiere, id],
    });
  }

  function toggleKategorie(id: PostCategoryId): void {
    const exists = filters.kategorien.includes(id);
    update({
      ...filters,
      kategorien: exists
        ? filters.kategorien.filter((k) => k !== id)
        : [...filters.kategorien, id],
    });
  }

  function setZeit(id: TimeFilter): void {
    update({ ...filters, zeit: id });
  }

  function reset(): void {
    update({ quartiere: [], kategorien: [], zeit: "woche" });
  }

  const quartierLabel =
    filters.quartiere.length === 0
      ? "Alle Quartiere"
      : filters.quartiere.length === 1
      ? SELECTABLE_QUARTIERE.find((q) => q.id === filters.quartiere[0])?.label ?? "Quartier"
      : `${filters.quartiere.length} Quartiere`;

  const kategorieLabel =
    filters.kategorien.length === 0
      ? "Alle Kategorien"
      : filters.kategorien.length === 1
      ? POST_CATEGORIES.find((c) => c.id === filters.kategorien[0])?.label ?? "Kategorie"
      : `${filters.kategorien.length} Kategorien`;

  const zeitLabel = TIME_FILTERS.find((t) => t.id === filters.zeit)?.label ?? "Zeit";
  const hasFilters = !isFiltersDefault(filters);

  return (
    <section
      className="container-editorial pb-2"
      aria-label="Filter"
    >
      {/* Desktop / tablet */}
      <div className="hidden sm:flex items-center gap-2 flex-wrap">
        <PillDropdown
          label={quartierLabel}
          active={filters.quartiere.length > 0}
          isOpen={open === "quartier"}
          onToggle={() => setOpen(open === "quartier" ? null : "quartier")}
          onClose={() => setOpen(null)}
        >
          <DropdownPanel title="Quartier" subtitle="Mehrfachauswahl möglich">
            <div className="grid grid-cols-2 gap-1 max-h-[60vh] overflow-y-auto">
              {SELECTABLE_QUARTIERE.map((q) => {
                const isOn = filters.quartiere.includes(q.id);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => toggleQuartier(q.id)}
                    aria-pressed={isOn}
                    className={`flex items-start justify-between gap-2 px-3 py-2 rounded-md text-left text-[13px] transition-colors ${
                      isOn
                        ? "bg-burgundy/8 text-ink"
                        : "hover:bg-paper-dim text-ink-muted hover:text-ink"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-ink leading-tight">{q.label}</div>
                      {q.hint ? (
                        <div className="text-[11px] text-ink-faint mt-0.5 truncate">
                          {q.hint}
                        </div>
                      ) : null}
                    </div>
                    {isOn ? (
                      <Check className="w-3.5 h-3.5 text-burgundy shrink-0 mt-0.5" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </DropdownPanel>
        </PillDropdown>

        <PillDropdown
          label={kategorieLabel}
          active={filters.kategorien.length > 0}
          isOpen={open === "kategorie"}
          onToggle={() => setOpen(open === "kategorie" ? null : "kategorie")}
          onClose={() => setOpen(null)}
        >
          <DropdownPanel title="Kategorie" subtitle="Mehrfachauswahl möglich">
            <div className="flex flex-col gap-1">
              {POST_CATEGORIES.map((c) => {
                const isOn = filters.kategorien.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleKategorie(c.id)}
                    aria-pressed={isOn}
                    className={`flex items-center justify-between gap-3 px-3 py-2 rounded-md text-left text-[13px] transition-colors ${
                      isOn
                        ? "bg-burgundy/8 text-ink"
                        : "hover:bg-paper-dim text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="font-medium text-ink truncate">{c.label}</span>
                      <span className="text-[11px] text-ink-faint truncate hidden sm:inline">
                        · {c.description}
                      </span>
                    </span>
                    {isOn ? (
                      <Check className="w-3.5 h-3.5 text-burgundy shrink-0" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </DropdownPanel>
        </PillDropdown>

        <PillDropdown
          label={zeitLabel}
          active={filters.zeit !== "woche"}
          isOpen={open === "zeit"}
          onToggle={() => setOpen(open === "zeit" ? null : "zeit")}
          onClose={() => setOpen(null)}
        >
          <DropdownPanel title="Zeitraum" subtitle="Eine Auswahl">
            <div className="flex flex-col gap-1">
              {TIME_FILTERS.map((t) => {
                const isOn = filters.zeit === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setZeit(t.id)}
                    aria-pressed={isOn}
                    className={`flex items-center justify-between gap-3 px-3 py-2 rounded-md text-left text-[13px] transition-colors ${
                      isOn
                        ? "bg-burgundy/8 text-ink"
                        : "hover:bg-paper-dim text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span>
                      <span className="font-medium text-ink">{t.label}</span>
                      <span className="text-[11px] text-ink-faint ml-2">{t.hint}</span>
                    </span>
                    {isOn ? (
                      <Check className="w-3.5 h-3.5 text-burgundy" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </DropdownPanel>
        </PillDropdown>

        <div className="flex-1" />

        {hasFilters ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-[12px] text-ink-muted hover:text-burgundy transition-colors"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2} />
            Alle Filter zurücksetzen
          </button>
        ) : null}

        <button
          type="button"
          aria-label="Pinnwand durchsuchen"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-line hover:bg-paper-dim transition-colors text-ink-muted"
        >
          <Search className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>

      {/* Mobile: single trigger that opens a bottom sheet */}
      <div className="sm:hidden flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMobileSheet(true)}
          className={`flex-1 inline-flex items-center justify-between gap-2 px-4 h-11 rounded-full border text-[13px] font-medium transition-colors ${
            hasFilters
              ? "border-burgundy text-burgundy bg-burgundy/[0.04]"
              : "border-line text-ink-muted bg-card"
          }`}
        >
          <span className="truncate">
            {hasFilters
              ? `${filters.quartiere.length + filters.kategorien.length} aktiv · ${zeitLabel}`
              : `Filter · ${zeitLabel}`}
          </span>
          <ChevronDown className="w-4 h-4 shrink-0" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Suche"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line text-ink-muted bg-card"
        >
          <Search className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-3 text-[12px] text-ink-faint tabular-nums">
        {resultCount} {resultCount === 1 ? "Beitrag" : "Beiträge"}
      </div>

      {mobileSheet ? (
        <MobileFilterSheet
          filters={filters}
          onClose={() => setMobileSheet(false)}
          onToggleQuartier={toggleQuartier}
          onToggleKategorie={toggleKategorie}
          onSetZeit={setZeit}
          onReset={reset}
        />
      ) : null}
    </section>
  );
}

function PillDropdown({
  label,
  active,
  isOpen,
  onToggle,
  onClose,
  children,
}: {
  label: string;
  active: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    function onDocClick(e: MouseEvent): void {
      if (!rootRef.current?.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-2 px-4 h-9 rounded-full border text-[13px] font-medium transition-colors ${
          active
            ? "border-burgundy text-burgundy bg-burgundy/[0.04]"
            : "border-line text-ink-muted hover:bg-paper-dim hover:text-ink"
        }`}
      >
        <span className="truncate max-w-[200px]">{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      {isOpen ? children : null}
    </div>
  );
}

function DropdownPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute left-0 top-[calc(100%+8px)] z-30 w-[320px] sm:w-[360px] bg-card border border-line rounded-xl shadow-[var(--shadow-modal)] p-3 fade-in"
      role="dialog"
    >
      <div className="px-2 pb-2 mb-1 border-b border-line">
        <div className="font-display text-[14px] tracking-[-0.01em] text-ink">{title}</div>
        {subtitle ? (
          <div className="text-[11px] uppercase tracking-[0.12em] text-ink-faint mt-0.5">
            {subtitle}
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function MobileFilterSheet({
  filters,
  onClose,
  onToggleQuartier,
  onToggleKategorie,
  onSetZeit,
  onReset,
}: {
  filters: PinnwandFilterState;
  onClose: () => void;
  onToggleQuartier: (id: QuartierId) => void;
  onToggleKategorie: (id: PostCategoryId) => void;
  onSetZeit: (id: TimeFilter) => void;
  onReset: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end fade-in"
      role="dialog"
      aria-label="Filter auswählen"
    >
      <button
        type="button"
        aria-label="Schliessen"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />
      <div className="relative bg-paper rounded-t-2xl max-h-[88dvh] overflow-y-auto">
        <div className="sticky top-0 bg-paper px-5 pt-4 pb-3 flex items-center justify-between border-b border-line">
          <div className="font-display text-[20px] text-ink">Filter</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schliessen"
            className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-paper-dim"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="px-5 py-5 space-y-7">
          <SheetSection title="Zeitraum">
            <div className="flex flex-wrap gap-2">
              {TIME_FILTERS.map((t) => {
                const isOn = filters.zeit === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onSetZeit(t.id)}
                    className={`px-4 h-9 rounded-full text-[13px] font-medium border transition-colors ${
                      isOn
                        ? "border-burgundy text-burgundy bg-burgundy/[0.04]"
                        : "border-line text-ink-muted"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </SheetSection>

          <SheetSection title="Kategorien">
            <div className="flex flex-wrap gap-2">
              {POST_CATEGORIES.map((c) => {
                const isOn = filters.kategorien.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onToggleKategorie(c.id)}
                    className={`inline-flex items-center gap-2 px-3 h-9 rounded-full text-[13px] font-medium border transition-colors ${
                      isOn
                        ? "border-burgundy text-burgundy bg-burgundy/[0.04]"
                        : "border-line text-ink-muted"
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
          </SheetSection>

          <SheetSection title="Quartiere">
            <div className="flex flex-wrap gap-2">
              {SELECTABLE_QUARTIERE.map((q) => {
                const isOn = filters.quartiere.includes(q.id);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => onToggleQuartier(q.id)}
                    className={`px-3 h-9 rounded-full text-[13px] font-medium border transition-colors ${
                      isOn
                        ? "border-burgundy text-burgundy bg-burgundy/[0.04]"
                        : "border-line text-ink-muted"
                    }`}
                  >
                    {q.label}
                  </button>
                );
              })}
            </div>
          </SheetSection>
        </div>
        <div className="sticky bottom-0 bg-paper border-t border-line px-5 py-3 flex gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 h-11 rounded-full border border-line text-[13px] font-medium text-ink-muted"
          >
            Zurücksetzen
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-[2] h-11 rounded-full bg-ink text-paper text-[14px] font-medium"
          >
            Anwenden
          </button>
        </div>
      </div>
    </div>
  );
}

function SheetSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-3 font-medium">
        {title}
      </div>
      {children}
    </section>
  );
}

