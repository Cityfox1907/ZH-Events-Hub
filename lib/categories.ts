import type { Category, CategoryId, Size, SizeId } from "./types";

export const CATEGORIES: readonly Category[] = [
  { id: "konzert", label: "Konzert", description: "Pop, Rock, Hip-Hop, Indie, Mundart" },
  { id: "klassik", label: "Klassik & Oper", description: "Tonhalle, Opernhaus, Kammermusik" },
  { id: "theater", label: "Theater", description: "Schauspielhaus, Bernhard, freie Bühnen" },
  { id: "comedy", label: "Comedy", description: "Stand-Up, Kabarett, Open Mics" },
  { id: "club", label: "Klubs & Nightlife", description: "DJ-Sets, Techno, House, D&B" },
  { id: "kunst", label: "Kunst & Kultur", description: "Vernissagen, Museen, Märkte" },
  { id: "festival", label: "Festivals", description: "Openair, Caliente, ZFF" },
  { id: "volksfest", label: "Volksfeste", description: "Street Parade, Sechseläuten, Züri Fäscht" },
  { id: "sport", label: "Sport", description: "ZSC, GC, FCZ, Marathon" },
  { id: "gastro", label: "Gastro", description: "Pop-ups, Sterne-Eröffnungen, Chef's Tables" },
  { id: "mode", label: "Mode & Design", description: "Designer-Pop-ups, Fashion, Auto" },
] as const;

export const SIZES: readonly Size[] = [
  { id: "mega", label: "Mega", capacity: "5'000+" },
  { id: "major", label: "Major", capacity: "1'000–5'000" },
  { id: "mid", label: "Mid", capacity: "200–1'000" },
  { id: "intimate", label: "Intimate", capacity: "unter 200" },
] as const;

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function sizeLabel(id: SizeId): string {
  return SIZES.find((s) => s.id === id)?.label ?? id;
}

export function sizeCapacity(id: SizeId): string {
  return SIZES.find((s) => s.id === id)?.capacity ?? "";
}
