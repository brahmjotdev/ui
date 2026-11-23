// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TypeTokens } from "./type-tokens";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function tokens(type: string) {
  const { container } = render(<TypeTokens type={type} />);
  return [...container.querySelectorAll("[data-token]")].map((node) => ({
    kind: node.getAttribute("data-token"),
    value: node.textContent,
  }));
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("TypeTokens", () => {
  it("paints React-qualified names and angle args", () => {
    expect(tokens("React.Ref<HTMLElement>")).toEqual([
      { kind: "qualified", value: "React" },
      { kind: "qualified", value: "Ref" },
      { kind: "keyword", value: "<" },
      { kind: "keyword", value: "HTMLElement" },
      { kind: "keyword", value: ">" },
    ]);
  });

  it("paints string angle args the same color as the brackets", () => {
    expect(tokens('ComponentProps<"button">')).toEqual([
      { kind: "string", value: "<" },
      { kind: "string", value: '"button"' },
      { kind: "string", value: ">" },
    ]);
  });

  it("paints arrow parameters like parentheses", () => {
    expect(tokens("(event) => void")).toEqual([
      { kind: "paren", value: "(" },
      { kind: "paren", value: "event" },
      { kind: "paren", value: ")" },
      { kind: "function", value: "=>" },
      { kind: "keyword", value: "void" },
    ]);
  });
});
