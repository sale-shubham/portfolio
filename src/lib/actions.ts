"use client";

import { profile } from "@/data/profile";

const NAV_OFFSET = 72;

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = target.getBoundingClientRect().top + window.scrollY - (id === "top" ? 0 : NAV_OFFSET);
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  // Move keyboard focus with the scroll so screen reader and Tab users land in the section.
  target.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
}

export async function copyEmail(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(profile.email);
    return true;
  } catch {
    return false;
  }
}

export function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
