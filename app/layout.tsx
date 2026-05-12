import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
  title: "ZurichTonight · Zürich, jetzt.",
  description:
    "Kuratierte Plattform für Zürich — Tonight, Dine, Experience, Pulse, Live. Demo-Prototyp.",
  metadataBase: new URL("https://zurichtonight.example.ch"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-paper text-ink antialiased min-h-screen flex flex-col">
        <ToastProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
