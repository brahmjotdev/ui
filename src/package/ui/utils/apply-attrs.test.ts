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
      "data-open": true,
    });
  });

  it("passes part options through to dataAttrs", () => {
    expect(
      applyAttrs(
        "scroll-area",
        ["scrolling"],
        { scrolling: true },
        { part: "root" },
      ),
    ).toEqual({
      "data-slot": "scroll-area",
      "data-scroll-area-part": "root",
      "data-scrolling": true,
    });
  });
});
