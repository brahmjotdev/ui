// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import { baseProps } from "./props";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("baseProps", () => {
  it("always emits ref then the rest props for the tag", () => {
    const rows = baseProps({ tag: "div" });

    expect(rows.map((row) => row.name)).toEqual(["ref", "...props"]);
    expect(rows.at(-1)?.type).toBe('React.ComponentProps<"div">');
  });

  it("keeps shared rows in contract order around custom props", () => {
    const rows = baseProps({
      tag: "button",
      render: true,
      disabled: true,
      className: true,
      children: true,
      props: [{ name: "type", type: "string" }],
    });

    expect(rows.map((row) => row.name)).toEqual([
      "ref",
      "render",
      "type",
      "disabled",
      "className",
      "children",
      "...props",
    ]);
  });

  it("applies an override without renaming the row", () => {
    const rows = baseProps({
      tag: "button",
      disabled: true,
      overrides: { disabled: { type: "literal" } },
    });

    expect(rows.find((row) => row.name === "disabled")?.type).toBe("literal");
  });
});
