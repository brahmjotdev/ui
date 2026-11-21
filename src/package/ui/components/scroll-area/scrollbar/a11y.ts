// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { ScrollAreaOrientation } from "../context";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface ScrollAreaScrollbarA11yParams {
  orientation: ScrollAreaOrientation;
  contentId: string;
  valueNow: number;
}

// ------------------------------------------------
// A11Y
// ------------------------------------------------

function scrollAreaScrollbarA11y({
  orientation,
  contentId,
  valueNow,
}: ScrollAreaScrollbarA11yParams) {
  return {
    role: "scrollbar" as const,
    "aria-controls": contentId,
    "aria-orientation": orientation,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Math.round(valueNow * 100),
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { scrollAreaScrollbarA11y };
