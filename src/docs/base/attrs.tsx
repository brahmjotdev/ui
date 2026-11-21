// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import type { ReactNode } from "react";

import type { DocsAPIAttr } from "../types";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function withOverride(
  attr: DocsAPIAttr,
  override?: Partial<DocsAPIAttr>,
): DocsAPIAttr {
  return override ? { ...attr, ...override, name: attr.name } : attr;
}

function whenPropTrue(prop: string): ReactNode {
  return (
    <p>
      When{" "}
      <code className="text-orange-500! dark:text-orange-400!">{prop}</code>{" "}
      prop is <code className="text-blue-500! dark:text-blue-400!">true</code>.
    </p>
  );
}

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface BaseAttrsSingleOptions {
  slot: string;
  part?: never;
  component?: never;
  attrs?: DocsAPIAttr[];
  overrides?: {
    slot?: Partial<DocsAPIAttr>;
  };
}

interface BaseAttrsCompoundOptions {
  component: string;
  part: string;
  slot?: never;
  attrs?: DocsAPIAttr[];
  overrides?: {
    slot?: Partial<DocsAPIAttr>;
    part?: Partial<DocsAPIAttr>;
  };
}

type BaseAttrsOptions = BaseAttrsSingleOptions | BaseAttrsCompoundOptions;

// ------------------------------------------------
// SHARED ATTRS
// ------------------------------------------------

const disabledAttr: DocsAPIAttr = {
  name: "data-disabled",
  description: whenPropTrue("disabled"),
};

const loadingAttr: DocsAPIAttr = {
  name: "data-loading",
  description: whenPropTrue("loading"),
};

const openAttr: DocsAPIAttr = {
  name: "data-open",
  description: <p>Present when open.</p>,
};

// ------------------------------------------------
// PRESENCE ATTRS
// ------------------------------------------------

const presenceAttrChildren: DocsAPIAttr[] = [
  {
    name: "data-state",
    description: '"opening" | "open" | "closing" | "closed"',
  },
  { name: "data-open" },
  { name: "data-closed" },
  { name: "data-animating" },
  { name: "data-idle" },
  { name: "data-starting" },
  { name: "data-started" },
  { name: "data-ending" },
  { name: "data-ended" },
  { name: "data-hidden" },
];

function presenceAttrs(extra: DocsAPIAttr[] = []): DocsAPIAttr[] {
  return [
    {
      name: "...presenceAttrs",
      children: [...presenceAttrChildren, ...extra],
    },
  ];
}

// ------------------------------------------------
// BASE ATTRS
// ------------------------------------------------

function baseAttrs(options: BaseAttrsOptions): DocsAPIAttr[] {
  if ("component" in options && options.component) {
    const { component, part, attrs = [], overrides } = options;
    const rows: DocsAPIAttr[] = [];

    if (part === "root") {
      rows.push(
        withOverride(
          {
            name: "data-slot",
            description: (
              <>
                {`"${component}"`}
                {"Component identity attribute."}
              </>
            ),
          },
          overrides?.slot,
        ),
      );
    }

    rows.push(
      withOverride(
        {
          name: `data-${component}-part`,
          description: (
            <>
              {`"${part}"`}
              {"Part identity attribute."}
            </>
          ),
        },
        overrides?.part,
      ),
      ...attrs,
    );

    return rows;
  }

  const { slot, attrs = [], overrides } = options as BaseAttrsSingleOptions;
  return [
    withOverride(
      {
        name: "data-slot",
        description: (
          <>
            {`"${slot}"`}
            {"Component identity attribute."}
          </>
        ),
      },
      overrides?.slot,
    ),
    ...attrs,
  ];
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { baseAttrs, presenceAttrs, disabledAttr, loadingAttr, openAttr };
export type { BaseAttrsOptions };
