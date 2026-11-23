// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import { baseAttrs, disabledAttr } from "./attrs";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("baseAttrs", () => {
  it("emits data-slot for a single component", () => {
    expect(
      baseAttrs({ slot: "button", attrs: [disabledAttr] }).map(
        (attr) => attr.name,
      ),
    ).toEqual(["data-slot", "data-disabled"]);
  });

  it("emits data-slot and the part attr on a compound root", () => {
    expect(
      baseAttrs({ component: "collapsible", part: "root" }).map(
        (attr) => attr.name,
      ),
    ).toEqual(["data-slot", "data-collapsible-part"]);
  });

  it("emits only the part attr on a non-root compound part", () => {
    expect(
      baseAttrs({
        component: "collapsible",
        part: "trigger",
        attrs: [disabledAttr],
      }).map((attr) => attr.name),
    ).toEqual(["data-collapsible-part", "data-disabled"]);
  });
});
