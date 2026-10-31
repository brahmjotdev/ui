// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import { applyAttrs } from "./apply-attrs";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("applyAttrs", () => {
  it("maps listed state keys through dataAttrs", () => {
    expect(
      applyAttrs("root", ["open", "disabled"], {
        open: true,
        disabled: false,
        extra: true,
      }),
    ).toEqual({
      "data-slot": "root",
      "data-root": true,
      "data-open": true,
    });
  });
});
