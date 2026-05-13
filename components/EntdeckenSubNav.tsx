"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";

const TABS = [
  { href: "/entdecken/kalender", label: "Kalender", Icon: CalendarDays },
  { href: "/entdecken/orte", label: "Orte", Icon: MapPin },
];

export function EntdeckenSubNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav
      className="sticky top-[57px] z-30 bg-paper/95 backdrop-blur border-b border-line"
      aria-label="Entdecken Sub-Navigation"
    >
      <div className="container-editorial flex items-center gap-1 py-2 overflow-x-auto">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-medium transition-colors shrink-0 ${
                active
                  ? "bg-ink text-paper"
                  : "text-ink-muted hover:text-ink hover:bg-paper-dim"
              }`}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.6} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
