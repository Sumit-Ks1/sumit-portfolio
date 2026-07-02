"use client";

import { useRef, useState } from "react";
import { IconCheck, IconCopy } from "./icons";

export default function CopyChip({ value, label }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setDone(false), 1600);
    } catch {
      window.prompt("Copy:", value);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label ?? value}`}
      className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg"
    >
      {done ? (
        <IconCheck width={13} height={13} className="text-accent" />
      ) : (
        <IconCopy width={13} height={13} />
      )}
      <span>{done ? "copied" : (label ?? value)}</span>
    </button>
  );
}
