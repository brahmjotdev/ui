// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import {
  baseAttrs,
  baseProps,
  composeAPI,
  presenceAttrs,
  type DocsAPI,
} from "@/docs";

import { buttonAPI } from "../button/api";

// ------------------------------------------------
// API
// ------------------------------------------------

const rootAPI: DocsAPI = {
  name: "Collapsible.Root",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      props: [
        { name: "open", type: "boolean" },
        { name: "defaultOpen", type: "boolean" },
        { name: "onOpenChange", type: "(open: boolean) => void" },
      ],
      disabled: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    slot: "collapsible",
    attrs: [{ name: "data-open" }, { name: "data-disabled" }],
  }),
};

const triggerAPI = composeAPI(buttonAPI, {
  name: "Collapsible.Trigger",
  tag: "button",
  attrs: baseAttrs({
    slot: "collapsible-trigger",
    attrs: [{ name: "data-open" }, { name: "data-disabled" }],
  }),
  a11y: [{ name: "aria-expanded" }, { name: "aria-controls" }],
});

const contentAPI: DocsAPI = {
  name: "Collapsible.Content",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      props: [{ name: "keepMounted", type: "boolean" }],
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    slot: "collapsible-content",
    attrs: presenceAttrs(),
  }),
  cssVars: [
    { name: "--collapsible-content-width" },
    { name: "--collapsible-content-height" },
  ],
};

export const collapsibleAPI: DocsAPI[] = [rootAPI, triggerAPI, contentAPI];
