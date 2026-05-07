import { PageHero } from "@/components/PageHero";
import { UmfragenView } from "@/components/views/UmfragenView";

export const metadata = {
  title: "Umfragen · ZüriBühni",
  description:
    "Was bewegt Zürich? Stimm ab über Vorschläge zur Stadt. Umfragen laufen sieben Tage und sortieren sich nach Stimmen.",
};

export default function UmfragenPage() {
  return (
    <>
      <PageHero
        eyebrow="Stadt-Stimmen · sieben Tage"
        title="Umfragen."
        lede="Bürger stellen Fragen zur Stadt – du stimmst ab und kommentierst. Jede Umfrage läuft eine Woche, danach verschwindet sie. Was die meisten Stimmen sammelt, steht oben."
      />
      <UmfragenView />
    </>
  );
}
