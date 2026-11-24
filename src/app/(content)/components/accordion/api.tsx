// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import {
  baseAttrs,
  baseProps,
  disabledAttr,
  openAttr,
  presenceAttrs,
  type DocsAPI,
} from "@/docs";

// ------------------------------------------------
// API
// ------------------------------------------------

const rootAPI: DocsAPI = {
  name: "Accordion.Root",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      props: [
        {
          name: "type",
          type: '"single" | "multiple"',
          defaultValue: '"single"',
          description: (
            <p>
              <code className="text-blue-500! dark:text-blue-400!">single</code>{" "}
              keeps one item open. Opening another closes the previous one, and
              the open item can close.{" "}
              <code className="text-blue-500! dark:text-blue-400!">
                multiple
              </code>{" "}
              lets several items stay open. Each trigger toggles only its own
              item.
            </p>
          ),
        },
        {
          name: "value",
          type: "string | string[]",
          description: (
            <p>
              Controlled open value. The type matches{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                type
              </code>
              . Without{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                onValueChange
              </code>
              , trigger clicks do not change it.
            </p>
          ),
        },
        {
          name: "defaultValue",
          type: "string | string[]",
          description: (
            <p>
              Initial value when uncontrolled. Defaults to{" "}
              <code className="text-blue-500! dark:text-blue-400!">
                &quot;&quot;
              </code>{" "}
              for single and{" "}
              <code className="text-blue-500! dark:text-blue-400!">[]</code> for
              multiple.
            </p>
          ),
        },
        {
          name: "onValueChange",
          type: "(value: string | string[]) => void",
          description: (
            <p>
              Called with the next open value. The argument is{" "}
              <code className="text-blue-500! dark:text-blue-400!">string</code>{" "}
              or{" "}
              <code className="text-blue-500! dark:text-blue-400!">
                string[]
              </code>{" "}
              based on{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                type
              </code>
              .
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
    component: "accordion",
    part: "root",
    attrs: [
      {
        name: "data-type",
        description: '"single" | "multiple"',
      },
      disabledAttr,
    ],
  }),
};

const itemAPI: DocsAPI = {
  name: "Accordion.Item",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      props: [
        {
          name: "value",
          type: "string",
          required: true,
          description: (
            <p>
              Required <code>id</code> for this item. Must be unique in the accordion and
              must not be an empty string.
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
    component: "accordion",
    part: "item",
    attrs: [openAttr, disabledAttr],
  }),
};

const headerAPI: DocsAPI = {
  name: "Accordion.Header",
  tag: "h3",
  props: {
    headless: baseProps({
      tag: "h3",
      render: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "accordion",
    part: "header",
  }),
};

const triggerAPI: DocsAPI = {
  name: "Accordion.Trigger",
  tag: "button",
  props: {
    headless: baseProps({
      tag: "button",
      render: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "accordion",
    part: "trigger",
    attrs: [openAttr, disabledAttr],
  }),
  a11y: [
    {
      name: "aria-expanded",
      description: (
        <p>
          Reflects whether this item is open. Keyboard activation is the
          button&apos;s Enter and Space keys.
        </p>
      ),
    },
    {
      name: "aria-controls",
      description: (
        <p>
          <code className="text-orange-500! dark:text-orange-400!">id</code> of
          the content node.
        </p>
      ),
    },
  ],
};

const contentAPI: DocsAPI = {
  name: "Accordion.Content",
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
              When{" "}
              <code className="text-blue-500! dark:text-blue-400!">true</code>,
              closed content stays in the DOM and is <code>inert</code>.
              Otherwise it unmounts after the exit.
            </p>
          ),
        },
      ],
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "accordion",
    part: "content",
    attrs: presenceAttrs(),
  }),
  cssVars: [
    { name: "--accordion-content-width" },
    { name: "--accordion-content-height" },
  ],
};

export const accordionAPI: DocsAPI[] = [
  rootAPI,
  itemAPI,
  headerAPI,
  triggerAPI,
  contentAPI,
];
