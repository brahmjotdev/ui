// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const accordionHeaderAttrStates = [] as const;

function accordionHeaderAttrs() {
  return applyAttrs(
    "accordion",
    accordionHeaderAttrStates,
    {},
    {
      part: "header",
    },
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { accordionHeaderAttrs };
