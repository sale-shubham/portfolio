"use client";

import { useRef } from "react";
import { projects, type Project } from "@/data/profile";
import { FlowDiagram } from "./flow-diagram";
import { CloseIcon } from "./icons";
import { useDialogFocus } from "./use-dialog-focus";

export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialogFocus(panelRef, closeRef, onClose);
  const index = projects.findIndex((p) => p.slug === project.slug);

  return (
    <div className="fixed inset-0 z-[300] flex items-stretch justify-center md:items-center md:p-8" role="presentation">
      <div className="overlay-backdrop absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="overlay-enter relative flex max-h-full w-full max-w-[920px] flex-col overflow-hidden border-line bg-surface md:max-h-[90vh] md:rounded-2xl md:border"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 md:px-10">
          <p className="text-mono text-[10px] tracking-[0.3em] text-muted uppercase">
            Case study {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="text-mono inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[10px] tracking-[0.2em] text-paper uppercase transition-colors hover:border-accent hover:text-accent"
          >
            Close <CloseIcon width={14} height={14} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pt-8 pb-12 md:px-10 md:pt-10">
          <p className="text-mono text-[10px] tracking-widest text-accent uppercase">{project.client}</p>
          <h2 id="project-dialog-title" className="text-display mt-3 text-4xl leading-[1.05] text-paper md:text-6xl">
            {project.name}
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">{project.summary}</p>

          <figure className="flow-host flow-live mt-10 rounded-xl border border-line bg-ink/60 p-5 md:p-8">
            <FlowDiagram id={`dialog-${project.slug}`} flow={project.flow} label={project.flowLabel} />
            <figcaption className="text-mono mt-4 text-[10px] tracking-[0.2em] text-muted uppercase">{project.flowLabel}</figcaption>
          </figure>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <h3 className="text-mono text-[10px] tracking-[0.3em] text-muted uppercase">What I built</h3>
              <ul className="dash-list mt-5">
                {project.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-mono text-[10px] tracking-[0.3em] text-muted uppercase">Stack</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="pill">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 border-t border-line pt-6 text-sm text-muted">
            Client project. The code and screens are private, so the diagram above shows how the pieces fit together.
          </p>
        </div>
      </div>
    </div>
  );
}
