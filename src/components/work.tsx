"use client";

import { useEffect, useRef } from "react";
import { profile, projects, type Project } from "@/data/profile";
import { useIsDesktop, useReducedMotion } from "@/lib/hooks";
import { FlowSvg } from "./flow-diagram";
import { useUI } from "./ui-provider";

function CardText({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <>
      <p className="text-mono text-[10px] tracking-widest text-accent uppercase">{project.client}</p>
      <h3 className="text-display mt-2 text-2xl leading-tight break-words text-paper transition-colors group-hover:text-accent md:text-4xl">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${project.name}, read case study`}
          className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {project.name}
        </button>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
    </>
  );
}

function WideCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <article className="work-card flow-host group relative shrink-0">
      <div className="card-frame relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-500 group-hover:border-accent/40">
        <div className="card-grid absolute inset-0 flex flex-col p-6 md:p-8">
          <div className="flex items-center justify-between">
            <span className="text-mono text-[10px] tracking-[0.3em] text-muted uppercase">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="text-mono text-[10px] tracking-[0.25em] text-muted uppercase transition-colors group-hover:text-accent">
              Read case study
            </span>
          </div>
          <div className="flex flex-1 items-center pb-[30%]">
            <FlowSvg flow={project.flow} dir="h" id={`card-${project.slug}`} label={project.flowLabel} className="w-full" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
          <CardText project={project} onOpen={onOpen} />
        </div>
      </div>
    </article>
  );
}

function NarrowCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="flow-host group relative overflow-hidden rounded-lg border border-line bg-surface">
      <div className="card-grid px-5 py-7">
        <FlowSvg flow={project.flow} dir="v" id={`mcard-${project.slug}`} label={project.flowLabel} className="mx-auto w-full max-w-[340px]" />
      </div>
      <div className="border-t border-line p-6">
        <CardText project={project} onOpen={onOpen} />
      </div>
    </article>
  );
}

function EndCard() {
  return (
    <div className="work-card-end flex shrink-0 flex-col justify-between rounded-lg border border-dashed border-line p-8">
      <p className="text-mono text-[10px] tracking-[0.3em] text-muted uppercase">More detail</p>
      <div>
        <p className="text-display text-3xl leading-tight text-paper">The full story is in my resume.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-accent">
            Resume
          </a>
          <a href="#contact" className="btn-outline">
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * On desktop the section pins to the viewport and vertical scrolling moves the cards sideways.
 * With reduced motion, or on phones, the cards are a normal list (or a native horizontal scroller).
 */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const { openProject } = useUI();
  const pinned = desktop && !reduced;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!pinned || !section || !track) return;
    let frame = 0;

    function update() {
      const distance = distanceRef.current;
      const top = section!.getBoundingClientRect().top;
      const progress = distance ? Math.min(Math.max(-top / distance, 0), 1) : 0;
      track!.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    }
    function measure() {
      distanceRef.current = Math.max(0, track!.offsetWidth - window.innerWidth);
      section!.style.height = `${window.innerHeight + distanceRef.current}px`;
      update();
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      section.style.height = "";
      track.style.transform = "";
    };
  }, [pinned]);

  // Keyboard users: when focus lands on an off-screen card, scroll the page to the point where it is in view.
  function onTrackFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (!pinned || !sectionRef.current || !trackRef.current) return;
    if (stickyRef.current) stickyRef.current.scrollLeft = 0;
    const card = (event.target as HTMLElement).closest<HTMLElement>(".work-card, .work-card-end");
    if (!card) return;
    const distance = distanceRef.current;
    const padding = parseFloat(getComputedStyle(trackRef.current).paddingLeft) || 0;
    const progress = distance ? Math.min(Math.max((card.offsetLeft - padding) / distance, 0), 1) : 0;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionTop + progress * distance, behavior: "auto" });
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby="work-title"
      data-pinned={pinned ? "" : undefined}
      className="work relative border-t border-line"
    >
      <div ref={stickyRef} className="work-sticky flex flex-col">
        <div className="px-6 pt-24 md:px-12 md:pt-[max(6rem,13vh)] lg:px-20">
          <div className="mx-auto mb-8 flex max-w-site min-w-0 flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end">
            <div data-reveal>
              <p className="label">02 - Selected work</p>
              <h2 id="work-title" className="text-display mt-4 text-4xl break-words text-paper md:text-6xl">
                Case studies
              </h2>
            </div>
            <p className="text-mono max-w-xs text-[11px] leading-relaxed tracking-wide text-muted md:text-right" data-reveal>
              Client systems with private code. Each card maps how the system works. Open one for the full story.
            </p>
          </div>
        </div>
        <div className="work-scroller hidden md:block">
          <div
            ref={trackRef}
            onFocus={onTrackFocus}
            className="flex w-max gap-8 px-12 pb-24 will-change-transform lg:gap-10 lg:px-20"
          >
            {projects.map((project, index) => (
              <WideCard key={project.slug} project={project} index={index} onOpen={() => openProject(project.slug)} />
            ))}
            <EndCard />
          </div>
        </div>
      </div>

      <div className="flex max-w-full flex-col gap-6 px-6 pb-24 md:hidden">
        {projects.map((project) => (
          <NarrowCard key={project.slug} project={project} onOpen={() => openProject(project.slug)} />
        ))}
      </div>
    </section>
  );
}
