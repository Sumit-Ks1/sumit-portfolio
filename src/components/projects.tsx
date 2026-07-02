import { projects } from "@/data/profile";
import Reveal from "./reveal";
import Section from "./section";
import SpotlightCard from "./spotlight-card";
import { IconArrow } from "./icons";

export default function Projects() {
  return (
    <Section id="projects" index="02" title="Projects" kicker="built to solve real problems">
      <div className="space-y-6">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 60}>
            <SpotlightCard className="rounded-2xl border border-line bg-surface/60 p-7 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-accent">{project.index}</p>
                  <h3 className="mt-2 font-serif text-2xl tracking-tight md:text-[1.7rem]">
                    {project.name}
                  </h3>
                  <p className="mt-2 font-serif italic text-muted">{project.oneLiner}</p>
                </div>
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-mono shrink-0"
                >
                  {project.link.label} <IconArrow width={11} height={11} />
                </a>
              </div>
              <ul className="mt-6 max-w-3xl space-y-3">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                {project.facts.map((fact) => (
                  <span
                    key={fact}
                    className="rounded-full border border-dashed border-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent"
                  >
                    {fact}
                  </span>
                ))}
                <span aria-hidden className="mx-1 hidden h-4 w-px bg-line sm:block" />
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
