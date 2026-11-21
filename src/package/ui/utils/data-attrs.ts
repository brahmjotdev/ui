// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { toKebabCase } from "./to-kebab-case";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type BooleanStates = Record<string, boolean | undefined>;
type DataAttrsResult = Record<string, true | string>;

interface DataAttrsOptions {
  part?: string;
  statesOnly?: boolean;
}

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
  options?: DataAttrsOptions,
): DataAttrsResult {
  const result: DataAttrsResult = {};
  const kebab = toKebabCase(identity);

  if (options?.statesOnly) {
    applyStates(result, states);
    return result;
  }

  if (options?.part !== undefined) {
    result[`data-${kebab}-part`] = options.part;
    if (options.part === "root") {
      result["data-slot"] = kebab;
    }
  } else {
    result["data-slot"] = kebab;
  }

  applyStates(result, states);
  return result;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export type { DataAttrsOptions };
