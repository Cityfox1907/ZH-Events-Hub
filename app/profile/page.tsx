"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Calendar,
  Settings,
  LogOut,
  Star,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Tag,
  Megaphone,
  Award,
  Trophy,
} from "lucide-react";
import {
  getBookmarks,
  getBookings,
  getUser,
  logout,
  onStorageChange,
  clearBookings,
  seedDemoBookings,
  updateBookingStatus,
  getUserPosts,
  getUserListings,
  getInitiativeSupports,
  getPollVotes,
  type UserPulsPost,
  type UserMarktListing,
} from "@/lib/storage";
import type { BookmarkRecord, MockBooking, MockUser } from "@/lib/types";
import { PageHero } from "@/components/PageHero";
import { useToast } from "@/components/Toast";
import { VerificationBadge } from "@/components/VerificationBadge";
import {
  MOCK_DEMO_BOOKINGS,
  MY_REVIEWS,
  DEMO_PROFILE,
  ACHIEVEMENTS,
  INITIATIVES,
  DAILY_POLL,
  PAST_POLLS,
} from "@/lib/data";

type Tab =
  | "favorites"
  | "bookings"
  | "reviews"
  | "posts"
  | "listings"
  | "stimmen"
  | "achievements"
  | "settings";

const MODULE_LABEL: Record<string, string> = {
  tonight: "Tonight",
  dine: "Dine",
  experience: "Experience",
  pulse: "Pulse",
  live: "Live",
  puls: "Puls",
  markt: "Markt",
  stimmen: "Stimmen",
};

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("posts");
  const [user, setUser] = useState<MockUser | null>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [bookings, setBookings] = useState<MockBooking[]>([]);
  const [userPosts, setUserPosts] = useState<UserPulsPost[]>([]);
  const [userListings, setUserListings] = useState<UserMarktListing[]>([]);
  const [supports, setSupports] = useState<string[]>([]);
  const [pollVotes, setPollVotes] = useState<{ [k: string]: string }>({});
  const { push } = useToast();

  useEffect(() => {
    function refresh() {
      setUser(getUser());
      setBookmarks(getBookmarks());
      setBookings(getBookings());
      setUserPosts(getUserPosts());
      setUserListings(getUserListings());
      setSupports(getInitiativeSupports());
      setPollVotes(getPollVotes());
    }
    refresh();
    return onStorageChange(refresh);
  }, []);

  // Seed demo bookings for first-time logged-in user
  useEffect(() => {
    if (user && bookings.length === 0) {
      seedDemoBookings(MOCK_DEMO_BOOKINGS);
    }
  }, [user, bookings.length]);

  if (!user) {
    return (
      <PageHero
        eyebrow="Profil"
        title="Nicht angemeldet."
        subtitle="Bitte oben rechts auf 'Anmelden' klicken (Demo). Bookmarks und Buchungen werden lokal gespeichert."
      />
    );
  }

  const totalKarma = DEMO_PROFILE.karma + userPosts.reduce((s, p) => s + p.upvotes, 0);
  const totalPosts = DEMO_PROFILE.posts + userPosts.length;
  const totalListings = DEMO_PROFILE.listings + userListings.length;
  const totalSupports = supports.length;
  const totalPollVotes = Object.keys(pollVotes).length;

  return (
    <>
      <PageHero
        eyebrow="Profil"
        title={`Hi, ${user.name}.`}
        subtitle="Dein Zürcher Community-Profil — gratis, immer."
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 mr-2">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-burgundy/10 text-burgundy font-display text-xl flex items-center justify-center">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1">
                <VerificationBadge badge="verified" compact />
              </div>
            </div>
            <div>
              <p className="font-medium text-[14.5px]">@{user.name}</p>
              <p className="text-[12px] text-ink-faint">{user.email}</p>
              <p className="text-[11px] text-ink-muted mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {DEMO_PROFILE.district} · Mitglied seit {DEMO_PROFILE.member_since}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <KarmaStat label="Karma" value={totalKarma} />
            <KarmaStat label="Posts" value={totalPosts} />
            <KarmaStat label="Anzeigen" value={totalListings} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <TabButton active={tab === "posts"} onClick={() => setTab("posts")} icon={<MessageSquare className="w-4 h-4" />}>
            Posts ({totalPosts})
          </TabButton>
          <TabButton active={tab === "listings"} onClick={() => setTab("listings")} icon={<Tag className="w-4 h-4" />}>
            Anzeigen ({totalListings})
          </TabButton>
          <TabButton active={tab === "stimmen"} onClick={() => setTab("stimmen")} icon={<Megaphone className="w-4 h-4" />}>
            Stimmen ({totalSupports + totalPollVotes})
          </TabButton>
          <TabButton active={tab === "favorites"} onClick={() => setTab("favorites")} icon={<Heart className="w-4 h-4" />}>
            Favoriten ({bookmarks.length})
          </TabButton>
          <TabButton active={tab === "bookings"} onClick={() => setTab("bookings")} icon={<Calendar className="w-4 h-4" />}>
            Buchungen ({bookings.length})
          </TabButton>
          <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")} icon={<Star className="w-4 h-4" />}>
            Bewertungen
          </TabButton>
          <TabButton active={tab === "achievements"} onClick={() => setTab("achievements")} icon={<Trophy className="w-4 h-4" />}>
            Achievements
          </TabButton>
          <TabButton active={tab === "settings"} onClick={() => setTab("settings")} icon={<Settings className="w-4 h-4" />}>
            Einstellungen
          </TabButton>
        </div>
      </PageHero>

      <section className="container-editorial pb-20">
        {tab === "posts" && <PostsTab userPosts={userPosts} />}
        {tab === "listings" && <ListingsTab userListings={userListings} />}
        {tab === "stimmen" && (
          <StimmenTab supports={supports} pollVotes={pollVotes} />
        )}
        {tab === "favorites" && <FavoritesTab bookmarks={bookmarks} />}
        {tab === "bookings" && (
          <BookingsTab
            bookings={bookings}
            onCancel={(id) => {
              updateBookingStatus(id, "cancelled");
              push("Buchung storniert (Demo)", "success");
            }}
            onClear={() => {
              clearBookings();
              push("Alle Demo-Buchungen gelöscht", "success");
            }}
          />
        )}
        {tab === "reviews" && <ReviewsTab />}
        {tab === "achievements" && <AchievementsTab karma={totalKarma} />}
        {tab === "settings" && <SettingsTab user={user} />}
      </section>
    </>
  );
}

function KarmaStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="font-display text-2xl text-burgundy tabular-nums leading-none">
        {value.toLocaleString("de-CH")}
      </p>
      <p className="text-[10.5px] text-ink-faint uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

function PostsTab({ userPosts }: { userPosts: UserPulsPost[] }) {
  if (userPosts.length === 0 && DEMO_PROFILE.posts === 0)
    return <Empty title="Noch keine Posts" desc="Poste etwas im Feed auf der Startseite — es erscheint hier." />;
  return (
    <div className="space-y-2 max-w-3xl">
      {userPosts.map((p) => (
        <div key={p.id} className="p-4 bg-card border border-line rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="eyebrow">Feed</span>
            <span className="text-[11px] text-ink-faint">{p.ago} · {p.district}</span>
            <span className="ml-auto text-[12px] text-ink-muted">▲ {p.upvotes} · 💬 {p.comments_count}</span>
          </div>
          <p className="text-[14px] line-clamp-3">{p.text}</p>
        </div>
      ))}
      {/* Demo seed posts (immutable) */}
      {DEMO_PROFILE.posts > 0 && (
        <div className="p-4 bg-paper-dim border border-line rounded-xl text-center text-[12.5px] text-ink-muted">
          + {DEMO_PROFILE.posts} ältere Posts (Demo-Account vor Phase 3)
        </div>
      )}
    </div>
  );
}

function ListingsTab({ userListings }: { userListings: UserMarktListing[] }) {
  if (userListings.length === 0 && DEMO_PROFILE.listings === 0)
    return <Empty title="Noch keine Anzeigen" desc="Gib eine Anzeige im Markt auf — sie erscheint hier." />;
  return (
    <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
      {userListings.map((l) => (
        <div key={l.id} className="p-4 bg-card border border-line rounded-xl">
          <span className="eyebrow">{l.category}</span>
          <p className="font-display text-lg mt-1.5 leading-tight line-clamp-2">{l.title}</p>
          <p className="text-[12px] text-ink-muted mt-1">{l.district}</p>
          {l.price && <p className="text-[13px] font-medium text-burgundy mt-1.5">{l.price}</p>}
        </div>
      ))}
      {DEMO_PROFILE.listings > 0 && (
        <div className="p-4 bg-paper-dim border border-line rounded-xl text-center text-[12.5px] text-ink-muted sm:col-span-2">
          + {DEMO_PROFILE.listings} ältere Anzeigen (Demo-Account vor Phase 3)
        </div>
      )}
    </div>
  );
}

function StimmenTab({
  supports,
  pollVotes,
}: {
  supports: string[];
  pollVotes: { [k: string]: string };
}) {
  const supportedItems = INITIATIVES.filter((i) => supports.includes(i.id));
  const votedPolls = Object.entries(pollVotes);

  if (supportedItems.length === 0 && votedPolls.length === 0)
    return (
      <Empty
        title="Keine Stimmen abgegeben"
        desc="Stimme bei Umfragen ab oder unterstütze eine Initiative — sie erscheinen hier."
      />
    );

  return (
    <div className="space-y-6 max-w-3xl">
      {votedPolls.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Abgegebene Stimmen</p>
          <div className="space-y-2">
            {votedPolls.map(([pollId, optionId]) => {
              const poll = pollId === DAILY_POLL.id ? DAILY_POLL : null;
              const past = PAST_POLLS.find((p) => p.id === pollId);
              const question = poll?.question ?? past?.question ?? pollId;
              const option = poll?.options.find((o) => o.id === optionId);
              return (
                <div key={pollId} className="p-4 bg-card border border-line rounded-xl">
                  <p className="text-[12px] text-ink-faint">Frage</p>
                  <p className="text-[14px] font-medium mt-0.5">{question}</p>
                  {option && (
                    <p className="text-[13px] text-burgundy mt-1.5">
                      Deine Wahl: {option.emoji} {option.label}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {supportedItems.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Unterstützte Initiativen</p>
          <div className="space-y-2">
            {supportedItems.map((i) => (
              <div key={i.id} className="p-4 bg-card border border-line rounded-xl">
                <span className="text-[10.5px] uppercase tracking-wider text-burgundy">
                  {i.type}
                </span>
                <p className="font-display text-lg mt-1 leading-tight">{i.title}</p>
                <p className="text-[12px] text-ink-faint mt-1">
                  {(i.supporters ?? 0).toLocaleString("de-CH")} Unterstützer total
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AchievementsTab({ karma }: { karma: number }) {
  return (
    <div className="max-w-3xl">
      <div className="p-6 bg-gradient-to-br from-burgundy to-burgundy-dark text-paper rounded-2xl mb-5">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-brass" />
          <div>
            <p className="eyebrow text-paper-dim">Dein Status</p>
            <p className="font-display text-3xl">{karma >= 50 ? "Local Hero" : "Verifiziert"}</p>
            <p className="text-[12.5px] text-paper-dim mt-1">{karma.toLocaleString("de-CH")} Karma</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.id}
            className={`p-4 rounded-xl border ${
              a.unlocked
                ? "bg-card border-line"
                : "bg-paper-dim border-line opacity-60"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{a.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[13.5px]">{a.label}</p>
                <p className="text-[11.5px] text-ink-muted mt-0.5">{a.desc}</p>
              </div>
              {a.unlocked && <Award className="w-4 h-4 text-burgundy" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FavoritesTab({ bookmarks }: { bookmarks: BookmarkRecord[] }) {
  if (bookmarks.length === 0) return <Empty title="Keine Favoriten" desc="Speichere Events, Restaurants oder Erlebnisse mit dem Herz — sie erscheinen hier." />;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {bookmarks.map((b) => (
        <Link
          key={`${b.module}-${b.id}`}
          href={`/${b.module}/${b.id}`}
          className="p-5 bg-card border border-line rounded-xl card-shadow-hover transition-shadow"
        >
          <p className="eyebrow">{MODULE_LABEL[b.module]}</p>
          <p className="font-display text-lg mt-1 leading-tight">{b.title}</p>
          <p className="text-[12px] text-ink-faint mt-2">
            Gespeichert {new Date(b.savedAt).toLocaleDateString("de-CH")}
          </p>
        </Link>
      ))}
    </div>
  );
}

function BookingsTab({
  bookings,
  onCancel,
  onClear,
}: {
  bookings: MockBooking[];
  onCancel: (id: string) => void;
  onClear: () => void;
}) {
  if (bookings.length === 0) return <Empty title="Keine Buchungen" desc="Reservierungen, Bookings und RSVPs erscheinen hier." />;

  const upcoming = bookings.filter((b) => (b.status ?? "upcoming") === "upcoming");
  const past = bookings.filter((b) => b.status === "past");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="space-y-8">
      <BookingGroup title="Anstehend" icon={<Clock className="w-4 h-4" />} items={upcoming} onCancel={onCancel} cancellable />
      <BookingGroup title="Vergangen" icon={<CheckCircle2 className="w-4 h-4" />} items={past} />
      <BookingGroup title="Storniert" icon={<XCircle className="w-4 h-4" />} items={cancelled} muted />
      <button
        onClick={onClear}
        className="text-[12px] text-ink-faint hover:text-burgundy"
      >
        Alle löschen
      </button>
    </div>
  );
}

function BookingGroup({
  title,
  icon,
  items,
  onCancel,
  cancellable,
  muted,
}: {
  title: string;
  icon: React.ReactNode;
  items: MockBooking[];
  onCancel?: (id: string) => void;
  cancellable?: boolean;
  muted?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 text-burgundy">
        {icon}
        <p className="font-medium text-[13px] uppercase tracking-wider">
          {title} ({items.length})
        </p>
      </div>
      <div className="space-y-2">
        {items.map((b) => (
          <div
            key={b.id}
            className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-5 bg-card border border-line rounded-xl card-shadow-hover transition-shadow ${
              muted ? "opacity-60" : ""
            }`}
          >
            <span className="eyebrow md:w-24">{MODULE_LABEL[b.module]}</span>
            <Link
              href={`/${b.module}/${b.itemId}`}
              className="font-medium text-[14px] flex-1 hover:text-burgundy"
            >
              {b.itemTitle}
            </Link>
            <span className="text-[13px] text-ink-muted">{b.detail}</span>
            <span className="text-[12px] text-ink-faint">
              {new Date(b.createdAt).toLocaleDateString("de-CH")}
            </span>
            {cancellable && onCancel && (
              <button
                onClick={() => onCancel(b.id)}
                className="text-[12px] text-ink-faint hover:text-burgundy underline"
              >
                Stornieren
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="space-y-3 max-w-3xl">
      {MY_REVIEWS.map((r) => (
        <div key={r.id} className="p-5 bg-card border border-line rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="eyebrow">{MODULE_LABEL[r.module]}</span>
            <Link
              href={`/${r.module}/${r.itemId}`}
              className="font-medium text-[14px] hover:text-burgundy"
            >
              {r.itemTitle}
            </Link>
            <span className="ml-auto flex items-center gap-0.5">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-brass text-brass" />
              ))}
            </span>
          </div>
          <p className="text-[14px] text-ink-muted leading-relaxed">{r.text}</p>
          <p className="text-[12px] text-ink-faint mt-2">{r.date}</p>
        </div>
      ))}
    </div>
  );
}

function SettingsTab({ user }: { user: MockUser }) {
  const { push } = useToast();
  const [prefs, setPrefs] = useState({
    weekly: true,
    pulse: true,
    sms: false,
    language: "de" as "de" | "en",
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-card border border-line rounded-2xl p-6 md:p-8 card-shadow space-y-4">
        <div>
          <p className="eyebrow">Konto</p>
          <p className="font-medium text-[14px] mt-1">{user.email}</p>
        </div>
      </div>

      <div className="bg-card border border-line rounded-2xl p-6 md:p-8 card-shadow space-y-4">
        <p className="eyebrow">Benachrichtigungen</p>
        <Toggle
          label="Wöchentlicher Newsletter"
          desc="Freitags um 17:00 — die besten Pläne fürs Wochenende."
          on={prefs.weekly}
          onChange={(v) => setPrefs({ ...prefs, weekly: v })}
        />
        <Toggle
          label="Pulse-Updates"
          desc="Neue kuratierte Events für deine Tier-Stufe."
          on={prefs.pulse}
          onChange={(v) => setPrefs({ ...prefs, pulse: v })}
        />
        <Toggle
          label="SMS-Erinnerungen"
          desc="2h vor jeder Buchung — kurze Erinnerung."
          on={prefs.sms}
          onChange={(v) => setPrefs({ ...prefs, sms: v })}
        />
      </div>

      <div className="bg-card border border-line rounded-2xl p-6 md:p-8 card-shadow space-y-3">
        <p className="eyebrow">Sprache</p>
        <div className="flex gap-2">
          {(["de", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setPrefs({ ...prefs, language: l })}
              className={`px-4 py-2 rounded-lg border text-[13px] ${
                prefs.language === l
                  ? "bg-ink text-paper border-ink"
                  : "border-line hover:border-burgundy"
              }`}
            >
              {l === "de" ? "Deutsch (Schweiz)" : "English"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => push("Einstellungen gespeichert (Demo)", "success")}
          className="px-4 py-2 rounded-lg bg-burgundy text-paper text-[13px] hover:bg-burgundy-dark"
        >
          Speichern
        </button>
        <button
          onClick={() => {
            logout();
            push("Abgemeldet (Demo)", "success");
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-line text-[13px] hover:border-burgundy"
        >
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      </div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  on,
  onChange,
}: {
  label: string;
  desc: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-medium text-[14px]">{label}</p>
        <p className="text-[12px] text-ink-muted mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!on)}
        className={`shrink-0 relative w-11 h-6 rounded-full transition-colors ${
          on ? "bg-burgundy" : "bg-line-strong"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-paper rounded-full transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
        active ? "bg-ink text-paper" : "bg-card border border-line text-ink-muted hover:border-burgundy"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function Empty({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-10 text-center bg-card border border-line rounded-2xl">
      <p className="font-display text-xl">{title}</p>
      <p className="text-[14px] text-ink-muted mt-2">{desc}</p>
    </div>
  );
}
