// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { JSX } from "react";

import type { DocsAPIProp } from "./types";

// ------------------------------------------------
// CATALOG
// ------------------------------------------------

const refProp: DocsAPIProp = {
  name: "ref",
  type: "React.Ref",
};

const renderProp: DocsAPIProp = {
  name: "render",
  type: "React.ReactElement | ((props, state) => React.ReactElement)",
};

const disabledProp: DocsAPIProp = {
  name: "disabled",
  type: "boolean",
};

const classNameProp: DocsAPIProp = {
  name: "className",
  type: "string",
};

const childrenProp: DocsAPIProp = {
  name: "children",
  type: "React.ReactNode",
};

type SharedKey = "ref" | "render" | "disabled" | "className" | "children";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function restProps(tag: keyof JSX.IntrinsicElements): DocsAPIProp {
  return {
    name: "...props",
    type: `React.ComponentProps<"${tag}">`,
  };
}

function withOverride(
  prop: DocsAPIProp,
  override?: Partial<DocsAPIProp>,
): DocsAPIProp {
  return override ? { ...prop, ...override, name: prop.name } : prop;
}

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface BasePropsOptions {
  tag: keyof JSX.IntrinsicElements;

  render?: boolean;
  disabled?: boolean;
  className?: boolean;
  children?: boolean;
  props?: DocsAPIProp[];
  overrides?: Partial<Record<SharedKey, Partial<DocsAPIProp>>>;
}

// ------------------------------------------------
// BASE PROPS
// ------------------------------------------------

function baseProps({
  tag,
  render = false,
  disabled = false,
  className = false,
  children = false,
  props = [],
  overrides,
}: BasePropsOptions): DocsAPIProp[] {
  const rows: DocsAPIProp[] = [withOverride(refProp, overrides?.ref)];

  if (render) {
    rows.push(withOverride(renderProp, overrides?.render));
  }

  rows.push(...props);

  if (disabled) {
    rows.push(withOverride(disabledProp, overrides?.disabled));
  }
  if (className) {
    rows.push(withOverride(classNameProp, overrides?.className));
  }
  if (children) {
    rows.push(withOverride(childrenProp, overrides?.children));
  }

  rows.push(restProps(tag));

  return rows;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { baseProps };
export type { BasePropsOptions };
