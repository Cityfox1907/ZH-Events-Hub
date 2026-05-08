interface Props {
  title?: string;
  tagline?: string;
  meta?: string;
}

export function PinnwandHeader({
  title = "Pinnwand",
  tagline = "Was Zürich gerade beschäftigt",
  meta = "Quartiers-Pinnwand · Community",
}: Props) {
  return (
    <section className="container-editorial pt-10 md:pt-16 pb-6 md:pb-8">
      <div className="flex items-baseline justify-between gap-6 mb-3">
        <div className="text-[10px] uppercase tracking-[0.25em] text-ink-faint">{meta}</div>
        <div className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-ink-faint">
          ZB · Pinnwand
        </div>
      </div>
      <h1 className="font-display text-[44px] leading-[0.95] md:text-[72px] md:leading-[0.95] tracking-[-0.025em] text-ink font-light">
        <span className="italic">{title}</span>
      </h1>
      <p className="mt-4 md:mt-6 text-[16px] md:text-[18px] leading-relaxed text-ink-muted max-w-xl">
        {tagline}
      </p>
    </section>
  );
}
