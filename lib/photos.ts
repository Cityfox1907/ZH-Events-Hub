import { storage, emitStorageChange } from "./storage";
import type { EventPhoto } from "./types";

const MAX_DIM = 800;
const JPEG_QUALITY = 0.8;

/**
 * Client-side compression: load file into Image, draw to canvas with max-side
 * 800px, export as JPEG at 0.8. Required because localStorage caps around 5 MB.
 */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read-failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode-failed"));
      img.onload = () => {
        const ratio = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("canvas-unavailable"));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        try {
          const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
          resolve(dataUrl);
        } catch (e) {
          reject(e instanceof Error ? e : new Error("encode-failed"));
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function getPhotosForEvent(eventId: string): EventPhoto[] {
  return storage.readPhotos()
    .filter((p) => p.eventId === eventId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addPhoto(eventId: string, dataUrl: string, caption?: string): EventPhoto {
  const photo: EventPhoto = {
    id: `photo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    eventId,
    dataUrl,
    caption: caption?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
  const list = storage.readPhotos();
  list.push(photo);
  storage.writePhotos(list);
  emitStorageChange();
  return photo;
}

export function removePhoto(photoId: string): void {
  const list = storage.readPhotos().filter((p) => p.id !== photoId);
  storage.writePhotos(list);
  emitStorageChange();
}
