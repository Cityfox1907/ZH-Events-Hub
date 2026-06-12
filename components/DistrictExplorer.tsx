import Link from "next/link";
import { MapPin } from "lucide-react";
import { DISTRICTS, TONIGHT_EVENTS, DINE_VENUES } from "@/lib/data";

function countsFor(district: string) {
  const venues = DINE_VENUES.filter((v) => v.district === district).length;
  const events = TONIGHT_EVENTS.filter((e) => e.district === district).length;
  return { venues, events };
}

export function DistrictExplorer() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {DISTRICTS.map((d) => {
        const { venues, events } = countsFor(d.key);
        return (
          <Link
            key={d.key}
            href="/entdecken"
            className="group relative rounded-2xl overflow-hidden bg-card border border-line aspect-[4/3] card-shadow card-shadow-hover transition-shadow"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.cover}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-brass" />
                <span className="text-[11px] uppercase tracking-wider text-paper-dim">
                  Quartier
                </span>
              </div>
              <p className="font-display text-lg leading-tight">{d.name}</p>
              <p className="text-[11px] text-paper-dim mt-1">
                {venues} Venues · {events} Events heute
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
