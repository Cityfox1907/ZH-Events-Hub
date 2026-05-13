import type {
  KalenderEvent,
  KalenderCategory,
  KalenderSeason,
} from "./types";

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=70`;

export const KALENDER_CATEGORIES: {
  key: KalenderCategory | "all";
  label: string;
  icon: string;
  color: string;
}[] = [
  { key: "all", label: "Alle", icon: "LayoutGrid", color: "ink" },
  { key: "music", label: "Konzerte & Musik", icon: "Music", color: "blue" },
  {
    key: "festival_tradition",
    label: "Festivals & Tradition",
    icon: "PartyPopper",
    color: "burgundy",
  },
  { key: "sport", label: "Sport-Events", icon: "Trophy", color: "green" },
  { key: "culture", label: "Kunst & Kultur", icon: "Palette", color: "purple" },
  { key: "theater", label: "Theater & Comedy", icon: "Theater", color: "rose" },
  { key: "nightlife", label: "Nightlife", icon: "Sparkles", color: "violet" },
  { key: "family", label: "Familie & Kinder", icon: "Users", color: "amber" },
  { key: "market", label: "Märkte & Streetfood", icon: "ShoppingBag", color: "orange" },
  { key: "film", label: "Film", icon: "Clapperboard", color: "teal" },
  { key: "art", label: "Ausstellungen", icon: "Image", color: "cyan" },
];

export const CATEGORY_COLOR: Record<KalenderCategory, string> = {
  music: "#2b6ea8",
  festival_tradition: "#7c1f1f",
  sport: "#3b7a44",
  culture: "#6a4ba0",
  theater: "#a04b6a",
  nightlife: "#5a3aa0",
  family: "#b8893d",
  market: "#c97316",
  film: "#3a8a8a",
  art: "#3a8a98",
};

export const SEASONS: { key: KalenderSeason; label: string; months: number[] }[] = [
  { key: "fruehling", label: "Frühling", months: [3, 4, 5] },
  { key: "sommer", label: "Sommer", months: [6, 7, 8] },
  { key: "herbst", label: "Herbst", months: [9, 10, 11] },
  { key: "winter", label: "Winter", months: [12, 1, 2] },
];

export const SEASON_HEADLINE: Record<KalenderSeason, string> = {
  fruehling: "Die Stadt erwacht — Märkte, Musik, Tradition.",
  sommer: "Die Stadt zieht an den See.",
  herbst: "Goldene Tage, lange Nächte — Kultur-Saison.",
  winter: "Lichter, Märkte, Glühwein an der Limmat.",
};

export const SEASON_HERO_IMAGES: Record<KalenderSeason, string[]> = {
  fruehling: [
    U("photo-1493244040629-496f6d136cc3"), // umzug / festival
    U("photo-1490750967868-88aa4486c946"), // bluehende baeume
    U("photo-1502082553048-f009c37129b9"), // zurich altstadt
    U("photo-1518181835702-6eef8b4b2113"), // see fruehling
  ],
  sommer: [
    U("photo-1518709268805-4e9042af2176"), // streetparade crowd
    U("photo-1502082553048-f009c37129b9"), // limmat
    U("photo-1559564484-e48eda6daa1f"), // schwimmer
    U("photo-1518709268805-4e9042af2176"),
  ],
  herbst: [
    U("photo-1507783548227-544c3b8fc065"), // uetliberg gold
    U("photo-1506905925346-21bda4d32df4"), // herbst nebel
    U("photo-1509316975850-ff9c5deb0cd9"), // kino festival
    U("photo-1507783548227-544c3b8fc065"),
  ],
  winter: [
    U("photo-1542838132-92c53300491e"), // weihnachtsmarkt
    U("photo-1543589077-47d81606c1bf"), // beleuchtung
    U("photo-1481833761820-0509d3217039"), // hauptbahnhof
    U("photo-1607604276583-eef5d076aa5f"), // singing tree
  ],
};

/**
 * Demo-User-Quotes — wiederverwendet pro Event.
 */
const QUOTE = (author: string, district: string, text: string) => ({
  author,
  district,
  text,
});

// ─────────────────────────────────────────────────────────────
// 33 ZÜRCHER KLASSIKER + saisonale Anlässe
// ─────────────────────────────────────────────────────────────

export const KALENDER_EVENTS: KalenderEvent[] = [
  // ════════ JANUAR ════════
  {
    id: "neujahrslauf",
    slug: "neujahrslauf",
    title: "Zürcher Neujahrslauf",
    category: "sport",
    category_label: "Sport · Tradition",
    dateStart: "2026-01-01",
    dateEnd: "2026-01-01",
    timeStart: "11:00",
    importance: "standard",
    isClassic: true,
    season: "winter",
    heroImage: U("photo-1552674605-db6ffd4facb5"),
    galleryImages: [
      U("photo-1552674605-db6ffd4facb5"),
      U("photo-1486218119243-13883505764c"),
      U("photo-1507035895480-2b3156c31fc8"),
    ],
    shortDescription:
      "Der traditionelle Start ins neue Jahr — 5 km durch die verschneite Altstadt.",
    longDescription:
      "Seit Jahrzehnten läuft Zürich gemeinsam ins neue Jahr. 5 km vom Bürkliplatz durch die Altstadt, mit Pasta-Party und Glühwein im Ziel. Familien, Profis und Verkaterte — alle dabei.",
    location: "Bürkliplatz, Zürich",
    district: "Kreis 1",
    transit: "Tram 2/4/8/9/11 Bürkliplatz",
    priceInfo: "CHF 25 Anmeldung · Zuschauer gratis",
    priceBand: "low",
    tradition: "Seit 1978",
    vibe_tags: ["Casual", "Family", "Outdoor"],
    communityQuotes: [
      QUOTE("Lea", "Kreis 6", "Verkatert losgelaufen, glücklich angekommen."),
      QUOTE("Jonas", "Kreis 4", "Beste Art, das Jahr zu starten."),
    ],
    tips: [
      "Warm anziehen — der Wind am See ist bitter.",
      "Pasta-Party im Ziel ist im Startgeld inkludiert.",
      "Vor 10:30 anreisen — Tram ist voll.",
    ],
  },
  {
    id: "theaterspektakel-eroeffnung",
    slug: "theaterspektakel-saison",
    title: "Theaterspektakel — Saison-Eröffnung",
    category: "theater",
    category_label: "Theater & Bühne",
    dateStart: "2026-01-15",
    dateEnd: "2026-01-15",
    timeStart: "19:30",
    importance: "standard",
    isClassic: false,
    season: "winter",
    heroImage: U("photo-1503095396549-807759245b35"),
    galleryImages: [
      U("photo-1503095396549-807759245b35"),
      U("photo-1542204165-65bf26472b9b"),
    ],
    shortDescription:
      "Der Vorhang öffnet sich — die neue Spielsaison am Schauspielhaus.",
    location: "Schauspielhaus Pfauen",
    district: "Kreis 1",
    transit: "Tram 3/8/9 Kunsthaus",
    priceInfo: "CHF 35–95",
    priceBand: "mid",
    vibe_tags: ["Cultural", "Premium"],
  },

  // ════════ FEBRUAR ════════
  {
    id: "fasnacht",
    slug: "zuercher-fasnacht",
    title: "Zürcher Fasnacht",
    category: "festival_tradition",
    category_label: "Festival · Tradition",
    dateStart: "2026-02-11",
    dateEnd: "2026-02-14",
    importance: "standard",
    isClassic: true,
    season: "winter",
    heroImage: U("photo-1583244532671-92ae48030d3b"),
    galleryImages: [
      U("photo-1583244532671-92ae48030d3b"),
      U("photo-1583244532671-92ae48030d3b"),
      U("photo-1485518882345-15568b007407"),
    ],
    shortDescription:
      "Vier Tage Guggenmusik, Kostüme und Konfetti durch die Altstadt.",
    longDescription:
      "Die kleinere, aber laute Schwester der Basler Fasnacht. Guggenmusiken ziehen durch die Niederdorfgassen, Kinderumzug am Sonntag, Monsterkonzert am Samstag-Abend auf dem Münsterhof.",
    location: "Altstadt, Niederdorf, Münsterhof",
    district: "Kreis 1",
    transit: "Tram 4/15 Rudolf-Brun-Brücke",
    priceInfo: "Gratis",
    priceBand: "free",
    tradition: "In aktueller Form seit 1973",
    vibe_tags: ["Family", "Outdoor", "Casual"],
    communityQuotes: [
      QUOTE("Marc", "Kreis 6", "Die Guggen sind laut, aber irgendwie liebt man's."),
    ],
    tips: [
      "Ohrenstöpsel für kleine Kinder mitnehmen.",
      "Beste Aussicht: Limmatquai bei Cortilegerm Umzug.",
    ],
  },
  {
    id: "philosophie-festival",
    slug: "philosophie-festival",
    title: "Zürcher Philosophie-Festival",
    category: "culture",
    category_label: "Kultur · Diskurs",
    dateStart: "2026-02-20",
    dateEnd: "2026-02-23",
    importance: "standard",
    isClassic: false,
    season: "winter",
    heroImage: U("photo-1497633762265-9d179a990aa6"),
    galleryImages: [U("photo-1497633762265-9d179a990aa6")],
    shortDescription:
      "Vier Tage Denken, Streiten, Zuhören — Philosophie für alle.",
    location: "Kaufleuten + Volkshaus",
    district: "Kreis 1",
    priceInfo: "CHF 15 / Tag · Festival-Pass CHF 89",
    priceBand: "low",
    vibe_tags: ["Cultural", "Indoor"],
  },
  {
    id: "photo-schweiz",
    slug: "photo-schweiz",
    title: "Photo Schweiz",
    category: "art",
    category_label: "Ausstellung",
    dateStart: "2026-02-26",
    dateEnd: "2026-03-01",
    importance: "standard",
    isClassic: false,
    season: "winter",
    heroImage: U("photo-1452587925148-ce544e77e70d"),
    galleryImages: [U("photo-1452587925148-ce544e77e70d")],
    shortDescription:
      "Die grösste Fotografie-Ausstellung der Schweiz — 200 Photographen.",
    location: "Maag Halle",
    district: "Kreis 5",
    priceInfo: "CHF 22",
    priceBand: "low",
    vibe_tags: ["Cultural", "Indoor"],
  },

  // ════════ MÄRZ ════════
  {
    id: "fruehlings-maerlitram",
    slug: "fruehlings-maerlitram",
    title: "Frühlings-Märlitram",
    category: "family",
    category_label: "Familie · Kinder",
    dateStart: "2026-03-15",
    dateEnd: "2026-05-31",
    importance: "standard",
    isClassic: false,
    season: "fruehling",
    heroImage: U("photo-1565514020179-026b92b84bb6"),
    galleryImages: [U("photo-1565514020179-026b92b84bb6")],
    shortDescription:
      "Ein Tram, ein Märchen, eine Stunde Zauber — für Kinder ab 4.",
    location: "Abfahrt Bellevue",
    district: "Kreis 1",
    transit: "Tram 2/4/8/9/11 Bellevue",
    priceInfo: "CHF 8 Kind · CHF 5 Erwachsene",
    priceBand: "low",
    tradition: "Seit 1965",
    vibe_tags: ["Family", "Indoor", "Magical"],
  },
  {
    id: "weltklasse-zuerich-vorab",
    slug: "weltklasse-zuerich-vorab",
    title: "Weltklasse Zürich — Pre-Event",
    category: "sport",
    category_label: "Leichtathletik",
    dateStart: "2026-03-28",
    dateEnd: "2026-03-28",
    timeStart: "18:00",
    importance: "standard",
    isClassic: false,
    season: "fruehling",
    heroImage: U("photo-1461896836934-ffe607ba8211"),
    galleryImages: [U("photo-1461896836934-ffe607ba8211")],
    shortDescription:
      "Saison-Auftakt der Leichtathletik-Stars im Sechseläutenplatz-Format.",
    location: "Sechseläutenplatz",
    district: "Kreis 1",
    priceInfo: "Gratis Eintritt",
    priceBand: "free",
    vibe_tags: ["Outdoor", "Family"],
  },

  // ════════ APRIL ════════
  {
    id: "sechselaeuten",
    slug: "sechselaeuten",
    title: "Sechseläuten",
    category: "festival_tradition",
    category_label: "Zürch-Klassiker · Tradition",
    dateStart: "2026-04-19",
    dateEnd: "2026-04-20",
    timeStart: "15:00",
    importance: "mega",
    isClassic: true,
    season: "fruehling",
    heroImage: U("photo-1543589077-47d81606c1bf"),
    galleryImages: [
      U("photo-1543589077-47d81606c1bf"),
      U("photo-1493244040629-496f6d136cc3"),
      U("photo-1502082553048-f009c37129b9"),
      U("photo-1490750967868-88aa4486c946"),
    ],
    shortDescription:
      "Wenn der Böögg brennt, weiss Zürich: der Sommer kommt schnell.",
    longDescription:
      "Das Frühlingsfest der Zürcher Zünfte. Am Sonntag ziehen die historischen Trachten durch die Stadt, am Montag um 18:00 wird der Böögg — ein Schneemann aus Watte und Sprengstoff — auf dem Scheiterhaufen verbrannt. Je schneller sein Kopf explodiert, desto schöner der Sommer.\n\nTradition seit 1839, Volksfest mit über 100'000 Besuchern, Bratwurst und Rivella an jeder Ecke.",
    location: "Sechseläutenplatz",
    district: "Kreis 1",
    transit: "Tram 2/4/8/9/11 Bellevue / Stadelhofen",
    priceInfo: "Gratis · Sitzplatz-Tribüne CHF 35",
    priceBand: "free",
    tradition: "Seit 1839 — die Zünfte feiern den Frühling",
    vibe_tags: ["Family", "Outdoor", "Cultural", "Magical"],
    communityQuotes: [
      QUOTE(
        "Marc",
        "Kreis 6",
        "Wenn der Böögg brennt, weiss Zürich: der Sommer kommt schnell.",
      ),
      QUOTE("Anna", "Kreis 7", "Mein Highlight des Jahres. Punkt."),
      QUOTE(
        "Tom",
        "Kreis 4",
        "Tradition pur — und das beste Bratwurst-Bier-Verhältnis der Stadt.",
      ),
    ],
    tips: [
      "Ankommen vor 17:00 — danach kommst du nicht mehr durch.",
      "Beste Sicht: Quaibrücke oder Tribüne am Bellevue.",
      "Wetten auf die Brenndauer sind Tradition — Kollegen-Pool aufsetzen.",
      "Kinder bekommen Brot zum Brotwecken aufspiessen.",
      "Danach: Apero im Niederdorf, alle Zünfter sind unterwegs.",
    ],
  },
  {
    id: "zuerich-marathon",
    slug: "zuerich-marathon",
    title: "Zürich Marathon",
    category: "sport",
    category_label: "Sport-Event",
    dateStart: "2026-04-19",
    dateEnd: "2026-04-19",
    timeStart: "08:30",
    importance: "standard",
    isClassic: true,
    season: "fruehling",
    heroImage: U("photo-1486218119243-13883505764c"),
    galleryImages: [
      U("photo-1486218119243-13883505764c"),
      U("photo-1452626038306-9aae5e071dd3"),
    ],
    shortDescription:
      "42,195 km vom HB durch die Stadt und am See entlang.",
    location: "Start Mythenquai",
    district: "Kreis 2",
    priceInfo: "CHF 95 Anmeldung · Zuschauer gratis",
    priceBand: "mid",
    tradition: "Seit 2003",
    vibe_tags: ["Outdoor", "Casual"],
    tips: ["Beste Stimmung: Quaibrücke und Bellevue."],
  },
  {
    id: "zaz-awards",
    slug: "zaz-awards",
    title: "ZAZ Awards — Architektur Schweiz",
    category: "culture",
    category_label: "Architektur",
    dateStart: "2026-04-24",
    dateEnd: "2026-04-24",
    timeStart: "18:00",
    importance: "standard",
    isClassic: false,
    season: "fruehling",
    heroImage: U("photo-1487958449943-2429e8be8625"),
    galleryImages: [U("photo-1487958449943-2429e8be8625")],
    shortDescription:
      "Die Schweizer Architekturszene feiert ihre besten Bauten.",
    location: "ZAZ Bellerive",
    district: "Kreis 8",
    priceInfo: "CHF 45 Apéro",
    priceBand: "mid",
    vibe_tags: ["Premium", "Cultural"],
  },

  // ════════ MAI ════════
  {
    id: "tag-der-arbeit",
    slug: "tag-der-arbeit",
    title: "1. Mai — Tag der Arbeit",
    category: "festival_tradition",
    category_label: "Festival · Politik",
    dateStart: "2026-05-01",
    dateEnd: "2026-05-01",
    timeStart: "10:00",
    importance: "standard",
    isClassic: true,
    season: "fruehling",
    heroImage: U("photo-1571842773302-c44544435e74"),
    galleryImages: [U("photo-1571842773302-c44544435e74")],
    shortDescription:
      "Demo, Reden, Bratwurst — der Tag der Arbeit am Helvetiaplatz.",
    location: "Helvetiaplatz + Demo-Route",
    district: "Kreis 4",
    priceInfo: "Gratis",
    priceBand: "free",
    tradition: "Seit 1890",
    vibe_tags: ["Outdoor", "Cultural"],
  },
  {
    id: "zuerich-pride",
    slug: "zuerich-pride",
    title: "Zürich Pride",
    category: "festival_tradition",
    category_label: "Festival · Community",
    dateStart: "2026-06-13",
    dateEnd: "2026-06-14",
    timeStart: "12:00",
    importance: "standard",
    isClassic: true,
    season: "sommer",
    heroImage: U("photo-1591622434-d8e02d9d2eb1"),
    galleryImages: [U("photo-1591622434-d8e02d9d2eb1")],
    shortDescription:
      "Zürichs grösste Demo-Parade — bunt, laut, herzlich.",
    location: "Helvetiaplatz → Kasernenareal",
    district: "Kreis 4",
    priceInfo: "Gratis · Parade · Festival",
    priceBand: "free",
    tradition: "Seit 1994",
    vibe_tags: ["Outdoor", "Casual"],
  },
  {
    id: "museumsnacht",
    slug: "museumsnacht",
    title: "Lange Nacht der Zürcher Museen",
    category: "culture",
    category_label: "Kultur · Museen",
    dateStart: "2026-05-30",
    dateEnd: "2026-05-31",
    timeStart: "19:00",
    importance: "standard",
    isClassic: true,
    season: "fruehling",
    heroImage: U("photo-1565060169187-5284a3956fde"),
    galleryImages: [U("photo-1565060169187-5284a3956fde")],
    shortDescription:
      "Eine Nacht, 40 Museen, ein Ticket — bis 02:00 Uhr durch die Sammlungen.",
    location: "40 Museen stadtweit",
    district: "stadtweit",
    transit: "Shuttle-Busse alle 15 Min",
    priceInfo: "CHF 28 inkl. ÖV",
    priceBand: "low",
    tradition: "Seit 2000",
    vibe_tags: ["Cultural", "Indoor", "Magical"],
    tips: [
      "Route vorab planen — 40 Museen schafft niemand.",
      "Shuttle-Busse fahren bis 03:00 zurück.",
    ],
  },

  // ════════ JUNI ════════
  {
    id: "live-at-sunset",
    slug: "live-at-sunset",
    title: "Live at Sunset",
    category: "music",
    category_label: "Open-Air-Konzerte",
    dateStart: "2026-06-30",
    dateEnd: "2026-07-12",
    timeStart: "19:30",
    importance: "mega",
    isClassic: true,
    season: "sommer",
    heroImage: U("photo-1493225457124-a3eb161ffa5f"),
    galleryImages: [
      U("photo-1493225457124-a3eb161ffa5f"),
      U("photo-1514525253161-7a46d19cd819"),
      U("photo-1459749411175-04bf5292ceea"),
      U("photo-1429962714451-bb934ecdc4ec"),
    ],
    shortDescription:
      "Zwei Wochen Open-Air am Dolderbahn-Areal — internationale Stars unter Bäumen.",
    longDescription:
      "Bei Sonnenuntergang spielen internationale Acts im wohl schönsten Open-Air-Setting der Stadt. Picknick-Decken, Wein, Lichterketten in den Bäumen — und Zürich zu Füssen.",
    location: "Dolder Eisbahn-Areal",
    district: "Kreis 7",
    transit: "Dolderbahn ab Römerhof",
    priceInfo: "CHF 95–195",
    priceBand: "high",
    tradition: "Seit 1994",
    vibe_tags: ["Premium", "Outdoor", "Date Night", "Magical"],
    communityQuotes: [
      QUOTE("Sarah", "Kreis 7", "Sonnenuntergang über Zürich + Live-Musik = Sommer."),
    ],
    tips: [
      "Stehplätze vorne — Sitzplätze hinten haben besseren See-Blick.",
      "Picknick erlaubt, Glas nicht.",
    ],
  },
  {
    id: "limmatschwimmen",
    slug: "limmatschwimmen",
    title: "Limmatschwimmen",
    category: "sport",
    category_label: "Volkssport",
    dateStart: "2026-06-13",
    dateEnd: "2026-06-13",
    timeStart: "10:00",
    importance: "standard",
    isClassic: true,
    season: "sommer",
    heroImage: U("photo-1559564484-e48eda6daa1f"),
    galleryImages: [U("photo-1559564484-e48eda6daa1f")],
    shortDescription:
      "2 km die Limmat hinunter — mit 5'000 anderen Zürchern.",
    location: "Start Frauenbadi, Ziel Flussbad Oberer Letten",
    district: "Kreis 1 → Kreis 5",
    priceInfo: "CHF 30 inkl. Schwimmsack",
    priceBand: "low",
    tradition: "Seit 1962",
    vibe_tags: ["Outdoor", "Casual", "Family"],
    communityQuotes: [
      QUOTE("Tobi", "Kreis 5", "Treibst die Stadt entlang — kein Stress, nur Sonne."),
    ],
  },
  {
    id: "zuercher-seenachtfest",
    slug: "zuercher-seenachtfest",
    title: "Zürcher Seenachtsfest",
    category: "festival_tradition",
    category_label: "Festival · See",
    dateStart: "2026-06-27",
    dateEnd: "2026-06-28",
    importance: "standard",
    isClassic: true,
    season: "sommer",
    heroImage: U("photo-1481833761820-0509d3217039"),
    galleryImages: [U("photo-1481833761820-0509d3217039")],
    shortDescription:
      "Beim Bürkliplatz: Bühnen, Streetfood, Feuerwerk über dem See.",
    location: "Bürkliplatz, Bellevue, Utoquai",
    district: "Kreis 1",
    priceInfo: "Gratis",
    priceBand: "free",
    vibe_tags: ["Family", "Outdoor", "Magical"],
  },

  // ════════ JULI ════════
  {
    id: "stadelhofen-strassenkunst",
    slug: "stadelhofen-strassenkunst",
    title: "Strassenkunst-Tage Stadelhofen",
    category: "theater",
    category_label: "Strassentheater",
    dateStart: "2026-07-04",
    dateEnd: "2026-07-12",
    timeStart: "14:00",
    importance: "standard",
    isClassic: false,
    season: "sommer",
    heroImage: U("photo-1503095396549-807759245b35"),
    galleryImages: [U("photo-1503095396549-807759245b35")],
    shortDescription:
      "Jongleure, Akrobaten, Musiker — eine Woche Strassen-Magie.",
    location: "Stadelhofen, Bahnhofstrasse",
    district: "Kreis 1",
    priceInfo: "Gratis · Hut-Beiträge willkommen",
    priceBand: "free",
    vibe_tags: ["Family", "Outdoor", "Casual"],
  },
  {
    id: "kaufleuten-garden-party",
    slug: "kaufleuten-garden-party",
    title: "Kaufleuten Garden Party",
    category: "nightlife",
    category_label: "Open-Air-Party",
    dateStart: "2026-07-18",
    dateEnd: "2026-07-19",
    timeStart: "21:00",
    importance: "standard",
    isClassic: false,
    season: "sommer",
    heroImage: U("photo-1571266028243-d220c6a32ae1"),
    galleryImages: [U("photo-1571266028243-d220c6a32ae1")],
    shortDescription:
      "Die legendäre Sommer-Party im Garten der Kaufleuten.",
    location: "Kaufleuten, Pelikanstrasse",
    district: "Kreis 1",
    priceInfo: "CHF 45",
    priceBand: "mid",
    vibe_tags: ["Trending", "Outdoor", "Date Night"],
  },

  // ════════ AUGUST ════════
  {
    id: "streetparade",
    slug: "streetparade",
    title: "Streetparade",
    category: "festival_tradition",
    category_label: "Zürch-Klassiker · Techno",
    dateStart: "2026-08-08",
    dateEnd: "2026-08-08",
    timeStart: "14:00",
    importance: "mega",
    isClassic: true,
    season: "sommer",
    heroImage: U("photo-1518709268805-4e9042af2176"),
    galleryImages: [
      U("photo-1518709268805-4e9042af2176"),
      U("photo-1571266028243-d220c6a32ae1"),
      U("photo-1493225457124-a3eb161ffa5f"),
      U("photo-1429962714451-bb934ecdc4ec"),
      U("photo-1502082553048-f009c37129b9"),
    ],
    shortDescription:
      "Eine Million Menschen, 30 Love-Mobiles, Techno rund um den See.",
    longDescription:
      "Die grösste Techno-Parade der Welt. 30 Love-Mobiles ziehen vom Utoquai über den Bürkliplatz bis zum Hafendamm Enge. Acht Stages, eine Million Tanzende, Sonne über dem See.\n\nTradition seit 1992, ursprünglich als Demonstration für Freiheit, Liebe, Toleranz und Großzügigkeit gegründet.",
    location: "Seeufer rund um den Hafen Enge",
    district: "Kreis 1 / 2 / 8",
    transit: "Tram alle Linien Bürkliplatz / Bellevue (überfüllt)",
    priceInfo: "Gratis · Stages teilweise CHF 30",
    priceBand: "free",
    tradition: "Seit 1992 — die grösste Techno-Parade der Welt",
    vibe_tags: ["Trending", "Outdoor", "Casual"],
    communityQuotes: [
      QUOTE("Yannick", "Kreis 4", "Einmal im Leben — und dann jedes Jahr wieder."),
      QUOTE("Lisa", "Kreis 5", "Sonnencreme, Wasser, Sneakers. Mehr Tipps?"),
      QUOTE("Daniel", "Kreis 8", "Ich tanze auf der Quaibrücke seit 2008."),
    ],
    tips: [
      "Treffpunkt vorher klar absprechen — Mobilfunk geht zusammen.",
      "Wasser mitnehmen, ist heiss.",
      "Beste Stages: Bürkliplatz und Utoquai.",
      "Tram-Ende ~20:00 — danach zu Fuss.",
      "Bargeld dabei — Karten gehen nicht überall.",
    ],
  },
  {
    id: "theater-spektakel",
    slug: "theater-spektakel",
    title: "Zürcher Theater Spektakel",
    category: "theater",
    category_label: "Internationales Festival",
    dateStart: "2026-08-13",
    dateEnd: "2026-08-30",
    importance: "standard",
    isClassic: true,
    season: "sommer",
    heroImage: U("photo-1503095396549-807759245b35"),
    galleryImages: [
      U("photo-1503095396549-807759245b35"),
      U("photo-1542204165-65bf26472b9b"),
      U("photo-1497633762265-9d179a990aa6"),
    ],
    shortDescription:
      "Drei Wochen internationales Theater auf der Landiwiese.",
    longDescription:
      "Das wichtigste Bühnenfestival der Schweiz. Internationale Compagnies, Spielstätten am See, Beizli mit Sicht aufs Wasser. Kunst, Strand und Wein.",
    location: "Landiwiese, Werft, Saffa-Insel",
    district: "Kreis 2",
    priceInfo: "CHF 35–65",
    priceBand: "mid",
    tradition: "Seit 1980",
    vibe_tags: ["Cultural", "Outdoor", "Premium"],
  },
  {
    id: "caliente",
    slug: "caliente",
    title: "Caliente — Latin Festival",
    category: "festival_tradition",
    category_label: "Festival · Lateinamerika",
    dateStart: "2026-06-26",
    dateEnd: "2026-06-28",
    importance: "standard",
    isClassic: true,
    season: "sommer",
    heroImage: U("photo-1429962714451-bb934ecdc4ec"),
    galleryImages: [U("photo-1429962714451-bb934ecdc4ec")],
    shortDescription:
      "Salsa, Reggaeton, Empanadas — drei Tage Latino-Sommer.",
    location: "Bürkliplatz / Bellevue",
    district: "Kreis 1",
    priceInfo: "Gratis Eintritt",
    priceBand: "free",
    tradition: "Seit 1996",
    vibe_tags: ["Casual", "Outdoor", "Family"],
  },

  // ════════ SEPTEMBER ════════
  {
    id: "knabenschiessen",
    slug: "knabenschiessen",
    title: "Knabenschiessen",
    category: "festival_tradition",
    category_label: "Zürch-Klassiker · Volksfest",
    dateStart: "2026-09-12",
    dateEnd: "2026-09-14",
    timeStart: "10:00",
    importance: "mega",
    isClassic: true,
    season: "herbst",
    heroImage: U("photo-1567361424669-87ed10985b80"),
    galleryImages: [
      U("photo-1567361424669-87ed10985b80"),
      U("photo-1518709268805-4e9042af2176"),
      U("photo-1493244040629-496f6d136cc3"),
      U("photo-1485518882345-15568b007407"),
    ],
    shortDescription:
      "Schiessen, Jahrmarkt, Riesenrad — Zürichs ältestes Stadtfest.",
    longDescription:
      "Eines der ältesten Volksfeste der Stadt. Auf dem Albisgüetli wird geschossen (junge Schützen ab 13), gleichzeitig dreht sich der grösste Chilbi-Jahrmarkt der Schweiz mit Riesenrad, Geisterbahnen und Magenbrot.\n\nMontag ist offizieller halber Feiertag für Stadt-Mitarbeitende — ein Stück Zürcher Identität.",
    location: "Albisgüetli",
    district: "Kreis 2 / 3",
    transit: "Tram 13 Albisgüetli",
    priceInfo: "Gratis Eintritt · Bahnen einzeln zahlend",
    priceBand: "free",
    tradition: "Seit 1657",
    vibe_tags: ["Family", "Outdoor", "Cultural", "Casual"],
    communityQuotes: [
      QUOTE("Linda", "Kreis 3", "Magenbrot-Tasche und Riesenrad — das ist Herbst."),
      QUOTE("Reto", "Kreis 9", "Mein erstes Knabenschiessen mit Tochter — magisch."),
    ],
    tips: [
      "Montag-Vormittag am ruhigsten.",
      "Magenbrot beim Stand neben dem Riesenrad — bester der Chilbi.",
      "Nachmittag mit Kindern, abends ohne.",
    ],
  },
  {
    id: "wein-trophy",
    slug: "wein-trophy",
    title: "Zürcher Wein-Trophy",
    category: "market",
    category_label: "Streetfood · Wein",
    dateStart: "2026-09-18",
    dateEnd: "2026-09-20",
    importance: "standard",
    isClassic: false,
    season: "herbst",
    heroImage: U("photo-1510812431401-41d2bd2722f3"),
    galleryImages: [U("photo-1510812431401-41d2bd2722f3")],
    shortDescription:
      "Zürcher Winzer, Streetfood, Live-Jazz — drei Tage am Wasser.",
    location: "Münsterhof",
    district: "Kreis 1",
    priceInfo: "CHF 35 Degustationspass",
    priceBand: "mid",
    vibe_tags: ["Date Night", "Outdoor", "Premium"],
  },
  {
    id: "zff",
    slug: "zurich-film-festival",
    title: "Zurich Film Festival (ZFF)",
    category: "film",
    category_label: "Filmfestival",
    dateStart: "2026-09-24",
    dateEnd: "2026-10-04",
    importance: "mega",
    isClassic: true,
    season: "herbst",
    heroImage: U("photo-1517604931442-7e0c8ed2963c"),
    galleryImages: [
      U("photo-1517604931442-7e0c8ed2963c"),
      U("photo-1509316975850-ff9c5deb0cd9"),
      U("photo-1485846234645-a62644f84728"),
      U("photo-1542204165-65bf26472b9b"),
    ],
    shortDescription:
      "Elf Tage, 160 Filme, grüner Teppich am Sechseläutenplatz.",
    longDescription:
      "Das wichtigste Filmfestival der Schweiz. Internationale Premieren, Stars auf dem grünen Teppich, Filmgespräche und Awards. Vorführungen in den Kinos rund um den Sechseläutenplatz und im Festival-Zelt am See.",
    location: "Sechseläutenplatz + Kinos in Kreis 1",
    district: "Kreis 1",
    priceInfo: "CHF 20–30 / Film · Festival-Pass CHF 280",
    priceBand: "mid",
    tradition: "Seit 2005",
    vibe_tags: ["Cultural", "Premium", "Date Night"],
    communityQuotes: [
      QUOTE("Mira", "Kreis 5", "Filmpass-Pflicht. Tagsüber Kino, abends Apéro."),
    ],
    tips: [
      "Festival-App nutzen — Tickets gehen schnell weg.",
      "Spätvorstellungen oft am besten besucht von Filmemacher:innen.",
    ],
  },

  // ════════ OKTOBER ════════
  {
    id: "expovina",
    slug: "expovina",
    title: "Expovina — Weinmesse auf Schiffen",
    category: "festival_tradition",
    category_label: "Wein · Festival",
    dateStart: "2026-10-22",
    dateEnd: "2026-11-05",
    importance: "standard",
    isClassic: true,
    season: "herbst",
    heroImage: U("photo-1510812431401-41d2bd2722f3"),
    galleryImages: [
      U("photo-1510812431401-41d2bd2722f3"),
      U("photo-1547595628-c61a29f496f0"),
    ],
    shortDescription:
      "Zwei Wochen Wein an Bord von zwölf Schiffen am Bürkliplatz.",
    longDescription:
      "Die einzige Weinmesse der Welt auf Schiffen. Zwölf Boote, 4000 Weine, Winzer aus der ganzen Welt. Die Schiffe sind miteinander verbunden — man läuft drüber.",
    location: "Bürkliplatz · 12 Schiffe",
    district: "Kreis 1",
    priceInfo: "CHF 35 Eintritt + Degustationsgebühren",
    priceBand: "mid",
    tradition: "Seit 1953",
    vibe_tags: ["Premium", "Date Night", "Indoor"],
  },
  {
    id: "kunsthalle-saison",
    slug: "kunsthalle-saison-2026",
    title: "Kunsthalle — Herbst-Vernissage",
    category: "art",
    category_label: "Ausstellung",
    dateStart: "2026-10-09",
    dateEnd: "2026-10-09",
    timeStart: "19:00",
    importance: "standard",
    isClassic: false,
    season: "herbst",
    heroImage: U("photo-1545987796-200677ee1011"),
    galleryImages: [U("photo-1545987796-200677ee1011")],
    shortDescription:
      "Saison-Eröffnung mit drei zeitgenössischen Positionen.",
    location: "Kunsthalle Zürich",
    district: "Kreis 5",
    priceInfo: "Gratis Vernissage · Apero",
    priceBand: "free",
    vibe_tags: ["Cultural", "Indoor"],
  },

  // ════════ NOVEMBER ════════
  {
    id: "stadtgespraech-zaz",
    slug: "stadtgespraech-zaz",
    title: "Stadtgespräch — Wohnen Zürich",
    category: "culture",
    category_label: "Diskurs",
    dateStart: "2026-11-07",
    dateEnd: "2026-11-07",
    timeStart: "19:30",
    importance: "standard",
    isClassic: false,
    season: "herbst",
    heroImage: U("photo-1487958449943-2429e8be8625"),
    galleryImages: [U("photo-1487958449943-2429e8be8625")],
    shortDescription:
      "Podiumsdiskussion: wie wohnen wir 2040 in Zürich?",
    location: "Kosmos",
    district: "Kreis 5",
    priceInfo: "Gratis · Anmeldung empfohlen",
    priceBand: "free",
    vibe_tags: ["Cultural", "Indoor"],
  },
  {
    id: "expovina-finale",
    slug: "expovina-finale",
    title: "Expovina-Finale & Award",
    category: "festival_tradition",
    category_label: "Wein · Festival",
    dateStart: "2026-11-05",
    dateEnd: "2026-11-05",
    timeStart: "19:00",
    importance: "standard",
    isClassic: false,
    season: "herbst",
    heroImage: U("photo-1547595628-c61a29f496f0"),
    galleryImages: [U("photo-1547595628-c61a29f496f0")],
    shortDescription:
      "Letzter Abend an Bord — Best-of-Show wird gekürt.",
    location: "Bürkliplatz",
    district: "Kreis 1",
    priceInfo: "CHF 35",
    priceBand: "mid",
    vibe_tags: ["Premium"],
  },

  // ════════ DEZEMBER ════════
  {
    id: "weihnachtsmarkt-hb",
    slug: "weihnachtsmarkt-hb",
    title: "Wienachtsdorf & Christkindlimarkt HB",
    category: "market",
    category_label: "Markt · Tradition",
    dateStart: "2026-11-21",
    dateEnd: "2026-12-23",
    importance: "mega",
    isClassic: true,
    season: "winter",
    heroImage: U("photo-1542838132-92c53300491e"),
    galleryImages: [
      U("photo-1542838132-92c53300491e"),
      U("photo-1543589077-47d81606c1bf"),
      U("photo-1481833761820-0509d3217039"),
      U("photo-1607604276583-eef5d076aa5f"),
    ],
    shortDescription:
      "Der grösste Indoor-Weihnachtsmarkt Europas — unter dem Swarovski-Christbaum im HB.",
    longDescription:
      "Im Hauptbahnhof glitzert der Swarovski-Christbaum, draussen am Sechseläutenplatz das Wienachtsdorf mit Glühwein-Hütten, Raclette und Geschenken aus aller Welt.\n\nFür viele Zürcher ist der erste Glühwein des Jahres hier der inoffizielle Beginn der Weihnachtszeit.",
    location: "Hauptbahnhof + Sechseläutenplatz",
    district: "Kreis 1",
    transit: "Hauptbahnhof — alle Linien",
    priceInfo: "Gratis · Glühwein ab CHF 7",
    priceBand: "free",
    tradition: "HB seit 1995, Wienachtsdorf seit 2008",
    vibe_tags: ["Family", "Magical", "Date Night", "Outdoor"],
    communityQuotes: [
      QUOTE("Eva", "Kreis 6", "Erster Glühwein = Weihnachten beginnt offiziell."),
      QUOTE("Pascal", "Kreis 1", "Ich gehe nur wegen der Raclette-Hütte."),
    ],
    tips: [
      "Nach 19:00 am stimmungsvollsten.",
      "Wienachtsdorf hat besseren Glühwein, HB hat besseren Baum.",
      "Dienstag/Mittwoch — viel weniger los.",
    ],
  },
  {
    id: "singing-christmas-tree",
    slug: "singing-christmas-tree",
    title: "Singing Christmas Tree",
    category: "music",
    category_label: "Musik · Tradition",
    dateStart: "2026-11-27",
    dateEnd: "2026-12-23",
    timeStart: "17:30",
    importance: "standard",
    isClassic: true,
    season: "winter",
    heroImage: U("photo-1607604276583-eef5d076aa5f"),
    galleryImages: [
      U("photo-1607604276583-eef5d076aa5f"),
      U("photo-1542838132-92c53300491e"),
    ],
    shortDescription:
      "Chöre singen aus einem 15m hohen Christbaum am Werdmühleplatz.",
    location: "Werdmühleplatz",
    district: "Kreis 1",
    priceInfo: "Gratis",
    priceBand: "free",
    tradition: "Seit 1996",
    vibe_tags: ["Family", "Magical", "Outdoor"],
    communityQuotes: [
      QUOTE(
        "Nina",
        "Kreis 1",
        "Stehe jeden Dezember mal kurz dort und höre zu. Pure Weihnachten.",
      ),
    ],
  },
  {
    id: "silvesterzauber",
    slug: "silvesterzauber",
    title: "Silvesterzauber Limmat",
    category: "festival_tradition",
    category_label: "Zürch-Klassiker · Silvester",
    dateStart: "2026-12-31",
    dateEnd: "2027-01-01",
    timeStart: "20:00",
    importance: "mega",
    isClassic: true,
    season: "winter",
    heroImage: U("photo-1467810563316-b5476525c0f9"),
    galleryImages: [
      U("photo-1467810563316-b5476525c0f9"),
      U("photo-1514849302-984523450cf4"),
      U("photo-1542838132-92c53300491e"),
      U("photo-1481833761820-0509d3217039"),
    ],
    shortDescription:
      "Feuerwerk über der Limmat, Bühnen am Quai, eine Stadt feiert.",
    longDescription:
      "Zürich verabschiedet sich vom alten Jahr mit Feuerwerk über der Limmat, Konzert-Bühnen entlang von Bürkliplatz und Limmatquai, Streetfood und einer Stadt voller Funken.\n\nUm Mitternacht: das offizielle Feuerwerk vom See aus.",
    location: "Limmatquai, Bürkliplatz",
    district: "Kreis 1",
    priceInfo: "Gratis",
    priceBand: "free",
    tradition: "Aktuelle Form seit 2000",
    vibe_tags: ["Family", "Magical", "Outdoor"],
    communityQuotes: [
      QUOTE("Lukas", "Kreis 4", "Beste Sicht: Münsterbrücke. Vor 23:00 da sein."),
    ],
    tips: [
      "Münsterbrücke oder Quaibrücke für beste Feuerwerks-Sicht.",
      "Warm anziehen — wirklich.",
      "Tram fährt bis 02:00, danach Nachtbus.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// HILFS-FUNKTIONEN für Datumssortierung & Filter
// ─────────────────────────────────────────────────────────────

export const TODAY_ISO = "2026-05-13"; // Demo-Heute
export const TODAY_DATE = new Date("2026-05-13T08:00:00+02:00");

export function parseDateISO(iso: string): Date {
  // tolerant of yyyy-mm-dd
  return new Date(iso + "T08:00:00+02:00");
}

export function eventActiveOn(ev: KalenderEvent, isoDate: string): boolean {
  return isoDate >= ev.dateStart && isoDate <= ev.dateEnd;
}

export function eventsOn(isoDate: string): KalenderEvent[] {
  return KALENDER_EVENTS.filter((e) => eventActiveOn(e, isoDate));
}

export function eventsBetween(startIso: string, endIso: string): KalenderEvent[] {
  return KALENDER_EVENTS.filter(
    (e) => !(e.dateEnd < startIso || e.dateStart > endIso),
  );
}

export function eventsInMonth(year: number, month1: number): KalenderEvent[] {
  const mm = String(month1).padStart(2, "0");
  const startIso = `${year}-${mm}-01`;
  const lastDay = new Date(year, month1, 0).getDate();
  const endIso = `${year}-${mm}-${String(lastDay).padStart(2, "0")}`;
  return eventsBetween(startIso, endIso);
}

export function formatISODateDE(iso: string): string {
  const d = parseDateISO(iso);
  return d.toLocaleDateString("de-CH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function daysBetween(aIso: string, bIso: string): number {
  const a = parseDateISO(aIso).getTime();
  const b = parseDateISO(bIso).getTime();
  return Math.round((b - a) / 86400000);
}

export function nextClassicAfter(isoDate: string): KalenderEvent | undefined {
  return KALENDER_EVENTS.filter((e) => e.isClassic && e.dateStart > isoDate)
    .sort((a, b) => a.dateStart.localeCompare(b.dateStart))[0];
}

export function seasonForMonth(month1: number): KalenderSeason {
  if (month1 >= 3 && month1 <= 5) return "fruehling";
  if (month1 >= 6 && month1 <= 8) return "sommer";
  if (month1 >= 9 && month1 <= 11) return "herbst";
  return "winter";
}

export const MONTH_NAMES_DE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export const WEEKDAY_SHORT_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
export const WEEKDAY_LONG_DE = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

/** Returns Monday-of-week index 0-6 where Mon=0 ... Sun=6 */
export function weekdayMon0(d: Date): number {
  const js = d.getDay(); // 0 = Sunday
  return (js + 6) % 7;
}

export function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function startOfWeekMon(d: Date): Date {
  const r = new Date(d);
  r.setHours(8, 0, 0, 0);
  r.setDate(r.getDate() - weekdayMon0(r));
  return r;
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export type TimeOfDay = "morgen" | "nachmittag" | "abend" | "nacht";
export function timeOfDay(timeStart?: string): TimeOfDay {
  if (!timeStart) return "abend";
  const h = parseInt(timeStart.split(":")[0], 10);
  if (h < 12) return "morgen";
  if (h < 17) return "nachmittag";
  if (h < 22) return "abend";
  return "nacht";
}

export const TIME_OF_DAY_LABEL: Record<TimeOfDay, string> = {
  morgen: "Morgen",
  nachmittag: "Nachmittag",
  abend: "Abend",
  nacht: "Nacht",
};
