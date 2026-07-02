import { contact, tldr } from "@/data/profile";
import CopyChip from "./copy-chip";
import Reveal from "./reveal";
import { IconArrow } from "./icons";

export default function Tldr() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 md:pb-24">
      <Reveal>
        <div className="relative rounded-2xl border border-dashed border-line bg-surface/50">
          <p className="absolute -top-2.5 left-5 bg-bg px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {tldr.label}
          </p>
          <div className="grid gap-x-8 gap-y-6 p-6 pt-8 sm:grid-cols-2 md:p-8 md:pt-9 lg:grid-cols-4">
            {tldr.cells.map((cell) => (
              <div key={cell.k}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{cell.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg/90">{cell.v}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-dashed border-line px-6 py-4 md:px-8">
            <CopyChip value={contact.email} label={contact.email} />
            <CopyChip value={contact.phoneRaw} label={contact.phone} />
            <span className="ml-auto flex items-center gap-4">
              <a className="link-mono" href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub <IconArrow width={11} height={11} />
              </a>
              <a className="link-mono" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <IconArrow width={11} height={11} />
              </a>
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
