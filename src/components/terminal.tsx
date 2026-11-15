"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DEFAULT_WHATSAPP_TEXT, journey, profile, projects, sections, services, skills, whatsappLink } from "@/data/profile";
import { copyEmail, openExternal, scrollToSection } from "@/lib/actions";
import { useDialogFocus } from "./use-dialog-focus";

type Line = { id: number; node: ReactNode };

const PROMPT = "shubham@portfolio:~$";

const HELP: [string, string][] = [
  ["whoami", "Who I am, in one line"],
  ["about", "A short introduction"],
  ["services", "What I can build for you"],
  ["experience", "Where I work and what I do there"],
  ["projects", "List the systems I've built"],
  ["project <name>", "Details for one project, e.g. project cms"],
  ["open <name>", "Open a project's case study on the page"],
  ["skills", "Languages, frameworks, databases and tools"],
  ["education", "Degrees"],
  ["contact", "WhatsApp, email, LinkedIn and GitHub"],
  ["hire", "How to reach me about a role or a project"],
  ["whatsapp", "Open a WhatsApp chat with me"],
  ["resume", "Open my resume"],
  ["email", "Copy my email address"],
  ["goto <section>", "Close the terminal and jump to a section"],
  ["ls", "List everything you can read with cat"],
  ["clear", "Clear the screen (Ctrl+L)"],
  ["exit", "Return to the page (Esc)"],
];

const FILES: Record<string, string> = {
  "about.md": "about",
  "experience.md": "experience",
  "skills.md": "skills",
  "education.md": "education",
  "contact.md": "contact",
};

const COMMAND_NAMES = [
  "help", "whoami", "about", "services", "experience", "projects", "project", "open", "skills", "education",
  "contact", "hire", "whatsapp", "resume", "email", "github", "linkedin", "goto", "ls", "cat", "clear", "exit",
  "history", "date", "echo",
];

const work = journey.filter((j) => j.points);
const degrees = journey.filter((j) => !j.points);

const Heading = ({ children }: { children: ReactNode }) => <div className="term-heading">{children}</div>;
const Muted = ({ children }: { children: ReactNode }) => <span className="term-muted">{children}</span>;
const Cmd = ({ children }: { children: ReactNode }) => <span className="term-cmd">{children}</span>;

function welcome(): ReactNode {
  return (
    <div className="space-y-1">
      <div>
        <span className="term-heading">{profile.name}</span> <Muted>{profile.role.toLowerCase()}</Muted>
      </div>
      <div className="term-muted">
        Type <Cmd>help</Cmd> to see what you can ask. Press <Cmd>Esc</Cmd> or type <Cmd>exit</Cmd> to go back to the page.
      </div>
    </div>
  );
}

type Props = { onClose: () => void; onOpenProject: (slug: string) => void };

export function Terminal({ onClose, onOpenProject }: Props) {
  const counter = useRef(1);
  const [lines, setLines] = useState<Line[]>([{ id: 0, node: welcome() }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  useDialogFocus(panelRef, inputRef, onClose);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines]);

  function print(...nodes: ReactNode[]) {
    setLines((prev) => [...prev, ...nodes.map((node) => ({ id: counter.current++, node }))]);
  }

  function findProject(arg: string) {
    return projects.find((p) => p.slug === arg || (arg && p.name.toLowerCase().includes(arg)));
  }

  function run(raw: string, shown = raw) {
    const input = raw.trim();
    const echo = (
      <div>
        <span className="term-prompt">{PROMPT}</span> {shown.trim()}
      </div>
    );
    if (!input) return print(echo);

    const [name, ...args] = input.split(/\s+/);
    const command = name.toLowerCase();
    const arg = args.join(" ").toLowerCase();

    switch (command) {
      case "help":
        return print(
          echo,
          <div className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-6 gap-y-0.5">
            {HELP.map(([c, d]) => (
              <div key={c} className="contents">
                <Cmd>{c}</Cmd>
                <Muted>{d}</Muted>
              </div>
            ))}
          </div>,
        );
      case "whoami":
        return print(echo, <div>{profile.name}, {profile.role.toLowerCase()} in {profile.location}. {profile.status}</div>);
      case "about":
        return print(
          echo,
          <div className="space-y-2">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>,
        );
      case "experience":
      case "exp":
        return print(
          echo,
          <div className="space-y-3">
            {work.map((job) => (
              <div key={job.id}>
                <Heading>
                  {job.title}, {job.org}
                </Heading>
                <Muted>{job.period}</Muted>
                <p className="mt-1">{job.summary}</p>
                <ul className="mt-1">
                  {job.points?.map((p) => (
                    <li key={p}>- {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>,
        );
      case "projects":
        return print(
          echo,
          <div>
            <div className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-6 gap-y-0.5">
              {projects.map((p) => (
                <div key={p.slug} className="contents">
                  <Cmd>{p.slug}</Cmd>
                  <span>
                    {p.name} <Muted>({p.client})</Muted>
                  </span>
                </div>
              ))}
            </div>
            <div className="term-muted mt-2">
              Type <Cmd>project {projects[0].slug}</Cmd> for details, or <Cmd>open {projects[0].slug}</Cmd> to see the case study.
            </div>
          </div>,
        );
      case "project": {
        const project = findProject(arg);
        if (!project) {
          return print(
            echo,
            <div>
              {arg ? <>No project called “{arg}”. </> : <>Name a project. </>}
              Options: {projects.map((p) => p.slug).join(", ")}.
            </div>,
          );
        }
        return print(
          echo,
          <div className="space-y-1">
            <Heading>{project.name}</Heading>
            <Muted>{project.client}</Muted>
            <p>{project.summary}</p>
            <ul>
              {project.points.map((p) => (
                <li key={p}>- {p}</li>
              ))}
            </ul>
            <div>
              <Muted>Stack:</Muted> {project.stack.join(", ")}
            </div>
          </div>,
        );
      }
      case "open": {
        const project = findProject(arg);
        if (!project) return print(echo, <div>Name a project to open. Options: {projects.map((p) => p.slug).join(", ")}.</div>);
        return onOpenProject(project.slug);
      }
      case "skills":
        return print(
          echo,
          <div className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-6 gap-y-1">
            {skills.map((s) => (
              <div key={s.group} className="contents">
                <span className="term-heading">{s.group}</span>
                <span>{s.items.join(", ")}</span>
              </div>
            ))}
          </div>,
        );
      case "education":
        return print(
          echo,
          <div className="space-y-2">
            {degrees.map((e) => (
              <div key={e.id}>
                <Heading>{e.title}</Heading>
                <div>
                  {e.org} <Muted>({e.period}). {e.summary}</Muted>
                </div>
              </div>
            ))}
          </div>,
        );
      case "services":
        return print(
          echo,
          <div>
            <div className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-6 gap-y-0.5">
              {services.map((s) => (
                <div key={s.id} className="contents">
                  <Cmd>{s.id}</Cmd>
                  <span>{s.title}</span>
                </div>
              ))}
            </div>
            <div className="term-muted mt-2">
              Type <Cmd>goto contact</Cmd> to start a project.
            </div>
          </div>,
        );
      case "hire":
        return print(
          echo,
          <div className="space-y-3">
            <div>
              <Heading>Role enquiries</Heading>
              <div>
                Email <a className="term-link" href={`mailto:${profile.email}`}>{profile.email}</a> or message {profile.whatsappDisplay} on WhatsApp.
              </div>
              <div className="term-muted">
                Type <Cmd>resume</Cmd> to open my resume, or <Cmd>experience</Cmd> to read it here.
              </div>
            </div>
            <div>
              <Heading>Projects</Heading>
              <div className="term-muted">
                Type <Cmd>services</Cmd> to see what I build, then <Cmd>goto contact</Cmd> to fill in the enquiry form.
              </div>
            </div>
          </div>,
        );
      case "whatsapp":
        openExternal(whatsappLink(DEFAULT_WHATSAPP_TEXT));
        return print(echo, <div>Opening WhatsApp in a new tab.</div>);
      case "contact":
        return print(
          echo,
          <div className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-6 gap-y-0.5">
            <span className="term-heading">WhatsApp</span>
            <a className="term-link" href={whatsappLink(DEFAULT_WHATSAPP_TEXT)} target="_blank" rel="noreferrer">
              {profile.whatsappDisplay}
            </a>
            <span className="term-heading">Email</span>
            <a className="term-link" href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="term-heading">LinkedIn</span>
            <a className="term-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/{profile.linkedinHandle}
            </a>
            <span className="term-heading">GitHub</span>
            <a className="term-link" href={profile.github} target="_blank" rel="noreferrer">
              github.com/{profile.githubHandle}
            </a>
          </div>,
        );
      case "resume":
        openExternal(profile.resume);
        return print(echo, <div>Opening resume in a new tab.</div>);
      case "github":
        openExternal(profile.github);
        return print(echo, <div>Opening GitHub in a new tab.</div>);
      case "linkedin":
        openExternal(profile.linkedin);
        return print(echo, <div>Opening LinkedIn in a new tab.</div>);
      case "email":
        print(echo);
        copyEmail().then((ok) =>
          print(<div>{ok ? `Copied ${profile.email} to your clipboard.` : `Couldn't copy. The address is ${profile.email}.`}</div>),
        );
        return;
      case "goto":
      case "cd": {
        const id = arg.replace(/^#/, "");
        if (!sections.some((s) => s.id === id)) {
          return print(echo, <div>Unknown section “{arg || " "}”. Options: {sections.map((s) => s.id).join(", ")}.</div>);
        }
        onClose();
        setTimeout(() => scrollToSection(id), 0);
        return;
      }
      case "ls":
        return print(
          echo,
          <div className="flex flex-wrap gap-x-6">
            {Object.keys(FILES).map((f) => (
              <span key={f}>{f}</span>
            ))}
            <Cmd>projects/</Cmd>
            <span>resume.pdf</span>
          </div>,
        );
      case "cat": {
        if (arg === "resume.pdf") return run("resume", input);
        if (arg.startsWith("projects/")) return run(`project ${arg.slice(9).replace(/\.md$/, "")}`, input);
        const target = FILES[arg];
        if (!target) return print(echo, <div>cat: {arg || "missing file name"}: no such file. Type <Cmd>ls</Cmd> to see files.</div>);
        return run(target, input);
      }
      case "history":
        return print(echo, <div>{history.length ? history.map((h, i) => <div key={i}>{i + 1}  {h}</div>) : "No commands yet."}</div>);
      case "date":
        return print(echo, <div>{new Date().toString()}</div>);
      case "echo":
        return print(echo, <div>{args.join(" ")}</div>);
      case "sudo":
        return print(echo, <div>No root access needed here. Type <Cmd>contact</Cmd> to get in touch.</div>);
      case "clear":
        return setLines([]);
      case "exit":
      case "quit":
        return onClose();
      default:
        return print(echo, <div>Command not found: {command}. Type <Cmd>help</Cmd> for the list.</div>);
    }
  }

  function complete() {
    const parts = value.split(/\s+/);
    if (parts.length === 1) {
      const matches = COMMAND_NAMES.filter((c) => c.startsWith(parts[0].toLowerCase()));
      if (matches.length === 1) setValue(`${matches[0]} `);
      else if (matches.length > 1) print(<div className="term-muted">{matches.join("  ")}</div>);
      return;
    }
    const [cmd, partial] = [parts[0].toLowerCase(), parts.slice(1).join(" ").toLowerCase()];
    const options =
      cmd === "project" || cmd === "open"
        ? projects.map((p) => p.slug)
        : cmd === "goto" || cmd === "cd"
          ? sections.map((s) => s.id)
          : cmd === "cat"
            ? [...Object.keys(FILES), "resume.pdf", ...projects.map((p) => `projects/${p.slug}.md`)]
            : [];
    const matches = options.filter((o) => o.startsWith(partial));
    if (matches.length === 1) setValue(`${parts[0]} ${matches[0]}`);
    else if (matches.length > 1) print(<div className="term-muted">{matches.join("  ")}</div>);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const input = value;
      if (input.trim()) setHistory((h) => [...h, input.trim()]);
      setCursor(null);
      setValue("");
      run(input);
    } else if (event.key === "Tab") {
      event.preventDefault();
      complete();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (cursor === null) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-stretch justify-center sm:items-center sm:p-6" role="presentation">
      <div className="overlay-backdrop absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        className="term overlay-enter relative flex h-full w-full max-w-[900px] flex-col overflow-hidden sm:h-[min(640px,85vh)] sm:rounded-2xl"
      >
        <div className="term-bar flex items-center justify-between gap-4 px-5 py-3">
          <span className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span className="term-muted hidden text-[12px] sm:inline">{PROMPT.replace("$", "")}</span>
          <button type="button" onClick={onClose} className="term-close rounded-full px-3 py-1 text-[11px] tracking-[0.15em] uppercase">
            Back to page
          </button>
        </div>
        <div
          ref={logRef}
          className="flex-1 overflow-y-auto px-5 py-5 text-[14px] leading-relaxed sm:px-7"
          onClick={() => {
            if (!window.getSelection()?.toString()) inputRef.current?.focus();
          }}
        >
          <div role="log" aria-live="polite" className="space-y-3">
            {lines.map((line) => (
              <div key={line.id}>{line.node}</div>
            ))}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <label htmlFor="terminal-input" className="term-prompt shrink-0">
              {PROMPT}
              <span className="sr-only"> type a command</span>
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              className="term-input min-w-0 flex-1 bg-transparent focus:outline-none"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
