// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import { dataAttrs } from "./data-attrs";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("dataAttrs", () => {
  it("sets data-slot and identity attr", () => {
    expect(dataAttrs("collapsiblePanel")).toEqual({
      "data-slot": "collapsible-panel",
      "data-collapsible-panel": true,
    });
  });

  it("includes only truthy state keys as data attrs", () => {
    expect(
      dataAttrs("button", { open: true, disabled: false, loading: true }),
    ).toEqual({
      "data-slot": "button",
      "data-button": true,
      "data-open": true,
      "data-loading": true,
    });
  });
});
