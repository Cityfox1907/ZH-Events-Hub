"use client";

import { useEffect, useState } from "react";
import { useToast } from "./Toast";
import { addBooking, getUser, onStorageChange } from "@/lib/storage";
import type { MockUser, PulseTier } from "@/lib/types";
import Link from "next/link";

export function RsvpButton({
  eventId,
  eventTitle,
  requiredTier,
}: {
  eventId: string;
  eventTitle: string;
  requiredTier: PulseTier;
}) {
  const [user, setUser] = useState<MockUser | null>(null);
  const { push } = useToast();

  useEffect(() => {
    setUser(getUser());
    return onStorageChange(() => setUser(getUser()));
  }, []);

  const tier: PulseTier = user?.tier ?? "Free";
  const hasAccess =
    requiredTier === "Free" ||
    (requiredTier === "Premium" && tier !== "Free") ||
    (requiredTier === "VIP" && tier === "VIP");

  function rsvp() {
    if (!user) {
      push("Bitte zuerst anmelden (Demo)");
      return;
    }
    if (!hasAccess) {
      push(`Erfordert ${requiredTier}-Membership (Demo)`);
      return;
    }
    addBooking({
      module: "pulse",
      itemId: eventId,
      itemTitle: eventTitle,
      detail: "RSVP — Warteliste",
    });
    push("✓ Du bist auf der Warteliste (Demo)", "success");
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-6 card-shadow space-y-3">
      <p className="eyebrow">RSVP</p>
      <p className="text-[14px] text-ink-muted">
        Pulse-Events sind kuratiert. RSVP ist eine Anfrage — der Kurator
        bestätigt persönlich.
      </p>

      {hasAccess ? (
        <button
          onClick={rsvp}
          className="w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark transition-colors"
        >
          RSVP senden
        </button>
      ) : (
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-paper-dim border border-line text-[13px] text-ink-muted">
            Dieses Event ist {requiredTier}-Mitgliedern vorbehalten.
          </div>
          <Link
            href="/pulse"
            className="block w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark transition-colors text-center"
          >
            Membership ansehen
          </Link>
        </div>
      )}
      <p className="text-[11px] text-ink-faint text-center">Demo · keine echte Reservierung</p>
    </div>
  );
}
