"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/data/profile";
import ThemeToggle from "./theme-toggle";
import { IconCommand } from "./icons";

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    const ids = ["top", ...sections.map((s) => s.id)];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#top" aria-label="Back to top" className="font-mono text-sm font-semibold tracking-tight text-fg">
          sks<span className="caret text-accent">_</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`text-[13px] transition-colors ${
                active === s.id ? "text-accent" : "text-muted hover:text-fg"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("palette:open"))}
            aria-label="Open command palette"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-fg sm:flex"
          >
            <IconCommand width={12} height={12} />
            <span>K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
      <div
        ref={barRef}
        aria-hidden
        className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent"
      />
    </header>
  );
}
