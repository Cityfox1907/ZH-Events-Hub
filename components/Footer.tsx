import Link from "next/link";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Plattform",
    links: [
      { label: "Tonight", href: "/tonight" },
      { label: "Dine", href: "/dine" },
      { label: "Experience", href: "/experience" },
      { label: "Pulse", href: "/pulse" },
      { label: "Live", href: "/live" },
    ],
  },
  {
    title: "Über",
    links: [
      { label: "Über uns", href: "#" },
      { label: "Anbieter werden", href: "#" },
      { label: "Pulse Membership", href: "/pulse" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "#" },
      { label: "AGB", href: "#" },
      { label: "Datenschutz", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-dim/40">
      <div className="container-editorial py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          <span className="font-display text-[16px] text-ink-muted">
            ZurichTonight
          </span>
          <span>Zürich, jetzt. — Demo-Prototyp. Keine echten Buchungen.</span>
        </div>
      </div>
    </footer>
  );
}
