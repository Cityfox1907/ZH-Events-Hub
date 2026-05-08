import type { PostCategory, PostCategoryId } from "./types";

export const POST_CATEGORIES: PostCategory[] = [
  {
    id: "empfehlung",
    label: "Empfehlung",
    color: "#2d4a4a",
    description: "Lokale Tipps & Geheimplätze",
  },
  {
    id: "frage",
    label: "Frage",
    color: "#c97c2e",
    description: "Suche Hilfe oder Info",
  },
  {
    id: "suche-biete",
    label: "Suche / Biete",
    color: "#5a4a6e",
    description: "Kleine Klassifizierte",
  },
  {
    id: "erlebnis",
    label: "Erlebnis",
    color: "#3a5a3a",
    description: "Erfahrungsbericht",
  },
  {
    id: "warnung",
    label: "Warnung",
    color: "#8b2e2e",
    description: "Defekt, Vorsicht, etc.",
  },
  {
    id: "lost-found",
    label: "Lost & Found",
    color: "#a8851e",
    description: "Verloren oder gefunden",
  },
  {
    id: "nachbarschaft",
    label: "Nachbarschafts-Aufruf",
    color: "#a8587a",
    description: "Hilfe, Treffen, Aktionen",
  },
  {
    id: "stadt-beobachtung",
    label: "Stadt-Beobachtung",
    color: "#3a4a6a",
    description: "Was sich verändert",
  },
];

export function getCategory(id: PostCategoryId): PostCategory {
  return POST_CATEGORIES.find((c) => c.id === id) ?? POST_CATEGORIES[0];
}

export function categoryTagBackground(hex: string, opacity = 0.12): string {
  // Hex → rgba with given opacity
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
