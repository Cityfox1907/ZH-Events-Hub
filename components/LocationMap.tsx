import { MapPin } from "lucide-react";

export function LocationMap({ address }: { address: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-line">
      <div className="relative aspect-[16/9] bg-paper-dim">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #e9eff8 0%, #f6f8fb 40%, #dbe5f3 100%)",
          }}
        />
        <svg
          viewBox="0 0 400 200"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#c5d0e2" strokeWidth="0.5" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path
            d="M 0 110 Q 80 90 140 105 T 280 95 T 400 110"
            stroke="#0f4da8"
            strokeWidth="1.2"
            fill="none"
            opacity="0.55"
          />
          <path
            d="M 0 130 L 90 130 L 140 90 L 280 90 L 400 110"
            stroke="#0a1733"
            strokeWidth="0.6"
            fill="none"
            opacity="0.4"
          />
          <circle cx="200" cy="100" r="32" fill="#0f4da8" opacity="0.10" />
          <circle cx="200" cy="100" r="6" fill="#0f4da8" />
          <circle cx="200" cy="100" r="2.5" fill="#ffffff" />
        </svg>
      </div>
      <div className="px-4 py-3 bg-card flex items-center gap-2 text-[13px] text-ink-muted border-t border-line">
        <MapPin className="w-4 h-4 text-burgundy" />
        {address}
      </div>
    </div>
  );
}
