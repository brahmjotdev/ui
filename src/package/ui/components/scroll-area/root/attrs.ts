// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";
import type {
  ScrollAreaActivityState,
  ScrollAreaType,
} from "../context";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const scrollAreaRootAttrStates = [
  "idle",
  "scrolling",
  "hovering",
  "interacting",
] as const;

function scrollAreaRootAttrs({
  type,
  idle,
  scrolling,
  hovering,
  interacting,
  activityState,
}: {
  type: ScrollAreaType;
  idle: boolean;
  scrolling: boolean;
  hovering: boolean;
  interacting: boolean;
  activityState: ScrollAreaActivityState;
}) {
  return {
    ...applyAttrs(
      "scroll-area",
      scrollAreaRootAttrStates,
      { idle, scrolling, hovering, interacting },
      { part: "root" },
    ),
    "data-type": type,
    "data-state": activityState,
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { scrollAreaRootAttrs };
