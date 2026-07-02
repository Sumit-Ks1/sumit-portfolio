import { education } from "@/data/profile";
import Reveal from "./reveal";
import Section from "./section";

export default function Education() {
  return (
    <Section id="education" index="05" title="Education" kicker="the foundation">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4 rounded-2xl border border-line bg-surface/60 p-7 md:p-8">
          <div>
            <h3 className="font-serif text-2xl tracking-tight">{education.school}</h3>
            <p className="mt-2 text-sm text-muted">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">{education.note}</p>
          </div>
          <p className="font-mono text-xs text-muted">{education.period}</p>
        </div>
      </Reveal>
    </Section>
  );
}
