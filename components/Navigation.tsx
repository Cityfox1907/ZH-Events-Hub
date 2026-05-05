"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Plus } from "lucide-react";

const NAV = [
  { href: "/", label: "Heute Abend" },
  { href: "/woche", label: "Diese Woche" },
  { href: "/aftermath", label: "Aftermath" },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-paper border-b border-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 group" aria-label="ZüriBühni Startseite">
          <span className="font-display text-[22px] md:text-[24px] text-ink leading-none tracking-tight transition-colors group-hover:text-burgundy">
            ZüriBühni
          </span>
          <span className="hidden md:inline-block eyebrow translate-y-[1px] text-ink-faint">Live · Zürich</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Hauptnavigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative text-[14px] tracking-tight transition-colors duration-200 ${
                isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-burgundy" aria-hidden />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/neuer-event"
            className="hidden md:inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-ink text-card text-[13px] font-medium hover:bg-burgundy transition-colors duration-200"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
            Event vorschlagen
          </Link>
          <button
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 rounded-full text-ink hover:bg-paper-dim transition-colors"
          >
            {open ? <X className="w-5 h-5" strokeWidth={1.75} /> : <Menu className="w-5 h-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden border-t border-line bg-paper fade-in">
          <nav className="container-editorial py-4 flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-1 py-3 text-[16px] border-b border-line last:border-0 ${
                  isActive(item.href) ? "text-ink" : "text-ink-muted"
                }`}
              >
                <span>{item.label}</span>
                {isActive(item.href) ? <span className="w-1.5 h-1.5 rounded-full bg-burgundy" aria-hidden /> : null}
              </Link>
            ))}
            <Link
              href="/neuer-event"
              className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-ink text-card text-[14px] font-medium"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              Event vorschlagen
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
