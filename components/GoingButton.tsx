"use client";

import { useEffect, useState } from "react";
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

  const height = size === "lg" ? "h-11 px-6 text-[14px]" : "h-9 px-4 text-[13px]";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={going}
      aria-label={going ? "Anmeldung zurücknehmen" : "Ich gehe hin"}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${height} ${
        going ? "bg-ink text-paper hover:bg-ink/90" : "bg-burgundy text-paper hover:bg-burgundy-dark"
      }`}
    >
      {going ? "✓ Du gehst hin" : "Ich gehe hin"}
      <span className="ml-0.5 tabular-nums opacity-70">
        · {count.toLocaleString("de-CH").replace(/,/g, "'")}
      </span>
    </button>
  );
}
