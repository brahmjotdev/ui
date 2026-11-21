// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import { applyA11y } from "./apply-a11y";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("applyA11y", () => {
  const spec = {
    loading: { "aria-busy": true, "aria-disabled": true },
    disabled: { "aria-disabled": true },
  };

  it("merges attrs for truthy states", () => {
    expect(applyA11y(spec, { loading: true, disabled: false })).toEqual({
      "aria-busy": true,
      "aria-disabled": true,
    });
  });

  it("returns empty object when no states match", () => {
    expect(applyA11y(spec, { loading: false })).toEqual({});
  });

  it("later matching keys overwrite earlier attrs", () => {
    expect(applyA11y(spec, { loading: true, disabled: true })).toEqual({
      "aria-busy": true,
      "aria-disabled": true,
    });
  });
});
