"use client";

import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Train,
  Heart,
  Sparkles,
  Bookmark,
  Calendar,
  ShieldCheck,
  Vote,
  MapPin,
  ShoppingBag,
  MessageCircle,
  Radio,
  Compass,
} from "lucide-react";
import { useCurrentProfile, useViewMode } from "@/lib/viewMode";
import { AIConciergeTeaser } from "@/components/AIConciergeTeaser";
import { PulseMap } from "@/components/PulseMap";
import { CrossModuleLinks } from "@/components/CrossModuleLinks";

function timeGreeting() {
  const h = new Date().getHours();
  if (h < 5) return "Gute Nacht";
  if (h < 11) return "Guten Morgen";
  if (h < 14) return "Mittag";
  if (h < 18) return "Guten Tag";
  return "Guten Abend";
}

const HEUTE_CARDS = [
  { kind: "event", category: "Konzert" },
  { kind: "ort", category: "Restaurant" },
  { kind: "event", category: "Vernissage" },
  { kind: "ort", category: "Bar" },
] as const;

const VERIFIED_UPDATES = [
  { source: "ZVV", text: "Tram 11 — 8 Min Verspätung, Bahnhof Stadelhofen" },
  { source: "MeteoSchweiz", text: "12°, leichter Regen — heute Abend trocken" },
  { source: "Stadtpolizei", text: "Keine Meldungen für deine Strecke" },
];

const QUARTIER_CARDS = [
  { tag: "Heute Abend", title: "[Event in deinem Quartier]" },
  { tag: "Diese Woche", title: "[Markt im Quartier]" },
  { tag: "Premium", title: "[Restaurant-Empfehlung]" },
];

const STADT_DIALOG = [
  { title: "[Initiative 1]", type: "Bürger-Initiative" },
  { title: "[Frage des Tages]", type: "Stadt-Frage" },
  { title: "[Diskussion im Kreis]", type: "Quartier-Debatte" },
];

const MARKT_ITEMS = [
  { cat: "WG", title: "[2-Zi im Quartier]" },
  { cat: "Möbel", title: "[Sofa zu verschenken]" },
  { cat: "Sitter", title: "[Katzen-Sitter gesucht]" },
];

export default function DashboardPage() {
  const profile = useCurrentProfile();
  const { state } = useViewMode();

  // If user is in public mode, gently hint they can switch
  const isDashboard = state.mode === "dashboard";

  return (
    <>
      {!isDashboard && (
        <div className="bg-burgundy/[0.06] border-b border-burgundy/20">
          <div className="container-editorial py-3 flex items-center gap-3 text-[12.5px]">
            <Sparkles
              className="w-4 h-4 text-burgundy shrink-0"
              strokeWidth={1.8}
            />
            <span className="text-ink-muted">
              Du siehst gerade die Dashboard-Sicht. Wechsle oben rechts auf{" "}
              <strong>Mein Züri</strong>, um voll personalisiert zu navigieren.
            </span>
          </div>
        </div>
      )}

      {/* 1 — DAILY BRIEFING ──────────────────────────────────── */}
      <section className="container-editorial pt-10 md:pt-14 pb-10">
        <p className="eyebrow">Daily Briefing</p>
        <h1 className="font-display text-5xl md:text-7xl mt-2 leading-[0.95] tracking-tight">
          {timeGreeting()}, <span className="italic">{profile.name}</span>.
        </h1>
        <p className="text-ink-muted text-[15px] mt-4 max-w-xl">
          {profile.district} · {profile.interests.join(" · ")}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-brass" strokeWidth={1.8} />
              <p className="eyebrow">Wetter</p>
            </div>
            <p className="font-display text-3xl mt-3">12°</p>
            <p className="text-[13px] text-ink-muted mt-1">
              Leichter Regen · heute Abend trocken
            </p>
          </div>
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
              <p className="eyebrow">Verkehr</p>
            </div>
            <p className="font-display text-xl mt-3 leading-tight">
              Tram 11: 8 Min Verspätung
            </p>
            <p className="text-[13px] text-ink-muted mt-1">
              Andere Strecken normal
            </p>
          </div>
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
              <p className="eyebrow">Für dich heute</p>
            </div>
            <p className="font-display text-xl mt-3 leading-tight">
              Klang &amp; Kerzenschein
            </p>
            <p className="text-[13px] text-ink-muted mt-1">
              Schauspielhaus · du hattest das gebookmarkt
            </p>
            <Link
              href="/entdecken/kalender"
              className="inline-flex items-center gap-1 mt-3 text-[12.5px] font-medium text-burgundy hover:gap-2 transition-all"
            >
              Mehr <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — AI-CONCIERGE ─────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <AIConciergeTeaser variant="hero" />
      </section>

      {/* 3 — LIVE-PULSE-MAP ──────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <PulseMap />
      </section>

      {/* 4 — HEUTE IN DEINEM ZÜRICH ───────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Personalisiert</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">
              Heute in deinem Zürich
            </h2>
          </div>
          <Link
            href="/entdecken"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Mehr für dich →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {HEUTE_CARDS.map((c, i) => (
            <article
              key={i}
              className="bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow overflow-hidden flex flex-col"
            >
              <div className="aspect-[5/3] bg-paper-dim flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-wider text-ink-faint">
                  [Bild]
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.18em] text-burgundy">
                  {c.kind === "event" ? "Event" : "Ort"} · {c.category}
                </p>
                <h3 className="font-display text-lg mt-1.5 leading-tight">
                  [Titel folgt]
                </h3>
                <p className="text-[12.5px] text-ink-muted mt-1.5 flex-1">
                  [Beschreibung folgt in Phase 2.]
                </p>
                <CrossModuleLinks
                  links={[
                    { label: "Posts", href: "/puls" },
                    { label: "Nahe Orte", href: "/entdecken/orte" },
                    { label: "Tausch", href: "/markt" },
                  ]}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5 — AUS DEM PULS ─────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Puls</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">
              Aus dem Puls
            </h2>
          </div>
          <Link
            href="/puls"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Zum Feed →
          </Link>
        </div>

        <div className="bg-card border border-line rounded-2xl card-shadow overflow-hidden">
          <div className="px-5 py-3 border-b border-line bg-paper-dim/50 flex items-center gap-2">
            <ShieldCheck
              className="w-4 h-4 text-burgundy"
              strokeWidth={1.8}
            />
            <p className="eyebrow">Verifizierte Live-Updates</p>
          </div>
          <ul className="divide-y divide-line">
            {VERIFIED_UPDATES.map((u, i) => (
              <li key={i} className="px-5 py-3 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded-full bg-burgundy/10 text-burgundy text-[10px] font-medium uppercase tracking-wider shrink-0">
                  {u.source}
                </span>
                <p className="text-[13px] flex-1">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-line rounded-2xl p-5 card-shadow"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-paper-dim" />
                <div>
                  <p className="text-[12px] font-medium leading-none">
                    @platzhalter
                  </p>
                  <p className="text-[10.5px] text-ink-faint mt-0.5">
                    Kreis 5 · vor 12 Min
                  </p>
                </div>
              </div>
              <p className="text-[13.5px] mt-3 leading-snug">
                [Community-Post gefiltert auf deine Interessen — folgt in
                Phase 2.]
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 — MEIN QUARTIER ───────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Mein Quartier</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">
              {profile.district}
            </h2>
          </div>
          <Link
            href="/entdecken/orte"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Mehr aus meinem Quartier →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {QUARTIER_CARDS.map((c, i) => (
            <article
              key={i}
              className="bg-card border border-line rounded-2xl card-shadow p-5"
            >
              <div className="flex items-center gap-2">
                <MapPin
                  className="w-4 h-4 text-burgundy"
                  strokeWidth={1.8}
                />
                <p className="eyebrow">{c.tag}</p>
              </div>
              <h3 className="font-display text-xl mt-3 leading-tight">
                {c.title}
              </h3>
              <p className="text-[12.5px] text-ink-muted mt-2">
                [Details folgen in Phase 2.]
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 7 — SAISON ──────────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div
          className="rounded-3xl overflow-hidden p-8 md:p-10 grid md:grid-cols-[1.2fr_auto] gap-6 items-center text-paper"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #0a1733 0%, #093a82 55%, #0f4da8 100%)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-paper" strokeWidth={1.8} />
              <p className="eyebrow text-paper-dim">Saison</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Sechseläuten — in 47 Tagen.
            </h2>
            <p className="text-paper-dim text-[15px] mt-2 max-w-md">
              Du hast Sechseläuten letztes Jahr gebookmarkt — willst du dieses
              Jahr wieder dabei sein?
            </p>
          </div>
          <Link
            href="/entdecken/kalender?view=year"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-paper text-ink font-medium text-[13px] hover:bg-paper-dim transition-colors shrink-0"
          >
            Zum Jahres-Kalender <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 8 — STADT-DIALOG ────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Stadt-Dialog</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">
              Was du noch nicht abgestimmt hast{" "}
              <span className="text-burgundy">(3)</span>
            </h2>
          </div>
          <Link
            href="/stadt-dialog"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Zum Stadt-Dialog →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {STADT_DIALOG.map((s, i) => (
            <article
              key={i}
              className="bg-card border border-line rounded-2xl card-shadow p-5 flex flex-col"
            >
              <div className="flex items-center gap-2">
                <Vote className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
                <p className="eyebrow">{s.type}</p>
              </div>
              <h3 className="font-display text-xl mt-3 leading-tight">
                {s.title}
              </h3>
              <p className="text-[12.5px] text-ink-muted mt-2 flex-1">
                [Kurzbeschreibung folgt in Phase 2.]
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-full bg-burgundy text-white text-[12px] font-medium hover:bg-burgundy-dark transition-colors">
                  Dafür
                </button>
                <button className="flex-1 px-3 py-2 rounded-full border border-line text-[12px] font-medium hover:bg-paper-dim transition-colors">
                  Dagegen
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9 — MARKTPLATZ-STREIFLICHT ──────────────────────────── */}
      <section className="container-editorial pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Aus dem Quartier</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">
              Markt-Streiflicht
            </h2>
          </div>
          <Link
            href="/markt"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Zum Markt →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {MARKT_ITEMS.map((m, i) => (
            <Link
              key={i}
              href="/markt"
              className="block bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow p-5"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag
                  className="w-4 h-4 text-burgundy"
                  strokeWidth={1.8}
                />
                <p className="eyebrow">{m.cat}</p>
              </div>
              <h3 className="font-display text-lg mt-3 leading-tight">
                {m.title}
              </h3>
              <p className="text-[12px] text-ink-faint mt-2">
                {profile.district}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bookmarks-Übersicht (klein, dezent) */}
      <section className="container-editorial pb-20">
        <div className="bg-paper-dim/60 border border-line rounded-2xl p-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-ink-muted">
            <Bookmark className="w-4 h-4" strokeWidth={1.8} />
            <span className="text-[13px]">Deine Bookmarks</span>
          </div>
          <div className="flex gap-4 text-[13px]">
            <span>
              <strong>{profile.bookmarks.events}</strong> Events
            </span>
            <span>
              <strong>{profile.bookmarks.places}</strong> Orte
            </span>
          </div>
          <Link
            href="/profile"
            className="ml-auto text-[13px] font-medium text-burgundy hover:underline"
          >
            Mein Profil →
          </Link>
        </div>
      </section>
    </>
  );
}
