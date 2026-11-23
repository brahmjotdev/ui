// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type {
  ScrollAreaDir,
  ScrollAreaOrientation,
  ScrollAreaType,
  ScrollMetrics,
} from "./types";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface ScrollbarAxes {
  vertical: boolean;
  horizontal: boolean;
}

// ------------------------------------------------
// SCROLL COMMANDS
// ------------------------------------------------

function addScroll(element: HTMLElement, axis: "top" | "left", delta: number) {
  if (axis === "top") {
    element.scrollTop += delta;
    return;
  }
  element.scrollLeft += delta;
}

function scrollByAxis(
  element: HTMLElement,
  axis: "top" | "left",
  delta: number,
) {
  if (typeof element.scrollBy !== "function") {
    addScroll(element, axis, delta);
    return;
  }

  if (axis === "top") {
    element.scrollBy({ top: delta });
    return;
  }
  element.scrollBy({ left: delta });
}

function scrollToRatioOn(
  element: HTMLElement,
  orientation: ScrollAreaOrientation,
  ratio: number,
  dir: ScrollAreaDir,
) {
  const clamped = Math.min(1, Math.max(0, ratio));

  if (orientation === "vertical") {
    element.scrollTop = clamped * (element.scrollHeight - element.clientHeight);
    return;
  }

  const next = clamped * (element.scrollWidth - element.clientWidth);
  element.scrollLeft = dir === "rtl" ? -next : next;
}

function pageScrollOn(
  element: HTMLElement,
  orientation: ScrollAreaOrientation,
  direction: 1 | -1,
  dir: ScrollAreaDir,
) {
  if (orientation === "vertical") {
    scrollByAxis(element, "top", direction * element.clientHeight);
    return;
  }

  const delta = direction * element.clientWidth;
  const signed = dir === "rtl" ? -delta : delta;
  scrollByAxis(element, "left", signed);
}

// ------------------------------------------------
// VISIBILITY
// ------------------------------------------------

function pointerActive(
  scrolling: boolean,
  interacting: boolean,
  scrollbarHovering: boolean,
): boolean {
  return scrolling || interacting || scrollbarHovering;
}

function scrollbarShown(
  type: ScrollAreaType,
  hovering: boolean,
  active: boolean,
): boolean {
  if (type === "always") return true;
  if (type === "hover") return hovering || active;
  return active;
}

function axisOverflow(
  metrics: ScrollMetrics,
  orientation: ScrollAreaOrientation,
): boolean {
  if (orientation === "vertical") return metrics.overflowY;
  return metrics.overflowX;
}

function cornerShown(
  axes: ScrollbarAxes,
  metrics: ScrollMetrics,
  shown: boolean,
): boolean {
  return (
    axes.vertical &&
    axes.horizontal &&
    metrics.overflowX &&
    metrics.overflowY &&
    shown
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export {
  axisOverflow,
  cornerShown,
  pageScrollOn,
  pointerActive,
  scrollToRatioOn,
  scrollbarShown,
};
export type { ScrollbarAxes };
