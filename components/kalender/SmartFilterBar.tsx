"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Filter,
  Sparkles,
  List,
  LayoutGrid,
  CalendarDays,
  MapPin as MapPinIcon,
  X,
} from "lucide-react";
import {
  KATEGORIEN,
  KATEGORIE_LABEL,
  STADTTEILE,
  type Kategorie,
  type Stadtteil,
} from "@/lib/eventkalender";

export type ViewMode = "magazin" | "liste" | "grid" | "kalender" | "karte";
export type ZeitFilter = "heute" | "morgen" | "wochenende" | "diese-woche" | "dieser-monat" | "alle";

const VIEW_MODES: { key: ViewMode; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "magazin", label: "Magazin", Icon: Sparkles },
  { key: "liste", label: "Liste", Icon: List },
  { key: "grid", label: "Grid", Icon: LayoutGrid },
  { key: "kalender", label: "Kalender", Icon: CalendarDays },
  { key: "karte", label: "Karte", Icon: MapPinIcon },
];

const ZEIT_OPTIONS: { key: ZeitFilter; label: string }[] = [
  { key: "heute", label: "Heute" },
  { key: "morgen", label: "Morgen" },
  { key: "wochenende", label: "Wochenende" },
  { key: "diese-woche", label: "Diese Woche" },
  { key: "dieser-monat", label: "Dieser Monat" },
  { key: "alle", label: "Alle Termine" },
];

interface Props {
  zeit: ZeitFilter;
  setZeit: (z: ZeitFilter) => void;
  kategorien: Kategorie[];
  setKategorien: (k: Kategorie[]) => void;
  stadtteile: Stadtteil[];
  setStadtteile: (s: Stadtteil[]) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
  openDrawer: () => void;
  totalCount: number;
}

export function SmartFilterBar({
  zeit,
  setZeit,
  kategorien,
  setKategorien,
  stadtteile,
  setStadtteile,
  view,
  setView,
  openDrawer,
  totalCount,
}: Props) {
  const [open, setOpen] = useState<"zeit" | "kategorie" | "stadtteil" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const toggleKategorie = (k: Kategorie) => {
    setKategorien(
      kategorien.includes(k) ? kategorien.filter((x) => x !== k) : [...kategorien, k],
    );
  };
  const toggleStadtteil = (s: Stadtteil) => {
    setStadtteile(
      stadtteile.includes(s) ? stadtteile.filter((x) => x !== s) : [...stadtteile, s],
    );
  };

  const zeitLabel = ZEIT_OPTIONS.find((o) => o.key === zeit)?.label ?? "Heute";
  const katLabel =
    kategorien.length === 0
      ? "Alle Kategorien"
      : kategorien.length === 1
        ? KATEGORIE_LABEL[kategorien[0]]
        : `${kategorien.length} Kategorien`;
  const stadtteilLabel =
    stadtteile.length === 0
      ? "Alle Stadtteile"
      : stadtteile.length === 1
        ? stadtteile[0]
        : `${stadtteile.length} Stadtteile`;

  return (
    <div
      ref={ref}
      className={`sticky top-[97px] z-30 bg-paper/95 backdrop-blur border-b border-line transition-shadow ${
        scrolled ? "shadow-[0_4px_18px_rgba(10,23,51,0.06)]" : ""
      }`}
    >
      <div className="container-editorial py-3 flex items-center gap-2 overflow-x-auto scrollbar-thin">
        {/* Left: filter pills */}
        <div className="flex items-center gap-2 shrink-0">
          <FilterPill
            label={zeitLabel}
            Icon={Calendar}
            active={zeit !== "alle"}
            open={open === "zeit"}
            onToggle={() => setOpen(open === "zeit" ? null : "zeit")}
          />
          <FilterPill
            label={katLabel}
            active={kategorien.length > 0}
            open={open === "kategorie"}
            onToggle={() => setOpen(open === "kategorie" ? null : "kategorie")}
          />
          <FilterPill
            label={stadtteilLabel}
            active={stadtteile.length > 0}
            open={open === "stadtteil"}
            onToggle={() => setOpen(open === "stadtteil" ? null : "stadtteil")}
          />
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline text-[11.5px] text-ink-muted">
            <strong className="text-ink tabular-nums">{totalCount}</strong> Events
          </span>
          <button
            onClick={openDrawer}
            className="hidden sm:inline-flex items-center gap-1.5 text-[12.5px] px-3.5 py-1.5 rounded-full border border-line bg-card hover:border-burgundy"
          >
            <Filter className="w-3.5 h-3.5" />
            Mehr Filter
          </button>
          <ViewSwitcher view={view} setView={setView} />
        </div>
      </div>

      {/* Popovers */}
      <AnimatePresence>
        {open === "zeit" && (
          <Popover>
            <p className="eyebrow mb-2">Wann?</p>
            <div className="grid grid-cols-2 gap-1.5">
              {ZEIT_OPTIONS.map((o) => (
                <button
                  key={o.key}
                  onClick={() => {
                    setZeit(o.key);
                    setOpen(null);
                  }}
                  className={`text-left text-[13px] px-3 py-2 rounded-lg border transition-colors ${
                    zeit === o.key
                      ? "bg-ink text-paper border-ink"
                      : "border-line hover:border-burgundy"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </Popover>
        )}
        {open === "kategorie" && (
          <Popover>
            <p className="eyebrow mb-2">Kategorie · Mehrfachauswahl</p>
            <div className="flex flex-wrap gap-1.5">
              {KATEGORIEN.map((k) => {
                const active = kategorien.includes(k);
                return (
                  <button
                    key={k}
                    onClick={() => toggleKategorie(k)}
                    className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? "bg-ink text-paper border-ink"
                        : "border-line bg-card hover:border-burgundy"
                    }`}
                  >
                    {KATEGORIE_LABEL[k]}
                  </button>
                );
              })}
            </div>
            {kategorien.length > 0 && (
              <button
                onClick={() => setKategorien([])}
                className="mt-2 text-[11px] text-ink-muted hover:text-burgundy"
              >
                Auswahl löschen
              </button>
            )}
          </Popover>
        )}
        {open === "stadtteil" && (
          <Popover>
            <p className="eyebrow mb-2">Stadtteil · Mehrfachauswahl</p>
            <div className="flex flex-wrap gap-1.5 max-w-md">
              {STADTTEILE.map((s) => {
                const active = stadtteile.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleStadtteil(s)}
                    className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? "bg-ink text-paper border-ink"
                        : "border-line bg-card hover:border-burgundy"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {stadtteile.length > 0 && (
              <button
                onClick={() => setStadtteile([])}
                className="mt-2 text-[11px] text-ink-muted hover:text-burgundy"
              >
                Auswahl löschen
              </button>
            )}
          </Popover>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterPill({
  label,
  Icon,
  active,
  open,
  onToggle,
}: {
  label: string;
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[12.5px] font-medium transition-colors shrink-0 ${
        active
          ? "bg-ink text-paper border-ink"
          : open
            ? "border-burgundy bg-card text-burgundy"
            : "border-line bg-card text-ink hover:border-burgundy"
      }`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />}
      {label}
      <ChevronDown
        className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
      />
    </button>
  );
}

function Popover({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="container-editorial py-3 border-t border-line bg-card"
    >
      {children}
    </motion.div>
  );
}

function ViewSwitcher({
  view,
  setView,
}: {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-line bg-card p-0.5 gap-0.5">
      {VIEW_MODES.map(({ key, label, Icon }) => {
        const active = view === key;
        return (
          <button
            key={key}
            onClick={() => setView(key)}
            title={label}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              active
                ? "bg-ink text-paper"
                : "text-ink-muted hover:text-ink hover:bg-paper-dim"
            }`}
            aria-label={label}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}

export function QuickChips({
  active,
  setActive,
}: {
  active: string[];
  setActive: (a: string[]) => void;
}) {
  return (
    <div className="container-editorial pt-3 flex gap-2 overflow-x-auto scrollbar-thin pb-1 -mx-5 px-5 md:mx-0 md:px-5">
      {[
        { key: "gratis", label: "Gratis" },
        { key: "indoor", label: "Indoor (Regen)" },
        { key: "kinderfreundlich", label: "Kinderfreundlich" },
        { key: "barDanach", label: "Bar danach" },
        { key: "reservation", label: "Reservation nötig" },
        { key: "spontan", label: "Heute spontan möglich" },
        { key: "dateNight", label: "Date Night" },
        { key: "mitHund", label: "Mit Hund" },
      ].map(({ key, label }) => {
        const on = active.includes(key);
        return (
          <button
            key={key}
            onClick={() =>
              setActive(on ? active.filter((x) => x !== key) : [...active, key])
            }
            className={`shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-colors ${
              on
                ? "bg-burgundy text-paper border-burgundy"
                : "border-line bg-card text-ink-muted hover:border-burgundy hover:text-ink"
            }`}
          >
            {on && <X className="w-3 h-3" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function ActiveFiltersBar({
  total,
  onReset,
}: {
  total: number;
  onReset: () => void;
}) {
  if (total === 0) return null;
  return (
    <div className="container-editorial py-2 flex items-center justify-between gap-3 border-b border-line">
      <p className="text-[12px] text-ink-muted">
        <strong className="text-ink tabular-nums">{total}</strong> Filter aktiv
      </p>
      <button
        onClick={onReset}
        className="text-[11.5px] uppercase tracking-wider text-ink-muted hover:text-burgundy"
      >
        Alle zurücksetzen
      </button>
    </div>
  );
}
