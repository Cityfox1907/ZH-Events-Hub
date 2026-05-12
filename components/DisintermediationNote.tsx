import { ShieldCheck } from "lucide-react";

export function DisintermediationNote() {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-paper-dim border border-line">
      <ShieldCheck className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
      <p className="text-[13px] text-ink-muted leading-relaxed">
        Alle Anfragen laufen sicher über ZurichTonight. Wir verbinden dich nach
        Bestätigung — keine direkten Kontaktdaten nötig.
      </p>
    </div>
  );
}
