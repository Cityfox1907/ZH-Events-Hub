"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Star, MessageSquareText, BarChart3, Search } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/woche", label: "Kalender", icon: CalendarDays },
  { href: "/aftermath", label: "Aftermath", icon: Star },
  { href: "/pinnwand", label: "Pinnwand", icon: MessageSquareText },
  { href: "/umfragen", label: "Umfragen", icon: BarChart3 },
  { href: "/entdecken", label: "Entdecken", icon: Search },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Bereich"
      className="hidden md:flex sticky top-16 h-[calc(100dvh-4rem)] w-[80px] shrink-0 flex-col items-stretch py-5 border-r border-line bg-paper z-30"
    >
      <nav className="flex flex-col gap-1 px-2">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`group flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg transition-colors duration-200 ${
                active
                  ? "bg-paper-dim text-ink"
                  : "text-ink-muted hover:bg-paper-dim/60 hover:text-ink"
              }`}
            >
              <Icon className="w-[20px] h-[20px]" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.04em] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
