import Image from "next/image";
import { contact, hero } from "@/data/profile";
import PeerNetwork from "./peer-network";
import { IconDownload, IconGitHub, IconLinkedIn, IconMail } from "./icons";

export default function Hero({ photo, hasResume }: { photo: string | null; hasResume: boolean }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(900px_500px_at_75%_-10%,var(--glow),transparent_70%)]"
      />
      <PeerNetwork className="absolute inset-0 -z-10 h-full w-full opacity-70 [mask-image:radial-gradient(120%_100%_at_60%_0%,black_45%,transparent_92%)] print:hidden" />
      <div className="mx-auto flex min-h-[92svh] max-w-5xl flex-col justify-center px-6 pb-16 pt-28 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {hero.status}
            </p>
            <h1 className="rise rise-1 mt-7 font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              {hero.headline[0]} <em className="text-accent">{hero.headline[1]}</em>
            </h1>
            <p className="rise rise-2 mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
              {hero.lede}
            </p>
            <p className="rise rise-3 mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted">
              {hero.sub}
            </p>
            <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-3">
              <a href={`mailto:${contact.email}`} className="btn-primary">
                <IconMail width={15} height={15} /> Email me
              </a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <IconGitHub width={15} height={15} /> GitHub
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <IconLinkedIn width={15} height={15} /> LinkedIn
              </a>
              {hasResume && (
                <a href="/resume.pdf" className="btn-ghost">
                  <IconDownload width={15} height={15} /> Résumé
                </a>
              )}
            </div>
            <p className="rise rise-5 mt-7 font-mono text-[11px] leading-relaxed text-muted">
              {hero.ticker}
              <span className="mx-2 opacity-40">·</span>
              <span className="whitespace-nowrap">
                press <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> to navigate
              </span>
            </p>
          </div>
          {photo && (
            <div className="rise rise-2 hidden lg:block">
              <div className="group relative w-[236px]">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-3xl border border-dashed border-line transition-transform duration-500 group-hover:rotate-2"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
                  <Image
                    src={photo}
                    alt="Portrait of Sumit Kumar Singh"
                    fill
                    priority
                    sizes="236px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
