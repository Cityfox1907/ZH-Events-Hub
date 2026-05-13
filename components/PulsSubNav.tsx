"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, MessagesSquare, Radio } from "lucide-react";

const TABS = [
  { href: "/puls", label: "Feed", Icon: MessageCircle, match: ["/puls", "/puls/feed"] },
  { href: "/puls/chat", label: "Chat", Icon: MessagesSquare, match: ["/puls/chat"] },
  { href: "/puls/live", label: "Live", Icon: Radio, match: ["/puls/live"] },
];

export function PulsSubNav() {
  const pathname = usePathname();
  return (
    <div className="border-b border-line bg-paper/95 backdrop-blur sticky top-[57px] z-30">
      <div className="container-editorial">
        <nav className="flex gap-1 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          {TABS.map((t) => {
            const active = t.match.some(
              (m) => pathname === m || pathname.startsWith(m + "/"),
            );
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  active
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
