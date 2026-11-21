// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it, vi } from "vitest";

import { mergeProps } from "./merge-props";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("mergeProps", () => {
  it("later props win for plain keys", () => {
    expect(mergeProps({ id: "a", title: "x" }, { id: "b" })).toEqual({
      id: "b",
      title: "x",
    });
  });

  it("concatenates className", () => {
    expect(mergeProps({ className: "a" }, { className: "b" })).toEqual({
      className: "a b",
    });
  });

  it("shallow-merges style", () => {
    expect(
      mergeProps({ style: { color: "red", margin: 1 } }, { style: { color: "blue" } }),
    ).toEqual({
      style: { color: "blue", margin: 1 },
    });
  });

  it("skips ref and undefined values", () => {
    const ref = { current: null };
    expect(
      mergeProps({ id: "a", ref, title: "keep" }, { title: undefined, id: "b" }),
    ).toEqual({
      id: "b",
      title: "keep",
    });
  });

  it("chains event handlers; skips left when defaultPrevented", () => {
    const left = vi.fn();
    const right = vi.fn((event: { defaultPrevented: boolean }) => {
      event.defaultPrevented = true;
    });
    const merged = mergeProps({ onClick: left }, { onClick: right });
    const event = { defaultPrevented: false };
    (merged.onClick as (e: typeof event) => void)(event);
    expect(right).toHaveBeenCalledOnce();
    expect(left).not.toHaveBeenCalled();
  });

  it("calls both handlers when not prevented", () => {
    const left = vi.fn();
    const right = vi.fn();
    const merged = mergeProps({ onClick: left }, { onClick: right });
    (merged.onClick as () => void)();
    expect(right).toHaveBeenCalledOnce();
    expect(left).toHaveBeenCalledOnce();
  });
});
