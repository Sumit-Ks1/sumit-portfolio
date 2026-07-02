import { skillGroups, skillsFootnote } from "@/data/profile";
import Reveal from "./reveal";
import Section from "./section";

export default function Skills() {
  return (
    <Section id="skills" index="03" title="Skills" kicker="tools I reach for">
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line">
          {skillGroups.map((group, i) => (
            <div
              key={group.label}
              className={`grid gap-3 p-5 md:grid-cols-[200px_1fr] md:gap-6 md:px-7 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {group.label}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {group.featured.includes(item) && (
                      <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">{skillsFootnote}</p>
      </Reveal>
    </Section>
  );
}
