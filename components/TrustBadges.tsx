import { ShieldCheck, Award, Calendar } from "lucide-react";

export function TrustBadges({
  since = "2024",
  topRated,
}: {
  since?: string;
  topRated?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Verifiziert" />
      <Badge
        icon={<Calendar className="w-3.5 h-3.5" />}
        label={`Seit ${since} auf ZurichTonight`}
      />
      {topRated && <Badge icon={<Award className="w-3.5 h-3.5" />} label="Top-Rated" tone="brass" />}
    </div>
  );
}

function Badge({
  icon,
  label,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  tone?: "default" | "brass";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
        tone === "brass"
          ? "border-brass/40 text-brass bg-brass/5"
          : "border-line text-ink-muted bg-paper"
      }`}
    >
      {icon}
      {label}
    </span>
  );
}
