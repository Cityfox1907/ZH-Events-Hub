import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import { ViewModeProvider } from "@/components/ViewModeProvider";
import { DemoBanner } from "@/components/DemoBanner";
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
  title: "ZurichTonight · Das digitale Wohnzimmer aller Zürcher",
  description:
    "Das digitale Wohnzimmer aller Zürcher — Entdecken, Vernetzen, Erleben.",
  metadataBase: new URL("https://zurichtonight.example.ch"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-paper text-ink antialiased min-h-screen flex flex-col">
        <ViewModeProvider>
          <ToastProvider>
            <DemoBanner />
            <Header />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
          </ToastProvider>
        </ViewModeProvider>
      </body>
    </html>
  );
}
