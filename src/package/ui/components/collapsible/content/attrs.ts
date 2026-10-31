// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const collapsibleContentAttrStates = [] as const;

function collapsibleContentAttrs() {
  return applyAttrs(
    "collapsibleContent",
    collapsibleContentAttrStates,
    {},
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { collapsibleContentAttrStates, collapsibleContentAttrs };
