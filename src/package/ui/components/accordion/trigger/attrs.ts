// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const accordionTriggerAttrStates = [] as const;

function accordionTriggerAttrs() {
  return applyAttrs(
    "accordion",
    accordionTriggerAttrStates,
    {},
    {
      part: "trigger",
    },
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { accordionTriggerAttrs };
