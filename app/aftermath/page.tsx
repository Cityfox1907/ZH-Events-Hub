import { PageHero } from "@/components/PageHero";
import { AftermathView } from "@/components/views/AftermathView";

export default function AftermathPage() {
  return (
    <>
      <PageHero
        eyebrow="Was war · letzte sieben Tage"
        title="Aftermath."
        lede="Andere Plattformen verkaufen Tickets. Wir dokumentieren, wie der Abend war — Fotos, Akustik, Sitzplätze, der Moment der ihn gemacht hat."
      />
      <AftermathView />
    </>
  );
}
