// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { JSX } from "react";

import type { DocsAPIProp } from "../types";

// ------------------------------------------------
// CATALOG
// ------------------------------------------------

const refProp: DocsAPIProp = {
  name: "ref",
  type: "React.Ref<HTMLElement>",
  description:
    "A reference to the underlying HTML element. This is useful for accessing the element's DOM properties directly. For example, use it to focus the element or to get the element's dimensions or integrate third-party libraries.",
};

const renderProp: DocsAPIProp = {
  name: "render",
  type: "React.ReactElement | ((props, state) => React.ReactElement)",
  description: (
    <>
      <p>
        Overrides the default host element. Pass a React element to merge this
        part&apos;s props onto it, or a function that returns the element to
        render.
      </p>
    </>
  ),
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

function overrideFor(
  overrides: BasePropsOptions["overrides"],
  key: SharedKey,
): Partial<DocsAPIProp> | undefined {
  return overrides?.[key];
}

function pushProp(
  rows: DocsAPIProp[],
  include: boolean,
  prop: DocsAPIProp,
  override?: Partial<DocsAPIProp>,
) {
  if (include) rows.push(withOverride(prop, override));
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
  const rows: DocsAPIProp[] = [
    withOverride(refProp, overrideFor(overrides, "ref")),
  ];

  pushProp(rows, render, renderProp, overrideFor(overrides, "render"));
  rows.push(...props);
  pushProp(rows, disabled, disabledProp, overrideFor(overrides, "disabled"));
  pushProp(rows, className, classNameProp, overrideFor(overrides, "className"));
  pushProp(rows, children, childrenProp, overrideFor(overrides, "children"));
  rows.push(restProps(tag));

  return rows;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { baseProps };
export type { BasePropsOptions };
