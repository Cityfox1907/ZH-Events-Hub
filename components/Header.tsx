"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Compass,
  MessageSquare,
  ShoppingBag,
  UserCircle2,
  LogOut,
  Home,
} from "lucide-react";
import { AuthModal } from "./AuthModal";
import { GlobalSearchTrigger } from "./GlobalSearch";
import { NotificationBell } from "./NotificationBell";
import { LiveCounter } from "./LiveCounter";
import { getUser, logout, onStorageChange } from "@/lib/storage";
import type { MockUser } from "@/lib/types";
import { useToast } from "./Toast";

const NAV = [
  { href: "/entdecken", label: "Entdecken", Icon: Compass },
  { href: "/puls", label: "Puls", Icon: MessageSquare },
  { href: "/markt", label: "Markt", Icon: ShoppingBag },
];

export function Header() {
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);
  const [profileMenu, setProfileMenu] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    setUser(getUser());
    return onStorageChange(() => setUser(getUser()));
  }, []);

  useEffect(() => {
    setProfileMenu(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-line">
        <div className="container-editorial flex items-center gap-3 py-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display text-[22px] tracking-tight">
              ZurichTonight
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-[11.5px] uppercase tracking-[0.14em] font-medium transition-colors ${
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

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenu((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-line hover:border-burgundy transition-colors"
                  aria-label="Profil"
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
                      Bookmarks
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
              <>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="hidden sm:inline-flex px-4 py-2 text-[13px] font-medium rounded-full border border-line hover:border-burgundy hover:text-burgundy transition-colors"
                >
                  Anmelden
                </button>
                <Link
                  href="/profile"
                  className="sm:hidden p-2 rounded-full border border-line hover:border-burgundy"
                  aria-label="Profil"
                >
                  <UserCircle2 className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAV — sticky at bottom on small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur border-t border-line">
        <ul className="grid grid-cols-5">
          <BottomItem href="/" label="Home" Icon={Home} active={pathname === "/"} />
          <BottomItem
            href="/entdecken"
            label="Entdecken"
            Icon={Compass}
            active={isActive("/entdecken")}
          />
          <BottomItem
            href="/puls"
            label="Puls"
            Icon={MessageSquare}
            active={isActive("/puls")}
          />
          <BottomItem
            href="/markt"
            label="Markt"
            Icon={ShoppingBag}
            active={isActive("/markt")}
          />
          <BottomItem
            href="/profile"
            label="Profil"
            Icon={UserCircle2}
            active={isActive("/profile")}
          />
        </ul>
      </nav>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

function BottomItem({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
          active ? "text-burgundy" : "text-ink-muted"
        }`}
      >
        <Icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
        <span>{label}</span>
      </Link>
    </li>
  );
}
