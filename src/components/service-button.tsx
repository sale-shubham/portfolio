"use client";

import { scrollToSection } from "@/lib/actions";

export const SELECT_SERVICE_EVENT = "select-service";

/** Preselects a service in the contact form and scrolls to it. */
export function selectService(id: string) {
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: id }));
  scrollToSection("contact");
}

export function ServiceButton({ id, title }: { id: string; title: string }) {
  return (
    <button
      type="button"
      onClick={() => selectService(id)}
      aria-label={`Discuss ${title}`}
      className="link-underline text-mono text-[11px] tracking-[0.2em] text-paper uppercase transition-colors hover:text-accent"
    >
      Discuss this
    </button>
  );
}
