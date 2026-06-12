"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  MessageSquare,
  ShoppingBag,
  UserCircle2,
  Home,
  Sparkles,
} from "lucide-react";
import { useViewMode } from "@/lib/viewMode";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { state } = useViewMode();
  const isDashboard = state.mode === "dashboard";

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const profileHref = isDashboard ? "/app" : "/profile";

  return (
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
