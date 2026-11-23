// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type {
  DocsAPI,
  DocsAPIAttr,
  DocsAPIA11y,
  DocsAPICssVar,
  DocsAPIProp,
} from "../types";

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
// HELPERS
// ------------------------------------------------

function prependProps(
  extra: DocsAPIProp[] | undefined,
  base: DocsAPIProp[] | undefined,
): DocsAPIProp[] {
  return [...(extra ?? []), ...(base ?? [])];
}

function mergedProps(base: DocsAPI, patch: ComposeAPIPatch): DocsAPI["props"] {
  return {
    styled: prependProps(patch.props?.styled, base.props.styled),
    headless: prependProps(patch.props?.headless, base.props.headless),
  };
}

// ------------------------------------------------
// COMPOSE API
// ------------------------------------------------

function composeAPI(base: DocsAPI, patch: ComposeAPIPatch): DocsAPI {
  return {
    name: patch.name,
    tag: patch.tag ?? base.tag,
    props: mergedProps(base, patch),
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
