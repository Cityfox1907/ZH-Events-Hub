import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
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
          <div className="flex-1 flex">
            <Sidebar />
            <div className="flex-1 min-w-0 flex flex-col">
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="px-5 md:px-8 py-8 flex flex-wrap items-center justify-center gap-3 text-[12px] text-ink-faint text-center">
        <span className="font-display text-[16px] text-ink-muted">ZüriBühni</span>
        <span>·</span>
        <span>Kuratiert für Zürich</span>
        <span>·</span>
        <a href="/" className="hover:text-burgundy transition-colors">Heute</a>
        <a href="/woche" className="hover:text-burgundy transition-colors">Woche</a>
        <a href="/aftermath" className="hover:text-burgundy transition-colors">Aftermath</a>
        <a href="/pinnwand" className="hover:text-burgundy transition-colors">Pinnwand</a>
        <a href="/neuer-event" className="hover:text-burgundy transition-colors">Vorschlagen</a>
      </div>
    </footer>
  );
}
