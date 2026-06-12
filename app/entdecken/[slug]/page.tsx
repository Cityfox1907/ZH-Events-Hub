import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Users,
  BadgeCheck,
  Landmark,
} from "lucide-react";
import {
  STADTFESTE,
  STADT_ORGANISATIONEN,
  getStadtfest,
  getOrganisation,
} from "@/lib/entdecken-data";
import { DiskussionBereich } from "@/components/entdecken/DiskussionBereich";

export function generateStaticParams() {
  return [
    ...STADTFESTE.map((f) => ({ slug: f.slug })),
    ...STADT_ORGANISATIONEN.map((o) => ({ slug: o.slug })),
  ];
}

export default async function EntdeckenDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fest = getStadtfest(slug);
  const org = fest ? undefined : getOrganisation(slug);
  if (!fest && !org) notFound();

  const name = fest?.name ?? org!.name;
  const bild = fest?.bild ?? org!.bild;

  return (
    <article className="container-editorial pt-6 pb-20">
      <Link
        href="/entdecken"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Entdecken
      </Link>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/7] bg-paper-dim mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bild} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-burgundy text-paper text-[11px] font-medium uppercase tracking-wider">
          {fest ? (
            <>{fest.kategorie} · Offiziell</>
          ) : (
            <>
              <Landmark className="w-3 h-3" /> Stadt-Organisation
            </>
          )}
        </span>
      </div>

      <div className="max-w-3xl">
        <p className="eyebrow">{fest ? fest.stadt : org!.sitz}</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          {name}
        </h1>
        <p className="text-[16px] text-ink-muted mt-2">
          {fest ? fest.untertitel : org!.kurz}
        </p>

        {fest ? (
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-[14px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {fest.datumLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {fest.ort}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-4 h-4" /> {fest.besucher}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-burgundy" />
              {fest.organisatorSlug ? (
                <Link
                  href={`/entdecken/${fest.organisatorSlug}`}
                  className="hover:text-burgundy underline-offset-2 hover:underline"
                >
                  {fest.organisator}
                </Link>
              ) : (
                fest.organisator
              )}
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 mt-5">
            {org!.zustaendigFuer.map((z) => (
              <span
                key={z}
                className="px-3 py-1 rounded-full bg-paper-dim border border-line text-[12px] text-ink-muted"
              >
                {z}
              </span>
            ))}
          </div>
        )}

        <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">
          {fest ? fest.beschreibung : org!.beschreibung}
        </p>
      </div>

      <DiskussionBereich
        name={name}
        kommentare={fest ? fest.kommentare : org!.kommentare}
        hilfeThemen={fest ? fest.hilfeThemen : org!.hilfeThemen}
      />
    </article>
  );
}
