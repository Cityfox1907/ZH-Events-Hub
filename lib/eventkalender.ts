// ─────────────────────────────────────────────────────────────
// EVENTKALENDER — Phase 5
// Comprehensive event data: hero slides, bento picks, 7 horizontal
// rows, 24 Klassiker storytelling, base events for filters / views.
// ─────────────────────────────────────────────────────────────

export const TODAY_ISO = "2026-05-13";
export const TODAY_DATE = new Date("2026-05-13T08:00:00+02:00");

export type Kategorie =
  | "konzert"
  | "theater"
  | "vernissage"
  | "popup"
  | "workshop"
  | "sport"
  | "festival"
  | "kulinarisch";

export const KATEGORIE_LABEL: Record<Kategorie, string> = {
  konzert: "Konzert",
  theater: "Theater",
  vernissage: "Vernissage",
  popup: "Pop-up",
  workshop: "Workshop",
  sport: "Sport",
  festival: "Festival",
  kulinarisch: "Kulinarisch",
};

export const KATEGORIE_COLOR: Record<Kategorie, string> = {
  konzert: "#2b6ea8",
  theater: "#a04b6a",
  vernissage: "#3a8a98",
  popup: "#c97316",
  workshop: "#6a4ba0",
  sport: "#3b7a44",
  festival: "#7c1f1f",
  kulinarisch: "#b8893d",
};

export type Stimmung =
  | "romantisch"
  | "abenteuerlich"
  | "ruhig"
  | "bunt"
  | "intim"
  | "ausgelassen"
  | "kulturell"
  | "koerperlich"
  | "kulinarisch"
  | "spontan";

export const STIMMUNG_LABEL: Record<Stimmung, string> = {
  romantisch: "Romantisch",
  abenteuerlich: "Abenteuerlich",
  ruhig: "Ruhig",
  bunt: "Bunt",
  intim: "Intim",
  ausgelassen: "Ausgelassen",
  kulturell: "Kulturell",
  koerperlich: "Körperlich",
  kulinarisch: "Kulinarisch",
  spontan: "Spontan",
};

export type Stadtteil =
  | "Kreis 1"
  | "Kreis 2"
  | "Kreis 3"
  | "Kreis 4"
  | "Kreis 5"
  | "Kreis 6"
  | "Kreis 7"
  | "Kreis 8"
  | "Kreis 9"
  | "Kreis 10"
  | "Kreis 11"
  | "Kreis 12"
  | "Oerlikon"
  | "Schwamendingen";

export const STADTTEILE: Stadtteil[] = [
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

export type PickBadge =
  | "Pick der Woche"
  | "Spontan-Tipp"
  | "Geheim-Tipp"
  | "Saison-Höhepunkt"
  | "Premium-Empfehlung"
  | "Familien-Pick";

export type BentoSize = "large" | "medium" | "small";

export interface EventX {
  id: string;
  slug: string;
  titel: string;
  untertitel?: string;
  beschreibung: string[];
  kategorie: Kategorie;
  stimmung: Stimmung[];
  /** ISO yyyy-mm-dd */
  startDatum: string;
  /** ISO yyyy-mm-dd, optional (default: startDatum) */
  endDatum?: string;
  zeitStart?: string;
  ort: { name: string; stadtteil: Stadtteil; lat: number; lng: number };
  preis: { min: number; max?: number; einheit: "CHF" | "gratis"; label: string };
  bilder: string[];
  anbieter: { name: string; verifikation: "wohnsitz" | "member" | "standard" };
  editorialPick?: { badge: PickBadge; kommentar: string; groesse?: BentoSize };
  klassiker?: boolean;
  flags?: {
    gratis?: boolean;
    indoor?: boolean;
    kinderfreundlich?: boolean;
    barDanach?: boolean;
    reservation?: boolean;
    spontan?: boolean;
    dateNight?: boolean;
    mitHund?: boolean;
    rollstuhl?: boolean;
    kinderwagen?: boolean;
  };
  cross: { tickets: number; bars: number; posts: number; mitfahr: number };
  /** keys of horizontal rows this event belongs to */
  reihen?: string[];
  /** countdown countdown to ISO date (used for hero) */
  heroOrder?: number;
}

const IMG = (q: string, w = 1600, h = 1100) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

// ─────────────────────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────────────────────

export const EVENTS: EventX[] = [
  // ════════ 6 HERO-KLASSIKER (Slideshow) ════════
  {
    id: "hero-pride",
    slug: "zurich-pride-2026",
    titel: "Zurich Pride 2026",
    untertitel: "Das grösste Pride-Festival der Schweiz",
    beschreibung: [
      "Eine Woche im Zeichen von Sichtbarkeit, Vielfalt und Liebe. Die Parade vom Helvetiaplatz zum Kasernenareal ist der Höhepunkt.",
      "Über 50'000 Menschen ziehen durch die Stadt, ein Meer aus Regenbogen-Fahnen und Glitter.",
      "Im Anschluss Konzerte und Reden auf der Kasernen-Bühne — friedlich, laut, herzlich.",
    ],
    kategorie: "festival",
    stimmung: ["bunt", "ausgelassen", "kulturell"],
    startDatum: "2026-06-07",
    endDatum: "2026-06-13",
    zeitStart: "12:00",
    ort: { name: "Helvetiaplatz → Kasernenareal", stadtteil: "Kreis 4", lat: 47.376, lng: 8.531 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Parade & Festival" },
    bilder: [IMG("1591622434-d8e02d9d2eb1"), IMG("1492684223066-81342ee5ff30"), IMG("1530017742405-1900056d4c25")],
    anbieter: { name: "Zurich Pride Festival", verifikation: "wohnsitz" },
    klassiker: true,
    flags: { gratis: true, kinderfreundlich: true, barDanach: true, rollstuhl: true },
    cross: { tickets: 24, bars: 87, posts: 142, mitfahr: 18 },
    heroOrder: 1,
  },
  {
    id: "hero-caliente",
    slug: "caliente-festival",
    titel: "Caliente Festival",
    untertitel: "Drei Tage Latino-Kultur mitten in Zürich",
    beschreibung: [
      "Salsa, Reggaeton, Empanadas und ein Bürkliplatz voller Tanzender.",
      "Das grösste Latino-Festival der Schweiz — Auftritte aus Kuba, Kolumbien, Brasilien, Spanien.",
      "Tagsüber Streetfood-Markt, abends Open-Air-Konzerte bis Mitternacht.",
    ],
    kategorie: "festival",
    stimmung: ["bunt", "ausgelassen", "spontan"],
    startDatum: "2026-07-12",
    endDatum: "2026-07-14",
    zeitStart: "14:00",
    ort: { name: "Bürkliplatz / Bellevue", stadtteil: "Kreis 1", lat: 47.366, lng: 8.541 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Tribüne CHF 18" },
    bilder: [IMG("1429962714451-bb934ecdc4ec"), IMG("1493225457124-a3eb161ffa5f"), IMG("1518709268805-4e9042af2176")],
    anbieter: { name: "Caliente! Festival", verifikation: "wohnsitz" },
    klassiker: true,
    flags: { gratis: true, kinderfreundlich: true, barDanach: true },
    cross: { tickets: 8, bars: 42, posts: 56, mitfahr: 12 },
    heroOrder: 2,
  },
  {
    id: "hero-streetparade",
    slug: "streetparade-2026",
    titel: "Streetparade 2026",
    untertitel: "Eine Million Menschen, 30 Love Mobiles, ein Beat",
    beschreibung: [
      "Die grösste Techno-Parade der Welt. 30 Love Mobiles ziehen vom Utoquai zum Hafendamm Enge.",
      "Acht Stages, eine Million Tanzende, Sonne über dem See.",
      "Tradition seit 1992 — gegründet als Demo für Freiheit, Liebe, Toleranz.",
    ],
    kategorie: "festival",
    stimmung: ["bunt", "ausgelassen", "spontan", "koerperlich"],
    startDatum: "2026-08-08",
    endDatum: "2026-08-08",
    zeitStart: "13:00",
    ort: { name: "Seeufer, Utoquai → Hafendamm Enge", stadtteil: "Kreis 1", lat: 47.36, lng: 8.545 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Stages teilweise CHF 30" },
    bilder: [IMG("1518709268805-4e9042af2176"), IMG("1571266028243-d220c6a32ae1"), IMG("1429962714451-bb934ecdc4ec")],
    anbieter: { name: "Verein Streetparade", verifikation: "wohnsitz" },
    klassiker: true,
    flags: { gratis: true, barDanach: true },
    cross: { tickets: 14, bars: 156, posts: 312, mitfahr: 87 },
    heroOrder: 3,
  },
  {
    id: "hero-knabenschiessen",
    slug: "knabenschiessen",
    titel: "Knabenschiessen",
    untertitel: "Zürichs ältester Volksanlass seit 1656",
    beschreibung: [
      "Schiessen, Jahrmarkt, Riesenrad — Zürichs ältestes Stadtfest auf dem Albisgüetli.",
      "Drei Tage Chilbi-Stimmung mit Magenbrot, Geisterbahn und Bratwurst.",
      "Montag ist offizieller halber Feiertag für Stadt-Mitarbeitende.",
    ],
    kategorie: "festival",
    stimmung: ["bunt", "kulturell", "ausgelassen"],
    startDatum: "2026-09-05",
    endDatum: "2026-09-07",
    zeitStart: "10:00",
    ort: { name: "Albisgüetli", stadtteil: "Kreis 3", lat: 47.358, lng: 8.501 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Bahnen einzeln" },
    bilder: [IMG("1567361424669-87ed10985b80"), IMG("1493244040629-496f6d136cc3"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Knabenschiessen-Komitee", verifikation: "wohnsitz" },
    klassiker: true,
    flags: { gratis: true, kinderfreundlich: true, kinderwagen: true },
    cross: { tickets: 0, bars: 18, posts: 78, mitfahr: 6 },
    heroOrder: 4,
  },
  {
    id: "hero-zff",
    slug: "zurich-film-festival",
    titel: "Zurich Film Festival",
    untertitel: "Premieren, Stars, Galas am Sechseläutenplatz",
    beschreibung: [
      "Elf Tage, 160 Filme, grüner Teppich am Sechseläutenplatz.",
      "Internationale Premieren, Filmgespräche, Awards.",
      "Vorführungen in Kinos rund um den Sechseläutenplatz und im Festival-Zelt.",
    ],
    kategorie: "festival",
    stimmung: ["kulturell", "intim", "romantisch"],
    startDatum: "2026-09-24",
    endDatum: "2026-10-04",
    zeitStart: "11:00",
    ort: { name: "Sechseläutenplatz + Kinos Kreis 1", stadtteil: "Kreis 1", lat: 47.366, lng: 8.546 },
    preis: { min: 20, max: 280, einheit: "CHF", label: "CHF 20–30 / Film · Pass CHF 280" },
    bilder: [IMG("1517604931442-7e0c8ed2963c"), IMG("1509316975850-ff9c5deb0cd9"), IMG("1485846234645-a62644f84728")],
    anbieter: { name: "Zurich Film Festival", verifikation: "wohnsitz" },
    klassiker: true,
    flags: { indoor: true, reservation: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 312, bars: 64, posts: 218, mitfahr: 34 },
    heroOrder: 5,
  },
  {
    id: "hero-wienachtsdorf",
    slug: "wienachtsdorf-bellevue",
    titel: "Wienachtsdorf am Bellevue",
    untertitel: "Glühwein, Lichter, das wärmste Quartier Zürichs",
    beschreibung: [
      "Glühwein-Hütten, Raclette-Stände und Geschenke aus aller Welt am Sechseläutenplatz.",
      "Der inoffizielle Beginn der Weihnachtszeit für viele Zürcher.",
      "Mit Eisbahn, Live-Musik und einem 18m hohen Christbaum.",
    ],
    kategorie: "festival",
    stimmung: ["romantisch", "intim", "bunt", "kulinarisch"],
    startDatum: "2026-11-22",
    endDatum: "2026-12-23",
    zeitStart: "11:00",
    ort: { name: "Sechseläutenplatz", stadtteil: "Kreis 1", lat: 47.366, lng: 8.546 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Glühwein ab CHF 7" },
    bilder: [IMG("1542838132-92c53300491e"), IMG("1543589077-47d81606c1bf"), IMG("1481833761820-0509d3217039")],
    anbieter: { name: "Wienachtsdorf AG", verifikation: "wohnsitz" },
    klassiker: true,
    flags: { gratis: true, kinderfreundlich: true, kinderwagen: true, dateNight: true },
    cross: { tickets: 0, bars: 92, posts: 134, mitfahr: 8 },
    heroOrder: 6,
  },

  // ════════ BENTO-GRID „Diese Woche kuratiert" — 6 Cards ════════
  {
    id: "bento-klang-kerzen",
    slug: "klang-und-kerzenschein-vivaldi",
    titel: "Klang & Kerzenschein — Vivaldi bei 800 Kerzen",
    untertitel: "Die vier Jahreszeiten im Kerzenmeer",
    beschreibung: [
      "800 Kerzen, das Schauspielhaus im Halbdunkel, ein Streichquartett.",
      "Vivaldis Vier Jahreszeiten in einer Inszenierung, die unter die Haut geht.",
      "Anschliessend Bar im Foyer mit Live-Pianist.",
    ],
    kategorie: "konzert",
    stimmung: ["intim", "romantisch", "kulturell"],
    startDatum: "2026-05-13",
    zeitStart: "20:00",
    ort: { name: "Schauspielhaus Pfauen", stadtteil: "Kreis 1", lat: 47.367, lng: 8.547 },
    preis: { min: 65, max: 145, einheit: "CHF", label: "CHF 65–145" },
    bilder: [IMG("1465847899084-d164df4dedc6"), IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819")],
    anbieter: { name: "Candlelight Concerts", verifikation: "wohnsitz" },
    editorialPick: {
      badge: "Pick der Woche",
      kommentar: "Wer Vivaldi mag und Kerzen liebt — pure Magie.",
      groesse: "large",
    },
    flags: { indoor: true, reservation: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 4, bars: 12, posts: 42, mitfahr: 6 },
    reihen: ["heute-abend", "konzerte", "date-night"],
  },
  {
    id: "bento-cadonau",
    slug: "popup-cadonau-fruehstueck",
    titel: "Pop-up: Sterne-Koch Cadonau Frühstück",
    untertitel: "Drei Sterne, ein Morgen, ein Hotel",
    beschreibung: [
      "Andreas Caminadas Schützling Andreas Cadonau übernimmt für einen Morgen die Storchen-Küche.",
      "Bündner-inspirierte Frühstücks-Kreationen, fünf Gänge, vor 9 Uhr.",
      "Nur 24 Plätze — bekannt seit 5 Jahren als bestgehütetes Frühstück der Stadt.",
    ],
    kategorie: "popup",
    stimmung: ["kulinarisch", "intim", "kulturell"],
    startDatum: "2026-05-14",
    zeitStart: "07:00",
    ort: { name: "Hotel Storchen", stadtteil: "Kreis 1", lat: 47.371, lng: 8.541 },
    preis: { min: 145, einheit: "CHF", label: "CHF 145" },
    bilder: [IMG("1504674900247-0877df9cc836"), IMG("1551218808-94e220e084d2"), IMG("1525755662778-989d0524087e")],
    anbieter: { name: "Hotel Storchen", verifikation: "wohnsitz" },
    editorialPick: {
      badge: "Premium-Empfehlung",
      kommentar: "Frühstück mit drei Sternen — einmalig in Zürich.",
      groesse: "medium",
    },
    flags: { indoor: true, reservation: true, dateNight: true },
    cross: { tickets: 0, bars: 6, posts: 18, mitfahr: 0 },
    reihen: ["premium-weekend"],
  },
  {
    id: "bento-frauenbadi",
    slug: "frauenbadi-saisonstart",
    titel: "Frauenbadi Saisonstart-Apero",
    untertitel: "Limmat, Sonne, Prosecco",
    beschreibung: [
      "Die mutigen springen, der Rest geniesst Apero.",
      "Die letzte Frauenbadi der Welt — seit 1837 nur für Frauen, FLINTA* und Kinder bis 7.",
      "Saison-Eröffnung mit Live-Musik vom Boots-Steg.",
    ],
    kategorie: "popup",
    stimmung: ["ruhig", "romantisch", "spontan"],
    startDatum: "2026-05-13",
    zeitStart: "17:00",
    ort: { name: "Frauenbadi Stadthausquai", stadtteil: "Kreis 1", lat: 47.367, lng: 8.542 },
    preis: { min: 12, einheit: "CHF", label: "CHF 12 inkl. Prosecco" },
    bilder: [IMG("1559564484-e48eda6daa1f"), IMG("1502082553048-f009c37129b9"), IMG("1518709268805-4e9042af2176")],
    anbieter: { name: "Frauenbadi Zürich", verifikation: "wohnsitz" },
    editorialPick: {
      badge: "Spontan-Tipp",
      kommentar: "Die Mutigen springen, der Rest geniesst Apero.",
      groesse: "medium",
    },
    flags: { spontan: true, dateNight: true, kinderfreundlich: true },
    cross: { tickets: 0, bars: 28, posts: 64, mitfahr: 0 },
    reihen: ["heute-abend"],
  },
  {
    id: "bento-photobastei",
    slug: "vernissage-stille-stadt",
    titel: "Vernissage «Stille Stadt»",
    untertitel: "Zürich um vier Uhr morgens",
    beschreibung: [
      "Eine fotografische Liebeserklärung an die Stadt, wenn niemand wach ist.",
      "Werke von 12 Schweizer Fotografen — kuratiert von Marco Grob.",
      "Apero im Foyer, Künstler:innen-Gespräch um 20:30.",
    ],
    kategorie: "vernissage",
    stimmung: ["ruhig", "kulturell", "intim"],
    startDatum: "2026-05-13",
    zeitStart: "19:00",
    ort: { name: "Photobastei", stadtteil: "Kreis 5", lat: 47.387, lng: 8.527 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Apero CHF 12" },
    bilder: [IMG("1545987796-200677ee1011"), IMG("1485518882345-15568b007407"), IMG("1452587925148-ce544e77e70d")],
    anbieter: { name: "Photobastei 2.0", verifikation: "wohnsitz" },
    editorialPick: {
      badge: "Geheim-Tipp",
      kommentar: "Sieben fast unbekannte Fotografen — perfekter Mittwoch-Abend.",
      groesse: "small",
    },
    flags: { gratis: true, indoor: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 0, bars: 14, posts: 22, mitfahr: 4 },
    reihen: ["heute-abend"],
  },
  {
    id: "bento-fcz",
    slug: "fcz-vs-yb-mai",
    titel: "FCZ vs YB",
    untertitel: "Super League Spitzenspiel",
    beschreibung: [
      "Spitzenspiel der Super League im Letzigrund.",
      "FCZ-Stehrampe ausverkauft, restliche Plätze knapp.",
      "Public Viewing am Sechseläutenplatz mit Bratwurst-Ständen.",
    ],
    kategorie: "sport",
    stimmung: ["ausgelassen", "koerperlich", "spontan"],
    startDatum: "2026-05-13",
    zeitStart: "20:30",
    ort: { name: "Letzigrund Stadion", stadtteil: "Kreis 4", lat: 47.382, lng: 8.504 },
    preis: { min: 22, max: 95, einheit: "CHF", label: "CHF 22–95" },
    bilder: [IMG("1551958219-acbc608c6377"), IMG("1517466787929-bc90951d0974"), IMG("1571019613454-1cb2f99b2d8b")],
    anbieter: { name: "FC Zürich", verifikation: "wohnsitz" },
    editorialPick: {
      badge: "Spontan-Tipp",
      kommentar: "Restkarten Stehrampe — wer schnell ist, ist dabei.",
      groesse: "small",
    },
    flags: { reservation: true, barDanach: true, rollstuhl: true },
    cross: { tickets: 18, bars: 34, posts: 92, mitfahr: 24 },
    reihen: ["heute-abend"],
  },
  {
    id: "bento-buerkliplatz-markt",
    slug: "wochenmarkt-buerkliplatz",
    titel: "Wochenmarkt Bürkliplatz",
    untertitel: "Spargel, Erdbeeren, Frühlingsfisch",
    beschreibung: [
      "Der wohl schönste Markt der Stadt — Spargel-Saison auf dem Höhepunkt.",
      "Lokale Bauern aus dem Knonaueramt, Käse vom Toggenburg, Fisch vom Zürichsee.",
      "Tipp: am Stand neben dem Brunnen gibt's heisse Spargel-Suppe.",
    ],
    kategorie: "kulinarisch",
    stimmung: ["ruhig", "kulinarisch", "spontan"],
    startDatum: "2026-05-15",
    zeitStart: "07:00",
    ort: { name: "Bürkliplatz", stadtteil: "Kreis 1", lat: 47.366, lng: 8.541 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Marktstände variabel" },
    bilder: [IMG("1488459716781-31db52582fe9"), IMG("1542838132-92c53300491e"), IMG("1510812431401-41d2bd2722f3")],
    anbieter: { name: "Stadt Zürich", verifikation: "wohnsitz" },
    editorialPick: {
      badge: "Familien-Pick",
      kommentar: "Erdbeeren, Spargel, Sonne — bester Freitag-Frühstück-Ausflug.",
      groesse: "small",
    },
    flags: { gratis: true, kinderfreundlich: true, kinderwagen: true, mitHund: true },
    cross: { tickets: 0, bars: 18, posts: 12, mitfahr: 0 },
    reihen: ["familien", "kostenlos"],
  },

  // ════════ Reihe 1: HEUTE ABEND ════════
  {
    id: "row-vangogh",
    slug: "van-gogh-immersive",
    titel: "Van Gogh Immersive",
    beschreibung: [
      "360°-Projektion in der Maag Halle — Van Goghs Werke leben.",
      "Ein Audio-Walk durch die Höhepunkte des Malers.",
      "Empfohlen vor allem für Erstbesucher und Kinder ab 8.",
    ],
    kategorie: "vernissage",
    stimmung: ["kulturell", "bunt", "romantisch"],
    startDatum: "2026-05-13",
    endDatum: "2026-09-30",
    zeitStart: "18:00",
    ort: { name: "Maag Halle", stadtteil: "Kreis 5", lat: 47.388, lng: 8.523 },
    preis: { min: 32, max: 48, einheit: "CHF", label: "CHF 32–48" },
    bilder: [IMG("1545987796-200677ee1011"), IMG("1547595628-c61a29f496f0"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Maag Halle", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, kinderfreundlich: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 12, bars: 18, posts: 38, mitfahr: 4 },
    reihen: ["heute-abend", "stadtteil-kreis5"],
  },
  {
    id: "row-moods-trio",
    slug: "jazzclub-moods-trio",
    titel: "Jazzclub Moods — Trio aus New Orleans",
    beschreibung: [
      "Drei Generationen Jazz aus dem French Quarter, ein Abend in Zürich.",
      "Klein, intim, mit Bar bis 02:00.",
      "Tickets sind schon fast weg — wer rein will, sollte reservieren.",
    ],
    kategorie: "konzert",
    stimmung: ["intim", "kulturell", "romantisch"],
    startDatum: "2026-05-13",
    zeitStart: "21:00",
    ort: { name: "Moods im Schiffbau", stadtteil: "Kreis 5", lat: 47.39, lng: 8.522 },
    preis: { min: 38, einheit: "CHF", label: "CHF 38" },
    bilder: [IMG("1514525253161-7a46d19cd819"), IMG("1465847899084-d164df4dedc6"), IMG("1459749411175-04bf5292ceea")],
    anbieter: { name: "Moods Jazz Club", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, barDanach: true, dateNight: true },
    cross: { tickets: 8, bars: 12, posts: 24, mitfahr: 4 },
    reihen: ["heute-abend", "konzerte", "date-night", "stadtteil-kreis5"],
  },
  {
    id: "row-tonhalle-probe",
    slug: "tonhalle-probe-oeffnung",
    titel: "Tonhalle — Offene Probe",
    beschreibung: [
      "Tonhalle-Orchester öffnet die Generalprobe für 80 Gäste.",
      "Beethoven, Brahms, Beobachtung.",
      "Eintritt symbolisch CHF 12 — Tradition seit den 90ern.",
    ],
    kategorie: "konzert",
    stimmung: ["kulturell", "intim", "ruhig"],
    startDatum: "2026-05-13",
    zeitStart: "19:00",
    ort: { name: "Tonhalle Maag", stadtteil: "Kreis 5", lat: 47.388, lng: 8.522 },
    preis: { min: 12, einheit: "CHF", label: "CHF 12" },
    bilder: [IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819"), IMG("1459749411175-04bf5292ceea")],
    anbieter: { name: "Tonhalle-Gesellschaft", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 6, bars: 8, posts: 14, mitfahr: 2 },
    reihen: ["heute-abend", "konzerte", "geheim"],
  },
  {
    id: "row-comedy-kaufleuten",
    slug: "stand-up-comedy-kaufleuten",
    titel: "Stand-up Comedy Kaufleuten",
    beschreibung: [
      "Sechs Comedians, 90 Minuten, deutsch und englisch gemischt.",
      "Open Mic mit den besten Talenten der Stadt.",
      "Bar offen bis 02:00.",
    ],
    kategorie: "theater",
    stimmung: ["ausgelassen", "spontan", "bunt"],
    startDatum: "2026-05-13",
    zeitStart: "20:30",
    ort: { name: "Kaufleuten", stadtteil: "Kreis 1", lat: 47.371, lng: 8.535 },
    preis: { min: 25, einheit: "CHF", label: "CHF 25" },
    bilder: [IMG("1571266028243-d220c6a32ae1"), IMG("1503095396549-807759245b35"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Kaufleuten Klub", verifikation: "wohnsitz" },
    flags: { indoor: true, barDanach: true, spontan: true },
    cross: { tickets: 12, bars: 8, posts: 18, mitfahr: 4 },
    reihen: ["heute-abend"],
  },
  {
    id: "row-photo-salon",
    slug: "kunst-salon-photobastei",
    titel: "Kunst-Salon Photobastei",
    beschreibung: [
      "Offener Salon-Abend mit drei Schweizer Fotograf:innen.",
      "Drinks, Gespräche, Werke an den Wänden.",
      "Eintritt frei — Spende erwünscht.",
    ],
    kategorie: "vernissage",
    stimmung: ["ruhig", "kulturell", "intim"],
    startDatum: "2026-05-13",
    zeitStart: "20:00",
    ort: { name: "Photobastei", stadtteil: "Kreis 5", lat: 47.387, lng: 8.527 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Spende erwünscht" },
    bilder: [IMG("1452587925148-ce544e77e70d"), IMG("1545987796-200677ee1011"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Photobastei", verifikation: "wohnsitz" },
    flags: { gratis: true, indoor: true, spontan: true, dateNight: true },
    cross: { tickets: 0, bars: 4, posts: 8, mitfahr: 0 },
    reihen: ["heute-abend", "kostenlos", "stadtteil-kreis5"],
  },

  // ════════ Reihe 2: PREMIUM WEEKEND ════════
  {
    id: "row-traviata",
    slug: "opernhaus-la-traviata",
    titel: "Opernhaus — La Traviata",
    beschreibung: [
      "Verdis Klassiker in der Inszenierung von Tatjana Gürbaca.",
      "Mit Asmik Grigorian — internationale Premiere.",
      "Premium-Plätze fast ausverkauft.",
    ],
    kategorie: "konzert",
    stimmung: ["romantisch", "kulturell", "intim"],
    startDatum: "2026-05-16",
    zeitStart: "19:30",
    ort: { name: "Opernhaus Zürich", stadtteil: "Kreis 1", lat: 47.365, lng: 8.547 },
    preis: { min: 78, max: 348, einheit: "CHF", label: "CHF 78–348" },
    bilder: [IMG("1503095396549-807759245b35"), IMG("1493225457124-a3eb161ffa5f"), IMG("1465847899084-d164df4dedc6")],
    anbieter: { name: "Opernhaus Zürich", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 18, bars: 24, posts: 42, mitfahr: 8 },
    reihen: ["premium-weekend", "date-night"],
  },
  {
    id: "row-storchen-brunch",
    slug: "sterne-brunch-storchen",
    titel: "Sterne-Brunch Hotel Storchen",
    beschreibung: [
      "Sonntags-Brunch mit Champagner, 14 Stationen, Live-Jazz.",
      "Aussicht auf Limmat und Grossmünster — die schönste Brunch-Adresse der Stadt.",
      "Reservation 2 Wochen im Voraus empfohlen.",
    ],
    kategorie: "kulinarisch",
    stimmung: ["kulinarisch", "intim", "romantisch"],
    startDatum: "2026-05-17",
    zeitStart: "11:00",
    ort: { name: "Hotel Storchen", stadtteil: "Kreis 1", lat: 47.371, lng: 8.541 },
    preis: { min: 145, einheit: "CHF", label: "CHF 145" },
    bilder: [IMG("1504674900247-0877df9cc836"), IMG("1525755662778-989d0524087e"), IMG("1551218808-94e220e084d2")],
    anbieter: { name: "Hotel Storchen", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true, kinderfreundlich: true },
    cross: { tickets: 0, bars: 6, posts: 18, mitfahr: 2 },
    reihen: ["premium-weekend"],
  },
  {
    id: "row-old-crow",
    slug: "old-crow-geheim-konzert",
    titel: "Old Crow — Geheim-Konzert",
    beschreibung: [
      "Speakeasy-Konzert mit unangekündigtem Künstler.",
      "Nur 30 Plätze, Whisky inklusive.",
      "Wer den Code kennt, kommt rein.",
    ],
    kategorie: "konzert",
    stimmung: ["intim", "ruhig", "spontan"],
    startDatum: "2026-05-16",
    zeitStart: "22:00",
    ort: { name: "Old Crow Bar", stadtteil: "Kreis 4", lat: 47.378, lng: 8.532 },
    preis: { min: 65, einheit: "CHF", label: "CHF 65 inkl. Whisky" },
    bilder: [IMG("1571266028243-d220c6a32ae1"), IMG("1514525253161-7a46d19cd819"), IMG("1465847899084-d164df4dedc6")],
    anbieter: { name: "Old Crow", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, barDanach: true, dateNight: true },
    cross: { tickets: 4, bars: 6, posts: 12, mitfahr: 2 },
    reihen: ["premium-weekend", "geheim", "date-night"],
  },
  {
    id: "row-whisky-maag",
    slug: "whisky-tasting-maag",
    titel: "Whisky-Tasting Maag Halle",
    beschreibung: [
      "Sieben seltene Single Malts, geführt von einem Master of the Quaich.",
      "Inklusive Käse-Pairings vom Toggenburger Hof.",
      "Limitiert auf 24 Plätze.",
    ],
    kategorie: "kulinarisch",
    stimmung: ["kulinarisch", "kulturell", "intim"],
    startDatum: "2026-05-15",
    zeitStart: "19:00",
    ort: { name: "Maag Halle", stadtteil: "Kreis 5", lat: 47.388, lng: 8.523 },
    preis: { min: 125, einheit: "CHF", label: "CHF 125" },
    bilder: [IMG("1510812431401-41d2bd2722f3"), IMG("1547595628-c61a29f496f0"), IMG("1551218808-94e220e084d2")],
    anbieter: { name: "Maag Halle", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true },
    cross: { tickets: 6, bars: 12, posts: 18, mitfahr: 4 },
    reihen: ["premium-weekend"],
  },
  {
    id: "row-sprungli-brunch",
    slug: "champagne-brunch-spruengli",
    titel: "Champagne-Brunch Confiserie Sprüngli",
    beschreibung: [
      "Sonntags-Klassiker: Patisserie, Fisch, Champagner.",
      "Auf der Terrasse mit Blick über die Bahnhofstrasse.",
      "Reservation Pflicht.",
    ],
    kategorie: "kulinarisch",
    stimmung: ["kulinarisch", "intim", "kulturell"],
    startDatum: "2026-05-17",
    zeitStart: "10:30",
    ort: { name: "Sprüngli Paradeplatz", stadtteil: "Kreis 1", lat: 47.37, lng: 8.539 },
    preis: { min: 98, einheit: "CHF", label: "CHF 98" },
    bilder: [IMG("1504674900247-0877df9cc836"), IMG("1525755662778-989d0524087e"), IMG("1465014925804-7b9ede221f7e")],
    anbieter: { name: "Confiserie Sprüngli", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, kinderfreundlich: true, dateNight: true },
    cross: { tickets: 0, bars: 4, posts: 12, mitfahr: 0 },
    reihen: ["premium-weekend"],
  },
  {
    id: "row-polo-dolder",
    slug: "polo-match-dolder",
    titel: "Polo-Match Dolder",
    beschreibung: [
      "Internationales Polo-Turnier auf den Wiesen des Dolder Grand.",
      "Champagner-Tribüne, Picnic-Korbverkauf, Live-Kommentar.",
      "Eines der raren Polo-Events nördlich der Alpen.",
    ],
    kategorie: "sport",
    stimmung: ["kulturell", "intim", "romantisch"],
    startDatum: "2026-05-16",
    zeitStart: "14:00",
    ort: { name: "Dolder Grand", stadtteil: "Kreis 7", lat: 47.379, lng: 8.567 },
    preis: { min: 85, max: 280, einheit: "CHF", label: "CHF 85–280" },
    bilder: [IMG("1551958219-acbc608c6377"), IMG("1517466787929-bc90951d0974"), IMG("1571019613454-1cb2f99b2d8b")],
    anbieter: { name: "Dolder Grand", verifikation: "wohnsitz" },
    flags: { reservation: true, dateNight: true, kinderfreundlich: true },
    cross: { tickets: 12, bars: 6, posts: 8, mitfahr: 8 },
    reihen: ["premium-weekend"],
  },
  {
    id: "row-maison-manesse",
    slug: "wine-pairing-maison-manesse",
    titel: "Wine-Pairing Maison Manesse",
    beschreibung: [
      "Sieben Gänge, sieben Naturweine, ein Abend.",
      "Bekannt für mutige Schweizer Weine — und ehrliche Küche.",
      "Reservation 3 Wochen im Voraus.",
    ],
    kategorie: "kulinarisch",
    stimmung: ["kulinarisch", "kulturell", "intim"],
    startDatum: "2026-05-16",
    zeitStart: "19:00",
    ort: { name: "Maison Manesse", stadtteil: "Kreis 4", lat: 47.374, lng: 8.526 },
    preis: { min: 188, einheit: "CHF", label: "CHF 188" },
    bilder: [IMG("1510812431401-41d2bd2722f3"), IMG("1547595628-c61a29f496f0"), IMG("1504674900247-0877df9cc836")],
    anbieter: { name: "Maison Manesse", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true },
    cross: { tickets: 0, bars: 4, posts: 14, mitfahr: 2 },
    reihen: ["premium-weekend", "date-night"],
  },

  // ════════ Reihe 3: KONZERTE & LIVE-MUSIK ════════
  {
    id: "row-helvetic",
    slug: "helvetic-music-festival",
    titel: "Helvetic Music Festival",
    beschreibung: [
      "Indie-Festival in der alten Hardstrasse 219.",
      "12 Bands aus der Schweiz, von Lucerne bis Carouge.",
      "Open-Air mit 2'000 Leuten.",
    ],
    kategorie: "konzert",
    stimmung: ["bunt", "ausgelassen", "kulturell"],
    startDatum: "2026-05-22",
    endDatum: "2026-05-23",
    zeitStart: "19:00",
    ort: { name: "Hardstrasse 219", stadtteil: "Kreis 5", lat: 47.388, lng: 8.524 },
    preis: { min: 48, max: 78, einheit: "CHF", label: "CHF 48 / 78 Pass" },
    bilder: [IMG("1493225457124-a3eb161ffa5f"), IMG("1429962714451-bb934ecdc4ec"), IMG("1571266028243-d220c6a32ae1")],
    anbieter: { name: "Helvetic Festival", verifikation: "wohnsitz" },
    flags: { reservation: true, barDanach: true, dateNight: true },
    cross: { tickets: 24, bars: 18, posts: 38, mitfahr: 12 },
    reihen: ["konzerte"],
  },
  {
    id: "row-tonhalle-saison",
    slug: "tonhalle-saisonkonzert",
    titel: "Tonhalle Saisonkonzert",
    beschreibung: [
      "Tonhalle-Orchester mit Paavo Järvi.",
      "Beethoven Sinfonie Nr. 9 — voller Saal, voller Klang.",
      "Eines der akustisch besten Konzerthäuser Europas.",
    ],
    kategorie: "konzert",
    stimmung: ["kulturell", "intim", "romantisch"],
    startDatum: "2026-05-19",
    zeitStart: "19:30",
    ort: { name: "Tonhalle Maag", stadtteil: "Kreis 5", lat: 47.388, lng: 8.522 },
    preis: { min: 38, max: 168, einheit: "CHF", label: "CHF 38–168" },
    bilder: [IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819"), IMG("1503095396549-807759245b35")],
    anbieter: { name: "Tonhalle-Gesellschaft", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 24, bars: 8, posts: 18, mitfahr: 6 },
    reihen: ["konzerte", "premium-weekend"],
  },
  {
    id: "row-bogen-f",
    slug: "bogen-f-underground",
    titel: "Bogen F — Underground",
    beschreibung: [
      "Underground-Techno unter den SBB-Bögen.",
      "Drei DJs, ein Soundsystem, eine Nacht bis Sonnenaufgang.",
      "Kein Smartphone-Foto erlaubt.",
    ],
    kategorie: "konzert",
    stimmung: ["ausgelassen", "abenteuerlich", "intim"],
    startDatum: "2026-05-23",
    zeitStart: "23:00",
    ort: { name: "Bogen F", stadtteil: "Kreis 4", lat: 47.378, lng: 8.527 },
    preis: { min: 22, einheit: "CHF", label: "CHF 22" },
    bilder: [IMG("1571266028243-d220c6a32ae1"), IMG("1429962714451-bb934ecdc4ec"), IMG("1493225457124-a3eb161ffa5f")],
    anbieter: { name: "Bogen F Kollektiv", verifikation: "member" },
    flags: { indoor: true, barDanach: true, spontan: true },
    cross: { tickets: 8, bars: 12, posts: 24, mitfahr: 6 },
    reihen: ["konzerte", "geheim"],
  },
  {
    id: "row-klingender-limmatquai",
    slug: "klingender-limmatquai",
    titel: "Klingender Limmatquai Open-Air",
    beschreibung: [
      "Open-Air-Konzertreihe entlang der Limmat.",
      "Sieben Bühnen, 30 Bands, ein Wochenende — alles gratis.",
      "Picknick-Decken willkommen.",
    ],
    kategorie: "konzert",
    stimmung: ["bunt", "ausgelassen", "spontan"],
    startDatum: "2026-05-30",
    endDatum: "2026-05-31",
    zeitStart: "14:00",
    ort: { name: "Limmatquai", stadtteil: "Kreis 1", lat: 47.371, lng: 8.543 },
    preis: { min: 0, einheit: "gratis", label: "Gratis" },
    bilder: [IMG("1493225457124-a3eb161ffa5f"), IMG("1502082553048-f009c37129b9"), IMG("1518709268805-4e9042af2176")],
    anbieter: { name: "Stadt Zürich Kulturförderung", verifikation: "wohnsitz" },
    flags: { gratis: true, kinderfreundlich: true, mitHund: true, kinderwagen: true, spontan: true },
    cross: { tickets: 0, bars: 28, posts: 42, mitfahr: 12 },
    reihen: ["konzerte", "familien", "kostenlos"],
  },

  // ════════ Reihe 4: FAMILIEN-HIGHLIGHTS ════════
  {
    id: "row-bremgartner-spielplatz",
    slug: "bremgartner-spielplatz-eroeffnung",
    titel: "Bremgartner-Spielplatz Eröffnung",
    beschreibung: [
      "Neuer Spielplatz im Bremgartner-Quartier eröffnet.",
      "Mit Wasserstrasse, Klettergerüst, Familien-Picknick.",
      "Bratwurst und Kafi gratis am Eröffnungstag.",
    ],
    kategorie: "festival",
    stimmung: ["bunt", "spontan", "ausgelassen"],
    startDatum: "2026-05-17",
    zeitStart: "11:00",
    ort: { name: "Bremgartner Areal", stadtteil: "Kreis 6", lat: 47.39, lng: 8.555 },
    preis: { min: 0, einheit: "gratis", label: "Gratis" },
    bilder: [IMG("1502082553048-f009c37129b9"), IMG("1565514020179-026b92b84bb6"), IMG("1488459716781-31db52582fe9")],
    anbieter: { name: "Stadt Zürich Grün", verifikation: "wohnsitz" },
    flags: { gratis: true, kinderfreundlich: true, kinderwagen: true, rollstuhl: true, mitHund: true },
    cross: { tickets: 0, bars: 4, posts: 18, mitfahr: 0 },
    reihen: ["familien", "kostenlos"],
  },
  {
    id: "row-zoo-nacht",
    slug: "zoo-nachts-fuehrung",
    titel: "Zoo Zürich — Nachts-Führung",
    beschreibung: [
      "Geführter Rundgang nach Schliessung.",
      "Wenn die Tiger nachtaktiv werden.",
      "Familien-Ticket für vier ab CHF 45.",
    ],
    kategorie: "workshop",
    stimmung: ["abenteuerlich", "kulturell", "ruhig"],
    startDatum: "2026-05-16",
    zeitStart: "20:00",
    ort: { name: "Zoo Zürich", stadtteil: "Kreis 7", lat: 47.385, lng: 8.575 },
    preis: { min: 18, max: 45, einheit: "CHF", label: "CHF 18 / Familie 45" },
    bilder: [IMG("1487958449943-2429e8be8625"), IMG("1565514020179-026b92b84bb6"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Zoo Zürich", verifikation: "wohnsitz" },
    flags: { reservation: true, kinderfreundlich: true, kinderwagen: true, rollstuhl: true },
    cross: { tickets: 28, bars: 4, posts: 24, mitfahr: 6 },
    reihen: ["familien"],
  },
  {
    id: "row-fifa-workshop",
    slug: "fifa-museum-familien-workshop",
    titel: "Familien-Workshop FIFA Museum",
    beschreibung: [
      "Kreativ-Workshop für Kinder 6-12.",
      "Eigenes Trikot gestalten, mit echten Stoffen.",
      "Begleitung kostenlos.",
    ],
    kategorie: "workshop",
    stimmung: ["bunt", "spontan", "ausgelassen"],
    startDatum: "2026-05-17",
    zeitStart: "14:00",
    ort: { name: "FIFA Museum", stadtteil: "Kreis 2", lat: 47.358, lng: 8.527 },
    preis: { min: 18, einheit: "CHF", label: "CHF 18 Kind · Begleitung gratis" },
    bilder: [IMG("1517466787929-bc90951d0974"), IMG("1551958219-acbc608c6377"), IMG("1571019613454-1cb2f99b2d8b")],
    anbieter: { name: "FIFA Museum", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, kinderfreundlich: true, kinderwagen: true, rollstuhl: true },
    cross: { tickets: 12, bars: 4, posts: 8, mitfahr: 2 },
    reihen: ["familien"],
  },
  {
    id: "row-stok-theater",
    slug: "kindertheater-stok",
    titel: "Kindertheater Stok",
    beschreibung: [
      "«Der Räuber Hotzenplotz» auf der Stok-Bühne.",
      "Empfohlen ab 4 Jahre.",
      "60 Minuten reiner Spass.",
    ],
    kategorie: "theater",
    stimmung: ["bunt", "ausgelassen", "spontan"],
    startDatum: "2026-05-17",
    zeitStart: "15:00",
    ort: { name: "Theater Stok", stadtteil: "Kreis 1", lat: 47.376, lng: 8.547 },
    preis: { min: 22, einheit: "CHF", label: "CHF 22 / Kind 12" },
    bilder: [IMG("1503095396549-807759245b35"), IMG("1542204165-65bf26472b9b"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Theater Stok", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, kinderfreundlich: true, kinderwagen: true },
    cross: { tickets: 18, bars: 4, posts: 6, mitfahr: 0 },
    reihen: ["familien"],
  },
  {
    id: "row-maerlitram",
    slug: "maerlitram-spezialfahrt",
    titel: "Märlitram Spezialfahrt",
    beschreibung: [
      "Das historische Tram durch die Stadt mit Märchenlesung.",
      "Für Kinder ab 4 — und alle, die nostalgisch sind.",
      "Eine Stunde, eine Geschichte, ein Erlebnis.",
    ],
    kategorie: "workshop",
    stimmung: ["bunt", "kulturell", "intim"],
    startDatum: "2026-05-17",
    zeitStart: "14:30",
    ort: { name: "Bellevue", stadtteil: "Kreis 1", lat: 47.366, lng: 8.546 },
    preis: { min: 8, max: 5, einheit: "CHF", label: "CHF 8 Kind · 5 Erwachsene" },
    bilder: [IMG("1565514020179-026b92b84bb6"), IMG("1502082553048-f009c37129b9"), IMG("1488459716781-31db52582fe9")],
    anbieter: { name: "VBZ", verifikation: "wohnsitz" },
    flags: { reservation: true, kinderfreundlich: true, kinderwagen: true, rollstuhl: true },
    cross: { tickets: 4, bars: 4, posts: 8, mitfahr: 0 },
    reihen: ["familien"],
  },
  {
    id: "row-frau-gerold-brunch",
    slug: "familien-brunch-frau-gerolds",
    titel: "Familien-Brunch Frau Gerolds",
    beschreibung: [
      "Sonntags-Brunch im Stadt-Garten.",
      "Mit Spielecke, Sandkasten, Live-Musik.",
      "Kinderwagen-freundlich, Hunde willkommen.",
    ],
    kategorie: "kulinarisch",
    stimmung: ["kulinarisch", "spontan", "bunt"],
    startDatum: "2026-05-17",
    zeitStart: "10:00",
    ort: { name: "Frau Gerolds Garten", stadtteil: "Kreis 5", lat: 47.388, lng: 8.526 },
    preis: { min: 38, einheit: "CHF", label: "CHF 38 · Kinder gratis" },
    bilder: [IMG("1504674900247-0877df9cc836"), IMG("1525755662778-989d0524087e"), IMG("1488459716781-31db52582fe9")],
    anbieter: { name: "Frau Gerold", verifikation: "wohnsitz" },
    flags: { reservation: true, kinderfreundlich: true, kinderwagen: true, mitHund: true, spontan: true },
    cross: { tickets: 0, bars: 12, posts: 28, mitfahr: 0 },
    reihen: ["familien", "stadtteil-kreis5"],
  },
  {
    id: "row-mitmach-tonhalle",
    slug: "mitmach-konzert-tonhalle",
    titel: "Mitmach-Konzert Tonhalle",
    beschreibung: [
      "Klassik zum Anfassen für Kinder 5-12.",
      "Mit Instrumenten-Werkstatt vor dem Konzert.",
      "Tonhalle-Orchester live, kinderfreundlich erklärt.",
    ],
    kategorie: "konzert",
    stimmung: ["kulturell", "bunt", "ausgelassen"],
    startDatum: "2026-05-24",
    zeitStart: "11:00",
    ort: { name: "Tonhalle Maag", stadtteil: "Kreis 5", lat: 47.388, lng: 8.522 },
    preis: { min: 12, einheit: "CHF", label: "CHF 12 / Familie 35" },
    bilder: [IMG("1514525253161-7a46d19cd819"), IMG("1465847899084-d164df4dedc6"), IMG("1503095396549-807759245b35")],
    anbieter: { name: "Tonhalle-Gesellschaft", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, kinderfreundlich: true, kinderwagen: true, rollstuhl: true },
    cross: { tickets: 14, bars: 4, posts: 6, mitfahr: 2 },
    reihen: ["familien", "konzerte"],
  },

  // ════════ Reihe 5: DATE NIGHT ════════
  {
    id: "row-igniv",
    slug: "sterne-dinner-igniv",
    titel: "Sterne-Dinner IGNIV by Caminada",
    beschreibung: [
      "Andreas Caminadas Sharing-Konzept im Storchen.",
      "Sieben Gänge, ein Tisch, eine Geschichte.",
      "Romantischer als jeder Sonnenuntergang.",
    ],
    kategorie: "kulinarisch",
    stimmung: ["romantisch", "kulinarisch", "intim"],
    startDatum: "2026-05-15",
    zeitStart: "19:30",
    ort: { name: "IGNIV Storchen", stadtteil: "Kreis 1", lat: 47.371, lng: 8.541 },
    preis: { min: 245, einheit: "CHF", label: "CHF 245" },
    bilder: [IMG("1504674900247-0877df9cc836"), IMG("1551218808-94e220e084d2"), IMG("1525755662778-989d0524087e")],
    anbieter: { name: "IGNIV by A. Caminada", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 0, bars: 8, posts: 24, mitfahr: 4 },
    reihen: ["date-night", "premium-weekend"],
  },
  {
    id: "row-limmat-boot",
    slug: "limmat-bootsfahrt-apero",
    titel: "Limmat-Bootsfahrt mit Apero",
    beschreibung: [
      "90 Minuten auf der Limmat, mit Prosecco und Häppchen.",
      "Bei Sonnenuntergang besonders schön.",
      "Privates Boot, max. 12 Personen.",
    ],
    kategorie: "popup",
    stimmung: ["romantisch", "ruhig", "intim"],
    startDatum: "2026-05-16",
    zeitStart: "18:30",
    ort: { name: "Schifflände Bürkliplatz", stadtteil: "Kreis 1", lat: 47.366, lng: 8.541 },
    preis: { min: 68, einheit: "CHF", label: "CHF 68 inkl. Apero" },
    bilder: [IMG("1502082553048-f009c37129b9"), IMG("1559564484-e48eda6daa1f"), IMG("1518709268805-4e9042af2176")],
    anbieter: { name: "Zürichsee Schifffahrt", verifikation: "wohnsitz" },
    flags: { reservation: true, dateNight: true },
    cross: { tickets: 8, bars: 18, posts: 14, mitfahr: 0 },
    reihen: ["date-night"],
  },
  {
    id: "row-kunsthaus-privat",
    slug: "kunsthaus-private-vernissage",
    titel: "Privat-Vernissage Kunsthaus",
    beschreibung: [
      "Geschlossene Vorbesichtigung der neuen Monet-Ausstellung.",
      "Nur 40 Plätze, mit Apero und Kurator:innen-Führung.",
      "Bekanntgegeben nur im Kunsthaus-Newsletter.",
    ],
    kategorie: "vernissage",
    stimmung: ["intim", "kulturell", "romantisch"],
    startDatum: "2026-05-20",
    zeitStart: "19:00",
    ort: { name: "Kunsthaus Zürich", stadtteil: "Kreis 1", lat: 47.37, lng: 8.548 },
    preis: { min: 65, einheit: "CHF", label: "CHF 65" },
    bilder: [IMG("1545987796-200677ee1011"), IMG("1452587925148-ce544e77e70d"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Kunsthaus Zürich", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 12, bars: 8, posts: 14, mitfahr: 2 },
    reihen: ["date-night", "geheim"],
  },
  {
    id: "row-clouds",
    slug: "clouds-rooftop-sonnenuntergang",
    titel: "Clouds Rooftop — Sonnenuntergang",
    beschreibung: [
      "Im 35. Stock des Prime Tower.",
      "Aussicht auf See, Stadt, Alpen — zur goldenen Stunde.",
      "Reservation für die Outdoor-Lounge dringend empfohlen.",
    ],
    kategorie: "popup",
    stimmung: ["romantisch", "ruhig", "intim"],
    startDatum: "2026-05-14",
    zeitStart: "19:00",
    ort: { name: "Prime Tower", stadtteil: "Kreis 5", lat: 47.388, lng: 8.521 },
    preis: { min: 0, einheit: "gratis", label: "Gratis Eintritt · Drinks ab CHF 18" },
    bilder: [IMG("1502082553048-f009c37129b9"), IMG("1518709268805-4e9042af2176"), IMG("1481833761820-0509d3217039")],
    anbieter: { name: "Clouds AG", verifikation: "wohnsitz" },
    flags: { gratis: true, reservation: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 0, bars: 12, posts: 22, mitfahr: 4 },
    reihen: ["date-night", "stadtteil-kreis5"],
  },
  {
    id: "row-kino-werdinsel",
    slug: "kino-unter-sternen-werdinsel",
    titel: "Kino unter Sternen Werdinsel",
    beschreibung: [
      "Open-Air-Kino auf der Werdinsel.",
      "Klassiker und Premieren im Schein der Sterne.",
      "Picknick-Decken willkommen.",
    ],
    kategorie: "festival",
    stimmung: ["romantisch", "ruhig", "intim"],
    startDatum: "2026-07-15",
    endDatum: "2026-08-25",
    zeitStart: "21:30",
    ort: { name: "Werdinsel", stadtteil: "Kreis 9", lat: 47.391, lng: 8.488 },
    preis: { min: 18, einheit: "CHF", label: "CHF 18" },
    bilder: [IMG("1509316975850-ff9c5deb0cd9"), IMG("1517604931442-7e0c8ed2963c"), IMG("1485846234645-a62644f84728")],
    anbieter: { name: "Open Air Kino Zürich", verifikation: "wohnsitz" },
    flags: { reservation: true, dateNight: true },
    cross: { tickets: 14, bars: 4, posts: 28, mitfahr: 6 },
    reihen: ["date-night"],
  },
  {
    id: "row-cesare",
    slug: "cesare-wine-tasting",
    titel: "Wine-Tasting Cesare",
    beschreibung: [
      "Sieben italienische Naturweine, kuratiert vom Sommelier.",
      "Mit hausgemachten Antipasti.",
      "Reservation 2 Wochen im Voraus.",
    ],
    kategorie: "kulinarisch",
    stimmung: ["kulinarisch", "intim", "romantisch"],
    startDatum: "2026-05-21",
    zeitStart: "19:00",
    ort: { name: "Cesare Vinothek", stadtteil: "Kreis 4", lat: 47.379, lng: 8.527 },
    preis: { min: 65, einheit: "CHF", label: "CHF 65" },
    bilder: [IMG("1510812431401-41d2bd2722f3"), IMG("1547595628-c61a29f496f0"), IMG("1504674900247-0877df9cc836")],
    anbieter: { name: "Cesare", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, dateNight: true },
    cross: { tickets: 0, bars: 8, posts: 12, mitfahr: 2 },
    reihen: ["date-night"],
  },

  // ════════ Reihe 6: VERBORGENES ZÜRICH ════════
  {
    id: "row-old-crow-menu",
    slug: "old-crow-hidden-menu",
    titel: "Old Crow — Hidden Menu Abend",
    beschreibung: [
      "Speakeasy-Bar mit geheimer Karte ausserhalb der offiziellen.",
      "Wer das Passwort kennt, bekommt die echten Drinks.",
      "Nur am dritten Donnerstag im Monat.",
    ],
    kategorie: "popup",
    stimmung: ["intim", "abenteuerlich", "kulturell"],
    startDatum: "2026-05-21",
    zeitStart: "21:00",
    ort: { name: "Old Crow Bar", stadtteil: "Kreis 4", lat: 47.378, lng: 8.532 },
    preis: { min: 18, einheit: "CHF", label: "Drinks ab CHF 18" },
    bilder: [IMG("1571266028243-d220c6a32ae1"), IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819")],
    anbieter: { name: "Old Crow", verifikation: "wohnsitz" },
    flags: { indoor: true, barDanach: true },
    cross: { tickets: 0, bars: 8, posts: 14, mitfahr: 0 },
    reihen: ["geheim"],
  },
  {
    id: "row-opernhaus-tour",
    slug: "opernhaus-backstage-tour",
    titel: "Hinter-Kulissen Opernhaus",
    beschreibung: [
      "90-Minuten Tour durch Probebühnen, Werkstätten und Kostümfundus.",
      "Mit Live-Probe-Einblick.",
      "Nur 12 Plätze pro Tour.",
    ],
    kategorie: "workshop",
    stimmung: ["kulturell", "intim", "kulturell"],
    startDatum: "2026-05-18",
    zeitStart: "14:00",
    ort: { name: "Opernhaus", stadtteil: "Kreis 1", lat: 47.365, lng: 8.547 },
    preis: { min: 28, einheit: "CHF", label: "CHF 28" },
    bilder: [IMG("1503095396549-807759245b35"), IMG("1542204165-65bf26472b9b"), IMG("1465847899084-d164df4dedc6")],
    anbieter: { name: "Opernhaus Zürich", verifikation: "wohnsitz" },
    flags: { indoor: true, reservation: true, kinderfreundlich: true, rollstuhl: true },
    cross: { tickets: 0, bars: 4, posts: 8, mitfahr: 0 },
    reihen: ["geheim"],
  },
  {
    id: "row-atelier-berger",
    slug: "atelier-anna-berger",
    titel: "Privat-Atelier Anna Berger",
    beschreibung: [
      "Die Malerin öffnet ihre Werkstatt für 6 Gäste.",
      "Mit Wein und Geschichten zu ihren Werken.",
      "Nur per Empfehlung.",
    ],
    kategorie: "vernissage",
    stimmung: ["intim", "kulturell", "ruhig"],
    startDatum: "2026-05-22",
    zeitStart: "19:00",
    ort: { name: "Atelier Kreis 4", stadtteil: "Kreis 4", lat: 47.376, lng: 8.527 },
    preis: { min: 45, einheit: "CHF", label: "CHF 45" },
    bilder: [IMG("1545987796-200677ee1011"), IMG("1452587925148-ce544e77e70d"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Anna Berger", verifikation: "member" },
    flags: { indoor: true, reservation: true, dateNight: true },
    cross: { tickets: 0, bars: 6, posts: 4, mitfahr: 0 },
    reihen: ["geheim", "date-night"],
  },
  {
    id: "row-kaeserei",
    slug: "kaeserei-besuch-werdinsel",
    titel: "Käserei-Besuch Werdinsel",
    beschreibung: [
      "Familie Frei zeigt ihre traditionelle Käserei.",
      "Mit Probier-Brett und Wein-Pairing.",
      "Hidden Spot — nur per Newsletter angekündigt.",
    ],
    kategorie: "workshop",
    stimmung: ["kulinarisch", "kulturell", "intim"],
    startDatum: "2026-05-30",
    zeitStart: "14:00",
    ort: { name: "Werdinsel Käserei", stadtteil: "Kreis 9", lat: 47.391, lng: 8.488 },
    preis: { min: 35, einheit: "CHF", label: "CHF 35" },
    bilder: [IMG("1488459716781-31db52582fe9"), IMG("1510812431401-41d2bd2722f3"), IMG("1547595628-c61a29f496f0")],
    anbieter: { name: "Käserei Frei", verifikation: "wohnsitz" },
    flags: { reservation: true, kinderfreundlich: true },
    cross: { tickets: 0, bars: 0, posts: 6, mitfahr: 4 },
    reihen: ["geheim"],
  },
  {
    id: "row-mineralien",
    slug: "mineralien-sammler-treff",
    titel: "Mineralien-Sammler Treff",
    beschreibung: [
      "Monatlicher Treffpunkt der Zürcher Mineralien-Sammler.",
      "Tauschen, zeigen, fachsimpeln.",
      "Gäste willkommen.",
    ],
    kategorie: "workshop",
    stimmung: ["ruhig", "kulturell", "intim"],
    startDatum: "2026-05-29",
    zeitStart: "19:00",
    ort: { name: "Restaurant Linde", stadtteil: "Kreis 6", lat: 47.391, lng: 8.55 },
    preis: { min: 0, einheit: "gratis", label: "Gratis" },
    bilder: [IMG("1487958449943-2429e8be8625"), IMG("1452587925148-ce544e77e70d"), IMG("1485518882345-15568b007407")],
    anbieter: { name: "Zürcher Mineralienfreunde", verifikation: "member" },
    flags: { gratis: true, indoor: true, spontan: true },
    cross: { tickets: 0, bars: 2, posts: 4, mitfahr: 2 },
    reihen: ["geheim", "kostenlos"],
  },
  {
    id: "row-wohnzimmer-konzert",
    slug: "wohnzimmer-konzert-kreis6",
    titel: "Privat-Konzert im Wohnzimmer",
    beschreibung: [
      "Streichquartett spielt in einer Privat-Wohnung im Kreis 6.",
      "20 Plätze, Wein und Häppchen inklusive.",
      "Anmeldung nur per Whatsapp-Liste.",
    ],
    kategorie: "konzert",
    stimmung: ["intim", "kulturell", "ruhig"],
    startDatum: "2026-05-24",
    zeitStart: "19:30",
    ort: { name: "Privat-Adresse Kreis 6", stadtteil: "Kreis 6", lat: 47.391, lng: 8.55 },
    preis: { min: 55, einheit: "CHF", label: "CHF 55" },
    bilder: [IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819"), IMG("1503095396549-807759245b35")],
    anbieter: { name: "Concert in Living Rooms", verifikation: "member" },
    flags: { indoor: true, reservation: true, dateNight: true },
    cross: { tickets: 0, bars: 4, posts: 8, mitfahr: 2 },
    reihen: ["geheim", "konzerte", "date-night"],
  },
  {
    id: "row-geheim-bar",
    slug: "geheim-bar-industrieviertel",
    titel: "Geheim-Bar Industrieviertel",
    beschreibung: [
      "Eine Bar ohne Schild, ohne Telefonnummer, ohne Insta.",
      "Anrufen, fragen, hoffen.",
      "Cocktails von Weltklasse.",
    ],
    kategorie: "popup",
    stimmung: ["intim", "abenteuerlich", "spontan"],
    startDatum: "2026-05-13",
    endDatum: "2026-12-31",
    zeitStart: "20:00",
    ort: { name: "Anonym", stadtteil: "Kreis 5", lat: 47.388, lng: 8.523 },
    preis: { min: 22, einheit: "CHF", label: "Drinks CHF 22+" },
    bilder: [IMG("1571266028243-d220c6a32ae1"), IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819")],
    anbieter: { name: "[Anonym]", verifikation: "member" },
    flags: { indoor: true, barDanach: true, spontan: true },
    cross: { tickets: 0, bars: 4, posts: 12, mitfahr: 0 },
    reihen: ["geheim"],
  },

  // ════════ Reihe 7: KOSTENLOS & GUT ════════
  {
    id: "row-lange-nacht-museen",
    slug: "lange-nacht-museen-2026",
    titel: "Lange Nacht der Zürcher Museen",
    beschreibung: [
      "40 Museen, eine Nacht, ein Ticket.",
      "Shuttle-Busse alle 15 Minuten.",
      "Bis 02:00 morgens geöffnet.",
    ],
    kategorie: "vernissage",
    stimmung: ["kulturell", "bunt", "spontan"],
    startDatum: "2026-09-05",
    zeitStart: "19:00",
    ort: { name: "40 Museen stadtweit", stadtteil: "Kreis 1", lat: 47.371, lng: 8.541 },
    preis: { min: 28, einheit: "CHF", label: "CHF 28 inkl. ÖV" },
    bilder: [IMG("1565060169187-5284a3956fde"), IMG("1452587925148-ce544e77e70d"), IMG("1545987796-200677ee1011")],
    anbieter: { name: "Stadt Zürich Kultur", verifikation: "wohnsitz" },
    flags: { reservation: true, kinderfreundlich: true, dateNight: true, rollstuhl: true },
    cross: { tickets: 48, bars: 24, posts: 86, mitfahr: 18 },
    reihen: ["kostenlos"],
  },
  {
    id: "row-lindenhof",
    slug: "lindenhof-sonnenuntergang",
    titel: "Lindenhof Sonnenuntergang",
    beschreibung: [
      "Der schönste kostenlose Spot der Stadt.",
      "Blick über Limmat und Grossmünster.",
      "Picknick mitbringen — Bänke gibt's.",
    ],
    kategorie: "popup",
    stimmung: ["ruhig", "romantisch", "spontan"],
    startDatum: "2026-05-13",
    endDatum: "2026-12-31",
    zeitStart: "20:30",
    ort: { name: "Lindenhof", stadtteil: "Kreis 1", lat: 47.373, lng: 8.541 },
    preis: { min: 0, einheit: "gratis", label: "Gratis" },
    bilder: [IMG("1502082553048-f009c37129b9"), IMG("1518709268805-4e9042af2176"), IMG("1481833761820-0509d3217039")],
    anbieter: { name: "Stadt Zürich", verifikation: "wohnsitz" },
    flags: { gratis: true, spontan: true, dateNight: true, kinderfreundlich: true, mitHund: true, rollstuhl: true },
    cross: { tickets: 0, bars: 28, posts: 124, mitfahr: 0 },
    reihen: ["kostenlos", "date-night"],
  },
  {
    id: "row-public-viewing-fcz",
    slug: "public-viewing-fcz-sechselaeuten",
    titel: "Public-Viewing FCZ",
    beschreibung: [
      "Public Viewing am Sechseläutenplatz.",
      "Mit Bratwurst-Stand und Bier-Garten.",
      "Eintritt frei.",
    ],
    kategorie: "sport",
    stimmung: ["ausgelassen", "spontan", "bunt"],
    startDatum: "2026-05-13",
    zeitStart: "20:30",
    ort: { name: "Sechseläutenplatz", stadtteil: "Kreis 1", lat: 47.366, lng: 8.546 },
    preis: { min: 0, einheit: "gratis", label: "Gratis · Bratwurst CHF 8" },
    bilder: [IMG("1551958219-acbc608c6377"), IMG("1517466787929-bc90951d0974"), IMG("1571019613454-1cb2f99b2d8b")],
    anbieter: { name: "Stadt Zürich", verifikation: "wohnsitz" },
    flags: { gratis: true, spontan: true, kinderfreundlich: true, mitHund: true, rollstuhl: true },
    cross: { tickets: 0, bars: 22, posts: 48, mitfahr: 0 },
    reihen: ["kostenlos"],
  },
  {
    id: "row-werdinsel-picknick",
    slug: "werdinsel-picknick-fruehling",
    titel: "Werdinsel Frühlings-Picknick",
    beschreibung: [
      "Die Werdinsel im Mai — Blüten, Wasser, Wiese.",
      "Public Grill auf Anfrage.",
      "Hunde im Sommer nicht erlaubt — im Frühling schon.",
    ],
    kategorie: "popup",
    stimmung: ["ruhig", "spontan", "kulinarisch"],
    startDatum: "2026-05-13",
    endDatum: "2026-06-30",
    zeitStart: "11:00",
    ort: { name: "Werdinsel", stadtteil: "Kreis 9", lat: 47.391, lng: 8.488 },
    preis: { min: 0, einheit: "gratis", label: "Gratis" },
    bilder: [IMG("1502082553048-f009c37129b9"), IMG("1559564484-e48eda6daa1f"), IMG("1488459716781-31db52582fe9")],
    anbieter: { name: "Stadt Zürich Grün", verifikation: "wohnsitz" },
    flags: { gratis: true, spontan: true, kinderfreundlich: true, mitHund: true, kinderwagen: true },
    cross: { tickets: 0, bars: 4, posts: 28, mitfahr: 0 },
    reihen: ["kostenlos", "familien"],
  },
  {
    id: "row-frauenbadi-tag",
    slug: "frauenbadi-tageskarte",
    titel: "Frauenbadi Tageskarte",
    beschreibung: [
      "Den ganzen Tag am Stadthausquai liegen.",
      "Nur für Frauen, FLINTA*, Kinder bis 7.",
      "Tradition seit 1837.",
    ],
    kategorie: "popup",
    stimmung: ["ruhig", "spontan"],
    startDatum: "2026-05-13",
    endDatum: "2026-09-30",
    zeitStart: "09:00",
    ort: { name: "Frauenbadi Stadthausquai", stadtteil: "Kreis 1", lat: 47.367, lng: 8.542 },
    preis: { min: 8, einheit: "CHF", label: "CHF 8" },
    bilder: [IMG("1559564484-e48eda6daa1f"), IMG("1502082553048-f009c37129b9"), IMG("1518709268805-4e9042af2176")],
    anbieter: { name: "Frauenbadi Zürich", verifikation: "wohnsitz" },
    flags: { spontan: true, kinderfreundlich: true },
    cross: { tickets: 0, bars: 18, posts: 32, mitfahr: 0 },
    reihen: ["kostenlos"],
  },
  {
    id: "row-tonhalle-openair",
    slug: "tonhalle-open-air",
    titel: "Open-Air Tonhalle Konzert",
    beschreibung: [
      "Tonhalle-Orchester spielt auf dem Münsterhof — gratis.",
      "Open-Air-Tradition jeden Mai.",
      "Picknick-Decken willkommen.",
    ],
    kategorie: "konzert",
    stimmung: ["kulturell", "romantisch", "ruhig"],
    startDatum: "2026-05-29",
    zeitStart: "20:00",
    ort: { name: "Münsterhof", stadtteil: "Kreis 1", lat: 47.371, lng: 8.542 },
    preis: { min: 0, einheit: "gratis", label: "Gratis" },
    bilder: [IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819"), IMG("1518709268805-4e9042af2176")],
    anbieter: { name: "Tonhalle-Gesellschaft", verifikation: "wohnsitz" },
    flags: { gratis: true, spontan: true, kinderfreundlich: true, mitHund: true, kinderwagen: true, rollstuhl: true },
    cross: { tickets: 0, bars: 24, posts: 38, mitfahr: 4 },
    reihen: ["kostenlos", "konzerte"],
  },
];

// ─────────────────────────────────────────────────────────────
// 24 KLASSIKER — Storytelling-Reise
// ─────────────────────────────────────────────────────────────

export type KlassikerMonat =
  | "Januar" | "Februar" | "März" | "April" | "Mai" | "Juni"
  | "Juli" | "August" | "September" | "Oktober" | "November" | "Dezember";

export interface Klassiker {
  id: string;
  slug: string;
  monat: KlassikerMonat;
  monatNum: number;
  datumLabel: string;
  titel: string;
  big?: boolean;
  bild: string;
  galerie: string[];
  reveal: string;
  /** stadt-spezifische geste / detail */
  geste: string;
  quotes: { author: string; district: string; text: string }[];
  linkedEventSlug?: string;
}

export const KLASSIKER: Klassiker[] = [
  // JANUAR
  {
    id: "k-zuericarneval",
    slug: "zuericarneval",
    monat: "Januar",
    monatNum: 1,
    datumLabel: "Januar · Drittes Wochenende",
    titel: "ZüriCarneval",
    bild: IMG("1583244532671-92ae48030d3b", 2400, 1400),
    galerie: [IMG("1583244532671-92ae48030d3b"), IMG("1485518882345-15568b007407"), IMG("1493244040629-496f6d136cc3")],
    reveal: "Der erste Konfetti-Sturm des Jahres. Während Basel noch schläft, beginnt in Zürich der Winter-Karneval mit Guggenmusik durch die Altstadt.",
    geste: "Wer im Niederdorf um 5 Uhr nachts noch eine Cervelat findet, gehört dazu.",
    quotes: [
      { author: "Marc", district: "Kreis 6", text: "Die Guggen sind laut, aber irgendwie liebt man's." },
      { author: "Tanja", district: "Kreis 4", text: "Mein Sohn hat mit 3 zum ersten Mal Konfetti gegessen. Tradition." },
    ],
  },
  // FEBRUAR
  {
    id: "k-albani",
    slug: "albani-streifzug",
    monat: "Februar",
    monatNum: 2,
    datumLabel: "Februar · Erstes Wochenende",
    titel: "Albani-Streifzug",
    bild: IMG("1542838132-92c53300491e", 2400, 1400),
    galerie: [IMG("1542838132-92c53300491e"), IMG("1543589077-47d81606c1bf"), IMG("1481833761820-0509d3217039")],
    reveal: "Mit Fackeln durch die Nacht von der Predigerkirche zum Lindenhof. Die kalte Februar-Luft riecht nach Wachs und Schnee.",
    geste: "Wer beim Lindenhof ankommt und nicht weint, fühlt nichts.",
    quotes: [
      { author: "Lena", district: "Kreis 1", text: "Mein Vater nimmt mich seit ich 4 bin mit. Heute nehme ich meine Tochter mit." },
    ],
  },
  {
    id: "k-fasnacht",
    slug: "fasnacht-abschluss",
    monat: "Februar",
    monatNum: 2,
    datumLabel: "Februar · Letzte Februar-Woche",
    titel: "ZüriCarneval Abschluss",
    bild: IMG("1485518882345-15568b007407", 2400, 1400),
    galerie: [IMG("1485518882345-15568b007407"), IMG("1583244532671-92ae48030d3b"), IMG("1493244040629-496f6d136cc3")],
    reveal: "Der grosse Umzug auf dem Münsterhof. 30 Guggen, ein Knall, der Winter ist gefühlt halb vorbei.",
    geste: "Wer um Mitternacht beim Monsterkonzert noch tanzt, hat den Winter besiegt.",
    quotes: [
      { author: "Pascal", district: "Kreis 5", text: "Die Konfetti, die im April noch in den Ritzen liegen — das beste Frühlingszeichen." },
    ],
  },
  // MÄRZ
  {
    id: "k-boeoegg-bau",
    slug: "boeoegg-bau",
    monat: "März",
    monatNum: 3,
    datumLabel: "März · Sechs Wochen vor Sechseläuten",
    titel: "Sechseläuten-Bööggbau",
    bild: IMG("1543589077-47d81606c1bf", 2400, 1400),
    galerie: [IMG("1543589077-47d81606c1bf"), IMG("1493244040629-496f6d136cc3"), IMG("1485518882345-15568b007407")],
    reveal: "Sechs Wochen in einer Werkstatt am Stadtrand. Watte, Pyrotechnik, ein zorniges Gesicht. Der Böögg ist eine Skulptur und eine Wette.",
    geste: "Wer den Bauer kennt, weiss: dieses Jahr brennt es schnell.",
    quotes: [
      { author: "Hans", district: "Kreis 6", text: "Ich besuche die Werkstatt jedes Jahr — das Beste an Sechseläuten." },
    ],
  },
  {
    id: "k-galerien-fruehling",
    slug: "fruehlings-galerie-saison",
    monat: "März",
    monatNum: 3,
    datumLabel: "März · Dritte Märzwoche",
    titel: "Frühlings-Galerie-Saison",
    bild: IMG("1545987796-200677ee1011", 2400, 1400),
    galerie: [IMG("1545987796-200677ee1011"), IMG("1452587925148-ce544e77e70d"), IMG("1485518882345-15568b007407")],
    reveal: "An einem Donnerstag öffnen 40 Galerien gleichzeitig ihre Türen. Apero an jedem Eingang.",
    geste: "Wer im Kreis 5 startet, ist um Mitternacht im Niederdorf.",
    quotes: [
      { author: "Mira", district: "Kreis 5", text: "Mein Lieblingsabend des Jahres — Kunst, Wein, Freunde." },
    ],
  },
  // APRIL — THE BIG ONE
  {
    id: "k-sechselaeuten",
    slug: "sechselaeuten",
    monat: "April",
    monatNum: 4,
    datumLabel: "April · Drittes Wochenende",
    titel: "Sechseläuten",
    big: true,
    bild: IMG("1543589077-47d81606c1bf", 2400, 1400),
    galerie: [IMG("1543589077-47d81606c1bf"), IMG("1493244040629-496f6d136cc3"), IMG("1502082553048-f009c37129b9"), IMG("1490750967868-88aa4486c946")],
    reveal: "Das Frühlingsfest der Zürcher Zünfte. Am Sonntag ziehen historische Trachten durch die Stadt, am Montag um 18:00 wird der Böögg verbrannt.",
    geste: "Wenn der Böögg in 7 Minuten explodiert, gibt es einen heissen Sommer. Bei 47 Minuten — nun, dann wird's halt regnerisch.",
    quotes: [
      { author: "Marc", district: "Kreis 6", text: "Wenn der Böögg brennt, weiss Zürich: der Sommer kommt schnell." },
      { author: "Anna", district: "Kreis 7", text: "Mein Highlight des Jahres. Punkt." },
      { author: "Tom", district: "Kreis 4", text: "Tradition pur — und das beste Bratwurst-Bier-Verhältnis der Stadt." },
    ],
  },
  // MAI
  {
    id: "k-frauenbadi",
    slug: "frauenbadi-saisonstart",
    monat: "Mai",
    monatNum: 5,
    datumLabel: "Mai · 1. Mai-Wochenende",
    titel: "Limmatschwimmen-Saisonstart",
    bild: IMG("1559564484-e48eda6daa1f", 2400, 1400),
    galerie: [IMG("1559564484-e48eda6daa1f"), IMG("1502082553048-f009c37129b9"), IMG("1518709268805-4e9042af2176")],
    reveal: "Die letzte Frauenbadi der Welt öffnet ihre Türen für die Saison. Seit 1837 streng exklusiv — und das schönste Bad der Stadt.",
    geste: "Wer im Mai schon ins Wasser springt, gilt als unverwundbar.",
    quotes: [
      { author: "Eva", district: "Kreis 1", text: "Hier habe ich meine besten Freundinnen gefunden." },
      { author: "Sofia", district: "Kreis 5", text: "12°C Wasser, 25°C Sonne — Zürcher Mai pur." },
    ],
    linkedEventSlug: "frauenbadi-saisonstart",
  },
  {
    id: "k-maibummel",
    slug: "maibummel-zvv",
    monat: "Mai",
    monatNum: 5,
    datumLabel: "Mai · Auffahrtswochenende",
    titel: "Maibummel ZVV",
    bild: IMG("1565514020179-026b92b84bb6", 2400, 1400),
    galerie: [IMG("1565514020179-026b92b84bb6"), IMG("1502082553048-f009c37129b9"), IMG("1481833761820-0509d3217039")],
    reveal: "Historische Trams fahren durch die Stadt. Mit Live-Musik, Bratwurst und der besten Aussicht aus dem 1928er-Wagen.",
    geste: "Wer auf dem Trittbrett mitfährt, hat Zürcher Glück.",
    quotes: [
      { author: "Reto", district: "Kreis 9", text: "Mein 4-jähriger Sohn redet seit drei Wochen davon." },
    ],
  },
  // JUNI
  {
    id: "k-pride",
    slug: "zurich-pride",
    monat: "Juni",
    monatNum: 6,
    datumLabel: "Juni · Erste Juni-Woche",
    titel: "Zurich Pride",
    big: true,
    bild: IMG("1591622434-d8e02d9d2eb1", 2400, 1400),
    galerie: [IMG("1591622434-d8e02d9d2eb1"), IMG("1492684223066-81342ee5ff30"), IMG("1530017742405-1900056d4c25")],
    reveal: "50'000 Menschen ziehen durch die Stadt. Regenbogen, Glitter, Tränen, Tanz.",
    geste: "Wer 1994 dabei war, erzählt es heute den Kindern. Damals waren es 600 — heute 50'000.",
    quotes: [
      { author: "Sarah", district: "Kreis 4", text: "Meine Mutter ist 2016 mit mir gegangen. Seitdem ich nicht mehr weine." },
      { author: "Lukas", district: "Kreis 5", text: "Best vibes der Welt. Und ja, ich bin straight." },
    ],
    linkedEventSlug: "zurich-pride-2026",
  },
  {
    id: "k-festspiele",
    slug: "festspiele-zuerich",
    monat: "Juni",
    monatNum: 6,
    datumLabel: "Juni · 1. Juni-Wochenende",
    titel: "Festspiele Zürich",
    bild: IMG("1503095396549-807759245b35", 2400, 1400),
    galerie: [IMG("1503095396549-807759245b35"), IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819")],
    reveal: "Drei Wochen Klassik, Theater, Tanz auf den Bühnen der Stadt. Die wichtigsten Häuser bündeln ihr Bestes.",
    geste: "Wer den Pass kauft, hat im Juni keine freien Abende mehr.",
    quotes: [
      { author: "Daniel", district: "Kreis 1", text: "Mein Juni-Festspiele-Pass ist heiliger als Weihnachten." },
    ],
  },
  // JULI
  {
    id: "k-caliente",
    slug: "caliente",
    monat: "Juli",
    monatNum: 7,
    datumLabel: "Juli · 2. Juli-Wochenende",
    titel: "Caliente Festival",
    big: true,
    bild: IMG("1429962714451-bb934ecdc4ec", 2400, 1400),
    galerie: [IMG("1429962714451-bb934ecdc4ec"), IMG("1493225457124-a3eb161ffa5f"), IMG("1518709268805-4e9042af2176")],
    reveal: "Drei Tage Latino-Sommer. Bürkliplatz wird zur Salsa-Strasse, Bellevue zur Reggaeton-Halle.",
    geste: "Wer am Sonntagabend noch tanzen kann, hat Zürcher Sommerbeine.",
    quotes: [
      { author: "Carmen", district: "Kreis 4", text: "Caliente ist mein Heimweh-Medikament." },
    ],
    linkedEventSlug: "caliente-festival",
  },
  {
    id: "k-oper-fuer-alle",
    slug: "oper-fuer-alle",
    monat: "Juli",
    monatNum: 7,
    datumLabel: "Juli · 3. Juli-Wochenende",
    titel: "Oper für alle",
    bild: IMG("1503095396549-807759245b35", 2400, 1400),
    galerie: [IMG("1503095396549-807759245b35"), IMG("1465847899084-d164df4dedc6")],
    reveal: "Live-Übertragung einer Premieren-Oper auf den Sechseläutenplatz. Picknick-Decken, Hunderte von Stühlen, Sommerluft.",
    geste: "Wer um 22:00 leise mitsingt, ist Zürcher:in.",
    quotes: [
      { author: "Mira", district: "Kreis 5", text: "Carmen unter Sternen — das beste, was ich je gehört habe." },
    ],
  },
  {
    id: "k-limmatschwimmen",
    slug: "limmatschwimmen",
    monat: "Juli",
    monatNum: 7,
    datumLabel: "Juli · Letztes Juli-Wochenende",
    titel: "Limmatschwimmen",
    bild: IMG("1559564484-e48eda6daa1f", 2400, 1400),
    galerie: [IMG("1559564484-e48eda6daa1f"), IMG("1502082553048-f009c37129b9"), IMG("1518709268805-4e9042af2176")],
    reveal: "5'000 Menschen treiben gemeinsam die Limmat hinunter. Kein Stress, nur Strömung, Sonne, Bratwurst am Ziel.",
    geste: "Wer die Beine ausstreckt und an die Wolken denkt, vergisst die Stadt.",
    quotes: [
      { author: "Tobi", district: "Kreis 5", text: "Treibst die Stadt entlang — kein Stress, nur Sonne." },
    ],
  },
  // AUGUST
  {
    id: "k-streetparade",
    slug: "streetparade",
    monat: "August",
    monatNum: 8,
    datumLabel: "August · Zweites Wochenende",
    titel: "Streetparade",
    big: true,
    bild: IMG("1518709268805-4e9042af2176", 2400, 1400),
    galerie: [IMG("1518709268805-4e9042af2176"), IMG("1571266028243-d220c6a32ae1"), IMG("1493225457124-a3eb161ffa5f"), IMG("1429962714451-bb934ecdc4ec")],
    reveal: "Eine Million Menschen, 30 Love-Mobiles, ein Beat. Zürich wird zur grössten Techno-Stadt der Welt.",
    geste: "Wer 14 Stunden tanzt und nichts isst, lebt von Atmosphäre.",
    quotes: [
      { author: "Yannick", district: "Kreis 4", text: "Einmal im Leben — und dann jedes Jahr wieder." },
      { author: "Lisa", district: "Kreis 5", text: "Sonnencreme, Wasser, Sneakers. Mehr Tipps?" },
      { author: "Daniel", district: "Kreis 8", text: "Ich tanze auf der Quaibrücke seit 2008." },
    ],
    linkedEventSlug: "streetparade-2026",
  },
  {
    id: "k-theater-spektakel",
    slug: "theater-spektakel",
    monat: "August",
    monatNum: 8,
    datumLabel: "August · Vier Wochen",
    titel: "Theater Spektakel",
    bild: IMG("1503095396549-807759245b35", 2400, 1400),
    galerie: [IMG("1503095396549-807759245b35"), IMG("1542204165-65bf26472b9b")],
    reveal: "Internationales Theater auf der Landiwiese. Spielstätten zwischen See und Wasser, Beizli mit Sicht aufs Wasser.",
    geste: "Wer zwischen den Vorstellungen am See sitzt und Wein trinkt, hat Zürcher Sommer-Liebe gefunden.",
    quotes: [
      { author: "Anna", district: "Kreis 2", text: "Jedes Jahr 4 Vorstellungen. Mein Sommer-Pflichtprogramm." },
    ],
  },
  // SEPTEMBER
  {
    id: "k-knabenschiessen",
    slug: "knabenschiessen",
    monat: "September",
    monatNum: 9,
    datumLabel: "September · Erstes Wochenende",
    titel: "Knabenschiessen",
    big: true,
    bild: IMG("1567361424669-87ed10985b80", 2400, 1400),
    galerie: [IMG("1567361424669-87ed10985b80"), IMG("1518709268805-4e9042af2176"), IMG("1493244040629-496f6d136cc3")],
    reveal: "Zürichs ältester Volksanlass seit 1656. Schiessen, Riesenrad, Magenbrot, halber Feiertag.",
    geste: "Wer das Magenbrot beim Stand neben dem Riesenrad kauft, kennt sich aus.",
    quotes: [
      { author: "Linda", district: "Kreis 3", text: "Magenbrot-Tasche und Riesenrad — das ist Herbst." },
      { author: "Reto", district: "Kreis 9", text: "Mein erstes Knabenschiessen mit Tochter — magisch." },
    ],
    linkedEventSlug: "knabenschiessen",
  },
  {
    id: "k-lange-nacht",
    slug: "lange-nacht-museen",
    monat: "September",
    monatNum: 9,
    datumLabel: "September · Erste Septemberwoche",
    titel: "Lange Nacht der Museen",
    bild: IMG("1565060169187-5284a3956fde", 2400, 1400),
    galerie: [IMG("1565060169187-5284a3956fde"), IMG("1452587925148-ce544e77e70d")],
    reveal: "40 Museen, eine Nacht, ein Ticket. Bis 02:00 Uhr — und Shuttle-Busse fahren bis 03:00.",
    geste: "Wer 12 Museen schafft, hat den Wettbewerb verloren. Wer 4 ehrlich erlebt, hat gewonnen.",
    quotes: [
      { author: "Tobi", district: "Kreis 7", text: "Mein Highlight: Kunsthaus um Mitternacht, fast leer." },
    ],
    linkedEventSlug: "lange-nacht-museen-2026",
  },
  {
    id: "k-zff",
    slug: "zurich-film-festival",
    monat: "September",
    monatNum: 9,
    datumLabel: "September · Letztes September-Wochenende",
    titel: "Zurich Film Festival",
    big: true,
    bild: IMG("1517604931442-7e0c8ed2963c", 2400, 1400),
    galerie: [IMG("1517604931442-7e0c8ed2963c"), IMG("1509316975850-ff9c5deb0cd9"), IMG("1485846234645-a62644f84728"), IMG("1542204165-65bf26472b9b")],
    reveal: "Elf Tage Film, 160 Premieren, grüner Teppich am Sechseläutenplatz. Stars kommen, Stadt feiert.",
    geste: "Wer um 1 Uhr morgens im Festival-Zelt einen Regisseur kennenlernt, hat ZFF richtig gemacht.",
    quotes: [
      { author: "Mira", district: "Kreis 5", text: "Filmpass-Pflicht. Tagsüber Kino, abends Apero." },
    ],
    linkedEventSlug: "zurich-film-festival",
  },
  // OKTOBER
  {
    id: "k-manifesta",
    slug: "manifesta",
    monat: "Oktober",
    monatNum: 10,
    datumLabel: "Oktober · Alle zwei Jahre",
    titel: "Manifesta",
    bild: IMG("1545987796-200677ee1011", 2400, 1400),
    galerie: [IMG("1545987796-200677ee1011"), IMG("1452587925148-ce544e77e70d"), IMG("1485518882345-15568b007407")],
    reveal: "Die europäische Kunstbiennale — alle zwei Jahre in einer anderen Stadt. 100 Tage Kunst, Diskurs, Aktion.",
    geste: "Wer alle Pavillons besucht, kennt die Stadt neu.",
    quotes: [
      { author: "Anna", district: "Kreis 5", text: "Manifesta hat mir Zürich neu gezeigt." },
    ],
  },
  {
    id: "k-tonhalle-saison",
    slug: "tonhalle-saison-auftakt",
    monat: "Oktober",
    monatNum: 10,
    datumLabel: "Oktober · Erste Oktoberwoche",
    titel: "Tonhalle Saison-Auftakt",
    bild: IMG("1465847899084-d164df4dedc6", 2400, 1400),
    galerie: [IMG("1465847899084-d164df4dedc6"), IMG("1514525253161-7a46d19cd819")],
    reveal: "Tonhalle-Orchester eröffnet die Konzert-Saison. Paavo Järvi, Mahler, ein voller Saal.",
    geste: "Wer das Saisons-Abo kauft, hat den Winter überstanden, bevor er beginnt.",
    quotes: [
      { author: "Mira", district: "Kreis 5", text: "Beste Akustik Europas — meine ehrliche Meinung." },
    ],
  },
  // NOVEMBER
  {
    id: "k-wienachtsdorf",
    slug: "wienachtsdorf",
    monat: "November",
    monatNum: 11,
    datumLabel: "November · 22. November",
    titel: "Wienachtsdorf am Bellevue",
    big: true,
    bild: IMG("1542838132-92c53300491e", 2400, 1400),
    galerie: [IMG("1542838132-92c53300491e"), IMG("1543589077-47d81606c1bf"), IMG("1481833761820-0509d3217039"), IMG("1607604276583-eef5d076aa5f")],
    reveal: "Der inoffizielle Beginn der Weihnachtszeit. Glühwein-Hütten, Lichter, der erste Schnee — vielleicht.",
    geste: "Erster Glühwein = Weihnachten beginnt offiziell. Das ist Zürcher Gesetz.",
    quotes: [
      { author: "Eva", district: "Kreis 6", text: "Erster Glühwein = Weihnachten beginnt offiziell." },
      { author: "Pascal", district: "Kreis 1", text: "Ich gehe nur wegen der Raclette-Hütte." },
    ],
    linkedEventSlug: "wienachtsdorf-bellevue",
  },
  {
    id: "k-helvetic-music",
    slug: "helvetic-music-festival",
    monat: "November",
    monatNum: 11,
    datumLabel: "November · Letztes November-Wochenende",
    titel: "Helvetic Music Festival",
    bild: IMG("1493225457124-a3eb161ffa5f", 2400, 1400),
    galerie: [IMG("1493225457124-a3eb161ffa5f"), IMG("1429962714451-bb934ecdc4ec")],
    reveal: "Indie aus der ganzen Schweiz für ein Wochenende in der Hardstrasse 219.",
    geste: "Wer eine Band entdeckt und sie auf Spotify findet, bevor jemand anders sie kennt, gewinnt.",
    quotes: [
      { author: "Sara", district: "Kreis 5", text: "Meine Lieblingsband ist hier 2022 entstanden." },
    ],
    linkedEventSlug: "helvetic-music-festival",
  },
  // DEZEMBER
  {
    id: "k-singing-tree",
    slug: "singing-christmas-tree",
    monat: "Dezember",
    monatNum: 12,
    datumLabel: "Dezember · Werdmühleplatz",
    titel: "Singing Christmas Tree",
    bild: IMG("1607604276583-eef5d076aa5f", 2400, 1400),
    galerie: [IMG("1607604276583-eef5d076aa5f"), IMG("1542838132-92c53300491e")],
    reveal: "Chöre singen aus einem 15m hohen Christbaum am Werdmühleplatz. Bahnhofstrasse hält für 20 Minuten an.",
    geste: "Wer leise mitsingt, hat Weihnachten erreicht.",
    quotes: [
      { author: "Nina", district: "Kreis 1", text: "Stehe jeden Dezember mal kurz dort und höre zu. Pure Weihnachten." },
    ],
  },
  {
    id: "k-silvester",
    slug: "silvesterzauber",
    monat: "Dezember",
    monatNum: 12,
    datumLabel: "Dezember · 31. Dezember",
    titel: "Silvesterzauber & Silvesterlauf",
    big: true,
    bild: IMG("1467810563316-b5476525c0f9", 2400, 1400),
    galerie: [IMG("1467810563316-b5476525c0f9"), IMG("1514849302-984523450cf4"), IMG("1542838132-92c53300491e"), IMG("1481833761820-0509d3217039")],
    reveal: "Feuerwerk über der Limmat, Bühnen am Quai, Tausende von Funken. Um 17 Uhr noch der Silvesterlauf durch das Niederdorf.",
    geste: "Wer um Mitternacht auf der Münsterbrücke steht, kann das Jahr wirklich beenden.",
    quotes: [
      { author: "Lukas", district: "Kreis 4", text: "Beste Sicht: Münsterbrücke. Vor 23:00 da sein." },
      { author: "Eva", district: "Kreis 6", text: "Mein Vater rannte den Silvesterlauf mit 70. Inspiration." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

export function parseISO(iso: string): Date {
  return new Date(iso + "T08:00:00+02:00");
}

export function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysBetween(aIso: string, bIso: string): number {
  return Math.round((parseISO(bIso).getTime() - parseISO(aIso).getTime()) / 86400000);
}

export function isEventActiveOn(e: EventX, iso: string): boolean {
  const end = e.endDatum ?? e.startDatum;
  return iso >= e.startDatum && iso <= end;
}

export function formatDateRange(e: EventX): string {
  const start = parseISO(e.startDatum);
  const end = e.endDatum ? parseISO(e.endDatum) : start;
  const M = ["Jan", "Feb", "März", "April", "Mai", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dez"];
  if (e.startDatum === (e.endDatum ?? e.startDatum)) {
    const W = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    return `${W[start.getDay()]}, ${start.getDate()}. ${M[start.getMonth()]}`;
  }
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}.–${end.getDate()}. ${M[start.getMonth()]}`;
  }
  return `${start.getDate()}. ${M[start.getMonth()]} – ${end.getDate()}. ${M[end.getMonth()]}`;
}

export const HERO_SLIDES = EVENTS.filter((e) => e.heroOrder).sort(
  (a, b) => (a.heroOrder ?? 99) - (b.heroOrder ?? 99),
);

export const BENTO_PICKS = EVENTS.filter((e) => e.editorialPick).slice(0, 6);

export function eventsInRow(row: string): EventX[] {
  return EVENTS.filter((e) => e.reihen?.includes(row));
}

export function findEventBySlug(slug: string): EventX | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export function findKlassikerBySlug(slug: string): Klassiker | undefined {
  return KLASSIKER.find((k) => k.slug === slug);
}

export const QUICK_CHIPS = [
  { key: "gratis", label: "Gratis", flag: "gratis" as const },
  { key: "indoor", label: "Indoor (Regen)", flag: "indoor" as const },
  { key: "kinderfreundlich", label: "Kinderfreundlich", flag: "kinderfreundlich" as const },
  { key: "barDanach", label: "Bar danach", flag: "barDanach" as const },
  { key: "reservation", label: "Reservation nötig", flag: "reservation" as const },
  { key: "spontan", label: "Heute spontan möglich", flag: "spontan" as const },
  { key: "dateNight", label: "Date Night", flag: "dateNight" as const },
  { key: "mitHund", label: "Mit Hund", flag: "mitHund" as const },
];

export const HORIZONTAL_ROWS = [
  { key: "heute-abend", title: "Heute Abend", subtitle: "Was heute noch geht" },
  { key: "premium-weekend", title: "Premium dieses Wochenende", subtitle: "Die feineren Adressen" },
  { key: "konzerte", title: "Konzerte & Live-Musik", subtitle: "Klassik, Jazz, Indie, Techno" },
  { key: "familien", title: "Familien-Highlights", subtitle: "Mit Kindern, ohne Stress" },
  { key: "date-night", title: "Date Night Ideen", subtitle: "Für die zweite, dritte, hundertste" },
  { key: "geheim", title: "Verborgenes Zürich", subtitle: "Insider-Wissen, kein Touristen-Tipp" },
  { key: "kostenlos", title: "Kostenlos & gut", subtitle: "Beste gratis Spots der Woche" },
];

export const EDITORIAL_STORIES = [
  {
    id: "story-boeoegg",
    slug: "wie-der-boeoegg-gebaut-wird",
    titel: "Wie der Böögg gebaut wird",
    excerpt: "Sechs Wochen Vorbereitung für 12 Minuten Feuer.",
    bild: IMG("1543589077-47d81606c1bf"),
    autor: "Anna Bertschi",
    minutes: 8,
    body: [
      "Es ist Mitte März, draussen schneit es noch, und in einer Werkstatt am Stadtrand riecht es nach Watte, Holzleim und Schwarzpulver.",
      "Hier baut Lorenz Sennhauser seinen 17. Böögg. Der vergangene brauchte 47 Minuten zum Brennen — ein verregneter Sommer.",
      "Sechs Wochen Arbeit für 12 Minuten Feuer. Manchmal weniger. «Das ist Sechseläuten.»",
    ],
  },
  {
    id: "story-streetparade",
    slug: "warum-streetparade-die-welt-bedeutet",
    titel: "Warum die Streetparade die Welt bedeutet",
    excerpt: "Drei Generationen DJs, ein gemeinsamer Beat.",
    bild: IMG("1571266028243-d220c6a32ae1"),
    autor: "Yannick Stoll",
    minutes: 12,
    body: [
      "1992: 600 Tanzende auf dem Limmatquai. Eine Demo für Liebe, Frieden, Freiheit.",
      "2026: Eine Million Menschen, 30 Love Mobiles, ein Beat.",
      "Wie ein Wochenende eine Stadt formt — und drei Generationen DJs prägt.",
    ],
  },
  {
    id: "story-frauenbadi",
    slug: "letzte-frauenbadi-der-welt",
    titel: "Die letzte Frauenbadi der Welt",
    excerpt: "Seit 1837 — und immer noch streng exklusiv.",
    bild: IMG("1559564484-e48eda6daa1f"),
    autor: "Lena Schmid",
    minutes: 6,
    body: [
      "Mitten in Zürich, mitten in der Limmat, mitten zwischen Männerbüros: eine Insel nur für Frauen.",
      "Die letzte ihrer Art weltweit. Eintritt für FLINTA*, Kinder bis 7. Männer dürfen nicht mal vorbeischwimmen.",
      "Warum 2026 ein 1837er Konzept noch Sinn macht — drei Frauen erzählen.",
    ],
  },
  {
    id: "story-niederdoerfli",
    slug: "geheimnisse-des-niederdoerflis",
    titel: "Die Geheimnisse des Niederdörflis",
    excerpt: "Acht Bars, fünf Geschichten, eine Nacht.",
    bild: IMG("1502082553048-f009c37129b9"),
    autor: "Daniel Bürki",
    minutes: 14,
    body: [
      "Es beginnt um 21:00 vor dem Grossmünster und endet um 04:00 hinter dem Niederdorf.",
      "Acht Bars, von denen vier kein Schild haben. Fünf Geschichten, von denen drei nie aufgeschrieben werden.",
      "Ein Nacht-Spaziergang mit jemandem, der seit 30 Jahren das Niederdörfli kennt.",
    ],
  },
];

export const STIMMUNGEN: Stimmung[] = [
  "romantisch",
  "abenteuerlich",
  "ruhig",
  "bunt",
  "intim",
  "ausgelassen",
  "kulturell",
  "koerperlich",
  "kulinarisch",
  "spontan",
];

export const KATEGORIEN: Kategorie[] = [
  "konzert",
  "theater",
  "vernissage",
  "popup",
  "workshop",
  "sport",
  "festival",
  "kulinarisch",
];
