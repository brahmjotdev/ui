// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useSyncExternalStore } from "react";

// ------------------------------------------------
// MEDIA
// ------------------------------------------------

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

// ------------------------------------------------
// HOOK
// ------------------------------------------------

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
