// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { applyAttrs } from "../../../utils";
import type { AccordionType } from "../context";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

const accordionRootAttrStates = ["disabled"] as const;

function accordionRootAttrs({
  type,
  disabled,
}: {
  type: AccordionType;
  disabled: boolean;
}) {
  return {
    ...applyAttrs(
      "accordion",
      accordionRootAttrStates,
      { disabled },
      { part: "root" },
    ),
    "data-type": type,
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { accordionRootAttrs };
