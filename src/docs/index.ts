// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { Docs } from "./index.parts";
export {
  baseAttrs,
  baseProps,
  presenceAttrs,
  disabledAttr,
  loadingAttr,
  openAttr,
} from "./base";
export type { BaseAttrsOptions, BasePropsOptions } from "./base";
export { composeAPI } from "./api/compose";
export type { ComposeAPIPatch } from "./api/compose";
export type {
  DocsAPI,
  DocsAPIProp,
  DocsAPIAttr,
  DocsAPIA11y,
  DocsAPICssVar,
} from "./types";
