// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { ReactNode } from "react";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DocsAPIProp {
  name: string;
  type: string;
  defaultValue?: string | boolean | number;
  required?: boolean;
  detail?: ReactNode;
}

interface DocsAPIAttr {
  name: string;
  description?: string;
  detail?: ReactNode;
  children?: DocsAPIAttr[];
}

interface DocsAPIA11y {
  name: string;
  description?: string;
  detail?: ReactNode;
}

interface DocsAPICssVar {
  name: string;
  description?: string;
  detail?: ReactNode;
}

interface DocsAPI {
  name: string;
  tag: string;
  props: {
    styled?: DocsAPIProp[];
    headless?: DocsAPIProp[];
  };
  attrs?: DocsAPIAttr[];
  a11y?: DocsAPIA11y[];
  cssVars?: DocsAPICssVar[];
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export type {
  DocsAPIProp,
  DocsAPIAttr,
  DocsAPIA11y,
  DocsAPICssVar,
  DocsAPI,
};
