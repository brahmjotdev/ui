// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { createRef, type Ref } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useMergeRefs } from "./merge-refs";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function Host({
  refs,
}: {
  refs: readonly (Ref<HTMLDivElement> | undefined)[];
}) {
  const ref = useMergeRefs(refs);
  return <div data-testid="host" ref={ref} />;
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("useMergeRefs", () => {
  it("assigns object and callback refs", () => {
    const objectRef = createRef<HTMLDivElement>();
    const callback = vi.fn();

    const { getByTestId } = render(
      <Host refs={[objectRef, callback]} />,
    );

    const node = getByTestId("host");
    expect(objectRef.current).toBe(node);
    expect(callback).toHaveBeenCalledWith(node);
  });

  it("clears refs on unmount", () => {
    const objectRef = createRef<HTMLDivElement>();
    const callback = vi.fn();

    const { unmount } = render(<Host refs={[objectRef, callback]} />);
    unmount();

    expect(objectRef.current).toBeNull();
    expect(callback).toHaveBeenLastCalledWith(null);
  });
});
