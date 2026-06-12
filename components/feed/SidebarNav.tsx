"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  MessageSquare,
  ShoppingBag,
  Landmark,
  Bookmark,
  Bell,
  UserCircle2,
  MoreHorizontal,
  Feather,
} from "lucide-react";
import { FEED_ME } from "@/lib/feed";

const NAV = [
  { href: "/", label: "Startseite", Icon: Home },
  { href: "/entdecken", label: "Entdecken", Icon: Compass },
  { href: "/puls", label: "Puls", Icon: MessageSquare },
  { href: "/markt", label: "Markt", Icon: ShoppingBag },
  { href: "/stadt-dialog", label: "Stadt-Dialog", Icon: Landmark },
  { href: "/favorites", label: "Merkliste", Icon: Bookmark },
  { href: "/profile", label: "Mitteilungen", Icon: Bell },
  { href: "/profile", label: "Profil", Icon: UserCircle2 },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 h-screen flex flex-col py-2 pr-2 xl:pr-6">
      {/* Wortmarke */}
      <Link
        href="/"
        className="inline-flex items-center w-fit p-2.5 rounded-full hover:bg-paper-dim transition-colors"
      >
        <span className="w-9 h-9 rounded-full bg-burgundy text-white font-display text-[20px] grid place-items-center">
          Z
        </span>
        <span className="hidden xl:inline font-display text-[21px] tracking-tight ml-2.5">
          ZurichTonight
        </span>
      </Link>

      {/* Navigation */}
      <nav className="mt-1 flex-1">
        {NAV.map(({ href, label, Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className="group flex items-center w-fit rounded-full hover:bg-paper-dim transition-colors"
            >
              <span className="p-3">
                <Icon
                  className="w-[26px] h-[26px]"
                  strokeWidth={active ? 2.4 : 1.7}
                />
              </span>
              <span
                className={`hidden xl:inline text-[19px] pr-6 ${
                  active ? "font-bold" : ""
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* Posten-Button */}
        <button
          onClick={() =>
            document
              .querySelector<HTMLTextAreaElement>("main textarea")
              ?.focus()
          }
          className="mt-4 w-[52px] h-[52px] xl:w-[220px] xl:h-auto xl:px-8 xl:py-3.5 rounded-full bg-burgundy text-white font-bold text-[16px] hover:bg-burgundy-dark transition-colors grid place-items-center"
        >
          <Feather className="w-6 h-6 xl:hidden" strokeWidth={2} />
          <span className="hidden xl:inline">Posten</span>
        </button>
      </nav>

      {/* Profil-Chip */}
      <button className="flex items-center gap-3 p-2.5 mb-2 rounded-full hover:bg-paper-dim transition-colors w-fit xl:w-full text-left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FEED_ME.avatar}
          alt={FEED_ME.name}
          className="w-10 h-10 rounded-full bg-paper-dim object-cover shrink-0"
        />
        <span className="hidden xl:block flex-1 min-w-0">
          <span className="block text-[14px] font-bold truncate">
            {FEED_ME.name}
          </span>
          <span className="block text-[13px] text-ink-faint truncate">
            @{FEED_ME.handle}
          </span>
        </span>
        <MoreHorizontal className="hidden xl:block w-4 h-4 text-ink-faint shrink-0" />
      </button>
    </div>
  );
}
