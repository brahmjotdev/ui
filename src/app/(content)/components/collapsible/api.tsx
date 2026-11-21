// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import {
  baseAttrs,
  baseProps,
  composeAPI,
  disabledAttr,
  openAttr,
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
        {
          name: "open",
          type: "boolean",
          description: (
            <p>
              Controlled open state. When set, the collapsible stays in sync
              with this value instead of managing open state internally. Pair
              with{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                onOpenChange
              </code>{" "}
              to update it when the trigger is activated.
            </p>
          ),
        },
        {
          name: "defaultOpen",
          type: "boolean",
          description: (
            <p>
              Initial open state when uncontrolled. Ignored when{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                open
              </code>{" "}
              is provided.
            </p>
          ),
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: (
            <p>
              Called with the next open value when the trigger is activated. Use
              it to update{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                open
              </code>{" "}
              in controlled mode.
            </p>
          ),
        },
      ],
      disabled: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "collapsible",
    part: "root",
    attrs: [openAttr, disabledAttr],
  }),
};

const triggerAPI = composeAPI(buttonAPI, {
  name: "Collapsible.Trigger",
  tag: "button",
  attrs: baseAttrs({
    component: "collapsible",
    part: "trigger",
    attrs: [openAttr, disabledAttr],
  }),
  a11y: [
    {
      name: "aria-expanded",
      description: (
        <p>
          Reflects open state (
          <code className="text-blue-500! dark:text-blue-400!">true</code> when
          open,{" "}
          <code className="text-blue-500! dark:text-blue-400!">false</code> when
          closed).
        </p>
      ),
    },
    {
      name: "aria-controls",
      description: (
        <p>
          <code className="text-orange-500! dark:text-orange-400!">id</code> of
          content node referenced by trigger.
        </p>
      ),
    },
  ],
});

const contentAPI: DocsAPI = {
  name: "Collapsible.Content",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      props: [
        {
          name: "keepMounted",
          type: "boolean",
          description: (
            <p>
              By default, the content unmounts after the exit animation
              finishes. When{" "}
              <code className="text-blue-500! dark:text-blue-400!">true</code>,
              it stays in the DOM when closed. Closed mounted content is{" "}
              <code>inert</code> so focusable children aren&apos;t reachable.
            </p>
          ),
        },
      ],
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "collapsible",
    part: "content",
    attrs: presenceAttrs(),
  }),
  a11y: [
    {
      name: "id",
      description: (
        <p>
          Stable id from context. Referenced by Trigger{" "}
          <code className="text-orange-500! dark:text-orange-400!">
            aria-controls
          </code>
          .
        </p>
      ),
    },
    {
      name: "inert",
      description: (
        <p>
          Set when closed so focusable children aren&apos;t reachable, including
          during exit animation and when{" "}
          <code className="text-orange-500! dark:text-orange-400!">
            keepMounted
          </code>{" "}
          keeps the node in the DOM.
        </p>
      ),
    },
  ],
  cssVars: [
    { name: "--collapsible-content-width" },
    { name: "--collapsible-content-height" },
  ],
};

export const collapsibleAPI: DocsAPI[] = [rootAPI, triggerAPI, contentAPI];
