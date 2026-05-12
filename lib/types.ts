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
  | "Hidden Gem"
  | "Family"
  | "Trending";

export type Bucket = "today" | "weekend" | "week";

export interface TonightEvent {
  id: string;
  title: string;
  category: string;
  datetime: string;
  date_iso: string;
  bucket: Bucket;
  venue: string;
  district: string;
  price: string;
  price_band: "free" | "low" | "mid" | "high";
  vibe_tags: Vibe[];
  description: string;
  cover_image: string;
  gallery: string[];
  tickets_left?: number;
  trending?: boolean;
  views_24h?: number;
  added_at?: string;
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
  trending?: boolean;
  bookings_today?: number;
  added_at?: string;
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  host: string;
  host_bio?: string;
  duration: string;
  duration_hours: number;
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
  rating?: number;
  review_count?: number;
  reviews?: { author: string; rating: number; text: string; date: string }[];
  added_at?: string;
}

export type PulseTier = "Free" | "Premium" | "VIP";

export interface PulseEvent {
  id: string;
  title: string;
  type: string;
  datetime: string;
  date_iso: string;
  venue: string;
  district: string;
  max_attendees: number;
  current_rsvp: number;
  description: string;
  curator_notes: string;
  industry_mix?: string;
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
  district: string;
  price_range: string;
  price_min: number;
  price_max: number;
  tickets_available: number;
  total_capacity: number;
  description: string;
  vibe_tags: Vibe[];
  cover_image: string;
  gallery: string[];
  trending?: boolean;
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
  status?: "upcoming" | "past" | "cancelled";
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

export interface RecentlyViewed {
  module: ModuleKey;
  id: string;
  title: string;
  cover: string;
  viewedAt: string;
}

export interface DistrictInfo {
  key: string;
  name: string;
  blurb: string;
  cover: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  text: string;
  href?: string;
  ago: string;
  unread?: boolean;
}

export interface ProviderTestimonial {
  name: string;
  role: string;
  quote: string;
  metric: string;
  avatar: string;
}

export interface ProviderInquiry {
  id: string;
  customer: string;
  module: ModuleKey;
  itemTitle: string;
  message: string;
  receivedAt: string;
  status: "Neu" | "Beantwortet" | "Konvertiert";
}

export interface MyReview {
  id: string;
  module: ModuleKey;
  itemId: string;
  itemTitle: string;
  rating: number;
  text: string;
  date: string;
}
