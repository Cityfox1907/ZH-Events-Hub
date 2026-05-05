import type { EventPhoto, Review, ZhEvent } from "./types";
import { buildEventSlug } from "./slug";

/**
 * Reference "now" for seeded data. The whole prototype assumes today is
 * Sonntag, 17. Mai 2026. We freeze this instead of using Date.now()
 * so the seed dataset stays meaningful across reloads.
 */
export const REFERENCE_NOW_ISO = "2026-05-17T19:00:00";

function makeId(slug: string): string {
  return `seed-${slug}`;
}

interface SeedDraft {
  title: string;
  subtitle?: string;
  category: ZhEvent["category"];
  size: ZhEvent["size"];
  startDateTime: string;
  endDateTime?: string;
  venue: string;
  neighborhood: string;
  description: string;
  priceFromChf?: number;
  ticketUrl?: string;
  tags: string[];
}

function build(draft: SeedDraft): ZhEvent {
  const slug = buildEventSlug(draft.title, draft.startDateTime);
  return {
    id: makeId(slug),
    slug,
    source: "seed",
    createdAt: "2026-04-01T08:00:00",
    ...draft,
  };
}

export const SEED_EVENTS: readonly ZhEvent[] = [
  build({
    title: "Street Parade 2026",
    subtitle: "Die größte Techno-Parade der Welt",
    category: "volksfest",
    size: "mega",
    startDateTime: "2026-08-08T13:00:00",
    endDateTime: "2026-08-09T00:00:00",
    venue: "Limmatquai · Bahnhofbrücke · Bürkliplatz",
    neighborhood: "Stadt Zürich",
    description:
      "Eine Million Menschen, dreißig Lovemobiles, ein Soundsystem, das die Limmat zum Vibrieren bringt. Die Parade zieht vom Utoquai über das Bürkliplatz an den Bahnhof und zurück. Bring leichte Schuhe, viel Wasser und Geduld am Tram.",
    tags: ["Techno", "Open Air", "Tradition"],
  }),
  build({
    title: "Züri Fäscht 2026",
    subtitle: "Das große Stadtfest, alle drei Jahre",
    category: "volksfest",
    size: "mega",
    startDateTime: "2026-07-03T17:00:00",
    endDateTime: "2026-07-05T23:30:00",
    venue: "Seebecken · Limmat · Innenstadt",
    neighborhood: "Stadt Zürich",
    description:
      "Drei Tage Feuerwerk, Hochseilakte über der Limmat, Konzerte auf zehn Bühnen und Marktstände vom Bürkliplatz bis zum Bellevue. Das größte Volksfest der Schweiz, kuratiert in seiner urbansten Form.",
    tags: ["Feuerwerk", "Familie", "Tradition"],
  }),
  build({
    title: "Sechseläuten 2026",
    subtitle: "Frühlings-Volksfest mit Böögg-Verbrennung",
    category: "volksfest",
    size: "mega",
    startDateTime: "2026-04-20T15:00:00",
    endDateTime: "2026-04-20T20:00:00",
    venue: "Sechseläutenplatz",
    neighborhood: "Kreis 1",
    description:
      "Die Zünfte ziehen in historischen Trachten durch die Innenstadt, der Böögg brennt um 18 Uhr — und je schneller sein Kopf explodiert, desto schöner wird der Sommer. Dieses Jahr in 12 Minuten 57 Sekunden.",
    tags: ["Tradition", "Zünfte", "Frühling"],
  }),
  build({
    title: "Knabenschiessen 2026",
    subtitle: "Traditionelles Schützenfest mit Chilbi",
    category: "volksfest",
    size: "mega",
    startDateTime: "2026-09-13T10:00:00",
    endDateTime: "2026-09-14T22:00:00",
    venue: "Albisgüetli",
    neighborhood: "Wiedikon",
    description:
      "Das Knabenschiessen ist Zürichs zweitgrößtes Volksfest. Kinder zielen mit Sturmgewehren auf Scheiben, Erwachsene auf Magenbrot. Beide Gruppen genießen es. Rummelplatz, Festwirtschaften, Riesenrad.",
    tags: ["Tradition", "Chilbi", "Familie"],
  }),
  build({
    title: "Coldplay Live in Zürich",
    subtitle: "Music of the Spheres Tour",
    category: "konzert",
    size: "mega",
    startDateTime: "2026-05-23T20:00:00",
    venue: "Letzigrund",
    neighborhood: "Altstetten",
    description:
      "Chris Martin und Band bringen die Music-of-the-Spheres-Show ins Letzigrund — mit synchronisierten LED-Wristbands, Pyrotechnik und einer B-Stage mitten im Publikum. CO2-kompensierte Tour mit kinetischen Tanzflächen.",
    priceFromChf: 145,
    ticketUrl: "https://example.ch/tickets/coldplay",
    tags: ["Stadium", "Pop", "Headliner"],
  }),
  build({
    title: "Adele — One Night Only",
    subtitle: "Limited European Show",
    category: "konzert",
    size: "mega",
    startDateTime: "2026-06-17T20:30:00",
    venue: "Hallenstadion",
    neighborhood: "Oerlikon",
    description:
      "Eine einzige europäische Halle, ein einziger Abend, eine einzige Stimme. Adele singt das Set ihrer Las-Vegas-Residency ohne Filter, mit Streichquartett und einem Flügel. Karten ausschließlich personalisiert.",
    priceFromChf: 220,
    ticketUrl: "https://example.ch/tickets/adele",
    tags: ["Headliner", "Soul", "Limitiert"],
  }),
  build({
    title: "Openair Zürich 2026",
    subtitle: "Drei Tage, internationale Headliner",
    category: "festival",
    size: "major",
    startDateTime: "2026-08-27T15:00:00",
    endDateTime: "2026-08-29T23:30:00",
    venue: "Allmend Brunau",
    neighborhood: "Wollishofen",
    description:
      "Indie, Hip-Hop, elektronische Acts auf vier Bühnen, dazu eine Food-Strecke kuratiert vom Hiltl- und Frau-Gerolds-Team. Camping optional, ÖV im Festival-Pass inkludiert.",
    priceFromChf: 189,
    ticketUrl: "https://example.ch/tickets/openair",
    tags: ["Indie", "Hip-Hop", "Festival"],
  }),
  build({
    title: "Caliente Festival 2026",
    subtitle: "Größtes Latin-Festival der Schweiz",
    category: "festival",
    size: "major",
    startDateTime: "2026-06-26T16:00:00",
    endDateTime: "2026-06-28T23:00:00",
    venue: "Bürkliplatz",
    neighborhood: "Kreis 1",
    description:
      "Salsa, Bachata, Reggaeton — drei Tage am Wasser, Tanzkurse für Anfängerinnen, Live-Acts aus Kuba, Kolumbien, Puerto Rico. Caipirinha, Mojito, Pisco Sour gehören zum Pflichtprogramm.",
    tags: ["Salsa", "Open Air", "Tanz"],
  }),
  build({
    title: "Zurich Film Festival 2026",
    subtitle: "Internationaler grüner Teppich",
    category: "festival",
    size: "major",
    startDateTime: "2026-09-24T18:00:00",
    endDateTime: "2026-10-04T23:00:00",
    venue: "Stadt Zürich · mehrere Kinos",
    neighborhood: "Kreis 1",
    description:
      "Premieren, Master-Classes, A-List-Stars auf dem grünen Teppich am Sechseläutenplatz. Schwerpunkt 2026: Independent Cinema Naher Osten und neue Schweizer Stimmen.",
    priceFromChf: 28,
    ticketUrl: "https://example.ch/tickets/zff",
    tags: ["Film", "Premieren", "Stars"],
  }),
  build({
    title: "Theater Spektakel 2026",
    subtitle: "Internationales Performance-Festival",
    category: "festival",
    size: "major",
    startDateTime: "2026-08-13T18:00:00",
    endDateTime: "2026-08-30T23:00:00",
    venue: "Landiwiese",
    neighborhood: "Wollishofen",
    description:
      "Performance-Kunst, Tanz, experimentelles Theater am Zürichsee. Die Landiwiese wird zur offenen Bühne für Companies aus Lagos, Buenos Aires, Beirut und Berlin. Eintritt teilweise frei.",
    tags: ["Performance", "Tanz", "Sommer"],
  }),
  build({
    title: "Tonhalle: Mahler Sinfonie Nr. 3",
    subtitle: "Tonhalle-Orchester unter Paavo Järvi",
    category: "klassik",
    size: "major",
    startDateTime: "2026-05-21T19:30:00",
    venue: "Tonhalle Zürich",
    neighborhood: "Enge",
    description:
      "Mahlers monumentale Dritte — sechs Sätze, fast zwei Stunden, Alt-Solo, Frauenchor, Knabenchor. Järvi dirigiert ohne Partitur, das Orchester atmet als ein einziger Organismus.",
    priceFromChf: 65,
    ticketUrl: "https://example.ch/tickets/tonhalle-mahler",
    tags: ["Sinfonik", "Mahler", "Järvi"],
  }),
  build({
    title: "Opernhaus: Tristan und Isolde Premiere",
    subtitle: "Wagner · Inszenierung Claus Guth",
    category: "klassik",
    size: "major",
    startDateTime: "2026-05-24T17:00:00",
    venue: "Opernhaus Zürich",
    neighborhood: "Sechseläutenplatz",
    description:
      "Claus Guth liest Wagners Liebestod als psychoanalytisches Kammerspiel. Gianandrea Noseda dirigiert die Philharmonia Zürich, in der Titelpartie Klaus Florian Vogt. Premiere mit anschließendem Empfang.",
    priceFromChf: 92,
    ticketUrl: "https://example.ch/tickets/tristan",
    tags: ["Wagner", "Premiere", "Oper"],
  }),
  build({
    title: "Bligg — Album-Tour",
    subtitle: "Album-12, Mundart-Pop",
    category: "konzert",
    size: "major",
    startDateTime: "2026-05-30T20:00:00",
    venue: "X-TRA",
    neighborhood: "Limmatplatz",
    description:
      "Bligg im Heimspiel — neue Songs, Klassiker von «Volksmusig» bis «Heimweh», eine 8-köpfige Live-Band und mit etwas Glück Marc Sway als Gast. Stehkonzert im X-TRA, Türen 19 Uhr.",
    priceFromChf: 68,
    ticketUrl: "https://example.ch/tickets/bligg",
    tags: ["Mundart", "Pop", "Heimspiel"],
  }),
  build({
    title: "ZSC Lions vs. EV Zug — Playoff Final",
    subtitle: "Eishockey-Playoff-Finalspiel",
    category: "sport",
    size: "major",
    startDateTime: "2026-05-19T19:45:00",
    venue: "Hallenstadion",
    neighborhood: "Oerlikon",
    description:
      "Spiel 5, 2:2 in der Serie. Das Hallenstadion ist seit Wochen ausverkauft, nur Resale-Tickets verfügbar. Anpfiff 19:45, Türöffnung 18:30 mit DJ-Warm-up und Pyro-Show vor dem Bully.",
    priceFromChf: 65,
    ticketUrl: "https://example.ch/tickets/zsc",
    tags: ["Eishockey", "Playoff", "Heimspiel"],
  }),
  build({
    title: "Hip-Hop Night im Kaufleuten",
    subtitle: "DJ-Set mit lokalen und internationalen Acts",
    category: "club",
    size: "mid",
    startDateTime: "2026-05-22T23:00:00",
    endDateTime: "2026-05-23T05:00:00",
    venue: "Kaufleuten",
    neighborhood: "Kreis 1",
    description:
      "Klassisches Set zwischen East Coast Boom Bap und neuem UK-Drill. Resident-DJ Jay V mit Gast aus London. Türen 23:00, Dresscode smart-casual, Coat-Check kostenlos.",
    priceFromChf: 25,
    ticketUrl: "https://example.ch/tickets/kaufleuten-hiphop",
    tags: ["Hip-Hop", "Spätabend", "DJ-Set"],
  }),
  build({
    title: "Stand-Up Comedy: Patti Basler",
    subtitle: "Schweizer Politik-Satire",
    category: "comedy",
    size: "mid",
    startDateTime: "2026-05-27T20:00:00",
    venue: "Bernhard Theater",
    neighborhood: "Sechseläutenplatz",
    description:
      "Pattis neues Programm seziert das Bundeshaus mit Reimen, Mundart und mathematischer Präzision. 90 Minuten ohne Pause, danach Signierstunde im Foyer.",
    priceFromChf: 52,
    ticketUrl: "https://example.ch/tickets/basler",
    tags: ["Satire", "Mundart", "Politik"],
  }),
  build({
    title: "Vernissage: Pipilotti Rist — Neue Arbeiten",
    subtitle: "Eröffnung der Einzelausstellung",
    category: "kunst",
    size: "mid",
    startDateTime: "2026-05-28T18:00:00",
    venue: "Kunsthaus Zürich",
    neighborhood: "Heimplatz",
    description:
      "Pipilotti Rist kehrt mit neuen Video-Installationen ins Kunsthaus zurück. Ein Saal voller schwebender Projektoren, ein zweiter mit Licht-Skulpturen aus Glasfaser. Eröffnungsrede von Ann Demeester um 18:30.",
    tags: ["Vernissage", "Video-Art", "Pipilotti Rist"],
  }),
  build({
    title: "Schauspielhaus: Reigen",
    subtitle: "Schnitzler · Inszenierung Nicolas Stemann",
    category: "theater",
    size: "mid",
    startDateTime: "2026-05-23T19:30:00",
    venue: "Schauspielhaus Pfauen",
    neighborhood: "Heimplatz",
    description:
      "Zehn Szenen, zehn Begegnungen, ein einziges Bett. Stemann verlegt Schnitzlers Wiener Reigen ins Zürich der Gegenwart und besetzt die Rollen geschlechterfluide. Drei Stunden, eine Pause.",
    priceFromChf: 45,
    ticketUrl: "https://example.ch/tickets/reigen",
    tags: ["Schnitzler", "Stemann", "Repertoire"],
  }),
  build({
    title: "Vintage-Uhren-Markt",
    subtitle: "Sammler-Markt mit Premium-Vintage-Uhren",
    category: "kunst",
    size: "mid",
    startDateTime: "2026-05-24T10:00:00",
    endDateTime: "2026-05-24T17:00:00",
    venue: "Globus am Bellevue",
    neighborhood: "Kreis 1",
    description:
      "Vierzig kuratierte Händlerinnen aus der Schweiz, Italien, Japan. Rolex Submariner aus den Sechzigern, frühe Patek Calatrava, militärische Heuer-Chronographen. Probieren ausdrücklich erlaubt.",
    tags: ["Vintage", "Uhren", "Sammler"],
  }),
  build({
    title: "Kosmos: Schweizer Doku-Premiere «Bergdorf»",
    subtitle: "Premiere mit Q&A der Regisseurin",
    category: "kunst",
    size: "mid",
    startDateTime: "2026-05-18T20:00:00",
    venue: "Kino Kosmos",
    neighborhood: "Europaallee",
    description:
      "Sieben Jahre Dreharbeiten in einem entvölkerten Bündner Bergdorf. Die Regisseurin Lisa Brunner ist anwesend und stellt sich nach der Vorführung den Fragen des Publikums. Bar geöffnet bis 24 Uhr.",
    priceFromChf: 22,
    ticketUrl: "https://example.ch/tickets/bergdorf",
    tags: ["Dokfilm", "Premiere", "Schweiz"],
  }),
  build({
    title: "Amelie Lens — 6h DJ-Set",
    subtitle: "EXHALE-Showcase, strikt limitiert",
    category: "club",
    size: "intimate",
    startDateTime: "2026-05-23T23:30:00",
    endDateTime: "2026-05-24T06:00:00",
    venue: "Härterei Klub",
    neighborhood: "Hard",
    description:
      "Sechs Stunden Amelie Lens, kein Support, kein Warm-up. Das Härterei wird auf 250 Tickets gedrosselt — Soundsystem von Funktion-One, Nebel von Look Solutions. Reine Tanzfläche, kein Phone-Spam.",
    priceFromChf: 55,
    ticketUrl: "https://example.ch/tickets/lens",
    tags: ["Techno", "Headliner", "Limitiert"],
  }),
  build({
    title: "Nik Bärtsch's Mobile",
    subtitle: "Ritualistic Groove Jazz-Quartett",
    category: "konzert",
    size: "intimate",
    startDateTime: "2026-05-19T21:00:00",
    venue: "Helsinki Klub",
    neighborhood: "Industrie­quartier",
    description:
      "Zen-Funk in seiner reinsten Form. Bärtsch am Klavier, Sha am Kontrabass-Klarinett, Kaspar Rast am Schlagzeug, Nicolas Stocker an der Perkussion. 90 Minuten ohne Ansage, ohne Applauspause.",
    priceFromChf: 38,
    ticketUrl: "https://example.ch/tickets/baertsch",
    tags: ["Jazz", "Minimalismus", "Bärtsch"],
  }),
  build({
    title: "Designer-Flohmarkt am Helvetiaplatz",
    subtitle: "Vintage Designer Fashion, kuratiert",
    category: "mode",
    size: "intimate",
    startDateTime: "2026-05-31T11:00:00",
    endDateTime: "2026-05-31T17:00:00",
    venue: "Helvetiaplatz",
    neighborhood: "Kreis 4",
    description:
      "Fünfunddreißig kuratierte Stände — Issey Miyake, Comme des Garçons, frühe Maison Margiela, Schweizer Newcomer-Brands. Kein Fast-Fashion, kein H&M-Resale. Eintritt frei, Apéro ab 16 Uhr.",
    tags: ["Vintage", "Fashion", "Markt"],
  }),
  build({
    title: "Pop-up Dinner mit Sven Wassmer",
    subtitle: "3-Abend-Pop-up des 7Pines-Sterne-Kochs",
    category: "gastro",
    size: "intimate",
    startDateTime: "2026-06-04T19:00:00",
    venue: "Widder Garten",
    neighborhood: "Kreis 1",
    description:
      "Sven Wassmer kocht drei Abende lang im Widder-Garten. Acht Gänge, alpine Produkte, Pairing aus Schweizer Naturweinen. Pro Abend dreißig Plätze, Reservation nur über Warteliste.",
    priceFromChf: 280,
    ticketUrl: "https://example.ch/tickets/wassmer",
    tags: ["Sterne", "Pop-up", "Pairing"],
  }),
  build({
    title: "Comedy Open Mic",
    subtitle: "Schweizer Stand-Up-Newcomer",
    category: "comedy",
    size: "intimate",
    startDateTime: "2026-05-26T20:30:00",
    venue: "Bogen F",
    neighborhood: "Kreis 5",
    description:
      "Acht Newcomer, je acht Minuten, gnadenloses Publikum. Moderation Charles Nguela. Bar geöffnet, Eintritt günstig, Lacher nicht garantiert — aber meist verdient.",
    priceFromChf: 15,
    ticketUrl: "https://example.ch/tickets/openmic",
    tags: ["Open Mic", "Newcomer", "Wöchentlich"],
  }),
  build({
    title: "Tesla Cybertruck — Schweiz Showcase",
    subtitle: "Erste offizielle Ausstellung in der Schweiz",
    category: "mode",
    size: "mid",
    startDateTime: "2026-05-30T10:00:00",
    endDateTime: "2026-05-30T18:00:00",
    venue: "Tesla Center Zürich-Schlieren",
    neighborhood: "Schlieren",
    description:
      "Drei Cybertrucks in den Versionen Cyberbeast, AWD und RWD. Test-Sitzgelegenheit, technische Walkarounds zu jeder vollen Stunde, Fragerunde mit dem Tesla-Engineering-Team aus Berlin.",
    tags: ["Auto", "Tech", "Showcase"],
  }),
  build({
    title: "Taylor Swift — Eras Tour",
    subtitle: "Final European Show",
    category: "konzert",
    size: "mega",
    startDateTime: "2026-05-10T19:00:00",
    venue: "Letzigrund",
    neighborhood: "Altstetten",
    description:
      "Drei Stunden, zehn Eras, vierundvierzig Songs. Die letzte europäische Show der Tour, mit zwei Surprise-Songs, die Swift seit Buenos Aires nicht mehr gespielt hat. Friendship-Bracelet-Tausch im Foyer.",
    priceFromChf: 175,
    tags: ["Stadium", "Pop", "Eras"],
  }),
  build({
    title: "Schauspielhaus: Reigen Premiere",
    subtitle: "Stemanns Inszenierung",
    category: "theater",
    size: "major",
    startDateTime: "2026-05-14T19:30:00",
    venue: "Schauspielhaus Pfauen",
    neighborhood: "Heimplatz",
    description:
      "Premierenabend mit Empfang im Foyer. Drei Stunden, eine Pause, geschlechterfluide Besetzung. Maja Schöne und Sebastian Rudolph eröffnen die Sequenz.",
    priceFromChf: 75,
    tags: ["Premiere", "Schnitzler", "Stemann"],
  }),
] as const;

/**
 * Pre-seeded reviews for past events. These render only when the user has not
 * cleared localStorage; on first load they are imported into storage by reviews.ts.
 */
export const SEED_REVIEWS: readonly Review[] = [
  {
    id: "seed-r-swift-1",
    eventId: makeId(buildEventSlug("Taylor Swift — Eras Tour", "2026-05-10T19:00:00")),
    rating: 5,
    text: "Drei Stunden Gänsehaut. Sektor C5 hatte direkten Blick auf die B-Stage — wer Stehplatz kauft, sollte spätestens 16 Uhr da sein. Akustik im Letzigrund war erstaunlich clean, kein Matsch in den Höhen.",
    seat: "Sektor C5, Reihe 14",
    acoustics: "Klar, balanciert",
    authorName: "Lea M.",
    createdAt: "2026-05-11T08:30:00",
  },
  {
    id: "seed-r-swift-2",
    eventId: makeId(buildEventSlug("Taylor Swift — Eras Tour", "2026-05-10T19:00:00")),
    rating: 5,
    text: "Surprise-Songs waren «All Too Well (10 minute)» und «Gold Rush». Das Stadion hat geweint. ÖV-Anschluss nach Mitternacht funktionierte überraschend gut, Tram 2 fuhr im 4-Minuten-Takt.",
    authorName: "Tobias R.",
    createdAt: "2026-05-11T10:12:00",
  },
  {
    id: "seed-r-swift-3",
    eventId: makeId(buildEventSlug("Taylor Swift — Eras Tour", "2026-05-10T19:00:00")),
    rating: 4,
    text: "Sicht aus dem Oberrang E war für die Hauptbühne perfekt, für die B-Stage hätte ich Tribüne West nehmen sollen. Bier viel zu teuer, sonst ohne Klage.",
    seat: "Oberrang E",
    authorName: "Andrea K.",
    createdAt: "2026-05-12T19:45:00",
  },
  {
    id: "seed-r-swift-4",
    eventId: makeId(buildEventSlug("Taylor Swift — Eras Tour", "2026-05-10T19:00:00")),
    rating: 5,
    text: "Die Friendship-Bracelet-Kultur ist real und sehr herzig. Ich kam mit zwei Armbändern und ging mit dreiundzwanzig.",
    authorName: "Mira S.",
    createdAt: "2026-05-13T09:00:00",
  },
  {
    id: "seed-r-swift-5",
    eventId: makeId(buildEventSlug("Taylor Swift — Eras Tour", "2026-05-10T19:00:00")),
    rating: 4,
    text: "Choreografie der Reputation-Era war neu — schärfer, härter, mehr Industrial-Vibe. Outfit-Wechsel weiterhin in Rekordzeit. Empfehlung: Kopfhörer-Schutz mitnehmen, Sub-Bässe waren im Innenraum brutal.",
    acoustics: "Sub-Bass sehr stark",
    authorName: "Daniel B.",
    createdAt: "2026-05-13T22:30:00",
  },
  {
    id: "seed-r-reigen-1",
    eventId: makeId(buildEventSlug("Schauspielhaus: Reigen Premiere", "2026-05-14T19:30:00")),
    rating: 4,
    text: "Stemann liest Schnitzler radikal — die geschlechterfluide Besetzung funktioniert in den ersten sechs Szenen wunderbar, in Szene neun verliert das Konzept etwas an Schärfe. Trotzdem: einer der starken Premierenabende dieser Saison.",
    seat: "Parkett links, Reihe 8",
    authorName: "Helena V.",
    createdAt: "2026-05-15T07:50:00",
  },
  {
    id: "seed-r-reigen-2",
    eventId: makeId(buildEventSlug("Schauspielhaus: Reigen Premiere", "2026-05-14T19:30:00")),
    rating: 5,
    text: "Sebastian Rudolph war atemberaubend. Drei Stunden vergehen wie eine. Empfang im Foyer war stilvoll, Crémant von Marc Kreydenweiss, kleine Häppchen vom Hiltl.",
    authorName: "Robert F.",
    createdAt: "2026-05-15T11:20:00",
  },
  {
    id: "seed-r-reigen-3",
    eventId: makeId(buildEventSlug("Schauspielhaus: Reigen Premiere", "2026-05-14T19:30:00")),
    rating: 4,
    text: "Bühnenbild minimal, Licht präzise, Kostüme zeitlos. Wer Stemann kennt, weiß was kommt — wer nicht, sollte sich vorab Schnitzlers Text ansehen, dann öffnet sich die Inszenierung schneller.",
    seat: "Rang Mitte",
    authorName: "Sarah L.",
    createdAt: "2026-05-16T18:10:00",
  },
];

export const SEED_PHOTOS: readonly EventPhoto[] = [];
