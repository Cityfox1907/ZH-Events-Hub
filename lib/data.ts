import type {
  TonightEvent,
  DineVenue,
  Experience,
  PulseEvent,
  LiveEvent,
  DistrictInfo,
  NotificationItem,
  ProviderTestimonial,
  ProviderInquiry,
  MyReview,
  PulsPost,
  MarktListing,
  DailyPoll,
  InitiativeItem,
  Achievement,
  EventItem,
  EventCategory,
  Bucket,
  Place,
  PlaceKind,
  Listing,
  ListingBadge,
  EntdeckenCategory,
  EntdeckenTime,
  StyleTag,
} from "./types";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

// ─────────────────────────────────────────────────────────────
// TONIGHT — 12 Events
// ─────────────────────────────────────────────────────────────

export const TONIGHT_EVENTS: TonightEvent[] = [
  // ── Heute Abend (3) ──
  {
    id: "klang-kerzenschein",
    title: "Klang & Kerzenschein — Vivaldi bei Nacht",
    category: "Konzert",
    datetime: "Heute, 20:00",
    date_iso: "2026-05-12T20:00:00+02:00",
    bucket: "today",
    venue: "Kulturhaus Helferei",
    district: "Kreis 1",
    price: "CHF 49–89",
    price_band: "mid",
    vibe_tags: ["Premium", "Date Night", "Cultural"],
    description:
      "Vivaldis 'Vier Jahreszeiten' im Kerzenlicht eines historischen Saals. Streichquartett, 90 Minuten, magisch.",
    cover_image: UNSPLASH("photo-1465847899084-d164df4dedc6"),
    gallery: [
      UNSPLASH("photo-1465847899084-d164df4dedc6"),
      UNSPLASH("photo-1514525253161-7a46d19cd819"),
      UNSPLASH("photo-1519683109079-d5f539e1542f"),
      UNSPLASH("photo-1493225457124-a3eb161ffa5f"),
    ],
    tickets_left: 14,
    trending: true,
    views_24h: 312,
    added_at: "Vor 3 Tagen",
  },
  {
    id: "underground-hive",
    title: "Underground-Set @ Hive — Berliner DJ-Gast",
    category: "Klub",
    datetime: "Heute, 23:00",
    date_iso: "2026-05-12T23:00:00+02:00",
    bucket: "today",
    venue: "Hive Club",
    district: "Kreis 4",
    price: "CHF 25",
    price_band: "low",
    vibe_tags: ["Casual", "Trending"],
    description:
      "Roher, treibender Techno aus Berlin. Türen 23:00, Floor bis 06:00. Strenger Door, kleiner Floor.",
    cover_image: UNSPLASH("photo-1571266028243-d220c6a32ae1"),
    gallery: [
      UNSPLASH("photo-1571266028243-d220c6a32ae1"),
      UNSPLASH("photo-1493225457124-a3eb161ffa5f"),
      UNSPLASH("photo-1574391884720-bbc049ec09ad"),
    ],
    tickets_left: 38,
    views_24h: 198,
  },
  {
    id: "vernissage-stille-stadt",
    title: "Vernissage — 'Stille Stadt' von Anna Berger",
    category: "Ausstellung",
    datetime: "Heute, 19:00",
    date_iso: "2026-05-12T19:00:00+02:00",
    bucket: "today",
    venue: "Galerie Lullin + Ferrari",
    district: "Kreis 5",
    price: "Gratis",
    price_band: "free",
    vibe_tags: ["Cultural", "Hidden Gem"],
    description:
      "Schwarz-weiss Streetfotografie aus Zürichs leeren Stunden. Apero ab 19:00, Künstlerin anwesend.",
    cover_image: UNSPLASH("photo-1545987796-200677ee1011"),
    gallery: [
      UNSPLASH("photo-1545987796-200677ee1011"),
      UNSPLASH("photo-1544967082-d9d25d867d66"),
    ],
    added_at: "Vor 1 Tag",
  },

  // ── Wochenende (4) ──
  {
    id: "fcz-servette",
    title: "FCZ vs. Servette — Letzigrund",
    category: "Sport",
    datetime: "Sa 16. Mai, 17:30",
    date_iso: "2026-05-16T17:30:00+02:00",
    bucket: "weekend",
    venue: "Stadion Letzigrund",
    district: "Kreis 4",
    price: "CHF 35–120",
    price_band: "mid",
    vibe_tags: ["Casual", "Family"],
    description:
      "Topspiel der Super League. Stehrampe, Familiensektor und Business-Loge — alles über die Plattform.",
    cover_image: UNSPLASH("photo-1574629810360-7efbbe195018"),
    gallery: [
      UNSPLASH("photo-1574629810360-7efbbe195018"),
      UNSPLASH("photo-1577471488278-16eec37ffcc2"),
    ],
    tickets_left: 1240,
    views_24h: 482,
  },
  {
    id: "stand-up-casinotheater",
    title: "Stand-Up Comedy auf Schweizerdeutsch — Casinotheater",
    category: "Theater",
    datetime: "Sa 16. Mai, 20:30",
    date_iso: "2026-05-16T20:30:00+02:00",
    bucket: "weekend",
    venue: "Casinotheater Winterthur — Gastspiel Zürich",
    district: "Kreis 6",
    price: "CHF 39",
    price_band: "low",
    vibe_tags: ["Casual", "Date Night"],
    description:
      "Sechs Comedians, ein Saal, 90 Minuten ohne Pause. Wenn du Schweizerdeutsch nicht verstehst — komm trotzdem.",
    cover_image: UNSPLASH("photo-1585699324551-f6c309eedeca"),
    gallery: [UNSPLASH("photo-1585699324551-f6c309eedeca")],
    tickets_left: 12,
  },
  {
    id: "fruehstueck-cadonau",
    title: "Frühstück mit Sterne-Koch Dario Cadonau — Pop-up",
    category: "Food",
    datetime: "So 17. Mai, 09:30",
    date_iso: "2026-05-17T09:30:00+02:00",
    bucket: "weekend",
    venue: "Privat-Atelier, Bahnhofquai",
    district: "Kreis 1",
    price: "CHF 95",
    price_band: "high",
    vibe_tags: ["Premium", "Fine Dining", "Hidden Gem"],
    description:
      "Sieben Gänge zum Frühstück, einmalig kuratiert. Cadonau erzählt zu jedem Gang. Nur 16 Plätze.",
    cover_image: UNSPLASH("photo-1414235077428-338989a2e8c0"),
    gallery: [
      UNSPLASH("photo-1414235077428-338989a2e8c0"),
      UNSPLASH("photo-1559339352-11d035aa65de"),
    ],
    tickets_left: 3,
    trending: true,
    views_24h: 521,
  },
  {
    id: "fruehlingsmarkt-buerkliplatz",
    title: "Zürcher Frühlingsmarkt am Bürkliplatz",
    category: "Festival",
    datetime: "Sa+So, 10:00–18:00",
    date_iso: "2026-05-16T10:00:00+02:00",
    bucket: "weekend",
    venue: "Bürkliplatz",
    district: "Kreis 1",
    price: "Gratis",
    price_band: "free",
    vibe_tags: ["Outdoor", "Family", "Casual"],
    description:
      "Über 80 Stände — regionale Manufakturen, Streetfood, Live-Musik am Nachmittag.",
    cover_image: UNSPLASH("photo-1488459716781-31db52582fe9"),
    gallery: [UNSPLASH("photo-1488459716781-31db52582fe9")],
  },

  // ── Diese Woche (5) ──
  {
    id: "rooftop-jazz",
    title: "Rooftop Jazz — Quintett im Sommerwind",
    category: "Konzert",
    datetime: "Mi 20. Mai, 19:30",
    date_iso: "2026-05-20T19:30:00+02:00",
    bucket: "week",
    venue: "Rooftop Hotel Rivington",
    district: "Kreis 4",
    price: "CHF 35",
    price_band: "low",
    vibe_tags: ["Outdoor", "Casual", "Date Night"],
    description:
      "Lokale Jazz-Szene auf einer der schönsten Dachterrassen der Stadt. Eintritt inklusive einem Apero.",
    cover_image: UNSPLASH("photo-1511192336575-5a79af67a629"),
    gallery: [
      UNSPLASH("photo-1511192336575-5a79af67a629"),
      UNSPLASH("photo-1493225457124-a3eb161ffa5f"),
    ],
    tickets_left: 28,
  },
  {
    id: "kunsthaus-late",
    title: "Kunsthaus Late — Surrealismus nach 21 Uhr",
    category: "Ausstellung",
    datetime: "Do 21. Mai, 21:00",
    date_iso: "2026-05-21T21:00:00+02:00",
    bucket: "week",
    venue: "Kunsthaus Zürich",
    district: "Kreis 1",
    price: "CHF 22",
    price_band: "low",
    vibe_tags: ["Cultural", "Indoor", "Hidden Gem"],
    description:
      "Privater Zugang zur Surrealismus-Sammlung nach Schliessung, mit Kurator-Führung und Naturwein.",
    cover_image: UNSPLASH("photo-1544967082-d9d25d867d66"),
    gallery: [UNSPLASH("photo-1544967082-d9d25d867d66")],
  },
  {
    id: "moods-jazz-trio",
    title: "Jazzclub Moods — Trio aus New Orleans",
    category: "Konzert",
    datetime: "Fr 22. Mai, 21:00",
    date_iso: "2026-05-22T21:00:00+02:00",
    bucket: "week",
    venue: "Moods im Schiffbau",
    district: "Kreis 5",
    price: "CHF 45",
    price_band: "low",
    vibe_tags: ["Date Night", "Cultural", "Indoor"],
    description:
      "Drei Musiker, frisch aus dem French Quarter. Erst Set 21:00, zweites Set 23:00.",
    cover_image: UNSPLASH("photo-1493225457124-a3eb161ffa5f"),
    gallery: [UNSPLASH("photo-1493225457124-a3eb161ffa5f")],
    tickets_left: 22,
  },
  {
    id: "neumarkt-verwandlung",
    title: "Theater Neumarkt — 'Die Verwandlung' Premiere",
    category: "Theater",
    datetime: "Di 19. Mai, 20:00",
    date_iso: "2026-05-19T20:00:00+02:00",
    bucket: "week",
    venue: "Theater Neumarkt",
    district: "Kreis 1",
    price: "CHF 49–69",
    price_band: "mid",
    vibe_tags: ["Cultural", "Indoor", "Premium"],
    description:
      "Kafkas Klassiker, neu inszeniert in einer 75-minütigen Solo-Performance. Premiere mit Regie-Gespräch.",
    cover_image: UNSPLASH("photo-1503095396549-807759245b35"),
    gallery: [UNSPLASH("photo-1503095396549-807759245b35")],
    tickets_left: 8,
  },
  {
    id: "talk-zukunft-zuerich",
    title: "Talk: 'Zukunft Zürich 2040' mit Stadträtin Rykart",
    category: "Workshop",
    datetime: "Do 21. Mai, 18:30",
    date_iso: "2026-05-21T18:30:00+02:00",
    bucket: "week",
    venue: "Karl der Grosse",
    district: "Kreis 1",
    price: "Gratis",
    price_band: "free",
    vibe_tags: ["Cultural", "Indoor"],
    description:
      "Podium mit Stadträtin, Architektin und Verkehrsplaner über die nächsten 15 Jahre Zürich.",
    cover_image: UNSPLASH("photo-1556761175-5973dc0f32e7"),
    gallery: [UNSPLASH("photo-1556761175-5973dc0f32e7")],
    added_at: "Vor 2 Tagen",
  },
];

// ─────────────────────────────────────────────────────────────
// DINE — 10 Venues
// ─────────────────────────────────────────────────────────────

const REVIEW_POOL = [
  { author: "Anna L.", text: "Perfekt — wir kommen zurück. Service ohne Eile.", rating: 5 },
  { author: "Tobias K.", text: "Unprätentiös, präzise, herzlich.", rating: 5 },
  { author: "Sara M.", text: "Phänomenal, aber Reservierung nötig.", rating: 4 },
  { author: "Mira S.", text: "Beste Atmosphäre in der Altstadt. Service warmherzig.", rating: 5 },
  { author: "Jonas B.", text: "Wein-Pairing eine eigene Reise. Wert jeden Franken.", rating: 5 },
  { author: "Eva R.", text: "Schön, aber etwas zu laut für ein ruhiges Dinner.", rating: 4 },
  { author: "Lukas P.", text: "Konsistent gut über drei Besuche hinweg.", rating: 5 },
  { author: "Nadine W.", text: "Tolles Konzept, kreative Karte.", rating: 4 },
  { author: "Marc D.", text: "Hier hat sich jemand etwas getraut. Mutig und gut.", rating: 5 },
  { author: "Laura H.", text: "Top-Cocktails, freundlich.", rating: 5 },
];

function reviewSet(start: number, count: number) {
  const months = ["Mai 2026", "April 2026", "März 2026", "Februar 2026", "Januar 2026"];
  return Array.from({ length: count }).map((_, i) => {
    const r = REVIEW_POOL[(start + i) % REVIEW_POOL.length];
    return { ...r, date: months[i % months.length] };
  });
}

export const DINE_VENUES: DineVenue[] = [
  {
    id: "igniv-caminada",
    name: "IGNIV by Andreas Caminada",
    type: "Restaurant — Fine Dining",
    cuisine: "Modern Swiss",
    district: "Kreis 1",
    address: "Talstrasse 1, 8001 Zürich",
    price_range: "CHF CHF CHF CHF",
    description:
      "Sharing-Konzept eines Drei-Sterne-Kochs. Sieben kleine Gänge, wechselnd, präzise und verspielt.",
    vibe_tags: ["Fine Dining", "Premium", "Date Night", "Wine Pairing"],
    rating: 4.9,
    review_count: 421,
    cover_image: UNSPLASH("photo-1414235077428-338989a2e8c0"),
    gallery: [
      UNSPLASH("photo-1414235077428-338989a2e8c0"),
      UNSPLASH("photo-1517248135467-4c7edcad34c4"),
      UNSPLASH("photo-1559339352-11d035aa65de"),
      UNSPLASH("photo-1467003909585-2f8a72700288"),
      UNSPLASH("photo-1551782450-a2132b4ba21d"),
    ],
    hours: "Di–Sa 12:00–14:00 · 18:30–22:30 · So + Mo geschlossen",
    reviews: reviewSet(0, 5),
    trending: true,
    bookings_today: 42,
  },
  {
    id: "maison-manesse",
    name: "Maison Manesse",
    type: "Restaurant — Modern Swiss",
    cuisine: "Modern Swiss",
    district: "Kreis 5",
    address: "Hopfenstrasse 2, 8045 Zürich",
    price_range: "CHF CHF CHF CHF",
    description:
      "Kreatives Tasting-Menü mit Schweizer Saisonprodukten. Eine der mutigsten Küchen der Stadt.",
    vibe_tags: ["Fine Dining", "Date Night", "Wine Pairing"],
    rating: 4.7,
    review_count: 312,
    cover_image: UNSPLASH("photo-1517248135467-4c7edcad34c4"),
    gallery: [
      UNSPLASH("photo-1517248135467-4c7edcad34c4"),
      UNSPLASH("photo-1414235077428-338989a2e8c0"),
      UNSPLASH("photo-1559339352-11d035aa65de"),
      UNSPLASH("photo-1551782450-a2132b4ba21d"),
    ],
    hours: "Di–Sa 18:00–23:30 · So + Mo geschlossen",
    reviews: reviewSet(2, 5),
  },
  {
    id: "equi-table",
    name: "Restaurant Equi-Table",
    type: "Restaurant — Modern Swiss",
    cuisine: "Modern Swiss",
    district: "Kreis 4",
    address: "Erismannstrasse 2, 8004 Zürich",
    price_range: "CHF CHF CHF",
    description:
      "Saisonal, lokal, fair. Wechselnde 4-Gänge-Karte mit eigener kleiner Weinauswahl von Schweizer Bio-Winzern.",
    vibe_tags: ["Date Night", "Cultural", "Hidden Gem"],
    rating: 4.8,
    review_count: 187,
    cover_image: UNSPLASH("photo-1559339352-11d035aa65de"),
    gallery: [
      UNSPLASH("photo-1559339352-11d035aa65de"),
      UNSPLASH("photo-1467003909585-2f8a72700288"),
      UNSPLASH("photo-1551782450-a2132b4ba21d"),
      UNSPLASH("photo-1517248135467-4c7edcad34c4"),
    ],
    hours: "Di–Sa 18:30–24:00",
    reviews: reviewSet(4, 4),
  },
  {
    id: "razzia",
    name: "Razzia",
    type: "Brasserie",
    cuisine: "Französisch / Brasserie",
    district: "Kreis 8",
    address: "Seefeldstrasse 82, 8008 Zürich",
    price_range: "CHF CHF CHF",
    description:
      "Ehemaliges Kino, heute eine der schönsten Brasserien der Stadt. Hohe Decken, klassische Karte, perfektes Steak Frites.",
    vibe_tags: ["Date Night", "Cultural", "Premium"],
    rating: 4.7,
    review_count: 612,
    cover_image: UNSPLASH("photo-1551218808-94e220e084d2"),
    gallery: [
      UNSPLASH("photo-1551218808-94e220e084d2"),
      UNSPLASH("photo-1414235077428-338989a2e8c0"),
      UNSPLASH("photo-1517248135467-4c7edcad34c4"),
      UNSPLASH("photo-1467003909585-2f8a72700288"),
    ],
    hours: "Mo–So 11:30–24:00",
    reviews: reviewSet(1, 5),
    bookings_today: 28,
  },
  {
    id: "kronenhalle-bar",
    name: "Kronenhalle Bar",
    type: "Bar — Klassisch",
    cuisine: "Klassische Bar",
    district: "Kreis 1",
    address: "Rämistrasse 4, 8001 Zürich",
    price_range: "CHF CHF CHF",
    description:
      "Seit 1965. Ledersofas, Chagall an der Wand, Negroni nach Hausrezept. Eine Institution.",
    vibe_tags: ["Premium", "Date Night", "Cultural"],
    rating: 4.8,
    review_count: 894,
    cover_image: UNSPLASH("photo-1470337458703-46ad1756a187"),
    gallery: [
      UNSPLASH("photo-1470337458703-46ad1756a187"),
      UNSPLASH("photo-1514933651103-005eec06c04b"),
      UNSPLASH("photo-1551218808-94e220e084d2"),
    ],
    hours: "Mo–So 16:00–02:00",
    reviews: reviewSet(3, 4),
  },
  {
    id: "old-crow",
    name: "Old Crow",
    type: "Speakeasy-Bar",
    cuisine: "Cocktails",
    district: "Kreis 4",
    address: "Schwanengasse 4, 8004 Zürich",
    price_range: "CHF CHF",
    description:
      "Versteckter Eingang neben einem Coiffeur. Drinnen: dunkles Holz, 80er-Soul, beste Old Fashioned der Stadt.",
    vibe_tags: ["Hidden Gem", "Date Night", "Casual"],
    rating: 4.6,
    review_count: 289,
    cover_image: UNSPLASH("photo-1514933651103-005eec06c04b"),
    gallery: [
      UNSPLASH("photo-1514933651103-005eec06c04b"),
      UNSPLASH("photo-1470337458703-46ad1756a187"),
      UNSPLASH("photo-1551218808-94e220e084d2"),
    ],
    hours: "Mi–Sa 19:00–02:00",
    reviews: reviewSet(5, 4),
  },
  {
    id: "clouds",
    name: "Clouds",
    type: "Rooftop Restaurant",
    cuisine: "Internationale Küche",
    district: "Kreis 5",
    address: "Maagplatz 5, 8005 Zürich (Prime Tower, 35. Stock)",
    price_range: "CHF CHF CHF",
    description:
      "126 Meter über Zürich. Beste Aussicht der Stadt, klassische Karte, Gin-Bar mit über 80 Sorten.",
    vibe_tags: ["Premium", "Date Night", "Outdoor"],
    rating: 4.5,
    review_count: 1422,
    cover_image: UNSPLASH("photo-1559329007-40df8a9345d8"),
    gallery: [
      UNSPLASH("photo-1559329007-40df8a9345d8"),
      UNSPLASH("photo-1551218808-94e220e084d2"),
      UNSPLASH("photo-1414235077428-338989a2e8c0"),
      UNSPLASH("photo-1467003909585-2f8a72700288"),
    ],
    hours: "Mo–So 11:00–24:00",
    reviews: reviewSet(0, 4),
    trending: true,
    bookings_today: 67,
  },
  {
    id: "bauernschaenke",
    name: "Bauernschänke",
    type: "Restaurant — Swiss Classic",
    cuisine: "Schweizer Klassik",
    district: "Kreis 1",
    address: "Rindermarkt 24, 8001 Zürich",
    price_range: "CHF CHF CHF",
    description:
      "Historisches Wirtshaus mit moderner Schweizer Küche. Wildgerichte, Käsefondue, Naturweinkeller.",
    vibe_tags: ["Date Night", "Cultural"],
    rating: 4.5,
    review_count: 198,
    cover_image: UNSPLASH("photo-1467003909585-2f8a72700288"),
    gallery: [
      UNSPLASH("photo-1467003909585-2f8a72700288"),
      UNSPLASH("photo-1559339352-11d035aa65de"),
      UNSPLASH("photo-1517248135467-4c7edcad34c4"),
    ],
    hours: "Mo–Sa 17:00–24:00",
    reviews: reviewSet(6, 4),
  },
  {
    id: "nooch",
    name: "Nooch Asian Kitchen",
    type: "Restaurant — Asian Fusion",
    cuisine: "Asian Fusion",
    district: "Kreis 1",
    address: "Beethovenstrasse 33, 8002 Zürich",
    price_range: "CHF CHF",
    description:
      "Bowls, Bao und Dim Sum. Schnell, hochwertig, perfekt für ein After-Work-Dinner.",
    vibe_tags: ["Casual", "Trending"],
    rating: 4.4,
    review_count: 521,
    cover_image: UNSPLASH("photo-1535007813616-79dc02ba4021"),
    gallery: [
      UNSPLASH("photo-1535007813616-79dc02ba4021"),
      UNSPLASH("photo-1559339352-11d035aa65de"),
    ],
    hours: "Mo–So 11:30–22:30",
    reviews: reviewSet(2, 4),
    bookings_today: 31,
  },
  {
    id: "hiltl-sihlpost",
    name: "Restaurant Hiltl Sihlpost",
    type: "Restaurant — Vegetarisch",
    cuisine: "Vegetarisch / Vegan",
    district: "Kreis 1",
    address: "Kasernenstrasse 95, 8004 Zürich",
    price_range: "CHF CHF",
    description:
      "Älteste vegetarische Restaurantgruppe der Welt. Buffet, Karte, Bar — alles unter einem Dach.",
    vibe_tags: ["Casual", "Family", "Cultural"],
    rating: 4.5,
    review_count: 2103,
    cover_image: UNSPLASH("photo-1490645935967-10de6ba17061"),
    gallery: [
      UNSPLASH("photo-1490645935967-10de6ba17061"),
      UNSPLASH("photo-1535007813616-79dc02ba4021"),
    ],
    hours: "Mo–So 06:30–24:00",
    reviews: reviewSet(8, 3),
  },
];

// ─────────────────────────────────────────────────────────────
// EXPERIENCE — 8 Erlebnisse
// ─────────────────────────────────────────────────────────────

export const EXPERIENCES: Experience[] = [
  {
    id: "geheime-schweizer-weine",
    title: "Geheime Schweizer Weine — Tasting in der Altstadt",
    category: "Wein-Tasting",
    host: "Lukas Brunner, Sommelier",
    host_bio:
      "Ehemaliger Sommelier eines 5-Sterne-Hauses in St. Moritz. Heute auf der Suche nach den unbekanntesten Schweizer Winzern.",
    duration: "2 Stunden",
    duration_hours: 2,
    price_per_person: 89,
    max_participants: 8,
    meeting_point: "Kreis 1, Niederdorf",
    district: "Kreis 1",
    description:
      "Sechs unbekannte Schweizer Winzer, ausgewählt von einem ehemaligen 5-Sterne-Sommelier. Geschichten und Wein in einer privaten Vinothek.",
    what_included: [
      "6 Weine zur Verkostung",
      "Käse & Brot-Pairing",
      "Sommelier-Notizen zum Mitnehmen",
    ],
    vibe_tags: ["Premium", "Indoor", "Date Night"],
    languages: ["DE", "EN"],
    cover_image: UNSPLASH("photo-1510812431401-41d2bd2722f3"),
    gallery: [
      UNSPLASH("photo-1510812431401-41d2bd2722f3"),
      UNSPLASH("photo-1547595628-c61a29f496f0"),
      UNSPLASH("photo-1474722883778-792e7990302f"),
    ],
    slots: [
      { date: "2026-05-22", time: "18:30", spots_left: 4 },
      { date: "2026-05-29", time: "18:30", spots_left: 2 },
      { date: "2026-06-05", time: "18:30", spots_left: 6 },
    ],
    rating: 4.9,
    review_count: 47,
    reviews: reviewSet(0, 3),
  },
  {
    id: "schoko-spruengli",
    title: "Schoko-Workshop bei Sprüngli-Veteran",
    category: "Workshop",
    host: "Beatrice Müller, Chocolatière",
    host_bio: "20 Jahre bei Sprüngli, heute selbstständig in einem Atelier in Wiedikon.",
    duration: "3 Stunden",
    duration_hours: 3,
    price_per_person: 145,
    max_participants: 6,
    meeting_point: "Atelier Wiedikon, Kreis 3",
    district: "Kreis 3",
    description:
      "Pralinen von Hand, ganache giessen, temperieren, dippen. Du nimmst eine Box mit nach Hause.",
    what_included: [
      "Alle Zutaten und Werkzeuge",
      "Geschmacks-Coaching",
      "Box mit eigenen Pralinen",
    ],
    vibe_tags: ["Indoor", "Casual", "Family"],
    languages: ["DE", "EN"],
    cover_image: UNSPLASH("photo-1511381939415-e44015466834"),
    gallery: [
      UNSPLASH("photo-1511381939415-e44015466834"),
      UNSPLASH("photo-1481391319762-47dff72954d9"),
    ],
    slots: [
      { date: "2026-05-24", time: "10:00", spots_left: 3 },
      { date: "2026-06-07", time: "10:00", spots_left: 6 },
    ],
    rating: 4.8,
    review_count: 92,
    reviews: reviewSet(2, 3),
  },
  {
    id: "foto-walk-kreis4",
    title: "Foto-Walk Kreis 4 — Streetstyle Zürich",
    category: "Tour",
    host: "Marco Steiger, Fotograf",
    host_bio: "10 Jahre Streetfotografie zwischen Berlin, New York und Zürich.",
    duration: "2.5 Stunden",
    duration_hours: 2.5,
    price_per_person: 75,
    max_participants: 5,
    meeting_point: "Helvetiaplatz",
    district: "Kreis 4",
    description:
      "Komposition, Licht, Mut. Wir laufen durch Kreis 4, schiessen, und reviewen am Ende bei einem Kaffee.",
    what_included: [
      "Geführte Tour",
      "Komposition-Coaching",
      "Foto-Review im Café",
    ],
    vibe_tags: ["Outdoor", "Cultural", "Hidden Gem"],
    languages: ["DE", "EN"],
    cover_image: UNSPLASH("photo-1492691527719-9d1e07e534b4"),
    gallery: [
      UNSPLASH("photo-1492691527719-9d1e07e534b4"),
      UNSPLASH("photo-1545987796-200677ee1011"),
    ],
    slots: [
      { date: "2026-05-23", time: "14:00", spots_left: 2 },
      { date: "2026-05-30", time: "14:00", spots_left: 5 },
    ],
    rating: 4.7,
    review_count: 31,
  },
  {
    id: "atelier-bauer",
    title: "Atelier-Besuch bei Bildhauer Marc Bauer",
    category: "Tour",
    host: "Marc Bauer, Bildhauer",
    duration: "1.5 Stunden",
    duration_hours: 1.5,
    price_per_person: 60,
    max_participants: 4,
    meeting_point: "Atelier Aussersihl",
    district: "Kreis 4",
    description:
      "Privater Einblick in das Atelier eines arrivierten Zürcher Künstlers. Werkproben, Fragen, Espresso.",
    what_included: ["Atelier-Tour", "Gespräch mit Künstler", "Espresso"],
    vibe_tags: ["Cultural", "Hidden Gem", "Indoor"],
    languages: ["DE"],
    cover_image: UNSPLASH("photo-1564399579883-451a5d44ec08"),
    gallery: [UNSPLASH("photo-1564399579883-451a5d44ec08")],
    slots: [
      { date: "2026-05-25", time: "15:00", spots_left: 4 },
      { date: "2026-06-01", time: "15:00", spots_left: 3 },
    ],
    rating: 4.9,
    review_count: 18,
  },
  {
    id: "pasta-nonno",
    title: "Pasta-Kurs mit italienischem Nonno",
    category: "Workshop",
    host: "Giuseppe Conti, Nonno",
    host_bio: "78, aus Bologna, lebt seit 35 Jahren in Zürich. Kocht Pasta wie seine Grossmutter.",
    duration: "3 Stunden",
    duration_hours: 3,
    price_per_person: 110,
    max_participants: 8,
    meeting_point: "Privatküche, Kreis 6",
    district: "Kreis 6",
    description:
      "Drei Pasta-Sorten von Hand: Tagliatelle, Tortellini, Pappardelle. Mit Sugo. Anschliessend gemeinsames Essen.",
    what_included: ["Alle Zutaten", "Schürze zum Mitnehmen", "Vier-Gänge-Mahl"],
    vibe_tags: ["Casual", "Family", "Cultural"],
    languages: ["DE", "IT"],
    cover_image: UNSPLASH("photo-1551183053-bf91a1d81141"),
    gallery: [
      UNSPLASH("photo-1551183053-bf91a1d81141"),
      UNSPLASH("photo-1481391319762-47dff72954d9"),
    ],
    slots: [
      { date: "2026-05-26", time: "17:30", spots_left: 5 },
      { date: "2026-06-02", time: "17:30", spots_left: 8 },
    ],
    rating: 4.8,
    review_count: 64,
  },
  {
    id: "whisky-tasting",
    title: "Whisky-Tasting — Schottland trifft Schweiz",
    category: "Wein-Tasting",
    host: "James Brown, Whisky-Sommelier",
    duration: "2 Stunden",
    duration_hours: 2,
    price_per_person: 95,
    max_participants: 10,
    meeting_point: "Bar Kreis 5",
    district: "Kreis 5",
    description:
      "Sechs Single Malts: drei aus Schottland, drei aus Schweizer Brennereien. Im direkten Vergleich.",
    what_included: ["6 Tastings je 2cl", "Schottische Snacks", "Tasting-Notizen"],
    vibe_tags: ["Premium", "Indoor", "Date Night"],
    languages: ["DE", "EN"],
    cover_image: UNSPLASH("photo-1527281400683-1aae777175f8"),
    gallery: [UNSPLASH("photo-1527281400683-1aae777175f8")],
    slots: [
      { date: "2026-05-28", time: "19:30", spots_left: 7 },
      { date: "2026-06-04", time: "19:30", spots_left: 10 },
    ],
    rating: 4.7,
    review_count: 42,
  },
  {
    id: "pottery-kreis5",
    title: "Pottery für Anfänger im Atelier Kreis 5",
    category: "Workshop",
    host: "Léa Vogt, Keramikerin",
    duration: "2.5 Stunden",
    duration_hours: 2.5,
    price_per_person: 85,
    max_participants: 6,
    meeting_point: "Töpferatelier, Kreis 5",
    district: "Kreis 5",
    description:
      "An der Drehscheibe: zwei Stücke, glasiert, gebrannt und nach 14 Tagen abholbar.",
    what_included: ["Ton, Werkzeug, Glasuren", "Schürze", "Brand und Abholung"],
    vibe_tags: ["Indoor", "Casual", "Hidden Gem"],
    languages: ["DE", "EN"],
    cover_image: UNSPLASH("photo-1565193566173-7a0ee3dbe261"),
    gallery: [UNSPLASH("photo-1565193566173-7a0ee3dbe261")],
    slots: [
      { date: "2026-05-22", time: "14:00", spots_left: 4 },
      { date: "2026-05-29", time: "14:00", spots_left: 6 },
    ],
    rating: 4.9,
    review_count: 76,
  },
  {
    id: "sup-limmat",
    title: "SUP-Tour auf der Limmat bei Sonnenuntergang",
    category: "Outdoor",
    host: "Tim Walder, SUP-Coach",
    duration: "2 Stunden",
    duration_hours: 2,
    price_per_person: 65,
    max_participants: 8,
    meeting_point: "Werdinsel",
    district: "Kreis 9",
    description:
      "Vom Werdinsel-Steg flussabwärts bis zum Hauptbahnhof. Inklusive Board, Paddel und kurzer Einführung.",
    what_included: ["SUP-Board", "Paddel", "Sicherheitsweste", "Fotos"],
    vibe_tags: ["Outdoor", "Casual", "Date Night"],
    languages: ["DE", "EN"],
    cover_image: UNSPLASH("photo-1517176118179-65244903d13c"),
    gallery: [UNSPLASH("photo-1517176118179-65244903d13c")],
    slots: [
      { date: "2026-05-24", time: "19:00", spots_left: 6 },
      { date: "2026-05-31", time: "19:00", spots_left: 8 },
    ],
    rating: 4.8,
    review_count: 53,
  },
];

// ─────────────────────────────────────────────────────────────
// PULSE — 6 Events
// ─────────────────────────────────────────────────────────────

export const PULSE_EVENTS: PulseEvent[] = [
  {
    id: "founders-table",
    title: "Founders' Table — 12 Unternehmer-Dinner",
    type: "Networking-Dinner",
    datetime: "4. Juni 2026, 19:00",
    date_iso: "2026-06-04T19:00:00+02:00",
    venue: "Private Location",
    district: "Kreis 8",
    max_attendees: 12,
    current_rsvp: 9,
    description:
      "Kuratiert: 12 Unternehmer aus Tech, Finance und Design teilen ein Dinner und ehrliche Gespräche über Wachstum, Fehler und Strategie. Keine Pitches.",
    curator_notes:
      "Sorgfältig zusammengesetzt: 4 Tech-Gründer, 3 Finance, 2 Designer, 3 Unternehmer aus traditionellen Industrien.",
    industry_mix: "Tech · Finance · Design · Manufacturing",
    required_tier: "Premium",
    cover_image: UNSPLASH("photo-1414235077428-338989a2e8c0"),
  },
  {
    id: "women-tech-breakfast",
    title: "Women in Tech Breakfast — Café Henrici",
    type: "Networking-Frühstück",
    datetime: "11. Juni 2026, 08:00",
    date_iso: "2026-06-11T08:00:00+02:00",
    venue: "Café Henrici",
    district: "Kreis 1",
    max_attendees: 16,
    current_rsvp: 12,
    description:
      "Frauen aus Tech und Tech-nahen Berufen treffen sich zum Frühstück. Eine Speakerin, viel Zeit für Gespräche.",
    curator_notes: "Speakerin diesen Monat: Yvonne Bettkober, ehemals AWS DACH.",
    industry_mix: "Tech · Engineering · Product",
    required_tier: "Premium",
    cover_image: UNSPLASH("photo-1517248135467-4c7edcad34c4"),
  },
  {
    id: "fintech-insider",
    title: "Fintech-Insider-Roundtable mit ex-UBS-VP",
    type: "Industry Meetup",
    datetime: "18. Juni 2026, 18:30",
    date_iso: "2026-06-18T18:30:00+02:00",
    venue: "Private Lounge, Paradeplatz",
    district: "Kreis 1",
    max_attendees: 14,
    current_rsvp: 11,
    description:
      "Geschlossener Kreis: Fintech-Gründer, Banker, Investoren. Ein Speaker, dann offene Runde.",
    curator_notes: "Speaker diesen Monat: ex-VP Wealth Management, UBS.",
    industry_mix: "Fintech · Banking · Venture",
    required_tier: "VIP",
    cover_image: UNSPLASH("photo-1556761175-5973dc0f32e7"),
  },
  {
    id: "mastermind-2026",
    title: "Mastermind Group — Skalierung in 2026",
    type: "Mastermind",
    datetime: "Wöchentlich, Do 17:00",
    date_iso: "2026-06-25T17:00:00+02:00",
    venue: "Hybrid · Office Kreis 4",
    district: "Kreis 4",
    max_attendees: 8,
    current_rsvp: 7,
    description:
      "Geschlossene 8er-Gruppe, die sich jede Woche trifft, Probleme reviewt, Accountability lebt.",
    curator_notes: "Aufnahme nur über Empfehlung. Commitment: 6 Monate.",
    industry_mix: "Founders ARR > 1M",
    required_tier: "VIP",
    cover_image: UNSPLASH("photo-1531058020387-3be344556be6"),
  },
  {
    id: "champagner-tasting",
    title: "Private Champagner-Tasting für Members",
    type: "Kuratiertes Tasting",
    datetime: "20. Juni 2026, 20:00",
    date_iso: "2026-06-20T20:00:00+02:00",
    venue: "Private Bibliothek",
    district: "Kreis 6",
    max_attendees: 16,
    current_rsvp: 11,
    description:
      "Sechs Häuser, drei Jahrgänge, eine Sommelière. Anschliessend Käse-Pairing.",
    curator_notes: "Geleitet von Salome Kohler, MS-Kandidatin.",
    industry_mix: "Mixed",
    required_tier: "Premium",
    cover_image: UNSPLASH("photo-1481627834876-b7833e8f5570"),
  },
  {
    id: "afterwork-zuerichsee",
    title: "After-Work Drinks am Zürichsee",
    type: "Casual Member-Event",
    datetime: "27. Juni 2026, 18:30",
    date_iso: "2026-06-27T18:30:00+02:00",
    venue: "Steg Mythenquai",
    district: "Kreis 2",
    max_attendees: 30,
    current_rsvp: 19,
    description:
      "Lockerer Treff am See für alle Member. Kein Speaker, kein Format — einfach treffen.",
    curator_notes: "Premium und VIP. Casual Dresscode.",
    industry_mix: "All",
    required_tier: "Premium",
    cover_image: UNSPLASH("photo-1517248135467-4c7edcad34c4"),
  },
];

// ─────────────────────────────────────────────────────────────
// LIVE — 8 Premium-Erlebnisse
// ─────────────────────────────────────────────────────────────

export const LIVE_EVENTS: LiveEvent[] = [
  {
    id: "candlelight-coldplay",
    title: "Candlelight: Coldplay vs. Imagine Dragons im Schauspielhaus",
    type: "Candlelight Concert",
    datetime: "30. Mai 2026, 20:30",
    date_iso: "2026-05-30T20:30:00+02:00",
    venue: "Schauspielhaus Zürich, Pfauen-Bühne",
    district: "Kreis 1",
    price_range: "CHF 45–79",
    price_min: 45,
    price_max: 79,
    tickets_available: 42,
    total_capacity: 280,
    description:
      "Streichquartett-Versionen der grössten Hits beider Bands, im Schein hunderter Kerzen. 75 Minuten.",
    vibe_tags: ["Premium", "Date Night", "Magical"],
    cover_image: UNSPLASH("photo-1465847899084-d164df4dedc6"),
    gallery: [
      UNSPLASH("photo-1465847899084-d164df4dedc6"),
      UNSPLASH("photo-1514525253161-7a46d19cd819"),
      UNSPLASH("photo-1519683109079-d5f539e1542f"),
    ],
    trending: true,
  },
  {
    id: "candlelight-zimmer",
    title: "Candlelight: Hans Zimmer Tribute — Tonhalle",
    type: "Candlelight Concert",
    datetime: "12. Juni 2026, 21:00",
    date_iso: "2026-06-12T21:00:00+02:00",
    venue: "Tonhalle Zürich",
    district: "Kreis 2",
    price_range: "CHF 55–95",
    price_min: 55,
    price_max: 95,
    tickets_available: 78,
    total_capacity: 320,
    description:
      "Streichquartett spielt Inception, Interstellar, Gladiator. Saal nur Kerzenlicht.",
    vibe_tags: ["Premium", "Magical", "Date Night"],
    cover_image: UNSPLASH("photo-1519683109079-d5f539e1542f"),
    gallery: [UNSPLASH("photo-1519683109079-d5f539e1542f")],
  },
  {
    id: "van-gogh-immersive",
    title: "Van Gogh Immersive Experience — Maag Halle",
    type: "Immersive Show",
    datetime: "Tägl. ab 22. Mai, mehrere Slots",
    date_iso: "2026-05-22T18:00:00+02:00",
    venue: "Maag Halle",
    district: "Kreis 5",
    price_range: "CHF 35–62",
    price_min: 35,
    price_max: 62,
    tickets_available: 480,
    total_capacity: 600,
    description:
      "400 Werke projiziert auf 1500m². 360°-Sound, 50-minütige Erfahrung. Bring kein Handy.",
    vibe_tags: ["Cultural", "Family", "Magical"],
    cover_image: UNSPLASH("photo-1547891654-e66ed7ebb968"),
    gallery: [UNSPLASH("photo-1547891654-e66ed7ebb968")],
  },
  {
    id: "frida-photobastei",
    title: "Frida Kahlo Show — Photobastei",
    type: "Immersive Show",
    datetime: "Tägl. ab 1. Juni",
    date_iso: "2026-06-01T11:00:00+02:00",
    venue: "Photobastei",
    district: "Kreis 1",
    price_range: "CHF 28–48",
    price_min: 28,
    price_max: 48,
    tickets_available: 220,
    total_capacity: 350,
    description:
      "Multimediale Inszenierung von Frida Kahlos Leben. Originalbriefe, Fotografien, immersive Räume.",
    vibe_tags: ["Cultural", "Magical"],
    cover_image: UNSPLASH("photo-1531913764164-f85c52e6e654"),
    gallery: [UNSPLASH("photo-1531913764164-f85c52e6e654")],
  },
  {
    id: "secret-supper-river",
    title: "Geheim-Dinner mit Sterne-Koch — Location wird 24h vorher bekannt gegeben",
    type: "Pop-up Dinner",
    datetime: "6. Juni 2026, 19:00",
    date_iso: "2026-06-06T19:00:00+02:00",
    venue: "Geheim — irgendwo an der Limmat",
    district: "—",
    price_range: "CHF 189",
    price_min: 189,
    price_max: 189,
    tickets_available: 4,
    total_capacity: 32,
    description:
      "Eine Schweizer Sterneküche kocht ein 7-Gänge-Menü an einem Ort, der erst 24 Stunden vorher verraten wird.",
    vibe_tags: ["Premium", "Magical", "Fine Dining", "Hidden Gem"],
    cover_image: UNSPLASH("photo-1559339352-11d035aa65de"),
    gallery: [
      UNSPLASH("photo-1559339352-11d035aa65de"),
      UNSPLASH("photo-1414235077428-338989a2e8c0"),
    ],
    trending: true,
  },
  {
    id: "openair-cinema-casablanca",
    title: "Open-Air-Cinema am See — Casablanca",
    type: "Show",
    datetime: "13. Juni 2026, 21:30",
    date_iso: "2026-06-13T21:30:00+02:00",
    venue: "Mythenquai",
    district: "Kreis 2",
    price_range: "CHF 24",
    price_min: 24,
    price_max: 24,
    tickets_available: 320,
    total_capacity: 600,
    description:
      "Casablanca in der Originalfassung. Liegestuhl, Decke, Wein vom Caterer. Bei Regen verschoben.",
    vibe_tags: ["Outdoor", "Date Night", "Cultural"],
    cover_image: UNSPLASH("photo-1542204165-65bf26472b9b"),
    gallery: [UNSPLASH("photo-1542204165-65bf26472b9b")],
  },
  {
    id: "tarantino-marathon",
    title: "Tarantino All-Night-Marathon im Kino Riffraff",
    type: "Show",
    datetime: "21. Juni 2026, 22:00",
    date_iso: "2026-06-21T22:00:00+02:00",
    venue: "Kino Riffraff",
    district: "Kreis 5",
    price_range: "CHF 49",
    price_min: 49,
    price_max: 49,
    tickets_available: 38,
    total_capacity: 120,
    description:
      "Vier Filme bis 06:00. Pulp Fiction, Kill Bill 1 & 2, Once Upon a Time in Hollywood. Snacks inklusive.",
    vibe_tags: ["Cultural", "Casual"],
    cover_image: UNSPLASH("photo-1485846234645-a62644f84728"),
    gallery: [UNSPLASH("photo-1485846234645-a62644f84728")],
  },
  {
    id: "popup-omakase",
    title: "Pop-up Sushi-Omakase mit Tokio-Gast-Chef",
    type: "Pop-up Dinner",
    datetime: "27. Juni 2026, 19:30",
    date_iso: "2026-06-27T19:30:00+02:00",
    venue: "Privates Atelier, Kreis 8",
    district: "Kreis 8",
    price_range: "CHF 245",
    price_min: 245,
    price_max: 245,
    tickets_available: 6,
    total_capacity: 14,
    description:
      "14 Plätze an der Theke. 18 Stücke Omakase, von einem Gast-Itamae aus Tsukiji. Sake-Pairing optional.",
    vibe_tags: ["Premium", "Fine Dining", "Hidden Gem"],
    cover_image: UNSPLASH("photo-1535007813616-79dc02ba4021"),
    gallery: [UNSPLASH("photo-1535007813616-79dc02ba4021")],
  },
];

// ─────────────────────────────────────────────────────────────
// DISTRICTS
// ─────────────────────────────────────────────────────────────

export const DISTRICTS: DistrictInfo[] = [
  {
    key: "Kreis 1",
    name: "Kreis 1 — Altstadt",
    blurb: "Niederdorf, Bahnhofstrasse, Limmatquai.",
    cover: UNSPLASH("photo-1530122037265-a5f1f91d3b99"),
  },
  {
    key: "Kreis 4",
    name: "Kreis 4 — Aussersihl",
    blurb: "Langstrasse, Helvetiaplatz, Bars und Klubs.",
    cover: UNSPLASH("photo-1505761671935-60b3a7427bad"),
  },
  {
    key: "Kreis 5",
    name: "Kreis 5 — Industriequartier",
    blurb: "Schiffbau, Prime Tower, Galerien und Lofts.",
    cover: UNSPLASH("photo-1506452305024-9d3f02d1c9b5"),
  },
  {
    key: "Kreis 6",
    name: "Kreis 6 — Unterstrass",
    blurb: "Universität, Kunsthaus, ruhige Cafés.",
    cover: UNSPLASH("photo-1507608616759-54f48f0af0ee"),
  },
  {
    key: "Kreis 8",
    name: "Kreis 8 — Seefeld",
    blurb: "Seepromenade, Boutiquen, Brasserien.",
    cover: UNSPLASH("photo-1543248939-ff40856f65d4"),
  },
  {
    key: "Oerlikon",
    name: "Oerlikon",
    blurb: "Hallenstadion, MFO-Park, neue Quartiere.",
    cover: UNSPLASH("photo-1519331379826-f10be5486c6f"),
  },
];

// ─────────────────────────────────────────────────────────────
// HERO IMAGES (for slider on home)
// ─────────────────────────────────────────────────────────────

export const HERO_IMAGES = [
  UNSPLASH("photo-1538332576228-eb5b4c4de6f5"),
  UNSPLASH("photo-1558981403-c5f9899a28bc"),
  UNSPLASH("photo-1530122037265-a5f1f91d3b99"),
];

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS (Demo)
// ─────────────────────────────────────────────────────────────

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "PULS",
    text: "Sara hat auf deinen Post 'Bester Coiffeur für Locken?' geantwortet.",
    href: "/puls",
    ago: "Vor 12 min",
    unread: true,
  },
  {
    id: "n2",
    title: "STIMMEN",
    text: "Neue Initiative: '24h-Tram am Wochenende' — 2'347 Stimmen schon.",
    href: "/stimmen",
    ago: "Vor 1h",
    unread: true,
  },
  {
    id: "n3",
    title: "Erinnerung",
    text: "Dein gespeichertes Event 'Vivaldi bei Nacht' startet morgen.",
    href: "/tonight/klang-kerzenschein",
    ago: "Vor 2h",
    unread: true,
  },
  {
    id: "n4",
    title: "MARKT",
    text: "Designer-Sofa GRATIS — neue Anzeige in Kreis 8.",
    href: "/markt",
    ago: "Vor 3h",
    unread: true,
  },
  {
    id: "n5",
    title: "PULS",
    text: "Dein Post 'Sonnenuntergang Üetliberg' hat 50+ Upvotes erreicht.",
    href: "/puls",
    ago: "Vor 5h",
  },
  {
    id: "n6",
    title: "Neue Bewertungen",
    text: "3 neue Bewertungen bei Maison Manesse.",
    href: "/dine/maison-manesse",
    ago: "Vor 1d",
  },
];

// ─────────────────────────────────────────────────────────────
// PROVIDER (Landing-Page + Dashboard mock)
// ─────────────────────────────────────────────────────────────

export const PROVIDER_TESTIMONIALS: ProviderTestimonial[] = [
  {
    name: "Lukas Brunner",
    role: "Sommelier · Wein-Tastings",
    quote:
      "47 neue Buchungen in 3 Monaten — und ich musste keine einzige E-Mail verschicken. Alles läuft über die Plattform.",
    metric: "+47 Buchungen / 3 Monate",
    avatar: UNSPLASH("photo-1500648767791-00dcc994a43e"),
  },
  {
    name: "Maria Schaller",
    role: "Inhaberin · Restaurant Equi-Table",
    quote:
      "30% mehr Reservierungen, weniger No-Shows, kein Anrufstress. Genau das, was wir gesucht haben.",
    metric: "+30% Reservierungen",
    avatar: UNSPLASH("photo-1494790108377-be9c29b29330"),
  },
  {
    name: "Tom Brunner",
    role: "Workshop-Host · Pottery",
    quote:
      "Sichtbarkeit ist seit der Spotlight-Stufe verfünffacht. Jede Klasse ausgebucht, oft Warteliste.",
    metric: "5× Sichtbarkeit",
    avatar: UNSPLASH("photo-1472099645785-5658abf4ff4e"),
  },
];

export const PROVIDER_INQUIRIES: ProviderInquiry[] = [
  {
    id: "i1",
    customer: "Anna L.",
    module: "experience",
    itemTitle: "Pottery für Anfänger im Atelier Kreis 5",
    message: "Hallo, gibt es einen Termin für 4 Personen anfang Juni?",
    receivedAt: "Vor 22 min",
    status: "Neu",
  },
  {
    id: "i2",
    customer: "Tobias K.",
    module: "experience",
    itemTitle: "Pottery für Anfänger im Atelier Kreis 5",
    message: "Sind Kinder ab 10 möglich?",
    receivedAt: "Vor 3h",
    status: "Beantwortet",
  },
  {
    id: "i3",
    customer: "Sara M.",
    module: "experience",
    itemTitle: "Pottery für Anfänger im Atelier Kreis 5",
    message: "Wir würden gerne einen Geburtstag bei euch feiern, 8 Personen.",
    receivedAt: "Gestern",
    status: "Konvertiert",
  },
  {
    id: "i4",
    customer: "Mira S.",
    module: "experience",
    itemTitle: "Pottery für Anfänger im Atelier Kreis 5",
    message: "Bietet ihr Gutscheine an?",
    receivedAt: "Vor 2 Tagen",
    status: "Beantwortet",
  },
  {
    id: "i5",
    customer: "Jonas B.",
    module: "experience",
    itemTitle: "Pottery für Anfänger im Atelier Kreis 5",
    message: "Privatkurs möglich?",
    receivedAt: "Vor 4 Tagen",
    status: "Neu",
  },
];

// ─────────────────────────────────────────────────────────────
// MOCK USER DATA — bookings, reviews
// ─────────────────────────────────────────────────────────────

export const MOCK_DEMO_BOOKINGS = [
  {
    module: "live" as const,
    itemId: "candlelight-coldplay",
    itemTitle: "Candlelight: Coldplay vs. Imagine Dragons im Schauspielhaus",
    detail: "2 Tickets · CHF 158",
    status: "upcoming" as const,
    daysOffset: 18,
  },
  {
    module: "dine" as const,
    itemId: "razzia",
    itemTitle: "Razzia",
    detail: "20.04.2026 · 20:00 · 4 Personen",
    status: "past" as const,
    daysOffset: -22,
  },
  {
    module: "experience" as const,
    itemId: "geheime-schweizer-weine",
    itemTitle: "Geheime Schweizer Weine — Tasting",
    detail: "29.05.2026 · 18:30 · 2 P. · CHF 178",
    status: "cancelled" as const,
    daysOffset: 17,
  },
];

export const MY_REVIEWS: MyReview[] = [
  {
    id: "r1",
    module: "dine",
    itemId: "razzia",
    itemTitle: "Razzia",
    rating: 5,
    text: "Wundervoller Abend, Service auf den Punkt. Steak Frites wie in Paris.",
    date: "April 2026",
  },
  {
    id: "r2",
    module: "experience",
    itemId: "schoko-spruengli",
    itemTitle: "Schoko-Workshop bei Sprüngli-Veteran",
    rating: 5,
    text: "Beatrice ist unfassbar geduldig — ich konnte vorher nichts und ging mit einer Box voll Pralinen nach Hause.",
    date: "März 2026",
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

export function getTonightEvent(id: string) {
  return TONIGHT_EVENTS.find((e) => e.id === id);
}
export function getDineVenue(id: string) {
  return DINE_VENUES.find((v) => v.id === id);
}
export function getExperience(id: string) {
  return EXPERIENCES.find((e) => e.id === id);
}
export function getPulseEvent(id: string) {
  return PULSE_EVENTS.find((e) => e.id === id);
}
export function getLiveEvent(id: string) {
  return LIVE_EVENTS.find((e) => e.id === id);
}

export function searchAll(query: string) {
  if (!query) return [];
  const q = query.toLowerCase();
  const results: { module: string; id: string; title: string; href: string }[] = [];
  for (const e of TONIGHT_EVENTS) {
    if (
      e.title.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q)
    )
      results.push({ module: "Tonight", id: e.id, title: e.title, href: `/tonight/${e.id}` });
  }
  for (const v of DINE_VENUES) {
    if (
      v.name.toLowerCase().includes(q) ||
      v.cuisine.toLowerCase().includes(q) ||
      v.district.toLowerCase().includes(q)
    )
      results.push({ module: "Dine", id: v.id, title: v.name, href: `/dine/${v.id}` });
  }
  for (const e of EXPERIENCES) {
    if (e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q))
      results.push({ module: "Experience", id: e.id, title: e.title, href: `/experience/${e.id}` });
  }
  for (const e of PULSE_EVENTS) {
    if (e.title.toLowerCase().includes(q))
      results.push({ module: "Pulse", id: e.id, title: e.title, href: `/pulse/${e.id}` });
  }
  for (const e of LIVE_EVENTS) {
    if (e.title.toLowerCase().includes(q) || e.type.toLowerCase().includes(q))
      results.push({ module: "Live", id: e.id, title: e.title, href: `/live/${e.id}` });
  }
  return results.slice(0, 8);
}

export function trendingDine() {
  return DINE_VENUES.filter((v) => v.trending || (v.bookings_today ?? 0) > 30).slice(0, 5);
}

export function trendingTonight() {
  return TONIGHT_EVENTS.filter((e) => e.trending).slice(0, 3);
}

export function newlyAdded() {
  const items: { module: string; id: string; title: string; cover: string; href: string; ago: string }[] = [];
  for (const e of TONIGHT_EVENTS) if (e.added_at) items.push({ module: "Tonight", id: e.id, title: e.title, cover: e.cover_image, href: `/tonight/${e.id}`, ago: e.added_at });
  return items.slice(0, 3);
}

export function nearlySoldOut() {
  return [
    ...LIVE_EVENTS.filter((e) => e.tickets_available < 10).map((e) => ({
      module: "Live",
      id: e.id,
      title: e.title,
      cover: e.cover_image,
      href: `/live/${e.id}`,
      left: `nur ${e.tickets_available} Tickets`,
    })),
    ...TONIGHT_EVENTS.filter((e) => (e.tickets_left ?? 999) < 10).map((e) => ({
      module: "Tonight",
      id: e.id,
      title: e.title,
      cover: e.cover_image,
      href: `/tonight/${e.id}`,
      left: `nur ${e.tickets_left} Plätze`,
    })),
  ].slice(0, 3);
}

export const SEARCH_SUGGESTIONS = [
  "Sushi",
  "Konzert heute",
  "Date Night",
  "Vivaldi",
  "Rooftop",
  "Workshop",
  "WG Kreis 5",
  "24h-Tram",
  "Glace-Laden",
];

// ─────────────────────────────────────────────────────────────
// PHASE 3 — COMMUNITY LAYER
// ─────────────────────────────────────────────────────────────

const AVATAR = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f7f2ea,efe7d8,fdfaf3`;

export const PULS_DISTRICTS = [
  "Alle",
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

export const PULS_POST_TYPES = [
  { key: "spot-tipp", label: "Spot-Tipp", icon: "📍" },
  { key: "frage", label: "Frage an die Stadt", icon: "❓" },
  { key: "live-update", label: "Live-Update", icon: "🚨" },
  { key: "erlebnis", label: "Erlebnis-Bericht", icon: "🎉" },
  { key: "beobachtung", label: "Stadt-Beobachtung", icon: "💡" },
  { key: "einladung", label: "Spontane Einladung", icon: "🍻" },
  { key: "foto", label: "Foto-Moment", icon: "📸" },
  { key: "diskussion", label: "Diskussion", icon: "🗣" },
] as const;

export const PULS_TAGS = [
  "foodtipp",
  "frage",
  "livenow",
  "foto",
  "spontan",
  "kultur",
  "sport",
  "stadtleben",
  "kreis1",
  "kreis4",
  "kreis5",
  "kreis8",
  "brunch",
  "wein",
  "kunst",
  "wandern",
  "tram",
  "fcz",
  "wgsuche",
  "networking",
  "stadtpolitik",
  "klima",
];

// ─────────────────────────────────────────────────────────────
// PULS — 25 Posts
// ─────────────────────────────────────────────────────────────

export const PULS_POSTS: PulsPost[] = [
  {
    id: "p1",
    author: "SaraVomKreis5",
    avatar: AVATAR("SaraVomKreis5"),
    district: "Kreis 5",
    ago: "vor 12 Min",
    type: "spot-tipp",
    text:
      "Habe heute das neue Brunch-Café an der Hardstrasse entdeckt — 'Daphne & Sons'. Aprikosen-Croissants sind WAHNSINN. Ohne Reservation kommt ihr Samstag nicht rein. Geheim-Tipp!",
    tags: ["foodtipp", "kreis5", "brunch"],
    upvotes: 47,
    comments_count: 12,
    badge: "verified",
    hot: true,
    comments: [
      {
        id: "p1c1",
        author: "BrunchQueenZH",
        district: "Kreis 5",
        ago: "vor 8 Min",
        text: "Ich war gestern dort — die Eier Benedict sind auch top!",
        upvotes: 8,
        avatar: AVATAR("BrunchQueenZH"),
      },
      {
        id: "p1c2",
        author: "FoodieMarc",
        district: "Kreis 4",
        ago: "vor 5 Min",
        text: "Preise?",
        upvotes: 2,
        avatar: AVATAR("FoodieMarc"),
      },
    ],
  },
  {
    id: "p2",
    author: "TomZH",
    avatar: AVATAR("TomZH"),
    district: "Kreis 4",
    ago: "vor 28 Min",
    type: "frage",
    text:
      "Bester Coiffeur für Männer mit Locken in Zürich? Brauche jemanden, der versteht, was 'volumengerecht' bedeutet. Empfehlungen?",
    tags: ["frage", "grooming"],
    upvotes: 23,
    comments_count: 31,
    hot: true,
  },
  {
    id: "p3",
    author: "LisaVeloKurier",
    avatar: AVATAR("LisaVeloKurier"),
    district: "Kreis 1",
    ago: "vor 1h",
    type: "live-update",
    text:
      "Achtung: Bellevue komplett dicht wegen Demo. Tram 4/15/2 unterbrochen. Velo via Stadelhofen ausweichen. Update: bisher friedlich.",
    tags: ["livenow", "verkehr", "bellevue"],
    upvotes: 156,
    comments_count: 24,
    badge: "local-hero",
    hot: true,
  },
  {
    id: "p4",
    author: "MarcDerZuger",
    avatar: AVATAR("MarcDerZuger"),
    district: "Kreis 6",
    ago: "vor 2h",
    type: "erlebnis",
    text:
      "Gestern beim Candlelight-Konzert im Schauspielhaus — wirklich magisch. Hatte Erwartungen, wurde übertroffen. Wer Date-Night sucht: das ist es.",
    tags: ["erlebnis", "konzert", "datenight"],
    upvotes: 89,
    comments_count: 14,
    badge: "verified",
    link: {
      module: "tonight",
      id: "klang-kerzenschein",
      label: "Vivaldi bei Nacht",
    },
  },
  {
    id: "p5",
    author: "ZHpapa37",
    avatar: AVATAR("ZHpapa37"),
    district: "Oerlikon",
    ago: "vor 3h",
    type: "frage",
    text:
      "Wo geht ihr mit 2-jährigen Kindern hin, wenn's regnet? Indoor-Tipps ausser Technorama? FIFA-Museum? Tropenhaus? Brauche Inspiration.",
    tags: ["familie", "regentag", "kinder"],
    upvotes: 67,
    comments_count: 42,
  },
  {
    id: "p6",
    author: "JonasDer8er",
    avatar: AVATAR("JonasDer8er"),
    district: "Kreis 8",
    ago: "vor 4h",
    type: "einladung",
    text:
      "Wer kommt heute 19:00 zum Pingpong-Tisch am Idaplatz? Bringe Bier. Open für alle. Erstmal 3-4 Leute zum Anfangen.",
    tags: ["spontan", "kreis8", "pingpong"],
    upvotes: 34,
    comments_count: 8,
    badge: "verified",
  },
  {
    id: "p7",
    author: "AnnaUrbanist",
    avatar: AVATAR("AnnaUrbanist"),
    district: "Kreis 4",
    ago: "vor 5h",
    type: "beobachtung",
    text:
      "Habt ihr gemerkt, dass das alte Globus-Gebäude an der Bahnhofstrasse seit Monaten leer steht? Was passiert da eigentlich? Jemand Infos?",
    tags: ["stadtbeobachtung", "bahnhofstrasse"],
    upvotes: 213,
    comments_count: 67,
    badge: "local-hero",
    top_week: true,
    hot: true,
  },
  {
    id: "p8",
    author: "FotoFrankZH",
    avatar: AVATAR("FotoFrankZH"),
    district: "Kreis 12",
    ago: "vor 6h",
    type: "foto",
    text: "Sonnenuntergang heute am Üetliberg — Worte fehlen mir.",
    tags: ["foto", "ueetliberg", "sunset"],
    upvotes: 412,
    comments_count: 23,
    badge: "local-hero",
    image: UNSPLASH("photo-1506452305024-9d3f02d1c9b5"),
    top_week: true,
    hot: true,
  },
  {
    id: "p9",
    author: "MailaTakipci",
    avatar: AVATAR("MailaTakipci"),
    district: "Kreis 4",
    ago: "vor 8h",
    type: "spot-tipp",
    text:
      "Türkisches Frühstück im Mavi Café (Langstrasse Nähe Hardplatz) ist ABSURD GUT. Die Sucuk-Eier… genug gesagt. Auch sonntags offen.",
    tags: ["foodtipp", "langstrasse", "fruehstueck", "tuerkisch"],
    upvotes: 78,
    comments_count: 19,
    badge: "verified",
  },
  {
    id: "p10",
    author: "SunnyExpatNYC",
    avatar: AVATAR("SunnyExpatNYC"),
    district: "Kreis 5",
    ago: "vor 12h",
    type: "frage",
    text:
      "Bin seit 3 Monaten in Zürich. Wo findet man echte Zürcher Locals, nicht nur andere Expats? Vereine? Run-Clubs? Suche Empfehlungen.",
    tags: ["expat", "neuhier", "community"],
    upvotes: 145,
    comments_count: 89,
  },
  {
    id: "p11",
    author: "VeloPolitikerin",
    avatar: AVATAR("VeloPolitikerin"),
    district: "Kreis 1",
    ago: "vor 14h",
    type: "diskussion",
    text:
      "Stadtrat-Sitzung hat gerade entschieden: neue Velo-Schnellstrasse zwischen Hardbrücke und Stauffacher. Eure Meinungen?",
    tags: ["stadtpolitik", "velo"],
    upvotes: 387,
    comments_count: 152,
    badge: "stadt-stimme",
    top_week: true,
  },
  {
    id: "p12",
    author: "WeinSommelier_LB",
    avatar: AVATAR("WeinSommelier_LB"),
    district: "Kreis 1",
    ago: "vor 16h",
    type: "spot-tipp",
    text:
      "Aktuell unterbewertet: Restaurant 'Cardinal' in der Altstadt. Junges Team, Schweizer Naturweine, faire Preise. Insider-Tipp bevor's voll wird.",
    tags: ["foodtipp", "wein", "altstadt"],
    upvotes: 92,
    comments_count: 28,
    badge: "verified",
  },
  {
    id: "p13",
    author: "MoutainGuy",
    avatar: AVATAR("MoutainGuy"),
    district: "Kreis 6",
    ago: "vor 18h",
    type: "einladung",
    text:
      "Samstag 7:00 Üetliberg-Wanderung. Treffpunkt Hauptbahnhof. Wer Bock hat, alle Levels willkommen. Wandere langsam, viel quatschen.",
    tags: ["spontan", "wandern", "samstag"],
    upvotes: 56,
    comments_count: 23,
  },
  {
    id: "p14",
    author: "KunstAdaZH",
    avatar: AVATAR("KunstAdaZH"),
    district: "Kreis 4",
    ago: "vor 20h",
    type: "spot-tipp",
    text:
      "Tipp für Kunst-Junkies: Galerie Maag (Kreis 5) hat aktuell Show von Roman Signer. Kostenloser Eintritt, kleines Künstlergespräch Donnerstag um 18:00.",
    tags: ["kunst", "kreis5", "ausstellung"],
    upvotes: 41,
    comments_count: 6,
    badge: "verified",
  },
  {
    id: "p15",
    author: "FCZSupporter",
    avatar: AVATAR("FCZSupporter"),
    district: "Kreis 4",
    ago: "vor 22h",
    type: "live-update",
    text: "FCZ heute 1:0 gegen Servette! Letzigrund kocht. Hopp Züri!",
    tags: ["fcz", "fussball", "live"],
    upvotes: 234,
    comments_count: 67,
  },
  {
    id: "p16",
    author: "StreetFoodLisa",
    avatar: AVATAR("StreetFoodLisa"),
    district: "Kreis 5",
    ago: "vor 1 Tag",
    type: "beobachtung",
    text:
      "Habe gemerkt: alle drei neuen Restaurants im Kreis 5 sind asiatisch. Trend? Oder Zufall? Was glaubt ihr — welche Küche fehlt noch in Zürich?",
    tags: ["foodscene", "trend"],
    upvotes: 178,
    comments_count: 94,
  },
  {
    id: "p17",
    author: "RentRefugee",
    avatar: AVATAR("RentRefugee"),
    district: "Kreis 3",
    ago: "vor 1 Tag",
    type: "frage",
    text:
      "Verrückte WG-Suche: Wohne in Untermiete in Kreis 3, muss raus bis Juli. Realistisches Budget 1'400. Tipps wo suchen ausser Tutti?",
    tags: ["wohnen", "wgsuche"],
    upvotes: 67,
    comments_count: 31,
  },
  {
    id: "p18",
    author: "PapaJoeBern",
    avatar: AVATAR("PapaJoeBern"),
    district: "Kreis 7",
    ago: "vor 1 Tag",
    type: "spot-tipp",
    text:
      "Eltern: Spielplatz Burgwies in Kreis 7 ist komplett neu renoviert, mit grossem Wasserspiel-Bereich. Kinder bleiben 3+ Stunden, versprochen.",
    tags: ["familie", "kreis7", "spielplatz"],
    upvotes: 124,
    comments_count: 38,
    badge: "verified",
  },
  {
    id: "p19",
    author: "TechFounderNick",
    avatar: AVATAR("TechFounderNick"),
    district: "Kreis 5",
    ago: "vor 2 Tage",
    type: "einladung",
    text:
      "Founders + Tech-Leute in Zürich: Donnerstag 18:00 informeller Drink im Frau Gerolds Garten. Keine Pitches, einfach quatschen. Wer Bock hat, kommt.",
    tags: ["networking", "tech", "spontan"],
    upvotes: 89,
    comments_count: 27,
    badge: "verified",
  },
  {
    id: "p20",
    author: "TramFahrerinSophie",
    avatar: AVATAR("TramFahrerinSophie"),
    district: "Kreis 9",
    ago: "vor 2 Tage",
    type: "beobachtung",
    text:
      "Aus dem Tram-Cockpit: Heute viele Touristen, die nicht wissen, dass Tram 4 Richtung Werdhölzli geht. Vielleicht braucht's bessere Beschriftung beim HB?",
    tags: ["tram", "stadtleben"],
    upvotes: 312,
    comments_count: 41,
    badge: "local-hero",
    top_week: true,
  },
  {
    id: "p21",
    author: "KaffeeAnnouncer",
    avatar: AVATAR("KaffeeAnnouncer"),
    district: "Kreis 1",
    ago: "vor 2 Tage",
    type: "foto",
    text:
      "Erster Cappuccino bei Acid in der Altstadt. Latte-Art-Game stark. Bohnen aus Äthiopien. Ich bin verliebt.",
    tags: ["kaffee", "altstadt", "foto"],
    upvotes: 76,
    comments_count: 14,
    image: UNSPLASH("photo-1495474472287-4d71bcdd2085"),
  },
  {
    id: "p22",
    author: "LehrerinZH",
    avatar: AVATAR("LehrerinZH"),
    district: "Schwamendingen",
    ago: "vor 3 Tage",
    type: "diskussion",
    text:
      "Eure Erfahrung: Zürcher Schulsystem aus Eltern-Sicht — was funktioniert, was nicht?",
    tags: ["schule", "stadtpolitik"],
    upvotes: 167,
    comments_count: 113,
    badge: "verified",
  },
  {
    id: "p23",
    author: "JazzliebhaberMartin",
    avatar: AVATAR("JazzliebhaberMartin"),
    district: "Kreis 5",
    ago: "vor 3 Tage",
    type: "spot-tipp",
    text:
      "Donnerstag jam-session im Moods, ab 22:00, freier Eintritt. Mein Lieblings-Ritual diese Saison. Trio aus Lyon, einfach kommen.",
    tags: ["jazz", "musik", "kreis5"],
    upvotes: 52,
    comments_count: 8,
  },
  {
    id: "p24",
    author: "RunClubZH",
    avatar: AVATAR("RunClubZH"),
    district: "Kreis 8",
    ago: "vor 3 Tage",
    type: "einladung",
    text:
      "Suchen Mitläufer für unseren Donnerstagslauf am Zürichsee. Tempo 6-7min/km, 8-10km. Alle Levels willkommen. Treffpunkt Bürkliplatz 18:30.",
    tags: ["laufen", "sport", "spontan"],
    upvotes: 67,
    comments_count: 22,
    badge: "verified",
  },
  {
    id: "p25",
    author: "DesignBureauX",
    avatar: AVATAR("DesignBureauX"),
    district: "Kreis 4",
    ago: "vor 4 Tage",
    type: "frage",
    text:
      "Welche Schweizer Hardware-Firma kann uns Prototyp-Teile in Kleinmenge liefern (50 Stück, gefräste Aluteile)? Empfehlungen?",
    tags: ["business", "handwerk"],
    upvotes: 23,
    comments_count: 17,
  },
];

export const PULS_TRENDING_SIDEBAR = [
  { title: "Globus-Gebäude steht leer", tag: "stadtbeobachtung", upvotes: 213, postId: "p7" },
  { title: "Neue Velo-Schnellstrasse", tag: "stadtpolitik", upvotes: 387, postId: "p11" },
  { title: "Sonnenuntergang Üetliberg", tag: "foto", upvotes: 412, postId: "p8" },
  { title: "Türkisches Frühstück Mavi Café", tag: "foodtipp", upvotes: 78, postId: "p9" },
  { title: "Coiffeur für Locken?", tag: "frage", upvotes: 31, postId: "p2" },
];

export const PULS_ACTIVE_NOW = 1247;
export const PULS_WEEK_STATS = { posts: 8934, comments: 32107 };

// ─────────────────────────────────────────────────────────────
// MARKT — 18 Anzeigen über 10 Kategorien
// ─────────────────────────────────────────────────────────────

export const MARKT_CATEGORIES = [
  { key: "wohnen", label: "WG / Wohnen", icon: "🏠", count: 47 },
  { key: "jobs", label: "Lokale Jobs", icon: "💼", count: 23 },
  { key: "moebel", label: "Möbel / Sachen", icon: "🛋", count: 89 },
  { key: "mitfahr", label: "Mitfahrgelegenheiten", icon: "🚗", count: 12 },
  { key: "haustier", label: "Haustier-Sitting", icon: "🐕", count: 18 },
  { key: "tickets", label: "Ticket-Tausch", icon: "🎟", count: 6 },
  { key: "freunde", label: "Freunde / Gleichgesinnte", icon: "👫", count: 34 },
  { key: "dienstleistungen", label: "Dienstleistungen", icon: "🛠", count: 52 },
  { key: "verschenken", label: "Verschenken / Tauschen", icon: "🎁", count: 29 },
  { key: "lernen", label: "Lernen / Workshops", icon: "📚", count: 15 },
] as const;

export const MARKT_LISTINGS: MarktListing[] = [
  // WG / WOHNEN (3)
  {
    id: "m1",
    category: "wohnen",
    title: "Helles WG-Zimmer Kreis 5, 1'350 CHF, ab Juli",
    description:
      "Suchen entspannten Mitbewohner ab 1. Juli. WG mit 2 Mädels (Designerinnen), Altbau, riesige Küche, Balkon. Tram 4 vor der Tür.",
    author: "MarinaWG",
    avatar: AVATAR("MarinaWG"),
    rating: 4.8,
    rating_count: 12,
    district: "Kreis 5",
    ago: "vor 2h",
    expires: "in 3 Wochen",
    price: "CHF 1'350 / Monat",
    images: [
      UNSPLASH("photo-1522708323590-d24dbb6b0267"),
      UNSPLASH("photo-1505691938895-1758d7feb511"),
    ],
    badge: "verified",
  },
  {
    id: "m2",
    category: "wohnen",
    title: "Wohnungstausch: Kreis 4 ↔ Kreis 6 für 3 Monate",
    description:
      "Habe 2.5 Zimmer in Kreis 6, suche temporären Tausch in Kreis 4 wegen Sabbatical. Juli-September.",
    author: "TauschKurt",
    avatar: AVATAR("TauschKurt"),
    district: "Kreis 6",
    ago: "vor 1 Tag",
    expires: "in 1 Woche",
    images: [UNSPLASH("photo-1502672260266-1c1ef2d93688")],
    badge: "verified",
  },
  {
    id: "m3",
    category: "wohnen",
    title: "Möbliertes Studio kurzfristig, 1'800/Monat",
    description: "Voll möbliert, sofort beziehbar, 1 Monat min. Ideal für Übergang.",
    author: "LandlordZH",
    avatar: AVATAR("LandlordZH"),
    district: "Oerlikon",
    ago: "vor 3 Tage",
    expires: "in 5 Tage",
    price: "CHF 1'800 / Monat",
    images: [UNSPLASH("photo-1493809842364-78817add7ffb")],
  },

  // JOBS (3)
  {
    id: "m4",
    category: "jobs",
    title: "Babysitter für Freitag-Abende, Kreis 7, 30 CHF/h",
    description:
      "Erfahrene Babysitterin gesucht für 2-jähriges Mädchen. Alle 2 Wochen freitags 19-23 Uhr. Referenzen bitte.",
    author: "MamaSandra",
    avatar: AVATAR("MamaSandra"),
    district: "Kreis 7",
    ago: "vor 4h",
    expires: "in 2 Wochen",
    price: "CHF 30 / Stunde",
    badge: "verified",
  },
  {
    id: "m5",
    category: "jobs",
    title: "Suche Aushilfe für Coffee-Shop Kreis 4, Wochenenden",
    description: "Sa+So je 8h. CHF 25/h. Erfahrung nice-to-have, kein Muss.",
    author: "CoffeeKreis4",
    avatar: AVATAR("CoffeeKreis4"),
    district: "Kreis 4",
    ago: "vor 1 Tag",
    expires: "in 2 Wochen",
    price: "CHF 25 / Stunde",
  },
  {
    id: "m6",
    category: "jobs",
    title: "Foto-Editor für lokale Brand, Projektbasis",
    description:
      "Brauchen jemanden für Bildbearbeitung (10-15 Bilder/Woche). Lightroom-Erfahrung. CHF 80/h.",
    author: "BrandManagerY",
    avatar: AVATAR("BrandManagerY"),
    district: "Kreis 5",
    ago: "vor 2 Tage",
    expires: "in 1 Woche",
    price: "CHF 80 / Stunde",
  },

  // MÖBEL (3)
  {
    id: "m7",
    category: "verschenken",
    title: "Designer-Sofa von Vitra GRATIS — nur Abholung",
    description:
      "Ziehe nach Bern, Vitra-Sofa (Polder-Modell) kommt nicht mit. Kostet neu 4'500, abzugeben gratis bei Selbstabholung. Erste bekommt.",
    author: "MovingOut",
    avatar: AVATAR("MovingOut"),
    rating: 5.0,
    rating_count: 8,
    district: "Kreis 8",
    ago: "vor 3h",
    expires: "in 2 Tage",
    price: "Gratis",
    images: [UNSPLASH("photo-1555041469-a586c61ea9bc")],
    badge: "local-hero",
  },
  {
    id: "m8",
    category: "moebel",
    title: "Vintage-Hifi-Anlage Marantz, 450 CHF",
    description: "Marantz 2230 Receiver + 2 Lautsprecher. Voll funktional, klingt warm.",
    author: "HifiNerd",
    avatar: AVATAR("HifiNerd"),
    district: "Kreis 6",
    ago: "vor 1 Tag",
    expires: "in 2 Wochen",
    price: "CHF 450",
    images: [UNSPLASH("photo-1545454675-3531b543be5d")],
  },
  {
    id: "m9",
    category: "moebel",
    title: "Velorahmen Bianchi, gebraucht, 280 CHF",
    description: "Stahlrahmen, 56cm, gut erhalten. Inkl. Gabel.",
    author: "CycleKurt",
    avatar: AVATAR("CycleKurt"),
    district: "Kreis 4",
    ago: "vor 2 Tage",
    expires: "in 1 Woche",
    price: "CHF 280",
    images: [UNSPLASH("photo-1532298229144-0ec0c57515c7")],
  },

  // MITFAHR (2)
  {
    id: "m10",
    category: "mitfahr",
    title: "Freitag nach Genf, 2 Plätze frei, 40 CHF/Platz",
    description:
      "Fahre Freitag 17:00 ab HB-Parking. Komme Sonntag-Abend zurück. 2 Plätze frei.",
    author: "WeekendDriver",
    avatar: AVATAR("WeekendDriver"),
    district: "Kreis 1",
    ago: "vor 5h",
    expires: "in 3 Tage",
    price: "CHF 40 / Platz",
  },
  {
    id: "m11",
    category: "mitfahr",
    title: "Tessin am Wochenende — wer kommt mit?",
    description: "Lugano-Trip, suche 2-3 Mitfahrer. Teilen Benzin + Maut.",
    author: "TessinFan",
    avatar: AVATAR("TessinFan"),
    district: "Kreis 5",
    ago: "vor 1 Tag",
    expires: "in 4 Tage",
  },

  // HAUSTIER (2)
  {
    id: "m12",
    category: "haustier",
    title: "Suche zuverlässige Hund-Walker für Mo-Fr, 12-13 Uhr",
    description: "Berner Sennenhund, super lieb, braucht Mittagspause-Walk.",
    author: "DogParentZH",
    avatar: AVATAR("DogParentZH"),
    district: "Kreis 8",
    ago: "vor 6h",
    expires: "in 2 Wochen",
    price: "CHF 25 / Walk",
    badge: "verified",
  },
  {
    id: "m13",
    category: "haustier",
    title: "Biete Katzen-Sitting in eurer Wohnung, 20 CHF/Tag",
    description: "Studentin, sehr katzenerfahren, Referenzen vorhanden.",
    author: "CatLover_Sara",
    avatar: AVATAR("CatLover_Sara"),
    rating: 4.9,
    rating_count: 23,
    district: "Kreis 5",
    ago: "vor 2 Tage",
    expires: "laufend",
    price: "CHF 20 / Tag",
  },

  // TICKETS (1)
  {
    id: "m14",
    category: "tickets",
    title: "2 FCZ-Tickets Sonntag, Original 50, jetzt 35",
    description: "Können nicht hin, Block C, Original-Tickets.",
    author: "FCZFan",
    avatar: AVATAR("FCZFan"),
    district: "Kreis 4",
    ago: "vor 1h",
    expires: "in 2 Tage",
    price: "CHF 35 / Ticket",
  },

  // FREUNDE (2)
  {
    id: "m15",
    category: "freunde",
    title: "Neu in Zürich, suche Lauf-Buddy für Sonntags-Lange-Läufe",
    description:
      "30J, M, ziehe gerade aus Hamburg um. Suche jemanden 30-40 für sonntägliche 15-20km Läufe. Tempo 5min/km.",
    author: "NewbieFromDE",
    avatar: AVATAR("NewbieFromDE"),
    district: "Kreis 5",
    ago: "vor 2 Tage",
    expires: "laufend",
  },
  {
    id: "m16",
    category: "freunde",
    title: "Suche Tandem-Partner Deutsch ↔ Italienisch",
    description: "Italienische Muttersprachlerin, will Deutsch üben. 1×/Woche, Café Treffen.",
    author: "CiaoFromMilan",
    avatar: AVATAR("CiaoFromMilan"),
    district: "Kreis 4",
    ago: "vor 3 Tage",
    expires: "laufend",
  },

  // DIENSTLEISTUNGEN (2)
  {
    id: "m17",
    category: "dienstleistungen",
    title: "Bin Yoga-Lehrerin, biete Privat-Stunden bei dir zu Hause",
    description: "Hatha + Vinyasa, 90 CHF/Stunde, alle Levels",
    author: "YogaWithAna",
    avatar: AVATAR("YogaWithAna"),
    rating: 5.0,
    rating_count: 34,
    district: "Kreis 6",
    ago: "vor 1 Tag",
    expires: "laufend",
    price: "CHF 90 / Stunde",
    badge: "local-hero",
  },
  {
    id: "m18",
    category: "dienstleistungen",
    title: "Schreinerarbeiten und Möbel-Reparaturen, fair und schnell",
    description:
      "20 Jahre Erfahrung, Möbel-Restauration, Einbauten, Reparaturen. Faire Preise, Festpreis-Angebot.",
    author: "SchreinerZH",
    avatar: AVATAR("SchreinerZH"),
    rating: 4.7,
    rating_count: 47,
    district: "Kreis 9",
    ago: "vor 4 Tage",
    expires: "laufend",
    badge: "verified",
  },
];

// ─────────────────────────────────────────────────────────────
// STIMMEN — Tab 1: Frage des Tages
// ─────────────────────────────────────────────────────────────

export const DAILY_POLL: DailyPoll = {
  id: "poll-2026-05-12",
  question: "Bester Glace-Laden Zürichs?",
  date: "Heute · 12. Mai 2026",
  options: [
    { id: "o1", label: "Movenpick Bahnhofstrasse", votes: 1247, emoji: "🍦" },
    { id: "o2", label: "Gelati Da Mimmo (Kreis 4)", votes: 2089, emoji: "🍦" },
    { id: "o3", label: "Mr. Lee Ice Cream (Kreis 5)", votes: 978, emoji: "🍦" },
    { id: "o4", label: "Sprüngli", votes: 487, emoji: "🍦" },
    { id: "o5", label: "Cremeria di Eros (Kreis 1)", votes: 652, emoji: "🍦" },
  ],
};

export const PAST_POLLS = [
  { id: "pp1", question: "9-Uhr-Tram am Wochenende: ja oder nein?", winner: "Ja", winner_pct: 67 },
  { id: "pp2", question: "Welcher Stadtteil hat beste Cafészene?", winner: "Kreis 5", winner_pct: 41 },
  { id: "pp3", question: "Würdest du Zürich-Grundeinkommen unterstützen?", winner: "Ja", winner_pct: 54 },
  { id: "pp4", question: "Beste Schwimmbar im Sommer?", winner: "Frauenbad", winner_pct: 38 },
];

// ─────────────────────────────────────────────────────────────
// STIMMEN — Tab 2: Initiativen & Debatten
// ─────────────────────────────────────────────────────────────

export const INITIATIVES: InitiativeItem[] = [
  {
    id: "i1",
    type: "petition",
    title: "24h-Tram zwischen Niederdorf und HB am Wochenende",
    author: "StadtNachtleben",
    avatar: AVATAR("StadtNachtleben"),
    ago: "vor 5 Tagen",
    upvotes: 2347,
    comments_count: 234,
    supporters: 1847,
    description:
      "Andere Städte haben es. Warum nicht Zürich? Wir verlieren Nachtleben an Zug, Basel, sogar Winterthur. Ein 24h-Tram am Wochenende zwischen Niederdorf und HB würde die Stadt wieder ins Bewegung bringen.",
    pro: [
      "Mehr Sicherheit nachts (weniger Auto-Verkehr)",
      "Mehr Nachtleben in der Stadt",
      "Anschluss an Nachtbus-Linien",
    ],
    contra: [
      "Kosten für VBZ",
      "Lärm in Wohnquartieren",
    ],
  },
  {
    id: "i2",
    type: "debatte",
    title: "Bahnhofplatz-Neugestaltung — was haltet ihr?",
    author: "VeloPolitikerin",
    avatar: AVATAR("VeloPolitikerin"),
    ago: "vor 1 Woche",
    upvotes: 1892,
    comments_count: 432,
    description:
      "Die geplante Neugestaltung sieht weniger Tram-Spuren und mehr Fussgängerzone vor. Sinnvoll oder zu radikal?",
  },
  {
    id: "i3",
    type: "initiative",
    title: "Mehr Velo-Wege in Kreis 4",
    author: "VeloKurierin",
    avatar: AVATAR("VeloKurierin"),
    ago: "vor 1 Woche",
    upvotes: 1456,
    comments_count: 167,
    supporters: 1234,
    description:
      "Kreis 4 hat die schlechteste Velo-Infrastruktur der Innenstadt. Wir fordern: 2 neue Velo-Schnellrouten bis 2028.",
  },
  {
    id: "i4",
    type: "petition",
    title: "Späterer Club-Schluss am Wochenende",
    author: "NachtklubKlaus",
    avatar: AVATAR("NachtklubKlaus"),
    ago: "vor 2 Wochen",
    upvotes: 3012,
    comments_count: 521,
    supporters: 2487,
    description:
      "Aktuell schliesst Zürich um 04:00. Petition für 06:00 am Wochenende — wie in fast jeder europäischen Hauptstadt.",
  },
  {
    id: "i5",
    type: "debatte",
    title: "Restaurant-Preise in Zürich — angemessen oder Wucher?",
    author: "PreisDetektiv",
    avatar: AVATAR("PreisDetektiv"),
    ago: "vor 2 Wochen",
    upvotes: 887,
    comments_count: 312,
    description:
      "Pizza für 28 CHF, Hauptgang für 45 CHF. Sind das gerechtfertigte Preise oder zu viel?",
  },
  {
    id: "i6",
    type: "initiative",
    title: "Kostenloses ZVV-Ticket für unter 25-Jährige",
    author: "JungeZuercherin",
    avatar: AVATAR("JungeZuercherin"),
    ago: "vor 3 Wochen",
    upvotes: 1743,
    comments_count: 198,
    supporters: 1389,
    description:
      "Junge Menschen sollen die Stadt erfahren können — unabhängig vom Geldbeutel. Kostenloses ZVV für unter 25.",
  },
  {
    id: "i7",
    type: "diskussion",
    title: "Wo soll Zürich in 10 Jahren stehen?",
    author: "StadtVisionärin",
    avatar: AVATAR("StadtVisionärin"),
    ago: "vor 3 Wochen",
    upvotes: 612,
    comments_count: 287,
    description:
      "Offene Frage an alle: Wie soll Zürich 2036 aussehen? Mehr Grün? Weniger Banken? Mehr Tech? Wir sammeln Visionen.",
  },
  {
    id: "i8",
    type: "petition",
    title: "Mehr Bäume in Kreis 4-5 (Hitzeinseln)",
    author: "KlimaAktivistin",
    avatar: AVATAR("KlimaAktivistin"),
    ago: "vor 1 Monat",
    upvotes: 2108,
    comments_count: 145,
    supporters: 1672,
    description:
      "Kreis 4 und 5 sind im Sommer extreme Hitzeinseln. Wir fordern 500 neue Bäume in den nächsten 3 Jahren.",
  },
];

// ─────────────────────────────────────────────────────────────
// STIMMEN — Tab 3: Zürich-Index
// ─────────────────────────────────────────────────────────────

export const QUALITY_INDEX = {
  score: 7.4,
  trend: 0.2,
  submissions: 4231,
};

export const SAFETY_BY_DISTRICT = [
  { name: "Kreis 1", score: 8.2, trend: 0 },
  { name: "Kreis 4", score: 6.8, trend: -0.3 },
  { name: "Kreis 5", score: 7.4, trend: 0.1 },
  { name: "Kreis 6", score: 8.1, trend: 0 },
  { name: "Kreis 7", score: 8.5, trend: 0.2 },
  { name: "Kreis 8", score: 8.0, trend: 0 },
  { name: "Oerlikon", score: 7.2, trend: -0.1 },
];

export const RESTAURANT_BY_DISTRICT = [
  { name: "Kreis 1", rating: 4.3, reviews: 143 },
  { name: "Kreis 4", rating: 4.5, reviews: 287 },
  { name: "Kreis 5", rating: 4.6, reviews: 412 },
  { name: "Kreis 8", rating: 4.4, reviews: 98 },
];

export const TOP_TAGS = [
  { tag: "wohnungssuche", count: 398 },
  { tag: "verkehr", count: 267 },
  { tag: "foodtipp", count: 256 },
  { tag: "stadtpolitik", count: 189 },
  { tag: "wetter", count: 167 },
  { tag: "kunst", count: 143 },
  { tag: "sport", count: 122 },
  { tag: "kreis5", count: 108 },
];

export const MOOD_BAROMETER = { positive: 67, neutral: 23, negative: 10 };

// ─────────────────────────────────────────────────────────────
// Demo-Profile + Achievements
// ─────────────────────────────────────────────────────────────

export const DEMO_PROFILE = {
  username: "DemoZuercher",
  district: "Kreis 5",
  karma: 247,
  member_since: "März 2026",
  posts: 12,
  comments: 38,
  listings: 6,
  verification: "verified" as const,
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", label: "Erster Post", desc: "Du hast deinen ersten Post veröffentlicht.", unlocked: true, emoji: "🏆" },
  { id: "a2", label: "10 Upvotes erhalten", desc: "Deine Posts wurden 10× hochgevoted.", unlocked: true, emoji: "🏆" },
  { id: "a3", label: "100 Kommentare gepostet", desc: "Du bist aktiv in der Community.", unlocked: false, emoji: "🏆" },
  { id: "a4", label: "Local Hero", desc: "50+ Karma — du bist anerkannt.", unlocked: true, emoji: "🏅" },
  { id: "a5", label: "Stadt-Stimme", desc: "Verifiziert als Quartier-Vertreter.", unlocked: false, emoji: "🥈" },
  { id: "a6", label: "Foto-Star", desc: "Foto-Post mit 100+ Upvotes.", unlocked: false, emoji: "📸" },
];

// ─────────────────────────────────────────────────────────────
// Helpers (Phase 3)
// ─────────────────────────────────────────────────────────────

export function getPulsPost(id: string) {
  return PULS_POSTS.find((p) => p.id === id);
}

export function getMarktListing(id: string) {
  return MARKT_LISTINGS.find((l) => l.id === id);
}

export function getInitiative(id: string) {
  return INITIATIVES.find((i) => i.id === id);
}

// ─────────────────────────────────────────────────────────────
// PHASE 4 — ENTDECKEN (Events) + ORTE (Places)
// ─────────────────────────────────────────────────────────────

const TODAY_ISO = "2026-05-12T00:00:00+02:00";

function inferBucket(iso: string): Bucket {
  const today = new Date(TODAY_ISO).getTime();
  const d = new Date(iso).getTime();
  const days = (d - today) / 86_400_000;
  if (days < 1) return "today";
  const dow = new Date(iso).getDay();
  if (days < 7 && (dow === 0 || dow === 5 || dow === 6)) return "weekend";
  if (days < 7) return "week";
  return "week";
}

const TONIGHT_CAT_MAP: Record<string, { cat: EventCategory; label: string }> = {
  Konzert: { cat: "music", label: "Konzert" },
  Klub: { cat: "party", label: "Klub & Nightlife" },
  Ausstellung: { cat: "art", label: "Ausstellung" },
  Theater: { cat: "theater", label: "Theater" },
  Festival: { cat: "music", label: "Festival" },
  Sport: { cat: "sport", label: "Sport" },
  Workshop: { cat: "experience", label: "Workshop" },
  Food: { cat: "dinner", label: "Food" },
};

const LIVE_CAT_MAP: Record<string, { cat: EventCategory; label: string }> = {
  "Candlelight Concert": { cat: "music", label: "Candlelight Concert" },
  "Pop-up Dinner": { cat: "dinner", label: "Pop-up Dinner" },
  Show: { cat: "theater", label: "Show" },
  "Immersive Show": { cat: "art", label: "Immersive Show" },
};

const EXP_CAT_MAP: Record<string, { cat: EventCategory; label: string }> = {
  "Wein-Tasting": { cat: "dinner", label: "Wein-Tasting" },
  Outdoor: { cat: "experience", label: "Outdoor-Erlebnis" },
  Workshop: { cat: "experience", label: "Workshop" },
  Tour: { cat: "experience", label: "Geführte Tour" },
};

const TONIGHT_AS_EVENTS: EventItem[] = TONIGHT_EVENTS.map((e) => {
  const m = TONIGHT_CAT_MAP[e.category] ?? { cat: "music" as EventCategory, label: e.category };
  return {
    id: e.id,
    source: "tonight",
    title: e.title,
    category: m.cat,
    category_label: m.label,
    datetime: e.datetime,
    date_iso: e.date_iso,
    bucket: e.bucket,
    venue: e.venue,
    district: e.district,
    price: e.price,
    price_band: e.price_band,
    vibe_tags: e.vibe_tags,
    cover_image: e.cover_image,
    trending: e.trending,
    views_24h: e.views_24h,
    tickets_left: e.tickets_left,
    added_at: e.added_at,
  };
});

function priceBandFromMin(min: number): EventItem["price_band"] {
  if (min === 0) return "free";
  if (min < 30) return "low";
  if (min < 80) return "mid";
  return "high";
}

const LIVE_AS_EVENTS: EventItem[] = LIVE_EVENTS.map((e) => {
  const m = LIVE_CAT_MAP[e.type] ?? { cat: "art" as EventCategory, label: e.type };
  return {
    id: e.id,
    source: "live",
    title: e.title,
    category: m.cat,
    category_label: m.label,
    datetime: e.datetime,
    date_iso: e.date_iso,
    bucket: inferBucket(e.date_iso),
    venue: e.venue,
    district: e.district,
    price: e.price_range,
    price_band: priceBandFromMin(e.price_min),
    vibe_tags: e.vibe_tags,
    cover_image: e.cover_image,
    trending: e.trending,
    tickets_left: e.tickets_available,
  };
});

const EXP_AS_EVENTS: EventItem[] = EXPERIENCES.map((e) => {
  const m = EXP_CAT_MAP[e.category] ?? { cat: "experience" as EventCategory, label: e.category };
  const firstSlot = e.slots[0];
  const iso = firstSlot ? `${firstSlot.date}T${firstSlot.time}:00+02:00` : TODAY_ISO;
  const dateLabel = firstSlot
    ? `${new Date(iso).toLocaleDateString("de-CH", { day: "2-digit", month: "short" })}, ${firstSlot.time}`
    : e.duration;
  return {
    id: e.id,
    source: "experience",
    title: e.title,
    category: m.cat,
    category_label: m.label,
    datetime: `Ab ${dateLabel}`,
    date_iso: iso,
    bucket: inferBucket(iso),
    venue: e.meeting_point,
    district: e.district,
    price: `CHF ${e.price_per_person} p.P.`,
    price_band: priceBandFromMin(e.price_per_person),
    vibe_tags: e.vibe_tags,
    cover_image: e.cover_image,
    languages: e.languages,
    tickets_left: firstSlot?.spots_left,
  };
});

export const EVENTS_ALL: EventItem[] = [
  ...TONIGHT_AS_EVENTS,
  ...LIVE_AS_EVENTS,
  ...EXP_AS_EVENTS,
].sort((a, b) => a.date_iso.localeCompare(b.date_iso));

export function eventHref(e: EventItem): string {
  return `/${e.source}/${e.id}`;
}

// ─────────────────────────────────────────────────────────────
// ORTE — new categories (Bars, Badis, Aktivitäten, Museen)
// ─────────────────────────────────────────────────────────────

const PLACE_BARS: Place[] = [
  {
    id: "bar-old-crow",
    kind: "bar",
    source: "place",
    name: "Old Crow",
    subtype: "Cocktailbar",
    district: "Kreis 1",
    address: "Schwanengasse 4, 8001 Zürich",
    price_range: "CHF CHF CHF",
    description:
      "Kleine Bar mit grosser Whisky-Auswahl und klassischen Cocktails. Dunkle Hölzer, gedämpftes Licht, ehrliche Drinks.",
    vibe_tags: ["Date Night", "Hidden Gem", "Premium"],
    rating: 4.7,
    review_count: 213,
    cover_image: UNSPLASH("photo-1514362545857-3bc16c4c7d1b"),
    hours: "Di–Sa 17:00–02:00",
    trending: true,
  },
  {
    id: "bar-kronenhalle",
    kind: "bar",
    source: "place",
    name: "Kronenhalle Bar",
    subtype: "Hotel-Bar",
    district: "Kreis 1",
    address: "Rämistrasse 4, 8001 Zürich",
    price_range: "CHF CHF CHF CHF",
    description:
      "Legendäre Bar mit Originalwerken von Picasso, Chagall und Miró an den Wänden. Klassische Cocktails, präzise serviert.",
    vibe_tags: ["Premium", "Cultural", "Date Night"],
    rating: 4.8,
    review_count: 587,
    cover_image: UNSPLASH("photo-1543007630-9710e4a00a20"),
    hours: "Tägl. 16:00–01:30",
  },
  {
    id: "bar-tales",
    kind: "bar",
    source: "place",
    name: "Tales Bar",
    subtype: "Speakeasy",
    district: "Kreis 4",
    address: "Selnaustrasse 5, 8001 Zürich",
    price_range: "CHF CHF CHF",
    description:
      "Speakeasy hinter unscheinbarer Tür. Signature-Cocktails inspiriert von Geschichten und Mythen.",
    vibe_tags: ["Hidden Gem", "Date Night", "Premium"],
    rating: 4.6,
    review_count: 178,
    cover_image: UNSPLASH("photo-1551024601-bec78aea704b"),
    hours: "Mi–Sa 19:00–02:00",
  },
  {
    id: "bar-frau-gerold",
    kind: "bar",
    source: "place",
    name: "Frau Gerolds Garten",
    subtype: "Garten-Bar",
    district: "Kreis 5",
    address: "Geroldstrasse 23/23a, 8005 Zürich",
    price_range: "CHF CHF",
    description:
      "Urban Garden mitten in Zürich-West. Bier, Wein, Spritz unter Lichterketten. Sommer pur.",
    vibe_tags: ["Outdoor", "Casual", "Trending"],
    rating: 4.5,
    review_count: 921,
    cover_image: UNSPLASH("photo-1505275350441-83dcda8eeef5"),
    hours: "Mai–Sept. tägl. 11:30–24:00",
    trending: true,
  },
  {
    id: "bar-hive",
    kind: "bar",
    source: "place",
    name: "Hive Club Bar",
    subtype: "Club & Bar",
    district: "Kreis 5",
    address: "Geroldstrasse 5, 8005 Zürich",
    price_range: "CHF CHF",
    description:
      "Vorglühen mit Blick auf den Floor. Internationale DJ-Gäste, junge Crowd, lange Nächte.",
    vibe_tags: ["Casual", "Trending"],
    rating: 4.3,
    review_count: 412,
    cover_image: UNSPLASH("photo-1572116469696-31de0f17cc34"),
    hours: "Fr–Sa 23:00–05:00",
  },
];

const PLACE_BADIS: Place[] = [
  {
    id: "badi-seebad-enge",
    kind: "badi",
    source: "place",
    name: "Seebad Enge",
    subtype: "Seebad",
    district: "Kreis 2",
    address: "Mythenquai 9, 8002 Zürich",
    price_range: "CHF",
    description:
      "Historisches Seebad direkt am Zürichsee. Holzsteg, kleine Bar, Yoga am Morgen. Im Winter Sauna.",
    vibe_tags: ["Outdoor", "Casual", "Cultural"],
    rating: 4.8,
    review_count: 1342,
    cover_image: UNSPLASH("photo-1530549387789-4c1017266635"),
    hours: "Mai–Sept. tägl. 09:00–21:00",
    trending: true,
  },
  {
    id: "badi-utoquai",
    kind: "badi",
    source: "place",
    name: "Strandbad Utoquai",
    subtype: "Seebad",
    district: "Kreis 8",
    address: "Utoquai 50, 8008 Zürich",
    price_range: "CHF",
    description:
      "Hölzernes Jugendstil-Bad am Seeufer. Liegewiese, Sprungtürme, der Klassiker fürs Feierabend-Bad.",
    vibe_tags: ["Outdoor", "Family", "Casual"],
    rating: 4.7,
    review_count: 987,
    cover_image: UNSPLASH("photo-1551918120-9739cb430c6d"),
    hours: "Mai–Sept. tägl. 09:00–20:00",
  },
  {
    id: "badi-letzigraben",
    kind: "badi",
    source: "place",
    name: "Freibad Letzigraben",
    subtype: "Freibad",
    district: "Kreis 9",
    address: "Edelweissstrasse 5, 8048 Zürich",
    price_range: "CHF",
    description:
      "Denkmalgeschütztes Freibad von Max Frisch. Olympia-Becken, 10-Meter-Turm, schattige Liegewiese.",
    vibe_tags: ["Outdoor", "Family", "Cultural"],
    rating: 4.6,
    review_count: 765,
    cover_image: UNSPLASH("photo-1576013551627-0cc20b96c2a7"),
    hours: "Mai–Sept. tägl. 09:00–20:00",
  },
  {
    id: "badi-oberer-letten",
    kind: "badi",
    source: "place",
    name: "Flussbad Oberer Letten",
    subtype: "Flussbad",
    district: "Kreis 5",
    address: "Lettensteg 10, 8037 Zürich",
    price_range: "CHF",
    description:
      "Im Sommer der Treffpunkt der Stadt. Limmatschwimmen, Beachvolley, Foodtrucks am Steg.",
    vibe_tags: ["Outdoor", "Trending", "Casual"],
    rating: 4.7,
    review_count: 1567,
    cover_image: UNSPLASH("photo-1530549387789-4c1017266635"),
    hours: "Mai–Sept. tägl. 09:00–20:00",
    trending: true,
  },
];

const PLACE_ACTIVITIES: Place[] = [
  {
    id: "activity-griffin-climbing",
    kind: "activity",
    source: "place",
    name: "Griffin Climbing Gym",
    subtype: "Boulderhalle",
    district: "Kreis 4",
    address: "Hohlstrasse 481, 8048 Zürich",
    price_range: "CHF CHF",
    description:
      "Grösste Boulderhalle der Stadt. Routen für Einsteiger bis Pro, Café, Yoga-Bereich.",
    vibe_tags: ["Indoor", "Casual", "Family"],
    rating: 4.7,
    review_count: 412,
    cover_image: UNSPLASH("photo-1522163182402-834f871fd851"),
    hours: "Mo–Fr 09:00–23:00 · Sa–So 09:00–22:00",
  },
  {
    id: "activity-escape-zurich",
    kind: "activity",
    source: "place",
    name: "Adventure Rooms Zürich",
    subtype: "Escape Room",
    district: "Kreis 5",
    address: "Hohlstrasse 192, 8004 Zürich",
    price_range: "CHF CHF CHF",
    description:
      "Sechs Themen-Räume von Krimi bis Sci-Fi. 60 Minuten zum Rätseln — Teams 2 bis 6 Personen.",
    vibe_tags: ["Indoor", "Casual", "Family"],
    rating: 4.8,
    review_count: 287,
    cover_image: UNSPLASH("photo-1551763272-fc8b8ffaa0fb"),
    hours: "Di–So 10:00–23:00",
  },
  {
    id: "activity-uetli-bike",
    kind: "activity",
    source: "place",
    name: "Üetliberg Bike-Trails",
    subtype: "Outdoor-Sport",
    district: "Kreis 9",
    address: "Bergstation Uetliberg, 8143 Zürich",
    price_range: "CHF",
    description:
      "Drei Flow-Trails den Hausberg runter. E-Bike-Verleih an der Bergstation. Sonnenuntergang inklusive.",
    vibe_tags: ["Outdoor", "Trending"],
    rating: 4.6,
    review_count: 198,
    cover_image: UNSPLASH("photo-1532298229144-0ec0c57515c7"),
    hours: "Mai–Okt. tägl.",
    trending: true,
  },
  {
    id: "activity-kayak-limmat",
    kind: "activity",
    source: "place",
    name: "Limmat Kayak Tour",
    subtype: "Wassersport",
    district: "Kreis 1",
    address: "Bahnhofquai 19, 8001 Zürich",
    price_range: "CHF CHF",
    description:
      "Geführte Kayak-Tour durch die Altstadt und über den See. Auch für Anfänger geeignet.",
    vibe_tags: ["Outdoor", "Casual", "Family"],
    rating: 4.9,
    review_count: 134,
    cover_image: UNSPLASH("photo-1463693396721-8ca0cfa2b3b5"),
    hours: "Mai–Sept. Mi–So 10:00–18:00",
  },
];

const PLACE_MUSEUMS: Place[] = [
  {
    id: "museum-kunsthaus",
    kind: "museum",
    source: "place",
    name: "Kunsthaus Zürich",
    subtype: "Kunstmuseum",
    district: "Kreis 1",
    address: "Heimplatz 1, 8001 Zürich",
    price_range: "CHF CHF",
    description:
      "Eine der bedeutendsten Sammlungen der Schweiz: Munch, Picasso, Giacometti. Spektakulärer Erweiterungsbau von Chipperfield.",
    vibe_tags: ["Cultural", "Premium", "Indoor"],
    rating: 4.7,
    review_count: 2341,
    cover_image: UNSPLASH("photo-1554907984-15263bfd63bd"),
    hours: "Di–So 10:00–18:00 · Mi + Do bis 20:00",
  },
  {
    id: "museum-landesmuseum",
    kind: "museum",
    source: "place",
    name: "Landesmuseum Zürich",
    subtype: "Geschichtsmuseum",
    district: "Kreis 1",
    address: "Museumstrasse 2, 8001 Zürich",
    price_range: "CHF CHF",
    description:
      "Geschichte der Schweiz vom Mittelalter bis heute. Schlossartiger Bau, modernster Anbau, hervorragende Wechselausstellungen.",
    vibe_tags: ["Cultural", "Family", "Indoor"],
    rating: 4.6,
    review_count: 1876,
    cover_image: UNSPLASH("photo-1565060169187-2af4377b73d2"),
    hours: "Di–So 10:00–17:00 · Do bis 19:00",
  },
  {
    id: "museum-rietberg",
    kind: "museum",
    source: "place",
    name: "Museum Rietberg",
    subtype: "Aussereuropäische Kunst",
    district: "Kreis 2",
    address: "Gablerstrasse 15, 8002 Zürich",
    price_range: "CHF CHF",
    description:
      "Kunst aus Afrika, Asien und Amerika in einer historischen Villa im Park. Stilles Juwel mit Café im Grünen.",
    vibe_tags: ["Cultural", "Hidden Gem", "Indoor"],
    rating: 4.7,
    review_count: 612,
    cover_image: UNSPLASH("photo-1503632235391-c30aa7ee3e89"),
    hours: "Di–So 10:00–17:00 · Mi + Do bis 20:00",
  },
  {
    id: "museum-fifa",
    kind: "museum",
    source: "place",
    name: "FIFA Museum",
    subtype: "Sportmuseum",
    district: "Kreis 2",
    address: "Seestrasse 27, 8002 Zürich",
    price_range: "CHF CHF",
    description:
      "Multimediale Reise durch die Geschichte des Fussballs. Original-WM-Pokale, Trikots, interaktive Stationen.",
    vibe_tags: ["Family", "Cultural", "Indoor"],
    rating: 4.5,
    review_count: 1023,
    cover_image: UNSPLASH("photo-1551958219-acbc608c6377"),
    hours: "Di–So 10:00–18:00",
  },
];

const PLACE_CAFES: Place[] = [
  {
    id: "cafe-acid",
    kind: "cafe",
    source: "place",
    name: "Acid Coffee",
    subtype: "Specialty Coffee",
    district: "Kreis 4",
    address: "Bertastrasse 16, 8003 Zürich",
    price_range: "CHF CHF",
    description:
      "Specialty Coffee aus eigener Rösterei. Pour-Over, V60 und ein paar perfekte Croissants. Kleiner Innenhof.",
    vibe_tags: ["Hidden Gem", "Casual", "Indoor"],
    rating: 4.8,
    review_count: 312,
    cover_image: UNSPLASH("photo-1559925393-8be0ec4767c8"),
    hours: "Mo–Fr 07:30–17:00 · Sa–So 09:00–17:00",
  },
  {
    id: "cafe-henrici",
    kind: "cafe",
    source: "place",
    name: "Café Henrici",
    subtype: "Stadt-Café",
    district: "Kreis 1",
    address: "Niederdorfstrasse 1, 8001 Zürich",
    price_range: "CHF CHF",
    description:
      "Klassisches Stadt-Café mit Aussicht auf den Lindenhof. Hausgemachte Kuchen, ehrlicher Kaffee, lange Frühstücke.",
    vibe_tags: ["Casual", "Cultural", "Indoor"],
    rating: 4.5,
    review_count: 421,
    cover_image: UNSPLASH("photo-1453614512568-c4024d13c247"),
    hours: "Tägl. 08:00–22:00",
  },
];

const PLACE_NATURE: Place[] = [
  {
    id: "nature-uetliberg",
    kind: "nature",
    source: "place",
    name: "Üetliberg",
    subtype: "Aussichtsberg",
    district: "Kreis 9",
    address: "Bergstation Uetliberg, 8143 Zürich",
    price_range: "CHF",
    description:
      "Zürichs Hausberg mit Panorama-Aussicht über die ganze Stadt, den See und bei klarem Wetter bis in die Alpen.",
    vibe_tags: ["Outdoor", "Cultural", "Family"],
    rating: 4.8,
    review_count: 3214,
    cover_image: UNSPLASH("photo-1506665531195-3566af2b4dfa"),
    hours: "Ganzjährig zugänglich",
    trending: true,
  },
  {
    id: "nature-lindenhof",
    kind: "nature",
    source: "place",
    name: "Lindenhof",
    subtype: "Aussichts-Platz",
    district: "Kreis 1",
    address: "Lindenhof, 8001 Zürich",
    price_range: "CHF",
    description:
      "Stille Plattform mitten in der Altstadt mit Blick auf Limmat und ETH. Treffpunkt für Schachspieler und Sonnenuntergänge.",
    vibe_tags: ["Outdoor", "Cultural", "Hidden Gem"],
    rating: 4.7,
    review_count: 1842,
    cover_image: UNSPLASH("photo-1573152958734-1922c188fba3"),
    hours: "Ganzjährig zugänglich",
  },
  {
    id: "nature-werdinsel",
    kind: "nature",
    source: "place",
    name: "Werdinsel",
    subtype: "Fluss-Insel",
    district: "Kreis 9",
    address: "Werdinsel, 8048 Zürich",
    price_range: "CHF",
    description:
      "Naturbelassene Insel in der Limmat — Badeplatz, Grillstellen, Nudisten-Wiese und endlose Sommerabende.",
    vibe_tags: ["Outdoor", "Casual", "Hidden Gem"],
    rating: 4.6,
    review_count: 743,
    cover_image: UNSPLASH("photo-1500382017468-9049fed747ef"),
    hours: "Ganzjährig zugänglich",
  },
  {
    id: "nature-zueriberg",
    kind: "nature",
    source: "place",
    name: "Zürichberg",
    subtype: "Stadtwald",
    district: "Kreis 7",
    address: "Zürichbergstrasse, 8044 Zürich",
    price_range: "CHF",
    description:
      "Stadtwald mit Wanderwegen, FIFA-Stein, Wildpark und der besten Aussicht auf den See vom Norden.",
    vibe_tags: ["Outdoor", "Family", "Casual"],
    rating: 4.7,
    review_count: 891,
    cover_image: UNSPLASH("photo-1448375240586-882707db888b"),
    hours: "Ganzjährig zugänglich",
  },
];

const PLACE_MARKETS: Place[] = [
  {
    id: "market-buerkliplatz",
    kind: "market",
    source: "place",
    name: "Wochenmarkt Bürkliplatz",
    subtype: "Wochenmarkt",
    district: "Kreis 1",
    address: "Bürkliplatz, 8001 Zürich",
    price_range: "CHF CHF",
    description:
      "Der Klassiker. Regionale Bauern, Käse, Blumen, Honig, frisches Brot. Treffpunkt für Foodies jeden Dienstag und Freitag.",
    vibe_tags: ["Outdoor", "Cultural", "Family"],
    rating: 4.7,
    review_count: 1234,
    cover_image: UNSPLASH("photo-1488459716781-31db52582fe9"),
    hours: "Di + Fr 06:00–11:00",
  },
  {
    id: "market-viadukt",
    kind: "market",
    source: "place",
    name: "Markthalle im Viadukt",
    subtype: "Markthalle",
    district: "Kreis 5",
    address: "Limmatstrasse 231, 8005 Zürich",
    price_range: "CHF CHF",
    description:
      "Dauerhafte Markthalle unter den Bögen — Käse, Fleisch, Wein, Gemüse, dazu Bistros und Bar. Sieben Tage offen.",
    vibe_tags: ["Indoor", "Premium", "Casual"],
    rating: 4.6,
    review_count: 987,
    cover_image: UNSPLASH("photo-1542838132-92c53300491e"),
    hours: "Mo–Sa 09:00–20:00 · So 10:00–18:00",
    trending: true,
  },
  {
    id: "market-engros",
    kind: "market",
    source: "place",
    name: "Engrosmarkt",
    subtype: "Grossmarkt",
    district: "Kreis 4",
    address: "Aargauerstrasse 1, 8048 Zürich",
    price_range: "CHF",
    description:
      "Der Zürcher Grossmarkt — Frühaufsteher kaufen hier Fisch, Gemüse und Blumen direkt ab Lieferwagen.",
    vibe_tags: ["Indoor", "Hidden Gem"],
    rating: 4.3,
    review_count: 234,
    cover_image: UNSPLASH("photo-1573246123716-6b1782bfc499"),
    hours: "Mo–Sa 04:00–10:00",
  },
];

function dineToPlace(v: DineVenue): Place {
  const isBar =
    v.cuisine === "Cocktails" ||
    v.type.toLowerCase().includes("bar");
  return {
    id: v.id,
    kind: isBar ? "bar" : "restaurant",
    source: "dine",
    name: v.name,
    subtype: v.type,
    district: v.district,
    address: v.address,
    price_range: v.price_range,
    description: v.description,
    vibe_tags: v.vibe_tags,
    rating: v.rating,
    review_count: v.review_count,
    cover_image: v.cover_image,
    hours: v.hours,
    trending: v.trending,
  };
}

export const PLACES_ALL: Place[] = [
  ...DINE_VENUES.map(dineToPlace),
  ...PLACE_BARS,
  ...PLACE_CAFES,
  ...PLACE_BADIS,
  ...PLACE_ACTIVITIES,
  ...PLACE_MUSEUMS,
  ...PLACE_NATURE,
  ...PLACE_MARKETS,
];

export function placeHref(p: Place): string {
  return p.source === "dine" ? `/dine/${p.id}` : `/orte/${p.id}`;
}

// UI metadata — used by /entdecken and /orte pages.
// Icons are referenced by name (Lucide); pages import the icon component directly.
export const EVENT_CATEGORIES: {
  key: EventCategory;
  icon: string;
  label: string;
}[] = [
  { key: "music", icon: "Music", label: "Konzerte & Musik" },
  { key: "dinner", icon: "UtensilsCrossed", label: "Dinner & Pop-ups" },
  { key: "art", icon: "Palette", label: "Kunst & Kultur" },
  { key: "experience", icon: "Sparkles", label: "Erlebnisse & Workshops" },
  { key: "party", icon: "PartyPopper", label: "Parties & Nightlife" },
  { key: "networking", icon: "Handshake", label: "Networking & Talks" },
  { key: "sport", icon: "Trophy", label: "Sport-Events" },
  { key: "family", icon: "Users", label: "Familie & Kinder" },
  { key: "market", icon: "ShoppingBag", label: "Märkte" },
  { key: "theater", icon: "Drama", label: "Theater & Comedy" },
];

export const PLACE_KINDS: {
  key: PlaceKind;
  icon: string;
  label: string;
  plural: string;
}[] = [
  { key: "restaurant", icon: "UtensilsCrossed", label: "Restaurant", plural: "Restaurants" },
  { key: "bar", icon: "Wine", label: "Bar", plural: "Bars" },
  { key: "cafe", icon: "Coffee", label: "Café", plural: "Cafés" },
  { key: "badi", icon: "Waves", label: "Badi", plural: "Badis" },
  { key: "activity", icon: "Activity", label: "Aktivität", plural: "Aktivitäten" },
  { key: "museum", icon: "Landmark", label: "Museum", plural: "Museen" },
  { key: "nature", icon: "TreePine", label: "Natur", plural: "Natur & Aussicht" },
  { key: "market", icon: "ShoppingBag", label: "Markt", plural: "Märkte" },
];

// ─────────────────────────────────────────────────────────────
// PHASE 5 — ENTDECKEN: unified facet navigation
// 3-axis: WAS (category) / WANN (time) / STIL (style)
// ─────────────────────────────────────────────────────────────

export const ENTDECKEN_CATEGORIES: {
  key: EntdeckenCategory;
  icon: string;
  label: string;
}[] = [
  { key: "food", icon: "UtensilsCrossed", label: "Essen & Trinken" },
  { key: "music", icon: "Music", label: "Musik & Konzerte" },
  { key: "art", icon: "Palette", label: "Kunst & Ausstellungen" },
  { key: "activity", icon: "Activity", label: "Aktivitäten & Spielen" },
  { key: "wellness", icon: "Waves", label: "Wellness & Wasser" },
  { key: "culture", icon: "Landmark", label: "Kultur & Museen" },
  { key: "courses", icon: "GraduationCap", label: "Kurse & Workshops" },
  { key: "nature", icon: "TreePine", label: "Natur & Aussicht" },
  { key: "family", icon: "Baby", label: "Familie & Kinder" },
  { key: "nightlife", icon: "PartyPopper", label: "Nightlife & Parties" },
  { key: "shopping", icon: "ShoppingBag", label: "Märkte & Shopping" },
  { key: "sport", icon: "Trophy", label: "Sport-Events" },
];

export const ENTDECKEN_TIMES: { key: EntdeckenTime; label: string }[] = [
  { key: "now-open", label: "Jetzt geöffnet" },
  { key: "tonight", label: "Heute Abend" },
  { key: "weekend", label: "Wochenende" },
  { key: "this-week", label: "Diese Woche" },
  { key: "evergreen", label: "Dauerhaft" },
];

export const ENTDECKEN_STYLES: StyleTag[] = [
  "Date Night",
  "Mit Freunden",
  "Solo",
  "Familie",
  "Premium",
  "Günstig",
  "Touristen-Tipp",
  "Geheim-Tipp",
  "Indoor",
  "Outdoor",
];

// Map EventCategory + Place.kind → EntdeckenCategory
const EVENT_TO_FACET: Record<EventCategory, EntdeckenCategory> = {
  music: "music",
  dinner: "food",
  art: "art",
  experience: "courses",
  party: "nightlife",
  networking: "culture",
  sport: "sport",
  family: "family",
  market: "shopping",
  theater: "art",
};

const PLACE_TO_FACET: Record<PlaceKind, EntdeckenCategory> = {
  restaurant: "food",
  bar: "nightlife",
  cafe: "food",
  badi: "wellness",
  activity: "activity",
  museum: "culture",
  nature: "nature",
  market: "shopping",
};

// Derive Style tags from a place/event's vibe tags + heuristics.
function deriveStyleTags(opts: {
  vibes: string[];
  price_band: "free" | "low" | "mid" | "high";
  trending?: boolean;
  rating?: number;
  district?: string;
  reviewCount?: number;
}): StyleTag[] {
  const out = new Set<StyleTag>();
  for (const v of opts.vibes) {
    if (v === "Date Night") out.add("Date Night");
    if (v === "Premium" || v === "Fine Dining") out.add("Premium");
    if (v === "Family") out.add("Familie");
    if (v === "Casual") out.add("Mit Freunden");
    if (v === "Hidden Gem") out.add("Geheim-Tipp");
    if (v === "Indoor") out.add("Indoor");
    if (v === "Outdoor") out.add("Outdoor");
    if (v === "Cultural") out.add("Solo");
  }
  if (opts.price_band === "free" || opts.price_band === "low") out.add("Günstig");
  if (opts.price_band === "high") out.add("Premium");
  if ((opts.reviewCount ?? 0) > 800 || (opts.rating ?? 0) >= 4.7) out.add("Touristen-Tipp");
  if (opts.trending && !out.has("Geheim-Tipp")) out.add("Mit Freunden");
  return Array.from(out);
}

function deriveBadges(opts: {
  trending?: boolean;
  vibes: string[];
  price_band: "free" | "low" | "mid" | "high";
  rating?: number;
  reviewCount?: number;
  addedAt?: string;
}): ListingBadge[] {
  const out: ListingBadge[] = [];
  if (opts.trending) out.push("trending");
  if (opts.vibes.includes("Hidden Gem")) out.push("secret");
  if (opts.vibes.includes("Premium") || opts.price_band === "high") out.push("premium");
  if ((opts.reviewCount ?? 0) > 800 || (opts.rating ?? 0) >= 4.7) out.push("tourist");
  if (opts.addedAt) out.push("new");
  return out;
}

const EVENT_AS_LISTING: Listing[] = EVENTS_ALL.map((e) => {
  const styles = deriveStyleTags({
    vibes: e.vibe_tags,
    price_band: e.price_band,
    trending: e.trending,
  });
  const badges = deriveBadges({
    trending: e.trending,
    vibes: e.vibe_tags,
    price_band: e.price_band,
    addedAt: e.added_at,
  });
  return {
    id: `event-${e.source}-${e.id}`,
    kind: "event",
    href: eventHref(e),
    title: e.title,
    category: EVENT_TO_FACET[e.category],
    category_label: e.category_label,
    district: e.district,
    cover_image: e.cover_image,
    datetime: e.datetime,
    date_iso: e.date_iso,
    bucket: e.bucket,
    price: e.price,
    price_band: e.price_band,
    style_tags: styles,
    vibe_tags: e.vibe_tags,
    badges,
    trending: e.trending,
    views_24h: e.views_24h,
    tickets_left: e.tickets_left,
    source_module: e.source,
    source_id: e.id,
  };
});

function placeBand(p: Place): "free" | "low" | "mid" | "high" {
  const n = (p.price_range.match(/CHF/g) ?? []).length;
  if (n <= 1) return "low";
  if (n === 2) return "mid";
  return "high";
}

const PLACE_AS_LISTING: Listing[] = PLACES_ALL.map((p) => {
  const band = placeBand(p);
  const styles = deriveStyleTags({
    vibes: p.vibe_tags,
    price_band: band,
    trending: p.trending,
    rating: p.rating,
    reviewCount: p.review_count,
  });
  const badges = deriveBadges({
    trending: p.trending,
    vibes: p.vibe_tags,
    price_band: band,
    rating: p.rating,
    reviewCount: p.review_count,
  });
  return {
    id: `place-${p.source}-${p.id}`,
    kind: "place",
    href: placeHref(p),
    title: p.name,
    category: PLACE_TO_FACET[p.kind],
    category_label: p.subtype,
    district: p.district,
    cover_image: p.cover_image,
    hours: p.hours,
    rating: p.rating,
    price: p.price_range,
    price_band: band,
    style_tags: styles,
    vibe_tags: p.vibe_tags,
    badges,
    trending: p.trending,
    source_module: p.source === "dine" ? "dine" : "orte",
    source_id: p.id,
  };
});

export const LISTINGS_ALL: Listing[] = [
  ...EVENT_AS_LISTING,
  ...PLACE_AS_LISTING,
];

// Heuristic: a place is "open now" if its hours contain "Tägl." or covers today.
// For prototype demo we simply mark non-seasonal venues open during Mo-Fr daytime.
const HOUR_OPEN_KEYWORDS = ["Tägl", "tägl", "Mo–Sa", "Mo–Fr", "Di–So", "Di–Sa", "Mi–Sa"];
function placeOpenNow(hours: string | undefined): boolean {
  if (!hours) return false;
  if (hours.includes("Mai–Sept")) {
    const m = new Date().getMonth();
    if (m < 4 || m > 8) return false;
  }
  return HOUR_OPEN_KEYWORDS.some((k) => hours.includes(k));
}

export function listingMatchesTime(l: Listing, t: EntdeckenTime): boolean {
  if (t === "evergreen") return l.kind === "place";
  if (l.kind === "event") {
    if (t === "tonight") return l.bucket === "today";
    if (t === "weekend") return l.bucket === "weekend";
    if (t === "this-week") return l.bucket === "today" || l.bucket === "weekend" || l.bucket === "week";
    if (t === "now-open") return l.bucket === "today";
    return false;
  }
  // place
  if (t === "now-open") return placeOpenNow(l.hours);
  // places generally match this-week / weekend by being always-open
  return t === "this-week" || t === "weekend";
}

export const ENTDECKEN_LIVE_COUNTS = {
  events: EVENT_AS_LISTING.length,
  places: PLACE_AS_LISTING.length,
  onlineNow: 1247,
};

// District spotlight (rotates weekly — for demo we hardcode "Kreis 5")
export const DISTRICT_SPOTLIGHT = {
  district: "Kreis 5",
  blurb:
    "Vom Viadukt bis zum Letten — der kreativste Kreis Zürichs diese Woche im Fokus.",
};

// Curated theme bundles
export const CURATED_THEMES: {
  key: string;
  title: string;
  desc: string;
  filters: { category?: EntdeckenCategory; time?: EntdeckenTime; style?: StyleTag };
}[] = [
  {
    key: "tonight-friends",
    title: "Heute Abend mit Freunden",
    desc: "Bars, Konzerte, Pop-ups — was diese Nacht los ist.",
    filters: { time: "tonight", style: "Mit Freunden" },
  },
  {
    key: "sunday-brunch",
    title: "Sonntags-Brunch",
    desc: "Lange Tische, viel Zeit, viel Kaffee.",
    filters: { category: "food" },
  },
  {
    key: "rain-indoor",
    title: "Regenwetter heute",
    desc: "Museen, Markthallen, Spas — alles unter Dach.",
    filters: { style: "Indoor" },
  },
];
