// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import type { DocsAPI } from "../types";
import { composeAPI } from "./compose";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

const buttonAPI: DocsAPI = {
  name: "Button",
  tag: "button",
  props: {
    styled: [{ name: "variant", type: "string" }],
    headless: [{ name: "ref", type: "React.Ref<HTMLElement>" }],
  },
  attrs: [{ name: "data-slot" }],
};

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("composeAPI", () => {
  it("prepends patch props and keeps base fallbacks", () => {
    const api = composeAPI(buttonAPI, {
      name: "Trigger",
      props: {
        headless: [{ name: "disabled", type: "boolean" }],
      },
    });

    expect(api.name).toBe("Trigger");
    expect(api.tag).toBe("button");
    expect(api.props.styled?.map((prop) => prop.name)).toEqual(["variant"]);
    expect(api.props.headless?.map((prop) => prop.name)).toEqual([
      "disabled",
      "ref",
    ]);
    expect(api.attrs).toEqual(buttonAPI.attrs);
  });

  it("replaces tag and attrs when the patch provides them", () => {
    const api = composeAPI(buttonAPI, {
      name: "Trigger",
      tag: "a",
      attrs: [{ name: "data-collapsible-part" }],
    });

    expect(api.tag).toBe("a");
    expect(api.attrs).toEqual([{ name: "data-collapsible-part" }]);
  });
});
