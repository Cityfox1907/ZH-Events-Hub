import Link from "next/link";

interface Props {
  title?: string;
  description?: string;
  href?: string;
  cta?: string;
}

export function PinnwandEmptyState({
  title = "Noch nichts in dieser Ecke der Stadt",
  description = "Mit deinen Filtern ist gerade niemand dran. Magst du der oder die erste sein?",
  href = "/pinnwand",
  cta = "Post erstellen",
}: Props) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-16 md:py-24 border border-dashed border-line-strong rounded-md bg-card">
      <div className="relative w-20 h-20 mb-6" aria-hidden>
        <div
          className="absolute inset-0 rounded-full opacity-90"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #efe7d8 0%, #e7ddc9 50%, transparent 75%)",
          }}
        />
        <svg
          viewBox="0 0 80 80"
          className="absolute inset-0 w-full h-full"
          fill="none"
          stroke="#7c1f1f"
          strokeWidth="1.5"
        >
          <rect x="14" y="20" width="52" height="38" rx="2" />
          <line x1="14" y1="30" x2="66" y2="30" />
          <circle cx="40" cy="14" r="2.5" fill="#7c1f1f" />
          <line x1="22" y1="38" x2="58" y2="38" />
          <line x1="22" y1="44" x2="48" y2="44" />
          <line x1="22" y1="50" x2="42" y2="50" />
        </svg>
      </div>
      <h3 className="font-display text-2xl text-ink mb-3 max-w-md italic">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-muted max-w-md">{description}</p>
      <Link
        href={href}
        className="mt-8 inline-flex items-center gap-2 px-5 h-10 rounded-full bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark transition-colors"
      >
        {cta}
      </Link>
    </div>
  );
}
