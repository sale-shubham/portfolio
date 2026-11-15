"use client";

import { useEffect, useRef, useState } from "react";
import { profile, sections, type SectionId } from "@/data/profile";
import { useModKey } from "@/lib/hooks";
import { SearchIcon, TerminalIcon } from "./icons";
import { useUI } from "./ui-provider";

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((el) => observer.observe(el));

    function onScroll() {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
      else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActive(sections[sections.length - 1].id);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed top-0 right-0 left-0 z-[101] h-[2px]" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}

export function Nav() {
  const active = useActiveSection();
  const { openPalette, openTerminal } = useUI();
  const mod = useModKey();

  return (
    <>
      <ScrollProgress />
      <header className="site-nav fixed top-0 right-0 left-0 z-[100]">
        <div className="flex max-w-full min-w-0 items-center justify-between gap-3 px-4 py-5 sm:px-6 md:px-12 md:py-6 lg:px-20">
          <a href="#top" className="text-mono text-xs tracking-[0.2em] text-paper uppercase transition-colors hover:text-accent">
            {profile.name}
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
                className={`text-mono text-[10px] tracking-[0.25em] uppercase transition-colors hover:text-paper ${
                  active === s.id ? "text-paper" : "text-muted"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search the site"
              aria-keyshortcuts="Control+K Meta+K"
              className="nav-pill"
            >
              <SearchIcon width={13} height={13} />
              <span className="hidden lg:inline">{mod} K</span>
            </button>
            <button type="button" onClick={openTerminal} aria-label="Open terminal mode" className="nav-pill hidden sm:inline-flex">
              <TerminalIcon width={13} height={13} />
            </button>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="nav-pill">
              Resume
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
