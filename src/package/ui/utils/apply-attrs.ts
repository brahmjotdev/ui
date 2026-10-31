// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { dataAttrs } from "./data-attrs";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type AttrStateValues = Record<string, boolean | undefined>;

// ------------------------------------------------
// UTIL: APPLY ATTRS
// ------------------------------------------------

export function applyAttrs(
  identity: string,
  stateKeys: readonly string[],
  values: AttrStateValues,
) {
  const states: AttrStateValues = {};

  for (const key of stateKeys) {
    states[key] = values[key];
  }

  return dataAttrs(identity, states);
}
