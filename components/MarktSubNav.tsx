"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARKT_VERTICALS } from "@/lib/phase3-data";

export function MarktSubNav() {
  const pathname = usePathname();
  const isRoot = pathname === "/markt";
  return (
    <div className="border-b border-line bg-paper/95 backdrop-blur sticky top-[57px] z-30">
      <div className="container-editorial">
        <nav className="flex gap-1 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          <Link
            href="/markt"
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
              isRoot
                ? "border-burgundy text-burgundy"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Übersicht
          </Link>
          {MARKT_VERTICALS.map((v) => {
            const active =
              pathname === v.href || pathname.startsWith(v.href + "/");
            return (
              <Link
                key={v.key}
                href={v.href}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  active
                    ? "border-burgundy text-burgundy"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                <span aria-hidden>{v.emoji}</span>
                {v.short}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
