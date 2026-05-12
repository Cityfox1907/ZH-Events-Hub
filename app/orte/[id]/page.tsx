"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  UtensilsCrossed,
  Wine,
  Coffee,
  Waves,
  Activity,
  Landmark,
  TreePine,
  ShoppingBag,
} from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ShareButton } from "@/components/ShareModal";
import { PLACES_ALL } from "@/lib/data";
import type { PlaceKind } from "@/lib/types";

const KIND_ICONS: Record<PlaceKind, typeof UtensilsCrossed> = {
  restaurant: UtensilsCrossed,
  bar: Wine,
  cafe: Coffee,
  badi: Waves,
  activity: Activity,
  museum: Landmark,
  nature: TreePine,
  market: ShoppingBag,
};

const KIND_LABELS: Record<PlaceKind, string> = {
  restaurant: "Restaurant",
  bar: "Bar",
  cafe: "Café",
  badi: "Badi",
  activity: "Aktivität",
  museum: "Museum",
  nature: "Natur & Aussicht",
  market: "Markt",
};

export default function OrtDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const place = useMemo(() => PLACES_ALL.find((p) => p.id === id), [id]);

  if (!place) {
    notFound();
  }
  if (place.source === "dine") {
    redirect(`/dine/${place.id}`);
  }

  const Icon = KIND_ICONS[place.kind];

  return (
    <>
      <section className="relative">
        <div className="relative h-[44vh] md:h-[58vh] min-h-[320px] overflow-hidden bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={place.cover_image}
            alt={place.name}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="container-editorial absolute inset-x-0 bottom-0 pb-8 md:pb-12 text-paper">
            <Link
              href="/entdecken"
              className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-paper-dim hover:text-paper mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Zurück zu Entdecken
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-brass" strokeWidth={1.5} />
              <p className="eyebrow text-paper-dim">
                {KIND_LABELS[place.kind]} · {place.subtype}
              </p>
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05]">
              {place.name}
            </h1>
            <p className="text-paper-dim text-[14px] mt-3 inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {place.district} · {place.address}
            </p>
          </div>
        </div>
      </section>

      <section className="container-editorial grid lg:grid-cols-[1fr_320px] gap-10 py-10 md:py-14">
        <div>
          <p className="text-[16px] leading-relaxed text-ink">
            {place.description}
          </p>

          {place.vibe_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {place.vibe_tags.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1 rounded-full bg-paper-dim text-[12px] text-ink-muted"
                >
                  {v}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <Info label="Öffnungszeiten" icon={<Clock className="w-4 h-4" />}>
              {place.hours}
            </Info>
            <Info label="Adresse" icon={<MapPin className="w-4 h-4" />}>
              {place.address}
            </Info>
            <Info label="Preis" icon={<span className="text-[12px] font-medium">CHF</span>}>
              {place.price_range}
            </Info>
            {typeof place.rating === "number" && (
              <Info label="Bewertung" icon={<Star className="w-4 h-4 fill-brass text-brass" />}>
                {place.rating.toFixed(1)}{" "}
                {place.review_count && (
                  <span className="text-ink-faint">
                    · {place.review_count} Bewertungen
                  </span>
                )}
              </Info>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
            <p className="eyebrow mb-3">Aktionen</p>
            <div className="flex flex-wrap gap-2">
              <BookmarkButton
                module="orte"
                id={place.id}
                title={place.name}
              />
              <ShareButton title={place.name} variant="icon" />
            </div>
            <p className="text-[12px] text-ink-faint mt-4">
              Reservation oder Eintritt direkt vor Ort — wir leiten nicht weiter.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

function Info({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-line rounded-2xl p-4">
      <div className="flex items-center gap-2 text-ink-muted mb-1.5">
        {icon}
        <span className="text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-[14px]">{children}</p>
    </div>
  );
}
