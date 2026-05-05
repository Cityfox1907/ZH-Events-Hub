"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { getPhotosForEvent, removePhoto } from "@/lib/photos";
import { STORAGE_EVENT } from "@/lib/storage";
import type { EventPhoto } from "@/lib/types";

interface Props {
  eventId: string;
}

export function PhotoStream({ eventId }: Props) {
  const [photos, setPhotos] = useState<EventPhoto[]>([]);

  useEffect(() => {
    const sync = () => setPhotos(getPhotosForEvent(eventId));
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, [eventId]);

  if (photos.length === 0) {
    return (
      <p className="text-[14px] text-ink-faint italic">
        Noch keine Fotos. Wer war dort und hat etwas Schönes festgehalten?
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {photos.map((photo) => (
        <figure
          key={photo.id}
          className="group relative aspect-square rounded-md overflow-hidden border border-line bg-paper-dim fade-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.dataUrl}
            alt={photo.caption ?? "Event-Foto"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <button
            type="button"
            onClick={() => removePhoto(photo.id)}
            aria-label="Foto entfernen"
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-paper/90 text-ink-muted opacity-0 group-hover:opacity-100 hover:text-burgundy hover:bg-paper transition flex items-center justify-center"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        </figure>
      ))}
    </div>
  );
}
