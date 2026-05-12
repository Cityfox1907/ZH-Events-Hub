import Link from "next/link";
import { Instagram, Linkedin, Send } from "lucide-react";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Für Entdecker",
    links: [
      { label: "Tonight", href: "/tonight" },
      { label: "Dine", href: "/dine" },
      { label: "Experience", href: "/experience" },
      { label: "Live", href: "/live" },
      { label: "Pulse Membership", href: "/pulse" },
      { label: "Favoriten", href: "/favorites" },
    ],
  },
  {
    title: "Für Anbieter",
    links: [
      { label: "Anbieter werden", href: "/for-providers" },
      { label: "Pricing", href: "/for-providers#pricing" },
      { label: "Anbieter-Dashboard", href: "/provider/dashboard" },
      { label: "Erfolgsstorys", href: "/for-providers#stories" },
    ],
  },
  {
    title: "Über uns",
    links: [
      { label: "Über ZurichTonight", href: "#" },
      { label: "Presse", href: "#" },
      { label: "Impressum", href: "#" },
      { label: "AGB", href: "#" },
      { label: "Datenschutz", href: "#" },
    ],
  },
];

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Send, label: "Telegram", href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-dim/40">
      <div className="container-editorial py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">
          <div>
            <span className="font-display text-2xl">ZurichTonight</span>
            <p className="text-[13px] text-ink-muted mt-3 max-w-xs">
              Die kuratierte Plattform für Zürich. Was läuft, wo essen, was
              erleben, wen treffen.
            </p>
            <div className="flex gap-2 mt-5">
              {SOCIALS.map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-line bg-card flex items-center justify-center text-ink-muted hover:text-burgundy hover:border-burgundy transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-ink-muted hover:text-burgundy transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="hairline my-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[12px] text-ink-faint">
          <span>© 2026 ZurichTonight — Demo-Prototyp. Keine echten Buchungen.</span>
          <span>Mit Liebe gemacht in Zürich.</span>
        </div>
      </div>
    </footer>
  );
}
