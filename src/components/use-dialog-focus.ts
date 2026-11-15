"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Focuses `initial` when a dialog mounts, keeps Tab inside `container`,
 * closes on Escape, and hands focus back to whatever had it before the dialog opened.
 * Handlers inside the dialog can claim a key first by calling preventDefault().
 */
export function useDialogFocus(
  container: RefObject<HTMLElement | null>,
  initial: RefObject<HTMLElement | null>,
  onEscape: () => void,
) {
  const escapeRef = useRef(onEscape);
  useEffect(() => {
    escapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    initial.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (event.key === "Escape") {
        event.preventDefault();
        escapeRef.current();
        return;
      }
      if (event.key !== "Tab" || !container.current) return;
      const focusable = container.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!container.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [container, initial]);
}
