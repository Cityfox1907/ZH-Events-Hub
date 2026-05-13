"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Home,
  Newspaper,
  Radio,
  Lock,
} from "lucide-react";

const TABS = [
  { href: "/puls", label: "Drei Schichten", Icon: Layers, match: ["/puls"] },
  { href: "/puls/quartier", label: "Quartier", Icon: Home, match: ["/puls/quartier"] },
  { href: "/puls/stadt", label: "Stadt-Threads", Icon: Newspaper, match: ["/puls/stadt"] },
  { href: "/puls/live", label: "Verifiziert", Icon: Radio, match: ["/puls/live"] },
  { href: "/puls/anonym", label: "Beichtstuhl", Icon: Lock, match: ["/puls/anonym"] },
];

export function PulsSubNav() {
  const pathname = usePathname();
  return (
    <div className="border-b border-line bg-paper/95 backdrop-blur sticky top-[57px] z-30">
      <div className="container-editorial">
        <nav className="flex gap-1 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          {TABS.map((t) => {
            const active =
              pathname === t.href ||
              (t.href !== "/puls" && pathname.startsWith(t.href + "/"));
            // /puls match: only exact
            const isRootActive = t.href === "/puls" && pathname === "/puls";
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  active || isRootActive
                    ? "border-burgundy text-burgundy"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                <t.Icon className="w-4 h-4" strokeWidth={1.6} />
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
