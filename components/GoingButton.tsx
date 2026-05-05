"use client";

import { useEffect, useState } from "react";
import { Check, Heart } from "lucide-react";
import { isGoing, toggleGoing, goingCount } from "@/lib/going";
import { useToast } from "./Toast";
import { STORAGE_EVENT } from "@/lib/storage";

interface Props {
  eventId: string;
  baseMax: number;
  size?: "lg" | "md";
}

export function GoingButton({ eventId, baseMax, size = "lg" }: Props) {
  const [going, setGoing] = useState(false);
  const [count, setCount] = useState(0);
  const { push } = useToast();

  useEffect(() => {
    const sync = () => {
      setGoing(isGoing(eventId));
      setCount(goingCount(eventId, baseMax));
    };
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, [eventId, baseMax]);

  function handleClick(): void {
    const nowGoing = toggleGoing(eventId);
    if (nowGoing) {
      push("Du gehst hin — wir freuen uns", "success");
    } else {
      push("Abgemeldet", "info");
    }
  }

  const padding = size === "lg" ? "px-6 py-4 text-[15px]" : "px-4 py-2.5 text-[13px]";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={going}
      aria-label={going ? "Anmeldung zurücknehmen" : "Ich gehe hin"}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${padding} ${
        going
          ? "bg-paper-dim text-ink border border-line-strong hover:border-ink"
          : "bg-burgundy text-card border border-burgundy hover:bg-burgundy-dark hover:border-burgundy-dark"
      }`}
    >
      {going ? (
        <>
          <Check className="w-4 h-4" strokeWidth={2} />
          Du gehst hin
        </>
      ) : (
        <>
          <Heart className="w-4 h-4" strokeWidth={2} />
          Ich gehe hin
        </>
      )}
      <span className={`ml-1 tabular-nums ${going ? "text-ink-muted" : "text-card/85"}`}>
        · {count.toLocaleString("de-CH").replace(/,/g, "'")}
      </span>
    </button>
  );
}
