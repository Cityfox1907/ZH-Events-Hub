"use client";

import Link from "next/link";
import { Ticket, ArrowRight } from "lucide-react";
import { ticketsForEvent } from "@/lib/phase3-data";

interface Props {
  eventId: string;
}

export function EventCrossModule({ eventId }: Props) {
  const tickets = ticketsForEvent(eventId);

  const cards: { Icon: typeof Ticket; label: string; count: number; href: string; tone: string }[] = [];

  if (tickets.length > 0) {
    cards.push({
      Icon: Ticket,
      label: "Tickets im Tausch verfügbar",
      count: tickets.length,
      href: "/markt/tickets",
      tone: "bg-rose-50 border-rose-200 text-rose-900",
    });
  }

  if (cards.length === 0) return null;

  return (
    <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
      <p className="eyebrow mb-3">Aus den anderen Modulen</p>
      <ul className="space-y-2">
        {cards.map((c) => (
          <li key={c.label}>
            <Link
              href={c.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${c.tone} hover:opacity-90 transition-opacity`}
            >
              <c.Icon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
              <span className="text-[13px] flex-1">
                <strong className="tabular-nums">{c.count}</strong> {c.label}
              </span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
