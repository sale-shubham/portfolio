"use client";

import { profile } from "@/data/profile";
import { selectIntent } from "./contact-intent";

const primary = "nav-pill border-accent/50 hover:border-accent";
const secondary = "link-underline text-mono text-[11px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent";

/** The two hero paths. Both cards use the same link styles so neither dominates. */
export function HeroPaths() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-line bg-surface/40 p-5 transition-colors hover:border-accent/40 sm:p-6">
        <p className="label">For hiring teams</p>
        <p className="text-display mt-3 text-2xl text-paper">Hiring for your team?</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a href={profile.resume} target="_blank" rel="noreferrer" className={primary}>
            View resume
          </a>
          <a href="#experience" className={secondary}>
            See experience
          </a>
        </div>
      </div>
      <div className="rounded-lg border border-line bg-surface/40 p-5 transition-colors hover:border-accent/40 sm:p-6">
        <p className="label">For businesses</p>
        <p className="text-display mt-3 text-2xl text-paper">Need something built?</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={() => selectIntent("project")} className={primary}>
            Start a project
          </button>
          <a href="#services" className={secondary}>
            See services
          </a>
        </div>
      </div>
    </div>
  );
}
