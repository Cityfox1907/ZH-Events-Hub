import type { ZhEvent } from "@/lib/types";
import { EventCard } from "./EventCard";

interface Props {
  events: ZhEvent[];
  variant?: "default" | "aftermath";
  columns?: "two" | "three";
}

export function EventGrid({ events, variant = "default", columns = "three" }: Props) {
  const cols =
    columns === "two"
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  return (
    <div className={`grid ${cols} gap-6`}>
      {events.map((event, idx) => (
        <EventCard key={event.id} event={event} variant={variant} index={idx} />
      ))}
    </div>
  );
}
