"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { addPhoto, compressImage } from "@/lib/photos";
import { useToast } from "./Toast";

interface Props {
  eventId: string;
}

export function PhotoUploader({ eventId }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { push } = useToast();

  async function handleFiles(files: FileList | null): Promise<void> {
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (valid.length === 0) {
      push("Nur Bilddateien werden unterstützt", "info");
      return;
    }
    setBusy(true);
    try {
      for (const file of valid) {
        const dataUrl = await compressImage(file);
        addPhoto(eventId, dataUrl);
      }
      push(`${valid.length} ${valid.length === 1 ? "Foto" : "Fotos"} hochgeladen`, "success");
    } catch {
      push("Upload fehlgeschlagen — versuch es nochmal", "info");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          void handleFiles(e.target.files);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void handleFiles(e.dataTransfer.files);
        }}
        disabled={busy}
        className={`group w-full flex flex-col items-center justify-center px-6 py-10 rounded-md border-2 border-dashed transition-colors duration-200 ${
          dragOver ? "border-burgundy bg-card" : "border-line-strong hover:border-ink bg-card"
        } ${busy ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
      >
        {busy ? (
          <Loader2 className="w-5 h-5 text-ink-muted animate-spin mb-3" strokeWidth={1.75} />
        ) : (
          <ImagePlus
            className={`w-5 h-5 mb-3 transition-colors ${dragOver ? "text-burgundy" : "text-ink-muted group-hover:text-ink"}`}
            strokeWidth={1.5}
          />
        )}
        <span className="text-[14px] text-ink font-medium">
          {busy ? "Wird verarbeitet" : "Foto teilen"}
        </span>
        <span className="mt-1 text-[12px] text-ink-faint">
          Drag & Drop oder klicken — wir komprimieren automatisch
        </span>
      </button>
    </div>
  );
}
