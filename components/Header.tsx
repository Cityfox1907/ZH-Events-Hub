"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Compass,
  MessageSquare,
  ShoppingBag,
  UserCircle2,
  Home,
  Sparkles,
} from "lucide-react";
import { AuthModal } from "./AuthModal";
import { GlobalSearchTrigger } from "./GlobalSearch";
import { NotificationBell } from "./NotificationBell";
import { ViewSwitcher } from "./ViewSwitcher";
import { useViewMode, useCurrentProfile } from "@/lib/viewMode";

const NAV = [
  { href: "/entdecken", label: "Entdecken", Icon: Compass },
  { href: "/puls", label: "Puls", Icon: MessageSquare },
  { href: "/markt", label: "Markt", Icon: ShoppingBag },
];

export function Header() {
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const { state } = useViewMode();
  const profile = useCurrentProfile();
  const isDashboard = state.mode === "dashboard";

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const profileHref = isDashboard ? "/app" : "/profile";

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-line">
        <div className="container-editorial flex items-center gap-3 py-3">
          <Link
            href={isDashboard ? "/app" : "/"}
            className="flex items-center gap-2 shrink-0"
          >
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
            <GlobalSearchTrigger variant="input" />
          </div>

          <div className="ml-auto xl:ml-2 flex items-center gap-1.5">
            <div className="xl:hidden">
              <GlobalSearchTrigger variant="icon" />
            </div>

            {isDashboard && <NotificationBell />}

            {isDashboard ? (
              <Link
                href="/app"
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-line hover:border-burgundy transition-colors"
                aria-label="Mein Züri"
              >
                <Sparkles
                  className="w-4 h-4 text-burgundy"
                  strokeWidth={1.8}
                />
                <span className="text-[13px] hidden md:inline">
                  {profile.name}
                </span>
              </Link>
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

            <ViewSwitcher />
          </div>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur border-t border-line">
        <ul className="grid grid-cols-5">
          <BottomItem
            href={isDashboard ? "/app" : "/"}
            label={isDashboard ? "Züri" : "Home"}
            Icon={isDashboard ? Sparkles : Home}
            active={pathname === "/" || pathname === "/app"}
          />
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
            href={profileHref}
            label="Profil"
            Icon={UserCircle2}
            active={isActive("/profile") || isActive("/app")}
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
