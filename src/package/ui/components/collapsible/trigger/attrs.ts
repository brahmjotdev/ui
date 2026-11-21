// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const collapsibleTriggerAttrStates = [] as const;

function collapsibleTriggerAttrs() {
  return applyAttrs("collapsible", collapsibleTriggerAttrStates, {}, {
    part: "trigger",
  });
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { collapsibleTriggerAttrs };
