"use client";

import { scrollToSection } from "@/lib/actions";

export type Intent = "job" | "project";

export const SELECT_INTENT_EVENT = "select-intent";

/** Switches the contact form to the given intent and scrolls to it. */
export function selectIntent(intent: Intent) {
  window.dispatchEvent(new CustomEvent(SELECT_INTENT_EVENT, { detail: intent }));
  scrollToSection("contact");
}
