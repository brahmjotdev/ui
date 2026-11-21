// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const scrollAreaContentAttrStates = [
  "overflowX",
  "overflowY",
  "overflowTop",
  "overflowBottom",
  "overflowLeft",
  "overflowRight",
] as const;

function scrollAreaContentAttrs({
  overflowX,
  overflowY,
  overflowTop,
  overflowBottom,
  overflowLeft,
  overflowRight,
}: {
  overflowX: boolean;
  overflowY: boolean;
  overflowTop: boolean;
  overflowBottom: boolean;
  overflowLeft: boolean;
  overflowRight: boolean;
}) {
  return applyAttrs(
    "scroll-area",
    scrollAreaContentAttrStates,
    {
      overflowX,
      overflowY,
      overflowTop,
      overflowBottom,
      overflowLeft,
      overflowRight,
    },
    { part: "content" },
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { scrollAreaContentAttrs };
