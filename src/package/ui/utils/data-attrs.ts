// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { toKebabCase } from "./to-kebab-case";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type BooleanStates = Record<string, boolean | undefined>;
type DataAttrsResult = Record<string, true | string>;

// ------------------------------------------------
// HELPER
// ------------------------------------------------

function applyStates(
  result: DataAttrsResult,
  states: BooleanStates | undefined,
) {
  if (!states) return;

  for (const key in states) {
    if (states[key]) {
      result[`data-${toKebabCase(key)}`] = true;
    }
  }
}

// ------------------------------------------------
// UTIL: DATA ATTRS
// ------------------------------------------------

export function dataAttrs(
  identity: string,
  states?: BooleanStates,
): DataAttrsResult {
  const result: DataAttrsResult = {};

  result["data-slot"] = toKebabCase(identity);
  result[`data-${toKebabCase(identity)}`] = true;
  applyStates(result, states);
  return result;
}
