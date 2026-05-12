"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, UserCircle2, Menu, X, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { getUser, logout, onStorageChange } from "@/lib/storage";
import type { MockUser } from "@/lib/types";
import { useToast } from "./Toast";

const NAV = [
  { href: "/tonight", label: "Tonight" },
  { href: "/dine", label: "Dine" },
  { href: "/experience", label: "Experience" },
  { href: "/pulse", label: "Pulse" },
  { href: "/live", label: "Live" },
];

export function Header() {
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);
  const [profileMenu, setProfileMenu] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    setUser(getUser());
    return onStorageChange(() => setUser(getUser()));
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileMenu(false);
  }, [pathname]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    push("Suche ist im Prototyp noch nicht aktiv (Demo)");
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-line">
        <div className="container-editorial flex items-center gap-4 py-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display text-[22px] tracking-tight">
              ZurichTonight
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-[13px] uppercase tracking-[0.16em] font-medium transition-colors ${
                    active ? "text-burgundy" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 ml-auto px-3 py-2 rounded-full border border-line bg-card max-w-xs w-full"
          >
            <Search className="w-4 h-4 text-ink-faint shrink-0" />
            <input
              type="text"
              placeholder="Suchen in Zürich…"
              className="bg-transparent text-[13px] flex-1 focus:outline-none"
            />
          </form>

          <div className="ml-auto md:ml-0 flex items-center gap-2">
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
                className="px-4 py-2 text-[13px] font-medium rounded-full border border-line hover:border-burgundy hover:text-burgundy transition-colors"
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
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 mt-3 px-3 py-2 rounded-full border border-line bg-card"
              >
                <Search className="w-4 h-4 text-ink-faint" />
                <input
                  placeholder="Suchen in Zürich…"
                  className="bg-transparent text-[14px] flex-1 focus:outline-none"
                />
              </form>
            </nav>
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
