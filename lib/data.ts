import type {
  TonightEvent,
  DineVenue,
  Experience,
  PulseEvent,
  LiveEvent,
} from "./types";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

export const TONIGHT_EVENTS: TonightEvent[] = [
  {
    id: "klang-kerzenschein",
    title: "Klang & Kerzenschein — Vivaldi bei Nacht",
    category: "Konzert",
    datetime: "23. Mai 2026, 20:00",
    date_iso: "2026-05-23T20:00:00+02:00",
    venue: "Kulturhaus Helferei",
    district: "Kreis 1",
    price: "CHF 49–89",
    vibe_tags: ["Premium", "Date Night", "Cultural"],
    description:
      "Vivaldis 'Vier Jahreszeiten' im Kerzenlicht eines historischen Saals. Streichquartett, 90 Minuten, magisch.",
    cover_image: UNSPLASH("photo-1465847899084-d164df4dedc6"),
    gallery: [
      UNSPLASH("photo-1465847899084-d164df4dedc6"),
      UNSPLASH("photo-1514525253161-7a46d19cd819"),
      UNSPLASH("photo-1519683109079-d5f539e1542f"),
    ],
  },
  {
    id: "rooftop-jazz",
    title: "Rooftop Jazz — Quintett im Sommerwind",
    category: "Konzert",
    datetime: "24. Mai 2026, 19:30",
    date_iso: "2026-05-24T19:30:00+02:00",
    venue: "Rooftop Hotel Rivington",
    district: "Kreis 4",
    price: "CHF 35",
    vibe_tags: ["Outdoor", "Casual", "Date Night"],
    description:
      "Lokale Jazz-Szene auf einer der schönsten Dachterrassen der Stadt. Eintritt inklusive einem Apero.",
    cover_image: UNSPLASH("photo-1511192336575-5a79af67a629"),
    gallery: [UNSPLASH("photo-1511192336575-5a79af67a629")],
  },
  {
    id: "kunsthaus-late",
    title: "Kunsthaus Late — Surrealismus nach 21 Uhr",
    category: "Ausstellung",
    datetime: "25. Mai 2026, 21:00",
    date_iso: "2026-05-25T21:00:00+02:00",
    venue: "Kunsthaus Zürich",
    district: "Kreis 1",
    price: "CHF 22",
    vibe_tags: ["Cultural", "Indoor", "Hidden Gem"],
    description:
      "Privater Zugang zur Surrealismus-Sammlung nach Schliessung, mit Kurator-Führung und Naturwein.",
    cover_image: UNSPLASH("photo-1544967082-d9d25d867d66"),
    gallery: [UNSPLASH("photo-1544967082-d9d25d867d66")],
  },
];

export const DINE_VENUES: DineVenue[] = [
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
    cover_image: UNSPLASH("photo-1414235077428-338989a2e8c0"),
    gallery: [
      UNSPLASH("photo-1414235077428-338989a2e8c0"),
      UNSPLASH("photo-1517248135467-4c7edcad34c4"),
      UNSPLASH("photo-1559339352-11d035aa65de"),
    ],
    hours: "Di–Sa 18:00–23:30 · So + Mo geschlossen",
    reviews: [
      {
        author: "Anna L.",
        rating: 5,
        text: "Das mutigste Tasting-Menü, das ich dieses Jahr in Zürich hatte. Wein-Pairing eine eigene Reise.",
        date: "Mai 2026",
      },
      {
        author: "Tobias K.",
        rating: 5,
        text: "Unprätentiös, präzise, herzlich. Wir kommen zurück.",
        date: "April 2026",
      },
      {
        author: "Sara M.",
        rating: 4,
        text: "Phänomenal, aber Reservierung 4 Wochen im Voraus nötig.",
        date: "April 2026",
      },
    ],
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
    cover_image: UNSPLASH("photo-1559339352-11d035aa65de"),
    gallery: [UNSPLASH("photo-1559339352-11d035aa65de")],
    hours: "Mo–Sa 17:00–24:00",
    reviews: [
      {
        author: "Mira S.",
        rating: 5,
        text: "Beste Fondue-Auswahl in der Altstadt. Service warmherzig.",
        date: "März 2026",
      },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "geheime-schweizer-weine",
    title: "Geheime Schweizer Weine — Tasting in der Altstadt",
    category: "Wein-Tasting",
    host: "Lukas Brunner, Sommelier",
    duration: "2 Stunden",
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
    ],
    slots: [
      { date: "2026-05-22", time: "18:30", spots_left: 4 },
      { date: "2026-05-29", time: "18:30", spots_left: 2 },
      { date: "2026-06-05", time: "18:30", spots_left: 6 },
    ],
  },
  {
    id: "alpenkraeuter-wanderung",
    title: "Alpenkräuter-Wanderung am Üetliberg",
    category: "Outdoor",
    host: "Eva Hofer, Botanikerin",
    duration: "3 Stunden",
    price_per_person: 65,
    max_participants: 10,
    meeting_point: "Üetlibergbahn Talstation",
    district: "Üetliberg",
    description:
      "Geführte Wanderung mit lokaler Botanikerin. Heilpflanzen erkennen, sammeln, am Ende gemeinsam einen Tee zubereiten.",
    what_included: ["Geführte Wanderung", "Kräuterbuch zum Mitnehmen", "Tee-Verkostung"],
    vibe_tags: ["Outdoor", "Casual", "Hidden Gem"],
    languages: ["DE", "EN"],
    cover_image: UNSPLASH("photo-1501785888041-af3ef285b470"),
    gallery: [UNSPLASH("photo-1501785888041-af3ef285b470")],
    slots: [
      { date: "2026-05-24", time: "10:00", spots_left: 8 },
      { date: "2026-06-01", time: "10:00", spots_left: 10 },
    ],
  },
];

export const PULSE_EVENTS: PulseEvent[] = [
  {
    id: "founders-table",
    title: "Founders' Table — Intim-Dinner für Zürcher Unternehmer",
    type: "Networking-Dinner",
    datetime: "4. Juni 2026, 19:00",
    date_iso: "2026-06-04T19:00:00+02:00",
    venue: "Private Location, Kreis 8",
    max_attendees: 12,
    current_rsvp: 7,
    description:
      "Kuratiert: 12 Unternehmer aus Tech, Finance und Design teilen ein Dinner und ehrliche Gespräche über Wachstum, Fehler und Strategie. Keine Pitches.",
    curator_notes:
      "Sorgfältig zusammengesetzt: 4 Tech-Gründer, 3 Finance, 2 Designer, 3 Unternehmer aus traditionellen Industrien.",
    required_tier: "Premium",
    cover_image: UNSPLASH("photo-1414235077428-338989a2e8c0"),
  },
  {
    id: "vip-art-preview",
    title: "VIP Art Preview — Galerie-Rundgang vor Vernissage",
    type: "Kuratierter Rundgang",
    datetime: "12. Juni 2026, 18:30",
    date_iso: "2026-06-12T18:30:00+02:00",
    venue: "Drei Galerien, Kreis 4",
    max_attendees: 20,
    current_rsvp: 14,
    description:
      "Drei Zürcher Galerien öffnen vor der offiziellen Vernissage. Mit den Künstlerinnen sprechen, Werke vor der Öffentlichkeit sehen.",
    curator_notes: "Drei Galeristen, vier Künstlerinnen, ein limousine shuttle.",
    required_tier: "VIP",
    cover_image: UNSPLASH("photo-1544967082-d9d25d867d66"),
  },
  {
    id: "salon-philosophie",
    title: "Salon Philosophie — Was bedeutet 'genug'?",
    type: "Salon-Gespräch",
    datetime: "20. Juni 2026, 20:00",
    date_iso: "2026-06-20T20:00:00+02:00",
    venue: "Bibliothek, Kreis 6",
    max_attendees: 16,
    current_rsvp: 11,
    description:
      "Moderiertes Gespräch mit einem Philosophen und einer Ökonomin. 90 Minuten, ehrlich, ohne Folien.",
    curator_notes: "Nur Premium-Mitglieder.",
    required_tier: "Premium",
    cover_image: UNSPLASH("photo-1481627834876-b7833e8f5570"),
  },
];

export const LIVE_EVENTS: LiveEvent[] = [
  {
    id: "candlelight-coldplay",
    title: "Candlelight: Coldplay vs. Imagine Dragons im Schauspielhaus",
    type: "Candlelight Concert",
    datetime: "30. Mai 2026, 20:30",
    date_iso: "2026-05-30T20:30:00+02:00",
    venue: "Schauspielhaus Zürich, Pfauen-Bühne",
    price_range: "CHF 45–79",
    price_min: 45,
    price_max: 79,
    tickets_available: 180,
    description:
      "Streichquartett-Versionen der grössten Hits beider Bands, im Schein hunderter Kerzen. 75 Minuten.",
    vibe_tags: ["Premium", "Date Night", "Magical"],
    cover_image: UNSPLASH("photo-1465847899084-d164df4dedc6"),
    gallery: [
      UNSPLASH("photo-1465847899084-d164df4dedc6"),
      UNSPLASH("photo-1514525253161-7a46d19cd819"),
    ],
  },
  {
    id: "secret-supper-river",
    title: "Secret Supper — 7 Gänge am Wasser",
    type: "Pop-up Dinner",
    datetime: "6. Juni 2026, 19:00",
    date_iso: "2026-06-06T19:00:00+02:00",
    venue: "Geheime Location an der Limmat",
    price_range: "CHF 189",
    price_min: 189,
    price_max: 189,
    tickets_available: 32,
    description:
      "Eine Schweizer Sterneküche kocht ein 7-Gänge-Menü an einem Ort, der erst 24 Stunden vorher verraten wird.",
    vibe_tags: ["Premium", "Magical", "Fine Dining"],
    cover_image: UNSPLASH("photo-1559339352-11d035aa65de"),
    gallery: [UNSPLASH("photo-1559339352-11d035aa65de")],
  },
];

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
