"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  STIMMUNGEN,
  STIMMUNG_LABEL,
  type Stimmung,
} from "@/lib/eventkalender";

export interface AdvancedFilters {
  preisMax: number;
  stimmungen: Stimmung[];
  rollstuhl: boolean;
  mitHund: boolean;
  kinderwagen: boolean;
  hoergeraet: boolean;
  nurVerifiziert: boolean;
  tageszeitMin: number;
  tageszeitMax: number;
  wochentage: number[];
}

export const DEFAULT_ADVANCED: AdvancedFilters = {
  preisMax: 200,
  stimmungen: [],
  rollstuhl: false,
  mitHund: false,
  kinderwagen: false,
  hoergeraet: false,
  nurVerifiziert: false,
  tageszeitMin: 6,
  tageszeitMax: 26,
  wochentage: [],
};

const WOCHENTAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export function FilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
}: {
  open: boolean;
  onClose: () => void;
  filters: AdvancedFilters;
  setFilters: (f: AdvancedFilters) => void;
}) {
  const toggleStimmung = (s: Stimmung) => {
    setFilters({
      ...filters,
      stimmungen: filters.stimmungen.includes(s)
        ? filters.stimmungen.filter((x) => x !== s)
        : [...filters.stimmungen, s],
    });
  };

  const toggleWochentag = (d: number) => {
    setFilters({
      ...filters,
      wochentage: filters.wochentage.includes(d)
        ? filters.wochentage.filter((x) => x !== d)
        : [...filters.wochentage, d],
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:w-[420px] h-full bg-paper border-l border-line shadow-modal overflow-y-auto flex flex-col"
          >
            <header className="sticky top-0 bg-paper/95 backdrop-blur border-b border-line px-6 py-4 flex items-center justify-between z-10">
              <div>
                <p className="eyebrow">Erweiterte Filter</p>
                <h3 className="font-display text-2xl mt-0.5">Mehr Filter</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-paper-dim"
                aria-label="Schliessen"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 px-6 py-6 space-y-8">
              {/* Preis */}
              <section>
                <p className="eyebrow mb-2">Preis</p>
                <div className="flex items-center justify-between text-[13px] mb-1">
                  <span className="text-ink-muted">CHF 0</span>
                  <span className="font-medium tabular-nums">
                    {filters.preisMax >= 200 ? "200+" : `CHF ${filters.preisMax}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={10}
                  value={filters.preisMax}
                  onChange={(e) =>
                    setFilters({ ...filters, preisMax: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-burgundy"
                />
              </section>

              {/* Stimmung */}
              <section>
                <p className="eyebrow mb-3">Stimmung</p>
                <div className="flex flex-wrap gap-1.5">
                  {STIMMUNGEN.map((s) => {
                    const active = filters.stimmungen.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleStimmung(s)}
                        className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                          active
                            ? "bg-ink text-paper border-ink"
                            : "border-line bg-card hover:border-burgundy"
                        }`}
                      >
                        {STIMMUNG_LABEL[s]}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Zugänglichkeit */}
              <section>
                <p className="eyebrow mb-3">Zugänglichkeit</p>
                <div className="space-y-2 text-[13px]">
                  <Check label="Rollstuhl-zugänglich" checked={filters.rollstuhl} onChange={(v) => setFilters({ ...filters, rollstuhl: v })} />
                  <Check label="Mit Hund erlaubt" checked={filters.mitHund} onChange={(v) => setFilters({ ...filters, mitHund: v })} />
                  <Check label="Kinderwagen-tauglich" checked={filters.kinderwagen} onChange={(v) => setFilters({ ...filters, kinderwagen: v })} />
                  <Check label="Hörgeräte-Schleife" checked={filters.hoergeraet} onChange={(v) => setFilters({ ...filters, hoergeraet: v })} />
                </div>
              </section>

              {/* Anbieter */}
              <section>
                <p className="eyebrow mb-3">Anbieter</p>
                <Check
                  label="Nur verifizierte Anbieter"
                  checked={filters.nurVerifiziert}
                  onChange={(v) => setFilters({ ...filters, nurVerifiziert: v })}
                />
                <p className="text-[11.5px] text-ink-faint mt-2">
                  Inklusive privater Mikro-Events nur deaktivieren, wenn nur professionelle Anbieter gewünscht.
                </p>
              </section>

              {/* Zeit-Detail */}
              <section>
                <p className="eyebrow mb-3">Tageszeit</p>
                <div className="flex items-center justify-between text-[13px] mb-1 tabular-nums">
                  <span>{filters.tageszeitMin}:00</span>
                  <span className="text-ink-faint">–</span>
                  <span>{filters.tageszeitMax > 24 ? `${filters.tageszeitMax - 24}:00 (+1)` : `${filters.tageszeitMax}:00`}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="range" min={6} max={23} value={filters.tageszeitMin}
                    onChange={(e) => setFilters({ ...filters, tageszeitMin: parseInt(e.target.value, 10) })}
                    className="accent-burgundy"
                  />
                  <input
                    type="range" min={12} max={26} value={filters.tageszeitMax}
                    onChange={(e) => setFilters({ ...filters, tageszeitMax: parseInt(e.target.value, 10) })}
                    className="accent-burgundy"
                  />
                </div>

                <p className="eyebrow mt-5 mb-2">Wochentag</p>
                <div className="flex gap-1.5">
                  {WOCHENTAGE.map((w, i) => {
                    const active = filters.wochentage.includes(i);
                    return (
                      <button
                        key={w}
                        onClick={() => toggleWochentag(i)}
                        className={`flex-1 text-[12px] py-2 rounded-lg border transition-colors ${
                          active
                            ? "bg-ink text-paper border-ink"
                            : "border-line bg-card hover:border-burgundy"
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            <footer className="sticky bottom-0 bg-paper/95 backdrop-blur border-t border-line px-6 py-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setFilters(DEFAULT_ADVANCED)}
                className="text-[12.5px] uppercase tracking-wider text-ink-muted hover:text-burgundy"
              >
                Alle zurücksetzen
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-ink text-paper text-[13px] font-medium hover:bg-burgundy transition-colors"
              >
                Anwenden
              </button>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-burgundy w-4 h-4"
      />
      <span>{label}</span>
    </label>
  );
}
