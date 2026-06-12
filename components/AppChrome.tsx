"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { DemoBanner } from "./DemoBanner";

/**
 * Routenbewusste App-Hülle:
 * Die Startseite ("/") bringt ihr eigenes Feed-Layout mit linker
 * Navigations-Spalte mit — dort werden Header, Footer und Demo-Banner
 * ausgeblendet. Auf allen anderen Seiten bleibt das bisherige
 * Editorial-Layout unverändert.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFeedHome = pathname === "/";

  return (
    <>
      {!isFeedHome && (
        <>
          <DemoBanner />
          <Header />
        </>
      )}
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      {!isFeedHome && <Footer />}
      <MobileBottomNav />
    </>
  );
}
