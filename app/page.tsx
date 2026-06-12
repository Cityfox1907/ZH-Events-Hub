import type { Metadata } from "next";
import { SidebarNav } from "@/components/feed/SidebarNav";
import { Timeline } from "@/components/feed/Timeline";
import { RightRail } from "@/components/feed/RightRail";

export const metadata: Metadata = {
  title: "Startseite · ZurichTonight",
  description:
    "Der Live-Feed aus Zürich — was die Stadt gerade postet, teilt und diskutiert.",
};

export default function HomePage() {
  return (
    <div className="container-feed flex justify-center">
      {/* Linke Navigations-Spalte (ab md sichtbar) */}
      <aside className="hidden md:block w-[72px] xl:w-[260px] shrink-0">
        <SidebarNav />
      </aside>

      {/* Mittlere Feed-Spalte */}
      <section className="w-full max-w-[600px] border-x border-line min-h-screen">
        <Timeline />
      </section>

      {/* Rechte Info-Spalte (ab lg sichtbar) */}
      <aside className="hidden lg:block w-[320px] xl:w-[350px] shrink-0">
        <RightRail />
      </aside>
    </div>
  );
}
