// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const scrollAreaCornerAttrStates = [] as const;

function scrollAreaCornerAttrs({ visible }: { visible: boolean }) {
  return {
    ...applyAttrs("scroll-area", scrollAreaCornerAttrStates, {}, {
      part: "corner",
    }),
    "data-state": visible ? "visible" : "hidden",
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { scrollAreaCornerAttrs };
