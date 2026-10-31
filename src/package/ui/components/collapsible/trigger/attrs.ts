// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const collapsibleTriggerAttrStates = [] as const;

function collapsibleTriggerAttrs() {
  return applyAttrs(
    "collapsibleTrigger",
    collapsibleTriggerAttrStates,
    {},
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { collapsibleTriggerAttrStates, collapsibleTriggerAttrs };
