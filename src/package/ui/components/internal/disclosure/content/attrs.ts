// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { presenceAttrs, type PresenceStates } from "../../../../utils";

// ------------------------------------------------
// ATTRS
// ------------------------------------------------

export function disclosureContentAttrs(presenceStates: PresenceStates) {
  const attrs = presenceAttrs("disclosure", presenceStates) as Record<
    string,
    true | string
  >;
  delete attrs["data-slot"];
  delete attrs["data-disclosure"];
  return attrs;
}
