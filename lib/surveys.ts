import { emitStorageChange } from "./storage";

export interface SurveyOption {
  id: string;
  label: string;
  votes: number;
}

export interface SurveyComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Survey {
  id: string;
  question: string;
  description?: string;
  author: string;
  createdAt: string;
  options: SurveyOption[];
  comments: SurveyComment[];
}

const KEY_SURVEYS = "zb.surveys.v1";
const KEY_USER_VOTES = "zb.surveys.userVotes.v1";
const KEY_SEED_FLAG = "zb.surveys.seeded.v1";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3600_000).toISOString();
}

function makeOptions(pro: number, contra: number): SurveyOption[] {
  return [
    { id: "pro", label: "Dafür", votes: pro },
    { id: "contra", label: "Dagegen", votes: contra },
  ];
}

function makeOptionsCustom(items: { id: string; label: string; votes: number }[]): SurveyOption[] {
  return items;
}

function seedSurveys(): Survey[] {
  return [
    {
      id: "s-velo-bahnhofstr",
      question: "Soll die Bahnhofstrasse für Velos freigegeben werden?",
      description:
        "Aktuell sind Velos auf der Bahnhofstrasse zwischen 11 und 23 Uhr verboten. Eine Freigabe würde Pendlerwege verkürzen, könnte aber Konflikte mit Fussgängern auslösen.",
      author: "Lina M., Kreis 1",
      createdAt: hoursAgo(18),
      options: makeOptions(412, 186),
      comments: [
        {
          id: "c1",
          author: "Tobi R.",
          text: "Endlich. Der Umweg via Sihlstrasse kostet mich jeden Tag fünf Minuten.",
          createdAt: hoursAgo(15),
        },
        {
          id: "c2",
          author: "Beatrice H.",
          text: "Bitte nicht. Mit Kindern und Einkaufstüten will ich nicht ständig ausweichen müssen.",
          createdAt: hoursAgo(11),
        },
        {
          id: "c3",
          author: "Andi",
          text: "Tempo 20 und gut ist. Bern kanns ja auch.",
          createdAt: hoursAgo(4),
        },
      ],
    },
    {
      id: "s-bellevue-tempo",
      question: "Tempo 30 auf dem Bellevueplatz – sinnvoll?",
      author: "Murat K., Kreis 8",
      createdAt: hoursAgo(40),
      options: makeOptions(298, 245),
      comments: [
        {
          id: "c1",
          author: "Sina",
          text: "Lärm geht runter, Sicherheit geht hoch. Klarer Fall.",
          createdAt: hoursAgo(32),
        },
        {
          id: "c2",
          author: "Roger F.",
          text: "Tram, Bus, Auto, Velo, Fussgänger – auf 30 wird das nur noch zäher.",
          createdAt: hoursAgo(20),
        },
      ],
    },
    {
      id: "s-zsc-arena",
      question: "War die ZSC-Arena in Altstetten ihr Geld wert?",
      description: "Erste Saison vorbei. Lohnt sich der Standort, oder fehlt das alte Hallenstadion-Gefühl?",
      author: "Fabienne O.",
      createdAt: hoursAgo(60),
      options: makeOptionsCustom([
        { id: "ja", label: "Ja, super Halle", votes: 521 },
        { id: "nein", label: "Nein, zu weit draussen", votes: 144 },
        { id: "weissnicht", label: "Bin selten dort", votes: 87 },
      ]),
      comments: [
        {
          id: "c1",
          author: "Reto",
          text: "Akustik ist Welten besser als im Hallenstadion.",
          createdAt: hoursAgo(55),
        },
        {
          id: "c2",
          author: "Petra",
          text: "Die letzte S-Bahn ist der Knackpunkt. Wenn das Spiel länger geht, wirds Taxi.",
          createdAt: hoursAgo(38),
        },
      ],
    },
    {
      id: "s-langstrasse-sicherheit",
      question: "Mehr Polizeipräsenz an der Langstrasse am Wochenende?",
      author: "Anonym, Kreis 4",
      createdAt: hoursAgo(30),
      options: makeOptions(367, 422),
      comments: [
        {
          id: "c1",
          author: "Elif",
          text: "Mehr Sozialarbeit, weniger Uniform. Sonst verlagert sichs nur.",
          createdAt: hoursAgo(28),
        },
        {
          id: "c2",
          author: "Markus B.",
          text: "Wer hier wohnt weiss: Freitag/Samstag ab 2 Uhr ist es teilweise heftig.",
          createdAt: hoursAgo(14),
        },
        {
          id: "c3",
          author: "Yannick",
          text: "Lieber bessere Beleuchtung im Kreuzungsbereich.",
          createdAt: hoursAgo(6),
        },
      ],
    },
    {
      id: "s-seebad-utoquai",
      question: "Soll das Seebad Utoquai im Winter geöffnet bleiben?",
      author: "Cornelia W.",
      createdAt: hoursAgo(72),
      options: makeOptions(289, 76),
      comments: [
        {
          id: "c1",
          author: "Jonas",
          text: "Eisbaden mit Sauna direkt am See – das wäre ein Statement.",
          createdAt: hoursAgo(60),
        },
      ],
    },
    {
      id: "s-glattalbahn",
      question: "Glattalbahn bis nach Schwamendingen verlängern?",
      description:
        "Die Stadt prüft eine Verlängerung der Linie 12. Befürworter sehen Entlastung der Tramachse, Kritiker fürchten Bauarbeiten über Jahre.",
      author: "Damir P., Schwamendingen",
      createdAt: hoursAgo(96),
      options: makeOptions(178, 91),
      comments: [
        {
          id: "c1",
          author: "Ivana",
          text: "Höchste Zeit. Der 31er ist morgens um 7 nicht mehr lustig.",
          createdAt: hoursAgo(80),
        },
      ],
    },
    {
      id: "s-mietpreisbremse",
      question: "Mietpreisbremse für Neubauten in der Stadt Zürich?",
      author: "Gemeinschaft Wohnstadt",
      createdAt: hoursAgo(120),
      options: makeOptions(612, 233),
      comments: [
        {
          id: "c1",
          author: "Lukas",
          text: "Ohne Eingriff verlieren wir den Mittelstand komplett.",
          createdAt: hoursAgo(110),
        },
        {
          id: "c2",
          author: "Daniela",
          text: "Bremse ja, aber dann auch ehrlich über Verdichtung reden.",
          createdAt: hoursAgo(70),
        },
        {
          id: "c3",
          author: "Phil",
          text: "Genossenschaften stärken statt regulieren.",
          createdAt: hoursAgo(24),
        },
      ],
    },
    {
      id: "s-hardbrucke-graffiti",
      question: "Graffiti-Wand an der Hardbrücke offiziell freigeben?",
      author: "Nadia S., Kreis 5",
      createdAt: hoursAgo(45),
      options: makeOptions(254, 132),
      comments: [
        {
          id: "c1",
          author: "Spray-K",
          text: "Legal Walls senken Vandalismus an anderen Orten. Studien zeigens.",
          createdAt: hoursAgo(40),
        },
      ],
    },
    {
      id: "s-feuerwerk-bundesfeier",
      question: "Feuerwerk an der 1.-August-Feier am Zürichsee abschaffen?",
      description: "Lärm, Feinstaub, Tierwohl – oder Tradition? Die Stadt diskutiert wieder.",
      author: "Reto V.",
      createdAt: hoursAgo(8),
      options: makeOptionsCustom([
        { id: "ja", label: "Ja, durch Drohnenshow ersetzen", votes: 198 },
        { id: "teilweise", label: "Reduzieren, nicht abschaffen", votes: 142 },
        { id: "nein", label: "Bitte nicht – Tradition", votes: 167 },
      ]),
      comments: [
        {
          id: "c1",
          author: "Sandra",
          text: "Unser Hund versteckt sich jedes Jahr drei Tage unter dem Bett.",
          createdAt: hoursAgo(6),
        },
        {
          id: "c2",
          author: "Heinz",
          text: "Drohnen sind cool, aber den Knall in der Brust gibts nur mit echtem Feuerwerk.",
          createdAt: hoursAgo(2),
        },
      ],
    },
    {
      id: "s-nachtbus-frequenz",
      question: "Nachtnetz an Wochentagen ausbauen?",
      author: "Kim L., Oerlikon",
      createdAt: hoursAgo(140),
      options: makeOptions(341, 88),
      comments: [
        {
          id: "c1",
          author: "Aylin",
          text: "Gastro-Schicht endet um 1, der letzte Bus fährt um 0:34. Macht für niemanden Sinn.",
          createdAt: hoursAgo(130),
        },
        {
          id: "c2",
          author: "Felix",
          text: "Lieber Velorouten ausleuchten. Nachtbus brauche ich nie.",
          createdAt: hoursAgo(50),
        },
      ],
    },
  ];
}

function ensureSeed(): void {
  if (!isBrowser()) return;
  if (window.localStorage.getItem(KEY_SEED_FLAG) === "1") return;
  const existing = read<Survey[]>(KEY_SURVEYS, []);
  if (existing.length === 0) {
    write(KEY_SURVEYS, seedSurveys());
  }
  window.localStorage.setItem(KEY_SEED_FLAG, "1");
}

function isExpired(survey: Survey, nowMs: number = Date.now()): boolean {
  return nowMs - new Date(survey.createdAt).getTime() > WEEK_MS;
}

function pruneExpired(surveys: Survey[]): { kept: Survey[]; changed: boolean } {
  const nowMs = Date.now();
  const kept = surveys.filter((s) => !isExpired(s, nowMs));
  return { kept, changed: kept.length !== surveys.length };
}

function totalVotes(s: Survey): number {
  return s.options.reduce((acc, o) => acc + o.votes, 0);
}

export function expiresAt(survey: Survey): string {
  return new Date(new Date(survey.createdAt).getTime() + WEEK_MS).toISOString();
}

/** Read all active (non-expired) surveys, sorted by votes desc. Triggers seeding on first call. */
export function getActiveSurveys(): Survey[] {
  ensureSeed();
  const all = read<Survey[]>(KEY_SURVEYS, []);
  const { kept, changed } = pruneExpired(all);
  if (changed) write(KEY_SURVEYS, kept);
  return [...kept].sort((a, b) => totalVotes(b) - totalVotes(a));
}

export function getUserVotes(): Record<string, string> {
  return read<Record<string, string>>(KEY_USER_VOTES, {});
}

export function getUserVoteFor(surveyId: string): string | undefined {
  return getUserVotes()[surveyId];
}

export function castVote(surveyId: string, optionId: string): void {
  const votes = getUserVotes();
  const previous = votes[surveyId];
  if (previous === optionId) return;
  const all = read<Survey[]>(KEY_SURVEYS, []);
  const idx = all.findIndex((s) => s.id === surveyId);
  if (idx === -1) return;
  const survey = all[idx];
  const next = {
    ...survey,
    options: survey.options.map((o) => {
      let v = o.votes;
      if (previous && o.id === previous) v = Math.max(0, v - 1);
      if (o.id === optionId) v = v + 1;
      return { ...o, votes: v };
    }),
  };
  all[idx] = next;
  write(KEY_SURVEYS, all);
  votes[surveyId] = optionId;
  write(KEY_USER_VOTES, votes);
  emitStorageChange();
}

export interface AddCommentInput {
  surveyId: string;
  author: string;
  text: string;
}

export function addComment(input: AddCommentInput): SurveyComment | null {
  const text = input.text.trim();
  const author = input.author.trim() || "Anonym";
  if (!text) return null;
  const all = read<Survey[]>(KEY_SURVEYS, []);
  const idx = all.findIndex((s) => s.id === input.surveyId);
  if (idx === -1) return null;
  const comment: SurveyComment = {
    id: `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    author,
    text,
    createdAt: new Date().toISOString(),
  };
  all[idx] = { ...all[idx], comments: [...all[idx].comments, comment] };
  write(KEY_SURVEYS, all);
  emitStorageChange();
  return comment;
}

export function getTotalVotes(survey: Survey): number {
  return totalVotes(survey);
}
