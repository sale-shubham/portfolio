"use client";

import { useEffect } from "react";

/**
 * Fades in elements marked with data-reveal as they scroll into view.
 * Content is visible until this runs, so the page reads fine without JavaScript.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    root.setAttribute("data-reveal-ready", "");
    return () => {
      observer.disconnect();
      root.removeAttribute("data-reveal-ready");
    };
  }, []);
  return null;
}
