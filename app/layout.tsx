import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ZüriBühni · Live Atlas Zürich",
  description:
    "Kuratiert · Was läuft in Zürich. Konzerte, Klubs, Theater, Kunst, Volksfeste. Geh hin, dokumentier den Abend.",
  metadataBase: new URL("https://zueribuehni.example.ch"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-paper text-ink antialiased min-h-screen flex flex-col">
        <ToastProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-editorial py-12 md:py-16 grid gap-8 md:grid-cols-3 items-start">
        <div>
          <div className="font-display text-2xl text-ink mb-2">ZüriBühni</div>
          <p className="text-[14px] text-ink-muted leading-relaxed max-w-xs">
            Live Atlas für Zürich. Kuratiert, nicht gelistet. Wir sammeln, was den Abend macht — und was er war.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-3">Entdecken</div>
          <ul className="space-y-2 text-[14px] text-ink">
            <li><a href="/" className="hover:text-burgundy transition-colors">Heute Abend</a></li>
            <li><a href="/woche" className="hover:text-burgundy transition-colors">Diese Woche</a></li>
            <li><a href="/aftermath" className="hover:text-burgundy transition-colors">Aftermath</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Beitragen</div>
          <ul className="space-y-2 text-[14px] text-ink">
            <li><a href="/neuer-event" className="hover:text-burgundy transition-colors">Event vorschlagen</a></li>
          </ul>
          <p className="mt-6 text-[11px] text-ink-faint">© 2026 ZüriBühni. Mit Sorgfalt aus Zürich.</p>
        </div>
      </div>
    </footer>
  );
}
