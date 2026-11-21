// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { baseAttrs, baseProps, presenceAttrs, type DocsAPI } from "@/docs";

// ------------------------------------------------
// API
// ------------------------------------------------

const rootAPI: DocsAPI = {
  name: "ScrollArea.Root",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      props: [
        {
          name: "type",
          type: '"hover" | "scroll" | "always"',
          defaultValue: '"hover"',
        },
        {
          name: "scrollHideDelay",
          type: "number",
          defaultValue: 600,
          description: (
            <p>
              How long to wait (ms) before hiding scrollbars once activity ends.
              Used mainly with{" "}
              <code className="text-orange-500! dark:text-orange-400!">
                type
              </code>{" "}
              set to{" "}
              <code className="text-blue-500! dark:text-blue-400!">
                &quot;scroll&quot;
              </code>
              .
            </p>
          ),
        },
      ],
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "scroll-area",
    part: "root",
    attrs: [
      { name: "data-type" },
      { name: "data-idle" },
      { name: "data-scrolling" },
      { name: "data-hovering" },
      { name: "data-interacting" },
      { name: "data-state", description: '"idle" | "scrolling"' },
    ],
  }),
};

const contentAPI: DocsAPI = {
  name: "ScrollArea.Content",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "scroll-area",
    part: "content",
    attrs: [
      { name: "data-overflow-x" },
      { name: "data-overflow-y" },
      {
        name: "data-overflow-top",
        description: "Content clipped above (scrolled > 1px from top).",
      },
      {
        name: "data-overflow-bottom",
        description: "Content clipped below (not within 1px of bottom).",
      },
      {
        name: "data-overflow-left",
        description:
          "Content clipped on the left (physical; dir-aware).",
      },
      {
        name: "data-overflow-right",
        description:
          "Content clipped on the right (physical; dir-aware).",
      },
    ],
  }),
  a11y: [
    {
      name: "id",
      description: (
        <p>
          Stable id from Root context. Referenced by Scrollbar{" "}
          <code className="text-orange-500! dark:text-orange-400!">
            aria-controls
          </code>
          .
        </p>
      ),
    },
  ],
};

const scrollbarAPI: DocsAPI = {
  name: "ScrollArea.Scrollbar",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      props: [
        {
          name: "orientation",
          type: '"vertical" | "horizontal"',
          required: true,
        },
        {
          name: "keepMounted",
          type: "boolean",
          description: (
            <p>
              By default, the scrollbar unmounts after the exit animation
              finishes when it is hidden. When{" "}
              <code className="text-blue-500! dark:text-blue-400!">true</code>,
              it stays in the DOM when closed.
            </p>
          ),
        },
      ],
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "scroll-area",
    part: "scrollbar",
    attrs: [{ name: "data-orientation" }, ...presenceAttrs()],
  }),
  a11y: [
    {
      name: "role",
      description: '"scrollbar"',
    },
    {
      name: "aria-controls",
      description: (
        <p>
          Id of{" "}
          <code className="text-orange-500! dark:text-orange-400!">
            ScrollArea.Content
          </code>
          .
        </p>
      ),
    },
    {
      name: "aria-orientation",
      description: (
        <>
          {'"vertical" | "horizontal"'}
          <p>
            Matches the required{" "}
            <code className="text-orange-500! dark:text-orange-400!">
              orientation
            </code>{" "}
            prop.
          </p>
        </>
      ),
    },
    {
      name: "aria-valuemin",
      description: "0",
    },
    {
      name: "aria-valuemax",
      description: "100",
    },
    {
      name: "aria-valuenow",
      description: (
        <p>
          Scroll position as a percentage of the scrollable range (
          <code className="text-blue-500! dark:text-blue-400!">0</code>–
          <code className="text-blue-500! dark:text-blue-400!">100</code>).
        </p>
      ),
    },
  ],
};

const thumbAPI: DocsAPI = {
  name: "ScrollArea.Thumb",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "scroll-area",
    part: "thumb",
  }),
  cssVars: [
    {
      name: "--scroll-area-thumb-height",
      description: "Vertical thumb size (track %).",
    },
    {
      name: "--scroll-area-thumb-width",
      description: "Horizontal thumb size (track %).",
    },
  ],
};

const cornerAPI: DocsAPI = {
  name: "ScrollArea.Corner",
  tag: "div",
  props: {
    headless: baseProps({
      tag: "div",
      render: true,
      className: true,
      children: true,
    }),
  },
  attrs: baseAttrs({
    component: "scroll-area",
    part: "corner",
    attrs: [{ name: "data-state", description: '"visible" | "hidden"' }],
  }),
};

export const scrollAreaAPI: DocsAPI[] = [
  rootAPI,
  contentAPI,
  scrollbarAPI,
  thumbAPI,
  cornerAPI,
];
