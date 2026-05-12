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
    title: "Erinnerung",
    text: "Dein gespeichertes Event 'Vivaldi bei Nacht' startet morgen.",
    href: "/tonight/klang-kerzenschein",
    ago: "Vor 2h",
    unread: true,
  },
  {
    id: "n2",
    title: "Neuer Pop-up",
    text: "Sterne-Koch Cadonau — nur 12 Plätze frei.",
    href: "/tonight/fruehstueck-cadonau",
    ago: "Vor 5h",
    unread: true,
  },
  {
    id: "n3",
    title: "Neue Bewertungen",
    text: "3 neue Bewertungen bei Maison Manesse.",
    href: "/dine/maison-manesse",
    ago: "Vor 1d",
  },
  {
    id: "n4",
    title: "Pulse",
    text: "Founders' Table — noch 3 Plätze in deiner Stufe.",
    href: "/pulse/founders-table",
    ago: "Vor 2d",
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
];
