import { achievements } from "@/data/profile";
import Reveal from "./reveal";
import Section from "./section";
import SpotlightCard from "./spotlight-card";

export default function Achievements() {
  return (
    <Section id="achievements" index="04" title="Achievements" kicker="proof of work">
      <div className="grid gap-4 md:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.event} delay={i * 70} className="h-full">
            <SpotlightCard className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 md:p-7">
              <p className="font-serif text-4xl tracking-tight text-accent">{a.rank}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {a.context}
              </p>
              <h3 className="mt-5 text-base font-medium">{a.event}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
