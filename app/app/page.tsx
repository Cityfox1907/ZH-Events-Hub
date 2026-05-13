"use client";

import Link from "next/link";
import {
  ArrowRight,
  CloudRain,
  Train,
  Heart,
  Sparkles,
  Bookmark,
  Calendar,
  ShieldCheck,
  Vote,
  MapPin,
  ShoppingBag,
  Globe2,
  Camera,
  Ticket,
  Users,
  Compass,
  Languages,
} from "lucide-react";
import { useCurrentProfile, useViewMode } from "@/lib/viewMode";
import { AIConciergeTeaser } from "@/components/AIConciergeTeaser";
import { PulseMap } from "@/components/PulseMap";
import { CrossModuleLinks } from "@/components/CrossModuleLinks";

function timeGreeting(profile: string) {
  const h = new Date().getHours();
  if (profile === "Sarah") {
    if (h < 11) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }
  if (h < 5) return "Gute Nacht";
  if (h < 11) return "Guten Morgen";
  if (h < 14) return "Guten Tag";
  if (h < 18) return "Guten Tag";
  return "Guten Abend";
}

// ── FIKO content (Kreis 11 · Oerlikon) ──────────────────────────
const FIKO_HEUTE = [
  {
    kind: "Konzert · Kreis 1",
    title: "Klang & Kerzenschein — Vivaldi",
    desc: "Du hattest das vor 2 Wochen gebookmarkt",
    meta: "Heute 20:00 · ab CHF 39",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=70",
    badge: "Bookmark",
    href: "/tonight/klang-kerzenschein",
  },
  {
    kind: "Italienisch · Kreis 11",
    title: "Da Angela — Mediterranes Special",
    desc: "Spargel-Risotto, dein Lieblingstisch frei",
    meta: "Heute ab 18:30",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=70",
    href: "/entdecken/orte",
  },
  {
    kind: "Quartier · Kreis 11",
    title: "Velo-Schnellstrasse-Diskussion",
    desc: "Quartier-Versammlung zu deinem Lieblingsthema",
    meta: "Heute 19:00 · Schulhaus Buhn",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70",
    href: "/stadt-dialog",
  },
  {
    kind: "Pop-up · Kreis 1",
    title: "Sterne-Koch Cadonau — Frühstück",
    desc: "7 Gänge zum Frühstück, nur 16 Plätze",
    meta: "So 09:30 · CHF 95",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=70",
    href: "/tonight/fruehstueck-cadonau",
  },
  {
    kind: "Politik · Kreis 11",
    title: "Bürgerversammlung Kreis 11",
    desc: "Budget, Velo-Routen, neue Schulhausideen",
    meta: "Heute 19:30 · Schulhaus Buhn",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=70",
    href: "/stadt-dialog",
  },
  {
    kind: "Konzert · Kreis 11",
    title: "MFO-Park Spätfrühlings-Konzert",
    desc: "Gratis Open-Air, lokales Quartett",
    meta: "Heute 20:00 · Gratis",
    image:
      "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=900&q=70",
    href: "/entdecken/kalender",
  },
];

const FIKO_QUARTIER = [
  {
    tag: "Heute",
    title: "Bürgerversammlung Kreis 11",
    meta: "19:30 · Schulhaus Buhn",
  },
  {
    tag: "Samstag",
    title: "Pop-up-Markt Oerlikon",
    meta: "9–15 Uhr, 40+ Stände",
  },
  {
    tag: "Neu",
    title: "Café Norditalien öffnet",
    meta: "Schaffhauserstrasse · diese Woche",
  },
  {
    tag: "WG",
    title: "3-Zimmer Affoltern · CHF 2'100",
    meta: "ab Juli, Tram-Anschluss",
  },
];

const FIKO_STADT_DIALOG = [
  {
    title: "24h-Tram am Wochenende?",
    options: ["Dafür", "Dagegen", "Egal"],
  },
  {
    title: "Bahnhofplatz neu gestalten?",
    options: ["Variante A", "B", "C"],
  },
  {
    title: "Stadt-Budget Mobilität 2027",
    options: ["−10%", "Gleich", "+30%"],
  },
];

const FIKO_MARKT = [
  {
    cat: "🤝 Nachbarschaft · Kreis 11",
    title: "Wer geht heute Abend einkaufen? Brot bitte!",
    meta: "🟢 Verifizierter Nachbar · in 30 Min",
    href: "/markt/nachbarschaft",
  },
  {
    cat: "🚗 Mitfahr · Oerlikon",
    title: "Morgen 6:00 Oerlikon → Bern HB",
    meta: "🟢 3 Plätze · CHF 25",
    href: "/markt/mitfahr",
  },
  {
    cat: "🎟 Ticket-Tausch · zu deinem Bookmark",
    title: "2× Klang & Kerzenschein heute 20 Uhr",
    meta: "🟢 CHF 70/Paar oder Tausch — du hast Event gebookmarkt",
    href: "/markt/tickets",
  },
];

const FIKO_VERIFIED = [
  {
    source: "ZVV",
    text: "Tram 11 (deine Linie) — 8 Min Verspätung, Bauarbeiten Stauffacher",
  },
  {
    source: "MeteoSchweiz",
    text: "Gewitter heute 19 Uhr — bringt Schirm mit",
  },
  {
    source: "Stadt Zürich",
    text: "Wochenmarkt Oerlikon morgen verlegt nach Hofwiesenstrasse",
  },
];

const FIKO_POSTS = [
  {
    handle: "@PapaJoeOrk",
    badge: "🟢 Nachbar Kreis 11",
    district: "Kreis 11",
    text: "Spielplatz Bremgartner hat neuen Wasserspiel-Bereich — Kinder lieben es.",
  },
  {
    handle: "@VeloPendlerOerl",
    badge: "🟢 Nachbar",
    district: "Kreis 11",
    text: "Velo-Klau gestern Nacht bei Bahnhof Oerlikon — passt auf, Bilder im Anhang.",
  },
];

// ── SARAH content (Expat, Kreis 5) ─────────────────────────────
const SARAH_HEUTE = [
  {
    kind: "Brunch · Kreis 5",
    title: "Daphne & Sons",
    desc: "Apricot croissants — local favourite, no English needed",
    meta: "Today from 9:00",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=70",
    href: "/entdecken/orte",
  },
  {
    kind: "Run-Club · Kreis 11",
    title: "Üetliberg Thursday Run",
    desc: "Open run-group, 8 km, English-friendly",
    meta: "Thu 18:30 · meet Bahnhof Selnau",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=70",
    href: "/markt",
  },
  {
    kind: "Sprach-Tandem · Kreis 5",
    title: "Italiano + English Tandem",
    desc: "Tandem partner gesucht — Italienisch-Konversation",
    meta: "Tonight 19:00 · Bar Sacchi",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=70",
    href: "/markt",
  },
  {
    kind: "Vernissage · Kreis 5",
    title: "Stille Stadt — Anna Berger",
    desc: "Photo-exhibition, English wall-texts available",
    meta: "Today 19:00 · free",
    image:
      "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=900&q=70",
    href: "/tonight/vernissage-stille-stadt",
  },
];

const SARAH_LOCALS = [
  {
    title: "Run-Club Üetliberg",
    desc: "Donnerstag 18:30 — open, English-friendly",
    href: "/markt",
  },
  {
    title: "Italienisch-Tandem",
    desc: "Bar Sacchi · ohne Verpflichtung",
    href: "/markt",
  },
  {
    title: "Internations Zürich",
    desc: "Mittwoch After-Work, Kasernenareal",
    href: "/puls",
  },
  {
    title: "Brunch-Crew Kreis 5",
    desc: "Sonntags, rotiert zwischen 4 Cafés",
    href: "/entdecken/orte",
  },
];

// ── TOM content (Tourist, Hotel Storchen) ──────────────────────
const TOM_PLAN = [
  {
    day: "Tag 1 — Heute",
    title: "Altstadt + Limmat-Quai",
    plan: "Lindenhof, Grossmünster, Mittagessen Kronenhalle, Spaziergang am Wasser",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=70",
  },
  {
    day: "Tag 2",
    title: "Üetliberg + Kunsthaus",
    plan: "Morgens Üetliberg, Lunch Bahnhofstrasse, Nachmittag Kunsthaus",
    image:
      "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=900&q=70",
  },
  {
    day: "Tag 3",
    title: "Kreis 5 + Frau Gerold",
    plan: "Industrie-Quartier, Lunch im Markt, Abend in der Container-Bar",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=70",
  },
  {
    day: "Tag 4",
    title: "See + Abreise",
    plan: "Schifffahrt 11 Uhr, Mittag am Bürkliplatz, Heimreise",
    image:
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=900&q=70",
  },
];

const TOM_KLASSIKER = [
  {
    title: "Grossmünster",
    desc: "Wahrzeichen mit Karlsturm-Aussicht",
    meta: "5 Min vom Storchen",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Lindenhof",
    desc: "Aussichts-Hügel über die Altstadt",
    meta: "3 Min vom Storchen",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Bahnhofstrasse",
    desc: "Shopping-Klassiker zur Sechseläutenplatz",
    meta: "direkt um die Ecke",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Kronenhalle",
    desc: "Restaurant mit Chagall-Kunst, Klassiker",
    meta: "8 Min Spaziergang",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=70",
  },
];

export default function DashboardPage() {
  const profile = useCurrentProfile();
  const { state } = useViewMode();
  const isDashboard = state.mode === "dashboard";

  if (profile.key === "sarah") {
    return <SarahDashboard isDashboard={isDashboard} />;
  }
  if (profile.key === "tom") {
    return <TomDashboard isDashboard={isDashboard} />;
  }
  return <FikoDashboard isDashboard={isDashboard} />;
}

// ────────────────────────────────────────────────────────────────
// FIKO DASHBOARD
// ────────────────────────────────────────────────────────────────

function FikoDashboard({ isDashboard }: { isDashboard: boolean }) {
  const profile = useCurrentProfile();
  return (
    <>
      {!isDashboard && <ModeHint />}

      {/* 1 — DAILY BRIEFING ──────────────────────────────────── */}
      <section className="container-editorial pt-10 md:pt-14 pb-10">
        <p className="eyebrow">Daily Briefing · Mittwoch, 13. Mai 2026</p>
        <h1 className="font-display text-5xl md:text-7xl mt-2 leading-[0.95] tracking-tight">
          {timeGreeting(profile.name)},{" "}
          <span className="italic">{profile.name}</span>.
        </h1>
        <p className="text-ink-muted text-[15px] mt-4 max-w-xl">
          {profile.district} · {profile.interests.join(" · ")}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <CloudRain
                className="w-4 h-4 text-burgundy"
                strokeWidth={1.8}
              />
              <p className="eyebrow">Wetter</p>
            </div>
            <p className="font-display text-3xl mt-3">11° · leichter Regen</p>
            <p className="text-[13px] text-ink-muted mt-1">
              Heute Abend: Gewitter ab 19 Uhr
            </p>
            <p className="mt-2 inline-block px-2 py-0.5 rounded-full bg-burgundy/10 text-burgundy text-[11px] font-medium">
              Indoor-Aktivitäten unten
            </p>
          </div>
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
              <p className="eyebrow">Verkehr · ZVV</p>
            </div>
            <p className="font-display text-xl mt-3 leading-tight">
              Tram 11 (deine Linie): 8 Min Verspätung
            </p>
            <p className="text-[13px] text-ink-muted mt-1">
              Bauarbeiten Stauffacher · Alternativ Tram 14 normal
            </p>
          </div>
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Bookmark
                className="w-4 h-4 text-burgundy"
                strokeWidth={1.8}
              />
              <p className="eyebrow">Bookmark-Erinnerung</p>
            </div>
            <p className="font-display text-xl mt-3 leading-tight">
              Heute Abend: Klang &amp; Kerzenschein
            </p>
            <p className="text-[13px] text-ink-muted mt-1">
              Du hattest das vor 2 Wochen gebookmarkt
            </p>
            <Link
              href="/tonight/klang-kerzenschein"
              className="inline-flex items-center gap-1 mt-3 text-[12.5px] font-medium text-burgundy hover:gap-2 transition-all"
            >
              Reservation prüfen <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-6 p-5 rounded-2xl bg-burgundy/[0.06] border border-burgundy/15">
          <div className="flex items-start gap-3">
            <Heart
              className="w-5 h-5 text-burgundy shrink-0 mt-0.5"
              strokeWidth={1.6}
            />
            <p className="text-[14px] text-ink leading-relaxed">
              Da du am Donnerstag Geburtstag hast — drei Ideen für deinen
              Abend in deinem Quartier.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                cat: "Restaurant",
                title: "Da Angela · Mediterranes Special",
              },
              { cat: "Bar", title: "Plüsch Bar · Aperitivo bis 22 Uhr" },
              {
                cat: "Erlebnis",
                title: "Pottery-Date im Atelier Kreis 5",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="p-3 rounded-xl bg-card border border-line"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-burgundy">
                  {p.cat}
                </p>
                <p className="text-[13px] font-medium mt-1 leading-tight">
                  {p.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — AI-CONCIERGE ─────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <AIConciergeTeaser
          variant="hero"
          placeholder="Frag Züri — heute persönlich für dich, Fiko…"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Restaurant in Oerlikon heute",
            "Konzerte diese Woche",
            "Was machen meine Bookmarks?",
            "Stadt-Update Kreis 11",
          ].map((q) => (
            <span
              key={q}
              className="px-3 py-1.5 bg-card border border-line rounded-full text-[12px] text-ink-muted"
            >
              {q}
            </span>
          ))}
        </div>
      </section>

      {/* 3 — LIVE-PULSE-MAP ──────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="mb-4">
          <p className="eyebrow">Live-Pulse-Map</p>
          <h2 className="font-display text-3xl md:text-4xl mt-1">
            Stadt im Augenblick
          </h2>
        </div>
        <PulseMap />
      </section>

      {/* 4 — HEUTE IN DEINEM ZÜRICH ───────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Personalisiert · Kreis 11</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FIKO_HEUTE.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow overflow-hidden flex flex-col"
            >
              <div className="aspect-[5/3] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {c.badge && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-burgundy text-white text-[10px] font-medium">
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.18em] text-burgundy">
                  {c.kind}
                </p>
                <h3 className="font-display text-lg mt-1.5 leading-tight">
                  {c.title}
                </h3>
                <p className="text-[12.5px] text-ink-muted mt-1.5 flex-1">
                  {c.desc}
                </p>
                <p className="text-[11.5px] text-ink-faint mt-2">{c.meta}</p>
                <CrossModuleLinks
                  links={[
                    { label: "Posts dazu", href: "/puls" },
                    { label: "Nähe Orte", href: "/entdecken/orte" },
                    { label: "Tausch", href: "/markt" },
                  ]}
                />
              </div>
            </Link>
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
            {FIKO_VERIFIED.map((u, i) => (
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
          {FIKO_POSTS.map((p) => (
            <div
              key={p.handle}
              className="bg-card border border-line rounded-2xl p-5 card-shadow"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-paper-dim flex items-center justify-center text-[11px] font-medium text-burgundy">
                  {p.handle[1]}
                </div>
                <div>
                  <p className="text-[12px] font-medium leading-none">
                    {p.handle}{" "}
                    <span className="inline-block px-1.5 py-0.5 ml-1 rounded-full bg-burgundy/10 text-burgundy text-[9.5px] uppercase tracking-wider">
                      {p.badge}
                    </span>
                  </p>
                  <p className="text-[10.5px] text-ink-faint mt-0.5">
                    {p.district} · vor 5 Std
                  </p>
                </div>
              </div>
              <p className="text-[13.5px] mt-3 leading-snug">{p.text}</p>
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
              Oerlikon · Kreis 11
            </h2>
          </div>
          <Link
            href="/entdecken/orte"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Mehr aus meinem Quartier →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {FIKO_QUARTIER.map((c) => (
            <article
              key={c.title}
              className="bg-card border border-line rounded-2xl card-shadow p-5"
            >
              <div className="flex items-center gap-2">
                <MapPin
                  className="w-4 h-4 text-burgundy"
                  strokeWidth={1.8}
                />
                <p className="eyebrow">{c.tag}</p>
              </div>
              <h3 className="font-display text-lg mt-3 leading-tight">
                {c.title}
              </h3>
              <p className="text-[12.5px] text-ink-muted mt-2">{c.meta}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 7 — SAISON (Pride personalisiert) ──────────────────── */}
      <section className="container-editorial pb-12">
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-10 grid md:grid-cols-[1.2fr_auto] gap-6 items-center text-paper"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #d72e7d 0%, #f5a623 50%, #4a90e2 100%)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-paper" strokeWidth={1.8} />
              <p className="eyebrow text-paper-dim">Saison · Pride 2026</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Du warst letztes Jahr an der Parade — wieder dabei?
            </h2>
            <p className="text-paper-dim text-[15px] mt-2 max-w-md">
              Zurich Pride · 7. Juni · in 25 Tagen. Wir haben die Route schon
              für dich vorgemerkt.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Link
              href="/entdecken/kalender?view=year"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-paper text-ink font-medium text-[13px] hover:bg-paper-dim transition-colors"
            >
              In meinen Kalender <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/entdecken/kalender?view=year"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-paper/15 backdrop-blur border border-paper/30 text-paper text-[13px] font-medium hover:bg-paper/25"
            >
              Parade-Route ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* 8 — STADT-DIALOG ────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Stadt-Dialog</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">
              Du hast{" "}
              <span className="text-burgundy">
                {FIKO_STADT_DIALOG.length}
              </span>{" "}
              offene Abstimmungen
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
          {FIKO_STADT_DIALOG.map((s, i) => (
            <article
              key={i}
              className="bg-card border border-line rounded-2xl card-shadow p-5 flex flex-col"
            >
              <div className="flex items-center gap-2">
                <Vote className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
                <p className="eyebrow">Schnell abstimmen</p>
              </div>
              <h3 className="font-display text-xl mt-3 leading-tight flex-1">
                {s.title}
              </h3>
              <div className="mt-4 flex gap-2">
                {s.options.map((o, j) => (
                  <button
                    key={o}
                    className={`flex-1 px-2 py-2 rounded-full text-[11.5px] font-medium transition-colors ${
                      j === 0
                        ? "bg-burgundy text-white hover:bg-burgundy-dark"
                        : "border border-line hover:bg-paper-dim"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9 — MARKTPLATZ-STREIFLICHT ──────────────────────────── */}
      <section className="container-editorial pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Aus deinem Quartier · Oerlikon</p>
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
          {FIKO_MARKT.map((m) => (
            <Link
              key={m.title}
              href={m.href}
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
              <p className="text-[12px] text-ink-faint mt-2">{m.meta}</p>
            </Link>
          ))}
        </div>
      </section>

      <BookmarkFooter profile={profile} />
    </>
  );
}

// ────────────────────────────────────────────────────────────────
// SARAH DASHBOARD
// ────────────────────────────────────────────────────────────────

function SarahDashboard({ isDashboard }: { isDashboard: boolean }) {
  const profile = useCurrentProfile();
  return (
    <>
      {!isDashboard && <ModeHint />}

      <section className="container-editorial pt-10 md:pt-14 pb-10">
        <p className="eyebrow">Daily Briefing · Wednesday, 13 May 2026</p>
        <h1 className="font-display text-5xl md:text-7xl mt-2 leading-[0.95] tracking-tight">
          {timeGreeting(profile.name)},{" "}
          <span className="italic">{profile.name}</span>.
        </h1>
        <p className="text-ink-muted text-[15px] mt-4 max-w-xl">
          Hier sind deine deutschen Pläne mit englischer Hilfestellung.
          <br />
          <span className="text-ink-faint">
            Your Zürich plans — in German with English help-text underneath.
          </span>
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <CloudRain
                className="w-4 h-4 text-burgundy"
                strokeWidth={1.8}
              />
              <p className="eyebrow">Wetter / Weather</p>
            </div>
            <p className="font-display text-3xl mt-3">11° · light rain</p>
            <p className="text-[13px] text-ink-muted mt-1">
              Thunderstorm expected 19:00 — bring umbrella
            </p>
          </div>
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Languages
                className="w-4 h-4 text-burgundy"
                strokeWidth={1.8}
              />
              <p className="eyebrow">Sprach-Setting</p>
            </div>
            <p className="font-display text-xl mt-3 leading-tight">
              Deutsch + English
            </p>
            <p className="text-[13px] text-ink-muted mt-1">
              Untertitel auf Englisch unter deutschen Sektionen
            </p>
            <Link
              href="/profile"
              className="inline-flex items-center gap-1 mt-3 text-[12.5px] font-medium text-burgundy hover:gap-2 transition-all"
            >
              Settings <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
              <p className="eyebrow">Meet locals</p>
            </div>
            <p className="font-display text-xl mt-3 leading-tight">
              4 offene Tandems &amp; Run-Clubs
            </p>
            <p className="text-[13px] text-ink-muted mt-1">
              English-friendly groups in Kreis 5 &amp; nearby
            </p>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-12">
        <AIConciergeTeaser
          variant="hero"
          placeholder="Ask Züri — German plans, English help..."
        />
      </section>

      <section className="container-editorial pb-12">
        <div className="mb-4">
          <p className="eyebrow">Locals treffen / Meet locals</p>
          <h2 className="font-display text-3xl md:text-4xl mt-1">
            Wo du Zürcher findest
          </h2>
          <p className="text-[13px] text-ink-faint mt-1">
            Where you actually meet locals — not other expats.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SARAH_LOCALS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow p-5"
            >
              <div className="flex items-center gap-2">
                <Users
                  className="w-4 h-4 text-burgundy"
                  strokeWidth={1.8}
                />
                <p className="eyebrow">Gruppe</p>
              </div>
              <h3 className="font-display text-lg mt-3 leading-tight">
                {c.title}
              </h3>
              <p className="text-[12.5px] text-ink-muted mt-2">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Today · Mittwoch</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">
              Heute in deinem Zürich
            </h2>
            <p className="text-[13px] text-ink-faint mt-1">
              Today's picks — Kreis 5 + English-friendly options
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SARAH_HEUTE.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group bg-card border border-line rounded-2xl card-shadow card-shadow-hover overflow-hidden flex flex-col"
            >
              <div className="aspect-[5/3] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.18em] text-burgundy">
                  {c.kind}
                </p>
                <h3 className="font-display text-lg mt-1.5 leading-tight">
                  {c.title}
                </h3>
                <p className="text-[12.5px] text-ink-muted mt-1.5 flex-1">
                  {c.desc}
                </p>
                <p className="text-[11.5px] text-ink-faint mt-2">{c.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="eyebrow">Markt · Für dich kuratiert</p>
            <h2 className="font-display text-2xl md:text-3xl mt-1">
              Italienisch-Tandem, Run-Club, Mitfahr
            </h2>
            <p className="text-[13px] text-ink-faint mt-1">
              Hand-picked for newcomers — meet locals, share rides, swap languages.
            </p>
          </div>
          <Link
            href="/markt"
            className="text-[13px] font-medium text-burgundy hover:underline shrink-0"
          >
            Zum Markt →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            {
              cat: "🛠 Dienstleister · Kreis 5",
              title: "Italienisch-Tandem — Muttersprache Italienisch",
              meta: "🟢 Wohnsitz-verifiziert · Tausch Deutsch ↔ Italienisch",
              href: "/markt/dienstleister",
            },
            {
              cat: "🤝 Nachbarschaft · K5/K11",
              title: "Run-Crew Donnerstag 18:30 — English friendly",
              meta: "🟢 Local-led · Üetliberg loop",
              href: "/markt/nachbarschaft",
            },
            {
              cat: "🚗 Mitfahr · Freitag",
              title: "Freitag 18:00 ZH → Lugano",
              meta: "🔵 4 Plätze · CHF 35 · weekend trip",
              href: "/markt/mitfahr",
            },
          ].map((m) => (
            <Link
              key={m.title}
              href={m.href}
              className="block bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow p-5"
            >
              <div className="flex items-center gap-2">
                <Globe2
                  className="w-4 h-4 text-burgundy"
                  strokeWidth={1.8}
                />
                <p className="eyebrow">{m.cat}</p>
              </div>
              <h3 className="font-display text-lg mt-3 leading-tight">
                {m.title}
              </h3>
              <p className="text-[12px] text-ink-faint mt-2">{m.meta}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-16">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="eyebrow">Puls · Stadt-Threads</p>
            <h2 className="font-display text-2xl md:text-3xl mt-1">
              Discover Zürich talking points
            </h2>
            <p className="text-[13px] text-ink-faint mt-1">
              You're new — start with what the city is debating, not with neighbour gossip.
            </p>
          </div>
          <Link
            href="/puls/stadt"
            className="text-[13px] font-medium text-burgundy hover:underline shrink-0"
          >
            All threads →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            {
              cat: "🗣 Gastro & Trends",
              title: "Asiatische Restaurant-Welle im Kreis 5",
              meta: "178 Reaktionen · 94 Kommentare",
              href: "/puls/stadt",
            },
            {
              cat: "🗣 Wohnen",
              title: "Mieten in Zürich 2026: was wirkt noch?",
              meta: "198 · 124 Kommentare",
              href: "/puls/stadt",
            },
            {
              cat: "🗣 Saison",
              title: "Streetparade 2026 — wann startet ihr?",
              meta: "89 · 56 Kommentare",
              href: "/puls/stadt",
            },
          ].map((m) => (
            <Link
              key={m.title}
              href={m.href}
              className="block bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow p-5"
            >
              <p className="eyebrow">{m.cat}</p>
              <h3 className="font-display text-lg mt-3 leading-tight">
                {m.title}
              </h3>
              <p className="text-[12px] text-ink-faint mt-2">{m.meta}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// ────────────────────────────────────────────────────────────────
// TOM DASHBOARD
// ────────────────────────────────────────────────────────────────

function TomDashboard({ isDashboard }: { isDashboard: boolean }) {
  const profile = useCurrentProfile();
  return (
    <>
      {!isDashboard && <ModeHint />}

      <section className="container-editorial pt-10 md:pt-14 pb-10">
        <p className="eyebrow">Touri-Modus · Mittwoch, 13. Mai 2026</p>
        <h1 className="font-display text-5xl md:text-7xl mt-2 leading-[0.95] tracking-tight">
          {profile.name}, du bist <span className="italic">4 Tage</span> in
          Zürich.
        </h1>
        <p className="text-ink-muted text-[15px] mt-4 max-w-xl">
          Hotel Storchen · Kreis 1 · Bahnhofstrasse direkt um die Ecke. Hier
          dein perfekter Plan.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <CloudRain
                className="w-4 h-4 text-burgundy"
                strokeWidth={1.8}
              />
              <p className="eyebrow">Wetter</p>
            </div>
            <p className="font-display text-3xl mt-3">11° · Regen</p>
            <p className="text-[13px] text-ink-muted mt-1">
              Heute Kunsthaus &amp; Kronenhalle empfohlen
            </p>
          </div>
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Ticket
                className="w-4 h-4 text-burgundy"
                strokeWidth={1.8}
              />
              <p className="eyebrow">ÖV-Tageskarte</p>
            </div>
            <p className="font-display text-xl mt-3 leading-tight">
              CHF 8.80 · Zone 110
            </p>
            <p className="text-[13px] text-ink-muted mt-1">
              Gilt für Tram, Bus, Schiff bis Mitternacht
            </p>
            <button className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-burgundy hover:gap-2 transition-all">
              Jetzt kaufen <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="bg-card border border-line rounded-2xl card-shadow p-5">
            <div className="flex items-center gap-2">
              <Camera
                className="w-4 h-4 text-burgundy"
                strokeWidth={1.8}
              />
              <p className="eyebrow">Foto-Spots heute</p>
            </div>
            <p className="font-display text-xl mt-3 leading-tight">
              Lindenhof · Münsterbrücke
            </p>
            <p className="text-[13px] text-ink-muted mt-1">
              Beste Stunde: 18–19 Uhr nach Regen
            </p>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-12">
        <div className="mb-4">
          <p className="eyebrow">Dein 4-Tage-Plan</p>
          <h2 className="font-display text-3xl md:text-4xl mt-1">
            Routenplan
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TOM_PLAN.map((p, i) => (
            <article
              key={p.title}
              className="bg-card border border-line rounded-2xl card-shadow overflow-hidden"
            >
              <div className="aspect-[5/3] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-burgundy text-white text-[10px] font-medium">
                  {p.day}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg leading-tight">
                  {p.title}
                </h3>
                <p className="text-[12.5px] text-ink-muted mt-2">{p.plan}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-12">
        <AIConciergeTeaser
          variant="hero"
          placeholder="Was muss ich in Zürich sehen?"
        />
      </section>

      <section className="container-editorial pb-12">
        <div className="mb-4">
          <p className="eyebrow">Top-10 Klassiker · in der Nähe</p>
          <h2 className="font-display text-3xl md:text-4xl mt-1">
            Vom Storchen aus zu Fuss
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TOM_KLASSIKER.map((c) => (
            <article
              key={c.title}
              className="bg-card border border-line rounded-2xl card-shadow overflow-hidden"
            >
              <div className="aspect-[5/3] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg leading-tight">
                  {c.title}
                </h3>
                <p className="text-[12.5px] text-ink-muted mt-1.5">
                  {c.desc}
                </p>
                <p className="text-[11.5px] text-ink-faint mt-2">{c.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="eyebrow">Verifiziert · Tourist Mode</p>
            <h2 className="font-display text-2xl md:text-3xl mt-1">
              Stadt-Updates für heute
            </h2>
            <p className="text-[13px] text-ink-faint mt-1">
              Nur offizielle Quellen — kein Quartier-Geschwätz für 4 Tage Trip.
            </p>
          </div>
          <Link
            href="/puls/live"
            className="text-[13px] font-medium text-burgundy hover:underline shrink-0"
          >
            Alle Updates →
          </Link>
        </div>
        <ul className="bg-card border border-line rounded-2xl card-shadow divide-y divide-line overflow-hidden">
          {[
            { source: "ZVV", text: "Tram 4/15 normal — vom Storchen aus alles erreichbar" },
            { source: "MeteoSchweiz", text: "11° leichter Regen heute, morgen sonnig 18°" },
            { source: "Stadt Zürich", text: "Bahnhofstrasse Höhe Globus heute eng — via Sihlstrasse" },
            { source: "SBB", text: "Zürich HB Gleis 7 heute Abend gesperrt — Bern auf Gleis 9" },
          ].map((u, i) => (
            <li key={i} className="px-5 py-3 flex items-start gap-3">
              <span className="shrink-0 px-2 py-0.5 rounded-full bg-burgundy/10 text-burgundy text-[10px] font-medium uppercase tracking-wider">
                {u.source}
              </span>
              <p className="text-[13px] flex-1">{u.text}</p>
              <span className="text-[10px] text-ink-faint shrink-0">🟢 verifiziert</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-editorial pb-16">
        <div className="bg-paper-dim/60 border border-line rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 items-start">
          <Compass
            className="w-6 h-6 text-burgundy shrink-0 mt-1"
            strokeWidth={1.6}
          />
          <div className="flex-1">
            <p className="eyebrow">Souvenir-Tipps</p>
            <h3 className="font-display text-2xl mt-1 leading-tight">
              Was du mit nach Hause nehmen kannst
            </h3>
            <p className="text-[13px] text-ink-muted mt-2">
              Schoggi von Sprüngli, Limmat-Quai-Postkarten von Schober,
              Sechseläutenfunken-Spielzeug aus dem Globus.
            </p>
          </div>
          <Link
            href="/entdecken/orte"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-card border border-line text-[13px] font-medium hover:border-burgundy hover:text-burgundy"
          >
            Tipps ansehen <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}

function ModeHint() {
  return (
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
  );
}

function BookmarkFooter({
  profile,
}: {
  profile: { bookmarks: { events: number; places: number } };
}) {
  return (
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
  );
}
