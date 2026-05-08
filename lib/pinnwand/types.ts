export type QuartierId =
  | "alle"
  | "kreis-1"
  | "kreis-2"
  | "kreis-3"
  | "kreis-4"
  | "kreis-5"
  | "kreis-6"
  | "kreis-7"
  | "kreis-8"
  | "kreis-9"
  | "kreis-10"
  | "kreis-11"
  | "kreis-12"
  | "goldkueste"
  | "limmattal"
  | "pfannenstiel";

export type PostCategoryId =
  | "empfehlung"
  | "frage"
  | "suche-biete"
  | "erlebnis"
  | "warnung"
  | "lost-found"
  | "nachbarschaft"
  | "stadt-beobachtung";

export type TimeFilter = "frisch" | "woche" | "monat" | "beliebt";

export interface Quartier {
  id: QuartierId;
  label: string;
  short: string;
  hint?: string;
}

export interface PostCategory {
  id: PostCategoryId;
  label: string;
  color: string; // hex
  description: string;
}

export interface PinnwandComment {
  id: string;
  postId: string;
  authorName: string;
  authorVerified: boolean;
  body: string;
  createdAt: string; // ISO
  likes: number;
}

export interface PinnwandPost {
  id: string;
  slug: string;
  headline?: string;
  body: string;
  category: PostCategoryId;
  quartier: QuartierId;
  author: {
    name: string;
    avatarColor: string;
    verified: boolean;
    quartier: QuartierId;
  };
  createdAt: string; // ISO
  likes: number;
  comments: number;
  bookmarks: number;
  featured?: boolean;
  photos?: string[];
}

export interface PinnwandFilterState {
  quartiere: QuartierId[];
  kategorien: PostCategoryId[];
  zeit: TimeFilter;
}
