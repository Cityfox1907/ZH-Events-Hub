// ─────────────────────────────────────────────────────────────
// HUB — Domänenmodul für den Zürich-Hub (Community-Forum)
// Communities, Beiträge und Helfer für /hub und /communities.
// Alle Daten sind deterministisch (kein Math.random), damit es
// ohne Backend keinen Hydration-Mismatch gibt.
// ─────────────────────────────────────────────────────────────

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

export interface HubCommunity {
  slug: string;
  /** Anzeigename mit Präfix, z.B. "z/zuerich" */
  name: string;
  emoji: string;
  /** Kurzbeschreibung für Listen */
  tagline: string;
  /** Lange Beschreibung für die Community-Seite */
  description: string;
  category: string;
  members: number;
  online: number;
  /** Gründungsdatum, z.B. "März 2024" */
  founded: string;
  /** Nutzer, der die Community gegründet hat */
  founder: string;
  /** Akzentfarbe für Banner & Icon */
  color: string;
  rules: string[];
}

export interface HubPost {
  id: string;
  community: string;
  author: string;
  /** Alter des Beitrags in Minuten (für Sortierung "Neu") */
  minutesAgo: number;
  title: string;
  body?: string;
  image?: string;
  upvotes: number;
  comments: number;
  flair?: string;
  pinned?: boolean;
}

export const HUB_COMMUNITIES: HubCommunity[] = [
  {
    slug: "zuerich",
    name: "z/zuerich",
    emoji: "🦁",
    tagline: "Das Original — alles, was Zürich bewegt.",
    description:
      "Die grösste Community im Hub: Fragen, Fundstücke, Diskussionen und Alltägliches aus allen zwölf Kreisen. Wenn du nicht weisst, wohin mit deinem Beitrag — hierhin.",
    category: "Stadtleben",
    members: 48200,
    online: 1243,
    founded: "März 2024",
    founder: "u/StadtfuchsZH",
    color: "#0f4da8",
    rules: [
      "Bleib freundlich — wir sind alle Nachbarn.",
      "Zürich-Bezug ist Pflicht.",
      "Keine Werbung ohne Mod-Freigabe.",
      "Suchanfragen zuerst über die Suche prüfen.",
    ],
  },
  {
    slug: "kreis4",
    name: "z/kreis4",
    emoji: "🌃",
    tagline: "Chreis Cheib: Langstrasse, Kultur & Quartierleben.",
    description:
      "Das Quartier-Forum für den Kreis 4 — von der Bäckeranlage bis zur Langstrasse. Quartier-News, Gastro-Tipps und ehrliche Diskussionen.",
    category: "Quartiere",
    members: 12300,
    online: 312,
    founded: "April 2024",
    founder: "u/LangstrassenLeo",
    color: "#a8326e",
    rules: [
      "Quartier-Bezug Kreis 4.",
      "Keine Vermieter-Inserate, dafür gibt es z/wohnenzh.",
      "Respekt gegenüber allen, die hier leben.",
    ],
  },
  {
    slug: "kreis5",
    name: "z/kreis5",
    emoji: "🏗️",
    tagline: "Industriequartier, Viadukt, Josefwiese.",
    description:
      "Alles aus dem Kreis 5: Neueröffnungen im Viadukt, Josefwiese-Treffen, Baustellen-Updates und Quartier-Flohmis.",
    category: "Quartiere",
    members: 9800,
    online: 187,
    founded: "April 2024",
    founder: "u/SaraVomKreis5",
    color: "#b4541c",
    rules: [
      "Quartier-Bezug Kreis 5.",
      "Fundsachen bitte mit Ort und Zeit posten.",
      "Keine Lärmklagen-Threads nach 22 Uhr — Ironie erlaubt.",
    ],
  },
  {
    slug: "wohnenzh",
    name: "z/wohnenzh",
    emoji: "🏠",
    tagline: "Wohnungssuche, WG-Leben und Mietrecht in Zürich.",
    description:
      "Die Selbsthilfegruppe für den Zürcher Wohnungsmarkt: Besichtigungs-Erfahrungen, WG-Suche, Mietrecht-Fragen und gegenseitige Unterstützung.",
    category: "Wohnen",
    members: 21500,
    online: 654,
    founded: "März 2024",
    founder: "u/AnnaUrbanist",
    color: "#1c7a4d",
    rules: [
      "Keine Fake-Inserate — Verstoss führt zum Bann.",
      "Adressen erst nach Zusage teilen.",
      "Erfahrungsberichte sind Gold: teile deine.",
    ],
  },
  {
    slug: "zvv",
    name: "z/zvv",
    emoji: "🚋",
    tagline: "ÖV-Updates, Störungen und Tram-Spotting.",
    description:
      "Von der Störung auf der Linie 13 bis zur Liebeserklärung ans Cobra-Tram: Die Community für alle, die Zürich auf Schienen und Rädern unterwegs sind.",
    category: "Mobilität",
    members: 15400,
    online: 421,
    founded: "Mai 2024",
    founder: "u/TramSpotterZH",
    color: "#2563ab",
    rules: [
      "Störungsmeldungen mit Linie und Zeit.",
      "Keine Fahrausweis-Diskussionen ohne Quellen.",
      "Tram-Fotos sind immer willkommen.",
    ],
  },
  {
    slug: "fcz",
    name: "z/fcz",
    emoji: "⚽",
    tagline: "Matchdays, Letzigrund & Südkurve.",
    description:
      "Für alle, deren Herz blau-weiss schlägt: Spieltage, Transfergerüchte, Tickets und die ewige Frage nach dem Stadion.",
    category: "Sport",
    members: 8900,
    online: 298,
    founded: "Juni 2024",
    founder: "u/Letzigrund1925",
    color: "#11337d",
    rules: [
      "Rivalität ja, Hass nein.",
      "Ticketverkauf nur zum Originalpreis.",
      "Spoiler-Tags an Spieltagen verwenden.",
    ],
  },
  {
    slug: "foodzh",
    name: "z/foodzh",
    emoji: "🍜",
    tagline: "Restaurants, Take-aways und Geheimtipps.",
    description:
      "Wo gibt es die beste Pizza der Stadt? Wer kennt ein gutes Mittagsmenü unter 20 Stutz? Die Food-Community testet, empfiehlt und streitet liebevoll.",
    category: "Essen & Trinken",
    members: 19700,
    online: 538,
    founded: "März 2024",
    founder: "u/GelatoQueen",
    color: "#b8860b",
    rules: [
      "Eigene Fotos > Stockfotos.",
      "Preis und Quartier immer angeben.",
      "Kein Bashing kleiner Betriebe — konstruktiv bleiben.",
    ],
  },
  {
    slug: "velozh",
    name: "z/velozh",
    emoji: "🚲",
    tagline: "Velowege, Touren und Werkstatt-Tipps.",
    description:
      "Die Community für alle auf zwei Rädern: neue Velorouten, Pannenhilfe, Touren-Verabredungen und Velobörsen-Funde.",
    category: "Freizeit",
    members: 7200,
    online: 142,
    founded: "Juli 2024",
    founder: "u/LisaVeloKurier",
    color: "#3a7d2c",
    rules: [
      "Routen mit Karte oder GPX teilen.",
      "Gestohlene Velos mit Rahmennummer melden.",
      "Helm-Diskussionen bitte sachlich.",
    ],
  },
  {
    slug: "ausgangzh",
    name: "z/ausgangzh",
    emoji: "🎶",
    tagline: "Clubs, Bars, Konzerte — was geht heute Abend?",
    description:
      "Der Plan für die Nacht: Line-ups, Gästelisten-Tipps, Bar-Neueröffnungen und die Frage aller Fragen — wohin am Samstag?",
    category: "Nachtleben",
    members: 11600,
    online: 387,
    founded: "Mai 2024",
    founder: "u/NachtschichtZH",
    color: "#6d28a8",
    rules: [
      "Event-Posts mit Datum und Ort.",
      "Keine Promoter-Spam-Serien.",
      "Was im Club passiert, bleibt im Club — keine Fotos ohne Einwilligung.",
    ],
  },
  {
    slug: "expatszurich",
    name: "z/expatszurich",
    emoji: "🌍",
    tagline: "English-speaking community for new Zurichers.",
    description:
      "Moving to Zurich? Already here and confused by Kehrichtgebühren? This is the English-speaking corner of the Hub — visa questions, apartment hunting, making friends.",
    category: "International",
    members: 16800,
    online: 476,
    founded: "April 2024",
    founder: "u/SarahExpatZH",
    color: "#0d7a8a",
    rules: [
      "English is the lingua franca, German practice welcome.",
      "Search before asking visa basics.",
      "Be kind — everyone was new once.",
    ],
  },
  {
    slug: "badizh",
    name: "z/badizh",
    emoji: "🏊",
    tagline: "Badis, Seeufer und Flussschwimmen.",
    description:
      "Wassertemperaturen, Badi-Reviews, Limmat-Schwumm-Treffen und der ewige Streit: Oberer oder Unterer Letten?",
    category: "Freizeit",
    members: 9400,
    online: 213,
    founded: "Juni 2024",
    founder: "u/LimmatNixe",
    color: "#0e7490",
    rules: [
      "Wassertemperatur mit Datum posten.",
      "Keine Drohnen-Aufnahmen über Badis.",
      "Abfall mitnehmen — auch im Forum gilt Badi-Knigge.",
    ],
  },
  {
    slug: "flohmarktzh",
    name: "z/flohmarktzh",
    emoji: "📦",
    tagline: "Flohmis, Brockis und Second-Hand-Funde.",
    description:
      "Kanzlei-Flohmarkt-Funde, Brocki-Geheimtipps und Verschenk-Aktionen aus der Nachbarschaft. Nachhaltiger geht Shopping nicht.",
    category: "Markt",
    members: 5100,
    online: 98,
    founded: "August 2024",
    founder: "u/BrockiBarbara",
    color: "#92400e",
    rules: [
      "Funde mit Preis und Fundort posten.",
      "Kein gewerblicher Weiterverkauf.",
      "Verschenk-Posts bekommen den Flair 'Gratis'.",
    ],
  },
  {
    slug: "zhpolitik",
    name: "z/zhpolitik",
    emoji: "🏛️",
    tagline: "Abstimmungen, Gemeinderat und Stadtentwicklung.",
    description:
      "Sachlich streiten über das, was die Stadt verändert: Abstimmungsvorlagen, Verkehrsberuhigung, Wohnbaupolitik und Gemeinderats-Geschäfte.",
    category: "Politik",
    members: 6700,
    online: 154,
    founded: "Mai 2024",
    founder: "u/AgoraZuerich",
    color: "#475569",
    rules: [
      "Quellen verlinken, Behauptungen belegen.",
      "Argumente angreifen, nie Personen.",
      "Abstimmungs-Threads werden von Mods moderiert.",
    ],
  },
  {
    slug: "studierenzh",
    name: "z/studierenzh",
    emoji: "🎓",
    tagline: "UZH, ETH & ZHdK — Studi-Leben in Zürich.",
    description:
      "Lerngruppen, Mensa-Rankings, Prüfungsphasen-Support und die Suche nach dem bezahlbaren WG-Zimmer. Von Studis für Studis.",
    category: "Bildung",
    members: 13200,
    online: 502,
    founded: "September 2024",
    founder: "u/PolyterrassePhil",
    color: "#1e6091",
    rules: [
      "Keine Prüfungsleaks — Ehrenkodex gilt.",
      "Mensa-Fotos ausdrücklich erwünscht.",
      "Hochschul-Bashing nur mit Humor.",
    ],
  },
];

export const HUB_POSTS: HubPost[] = [
  {
    id: "hub-limmat-temp",
    community: "badizh",
    author: "u/LimmatNixe",
    minutesAgo: 35,
    title: "Limmat heute 21.4° — der Sommer ist offiziell eröffnet 🌞",
    body: "Heute Morgen um 7 Uhr beim Oberen Letten gemessen. Strömung angenehm, kaum Betrieb. Wer kommt morgen zum Feierabend-Schwumm um 18 Uhr?",
    upvotes: 482,
    comments: 67,
    flair: "Wassertemperatur",
  },
  {
    id: "hub-wohnung-besichtigung",
    community: "wohnenzh",
    author: "u/WGSucherin",
    minutesAgo: 90,
    title: "87 Personen an einer Besichtigung im Kreis 3 — können wir kurz darüber reden?",
    body: "3.5 Zimmer, 2480.– im Monat, und die Schlange ging einmal ums Haus. Der Verwalter hat Nummern verteilt wie am Schalter. Wie sind eure Strategien, um überhaupt noch in die engere Auswahl zu kommen?",
    upvotes: 1247,
    comments: 312,
    flair: "Wohnungsmarkt",
  },
  {
    id: "hub-tram-cobra",
    community: "zvv",
    author: "u/TramSpotterZH",
    minutesAgo: 150,
    title: "Das letzte Tram 2000 auf der Linie 11 — heute Abend Abschiedsfahrt",
    body: "Ab 19:03 ab Bürkliplatz. Wer noch einmal das Originalgefühl mit offenen Fenstern will: heute ist die letzte Chance. Ich bin mit der Kamera dabei.",
    image: UNSPLASH("photo-1511192336575-5a79af67a629"),
    upvotes: 856,
    comments: 124,
    flair: "Tram-Spotting",
  },
  {
    id: "hub-pizza-ranking",
    community: "foodzh",
    author: "u/GelatoQueen",
    minutesAgo: 240,
    title: "Ich habe 14 Pizzerien in Zürich getestet — hier ist mein ehrliches Ranking",
    body: "Drei Monate, 14 Margheritas, ein klarer Sieger im Kreis 4 und eine grosse Enttäuschung an bester Seelage. Kriterien: Teig, Sauce, Preis-Leistung. Details im Thread.",
    image: UNSPLASH("photo-1574391884720-bbc049ec09ad"),
    upvotes: 2103,
    comments: 489,
    flair: "Review",
  },
  {
    id: "hub-josefwiese-flohmi",
    community: "kreis5",
    author: "u/SaraVomKreis5",
    minutesAgo: 320,
    title: "Quartier-Flohmi auf der Josefwiese am Samstag — Standanmeldung offen",
    body: "Der Sommer-Flohmi steht an: Samstag 10–17 Uhr, Stand kostenlos für alle aus dem Quartier. Anmeldung wie immer über das Quartierbüro. Kuchenstand gesucht!",
    upvotes: 324,
    comments: 41,
    flair: "Quartier-Event",
    pinned: true,
  },
  {
    id: "hub-fcz-derby",
    community: "fcz",
    author: "u/Letzigrund1925",
    minutesAgo: 400,
    title: "Derby-Tickets: Südkurve ausverkauft, Resttickets Sektor D ab Montag",
    body: "Offizielle Info vom Club: Der freie Verkauf startet Montag 10 Uhr. Bitte denkt an die Regel hier — Weiterverkauf nur zum Originalpreis.",
    upvotes: 412,
    comments: 88,
    flair: "Tickets",
  },
  {
    id: "hub-velo-route",
    community: "velozh",
    author: "u/LisaVeloKurier",
    minutesAgo: 510,
    title: "Neue Veloroute Altstetten–Oerlikon im Test: 24 Minuten, null Stress",
    body: "Bin die neue Verbindung über die Europabrücke gefahren. Durchgehend markiert, zwei kritische Stellen beim Bahnhof Altstetten. GPX im ersten Kommentar.",
    upvotes: 267,
    comments: 53,
    flair: "Route",
  },
  {
    id: "hub-expat-kehricht",
    community: "expatszurich",
    author: "u/NewInZurich22",
    minutesAgo: 620,
    title: "TIL: The blue garbage bags are not optional and yes, your neighbours noticed",
    body: "Three weeks in Zurich and I just got the friendliest, most passive-aggressive note about my non-Züri-Sack garbage. Lesson learned. What other unwritten rules should newcomers know?",
    upvotes: 1893,
    comments: 421,
    flair: "Culture Shock",
  },
  {
    id: "hub-langstrasse-cafe",
    community: "kreis4",
    author: "u/LangstrassenLeo",
    minutesAgo: 760,
    title: "Das neue Café an der Bäckeranlage — endlich wieder ein Ort ohne Konsumzwang-Vibes",
    body: "Seit letzter Woche offen, Kaffee 4.50, niemand schaut dich schräg an, wenn du zwei Stunden mit dem Laptop bleibst. Genau das hat dem Quartier gefehlt.",
    image: UNSPLASH("photo-1559339352-11d035aa65de"),
    upvotes: 534,
    comments: 97,
    flair: "Neueröffnung",
  },
  {
    id: "hub-ausgang-samstag",
    community: "ausgangzh",
    author: "u/NachtschichtZH",
    minutesAgo: 880,
    title: "Sammelthread: Wohin am Samstag? (Woche 24)",
    body: "Der wöchentliche Thread. Postet eure Pläne, Line-ups und Gästelisten-Tipps. Geheimtipp der Woche bekommt wie immer den Flair.",
    upvotes: 189,
    comments: 76,
    flair: "Sammelthread",
    pinned: true,
  },
  {
    id: "hub-politik-velorouten",
    community: "zhpolitik",
    author: "u/AgoraZuerich",
    minutesAgo: 1020,
    title: "Gemeinderat sagt Ja zu 50 km neuen Velovorzugsrouten — die Übersicht",
    body: "Gestern beschlossen: Ausbau bis 2030, Priorität auf Seebahnstrasse und Limmattalstrasse. Hier die Karte und was das für die Quartiere bedeutet. Quellen im Post.",
    upvotes: 678,
    comments: 234,
    flair: "Gemeinderat",
  },
  {
    id: "hub-studi-mensa",
    community: "studierenzh",
    author: "u/PolyterrassePhil",
    minutesAgo: 1240,
    title: "Das definitive Mensa-Ranking ETH vs. UZH, Frühlingssemester-Edition",
    body: "60 Mittagessen, beide Hochschulen, eine Tabelle. Überraschung auf Platz 1 und ja, die Polymensa hat sich gefangen. Flame-War im Kommentarbereich erwünscht (freundlich).",
    upvotes: 945,
    comments: 287,
    flair: "Ranking",
  },
  {
    id: "hub-brocki-fund",
    community: "flohmarktzh",
    author: "u/BrockiBarbara",
    minutesAgo: 1500,
    title: "Heutiger Fund: USM-Haller-Regal für 80 Stutz im Brocki Hardbrücke",
    body: "Manchmal belohnt das Brocki-Universum die Geduldigen. Zustand fast neuwertig, nur eine Schraube fehlt. Der Beweis als Foto.",
    image: UNSPLASH("photo-1488459716781-31db52582fe9"),
    upvotes: 1456,
    comments: 178,
    flair: "Fund des Tages",
  },
  {
    id: "hub-zuerich-nebel",
    community: "zuerich",
    author: "u/StadtfuchsZH",
    minutesAgo: 1750,
    title: "Der Uetliberg über dem Nebelmeer heute Morgen — darum lohnt sich das Frühaufstehen",
    body: "6:40 Uhr, Üetliberg-Bahn fast leer, oben dann das hier. Zürich, du kannst was.",
    image: UNSPLASH("photo-1519683109079-d5f539e1542f"),
    upvotes: 3241,
    comments: 156,
    flair: "Foto",
  },
  {
    id: "hub-zuerich-frage",
    community: "zuerich",
    author: "u/QuartierQueen",
    minutesAgo: 2100,
    title: "Was ist euer unterschätztester Ort in Zürich, den Touristen nie finden?",
    body: "Ich fange an: der Friedhof Sihlfeld als Park. Riesig, ruhig, wunderschöne alte Bäume — und kaum jemand nutzt ihn als Spazierort.",
    upvotes: 1678,
    comments: 534,
    flair: "Diskussion",
  },
  {
    id: "hub-expat-friends",
    community: "expatszurich",
    author: "u/SarahExpatZH",
    minutesAgo: 2600,
    title: "Monthly meetup #14: Thursday at Josefwiese — 40+ people last time!",
    body: "The casual after-work meetup continues. No agenda, no networking pressure, just people. Look for the blue balloon. Newcomers especially welcome.",
    upvotes: 423,
    comments: 92,
    flair: "Meetup",
  },
  {
    id: "hub-zvv-nachtnetz",
    community: "zvv",
    author: "u/NachtbusNina",
    minutesAgo: 3100,
    title: "PSA: Das Nachtnetz fährt ab Dezember neu auch Donnerstag — offiziell bestätigt",
    body: "Der ZVV hat es heute kommuniziert: Nachtzuschlag bleibt, dafür drei neue N-Linien Richtung Affoltern und Schwamendingen. Für alle Donnerstags-Ausgänger ein Gamechanger.",
    upvotes: 734,
    comments: 119,
    flair: "News",
  },
];

// ── Helfer ───────────────────────────────────────────────────

export function getCommunity(slug: string): HubCommunity | undefined {
  return HUB_COMMUNITIES.find((c) => c.slug === slug);
}

export function postsForCommunity(slug: string): HubPost[] {
  return HUB_POSTS.filter((p) => p.community === slug);
}

/** 48200 → "48,2 K" */
export function formatMembers(n: number): string {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(".", ",")} Mio`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".", ",")} K`;
  return String(n);
}

/** 35 → "vor 35 Min", 240 → "vor 4 Std", 3100 → "vor 2 Tagen" */
export function hubTime(minutesAgo: number): string {
  if (minutesAgo < 60) return `vor ${minutesAgo} Min`;
  if (minutesAgo < 60 * 24) return `vor ${Math.round(minutesAgo / 60)} Std`;
  const days = Math.round(minutesAgo / (60 * 24));
  return days === 1 ? "vor 1 Tag" : `vor ${days} Tagen`;
}

/** "Hot"-Score: Upvotes gewichtet gegen das Alter (Reddit-artig). */
export function hotScore(post: HubPost): number {
  return (post.upvotes + post.comments * 2) / Math.pow(post.minutesAgo + 120, 1.2);
}

// Standardmässig "beigetretene" Communities des Demo-Nutzers
export const DEFAULT_JOINED = ["zuerich", "kreis5", "foodzh", "zvv"];

const JOINED_KEY = "zt:hub-joined";
const JOINED_EVENT = "zt:hub-joined-change";

export function readJoined(): string[] {
  if (typeof window === "undefined") return DEFAULT_JOINED;
  try {
    const raw = window.localStorage.getItem(JOINED_KEY);
    if (!raw) return DEFAULT_JOINED;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : DEFAULT_JOINED;
  } catch {
    return DEFAULT_JOINED;
  }
}

export function toggleJoined(slug: string): string[] {
  const current = readJoined();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  try {
    window.localStorage.setItem(JOINED_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(JOINED_EVENT));
  } catch {
    /* ignore */
  }
  return next;
}

export function onJoinedChange(handler: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(JOINED_EVENT, handler);
  return () => window.removeEventListener(JOINED_EVENT, handler);
}
