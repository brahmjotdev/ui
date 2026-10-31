// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { afterEach, describe, expect, it, vi } from "vitest";

import { measureContentSize } from "./utils";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function stubRect(
  element: HTMLElement,
  rect: Pick<DOMRect, "top" | "bottom" | "left" | "right" | "width" | "height">,
) {
  element.getBoundingClientRect = () =>
    ({
      x: rect.left,
      y: rect.top,
      toJSON() {
        return rect;
      },
      ...rect,
    }) as DOMRect;
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("measureContentSize", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("includes in-flow child margins in measured height and width", () => {
    const host = document.createElement("div");
    Object.defineProperty(host, "clientWidth", { value: 200 });
    const child = document.createElement("div");
    host.appendChild(child);
    stubRect(child, {
      top: 20,
      bottom: 70,
      left: 8,
      right: 108,
      width: 100,
      height: 50,
    });

    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      display: "block",
      position: "static",
      marginTop: "16px",
      marginBottom: "16px",
      marginLeft: "8px",
      marginRight: "8px",
    } as CSSStyleDeclaration);

    expect(measureContentSize(host)).toEqual({
      width: 116,
      height: 82,
    });
  });

  it("ignores out-of-flow and non-box children when spanning height", () => {
    const host = document.createElement("div");
    Object.defineProperty(host, "clientWidth", { value: 200 });

    const hidden = document.createElement("div");
    const abs = document.createElement("div");
    const flow = document.createElement("div");
    host.append(hidden, abs, flow);

    stubRect(hidden, {
      top: 0,
      bottom: 200,
      left: 0,
      right: 200,
      width: 200,
      height: 200,
    });
    stubRect(abs, {
      top: 0,
      bottom: 300,
      left: 0,
      right: 200,
      width: 200,
      height: 300,
    });
    stubRect(flow, {
      top: 10,
      bottom: 40,
      left: 0,
      right: 100,
      width: 100,
      height: 30,
    });

    vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
      if (element === hidden) {
        return {
          display: "none",
          position: "static",
          marginTop: "0px",
          marginBottom: "0px",
          marginLeft: "0px",
          marginRight: "0px",
        } as CSSStyleDeclaration;
      }
      if (element === abs) {
        return {
          display: "block",
          position: "absolute",
          marginTop: "0px",
          marginBottom: "0px",
          marginLeft: "0px",
          marginRight: "0px",
        } as CSSStyleDeclaration;
      }
      return {
        display: "block",
        position: "static",
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: "0px",
        marginRight: "0px",
      } as CSSStyleDeclaration;
    });

    expect(measureContentSize(host)).toEqual({
      width: 100,
      height: 30,
    });
  });
});
