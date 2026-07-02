"use client";

import { useEffect, useState } from "react";
import { toggleTheme, type Theme } from "@/lib/theme";
import { IconMoon, IconSun } from "./icons";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setTheme(el.dataset.theme === "light" ? "light" : "dark");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      aria-label="Toggle color theme"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
    >
      {theme === "light" ? <IconMoon width={14} height={14} /> : <IconSun width={14} height={14} />}
    </button>
  );
}
