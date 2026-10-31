// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useControllableState } from "./use-controllable-state";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("useControllableState", () => {
  it("uses defaultValue when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: false }),
    );

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  it("follows value when controlled and still calls onChange", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControllableState({
          value,
          defaultValue: false,
          onChange,
        }),
      { initialProps: { value: false } },
    );

    act(() => {
      result.current[1](true);
    });

    expect(onChange).toHaveBeenCalledWith(true);
    expect(result.current[0]).toBe(false);

    rerender({ value: true });
    expect(result.current[0]).toBe(true);
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 1 }),
    );

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it("no-ops when next value is Object.is equal", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({
        defaultValue: "same",
        onChange,
      }),
    );

    act(() => {
      result.current[1]("same");
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("warns when switching controlled mode in development", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const { rerender } = renderHook(
      ({ value }: { value?: boolean }) =>
        useControllableState({
          value,
          defaultValue: false,
        }),
      { initialProps: { value: undefined as boolean | undefined } },
    );

    rerender({ value: true });

    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});
