// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { presenceAttrs, type PresenceStates } from "../../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

export function disclosureContentAttrs(presenceStates: PresenceStates) {
  return presenceAttrs("disclosure", presenceStates, undefined, {
    statesOnly: true,
  });
}
