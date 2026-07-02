"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { contact, sections } from "@/data/profile";
import { toggleTheme } from "@/lib/theme";
import {
  IconCommand,
  IconDownload,
  IconGitHub,
  IconHash,
  IconLinkedIn,
  IconMail,
  IconMoon,
  IconPhone,
} from "./icons";

type Group = "Navigate" | "Actions" | "Connect";

type Item = {
  id: string;
  group: Group;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

const GROUPS: Group[] = ["Navigate", "Actions", "Connect"];

export default function CommandPalette({ hasResume }: { hasResume: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    setCopiedId(null);
  }, []);

  const goTo = useCallback(
    (id: string) => {
      close();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    },
    [close]
  );

  const copy = useCallback(
    (id: string, value: string) => {
      navigator.clipboard.writeText(value).catch(() => {});
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId(null);
        close();
      }, 900);
    },
    [close]
  );

  const openLink = useCallback(
    (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [close]
  );

  const items = useMemo<Item[]>(() => {
    const icon = { width: 14, height: 14 };
    return [
      {
        id: "nav-top",
        group: "Navigate" as const,
        label: "Overview",
        hint: "top",
        icon: <IconHash {...icon} />,
        run: () => goTo("top"),
      },
      ...sections.map((s) => ({
        id: `nav-${s.id}`,
        group: "Navigate" as const,
        label: s.label,
        hint: s.index,
        icon: <IconHash {...icon} />,
        run: () => goTo(s.id),
      })),
      {
        id: "copy-email",
        group: "Actions" as const,
        label: "Copy email",
        hint: contact.email,
        icon: <IconMail {...icon} />,
        run: () => copy("copy-email", contact.email),
      },
      {
        id: "copy-phone",
        group: "Actions" as const,
        label: "Copy phone",
        hint: contact.phone,
        icon: <IconPhone {...icon} />,
        run: () => copy("copy-phone", contact.phoneRaw),
      },
      {
        id: "theme",
        group: "Actions" as const,
        label: "Toggle theme",
        hint: "dark / light",
        icon: <IconMoon {...icon} />,
        run: () => toggleTheme(),
      },
      ...(hasResume
        ? [
            {
              id: "resume",
              group: "Actions" as const,
              label: "Download résumé",
              hint: "PDF",
              icon: <IconDownload {...icon} />,
              run: () => openLink("/resume.pdf"),
            },
          ]
        : []),
      {
        id: "github",
        group: "Connect" as const,
        label: "GitHub",
        hint: `@${contact.githubHandle}`,
        icon: <IconGitHub {...icon} />,
        run: () => openLink(contact.github),
      },
      {
        id: "linkedin",
        group: "Connect" as const,
        label: "LinkedIn",
        hint: "sumit-kumar-singh",
        icon: <IconLinkedIn {...icon} />,
        run: () => openLink(contact.linkedin),
      },
      {
        id: "mailto",
        group: "Connect" as const,
        label: "Send an email",
        hint: contact.email,
        icon: <IconMail {...icon} />,
        run: () => {
          close();
          window.location.href = `mailto:${contact.email}`;
        },
      },
    ];
  }, [goTo, copy, openLink, close, hasResume]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      q
        ? items.filter((i) =>
            `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q)
          )
        : items,
    [items, q]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else setOpen(true);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const id = filtered[active]?.id;
    if (id) {
      listRef.current?.querySelector<HTMLElement>(`#pal-${id}`)?.scrollIntoView({ block: "nearest" });
    }
  }, [active, filtered]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  if (!open) return null;

  let flat = -1;

  return (
    <div className="fixed inset-0 z-[100] print:hidden" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={close} />
      <div className="relative mx-auto mt-[12vh] w-[min(560px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <IconCommand width={15} height={15} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search sections, actions, links…"
            aria-label="Search commands"
            className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
          />
          <kbd>esc</kbd>
        </div>
        <ul ref={listRef} className="max-h-[46vh] overflow-y-auto p-2" role="listbox" aria-label="Commands">
          {filtered.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted">
              Nothing found — try &ldquo;projects&rdquo; or &ldquo;email&rdquo;.
            </li>
          )}
          {GROUPS.map((group) => {
            const inGroup = filtered.filter((i) => i.group === group);
            if (!inGroup.length) return null;
            return (
              <li key={group}>
                <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {group}
                </p>
                <ul>
                  {inGroup.map((item) => {
                    flat += 1;
                    const idx = flat;
                    return (
                      <li key={item.id} id={`pal-${item.id}`} role="option" aria-selected={idx === active}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => item.run()}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            idx === active ? "bg-raise" : ""
                          }`}
                        >
                          <span className={idx === active ? "text-accent" : "text-muted"}>{item.icon}</span>
                          <span className="text-fg">{item.label}</span>
                          <span className="ml-auto truncate pl-4 font-mono text-[11px] text-muted">
                            {copiedId === item.id ? <span className="text-accent">copied ✓</span> : item.hint}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
