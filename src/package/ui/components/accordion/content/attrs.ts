// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const accordionContentAttrStates = [] as const;

function accordionContentAttrs() {
  return applyAttrs(
    "accordion",
    accordionContentAttrStates,
    {},
    {
      part: "content",
    },
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { accordionContentAttrs };
