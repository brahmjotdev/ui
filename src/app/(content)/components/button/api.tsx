// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import {
  baseAttrs,
  baseProps,
  disabledAttr,
  loadingAttr,
  type DocsAPI,
} from "@/docs";

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
        description: (
          <>
            <p>
              Text to display when{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                loading
              </code>{" "}
              is{" "}
              <code className="text-blue-500! dark:text-blue-400!">true</code>.
              This only works when{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                iconOnly
              </code>{" "}
              prop is set to{" "}
              <code className="text-blue-500! dark:text-blue-400!">false</code>,
              if{" "}
              <code className="text-blue-500! dark:text-blue-400!">true</code>{" "}
              it shows the default loader icon.
            </p>
          </>
        ),
      },
      {
        name: "variant",
        type: '"primary" | "secondary" | "outline" | "ghost" | "danger"',
        description: <p>Choose different visual styles for the button.</p>,
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: '"md"',
      },
      {
        name: "iconOnly",
        type: "boolean",
        description: (
          <p>
            If <code className="text-blue-500! dark:text-blue-400!">true</code>,
            the button will remove extra padding to make it fit the icon size.
          </p>
        ),
      },
      {
        name: '"aria-label"',
        type: "text",
        required: true,
        description: (
          <>
            <p>
              Descriptive label for the button, required for accessibility.
              Required when{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                iconOnly
              </code>{" "}
              prop is{" "}
              <code className="text-blue-500! dark:text-blue-400!">true</code>{" "}
              because it doesn&apos;t contain any text.
            </p>
          </>
        ),
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
          defaultValue: '"button"',
        },
      ],
      disabled: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    slot: "button",
    attrs: [loadingAttr, disabledAttr],
  }),
  a11y: [
    {
      name: "aria-busy",
      description: (
        <p>
          When{" "}
          <code className="text-orange-500! dark:text-orange-400!">loading</code>{" "}
          is{" "}
          <code className="text-blue-500! dark:text-blue-400!">true</code>.
        </p>
      ),
    },
    {
      name: "aria-disabled",
      description: (
        <p>
          When{" "}
          <code className="text-orange-500! dark:text-orange-400!">loading</code>{" "}
          is{" "}
          <code className="text-blue-500! dark:text-blue-400!">true</code>. Does
          not force native{" "}
          <code className="text-orange-500! dark:text-orange-400!">disabled</code>
          ; the CLI couples those.
        </p>
      ),
    },
  ],
};
