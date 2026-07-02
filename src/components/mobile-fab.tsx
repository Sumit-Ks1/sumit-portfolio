"use client";

import { IconCommand } from "./icons";

export default function MobileFab() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("palette:open"))}
      aria-label="Open quick navigation"
      className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/90 text-fg shadow-lg shadow-black/20 backdrop-blur md:hidden print:hidden"
    >
      <IconCommand width={18} height={18} />
    </button>
  );
}
