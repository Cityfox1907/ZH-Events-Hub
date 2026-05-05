import { PageHero } from "@/components/PageHero";
import { WeekView } from "@/components/views/WeekView";

export default function WochePage() {
  return (
    <>
      <PageHero
        eyebrow="Sieben Tage · Zürich"
        title="Diese Woche."
        lede="Ein chronologischer Überblick. Tag für Tag, Stunde für Stunde — ausgewählt, nie aufgelistet."
      />
      <WeekView />
    </>
  );
}
