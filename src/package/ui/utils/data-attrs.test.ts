// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import { dataAttrs } from "./data-attrs";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("dataAttrs", () => {
  it("sets data-slot as identity for singles", () => {
    expect(dataAttrs("collapsiblePanel")).toEqual({
      "data-slot": "collapsible-panel",
    });
  });

  it("includes only truthy state keys as data attrs", () => {
    expect(
      dataAttrs("button", { open: true, disabled: false, loading: true }),
    ).toEqual({
      "data-slot": "button",
      "data-open": true,
      "data-loading": true,
    });
  });

  it("sets data-slot and part=root for compound root", () => {
    expect(dataAttrs("scroll-area", { idle: true }, { part: "root" })).toEqual(
      {
        "data-slot": "scroll-area",
        "data-scroll-area-part": "root",
        "data-idle": true,
      },
    );
  });

  it("sets only part attr for non-root compound parts", () => {
    expect(dataAttrs("collapsible", undefined, { part: "trigger" })).toEqual({
      "data-collapsible-part": "trigger",
    });
  });

  it("emits only states when statesOnly", () => {
    expect(
      dataAttrs("disclosure", { open: true, closed: false }, { statesOnly: true }),
    ).toEqual({
      "data-open": true,
    });
  });
});
