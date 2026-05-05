import { PageHero } from "@/components/PageHero";
import { TodayView } from "@/components/views/TodayView";
import { now } from "@/lib/events";
import { formatDateLong } from "@/lib/format";

export default function HomePage() {
  const ref = now();
  const eyebrow = `${formatDateLong(ref.toISOString())} · Zürich`;

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title="Heute Abend."
        lede="Kuratiert. Was in Zürich läuft, ohne den ganzen Listen-Lärm. Klick rein, geh hin, erzähl uns wie's war."
      />
      <TodayView />
    </>
  );
}
