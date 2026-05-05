import { Compass } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action }: Props) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-16 md:py-24 border border-dashed border-line-strong rounded-md bg-card">
      <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-paper-dim text-ink-muted">
        {icon ?? <Compass className="w-5 h-5" strokeWidth={1.5} />}
      </div>
      <h3 className="font-display text-2xl text-ink mb-3">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-muted max-w-md">{description}</p>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
