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

function horizontalRtl(orientation: ScrollAreaOrientation, dir: ScrollAreaDir) {
  return orientation === "horizontal" && dir === "rtl";
}

function thumbTranslatePercent(
  orientation: ScrollAreaOrientation,
  scrollRatio: number,
  thumbSize: number,
  dir: ScrollAreaDir,
) {
  if (thumbSize <= 0 || thumbSize >= 1) return 0;
  const travel = (1 / thumbSize - 1) * 100;
  const fromStart = horizontalRtl(orientation, dir)
    ? 1 - scrollRatio
    : scrollRatio;
  return fromStart * travel;
}

function dragScrollRatio(
  startRatio: number,
  deltaPx: number,
  movable: number,
  orientation: ScrollAreaOrientation,
  dir: ScrollAreaDir,
) {
  const delta = deltaPx / Math.max(1, movable);
  const towardEnd = horizontalRtl(orientation, dir) ? -delta : delta;
  return startRatio + towardEnd;
}

function pageDirectionAt(
  orientation: ScrollAreaOrientation,
  dir: ScrollAreaDir,
  offset: number,
  trackSize: number,
  scrollRatio: number,
  thumbSize: number,
): 1 | -1 | null {
  const thumbPx = thumbSize * trackSize;
  const movable = trackSize - thumbPx;
  const fromTrackStart = horizontalRtl(orientation, dir)
    ? (1 - scrollRatio) * movable
    : scrollRatio * movable;

  if (offset < fromTrackStart) {
    return horizontalRtl(orientation, dir) ? 1 : -1;
  }
  if (offset > fromTrackStart + thumbPx) {
    return horizontalRtl(orientation, dir) ? -1 : 1;
  }
  return null;
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
  dragScrollRatio,
  pageDirectionAt,
  pageScrollOn,
  pointerActive,
  scrollToRatioOn,
  scrollbarShown,
  thumbTranslatePercent,
};
export type { ScrollbarAxes };
