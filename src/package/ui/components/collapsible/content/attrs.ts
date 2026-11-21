// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const collapsibleContentAttrStates = [] as const;

function collapsibleContentAttrs() {
  return applyAttrs("collapsible", collapsibleContentAttrStates, {}, {
    part: "content",
  });
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { collapsibleContentAttrs };
