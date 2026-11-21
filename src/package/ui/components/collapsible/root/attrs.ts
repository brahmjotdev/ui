// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const collapsibleRootAttrStates = [] as const;

function collapsibleRootAttrs() {
  return applyAttrs("collapsible", collapsibleRootAttrStates, {}, {
    part: "root",
  });
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { collapsibleRootAttrs };
