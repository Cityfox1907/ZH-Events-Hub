"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Calendar, Crown, Settings, LogOut } from "lucide-react";
import {
  getBookmarks,
  getBookings,
  getUser,
  logout,
  onStorageChange,
  setTier,
  clearBookings,
} from "@/lib/storage";
import type { BookmarkRecord, MockBooking, MockUser } from "@/lib/types";
import { PageHero } from "@/components/PageHero";
import { useToast } from "@/components/Toast";

type Tab = "bookmarks" | "bookings" | "pulse" | "settings";

const MODULE_LABEL: Record<string, string> = {
  tonight: "Tonight",
  dine: "Dine",
  experience: "Experience",
  pulse: "Pulse",
  live: "Live",
};

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("bookmarks");
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
        subtitle={`Dein ${user.tier}-Account. Alles, was du gespeichert oder gebucht hast — lokal im Browser.`}
      >
        <div className="flex flex-wrap gap-2">
          <TabButton active={tab === "bookmarks"} onClick={() => setTab("bookmarks")} icon={<Bookmark className="w-4 h-4" />}>
            Bookmarks ({bookmarks.length})
          </TabButton>
          <TabButton active={tab === "bookings"} onClick={() => setTab("bookings")} icon={<Calendar className="w-4 h-4" />}>
            Buchungen ({bookings.length})
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
        {tab === "bookmarks" && (
          <div>
            {bookmarks.length === 0 ? (
              <Empty title="Keine Bookmarks" desc="Speichere Events, Restaurants oder Erlebnisse — sie erscheinen hier." />
            ) : (
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
            )}
          </div>
        )}

        {tab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              <Empty title="Keine Buchungen" desc="Reservierungen, Bookings und RSVPs erscheinen hier." />
            ) : (
              <div className="space-y-2">
                {bookings.map((b) => (
                  <Link
                    key={b.id}
                    href={`/${b.module}/${b.itemId}`}
                    className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 p-5 bg-card border border-line rounded-xl card-shadow-hover transition-shadow"
                  >
                    <span className="eyebrow md:w-24">{MODULE_LABEL[b.module]}</span>
                    <span className="font-medium text-[14px] flex-1">{b.itemTitle}</span>
                    <span className="text-[13px] text-ink-muted">{b.detail}</span>
                    <span className="text-[12px] text-ink-faint">
                      {new Date(b.createdAt).toLocaleDateString("de-CH")}
                    </span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    clearBookings();
                    push("Alle Demo-Buchungen gelöscht", "success");
                  }}
                  className="text-[12px] text-ink-faint hover:text-burgundy mt-4"
                >
                  Alle löschen
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "pulse" && (
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
        )}

        {tab === "settings" && (
          <div className="bg-card border border-line rounded-2xl p-6 md:p-8 card-shadow space-y-4 max-w-2xl">
            <div>
              <p className="eyebrow">Konto</p>
              <p className="font-medium text-[14px] mt-1">{user.email}</p>
            </div>
            <hr className="hairline" />
            <p className="text-[13px] text-ink-muted">
              Demo-Modus: Alle Daten liegen in deinem lokalen Browser-Speicher
              (localStorage). Beim Abmelden bleiben Bookmarks erhalten.
            </p>
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
        )}
      </section>
    </>
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
