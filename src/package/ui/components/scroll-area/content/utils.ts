// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { ScrollAreaDir } from "../context/types";

// ------------------------------------------------
// CONSTANTS
// ------------------------------------------------

const STYLE_ID = "cerevia-scroll-area-hide-native";
const EDGE_EPSILON = 1;

// ------------------------------------------------
// UTILS
// ------------------------------------------------

function ensureNativeScrollbarHiddenStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = [
    '[data-scroll-area-part="content"]{scrollbar-width:none;-ms-overflow-style:none;}',
    '[data-scroll-area-part="content"]::-webkit-scrollbar{display:none;}',
  ].join("");
  document.head.appendChild(style);
}

function readScrollMetrics(
  element: HTMLElement,
  dir: ScrollAreaDir = "ltr",
) {
  const {
    scrollTop,
    scrollLeft,
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
  } = element;

  const maxY = Math.max(0, scrollHeight - clientHeight);
  const maxX = Math.max(0, scrollWidth - clientWidth);
  const overflowY = maxY > 0;
  const overflowX = maxX > 0;
  const fromStartX = Math.abs(scrollLeft);
  const overflowStartX = fromStartX >= EDGE_EPSILON;
  const overflowEndX = maxX > 0 && fromStartX <= maxX - EDGE_EPSILON;

  return {
    overflowX,
    overflowY,
    overflowTop: scrollTop >= EDGE_EPSILON,
    overflowBottom: maxY > 0 && scrollTop <= maxY - EDGE_EPSILON,
    overflowLeft: dir === "rtl" ? overflowEndX : overflowStartX,
    overflowRight: dir === "rtl" ? overflowStartX : overflowEndX,
    scrollRatioY: maxY === 0 ? 0 : scrollTop / maxY,
    scrollRatioX: maxX === 0 ? 0 : fromStartX / maxX,
    thumbSizeY: scrollHeight === 0 ? 1 : Math.min(1, clientHeight / scrollHeight),
    thumbSizeX: scrollWidth === 0 ? 1 : Math.min(1, clientWidth / scrollWidth),
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { ensureNativeScrollbarHiddenStyles, readScrollMetrics };
