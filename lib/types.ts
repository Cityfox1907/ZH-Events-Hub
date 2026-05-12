export type Vibe =
  | "Premium"
  | "Date Night"
  | "Cultural"
  | "Fine Dining"
  | "Wine Pairing"
  | "Indoor"
  | "Outdoor"
  | "Magical"
  | "Casual"
  | "Hidden Gem";

export interface TonightEvent {
  id: string;
  title: string;
  category: string;
  datetime: string;
  date_iso: string;
  venue: string;
  district: string;
  price: string;
  vibe_tags: Vibe[];
  description: string;
  cover_image: string;
  gallery: string[];
}

export interface DineVenue {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  district: string;
  address: string;
  price_range: "CHF" | "CHF CHF" | "CHF CHF CHF" | "CHF CHF CHF CHF";
  description: string;
  vibe_tags: Vibe[];
  rating: number;
  review_count: number;
  cover_image: string;
  gallery: string[];
  hours: string;
  reviews: { author: string; rating: number; text: string; date: string }[];
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  host: string;
  duration: string;
  price_per_person: number;
  max_participants: number;
  meeting_point: string;
  district: string;
  description: string;
  what_included: string[];
  vibe_tags: Vibe[];
  languages: ("DE" | "EN" | "FR" | "IT")[];
  cover_image: string;
  gallery: string[];
  slots: { date: string; time: string; spots_left: number }[];
}

export type PulseTier = "Free" | "Premium" | "VIP";

export interface PulseEvent {
  id: string;
  title: string;
  type: string;
  datetime: string;
  date_iso: string;
  venue: string;
  max_attendees: number;
  current_rsvp: number;
  description: string;
  curator_notes: string;
  required_tier: PulseTier;
  cover_image: string;
}

export interface LiveEvent {
  id: string;
  title: string;
  type: string;
  datetime: string;
  date_iso: string;
  venue: string;
  price_range: string;
  price_min: number;
  price_max: number;
  tickets_available: number;
  description: string;
  vibe_tags: Vibe[];
  cover_image: string;
  gallery: string[];
}

export type ModuleKey = "tonight" | "dine" | "experience" | "pulse" | "live";

export interface BookmarkRecord {
  module: ModuleKey;
  id: string;
  title: string;
  savedAt: string;
}

export interface MockBooking {
  id: string;
  module: ModuleKey;
  itemId: string;
  itemTitle: string;
  detail: string;
  createdAt: string;
}

export interface MockUser {
  email: string;
  name: string;
  tier: PulseTier;
}

export interface ToastMessage {
  id: string;
  text: string;
  variant?: "default" | "success";
}
