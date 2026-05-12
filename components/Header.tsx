"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, UserCircle2, Menu, X, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { GlobalSearchTrigger } from "./GlobalSearch";
import { NotificationBell } from "./NotificationBell";
import { LiveCounter } from "./LiveCounter";
import { useFavoriteCount } from "./BookmarkButton";
import { getUser, logout, onStorageChange } from "@/lib/storage";
import type { MockUser } from "@/lib/types";
import { useToast } from "./Toast";

const NAV = [
  { href: "/entdecken", label: "Entdecken" },
  { href: "/orte", label: "Orte" },
  { href: "/markt", label: "Markt" },
  { href: "/puls", label: "Puls" },
  { href: "/stimmen", label: "Stimmen" },
];

export function Header() {
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);
  const [profileMenu, setProfileMenu] = useState(false);
  const favCount = useFavoriteCount();
  const { push } = useToast();

  useEffect(() => {
    setUser(getUser());
    return onStorageChange(() => setUser(getUser()));
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileMenu(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-line">
        <div className="container-editorial flex items-center gap-3 py-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display text-[22px] tracking-tight">
              ZurichTonight
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 ml-3">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-colors ${
                    active ? "text-burgundy" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center ml-auto gap-3">
            <LiveCounter className="text-[12px] text-ink-muted" />
            <GlobalSearchTrigger variant="input" />
          </div>

          <div className="ml-auto xl:ml-2 flex items-center gap-1.5">
            <div className="xl:hidden">
              <GlobalSearchTrigger variant="icon" />
            </div>

            <NotificationBell />

            <Link
              href="/favorites"
              className="relative p-2 rounded-full border border-line hover:border-burgundy transition-colors"
              aria-label="Favoriten"
            >
              <Heart className={`w-4 h-4 ${favCount > 0 ? "fill-burgundy text-burgundy" : ""}`} />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-burgundy text-paper text-[10px] font-medium flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenu((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-line hover:border-burgundy transition-colors"
                >
                  <UserCircle2 className="w-5 h-5 text-burgundy" />
                  <span className="text-[13px] hidden md:inline">{user.name}</span>
                </button>
                {profileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-line rounded-lg card-shadow py-1 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-[13px] hover:bg-paper-dim"
                    >
                      Profil
                    </Link>
                    <Link
                      href="/favorites"
                      className="block px-4 py-2 text-[13px] hover:bg-paper-dim"
                    >
                      Favoriten ({favCount})
                    </Link>
                    <Link
                      href="/provider/dashboard"
                      className="block px-4 py-2 text-[13px] hover:bg-paper-dim"
                    >
                      Provider-Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        push("Abgemeldet (Demo)", "success");
                      }}
                      className="w-full text-left px-4 py-2 text-[13px] hover:bg-paper-dim flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Abmelden
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden sm:inline-flex px-4 py-2 text-[13px] font-medium rounded-full border border-line hover:border-burgundy hover:text-burgundy transition-colors"
              >
                Anmelden
              </button>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menü"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-line bg-paper">
            <nav className="container-editorial py-3 flex flex-col">
              {NAV.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-3 text-[14px] uppercase tracking-[0.16em] font-medium border-b border-line last:border-b-0 ${
                      active ? "text-burgundy" : "text-ink-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/for-providers"
                className="py-3 text-[14px] uppercase tracking-[0.16em] font-medium border-b border-line text-ink-muted"
              >
                Anbieter werden
              </Link>
              {!user && (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="mt-3 px-4 py-2.5 rounded-full border border-line text-[13px] font-medium"
                >
                  Anmelden
                </button>
              )}
            </nav>
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
