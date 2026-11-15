"use client";

import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import { DEFAULT_WHATSAPP_TEXT, profile, projects, sections, services, whatsappLink } from "@/data/profile";
import { copyEmail, openExternal, scrollToSection } from "@/lib/actions";
import { selectIntent } from "./contact-intent";
import { selectService } from "./service-button";
import {
  WhatsAppIcon,
  ArrowIcon,
  BoxIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  SearchIcon,
  TerminalIcon,
} from "./icons";
import { useDialogFocus } from "./use-dialog-focus";

type Command = {
  id: string;
  group: "Go to" | "Services" | "Projects" | "Actions" | "Links";
  label: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void;
  /** Commands that open another overlay replace this one instead of closing first. */
  replaces?: boolean;
};

type Props = {
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenProject: (slug: string) => void;
  onNotify: (message: string) => void;
};

export function CommandPalette({ onClose, onOpenTerminal, onOpenProject, onNotify }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useDialogFocus(panelRef, inputRef, onClose);

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((s) => ({
        id: `go-${s.id}`,
        group: "Go to" as const,
        label: s.label,
        keywords: "section scroll",
        icon: <ArrowIcon />,
        run: () => scrollToSection(s.id),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Projects" as const,
        label: p.name,
        keywords: `${p.slug} ${p.client} ${p.stack.join(" ")} case study`,
        icon: <BoxIcon />,
        run: () => onOpenProject(p.slug),
        replaces: true,
      })),
      ...services.map((s) => ({
        id: `service-${s.id}`,
        group: "Services" as const,
        label: s.title,
        keywords: `${s.deliverables.join(" ")} hire enquire`,
        icon: <ArrowIcon />,
        run: () => selectService(s.id),
      })),
      {
        id: "resume",
        group: "Actions",
        label: "View resume",
        keywords: "cv pdf",
        icon: <DownloadIcon />,
        run: () => openExternal(profile.resume),
      },
      {
        id: "job-enquiry",
        group: "Actions",
        label: "Job enquiry",
        keywords: "hire hiring recruiter job role position contact",
        icon: <ArrowIcon />,
        run: () => selectIntent("job"),
      },
      {
        id: "start-project",
        group: "Actions",
        label: "Start a project",
        keywords: "freelance enquire contact quote",
        icon: <ArrowIcon />,
        run: () => selectIntent("project"),
      },
      {
        id: "whatsapp",
        group: "Actions",
        label: "Chat on WhatsApp",
        keywords: "message contact hire",
        icon: <WhatsAppIcon />,
        run: () => openExternal(whatsappLink(DEFAULT_WHATSAPP_TEXT)),
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        keywords: "contact mail",
        icon: <CopyIcon />,
        run: async () => {
          const ok = await copyEmail();
          onNotify(ok ? "Email address copied" : `Copy failed. Email: ${profile.email}`);
        },
      },
      {
        id: "terminal",
        group: "Actions",
        label: "Open terminal mode",
        keywords: "cli shell console",
        icon: <TerminalIcon />,
        run: onOpenTerminal,
        replaces: true,
      },
      {
        id: "email",
        group: "Links",
        label: "Send an email",
        keywords: "contact mail hire enquire",
        icon: <MailIcon />,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub profile",
        keywords: "code repos",
        icon: <GitHubIcon />,
        run: () => openExternal(profile.github),
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn profile",
        keywords: "social network",
        icon: <LinkedInIcon />,
        run: () => openExternal(profile.linkedin),
      },
    ],
    [onNotify, onOpenTerminal, onOpenProject],
  );

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return commands;
    return commands.filter((c) => {
      const haystack = `${c.group} ${c.label} ${c.keywords ?? ""}`.toLowerCase();
      return words.every((w) => haystack.includes(w));
    });
  }, [commands, query]);

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  function runCommand(command: Command) {
    // Close first so focus is restored before the command moves it somewhere new.
    if (!command.replaces) onClose();
    setTimeout(command.run, 0);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((activeIndex + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((activeIndex - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[activeIndex];
      if (command) runCommand(command);
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[12vh]" role="presentation">
      <div className="overlay-backdrop absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="overlay-enter relative w-full max-w-[580px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <SearchIcon className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined}
            aria-label="Search sections, services, projects and actions"
            placeholder="Search sections, services, projects and actions"
            className="h-14 w-full bg-transparent text-[16px] text-paper placeholder:text-muted focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-[15px] text-muted">
              Nothing matches “{query}”. Try a section name, a service, or a project.
            </li>
          )}
          {results.map((command, index) => {
            const showGroup = index === 0 || results[index - 1].group !== command.group;
            const selected = index === activeIndex;
            return (
              <li key={command.id} role="none">
                {showGroup && (
                  <div className="text-mono px-3 pt-3 pb-1.5 text-[10px] tracking-[0.25em] text-muted uppercase" aria-hidden="true">
                    {command.group}
                  </div>
                )}
                <div
                  id={`${listId}-${command.id}`}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setActive(index)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => runCommand(command)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] ${
                    selected ? "bg-accent-dim text-paper" : "text-muted"
                  }`}
                >
                  <span className={selected ? "text-accent" : "text-muted"}>{command.icon}</span>
                  {command.label}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="text-mono flex gap-5 border-t border-line px-5 py-3 text-[11px] text-muted">
          <span>
            <kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> move
          </span>
          <span>
            <kbd className="kbd">Enter</kbd> open
          </span>
        </div>
      </div>
    </div>
  );
}
