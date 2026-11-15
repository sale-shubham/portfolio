"use client";

import { useSyncExternalStore } from "react";

function mediaStore(query: string, serverValue: boolean) {
  return {
    subscribe(callback: () => void) {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    get: () => window.matchMedia(query).matches,
    server: () => serverValue,
  };
}

const reducedMotion = mediaStore("(prefers-reduced-motion: reduce)", false);

export function useReducedMotion() {
  return useSyncExternalStore(reducedMotion.subscribe, reducedMotion.get, reducedMotion.server);
}

const wideLayout = mediaStore("(min-width: 1024px) and (min-height: 600px)", true);

export function useWideLayout() {
  return useSyncExternalStore(wideLayout.subscribe, wideLayout.get, wideLayout.server);
}

const noop = () => () => {};

/** "⌘" on Apple platforms, "Ctrl" elsewhere. Server renders "Ctrl". */
export function useModKey() {
  return useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );
}
