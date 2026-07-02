import Reveal from "./reveal";

export default function Section({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 md:mb-14">
            <span className="font-mono text-xs text-accent">{index}</span>
            <h2 id={`${id}-title`} className="font-serif text-3xl tracking-tight md:text-4xl">
              {title}
            </h2>
            {kicker ? (
              <p className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {kicker}
              </p>
            ) : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
