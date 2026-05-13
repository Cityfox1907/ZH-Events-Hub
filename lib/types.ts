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

export type ModuleKey =
  | "tonight"
  | "dine"
  | "experience"
  | "pulse"
  | "live"
  | "puls"
  | "markt"
  | "stimmen"
  | "entdecken"
  | "orte";

// ─────────────────────────────────────────────────────────────
// ENTDECKEN — unified event adapter (Phase 4)
// All time-bound events: Tonight + Live + Experience
// ─────────────────────────────────────────────────────────────

export type EventCategory =
  | "music"
  | "dinner"
  | "art"
  | "experience"
  | "party"
  | "networking"
  | "sport"
  | "family"
  | "market"
  | "theater";

export type EventSource = "tonight" | "live" | "experience";

export interface EventItem {
  id: string;
  source: EventSource;
  title: string;
  category: EventCategory;
  category_label: string;
  datetime: string;
  date_iso: string;
  bucket: Bucket;
  venue: string;
  district: string;
  price: string;
  price_band: "free" | "low" | "mid" | "high";
  vibe_tags: Vibe[];
  cover_image: string;
  languages?: ("DE" | "EN" | "FR" | "IT")[];
  trending?: boolean;
  views_24h?: number;
  tickets_left?: number;
  added_at?: string;
}

// ─────────────────────────────────────────────────────────────
// ORTE — permanent locations (Phase 4)
// Restaurants, Bars, Badis, Aktivitäten, Museen
// ─────────────────────────────────────────────────────────────

export type PlaceKind =
  | "restaurant"
  | "bar"
  | "cafe"
  | "badi"
  | "activity"
  | "museum"
  | "nature"
  | "market";

// ─────────────────────────────────────────────────────────────
// ENTDECKEN — unified facet model (Phase 5)
// 3-axis navigation: WAS / WANN / STIL across events + places
// ─────────────────────────────────────────────────────────────

export type EntdeckenCategory =
  | "food"
  | "music"
  | "art"
  | "activity"
  | "wellness"
  | "culture"
  | "courses"
  | "nature"
  | "family"
  | "nightlife"
  | "shopping"
  | "sport";

export type EntdeckenTime =
  | "now-open"
  | "tonight"
  | "weekend"
  | "this-week"
  | "evergreen";

export type StyleTag =
  | "Date Night"
  | "Mit Freunden"
  | "Solo"
  | "Familie"
  | "Premium"
  | "Günstig"
  | "Touristen-Tipp"
  | "Geheim-Tipp"
  | "Indoor"
  | "Outdoor";

export type ListingKind = "event" | "place";

export interface Listing {
  id: string;
  kind: ListingKind;
  href: string;
  title: string;
  category: EntdeckenCategory;
  category_label: string;
  district: string;
  cover_image: string;
  // event fields
  datetime?: string;
  date_iso?: string;
  bucket?: Bucket;
  // place fields
  hours?: string;
  rating?: number;
  // both
  price?: string;
  price_band: "free" | "low" | "mid" | "high";
  style_tags: StyleTag[];
  vibe_tags: Vibe[];
  badges: ListingBadge[];
  trending?: boolean;
  views_24h?: number;
  tickets_left?: number;
  source_module: ModuleKey;
  source_id: string;
}

export type ListingBadge =
  | "trending"
  | "secret"
  | "tourist"
  | "premium"
  | "new";

export interface Place {
  id: string;
  kind: PlaceKind;
  source: "dine" | "place";
  name: string;
  subtype: string;
  district: string;
  address: string;
  price_range: string;
  description: string;
  vibe_tags: Vibe[];
  rating?: number;
  review_count?: number;
  cover_image: string;
  hours: string;
  trending?: boolean;
}

// ─────────────────────────────────────────────────────────────
// PULS — Community-Feed (Phase 3)
// ─────────────────────────────────────────────────────────────

export type PulsPostType =
  | "spot-tipp"
  | "frage"
  | "live-update"
  | "erlebnis"
  | "beobachtung"
  | "einladung"
  | "foto"
  | "diskussion";

export type VerificationBadge =
  | "verified"
  | "local-hero"
  | "stadt-stimme"
  | "team";

export interface PulsComment {
  id: string;
  author: string;
  district: string;
  ago: string;
  text: string;
  upvotes: number;
  badge?: VerificationBadge;
  avatar: string;
  replies?: PulsComment[];
}

export interface PulsPost {
  id: string;
  author: string;
  district: string;
  ago: string;
  type: PulsPostType;
  text: string;
  tags: string[];
  upvotes: number;
  comments_count: number;
  badge?: VerificationBadge;
  avatar: string;
  image?: string;
  link?: { module: ModuleKey; id: string; label: string };
  comments?: PulsComment[];
  hot?: boolean;
  top_week?: boolean;
}

// ─────────────────────────────────────────────────────────────
// MARKT — Anzeigen (Phase 3)
// ─────────────────────────────────────────────────────────────

export type MarktCategory =
  | "wohnen"
  | "jobs"
  | "moebel"
  | "mitfahr"
  | "haustier"
  | "tickets"
  | "freunde"
  | "dienstleistungen"
  | "verschenken"
  | "lernen";

export interface MarktListing {
  id: string;
  category: MarktCategory;
  title: string;
  description: string;
  author: string;
  avatar: string;
  rating?: number;
  rating_count?: number;
  district: string;
  ago: string;
  expires: string;
  price?: string;
  images?: string[];
  badge?: VerificationBadge;
}

// ─────────────────────────────────────────────────────────────
// STIMMEN — Stadt-Demokratie (Phase 3)
// ─────────────────────────────────────────────────────────────

export interface DailyPollOption {
  id: string;
  label: string;
  votes: number;
  emoji?: string;
}

export interface DailyPoll {
  id: string;
  question: string;
  date: string;
  options: DailyPollOption[];
}

export interface InitiativeItem {
  id: string;
  type: "petition" | "debatte" | "initiative" | "diskussion";
  title: string;
  author: string;
  avatar: string;
  ago: string;
  upvotes: number;
  comments_count: number;
  supporters?: number;
  description: string;
  pro?: string[];
  contra?: string[];
}

// ─────────────────────────────────────────────────────────────
// Community-Profile (Phase 3)
// ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  label: string;
  desc: string;
  unlocked: boolean;
  emoji: string;
}

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

// ─────────────────────────────────────────────────────────────
// KALENDER — Zürich-Kalender (Phase 6)
// 33 Zürcher Klassiker + saisonale Anlässe übers Jahr
// ─────────────────────────────────────────────────────────────

export type KalenderCategory =
  | "music"
  | "festival_tradition"
  | "sport"
  | "culture"
  | "theater"
  | "nightlife"
  | "family"
  | "market"
  | "film"
  | "art";

export type KalenderImportance = "mega" | "standard";
export type KalenderSeason = "fruehling" | "sommer" | "herbst" | "winter";

export interface KalenderEvent {
  id: string;
  slug: string;
  title: string;
  category: KalenderCategory;
  category_label: string;
  /** ISO yyyy-mm-dd start date */
  dateStart: string;
  /** ISO yyyy-mm-dd end date — same as start if single-day */
  dateEnd: string;
  /** HH:MM 24h time, optional */
  timeStart?: string;
  importance: KalenderImportance;
  isClassic: boolean;
  season: KalenderSeason;
  heroImage: string;
  galleryImages: string[];
  shortDescription: string;
  longDescription?: string;
  location: string;
  district: string;
  transit?: string;
  priceInfo: string;
  priceBand: "free" | "low" | "mid" | "high";
  tradition?: string;
  vibe_tags: Vibe[];
  communityQuotes?: { author: string; district: string; text: string }[];
  tips?: string[];
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
