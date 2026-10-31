// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type {
  DocsAPI,
  DocsAPIAttr,
  DocsAPIA11y,
  DocsAPICssVar,
  DocsAPIProp,
} from "./types";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface ComposeAPIPatch {
  name: string;
  tag?: string;
  props?: {
    styled?: DocsAPIProp[];
    headless?: DocsAPIProp[];
  };
  attrs?: DocsAPIAttr[];
  a11y?: DocsAPIA11y[];
  cssVars?: DocsAPICssVar[];
}

// ------------------------------------------------
// COMPOSE API
// ------------------------------------------------

function composeAPI(base: DocsAPI, patch: ComposeAPIPatch): DocsAPI {
  return {
    name: patch.name,
    tag: patch.tag ?? base.tag,
    props: {
      styled: [...(patch.props?.styled ?? []), ...(base.props.styled ?? [])],
      headless: [
        ...(patch.props?.headless ?? []),
        ...(base.props.headless ?? []),
      ],
    },
    attrs: patch.attrs ?? base.attrs,
    a11y: patch.a11y ?? base.a11y,
    cssVars: patch.cssVars ?? base.cssVars,
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { composeAPI };
export type { ComposeAPIPatch };
