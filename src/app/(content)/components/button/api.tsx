// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { baseAttrs, baseProps, type DocsAPI } from "@/docs";

// ------------------------------------------------
// API
// ------------------------------------------------

export const buttonAPI: DocsAPI = {
  name: "Button",
  tag: "button",
  props: {
    styled: [
      {
        name: "loadingText",
        type: "text",
        defaultValue: '"Loading..."',
      },
      {
        name: "variant",
        type: '"primary" | "secondary" | "outline" | "ghost" | "danger"',
      },
      { name: "size", type: '"xs" | "sm" | "md" | "lg"', defaultValue: "md" },
      {
        name: "iconOnly",
        type: "boolean",
      },
      {
        name: '"aria-label"',
        type: "text",
        detail: "Required when iconOnly is true.",
      },
    ],
    headless: baseProps({
      tag: "button",
      render: true,
      props: [
        { name: "loading", type: "boolean" },
        {
          name: "type",
          type: '"button" | "submit" | "reset"',
          defaultValue: "button",
        },
      ],
      disabled: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    slot: "button",
    attrs: [{ name: "data-loading" }, { name: "data-disabled" }],
  }),
  a11y: [{ name: "aria-busy" }, { name: "aria-disabled" }],
};
