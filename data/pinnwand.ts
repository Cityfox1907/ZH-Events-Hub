// ─────────────────────────────────────────────────────────────
// PHASE 4 — QUARTIER-PINNWAND
// 12 Aushänge im Polaroid-Stil + Monetarisierungs-Karte.
// Drei Kategorien: Anbieter, Verein & Gruppe, Mikro-Event.
// ─────────────────────────────────────────────────────────────

import type { IdentityTier } from "@/lib/types";

export type PinnwandKategorie = "anbieter" | "verein" | "mikro-event";

export interface PinnwandAushang {
  id: string;
  kategorie: PinnwandKategorie;
  titel: string;
  beschreibung: string;
  bild: string;
  inserent: {
    name: string;
    stadtteil: string;
    verifikation: IdentityTier;
  };
  /** Anzeige-Label: "noch 3 Tage", "heute", "laufend", "wöchentlich" */
  ablauf: string;
  /** Optional ISO-Datum für Sortierung */
  ablaufDatum?: string;
  premium: boolean;
  crossLink: {
    label: string;
    route: string;
  };
  /** Gespeicherte Rotation (-2..+2 Grad) */
  rotation: number;
}

const UNSPLASH = (q: string, sig: number) =>
  `https://images.unsplash.com/photo-${sig}?auto=format&fit=crop&w=640&q=70&q-${encodeURIComponent(q)}`;

// Stabile Unsplash-IDs — kuratiert, um thematisch zu passen
// (source.unsplash.com ist deprecated; statische IDs sind robuster)
const IMG = {
  croissant:    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=640&q=70",
  pralines:     "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=640&q=70",
  bbq:          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=640&q=70",
  coffee:       "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=640&q=70",
  bookstore:    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=640&q=70",
  running:      "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=640&q=70",
  italian:      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=640&q=70",
  tennis:       "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=640&q=70",
  knitting:     "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=640&q=70",
  piano:        "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=640&q=70",
  poetry:       "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=640&q=70",
  artist:       "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=640&q=70",
};

export const PINNWAND_AUSHAENGE: PinnwandAushang[] = [
  // ───── ANBIETER (5) ─────────────────────────────────────────
  {
    id: "p1",
    kategorie: "anbieter",
    titel: "Aprikosen-Croissants -20%",
    beschreibung:
      "Diese Woche bei Vor-Reservation, jeden Morgen ab 7 Uhr.",
    bild: IMG.croissant,
    inserent: {
      name: "Daphne & Sons",
      stadtteil: "Kreis 5",
      verifikation: "member",
    },
    ablauf: "noch 3 Tage",
    ablaufDatum: "2026-05-16",
    premium: false,
    crossLink: {
      label: "→ Daphne & Sons im Orte-Tab",
      route: "/entdecken/orte?suche=Daphne+%26+Sons",
    },
    rotation: -1.6,
  },
  {
    id: "p2",
    kategorie: "anbieter",
    titel: "Frühlings-Pralinés-Set",
    beschreibung:
      "5 neue Sorten zur Saison — Rhabarber, Holunder, Veilchen.",
    bild: IMG.pralines,
    inserent: {
      name: "Confiserie Sprüngli",
      stadtteil: "Kreis 1",
      verifikation: "member",
    },
    ablauf: "noch 5 Tage",
    ablaufDatum: "2026-05-18",
    premium: false,
    crossLink: {
      label: "→ Confiserie Sprüngli im Orte-Tab",
      route: "/entdecken/orte?suche=Spr%C3%BCngli",
    },
    rotation: 1.2,
  },
  {
    id: "p3",
    kategorie: "anbieter",
    titel: "Spontan-BBQ heute Abend",
    beschreibung:
      "Ab 18 Uhr, solange Wetter mitspielt. Keine Reservation.",
    bild: IMG.bbq,
    inserent: {
      name: "Frau Gerolds Garten",
      stadtteil: "Kreis 5",
      verifikation: "wohnsitz",
    },
    ablauf: "heute",
    ablaufDatum: "2026-05-13",
    premium: false,
    crossLink: {
      label: "→ Frau Gerolds Garten im Orte-Tab",
      route: "/entdecken/orte?suche=Frau+Gerolds+Garten",
    },
    rotation: -0.6,
  },
  {
    id: "p4",
    kategorie: "anbieter",
    titel: "Stammkunden-Karte gestartet",
    beschreibung:
      "Jeder zehnte Kaffee gratis, Karte gibt's gratis im Café.",
    bild: IMG.coffee,
    inserent: {
      name: "Café Mandela",
      stadtteil: "Kreis 4",
      verifikation: "wohnsitz",
    },
    ablauf: "laufend",
    premium: false,
    crossLink: {
      label: "→ Café Mandela im Orte-Tab",
      route: "/entdecken/orte?suche=Caf%C3%A9+Mandela",
    },
    rotation: 1.8,
  },
  {
    id: "p5",
    kategorie: "anbieter",
    titel: "Krimi-Donnerstag mit Signaturen",
    beschreibung:
      "Jeden Donnerstag neue Krimi-Erstausgaben, oft signiert.",
    bild: IMG.bookstore,
    inserent: {
      name: "Bookhaus am Hechtplatz",
      stadtteil: "Kreis 1",
      verifikation: "member",
    },
    ablauf: "wöchentlich",
    premium: false,
    crossLink: {
      label: "→ Bookhaus im Orte-Tab",
      route: "/entdecken/orte?suche=Bookhaus",
    },
    rotation: -1.1,
  },

  // ───── VEREIN & GRUPPE (4) ──────────────────────────────────
  {
    id: "p6",
    kategorie: "verein",
    titel: "Run-Crew Üetliberg",
    beschreibung:
      "Donnerstag 18:30, Treffpunkt Talstation. Alle Levels willkommen.",
    bild: IMG.running,
    inserent: {
      name: "Donnerstag-Läufer-Zürich",
      stadtteil: "Kreis 2",
      verifikation: "wohnsitz",
    },
    ablauf: "laufend",
    premium: false,
    crossLink: {
      label: "→ In Nachbarschaftshilfe kontaktieren",
      route: "/markt/nachbarschaft?kontakt=run-crew-uetliberg",
    },
    rotation: 0.8,
  },
  {
    id: "p7",
    kategorie: "verein",
    titel: "Stammtisch Italienisch",
    beschreibung:
      "Dienstags ab 19 Uhr im Da Angela. Anfänger sehr willkommen.",
    bild: IMG.italian,
    inserent: {
      name: "Italienisch-Tandem Zürich",
      stadtteil: "Kreis 5",
      verifikation: "wohnsitz",
    },
    ablauf: "wöchentlich",
    premium: false,
    crossLink: {
      label: "→ In Nachbarschaftshilfe kontaktieren",
      route: "/markt/nachbarschaft?kontakt=italienisch-tandem",
    },
    rotation: -1.7,
  },
  {
    id: "p8",
    kategorie: "verein",
    titel: "Tennis-Schnuppertraining",
    beschreibung:
      "Sonntag 10 Uhr, alle Altersgruppen, Schläger werden gestellt.",
    bild: IMG.tennis,
    inserent: {
      name: "Tennis-Club Oerlikon",
      stadtteil: "Kreis 11",
      verifikation: "wohnsitz",
    },
    ablauf: "noch 8 Tage",
    ablaufDatum: "2026-05-21",
    premium: false,
    crossLink: {
      label: "→ In Nachbarschaftshilfe kontaktieren",
      route: "/markt/nachbarschaft?kontakt=tennis-oerlikon",
    },
    rotation: 1.4,
  },
  {
    id: "p9",
    kategorie: "verein",
    titel: "Stricktreff im Café",
    beschreibung:
      "Jeden zweiten Montag, Café Mandela, eigene Wolle mitbringen.",
    bild: IMG.knitting,
    inserent: {
      name: "Wolle & Café Zürich",
      stadtteil: "Kreis 4",
      verifikation: "wohnsitz",
    },
    ablauf: "laufend",
    premium: false,
    crossLink: {
      label: "→ In Nachbarschaftshilfe kontaktieren",
      route: "/markt/nachbarschaft?kontakt=stricktreff",
    },
    rotation: -0.9,
  },

  // ───── MIKRO-EVENT (3) ──────────────────────────────────────
  {
    id: "p10",
    kategorie: "mikro-event",
    titel: "Wohnzimmerkonzert Klavier",
    beschreibung:
      "Samstag 20 Uhr, 15 Plätze in privatem Wohnzimmer. Spende erwünscht.",
    bild: IMG.piano,
    inserent: {
      name: "Anna B., Pianistin",
      stadtteil: "Kreis 6",
      verifikation: "wohnsitz",
    },
    ablauf: "noch 4 Tage",
    ablaufDatum: "2026-05-17",
    premium: false,
    crossLink: {
      label: "→ In meinen Kalender",
      route: "/profil/kalender?bookmark=wohnzimmerkonzert-klavier",
    },
    rotation: 1.6,
  },
  {
    id: "p11",
    kategorie: "mikro-event",
    titel: "Junge Lyrik Lesung",
    beschreibung:
      "Donnerstag 19 Uhr, drei junge Zürcher Autorinnen lesen.",
    bild: IMG.poetry,
    inserent: {
      name: "Lyrik-Atelier Kreis 5",
      stadtteil: "Kreis 5",
      verifikation: "wohnsitz",
    },
    ablauf: "noch 2 Tage",
    ablaufDatum: "2026-05-15",
    premium: false,
    crossLink: {
      label: "→ In meinen Kalender",
      route: "/profil/kalender?bookmark=junge-lyrik-lesung",
    },
    rotation: -1.3,
  },
  {
    id: "p12",
    kategorie: "mikro-event",
    titel: "Atelier-Tag offen",
    beschreibung:
      "Sonntag 14-18 Uhr, freier Eintritt, neue Serie 'Stille Stadt'.",
    bild: IMG.artist,
    inserent: {
      name: "Anna Berger, Künstlerin",
      stadtteil: "Kreis 4",
      verifikation: "wohnsitz",
    },
    ablauf: "noch 5 Tage",
    ablaufDatum: "2026-05-18",
    premium: false,
    crossLink: {
      label: "→ In meinen Kalender",
      route: "/profil/kalender?bookmark=atelier-tag-offen",
    },
    rotation: 0.7,
  },
];

// ─────────────────────────────────────────────────────────────
// KATEGORIE-METADATEN (Filter-Pillen)
// ─────────────────────────────────────────────────────────────

export const PINNWAND_KATEGORIEN: {
  key: PinnwandKategorie | "alle";
  label: string;
}[] = [
  { key: "alle", label: "Alle" },
  { key: "anbieter", label: "Anbieter" },
  { key: "verein", label: "Verein & Gruppe" },
  { key: "mikro-event", label: "Mikro-Event" },
];

// ─────────────────────────────────────────────────────────────
// ABLAUF-INDIKATOR — Farbcodierung
// ─────────────────────────────────────────────────────────────

export type AblaufVariant = "heute" | "bald" | "normal" | "laufend";

export function ablaufVariant(a: PinnwandAushang): AblaufVariant {
  const l = a.ablauf.toLowerCase();
  if (l === "heute") return "heute";
  if (l === "laufend" || l === "wöchentlich") return "laufend";
  const match = l.match(/noch\s+(\d+)\s+tag/);
  if (match) {
    const n = parseInt(match[1], 10);
    if (n <= 2) return "bald";
  }
  return "normal";
}

// ─────────────────────────────────────────────────────────────
// SORTIER-LOGIK für Hero-Sektion (8 sichtbare Karten)
//   1. Premium zuerst
//   2. "heute" und ≤2 Tage weiter oben
//   3. Stadtteil-Match Boost (z.B. "Kreis 11" für Fiko)
//   4. Nie 3 gleiche Kategorien nebeneinander
// ─────────────────────────────────────────────────────────────

function ablaufScore(a: PinnwandAushang): number {
  const v = ablaufVariant(a);
  if (v === "heute") return 100;
  if (v === "bald") return 80;
  const match = a.ablauf.match(/noch\s+(\d+)/);
  if (match) return Math.max(0, 60 - parseInt(match[1], 10));
  return 30;
}

export function sortPinnwand(
  items: PinnwandAushang[],
  preferredDistrict?: string,
): PinnwandAushang[] {
  const scored = items
    .map((a) => {
      let score = 0;
      if (a.premium) score += 1000;
      score += ablaufScore(a);
      if (preferredDistrict && a.inserent.stadtteil === preferredDistrict) {
        score += 25;
      }
      return { a, score };
    })
    .sort((x, y) => y.score - x.score)
    .map((s) => s.a);

  // Anti-Klumpung: vermeide 3 gleiche Kategorien hintereinander
  const out: PinnwandAushang[] = [];
  const queue = scored.slice();
  while (queue.length) {
    const last2 =
      out.length >= 2 &&
      out[out.length - 1].kategorie === out[out.length - 2].kategorie
        ? out[out.length - 1].kategorie
        : null;
    let pickIdx = 0;
    if (last2) {
      const alt = queue.findIndex((q) => q.kategorie !== last2);
      if (alt !== -1) pickIdx = alt;
    }
    out.push(queue.splice(pickIdx, 1)[0]);
  }
  return out;
}
