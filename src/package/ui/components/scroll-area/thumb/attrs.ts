// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const scrollAreaThumbAttrStates = [] as const;

function scrollAreaThumbAttrs() {
  return applyAttrs("scroll-area", scrollAreaThumbAttrStates, {}, {
    part: "thumb",
  });
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { scrollAreaThumbAttrs };
