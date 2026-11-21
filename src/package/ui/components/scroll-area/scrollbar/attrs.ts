// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import {
  applyAttrs,
  presenceAttrs,
  type PresenceStates,
} from "../../../utils";
import type { ScrollAreaOrientation } from "../context";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const scrollAreaScrollbarAttrStates = [] as const;

function scrollAreaScrollbarAttrs({
  orientation,
  presenceStates,
}: {
  orientation: ScrollAreaOrientation;
  presenceStates: PresenceStates;
}) {
  return {
    ...applyAttrs(
      "scroll-area",
      scrollAreaScrollbarAttrStates,
      {},
      { part: "scrollbar" },
    ),
    "data-orientation": orientation,
    ...presenceAttrs("scroll-area", presenceStates, undefined, {
      statesOnly: true,
    }),
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { scrollAreaScrollbarAttrs };
