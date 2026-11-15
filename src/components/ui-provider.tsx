"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { projects } from "@/data/profile";
import { CommandPalette } from "./command-palette";
import { ProjectDialog } from "./project-dialog";
import { Terminal } from "./terminal";

type Overlay = { kind: "none" } | { kind: "palette" } | { kind: "terminal" } | { kind: "project"; slug: string };

type UIContextValue = {
  openPalette: () => void;
  openTerminal: () => void;
  openProject: (slug: string) => void;
  close: () => void;
  notify: (message: string) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<Overlay>({ kind: "none" });
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openPalette = useCallback(() => setOverlay({ kind: "palette" }), []);
  const openTerminal = useCallback(() => setOverlay({ kind: "terminal" }), []);
  const openProject = useCallback((slug: string) => setOverlay({ kind: "project", slug }), []);
  const close = useCallback(() => setOverlay({ kind: "none" }), []);
  const notify = useCallback((message: string) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOverlay((current) => (current.kind === "palette" ? { kind: "none" } : { kind: "palette" }));
      } else if (event.key === "`") {
        event.preventDefault();
        setOverlay((current) => (current.kind === "terminal" ? { kind: "none" } : { kind: "terminal" }));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll while an overlay is open.
  const open = overlay.kind !== "none";
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  const value = useMemo(
    () => ({ openPalette, openTerminal, openProject, close, notify }),
    [openPalette, openTerminal, openProject, close, notify],
  );

  const project = overlay.kind === "project" ? projects.find((p) => p.slug === overlay.slug) : undefined;

  return (
    <UIContext.Provider value={value}>
      {children}
      {overlay.kind === "palette" && (
        <CommandPalette onClose={close} onOpenTerminal={openTerminal} onOpenProject={openProject} onNotify={notify} />
      )}
      {overlay.kind === "terminal" && <Terminal onClose={close} onOpenProject={openProject} />}
      {project && <ProjectDialog project={project} onClose={close} />}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[310] flex justify-center px-4">
        {toast && (
          <div className="toast-enter text-mono rounded-full bg-paper px-5 py-2.5 text-[12px] tracking-wide text-ink">{toast}</div>
        )}
      </div>
    </UIContext.Provider>
  );
}
