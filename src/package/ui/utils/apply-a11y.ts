// ------------------------------------------------
// TYPES
// ------------------------------------------------

type A11yAttrs = Record<string, string | boolean | number | undefined>;
type A11ySpec = Record<string, A11yAttrs>;
type A11yState = Record<string, boolean | undefined>;

// ------------------------------------------------
// UTIL: APPLY A11Y
// ------------------------------------------------

export function applyA11y(spec: A11ySpec, state: A11yState): A11yAttrs {
  const result: A11yAttrs = {};

  for (const key in spec) {
    if (!state[key]) continue;

    const attrs = spec[key];
    for (const attr in attrs) {
      result[attr] = attrs[attr];
    }
  }

  return result;
}
