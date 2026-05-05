import { PageHero } from "@/components/PageHero";
import { EventForm } from "@/components/EventForm";

export default function NeuerEventPage() {
  return (
    <>
      <PageHero
        eyebrow="Hilf der Community, Zürich abzubilden"
        title="Event vorschlagen."
        lede="Du weißt von etwas, das hier fehlt? Trag es ein. Wir bevorzugen Konzerte, Theater, Klubs, Kunst, Volksfeste, Sport, Premium-Gastro und Mode — keine Mitgliederversammlungen."
      />
      <section className="container-editorial pb-24">
        <div className="max-w-3xl">
          <EventForm />
        </div>
      </section>
    </>
  );
}
