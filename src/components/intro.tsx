"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

export const INTRO_KEY = "intro-seen";

/**
 * Full-screen name card shown once per browser session. The inline script in
 * layout.tsx marks <html data-intro="done"> before paint for repeat visits,
 * and CSS hides this overlay in that case.
 */
export function Intro({ photo }: { photo: string | null }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "done") return;

    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLeaving(true);
      exitTimer = setTimeout(() => {
        root.dataset.intro = "done";
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {
          // Without storage the intro simply shows again next visit.
        }
        setGone(true);
      }, 500);
    };
    finishRef.current = finish;

    const autoTimer = setTimeout(finish, 2400);
    // Any key ends the intro without swallowing the key itself (Tab still reaches the skip link).
    window.addEventListener("keydown", finish, { once: true });
    return () => {
      clearTimeout(autoTimer);
      clearTimeout(exitTimer);
      window.removeEventListener("keydown", finish);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`intro fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink px-6 transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className={`flex flex-col items-center transition-all duration-700 ${leaving ? "scale-95 opacity-0" : "intro-in"}`}>
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-accent/40 bg-surface ring-4 ring-accent/10 md:h-36 md:w-36">
          {photo ? (
            <Image src={photo} alt="" fill sizes="144px" className="object-cover" priority />
          ) : (
            <span className="text-display text-5xl text-paper md:text-6xl">{profile.initials}</span>
          )}
        </div>
        <p className="text-mono mb-4 text-center text-[10px] tracking-[0.4em] text-muted uppercase">Portfolio</p>
        <p className="text-display text-center text-4xl text-paper md:text-6xl lg:text-7xl">{profile.name}</p>
        <p className="text-mono mt-3 text-center text-xs tracking-widest text-muted uppercase">{profile.role}</p>
        <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-muted md:text-base">{profile.intro}</p>
      </div>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => finishRef.current()}
        className="text-mono absolute bottom-12 text-[10px] tracking-[0.3em] text-muted uppercase transition-colors hover:text-accent"
      >
        Skip
      </button>
    </div>
  );
}
