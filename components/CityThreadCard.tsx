"use client";

import Link from "next/link";
import { MessageCircle, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import type { CityThread } from "@/lib/types";
import { IdentityBadge } from "./IdentityBadge";

interface Props {
  thread: CityThread;
  detailed?: boolean;
}

const MODULE_HREF: Record<string, string> = {
  orte: "/entdecken/orte",
  entdecken: "/entdecken/kalender",
  stimmen: "/stadt-dialog",
  markt: "/markt",
  puls: "/puls",
};

export function CityThreadCard({ thread, detailed = false }: Props) {
  const crossHref = thread.cross
    ? thread.cross.id
      ? `${MODULE_HREF[thread.cross.module] ?? "/entdecken"}?slug=${thread.cross.id}`
      : MODULE_HREF[thread.cross.module] ?? "/entdecken"
    : null;

  return (
    <article className="bg-card border border-line rounded-2xl card-shadow overflow-hidden grid md:grid-cols-[1.2fr_2fr] gap-0">
      {thread.image && (
        <div className="md:order-1 aspect-[4/3] md:aspect-auto relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thread.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5 md:p-6 flex flex-col">
        <p className="text-[10.5px] uppercase tracking-[0.18em] text-burgundy">
          {thread.category}
        </p>
        <h3 className="font-display text-2xl md:text-[26px] mt-1 leading-tight">
          {thread.title}
        </h3>
        <p className="text-[13.5px] text-ink-muted mt-2 leading-relaxed">
          {thread.hook}
        </p>

        {thread.verifiedSource && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11.5px] text-sky-900 w-max">
            <ShieldCheck className="w-3 h-3" />
            Verifizierte Quelle: {thread.verifiedSource.name} ·{" "}
            {thread.verifiedSource.role}
          </div>
        )}

        <ul className="mt-4 space-y-2">
          {thread.topComments.slice(0, detailed ? 3 : 3).map((c, i) => (
            <li
              key={i}
              className="text-[12.5px] bg-paper-dim/60 rounded-lg px-3 py-2"
            >
              <span className="font-medium">{c.author}</span>{" "}
              <IdentityBadge tier={c.identity} compact />
              <span className="text-ink-muted"> — {c.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-4 text-[12px] text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" /> {thread.reactions}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" /> {thread.comments} Kommentare
          </span>
          {crossHref && thread.cross && (
            <Link
              href={crossHref}
              className="ml-auto inline-flex items-center gap-1 text-[12px] font-medium text-burgundy hover:gap-2 transition-all"
            >
              {thread.cross.label}
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        <Link
          href="#"
          onClick={(e) => e.preventDefault()}
          className="mt-2 text-[12.5px] font-medium text-burgundy hover:underline w-max"
        >
          Zur vollen Diskussion →
        </Link>
      </div>
    </article>
  );
}
