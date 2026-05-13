"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  EVENTS,
  TODAY_ISO,
  TODAY_DATE,
  type EventX,
  type Kategorie,
  type Stadtteil,
} from "@/lib/eventkalender";
import { HeroSlideshow } from "@/components/kalender/HeroSlideshow";
import {
  SmartFilterBar,
  QuickChips,
  ActiveFiltersBar,
  type ViewMode,
  type ZeitFilter,
} from "@/components/kalender/SmartFilterBar";
import {
  FilterDrawer,
  DEFAULT_ADVANCED,
  type AdvancedFilters,
} from "@/components/kalender/FilterDrawer";
import {
  AISuggestion,
  BentoGrid,
  AllHorizontalRows,
  SeasonSection,
  DistrictSpotlight,
  EditorialStoriesGrid,
  ClassicCTA,
  SmartEmptyState,
} from "@/components/kalender/Sections";
import {
  ListeView,
  GridView,
  KalenderView,
  KarteView,
} from "@/components/kalender/Views";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KalenderPage />
    </Suspense>
  );
}

function KalenderPage() {
  const params = useSearchParams();
  const router = useRouter();

  const initialView = normalizeView(params?.get("view"));

  const [view, setView] = useState<ViewMode>(initialView);
  const [zeit, setZeit] = useState<ZeitFilter>("heute");
  const [kategorien, setKategorien] = useState<Kategorie[]>([]);
  const [stadtteile, setStadtteile] = useState<Stadtteil[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [advanced, setAdvanced] = useState<AdvancedFilters>(DEFAULT_ADVANCED);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sync ?view= to URL
  useEffect(() => {
    const sp = new URLSearchParams();
    if (view !== "magazin") sp.set("view", view);
    if (zeit !== "heute") sp.set("zeit", zeit);
    if (kategorien.length > 0) sp.set("kat", kategorien.join(","));
    if (stadtteile.length > 0)
      sp.set("stadtteil", stadtteile.map((s) => s.replace(/\s/g, "")).join(","));
    if (chips.length > 0) sp.set("chips", chips.join(","));
    const qs = sp.toString();
    router.replace(`/entdecken/kalender${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [view, zeit, kategorien, stadtteile, chips, router]);

  const filtered = useMemo(() => filterEvents(EVENTS, {
    zeit, kategorien, stadtteile, chips, advanced,
  }), [zeit, kategorien, stadtteile, chips, advanced]);

  const totalActiveFilters =
    (zeit !== "heute" ? 1 : 0) +
    (kategorien.length > 0 ? 1 : 0) +
    (stadtteile.length > 0 ? 1 : 0) +
    chips.length +
    (advanced.stimmungen.length > 0 ? 1 : 0) +
    (advanced.preisMax < 200 ? 1 : 0) +
    (advanced.rollstuhl ? 1 : 0) +
    (advanced.mitHund ? 1 : 0) +
    (advanced.kinderwagen ? 1 : 0) +
    (advanced.hoergeraet ? 1 : 0) +
    (advanced.nurVerifiziert ? 1 : 0) +
    (advanced.wochentage.length > 0 ? 1 : 0);

  const resetAll = () => {
    setZeit("heute");
    setKategorien([]);
    setStadtteile([]);
    setChips([]);
    setAdvanced(DEFAULT_ADVANCED);
  };

  return (
    <>
      {view === "magazin" && <HeroSlideshow />}

      <SmartFilterBar
        zeit={zeit} setZeit={setZeit}
        kategorien={kategorien} setKategorien={setKategorien}
        stadtteile={stadtteile} setStadtteile={setStadtteile}
        view={view} setView={setView}
        openDrawer={() => setDrawerOpen(true)}
        totalCount={filtered.length}
      />

      <QuickChips active={chips} setActive={setChips} />

      <ActiveFiltersBar total={totalActiveFilters} onReset={resetAll} />

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={advanced}
        setFilters={setAdvanced}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {filtered.length === 0 && totalActiveFilters > 0 ? (
            <SmartEmptyState onReset={resetAll} />
          ) : view === "magazin" ? (
            <MagazinView />
          ) : view === "liste" ? (
            <ListeView events={filtered.length > 0 ? filtered : EVENTS} />
          ) : view === "grid" ? (
            <GridView events={filtered.length > 0 ? filtered : EVENTS} />
          ) : view === "kalender" ? (
            <KalenderView events={filtered.length > 0 ? filtered : EVENTS} />
          ) : (
            <KarteView events={filtered.length > 0 ? filtered : EVENTS} />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function MagazinView() {
  return (
    <>
      <AISuggestion />
      <BentoGrid />
      <AllHorizontalRows />
      <SeasonSection />
      <DistrictSpotlight />
      <EditorialStoriesGrid />
      <ClassicCTA />
      <div className="pb-16" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// FILTER LOGIC
// ─────────────────────────────────────────────────────────────

function normalizeView(raw: string | null | undefined): ViewMode {
  if (raw === "liste" || raw === "grid" || raw === "kalender" || raw === "karte" || raw === "magazin") return raw;
  // Backward-compat with old kalender view params (today/week/month/year)
  if (raw === "today" || raw === "week" || raw === "month") return "liste";
  if (raw === "year") return "magazin";
  return "magazin";
}

interface FilterOpts {
  zeit: ZeitFilter;
  kategorien: Kategorie[];
  stadtteile: Stadtteil[];
  chips: string[];
  advanced: AdvancedFilters;
}

function filterEvents(events: EventX[], opts: FilterOpts): EventX[] {
  const today = TODAY_ISO;
  const tomorrow = nextIso(1);
  const weekendStart = nextWeekendStart();
  const weekendEnd = nextWeekendEnd();
  const weekEnd = nextIso(6);
  const monthEnd = endOfMonth();

  return events.filter((e) => {
    const start = e.startDatum;
    const end = e.endDatum ?? e.startDatum;

    // ZEIT
    if (opts.zeit === "heute" && !(today >= start && today <= end)) return false;
    if (opts.zeit === "morgen" && !(tomorrow >= start && tomorrow <= end)) return false;
    if (opts.zeit === "wochenende" && (end < weekendStart || start > weekendEnd)) return false;
    if (opts.zeit === "diese-woche" && (end < today || start > weekEnd)) return false;
    if (opts.zeit === "dieser-monat" && (end < today || start > monthEnd)) return false;
    // alle: pass

    // KATEGORIE
    if (opts.kategorien.length > 0 && !opts.kategorien.includes(e.kategorie)) return false;

    // STADTTEIL
    if (opts.stadtteile.length > 0 && !opts.stadtteile.includes(e.ort.stadtteil)) return false;

    // CHIPS
    for (const c of opts.chips) {
      if (c === "gratis" && !e.flags?.gratis) return false;
      if (c === "indoor" && !e.flags?.indoor) return false;
      if (c === "kinderfreundlich" && !e.flags?.kinderfreundlich) return false;
      if (c === "barDanach" && !e.flags?.barDanach) return false;
      if (c === "reservation" && !e.flags?.reservation) return false;
      if (c === "spontan" && !e.flags?.spontan) return false;
      if (c === "dateNight" && !e.flags?.dateNight) return false;
      if (c === "mitHund" && !e.flags?.mitHund) return false;
    }

    // ADVANCED
    if (opts.advanced.preisMax < 200 && e.preis.min > opts.advanced.preisMax) return false;
    if (opts.advanced.stimmungen.length > 0 && !opts.advanced.stimmungen.some((s) => e.stimmung.includes(s))) return false;
    if (opts.advanced.rollstuhl && !e.flags?.rollstuhl) return false;
    if (opts.advanced.mitHund && !e.flags?.mitHund) return false;
    if (opts.advanced.kinderwagen && !e.flags?.kinderwagen) return false;
    if (opts.advanced.nurVerifiziert && e.anbieter.verifikation === "standard") return false;
    if (opts.advanced.wochentage.length > 0) {
      const d = new Date(start + "T08:00:00+02:00");
      const mon0 = (d.getDay() + 6) % 7;
      if (!opts.advanced.wochentage.includes(mon0)) return false;
    }
    if (e.zeitStart) {
      const [hh] = e.zeitStart.split(":").map(Number);
      if (hh < opts.advanced.tageszeitMin) return false;
      if (hh > opts.advanced.tageszeitMax) return false;
    }

    return true;
  });
}

function nextIso(daysAhead: number): string {
  const d = new Date(TODAY_DATE);
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

function nextWeekendStart(): string {
  const d = new Date(TODAY_DATE);
  const mon0 = (d.getDay() + 6) % 7; // 0=Mon
  const delta = mon0 < 5 ? 5 - mon0 : 0; // Friday=5? actually Sat=5 mon0
  // Saturday is mon0 === 5
  const offset = mon0 <= 5 ? 5 - mon0 : 5 + (7 - mon0);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
  void delta;
}

function nextWeekendEnd(): string {
  const d = new Date(TODAY_DATE);
  const mon0 = (d.getDay() + 6) % 7;
  const offset = mon0 <= 6 ? 6 - mon0 : 6 + (7 - mon0);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function endOfMonth(): string {
  const d = new Date(TODAY_DATE);
  const eom = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return eom.toISOString().slice(0, 10);
}
