import { contact, outro } from "@/data/profile";
import CopyChip from "./copy-chip";
import Reveal from "./reveal";
import { IconArrow, IconMail } from "./icons";

export default function Contact({ hasResume }: { hasResume: boolean }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 pb-10 pt-24 md:pt-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs text-accent">06</p>
            <h2 id="contact-title" className="mt-4 font-serif text-5xl tracking-tight md:text-6xl">
              {outro.heading[0]} <em className="text-accent">{outro.heading[1]}</em>
              {outro.heading[2]}
            </h2>
            <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted">
              {outro.blurb}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${contact.email}`} className="btn-primary">
                <IconMail width={15} height={15} /> {contact.email}
              </a>
              <CopyChip value={contact.email} label="copy" />
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs text-muted">
              <a href={`tel:${contact.phoneRaw}`} className="transition-colors hover:text-fg">
                {contact.phone}
              </a>
              <a className="link-mono" href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub <IconArrow width={11} height={11} />
              </a>
              <a className="link-mono" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <IconArrow width={11} height={11} />
              </a>
              {hasResume && (
                <a className="link-mono" href="/resume.pdf">
                  Résumé <IconArrow width={11} height={11} />
                </a>
              )}
            </div>
          </div>
        </Reveal>
        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 font-mono text-[11px] text-muted">
          <p>© {new Date().getFullYear()} Sumit Kumar Singh</p>
          <p className="hidden sm:block">
            <kbd>⌘K</kbd> works anywhere on this page
          </p>
          <p>Next.js · Tailwind · Vercel</p>
        </footer>
      </div>
    </section>
  );
}
