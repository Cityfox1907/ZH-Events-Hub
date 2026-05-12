export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-editorial pt-10 pb-6 md:pt-14 md:pb-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[1.05]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-ink-muted text-[16px] mt-3 max-w-2xl">{subtitle}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
