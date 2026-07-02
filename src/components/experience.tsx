import { experience } from "@/data/profile";
import Reveal from "./reveal";
import Section from "./section";

export default function Experience() {
  return (
    <Section id="experience" index="01" title="Experience" kicker="where I've shipped">
      <ol className="space-y-14 md:space-y-16">
        {experience.map((job, i) => (
          <li key={job.org}>
            <Reveal delay={i * 60}>
              <article className="grid gap-5 md:grid-cols-[220px_1fr] md:gap-8">
                <div>
                  <p className="font-mono text-xs text-fg">{job.period}</p>
                  <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">{job.summary}</p>
                </div>
                <div className="border-l border-line pl-5 md:pl-8">
                  <h3 className="text-lg font-medium">{job.role}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-accent hover:underline"
                      >
                        {job.org}
                      </a>
                    ) : (
                      <span className="font-medium text-accent">{job.org}</span>
                    )}{" "}
                    · {job.orgNote}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
