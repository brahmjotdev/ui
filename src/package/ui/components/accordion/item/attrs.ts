// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const accordionItemAttrStates = [] as const;

function accordionItemAttrs() {
  return applyAttrs(
    "accordion",
    accordionItemAttrStates,
    {},
    {
      part: "item",
    },
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { accordionItemAttrs };
