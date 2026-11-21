// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useRender } from "./use-render";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function DefaultHost({
  enabled,
  className,
}: {
  enabled?: boolean;
  className?: string;
}) {
  return useRender({
    defaultTagName: "button",
    enabled,
    props: { className, type: "button", children: "Go" },
  });
}

function RenderElementHost() {
  const ref = createRef<HTMLAnchorElement>();
  return useRender({
    defaultTagName: "button",
    ref,
    render: <a href="/x" ref={ref} />,
    props: { children: "Link" },
  });
}

function RenderFnHost() {
  return useRender({
    defaultTagName: "div",
    render: (props) => <span {...props} data-testid="fn" />,
    state: { open: true },
    props: { children: "Fn" },
  });
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("useRender", () => {
  it("renders defaultTagName when render is omitted", () => {
    render(<DefaultHost className="x" />);
    const button = screen.getByRole("button", { name: "Go" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveClass("x");
  });

  it("returns null when enabled is false", () => {
    const { container } = render(<DefaultHost enabled={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("clones render element and stamps host identity", () => {
    render(<RenderElementHost />);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "/x");
    expect(link).toHaveAttribute("data-original-element", "button");
    expect(link).toHaveAttribute("data-rendered-component", "a");
  });

  it("supports render as a function", () => {
    render(<RenderFnHost />);
    const el = screen.getByTestId("fn");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveAttribute("data-original-element", "div");
    expect(el).toHaveTextContent("Fn");
  });
});
