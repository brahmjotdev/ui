// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const collapsibleRootAttrStates = [] as const;

function collapsibleRootAttrs() {
  return applyAttrs("collapsible", collapsibleRootAttrStates, {});
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { collapsibleRootAttrStates, collapsibleRootAttrs };
