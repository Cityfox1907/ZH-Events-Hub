"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  UserCircle2,
  Home,
  Layers,
  Users,
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur border-t border-line">
      <ul className="grid grid-cols-5">
        <BottomItem href="/" label="Home" Icon={Home} active={pathname === "/"} />
        <BottomItem
          href="/hub"
          label="Hub"
          Icon={Layers}
          active={isActive("/hub")}
        />
        <BottomItem
          href="/communities"
          label="Communities"
          Icon={Users}
          active={isActive("/communities")}
        />
        <BottomItem
          href="/entdecken"
          label="Entdecken"
          Icon={Compass}
          active={isActive("/entdecken")}
        />
        <BottomItem
          href="/profile"
          label="Profil"
          Icon={UserCircle2}
          active={isActive("/profile")}
        />
      </ul>
    </nav>
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
        className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[9.5px] font-medium transition-colors ${
          active ? "text-burgundy" : "text-ink-muted"
        }`}
      >
        <Icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
        <span className="truncate max-w-full px-0.5">{label}</span>
      </Link>
    </li>
  );
}
