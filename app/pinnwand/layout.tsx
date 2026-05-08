import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinnwand · ZüriBühni",
  description:
    "Quartiers-Pinnwand für Zürich. Empfehlungen, Fragen, Beobachtungen — kuratiert von verifizierten Zürcher:innen.",
};

export default function PinnwandLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-paper">{children}</div>;
}
