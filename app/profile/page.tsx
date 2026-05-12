"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Calendar,
  Crown,
  Settings,
  LogOut,
  Star,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import {
  getBookmarks,
  getBookings,
  getUser,
  logout,
  onStorageChange,
  setTier,
  clearBookings,
  seedDemoBookings,
  updateBookingStatus,
} from "@/lib/storage";
import type { BookmarkRecord, MockBooking, MockUser } from "@/lib/types";
import { PageHero } from "@/components/PageHero";
import { useToast } from "@/components/Toast";
import { MOCK_DEMO_BOOKINGS, MY_REVIEWS } from "@/lib/data";

type Tab = "favorites" | "bookings" | "reviews" | "pulse" | "settings";

const MODULE_LABEL: Record<string, string> = {
  tonight: "Tonight",
  dine: "Dine",
  experience: "Experience",
  pulse: "Pulse",
  live: "Live",
};

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("favorites");
  const [user, setUser] = useState<MockUser | null>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [bookings, setBookings] = useState<MockBooking[]>([]);
  const { push } = useToast();

  useEffect(() => {
    function refresh() {
      setUser(getUser());
      setBookmarks(getBookmarks());
      setBookings(getBookings());
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

  return (
    <>
      <PageHero
        eyebrow="Profil"
        title={`Hi, ${user.name}.`}
        subtitle={`Dein ${user.tier}-Account.`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 mr-2">
            <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy font-display text-lg flex items-center justify-center">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-[14px]">{user.name}</p>
              <p className="text-[12px] text-ink-faint">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <TabButton active={tab === "favorites"} onClick={() => setTab("favorites")} icon={<Heart className="w-4 h-4" />}>
            Favoriten ({bookmarks.length})
          </TabButton>
          <TabButton active={tab === "bookings"} onClick={() => setTab("bookings")} icon={<Calendar className="w-4 h-4" />}>
            Buchungen ({bookings.length})
          </TabButton>
          <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")} icon={<MessageSquare className="w-4 h-4" />}>
            Bewertungen ({MY_REVIEWS.length})
          </TabButton>
          <TabButton active={tab === "pulse"} onClick={() => setTab("pulse")} icon={<Crown className="w-4 h-4" />}>
            Membership
          </TabButton>
          <TabButton active={tab === "settings"} onClick={() => setTab("settings")} icon={<Settings className="w-4 h-4" />}>
            Einstellungen
          </TabButton>
        </div>
      </PageHero>

      <section className="container-editorial pb-20">
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
        {tab === "pulse" && <MembershipTab user={user} />}
        {tab === "settings" && <SettingsTab user={user} />}
      </section>
    </>
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

function MembershipTab({ user }: { user: MockUser }) {
  const { push } = useToast();
  return (
    <div className="bg-card border border-line rounded-2xl p-6 md:p-8 card-shadow space-y-4 max-w-2xl">
      <p className="eyebrow">Aktueller Plan</p>
      <p className="font-display text-3xl">{user.tier}</p>
      <p className="text-[14px] text-ink-muted">
        {user.tier === "Free"
          ? "Du siehst die öffentliche Pulse-Vorschau. Upgrade für Founders' Table, Salons & VIP-Previews."
          : user.tier === "Premium"
          ? "Premium aktiv. Du kannst alle Premium-Pulse-Events RSVP-en."
          : "VIP aktiv. Volle Pulse-Suite, Concierge und Limousine-Shuttle."}
      </p>
      <div className="flex flex-wrap gap-2 pt-2">
        {user.tier !== "Free" && (
          <button
            onClick={() => {
              setTier("Free");
              push("Membership gekündigt (Demo)", "success");
            }}
            className="px-4 py-2 rounded-lg border border-line text-[13px] hover:border-burgundy"
          >
            Membership kündigen
          </button>
        )}
        {user.tier !== "Premium" && (
          <button
            onClick={() => {
              setTier("Premium");
              push("✓ Premium aktiviert (Demo)", "success");
            }}
            className="px-4 py-2 rounded-lg bg-burgundy text-paper text-[13px] hover:bg-burgundy-dark"
          >
            Premium aktivieren
          </button>
        )}
        {user.tier !== "VIP" && (
          <button
            onClick={() => {
              setTier("VIP");
              push("✓ VIP aktiviert (Demo)", "success");
            }}
            className="px-4 py-2 rounded-lg bg-ink text-paper text-[13px] hover:bg-burgundy"
          >
            VIP aktivieren
          </button>
        )}
      </div>
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
