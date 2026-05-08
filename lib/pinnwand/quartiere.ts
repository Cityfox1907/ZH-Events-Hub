import type { Quartier, QuartierId } from "./types";

export const QUARTIERE: Quartier[] = [
  { id: "alle", label: "Alle Quartiere", short: "Alle" },
  { id: "kreis-1", label: "Kreis 1", short: "K1", hint: "Altstadt" },
  { id: "kreis-2", label: "Kreis 2", short: "K2", hint: "Enge, Wollishofen" },
  { id: "kreis-3", label: "Kreis 3", short: "K3", hint: "Wiedikon, Sihlfeld" },
  { id: "kreis-4", label: "Kreis 4", short: "K4", hint: "Aussersihl, Langstrasse" },
  { id: "kreis-5", label: "Kreis 5", short: "K5", hint: "Industriequartier" },
  { id: "kreis-6", label: "Kreis 6", short: "K6", hint: "Unterstrass, Oberstrass" },
  { id: "kreis-7", label: "Kreis 7", short: "K7", hint: "Hottingen, Witikon" },
  { id: "kreis-8", label: "Kreis 8", short: "K8", hint: "Seefeld, Riesbach" },
  { id: "kreis-9", label: "Kreis 9", short: "K9", hint: "Albisrieden, Altstetten" },
  { id: "kreis-10", label: "Kreis 10", short: "K10", hint: "Höngg, Wipkingen" },
  { id: "kreis-11", label: "Kreis 11", short: "K11", hint: "Affoltern, Oerlikon, Seebach" },
  { id: "kreis-12", label: "Kreis 12", short: "K12", hint: "Schwamendingen" },
  { id: "goldkueste", label: "Goldküste", short: "GK", hint: "Zollikon, Küsnacht, Erlenbach, Herrliberg" },
  { id: "limmattal", label: "Limmattal", short: "LT", hint: "Schlieren, Dietikon, Regensdorf" },
  { id: "pfannenstiel", label: "Pfannenstiel", short: "PS", hint: "Männedorf, Stäfa, Meilen" },
];

export const SELECTABLE_QUARTIERE = QUARTIERE.filter((q) => q.id !== "alle");

export function getQuartier(id: QuartierId): Quartier {
  return QUARTIERE.find((q) => q.id === id) ?? QUARTIERE[0];
}
