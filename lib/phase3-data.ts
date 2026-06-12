// ─────────────────────────────────────────────────────────────
// PHASE 3 — MARKT
// Markt-Anzeigen verteilt über 4 Vertikalen.
// ─────────────────────────────────────────────────────────────

import type { MarktItem, MarktVertical, IdentityTier } from "./types";

const AVATAR = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f7f2ea,efe7d8,fdfaf3`;

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

// ─────────────────────────────────────────────────────────────
// VERTIKALEN-METADATEN
// ─────────────────────────────────────────────────────────────

export const MARKT_VERTICALS: {
  key: MarktVertical;
  label: string;
  short: string;
  emoji: string;
  blurb: string;
  href: string;
  requiresWohnsitz?: boolean;
}[] = [
  {
    key: "tickets",
    label: "Ticket-Tausch & Last-Minute",
    short: "Tickets",
    emoji: "🎟",
    blurb: "Spontan tauschen, fair weitergeben — niemand sitzt auf seinem Ticket.",
    href: "/markt/tickets",
  },
  {
    key: "nachbarschaft",
    label: "Nachbarschaftshilfe",
    short: "Nachbarschaft",
    emoji: "🤝",
    blurb: "Bohrer, Babysitter, Brot — Nachbarn helfen Nachbarn.",
    href: "/markt/nachbarschaft",
  },
  {
    key: "verschenken",
    label: "Verschenken & Kostenlos",
    short: "Verschenken",
    emoji: "🎁",
    blurb: "Gratis abzugeben im Quartier — Abholung, klare Frist.",
    href: "/markt/verschenken",
  },
  {
    key: "dienstleister",
    label: "Lokale Dienstleister",
    short: "Dienstleister",
    emoji: "🛠",
    blurb: "Verifizierte Nachbarn mit fairen Preisen und Bewertungen.",
    href: "/markt/dienstleister",
    requiresWohnsitz: true,
  },
];

export const ZH_DISTRICTS = [
  "Kreis 1",
  "Kreis 2",
  "Kreis 3",
  "Kreis 4",
  "Kreis 5",
  "Kreis 6",
  "Kreis 7",
  "Kreis 8",
  "Kreis 9",
  "Kreis 10",
  "Kreis 11",
  "Kreis 12",
  "Oerlikon",
  "Schwamendingen",
];

// ─────────────────────────────────────────────────────────────
// IDENTITÄTS-PYRAMIDE — Farben & Labels
// ─────────────────────────────────────────────────────────────

export const IDENTITY_META: Record<
  IdentityTier,
  { label: string; dot: string; ring: string; bg: string; text: string }
> = {
  wohnsitz: {
    label: "Wohnsitz-verifiziert",
    dot: "🟢",
    ring: "ring-emerald-300",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
  },
  member: {
    label: "Member-verifiziert",
    dot: "🔵",
    ring: "ring-sky-300",
    bg: "bg-sky-50",
    text: "text-sky-800",
  },
  standard: {
    label: "Standard",
    dot: "🟡",
    ring: "ring-amber-300",
    bg: "bg-amber-50",
    text: "text-amber-800",
  },
  anonym: {
    label: "Anonym",
    dot: "⚪",
    ring: "ring-slate-300",
    bg: "bg-slate-50",
    text: "text-slate-600",
  },
};

// ─────────────────────────────────────────────────────────────
// MARKT — 33 Anzeigen über 5 Vertikalen
// ─────────────────────────────────────────────────────────────

export const MARKT_ITEMS: MarktItem[] = [
  // ───── TICKET-TAUSCH & LAST-MINUTE (8) ─────
  {
    id: "t1",
    vertical: "tickets",
    intent: "biete",
    title: "2× Klang & Kerzenschein heute 20 Uhr",
    description:
      "Suche Tausch gegen morgen oder verkaufe für CHF 70/Paar. Originale, übertragbar.",
    author: "MarcDerZuger",
    avatar: AVATAR("MarcDerZuger"),
    identity: "wohnsitz",
    district: "Kreis 6",
    ago: "vor 25 Min",
    expires: "heute 18:00",
    price: "CHF 70 / Paar oder Tausch",
    image: UNSPLASH("photo-1493225457124-a3eb161ffa5f"),
    lat: 47.3787,
    lng: 8.5447,
    linkedEvent: {
      id: "klang-kerzenschein",
      slug: "klang-kerzenschein",
      title: "Klang & Kerzenschein — Vivaldi",
    },
    ticketDetails: { eventTitle: "Klang & Kerzenschein", eventDate: "heute 20:00", quantity: 2 },
  },
  {
    id: "t2",
    vertical: "tickets",
    intent: "biete",
    title: "1× FCZ vs YB Sektor B — gratis abzugeben",
    description:
      "Krank geworden, jemand soll Freude haben. Erste Person, die antwortet, bekommt das Ticket. Abholung Letzigrund.",
    author: "FCZTimeForever",
    avatar: AVATAR("FCZTimeForever"),
    identity: "wohnsitz",
    district: "Kreis 4",
    ago: "vor 1h",
    expires: "Sonntag 14:00",
    price: "Gratis",
    image: UNSPLASH("photo-1459865264687-595d652de67e"),
    lat: 47.3826,
    lng: 8.5037,
    ticketDetails: { eventTitle: "FCZ vs YB", eventDate: "So 16:30", sector: "Sektor B", quantity: 1 },
  },
  {
    id: "t3",
    vertical: "tickets",
    intent: "brauche",
    title: "Suche 2× Streetparade Backstage gegen Caliente VIP",
    description:
      "Habe 2× Caliente VIP, würde gerne gegen Streetparade Backstage-Pässe tauschen. Fair-Trade.",
    author: "PartyAnna",
    avatar: AVATAR("PartyAnna"),
    identity: "wohnsitz",
    district: "Kreis 5",
    ago: "vor 2h",
    expires: "in 2 Wochen",
    price: "Tausch",
    image: UNSPLASH("photo-1518709268805-4e9042af2176"),
    linkedEvent: { id: "streetparade", slug: "streetparade", title: "Streetparade 2026" },
  },
  {
    id: "t4",
    vertical: "tickets",
    intent: "biete",
    title: "1× Pride-Konzert 7. Juni — CHF 45 statt 65",
    description: "Stehparterre, übertragbar. Original-Ticket. Werde nicht hingehen können.",
    author: "JonasInZH",
    avatar: AVATAR("JonasInZH"),
    identity: "member",
    district: "Kreis 1",
    ago: "vor 3h",
    expires: "7. Juni",
    price: "CHF 45",
    image: UNSPLASH("photo-1531058020387-3be344556be6"),
    linkedEvent: { id: "zuerich-pride", slug: "zuerich-pride", title: "Zürich Pride 2026" },
  },
  {
    id: "t5",
    vertical: "tickets",
    intent: "brauche",
    title: "3× Tonhalle Saison-Premiere — Tausch auf Sonntag?",
    description:
      "Hätte 3 Karten Samstag, würde Sonntag bevorzugen. Familien-Anlass dazwischen gekommen.",
    author: "TonhalleFamilie",
    avatar: AVATAR("TonhalleFamilie"),
    identity: "wohnsitz",
    district: "Kreis 7",
    ago: "vor 4h",
    expires: "diese Woche",
    price: "Tausch",
    image: UNSPLASH("photo-1465847899084-d164df4dedc6"),
  },
  {
    id: "t6",
    vertical: "tickets",
    intent: "biete",
    title: "2× Van Gogh Immersive heute 21 Uhr — CHF 50/Paar",
    description: "Last-Minute, weil Babysitter abgesagt. Hofstrasse, sehr empfehlenswert.",
    author: "KunstFanZH",
    avatar: AVATAR("KunstFanZH"),
    identity: "member",
    district: "Kreis 5",
    ago: "vor 5h",
    expires: "heute 20:00",
    price: "CHF 50 / Paar",
    image: UNSPLASH("photo-1547826039-bfc35e0f1ea8"),
  },
  {
    id: "t7",
    vertical: "tickets",
    intent: "brauche",
    title: "1× Jazzclub Moods Donnerstag — Tausch gegen Freitag",
    description: "Habe Freitag, brauche Donnerstag (Geburtstag eines Freundes).",
    author: "JazzMaja",
    avatar: AVATAR("JazzMaja"),
    identity: "wohnsitz",
    district: "Kreis 5",
    ago: "vor 1 Tag",
    expires: "Donnerstag",
    price: "Tausch",
    image: UNSPLASH("photo-1415201364774-f6f0bb35f28f"),
  },
  {
    id: "t8",
    vertical: "tickets",
    intent: "biete",
    title: "4× Sechseläuten 2027 Tribüne — CHF 120 einzeln",
    description: "Sehr früh, aber sichere Plätze. Verkaufe einzeln oder als Pärchen.",
    author: "TraditionsTreu",
    avatar: AVATAR("TraditionsTreu"),
    identity: "wohnsitz",
    district: "Kreis 1",
    ago: "vor 1 Tag",
    expires: "in 11 Monaten",
    price: "CHF 120 / Stück",
    image: UNSPLASH("photo-1469854523086-cc02fe5d8800"),
    linkedEvent: { id: "sechselaeuten", slug: "sechselaeuten", title: "Sechseläuten 2027" },
  },

  // ───── NACHBARSCHAFTSHILFE (8) ─────
  {
    id: "n1",
    vertical: "nachbarschaft",
    intent: "brauche",
    title: "Wer hat eine Schlagbohrmaschine zum Ausleihen?",
    description: "Brauche sie nur Samstag-Vormittag für 2 Bilder. Bringe Schoggi mit.",
    author: "NeueNachbarin",
    avatar: AVATAR("NeueNachbarin"),
    identity: "wohnsitz",
    district: "Kreis 6",
    ago: "vor 12 Min",
    expires: "Samstag",
    lat: 47.3884,
    lng: 8.5474,
  },
  {
    id: "n2",
    vertical: "nachbarschaft",
    intent: "brauche",
    title: "2h Kinderhüten heute Abend — CHF 60 oder Tausch",
    description:
      "Kleinkind (3J), schläft schon, brauche nur jemanden ab 19:30. Letzte-Minute-Termin.",
    author: "MamaOerlikon",
    avatar: AVATAR("MamaOerlikon"),
    identity: "wohnsitz",
    district: "Oerlikon",
    ago: "vor 45 Min",
    expires: "heute 19:00",
    price: "CHF 60",
    lat: 47.4118,
    lng: 8.5446,
  },
  {
    id: "n3",
    vertical: "nachbarschaft",
    intent: "brauche",
    title: "Möbel-Transport morgen — CHF 50 + Bier",
    description:
      "Sofa + Schrank vom 3. Stock, Lift vorhanden. 2h Aufwand, biete Bier nach getaner Arbeit.",
    author: "UmzugMaja",
    avatar: AVATAR("UmzugMaja"),
    identity: "wohnsitz",
    district: "Kreis 4",
    ago: "vor 2h",
    expires: "morgen 10:00",
    price: "CHF 50 + Bier",
  },
  {
    id: "n4",
    vertical: "nachbarschaft",
    intent: "biete",
    title: "Verleihe Hochdruckreiniger gratis am Wochenende",
    description:
      "Habe einen guten Karcher, steht oft ungenutzt. Wochenende könnt ihr ihn ausleihen.",
    author: "HelferKreis5",
    avatar: AVATAR("HelferKreis5"),
    identity: "wohnsitz",
    district: "Kreis 5",
    ago: "vor 4h",
    expires: "Sonntag",
    price: "Gratis",
  },
  {
    id: "n5",
    vertical: "nachbarschaft",
    intent: "brauche",
    title: "Wer geht heute Abend einkaufen? Brot bitte!",
    description: "Bin krank, brauche nur ein Brot vom Migros. Zahle dir doppelt.",
    author: "KrankerNachbar",
    avatar: AVATAR("KrankerNachbar"),
    identity: "wohnsitz",
    district: "Kreis 11",
    ago: "vor 30 Min",
    expires: "heute 19:00",
    price: "Brot + CHF 10",
    lat: 47.4118,
    lng: 8.5446,
  },
  {
    id: "n6",
    vertical: "nachbarschaft",
    intent: "brauche",
    title: "Gartenhelfer Samstag 3h, CHF 80",
    description: "Hecke schneiden, Rasen mähen, Laub entfernen. Werkzeug vorhanden.",
    author: "GartenfreundK7",
    avatar: AVATAR("GartenfreundK7"),
    identity: "member",
    district: "Kreis 7",
    ago: "vor 1 Tag",
    expires: "Freitag 18:00",
    price: "CHF 80",
  },
  {
    id: "n7",
    vertical: "nachbarschaft",
    intent: "biete",
    title: "Verleihe Velo-Anhänger fürs Möbeltransport",
    description: "Robuster Anhänger, passt 100kg. Selbstabholung in Schwamendingen.",
    author: "AnhängerSchw",
    avatar: AVATAR("AnhängerSchw"),
    identity: "wohnsitz",
    district: "Schwamendingen",
    ago: "vor 1 Tag",
    expires: "laufend",
    price: "CHF 10 / Tag",
  },
  {
    id: "n8",
    vertical: "nachbarschaft",
    intent: "brauche",
    title: "Wer giesst morgen meine Pflanzen? Bin im Spital",
    description: "8 Töpfe Balkon + 3 Innen. Schlüssel-Übergabe heute Abend bei Nachbarin.",
    author: "SpitalAnnaK8",
    avatar: AVATAR("SpitalAnnaK8"),
    identity: "wohnsitz",
    district: "Kreis 8",
    ago: "vor 2h",
    expires: "morgen 12:00",
    price: "CHF 20 + Kaffee",
    lat: 47.3548,
    lng: 8.5587,
  },

  // ───── VERSCHENKEN & KOSTENLOS (5) ─────
  {
    id: "v1",
    vertical: "verschenken",
    intent: "biete",
    title: "Vitra-Sofa gratis — nur heute bis 19 Uhr",
    description:
      "Polder-Modell, Senf-Gelb, leichte Gebrauchsspuren. Erste Person, die antwortet, bekommt es. Selbstabholung Kreis 8.",
    author: "UmzugK8",
    avatar: AVATAR("UmzugK8"),
    identity: "wohnsitz",
    district: "Kreis 8",
    ago: "vor 3h",
    expires: "heute 19:00",
    price: "Gratis",
    image: UNSPLASH("photo-1555041469-a586c61ea9bc"),
    lat: 47.3548,
    lng: 8.5587,
  },
  {
    id: "v2",
    vertical: "verschenken",
    intent: "biete",
    title: "4 Kasten Bücher zu verschenken",
    description:
      "Belletristik, Sachbücher, Bildbände. Wochenende abzuholen, gerne komplett oder einzeln.",
    author: "BücherwurmK5",
    avatar: AVATAR("BücherwurmK5"),
    identity: "wohnsitz",
    district: "Kreis 5",
    ago: "vor 1 Tag",
    expires: "Sonntag",
    price: "Gratis",
    image: UNSPLASH("photo-1524995997946-a1c2e315a42f"),
  },
  {
    id: "v3",
    vertical: "verschenken",
    intent: "biete",
    title: "Babykleider 0-6 Monate — komplettes Paket",
    description: "Bodies, Pyjamas, Strampler, alles gewaschen, sehr guter Zustand.",
    author: "BabyMamaK11",
    avatar: AVATAR("BabyMamaK11"),
    identity: "wohnsitz",
    district: "Kreis 11",
    ago: "vor 2 Tage",
    expires: "diese Woche",
    price: "Gratis",
    image: UNSPLASH("photo-1522771930-78848d9293e8"),
    lat: 47.4118,
    lng: 8.5446,
  },
  {
    id: "v4",
    vertical: "verschenken",
    intent: "biete",
    title: "Yamaha-Klavier gratis — selbst abtransportieren",
    description:
      "Funktioniert einwandfrei, etwas verstimmt. 2 starke Helfer notwendig, Erdgeschoss.",
    author: "KlavierK1",
    avatar: AVATAR("KlavierK1"),
    identity: "wohnsitz",
    district: "Kreis 1",
    ago: "vor 2 Tage",
    expires: "Sonntag",
    price: "Gratis",
    image: UNSPLASH("photo-1520523839897-bd0b52f945a0"),
  },
  {
    id: "v5",
    vertical: "verschenken",
    intent: "biete",
    title: "Pflanzen-Set Indoor — 12 Töpfe, alle gesund",
    description:
      "Diverse Grünpflanzen, ziehe um, kann nicht alle mitnehmen. Erstbieter gewinnt.",
    author: "PflanzenK4",
    avatar: AVATAR("PflanzenK4"),
    identity: "wohnsitz",
    district: "Kreis 4",
    ago: "vor 4 Tage",
    expires: "in 3 Tage",
    price: "Gratis",
    image: UNSPLASH("photo-1485955900006-10f4d324d411"),
  },

  // ───── LOKALE DIENSTLEISTER (6) ─────
  {
    id: "d1",
    vertical: "dienstleister",
    intent: "biete",
    title: "Yoga-Privatstunden bei dir zuhause",
    description:
      "Hatha + Vinyasa, alle Levels, 90 Min. Ich bringe Matten mit. 47 Bewertungen, 4.9/5.",
    author: "YogaWithAna",
    avatar: AVATAR("YogaWithAna"),
    identity: "wohnsitz",
    district: "Kreis 6",
    ago: "laufendes Angebot",
    expires: "laufend",
    price: "CHF 90 / Stunde",
    rating: 4.9,
    rating_count: 47,
    image: UNSPLASH("photo-1518611012118-696072aa579a"),
  },
  {
    id: "d2",
    vertical: "dienstleister",
    intent: "biete",
    title: "Mathe-Nachhilfe Gymi-Vorbereitung",
    description:
      "ETH-Studentin, 3 Jahre Erfahrung. Algebra, Geometrie, Vorbereitung Gymi-Prüfung.",
    author: "MathiETH",
    avatar: AVATAR("MathiETH"),
    identity: "wohnsitz",
    district: "Kreis 4",
    ago: "laufendes Angebot",
    expires: "laufend",
    price: "CHF 50 / Stunde",
    rating: 5.0,
    rating_count: 28,
    image: UNSPLASH("photo-1509062522246-3755977927d7"),
  },
  {
    id: "d3",
    vertical: "dienstleister",
    intent: "biete",
    title: "Hundespaziergänger Kreis 7 — 12 Stammkunden",
    description:
      "Liebe Hunde, Gruppen-Walks oder einzeln. Versichert. Wochentags 10-15 Uhr.",
    author: "HundeFreund",
    avatar: AVATAR("HundeFreund"),
    identity: "wohnsitz",
    district: "Kreis 7",
    ago: "laufendes Angebot",
    expires: "laufend",
    price: "CHF 25 / Stunde",
    rating: 4.95,
    rating_count: 62,
    image: UNSPLASH("photo-1450778869180-41d0601e046e"),
  },
  {
    id: "d4",
    vertical: "dienstleister",
    intent: "brauche",
    title: "Italienisch-Tandem — Muttersprache Italienisch",
    description:
      "Biete Deutsch-Konversation gegen Italienisch. Wöchentlich im Café Sacchi.",
    author: "CiaoFromMilan",
    avatar: AVATAR("CiaoFromMilan"),
    identity: "wohnsitz",
    district: "Kreis 5",
    ago: "vor 1 Tag",
    expires: "laufend",
    price: "Tausch",
    rating: 5.0,
    rating_count: 7,
  },
  {
    id: "d5",
    vertical: "dienstleister",
    intent: "biete",
    title: "Velo-Reparatur zuhause — CHF 80 pauschal",
    description:
      "Komme zu dir, repariere Schaltung, Bremsen, Schlauch. Werkzeug + Standard-Teile dabei.",
    author: "VeloMan",
    avatar: AVATAR("VeloMan"),
    identity: "wohnsitz",
    district: "Kreis 4",
    ago: "laufendes Angebot",
    expires: "laufend",
    price: "CHF 80 Pauschale",
    rating: 4.8,
    rating_count: 31,
    image: UNSPLASH("photo-1532298229144-0ec0c57515c7"),
  },
  {
    id: "d6",
    vertical: "dienstleister",
    intent: "biete",
    title: "Garten-Pflege monatlich ab CHF 120",
    description:
      "Hecke, Rasen, Beete. Monatliche Pauschale, faire Preise, Referenzen vorhanden.",
    author: "GärtnerK6",
    avatar: AVATAR("GärtnerK6"),
    identity: "wohnsitz",
    district: "Kreis 6",
    ago: "laufendes Angebot",
    expires: "laufend",
    price: "ab CHF 120 / Monat",
    rating: 4.7,
    rating_count: 19,
    image: UNSPLASH("photo-1416879595882-3373a0480b5b"),
  },
];

export function marktByVertical(v: MarktVertical): MarktItem[] {
  return MARKT_ITEMS.filter((i) => i.vertical === v);
}

export function getMarktItem(id: string): MarktItem | undefined {
  return MARKT_ITEMS.find((i) => i.id === id);
}

// ─────────────────────────────────────────────────────────────
// Cross-Module Lookups: Tickets pro Event,
// Helfer-Anfragen pro Bezirk.
// ─────────────────────────────────────────────────────────────

export function ticketsForEvent(eventId: string): MarktItem[] {
  return MARKT_ITEMS.filter(
    (i) => i.vertical === "tickets" && i.linkedEvent?.id === eventId,
  );
}

export function helpersByDistrict(district: string): MarktItem[] {
  return MARKT_ITEMS.filter(
    (i) => i.vertical === "nachbarschaft" && i.district === district,
  );
}
