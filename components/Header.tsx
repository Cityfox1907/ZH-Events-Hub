"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Compass,
  ShoppingBag,
  UserCircle2,
  Layers,
  Users,
} from "lucide-react";
import { AuthModal } from "./AuthModal";
import { GlobalSearchTrigger } from "./GlobalSearch";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/hub", label: "Hub", Icon: Layers },
  { href: "/communities", label: "Communities", Icon: Users },
  { href: "/entdecken", label: "Entdecken", Icon: Compass },
  { href: "/markt", label: "Markt", Icon: ShoppingBag },
];

export function Header() {
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);

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
            <GlobalSearchTrigger variant="input" />
          </div>

          <div className="ml-auto xl:ml-2 flex items-center gap-1.5">
            <div className="xl:hidden">
              <GlobalSearchTrigger variant="icon" />
            </div>

            <ThemeToggle />

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
          </div>
        </div>
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
