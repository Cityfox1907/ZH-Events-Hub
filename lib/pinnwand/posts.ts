import type { PinnwandPost, PinnwandComment } from "./types";

// Deterministic anchor — used so that "frisch / diese woche / monat"
// filters resolve consistently regardless of when this is rendered.
// Posts use relative offsets (in hours) from this anchor.
const ANCHOR_ISO = "2026-05-08T18:00:00.000Z";

function isoOffset(hoursAgo: number): string {
  const anchor = new Date(ANCHOR_ISO).getTime();
  return new Date(anchor - hoursAgo * 60 * 60 * 1000).toISOString();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

const AVATAR_PALETTE = [
  "#7c1f1f",
  "#2d4a4a",
  "#c97c2e",
  "#5a4a6e",
  "#3a5a3a",
  "#8b2e2e",
  "#a8851e",
  "#a8587a",
  "#3a4a6a",
  "#b8893d",
];

function avatarFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

interface RawPost
  extends Omit<PinnwandPost, "id" | "slug" | "createdAt" | "author" | "bookmarks"> {
  authorName: string;
  authorVerified: boolean;
  authorQuartier: PinnwandPost["author"]["quartier"];
  hoursAgo: number;
  bookmarks?: number;
}

const RAW_POSTS: RawPost[] = [
  {
    headline: "Der beste türkische Kaffee an der Langstrasse",
    body:
      "Bin gestern zufällig in das kleine Café Aysel an der Langstrasse 84 gestolpert. Türkischer Mokka wird auf echtem Sand gekocht, Baklava ist hausgemacht von der Mutter der Besitzerin. Innen rauchige Atmosphäre, draussen 4 Tische direkt an der Strasse. Würde 4.5 Sterne vergeben.",
    category: "empfehlung",
    quartier: "kreis-4",
    authorName: "Yasemin K.",
    authorVerified: true,
    authorQuartier: "kreis-4",
    hoursAgo: 3,
    likes: 42,
    comments: 8,
    bookmarks: 17,
    photos: [
      "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Wo bekomme ich am Sonntag noch frische Forelle?",
    body:
      "Wir haben spontan Gäste am Sonntagabend. Migros und Coop machen früh zu. Kennt jemand einen Fischhändler oder Restaurant das Take-Away verkauft? Bin in Witikon.",
    category: "frage",
    quartier: "kreis-7",
    authorName: "Markus B.",
    authorVerified: false,
    authorQuartier: "kreis-7",
    hoursAgo: 5,
    likes: 12,
    comments: 14,
  },
  {
    headline: "Globus wird tatsächlich umgebaut",
    body:
      "Heute Morgen die ersten Bauzäune am Globus-Eingang gesehen. Nach Jahren der Spekulation passiert es jetzt also wirklich. Hat jemand Infos was genau geplant ist? Gerüchte sprechen von Mixed-Use mit Gastro im Erdgeschoss.",
    category: "stadt-beobachtung",
    quartier: "kreis-1",
    authorName: "Stefan W.",
    authorVerified: true,
    authorQuartier: "kreis-1",
    hoursAgo: 26,
    likes: 89,
    comments: 23,
    bookmarks: 31,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1519307428838-bb6ec4d4eb01?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Verschenke: Vintage Esstisch Eichenholz",
    body:
      "Esstisch ca. 180x90cm, Eichenholz massiv, hat eine schöne Patina über die Jahre bekommen. Muss raus bis Sonntag — neuer Mieter zieht ein. Selbstabholung Limmatstrasse, 2 starke Personen nötig. Kostenlos.",
    category: "suche-biete",
    quartier: "kreis-5",
    authorName: "Lina M.",
    authorVerified: true,
    authorQuartier: "kreis-5",
    hoursAgo: 50,
    likes: 67,
    comments: 31,
    bookmarks: 22,
    photos: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Velo-Diebstahl-Welle Seefeld",
    body:
      "Drittes Velo diese Woche aus unserer Tiefgarage weg. Polizei hat schon Anzeige aufgenommen. Achtet auf zusätzliche Schlösser, auch wenn ihr in der Garage abstellt. Verdächtige Personen rund um die Dufourstrasse beobachten.",
    category: "warnung",
    quartier: "kreis-8",
    authorName: "Rita Z.",
    authorVerified: true,
    authorQuartier: "kreis-8",
    hoursAgo: 6,
    likes: 34,
    comments: 11,
  },
  {
    headline: "Tonhalle gestern: Mahler 9. — wow",
    body:
      "War nach 4 Jahren das erste Mal wieder in der Tonhalle. Paavo Järvi dirigiert Mahler 9. Im 4. Satz hat im ganzen Saal niemand mehr geatmet. Die letzten 3 Minuten — komplette Stille danach für gefühlt 30 Sekunden bevor der Applaus kam. Gänsehaut-Moment.",
    category: "erlebnis",
    quartier: "kreis-3",
    authorName: "Daniel R.",
    authorVerified: true,
    authorQuartier: "kreis-3",
    hoursAgo: 12,
    likes: 156,
    comments: 28,
    bookmarks: 44,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Wer kommt mit zum Quartier-Brunch?",
    body:
      "Wir starten am 15. einen monatlichen Brunch im Quartiertreff Wipkingen. Jede:r bringt was mit, Tische sind ab 10 Uhr offen. Idee: Nachbar:innen kennenlernen ohne Stress. Wenn ihr kommt, bitte kurz hier kommentieren damit wir Platz reservieren können.",
    category: "nachbarschaft",
    quartier: "kreis-6",
    authorName: "Anna H.",
    authorVerified: true,
    authorQuartier: "kreis-6",
    hoursAgo: 96,
    likes: 78,
    comments: 42,
    bookmarks: 19,
  },
  {
    headline: "Schwarze Lederhandschuhe gefunden — Bürkliplatz",
    body:
      "Heute Morgen am Bürkliplatz auf einer Bank schwarze Lederhandschuhe gefunden, Männergrösse, hochwertig (Marke innen: 'Roeckl'). Bringe sie heute Abend zur Polizei wenn sich niemand meldet.",
    category: "lost-found",
    quartier: "kreis-2",
    authorName: "Tom K.",
    authorVerified: false,
    authorQuartier: "kreis-2",
    hoursAgo: 8,
    likes: 5,
    comments: 3,
  },
  {
    headline: "Geheim-Spot: Strandbad Tiefenbrunnen morgens",
    body:
      "Wer wie ich pendelt: das Strandbad Tiefenbrunnen ist morgens vor 9 Uhr fast leer. 3 Bahnen frei, Wasser ruhig, See spiegelt sich. Beste Vorbereitung für einen stressigen Banken-Tag in der City.",
    category: "empfehlung",
    quartier: "goldkueste",
    authorName: "Sebastian F.",
    authorVerified: true,
    authorQuartier: "goldkueste",
    hoursAgo: 50,
    likes: 91,
    comments: 7,
    bookmarks: 28,
    photos: [
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Vertrauenswürdiger Velo-Mechaniker Altstetten?",
    body:
      "Mein Velo macht seltsame Geräusche beim Bremsen. Habe schlechte Erfahrungen mit Ketten-Mechanikern gemacht. Kennt jemand jemanden in Altstetten oder Albisrieden der ehrlich Preis macht?",
    category: "frage",
    quartier: "kreis-9",
    authorName: "Patrick L.",
    authorVerified: false,
    authorQuartier: "kreis-9",
    hoursAgo: 28,
    likes: 8,
    comments: 17,
  },
  {
    headline: "Café Tribeca am Helvetiaplatz hat zugemacht",
    body:
      "Nach 14 Jahren ist heute der letzte Tag von Café Tribeca am Helvetiaplatz. Die Inhaber gehen in Pension. Habe gerade einen letzten Kaffee getrunken. Sehr emotional — so viele Erinnerungen an dieses Quartier-Wahrzeichen.",
    category: "stadt-beobachtung",
    quartier: "kreis-4",
    authorName: "Mira S.",
    authorVerified: true,
    authorQuartier: "kreis-4",
    hoursAgo: 6,
    likes: 124,
    comments: 38,
    bookmarks: 17,
    photos: [
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Suche Garage zum Mieten Oerlikon",
    body:
      "Familie sucht Garage oder festen Parkplatz in Oerlikon ab 1. März. Bin bereit CHF 250-300/Monat zu zahlen. Zuverlässiger Mieter, 5 Jahre Job in Zürich, Referenzen vorhanden.",
    category: "suche-biete",
    quartier: "kreis-11",
    authorName: "Roman T.",
    authorVerified: false,
    authorQuartier: "kreis-11",
    hoursAgo: 72,
    likes: 4,
    comments: 2,
  },
  {
    headline: "Spontaner Strassen-Konzert an der Geroldstrasse",
    body:
      "Heute Abend gegen 19 Uhr haben 5 junge Musiker einen spontanen Auftritt vor dem Frau Gerolds Garten gemacht. Saxophone, Trompete, Kontrabass. Hat geschätzt 80 Leute angezogen, die alle stehen geblieben sind. Solche Momente machen diese Stadt aus.",
    category: "erlebnis",
    quartier: "kreis-5",
    authorName: "Karen M.",
    authorVerified: true,
    authorQuartier: "kreis-5",
    hoursAgo: 30,
    likes: 203,
    comments: 19,
    bookmarks: 51,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Phishing-SMS angeblich von ZKB",
    body:
      "Bekomme seit 2 Tagen SMS mit Links die angeblich von der ZKB sind ('Ihre Karte wurde gesperrt, hier klicken'). NICHT klicken. ZKB hat bestätigt dass das Phishing ist. Schon mehrere Personen in Schlieren betroffen.",
    category: "warnung",
    quartier: "limmattal",
    authorName: "Esther N.",
    authorVerified: true,
    authorQuartier: "limmattal",
    hoursAgo: 9,
    likes: 52,
    comments: 14,
  },
  {
    headline: "Beste Aussicht für Sonnenuntergang: Käferberg",
    body:
      "Insider-Tipp wenn ihr in Höngg oder Wipkingen seid: hinter dem Wäldchen am Käferberg gibt's eine Wiese mit Bank, von der man die ganze Stadt plus See plus Alpen sieht. Im Sommer ab 20:30 magisch. Bringt ein Bier mit.",
    category: "empfehlung",
    quartier: "kreis-10",
    authorName: "Michael F.",
    authorVerified: true,
    authorQuartier: "kreis-10",
    hoursAgo: 100,
    likes: 168,
    comments: 22,
    bookmarks: 62,
    photos: [
      "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Welche Schule für mein Kind in Männedorf?",
    body:
      "Ziehen mit unserem Sohn (8) im Sommer nach Männedorf. Erfahrungen mit den verschiedenen Schulen vor Ort? Wir schwanken zwischen öffentlich und Tagesschule Pestalozzi. Eltern, was würdet ihr machen?",
    category: "frage",
    quartier: "pfannenstiel",
    authorName: "Sandra K.",
    authorVerified: false,
    authorQuartier: "pfannenstiel",
    hoursAgo: 56,
    likes: 11,
    comments: 26,
  },
  {
    headline: "Schwarze Katze entlaufen — Universitätsstrasse",
    body:
      "Unser Kater Mowgli ist seit gestern Abend verschwunden. Schwarz, weisser Brustfleck, sehr zutraulich, hat ein blaues Halsband mit Telefonnummer. Bitte Augen offen halten, danke!",
    category: "lost-found",
    quartier: "kreis-6",
    authorName: "Lara O.",
    authorVerified: false,
    authorQuartier: "kreis-6",
    hoursAgo: 14,
    likes: 47,
    comments: 9,
    photos: [
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Schwamendingen Frühlings-Putzete am 23. März",
    body:
      "Wir organisieren wieder eine Quartier-Putzete in Schwamendingen. Treffpunkt 9 Uhr beim Schwamendinger Platz, Material gibt's dort. Anschliessend Mittagessen im Quartiertreff (gratis für alle Helfer:innen). Bitte einschreiben!",
    category: "nachbarschaft",
    quartier: "kreis-12",
    authorName: "Beat W.",
    authorVerified: true,
    authorQuartier: "kreis-12",
    hoursAgo: 120,
    likes: 89,
    comments: 34,
    bookmarks: 14,
  },
  {
    headline: "Niederdorf-Spaziergang mit der Grossmutter",
    body:
      "War mit meiner 84-jährigen Grossmutter gestern im Niederdorf — sie hat hier in den 60ern als junge Frau gewohnt. Sie hat mir Ecken gezeigt, die ich noch nie gesehen habe, obwohl ich seit 10 Jahren in Zürich wohne. Das Café Schober, der Hinterhof am Predigerplatz, die Buchhandlung am Spiegelgasse. Erinnerungen sind manchmal die beste Stadtkarte.",
    category: "erlebnis",
    quartier: "kreis-1",
    authorName: "Naomi V.",
    authorVerified: true,
    authorQuartier: "kreis-1",
    hoursAgo: 75,
    likes: 287,
    comments: 45,
    bookmarks: 96,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Biete: 2 Tickets Coldplay Letzigrund Juni",
    body:
      "Habe 2 Tickets für Coldplay am 15. Juni, Sektor B. Können leider nicht hin, möchte sie zum Original-Preis weitergeben (CHF 195/Stück). Tausch via Ticketcorner offiziell, keine Vorauszahlung.",
    category: "suche-biete",
    quartier: "kreis-7",
    authorName: "Christina B.",
    authorVerified: true,
    authorQuartier: "kreis-7",
    hoursAgo: 27,
    likes: 23,
    comments: 19,
  },
  {
    headline: "Neue Bäckerei am Kreuzplatz",
    body:
      "Hat heute eröffnet: 'Brot & Butter' am Kreuzplatz, direkt neben dem Bus-Halt. Croissants sind echt französisch, Butter aus der Bretagne. Kostet etwas mehr als ne normale Bäckerei (CHF 4.50 pro Croissant) aber Qualität ist top.",
    category: "stadt-beobachtung",
    quartier: "kreis-8",
    authorName: "Florian R.",
    authorVerified: true,
    authorQuartier: "kreis-8",
    hoursAgo: 7,
    likes: 56,
    comments: 12,
    photos: [
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=70",
    ],
  },
  {
    headline: "Defekte Ampel Hardplatz — vorsichtig fahren",
    body:
      "Die Ampel an der Kreuzung Hardplatz/Badenerstrasse ist seit gestern abend defekt. Gelbes Blinklicht, Vorrang verwirrend. Stadt ist informiert, dauert anscheinend bis morgen. Vorsicht beim Velo fahren!",
    category: "warnung",
    quartier: "kreis-3",
    authorName: "Andreas Q.",
    authorVerified: false,
    authorQuartier: "kreis-3",
    hoursAgo: 11,
    likes: 31,
    comments: 6,
  },
  {
    headline: "Bibliothek Affoltern — Geheimtipp zum Arbeiten",
    body:
      "Habe diese Woche das erste Mal in der Quartierbibliothek Affoltern gearbeitet. Riesig grosse Tische am Fenster, gratis Wifi, fast niemand da. Viel besser als die ETH-Bib wo man nie einen Platz findet. Geöffnet bis 19 Uhr.",
    category: "empfehlung",
    quartier: "kreis-11",
    authorName: "Vera D.",
    authorVerified: true,
    authorQuartier: "kreis-11",
    hoursAgo: 48,
    likes: 73,
    comments: 8,
    bookmarks: 23,
  },
  {
    headline: "Suche Mitspieler:innen für Pickleball",
    body:
      "Spiele jetzt seit 6 Monaten Pickleball auf dem Platz beim Toni-Areal. Wer hat Lust mitzumachen? Komplett Anfänger okay, ich erkläre alles. Mittwochs 18-20 Uhr und Samstag morgens. Einfach hier kommentieren oder DM.",
    category: "nachbarschaft",
    quartier: "kreis-5",
    authorName: "Tobias L.",
    authorVerified: false,
    authorQuartier: "kreis-5",
    hoursAgo: 29,
    likes: 19,
    comments: 11,
  },
];

export const PINNWAND_POSTS: PinnwandPost[] = RAW_POSTS.map((p, i) => {
  const id = String(i + 1).padStart(3, "0");
  const slug = `${id}-${slugify(p.headline ?? p.body.slice(0, 40))}`;
  return {
    id,
    slug,
    headline: p.headline,
    body: p.body,
    category: p.category,
    quartier: p.quartier,
    author: {
      name: p.authorName,
      avatarColor: avatarFor(p.authorName),
      verified: p.authorVerified,
      quartier: p.authorQuartier,
    },
    createdAt: isoOffset(p.hoursAgo),
    likes: p.likes,
    comments: p.comments,
    bookmarks: p.bookmarks ?? Math.round(p.likes * 0.25),
    featured: p.featured,
    photos: p.photos,
  };
});

export function getPostById(id: string): PinnwandPost | undefined {
  return PINNWAND_POSTS.find((p) => p.id === id || p.slug === id);
}

export function getRelatedPosts(post: PinnwandPost, limit = 3): PinnwandPost[] {
  const sameQuartier = PINNWAND_POSTS.filter(
    (p) => p.id !== post.id && p.quartier === post.quartier
  );
  const sameCategory = PINNWAND_POSTS.filter(
    (p) =>
      p.id !== post.id &&
      p.category === post.category &&
      !sameQuartier.some((q) => q.id === p.id)
  );
  return [...sameQuartier, ...sameCategory].slice(0, limit);
}

const COMMENT_TEMPLATES: Array<Omit<PinnwandComment, "id" | "postId" | "createdAt">> = [
  {
    authorName: "Mira L.",
    authorVerified: true,
    body: "Danke fürs Teilen — genau die Art Tipp, die ich auf der Pinnwand suche.",
    likes: 4,
  },
  {
    authorName: "Jonas R.",
    authorVerified: false,
    body: "Bin am Wochenende zufällig auch dort gewesen, kann das nur unterschreiben.",
    likes: 2,
  },
  {
    authorName: "Sophie A.",
    authorVerified: true,
    body: "Spannend. Hat jemand mehr Kontext dazu? Würde gerne mehr erfahren.",
    likes: 6,
  },
  {
    authorName: "Reto B.",
    authorVerified: false,
    body: "Ich war skeptisch, aber nach deinem Post probier ich's diese Woche aus.",
    likes: 1,
  },
  {
    authorName: "Aylin D.",
    authorVerified: true,
    body: "Habe das gleiche im Nachbar-Quartier beobachtet — schön, dass es nicht nur uns betrifft.",
    likes: 3,
  },
];

export function getCommentsForPost(postId: string): PinnwandComment[] {
  // Deterministic by postId — same post always gets the same comments
  const seed = parseInt(postId, 10) || 1;
  const count = 3 + (seed % 3);
  const out: PinnwandComment[] = [];
  for (let i = 0; i < count; i++) {
    const tpl = COMMENT_TEMPLATES[(seed + i) % COMMENT_TEMPLATES.length];
    out.push({
      id: `${postId}-c${i + 1}`,
      postId,
      authorName: tpl.authorName,
      authorVerified: tpl.authorVerified,
      body: tpl.body,
      createdAt: isoOffset(2 + i * 5 + (seed % 7)),
      likes: tpl.likes,
    });
  }
  return out;
}
