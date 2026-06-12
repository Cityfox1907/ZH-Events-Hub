// ─────────────────────────────────────────────────────────────
// ENTDECKEN — Stadtfeste & Stadt-Organisationen im Kanton Zürich
// plus Events aus der Community (von Nutzer:innen erstellt).
// Jedes Fest und jede Organisation hat eine eigene Seite mit
// Diskussion, Fragen & Hilfe.
// ─────────────────────────────────────────────────────────────

const IMG = (q: string, w = 1600, h = 1100) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

const AVATAR = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f7f2ea,efe7d8,fdfaf3`;

// ─────────────────────────────────────────────────────────────
// TYPEN
// ─────────────────────────────────────────────────────────────

export interface EntdeckenKommentar {
  autor: string;
  quartier: string;
  text: string;
  ago: string;
  avatar: string;
}

export interface Stadtfest {
  slug: string;
  name: string;
  untertitel: string;
  kategorie: string;
  stadt: string;
  ort: string;
  datumLabel: string;
  besucher: string;
  organisator: string;
  organisatorSlug?: string;
  beschreibung: string;
  bild: string;
  big?: boolean;
  hilfeThemen: string[];
  kommentare: EntdeckenKommentar[];
}

export interface StadtOrganisation {
  slug: string;
  name: string;
  kurz: string;
  sitz: string;
  beschreibung: string;
  bild: string;
  zustaendigFuer: string[];
  hilfeThemen: string[];
  kommentare: EntdeckenKommentar[];
}

export interface NutzerEvent {
  id: string;
  titel: string;
  datumLabel: string;
  zeit: string;
  ort: string;
  stadt: string;
  bild: string;
  beschreibung: string;
  host: { name: string; avatar: string };
  teilnehmer: number;
  kommentare: EntdeckenKommentar[];
}

// ─────────────────────────────────────────────────────────────
// DIE GROSSEN STADTFESTE IM KANTON ZÜRICH
// ─────────────────────────────────────────────────────────────

export const STADTFESTE: Stadtfest[] = [
  {
    slug: "zueri-faescht",
    name: "Züri Fäscht",
    untertitel: "Das grösste Volksfest der Schweiz",
    kategorie: "Volksfest",
    stadt: "Zürich",
    ort: "Seebecken & Innenstadt",
    datumLabel: "Fr–So · 3.–5. Juli 2026",
    besucher: "≈ 2 Mio. Besucher:innen",
    organisator: "Verein Zürcher Volksfeste",
    organisatorSlug: "verein-zuercher-volksfeste",
    beschreibung:
      "Alle drei Jahre verwandelt sich das Seebecken in eine riesige Festmeile: Feuerwerk über dem See, Flugshows, Chilbi-Bahnen, Hunderte Essensstände und Bühnen in der ganzen Innenstadt. Das Züri Fäscht ist das grösste Volksfest der Schweiz — und 2026 ist es wieder so weit.",
    bild: IMG("1467810563316-b5476525c0f9", 2400, 1400),
    big: true,
    hilfeThemen: ["Anreise & ÖV", "Barrierefreiheit", "Mit Kindern ans Fest", "Standplätze & Mitwirken", "Fundbüro"],
    kommentare: [
      { autor: "Marc", quartier: "Kreis 6", text: "Bester Feuerwerk-Spot: Quaibrücke-Seite Richtung Bellevue — aber früh da sein!", ago: "Vor 2 Std", avatar: AVATAR("Marc") },
      { autor: "Aylin", quartier: "Kreis 4", text: "Weiss jemand, ob es wieder einen ruhigen Familienbereich beim Arboretum gibt?", ago: "Vor 5 Std", avatar: AVATAR("Aylin") },
      { autor: "Reto", quartier: "Kreis 9", text: "Wir suchen noch zwei Helfer:innen für unseren Verein-Stand am Samstag. Meldet euch hier!", ago: "Vor 1 Tag", avatar: AVATAR("Reto") },
    ],
  },
  {
    slug: "street-parade",
    name: "Street Parade",
    untertitel: "Die grösste Techno-Party der Welt",
    kategorie: "Musik & Parade",
    stadt: "Zürich",
    ort: "Seebecken, Quaibrücke & Utoquai",
    datumLabel: "Sa · 8. August 2026",
    besucher: "≈ 1 Mio. Besucher:innen",
    organisator: "Verein Street Parade Zürich",
    organisatorSlug: "verein-street-parade",
    beschreibung:
      "Eine Million Menschen, rund 30 Love-Mobiles, ein Beat: Seit 1992 zieht die Street Parade rund ums Seebecken und macht Zürich für einen Tag zur grössten Techno-Stadt der Welt. Friedlich, bunt und laut — unter dem Motto der Liebe und Toleranz.",
    bild: IMG("1518709268805-4e9042af2176", 2400, 1400),
    big: true,
    hilfeThemen: ["Anreise & ÖV", "Sanität & Sicherheit", "Gehörschutz & Kinder", "Wasser & Schattenplätze"],
    kommentare: [
      { autor: "Yannick", quartier: "Kreis 4", text: "Sonnencreme, Wasser, Sneakers — mehr braucht's nicht. Seit 2008 jedes Jahr dabei.", ago: "Vor 3 Std", avatar: AVATAR("Yannick") },
      { autor: "Lisa", quartier: "Kreis 5", text: "Gibt es dieses Jahr wieder die ruhige Zone beim Utoquai für Pausen?", ago: "Vor 8 Std", avatar: AVATAR("Lisa") },
    ],
  },
  {
    slug: "sechselaeuten",
    name: "Sechseläuten",
    untertitel: "Das Frühlingsfest der Zürcher Zünfte",
    kategorie: "Tradition",
    stadt: "Zürich",
    ort: "Sechseläutenplatz & Innenstadt",
    datumLabel: "So–Mo · 18.–19. April 2027",
    besucher: "> 100'000 Besucher:innen",
    organisator: "Zentralkomitee der Zünfte Zürichs",
    organisatorSlug: "zentralkomitee-zuenfte",
    beschreibung:
      "Am Sonntag ziehen die Kinder, am Montag die Zünfte in historischen Trachten durch die Stadt. Um Punkt 18 Uhr wird der Böögg verbrannt — und je schneller sein Kopf explodiert, desto schöner wird der Sommer. Zürcher Tradition seit Jahrhunderten.",
    bild: IMG("1543589077-47d81606c1bf", 2400, 1400),
    hilfeThemen: ["Umzugsroute & Zeiten", "Beste Plätze am Platz", "Mit Kindern dabei", "Böögg-Wette"],
    kommentare: [
      { autor: "Anna", quartier: "Kreis 7", text: "Mein Highlight des Jahres. Punkt.", ago: "Vor 1 Tag", avatar: AVATAR("Anna") },
      { autor: "Tom", quartier: "Kreis 4", text: "Tradition pur — und das beste Bratwurst-Bier-Verhältnis der Stadt.", ago: "Vor 2 Tagen", avatar: AVATAR("Tom") },
    ],
  },
  {
    slug: "knabenschiessen",
    name: "Knabenschiessen",
    untertitel: "Zürichs ältester Volksanlass seit 1656",
    kategorie: "Volksfest",
    stadt: "Zürich",
    ort: "Albisgüetli, Kreis 2",
    datumLabel: "Sa–Mo · 12.–14. September 2026",
    besucher: "≈ 300'000 Besucher:innen",
    organisator: "Schützengesellschaft der Stadt Zürich",
    organisatorSlug: "stadt-zuerich",
    beschreibung:
      "Schiesswettbewerb für Jugendliche, riesige Chilbi mit Riesenrad und Magenbrot, halber Feiertag am Montag: Das Knabenschiessen im Albisgüetli ist Zürichs ältester Volksanlass — und einer der grössten Jahrmärkte der Schweiz.",
    bild: IMG("1567361424669-87ed10985b80", 2400, 1400),
    hilfeThemen: ["Anreise & ÖV", "Chilbi mit Kindern", "Teilnahme am Schiessen", "Öffnungszeiten"],
    kommentare: [
      { autor: "Linda", quartier: "Kreis 3", text: "Magenbrot-Tasche und Riesenrad — das ist Herbst.", ago: "Vor 4 Std", avatar: AVATAR("Linda") },
      { autor: "Reto", quartier: "Kreis 9", text: "Mein erstes Knabenschiessen mit Tochter — magisch.", ago: "Vor 1 Tag", avatar: AVATAR("RetoK") },
    ],
  },
  {
    slug: "albanifest",
    name: "Albanifest",
    untertitel: "Das grösste jährliche Altstadtfest der Schweiz",
    kategorie: "Stadtfest",
    stadt: "Winterthur",
    ort: "Altstadt Winterthur",
    datumLabel: "Fr–So · 26.–28. Juni 2026",
    besucher: "≈ 100'000 Besucher:innen",
    organisator: "Stadt Winterthur & Winterthurer Vereine",
    organisatorSlug: "stadt-winterthur",
    beschreibung:
      "Drei Tage lang gehört die Winterthurer Altstadt den Festbeizen, Bühnen und Bahnen: Über 100 Vereine bewirten an Ständen, auf den Plätzen spielen Bands — das Albanifest ist das grösste jährlich stattfindende Altstadtfest der Schweiz.",
    bild: IMG("1485518882345-15568b007407", 2400, 1400),
    big: true,
    hilfeThemen: ["Anreise aus Zürich", "Festbeizen-Plan", "Vereins-Stand anmelden", "Nachtzüge"],
    kommentare: [
      { autor: "Selin", quartier: "Winterthur", text: "Die Festwirtschaft vom Handharmonika-Club ist jedes Jahr die beste. Fight me.", ago: "Vor 6 Std", avatar: AVATAR("Selin") },
      { autor: "Pascal", quartier: "Kreis 5", text: "Lohnt sich die Anreise aus der Stadt? — Ja. Letzter Zug zurück fährt 0:43.", ago: "Vor 1 Tag", avatar: AVATAR("Pascal") },
    ],
  },
  {
    slug: "theater-spektakel",
    name: "Zürcher Theater Spektakel",
    untertitel: "Internationales Theaterfestival auf der Landiwiese",
    kategorie: "Kultur",
    stadt: "Zürich",
    ort: "Landiwiese & Saffa-Insel",
    datumLabel: "Do–So · 13.–30. August 2026",
    besucher: "≈ 100'000 Besucher:innen",
    organisator: "Stadt Zürich Kultur",
    organisatorSlug: "stadt-zuerich",
    beschreibung:
      "Internationales Theater, Tanz und Performance direkt am See: Das Theater Spektakel auf der Landiwiese gehört zu den wichtigsten Festivals der freien Szene Europas — mit Beizli, Seeblick und Vorstellungen für alle Generationen.",
    bild: IMG("1503095396549-807759245b35", 2400, 1400),
    hilfeThemen: ["Tickets & Abendkasse", "Programm für Familien", "Anreise & Velo-Parking", "Barrierefreiheit"],
    kommentare: [
      { autor: "Anna", quartier: "Kreis 2", text: "Jedes Jahr 4 Vorstellungen. Mein Sommer-Pflichtprogramm.", ago: "Vor 2 Tagen", avatar: AVATAR("AnnaK2") },
    ],
  },
  {
    slug: "caliente",
    name: "Caliente Festival",
    untertitel: "Das grösste Latin-Festival Europas",
    kategorie: "Musik",
    stadt: "Zürich",
    ort: "Bürkliplatz & Bellevue",
    datumLabel: "Fr–So · 10.–12. Juli 2026",
    besucher: "≈ 150'000 Besucher:innen",
    organisator: "Caliente! Festival",
    beschreibung:
      "Drei Tage Latino-Sommer mitten in der Stadt: Der Bürkliplatz wird zur Salsa-Strasse, das Bellevue zur Reggaeton-Bühne. Livebands, Food-Stände und Tanz bis in die Nacht — das Caliente ist das grösste Latin-Festival Europas.",
    bild: IMG("1429962714451-bb934ecdc4ec", 2400, 1400),
    hilfeThemen: ["Programm & Bühnen", "Tanzkurse am Festival", "Anreise & ÖV"],
    kommentare: [
      { autor: "Carmen", quartier: "Kreis 4", text: "Caliente ist mein Heimweh-Medikament.", ago: "Vor 7 Std", avatar: AVATAR("Carmen") },
    ],
  },
  {
    slug: "zurich-pride",
    name: "Zurich Pride Festival",
    untertitel: "Das grösste Pride-Festival der Schweiz",
    kategorie: "Parade & Festival",
    stadt: "Zürich",
    ort: "Innenstadt & Kasernenareal",
    datumLabel: "Fr–Sa · 19.–20. Juni 2026",
    besucher: "≈ 50'000 Teilnehmende",
    organisator: "Verein Zurich Pride Festival",
    beschreibung:
      "50'000 Menschen ziehen durch die Stadt: Demonstration, Festival und Fest zugleich. Auf dem Kasernenareal warten Bühnen, Bars und Community-Stände — die Zurich Pride ist das grösste LGBTQ+-Festival der Schweiz.",
    bild: IMG("1591622434-d8e02d9d2eb1", 2400, 1400),
    hilfeThemen: ["Demo-Route & Treffpunkt", "Safer Space & Awareness", "Mitlaufen mit Gruppe"],
    kommentare: [
      { autor: "Sarah", quartier: "Kreis 4", text: "Meine Mutter ist 2016 zum ersten Mal mitgelaufen. Seither gehen wir zusammen.", ago: "Vor 3 Std", avatar: AVATAR("Sarah") },
      { autor: "Lukas", quartier: "Kreis 5", text: "Best vibes der Welt — kommt alle am Freitag schon ans Kasernenareal.", ago: "Vor 1 Tag", avatar: AVATAR("Lukas") },
    ],
  },
  {
    slug: "winterthurer-musikfestwochen",
    name: "Winterthurer Musikfestwochen",
    untertitel: "Gratis-Konzerte in der Altstadt — seit 1976",
    kategorie: "Musik",
    stadt: "Winterthur",
    ort: "Steinberggasse & Altstadt",
    datumLabel: "Mi–So · 12.–30. August 2026",
    besucher: "≈ 60'000 Besucher:innen",
    organisator: "Verein Winterthurer Musikfestwochen",
    organisatorSlug: "stadt-winterthur",
    beschreibung:
      "Zweieinhalb Wochen Livemusik unter freiem Himmel: Die Musikfestwochen verwandeln die Steinberggasse in ein Festivalgelände — ein grosser Teil des Programms ist gratis, getragen von Hunderten Freiwilligen.",
    bild: IMG("1493225457124-a3eb161ffa5f", 2400, 1400),
    hilfeThemen: ["Programm & Acts", "Freiwillige werden", "Anreise aus Zürich"],
    kommentare: [
      { autor: "Sara", quartier: "Winterthur", text: "Meine Lieblingsband habe ich 2022 hier entdeckt. Geht hin, auch ohne Plan.", ago: "Vor 9 Std", avatar: AVATAR("SaraW") },
    ],
  },
  {
    slug: "wienachtsdorf",
    name: "Wienachtsdorf & Weihnachtsmärkte",
    untertitel: "Zürichs Adventszeit am Bellevue",
    kategorie: "Markt",
    stadt: "Zürich",
    ort: "Sechseläutenplatz & Innenstadt",
    datumLabel: "Täglich · 19. Nov – 23. Dez 2026",
    besucher: "> 500'000 Besucher:innen",
    organisator: "Stadt Zürich & Wienachtsdorf",
    organisatorSlug: "stadt-zuerich",
    beschreibung:
      "Glühwein-Hütten, Raclette-Stände, Design-Geschenke und Lichter über dem Sechseläutenplatz: Das Wienachtsdorf am Bellevue ist der inoffizielle Start der Zürcher Weihnachtszeit — zusammen mit den Märkten im Hauptbahnhof und im Niederdorf.",
    bild: IMG("1542838132-92c53300491e", 2400, 1400),
    hilfeThemen: ["Standbetreiber:in werden", "Öffnungszeiten", "Märkte-Übersicht"],
    kommentare: [
      { autor: "Eva", quartier: "Kreis 6", text: "Erster Glühwein = Weihnachten beginnt offiziell. Das ist Zürcher Gesetz.", ago: "Vor 3 Tagen", avatar: AVATAR("Eva") },
    ],
  },
  {
    slug: "silvesterzauber",
    name: "Silvesterzauber",
    untertitel: "Feuerwerk über dem Seebecken",
    kategorie: "Volksfest",
    stadt: "Zürich",
    ort: "Seebecken & Quais",
    datumLabel: "Do · 31. Dezember 2026",
    besucher: "≈ 150'000 Besucher:innen",
    organisator: "Zürich Tourismus",
    organisatorSlug: "zuerich-tourismus",
    beschreibung:
      "Festwirtschaften an den Quais, Bühnen, und um Mitternacht das grosse Feuerwerk über dem See: Der Silvesterzauber ist Zürichs gemeinsamer Jahreswechsel — am Nachmittag rennt ausserdem der traditionelle Silvesterlauf durchs Niederdorf.",
    bild: IMG("1514849302-984523450cf4", 2400, 1400),
    hilfeThemen: ["Beste Feuerwerk-Spots", "Anreise & Nachtnetz", "Silvesterlauf-Anmeldung"],
    kommentare: [
      { autor: "Lukas", quartier: "Kreis 4", text: "Beste Sicht: Münsterbrücke. Vor 23:00 da sein.", ago: "Vor 5 Tagen", avatar: AVATAR("LukasS") },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// OFFIZIELLE STADT-ORGANISATIONEN
// ─────────────────────────────────────────────────────────────

export const STADT_ORGANISATIONEN: StadtOrganisation[] = [
  {
    slug: "stadt-zuerich",
    name: "Stadt Zürich — Präsidialdepartement",
    kurz: "Bewilligt und koordiniert die Grossanlässe der Stadt",
    sitz: "Stadthaus, Zürich",
    beschreibung:
      "Das Präsidialdepartement der Stadt Zürich koordiniert die grossen Feste im öffentlichen Raum: Bewilligungen, Sicherheit, Verkehrskonzepte und die Zusammenarbeit mit den Veranstaltern — vom Theater Spektakel bis zum Knabenschiessen.",
    bild: IMG("1558981403-c5f9899a28bc", 1600, 1100),
    zustaendigFuer: ["Theater Spektakel", "Knabenschiessen", "Wienachtsdorf", "Bewilligungen"],
    hilfeThemen: ["Anlass bewilligen lassen", "Strassensperrungen", "Lärmschutz & Ruhezeiten"],
    kommentare: [
      { autor: "Deniz", quartier: "Kreis 3", text: "Wie früh muss ich ein Quartierfest auf einem Platz anmelden? Hat jemand Erfahrung?", ago: "Vor 4 Std", avatar: AVATAR("Deniz") },
      { autor: "Mara", quartier: "Kreis 6", text: "Bei uns hat die Bewilligung fürs Strassenfest 6 Wochen gedauert — früh einreichen!", ago: "Vor 1 Tag", avatar: AVATAR("Mara") },
    ],
  },
  {
    slug: "zuerich-tourismus",
    name: "Zürich Tourismus",
    kurz: "Vermarktet die Stadt und trägt den Silvesterzauber",
    sitz: "Hauptbahnhof, Zürich",
    beschreibung:
      "Zürich Tourismus vermarktet die Stadt national und international, betreibt die Tourist-Information im Hauptbahnhof und ist Trägerin des Silvesterzaubers am Seebecken.",
    bild: IMG("1527668752968-14dc70a27c95", 1600, 1100),
    zustaendigFuer: ["Silvesterzauber", "Tourist-Information", "Stadtführungen"],
    hilfeThemen: ["Event-Kalender & Infos", "Gruppenführungen", "Partner werden"],
    kommentare: [
      { autor: "Jonas", quartier: "Kreis 8", text: "Die Stadtführung 'Zürich West' kann ich sehr empfehlen — auch für Einheimische.", ago: "Vor 2 Tagen", avatar: AVATAR("Jonas") },
    ],
  },
  {
    slug: "verein-zuercher-volksfeste",
    name: "Verein Zürcher Volksfeste",
    kurz: "Trägerverein des Züri Fäscht",
    sitz: "Zürich",
    beschreibung:
      "Der Verein Zürcher Volksfeste organisiert alle drei Jahre das Züri Fäscht — gemeinsam mit den Zürcher Zünften, Quartiervereinen und Hunderten von Standbetreibern. Hier laufen Standvergabe, Programm und Freiwilligen-Koordination zusammen.",
    bild: IMG("1490750967868-88aa4486c946", 1600, 1100),
    zustaendigFuer: ["Züri Fäscht 2026", "Standvergabe", "Freiwillige"],
    hilfeThemen: ["Standplatz bewerben", "Freiwillige:r werden", "Sponsoring"],
    kommentare: [
      { autor: "Fatma", quartier: "Kreis 11", text: "Standbewerbung für 2026 lief bis Januar — wer es verpasst hat: Warteliste existiert!", ago: "Vor 1 Tag", avatar: AVATAR("Fatma") },
    ],
  },
  {
    slug: "zentralkomitee-zuenfte",
    name: "Zentralkomitee der Zünfte Zürichs",
    kurz: "Organisiert das Sechseläuten",
    sitz: "Zürich",
    beschreibung:
      "Das ZZZ vereint die 26 Zürcher Zünfte und organisiert das Sechseläuten: den Kinderumzug am Sonntag, den Zug der Zünfte am Montag und die Verbrennung des Bööggs auf dem Sechseläutenplatz.",
    bild: IMG("1493244040629-496f6d136cc3", 1600, 1100),
    zustaendigFuer: ["Sechseläuten", "Böögg", "Umzüge"],
    hilfeThemen: ["Kinderumzug-Anmeldung", "Tribünenplätze", "Gastkanton"],
    kommentare: [
      { autor: "Hans", quartier: "Kreis 6", text: "Die Böögg-Werkstatt kann man im März besuchen — das Beste an Sechseläuten.", ago: "Vor 3 Tagen", avatar: AVATAR("Hans") },
    ],
  },
  {
    slug: "verein-street-parade",
    name: "Verein Street Parade Zürich",
    kurz: "Veranstaltet die Street Parade",
    sitz: "Zürich",
    beschreibung:
      "Der gemeinnützige Verein hinter der grössten Techno-Parade der Welt: Love-Mobile-Anmeldungen, Sicherheits- und Sanitätskonzept, Awareness-Teams und die Zusammenarbeit mit Stadt und VBZ.",
    bild: IMG("1571266028243-d220c6a32ae1", 1600, 1100),
    zustaendigFuer: ["Street Parade", "Love-Mobiles", "Awareness"],
    hilfeThemen: ["Love-Mobile anmelden", "Helfer:in werden", "Sicherheit & Sanität"],
    kommentare: [
      { autor: "Nadia", quartier: "Kreis 5", text: "Das Awareness-Team sucht jedes Jahr Verstärkung — super Erfahrung, meldet euch.", ago: "Vor 6 Std", avatar: AVATAR("Nadia") },
    ],
  },
  {
    slug: "stadt-winterthur",
    name: "Stadt Winterthur — Stadtleben",
    kurz: "Koordiniert Albanifest & Musikfestwochen",
    sitz: "Stadthaus, Winterthur",
    beschreibung:
      "Der Bereich Stadtleben der Stadt Winterthur koordiniert die grossen Feste der zweitgrössten Stadt im Kanton: das Albanifest mit über 100 beteiligten Vereinen und die Musikfestwochen in der Altstadt.",
    bild: IMG("1481833761820-0509d3217039", 1600, 1100),
    zustaendigFuer: ["Albanifest", "Musikfestwochen", "Altstadt-Anlässe"],
    hilfeThemen: ["Festbeiz anmelden", "Vereins-Mitwirkung", "Bewilligungen Winterthur"],
    kommentare: [
      { autor: "Beat", quartier: "Winterthur", text: "Unser Turnverein ist seit 1985 mit einer Beiz dabei — Anmeldung läuft jeweils ab Januar.", ago: "Vor 2 Tagen", avatar: AVATAR("Beat") },
    ],
  },
  {
    slug: "quartiervereine-zuerich",
    name: "Quartierkonferenz Zürich",
    kurz: "Dachverband der 25 Quartiervereine",
    sitz: "Zürich",
    beschreibung:
      "Die Quartierkonferenz ist der Dachverband der Zürcher Quartiervereine. Die Vereine organisieren Quartier- und Dorffeste, Räbeliechtli-Umzüge und Flohmärkte — und sind die erste Anlaufstelle, wenn du in deinem Quartier etwas auf die Beine stellen willst.",
    bild: IMG("1530122037265-a5f1f91d3b99", 1600, 1100),
    zustaendigFuer: ["Quartierfeste", "Räbeliechtli-Umzüge", "Quartier-Flohmärkte"],
    hilfeThemen: ["Quartierfest organisieren", "Mitglied werden", "Raum & Material leihen"],
    kommentare: [
      { autor: "Priya", quartier: "Kreis 12", text: "Unser Quartierverein hat uns beim ersten Hoffest mega unterstützt — fragt einfach an.", ago: "Vor 1 Tag", avatar: AVATAR("Priya") },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// EVENTS AUS DER COMMUNITY (von Nutzer:innen erstellt)
// ─────────────────────────────────────────────────────────────

export const NUTZER_EVENTS: NutzerEvent[] = [
  {
    id: "ue-grill-katzensee",
    titel: "Grillplausch am Katzensee",
    datumLabel: "Sa · 20. Juni 2026",
    zeit: "17:00 Uhr",
    ort: "Badi Katzensee, Wiese Nord",
    stadt: "Zürich-Affoltern",
    bild: IMG("1492691527719-9d1e07e534b4", 1600, 1100),
    beschreibung:
      "Offener Grillabend für alle aus Affoltern, Seebach und Umgebung. Grillgut selber mitbringen, Glut und gute Laune sind organisiert.",
    host: { name: "Sara vom Kreis 11", avatar: AVATAR("SaraVomKreis11") },
    teilnehmer: 23,
    kommentare: [
      { autor: "Miguel", quartier: "Kreis 11", text: "Ich bringe Boccia-Kugeln mit — Wiese ist perfekt dafür.", ago: "Vor 1 Std", avatar: AVATAR("Miguel") },
      { autor: "Janine", quartier: "Kreis 6", text: "Darf man Hunde mitbringen?", ago: "Vor 3 Std", avatar: AVATAR("Janine") },
      { autor: "Sara vom Kreis 11", quartier: "Kreis 11", text: "@Janine klar, angeleint kein Problem!", ago: "Vor 2 Std", avatar: AVATAR("SaraVomKreis11") },
    ],
  },
  {
    id: "ue-sprachcafe",
    titel: "Sprachcafé International",
    datumLabel: "Do · 18. Juni 2026",
    zeit: "18:30 Uhr",
    ort: "Café Mandela, Kreis 4",
    stadt: "Zürich",
    bild: IMG("1495474472287-4d71bcdd2085", 1600, 1100),
    beschreibung:
      "Deutsch, Türkisch, Italienisch, Englisch — an jedem Tisch eine Sprache. Komm vorbei, trink einen Kaffee und sprich drauflos. Alle Niveaus willkommen.",
    host: { name: "Deniz", avatar: AVATAR("DenizSprachcafe") },
    teilnehmer: 31,
    kommentare: [
      { autor: "Elif", quartier: "Kreis 9", text: "War letztes Mal zum ersten Mal da — super herzliche Runde!", ago: "Vor 2 Std", avatar: AVATAR("Elif") },
      { autor: "Marco", quartier: "Kreis 3", text: "Gibt es auch einen Französisch-Tisch?", ago: "Vor 5 Std", avatar: AVATAR("Marco") },
    ],
  },
  {
    id: "ue-brettspielabend",
    titel: "Brettspielabend Winterthur",
    datumLabel: "Fr · 19. Juni 2026",
    zeit: "19:00 Uhr",
    ort: "Quartierzentrum Tössfeld",
    stadt: "Winterthur",
    bild: IMG("1524995997946-a1c2e315a42f", 1600, 1100),
    beschreibung:
      "Von Carcassonne bis Terraforming Mars — wir stellen 40+ Spiele, du bringst Schoggi oder Chips. Anfänger:innen ausdrücklich willkommen.",
    host: { name: "Beat & Co.", avatar: AVATAR("BeatSpiele") },
    teilnehmer: 18,
    kommentare: [
      { autor: "Selin", quartier: "Winterthur", text: "Reserviert mir jemand einen Platz am Catan-Tisch? 😄", ago: "Vor 4 Std", avatar: AVATAR("SelinW") },
    ],
  },
  {
    id: "ue-velotour-pfannenstiel",
    titel: "Velotour rund um den Pfannenstiel",
    datumLabel: "Sa · 27. Juni 2026",
    zeit: "09:00 Uhr",
    ort: "Treffpunkt Bahnhof Meilen",
    stadt: "Meilen",
    bild: IMG("1532298229144-0ec0c57515c7", 1600, 1100),
    beschreibung:
      "Gemütliche 45-km-Runde über Forch und Oetwil mit Kafi-Halt. Tempo: Plauder-Modus, keine Rennfahrer-Ambitionen. E-Bikes willkommen.",
    host: { name: "Velogruppe Zürisee", avatar: AVATAR("VelogruppeZuerisee") },
    teilnehmer: 14,
    kommentare: [
      { autor: "Urs", quartier: "Meilen", text: "Der Kafi-Halt in Oetwil ist Gold wert. Bin dabei.", ago: "Vor 1 Tag", avatar: AVATAR("Urs") },
      { autor: "Petra", quartier: "Kreis 8", text: "Geht die Route auch mit einem normalen Citybike?", ago: "Vor 6 Std", avatar: AVATAR("Petra") },
    ],
  },
  {
    id: "ue-vollmond-schwimmen",
    titel: "Vollmond-Schwimmen Seebad Enge",
    datumLabel: "Mi · 1. Juli 2026",
    zeit: "21:30 Uhr",
    ort: "Seebad Enge",
    stadt: "Zürich",
    bild: IMG("1559564484-e48eda6daa1f", 1600, 1100),
    beschreibung:
      "Schwimmen, wenn der Mond über dem See steht. Danach Tee auf dem Steg. Bitte Badesachen und Frottee-Tuch mitbringen — und gute Schwimmkenntnisse.",
    host: { name: "Mira", avatar: AVATAR("MiraSchwimmt") },
    teilnehmer: 27,
    kommentare: [
      { autor: "Tobi", quartier: "Kreis 5", text: "Letztes Mal war magisch. Wasser hatte 22 Grad.", ago: "Vor 8 Std", avatar: AVATAR("Tobi") },
      { autor: "Aylin", quartier: "Kreis 4", text: "Gibt es Schwimmwesten-Pflicht für unsichere Schwimmer:innen?", ago: "Vor 2 Std", avatar: AVATAR("AylinS") },
    ],
  },
  {
    id: "ue-flohmarkt-kreis4",
    titel: "Quartier-Flohmarkt Kreis 4",
    datumLabel: "So · 28. Juni 2026",
    zeit: "10:00–17:00 Uhr",
    ort: "Bäckeranlage",
    stadt: "Zürich",
    bild: IMG("1555041469-a586c61ea9bc", 1600, 1100),
    beschreibung:
      "Der grosse Sommer-Flohmi auf der Bäckeranlage: 80 Stände, Kuchenbuffet vom Quartierverein, Kinderecke. Standplätze für Anwohnende gratis.",
    host: { name: "Quartierverein Aussersihl", avatar: AVATAR("QVAussersihl") },
    teilnehmer: 64,
    kommentare: [
      { autor: "Nina", quartier: "Kreis 4", text: "Standanmeldung läuft noch bis Mittwoch — Link steht im Quartierbüro-Aushang.", ago: "Vor 5 Std", avatar: AVATAR("Nina") },
      { autor: "Samir", quartier: "Kreis 3", text: "Letztes Jahr eine Original-Eames-Lampe für 20 Stutz gefunden. Bin wieder da.", ago: "Vor 1 Tag", avatar: AVATAR("Samir") },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

export function getStadtfest(slug: string) {
  return STADTFESTE.find((f) => f.slug === slug);
}

export function getOrganisation(slug: string) {
  return STADT_ORGANISATIONEN.find((o) => o.slug === slug);
}
