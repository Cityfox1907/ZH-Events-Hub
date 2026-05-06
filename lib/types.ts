export type CategoryId =
  | "konzert"
  | "klassik"
  | "theater"
  | "comedy"
  | "club"
  | "kunst"
  | "festival"
  | "volksfest"
  | "sport"
  | "gastro"
  | "mode";

export type SizeId = "mega" | "major" | "mid" | "intimate";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export interface Size {
  id: SizeId;
  label: string;
  capacity: string;
}

export interface ZhEvent {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: CategoryId;
  size: SizeId;
  startDateTime: string; // ISO
  endDateTime?: string; // ISO
  venue: string;
  neighborhood: string;
  description: string;
  priceFromChf?: number;
  ticketUrl?: string;
  tags: string[];
  imageUrl?: string;
  imageCredit?: string;
  source: "seed" | "user";
  createdAt: string; // ISO
}

export interface Review {
  id: string;
  eventId: string;
  rating: number; // 1-5
  text: string;
  seat?: string;
  acoustics?: string;
  authorName: string;
  createdAt: string; // ISO
}

export interface EventPhoto {
  id: string;
  eventId: string;
  dataUrl: string; // base64
  caption?: string;
  createdAt: string; // ISO
}

export interface ToastMessage {
  id: string;
  text: string;
  variant: "default" | "success" | "info";
}
