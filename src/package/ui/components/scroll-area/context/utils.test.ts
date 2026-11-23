// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import type { ScrollMetrics } from "./types";
import {
  cornerShown,
  dragScrollRatio,
  pageDirectionAt,
  pageScrollOn,
  scrollToRatioOn,
  scrollbarShown,
  thumbTranslatePercent,
} from "./utils";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

const metrics = {
  overflowX: true,
  overflowY: true,
  overflowTop: false,
  overflowBottom: true,
  overflowLeft: false,
  overflowRight: true,
  scrollRatioX: 0,
  scrollRatioY: 0,
  thumbSizeX: 1,
  thumbSizeY: 1,
} satisfies ScrollMetrics;

function scrollElement() {
  const element = document.createElement("div");
  let scrollTop = 0;
  let scrollLeft = 0;

  Object.defineProperty(element, "clientWidth", { value: 100 });
  Object.defineProperty(element, "clientHeight", { value: 50 });
  Object.defineProperty(element, "scrollWidth", { value: 300 });
  Object.defineProperty(element, "scrollHeight", { value: 200 });
  Object.defineProperty(element, "scrollTop", {
    get: () => scrollTop,
    set: (value: number) => {
      scrollTop = value;
    },
  });
  Object.defineProperty(element, "scrollLeft", {
    get: () => scrollLeft,
    set: (value: number) => {
      scrollLeft = value;
    },
  });
  Object.defineProperty(element, "scrollBy", {
    configurable: true,
    writable: true,
    value: undefined,
  });

  return element;
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("scroll commands", () => {
  it("sets a clamped vertical ratio", () => {
    const element = scrollElement();
    scrollToRatioOn(element, "vertical", 0.5, "ltr");
    expect(element.scrollTop).toBe(75);

    scrollToRatioOn(element, "vertical", 2, "ltr");
    expect(element.scrollTop).toBe(150);
  });

  it("negates horizontal scrollLeft in rtl", () => {
    const element = scrollElement();
    scrollToRatioOn(element, "horizontal", 1, "ltr");
    expect(element.scrollLeft).toBe(200);

    scrollToRatioOn(element, "horizontal", 1, "rtl");
    expect(element.scrollLeft).toBe(-200);
  });

  it("pages with scrollBy when the element provides it", () => {
    const element = scrollElement();
    const calls: ScrollToOptions[] = [];
    element.scrollBy = (options) => {
      calls.push(options as ScrollToOptions);
    };

    pageScrollOn(element, "vertical", 1, "ltr");
    pageScrollOn(element, "horizontal", -1, "rtl");

    expect(calls).toEqual([{ top: 50 }, { left: 100 }]);
  });

  it("falls back to scroll offsets when scrollBy is missing", () => {
    const element = scrollElement();
    pageScrollOn(element, "vertical", 1, "ltr");
    pageScrollOn(element, "horizontal", 1, "rtl");

    expect(element.scrollTop).toBe(50);
    expect(element.scrollLeft).toBe(-100);
  });
});

describe("thumb geometry", () => {
  it("parks an rtl horizontal thumb on the inline start", () => {
    expect(thumbTranslatePercent("horizontal", 0, 0.5, "ltr")).toBe(0);
    expect(thumbTranslatePercent("horizontal", 0, 0.5, "rtl")).toBe(100);
    expect(thumbTranslatePercent("vertical", 0, 0.5, "rtl")).toBe(0);
  });

  it("drags an rtl horizontal thumb toward the inline start when the pointer moves right", () => {
    expect(dragScrollRatio(0.5, 10, 100, "horizontal", "ltr")).toBeCloseTo(0.6);
    expect(dragScrollRatio(0.5, 10, 100, "horizontal", "rtl")).toBeCloseTo(0.4);
  });

  it("pages toward the pointer on an rtl horizontal track", () => {
    expect(pageDirectionAt("horizontal", "ltr", 90, 100, 0, 0.5)).toBe(1);
    expect(pageDirectionAt("horizontal", "rtl", 10, 100, 0, 0.5)).toBe(1);
    expect(pageDirectionAt("horizontal", "rtl", 90, 100, 0, 0.5)).toBeNull();
  });
});

describe("scrollbar visibility", () => {
  it("shows always, hover, and scroll types differently", () => {
    expect(scrollbarShown("always", false, false)).toBe(true);
    expect(scrollbarShown("hover", true, false)).toBe(true);
    expect(scrollbarShown("hover", false, true)).toBe(true);
    expect(scrollbarShown("hover", false, false)).toBe(false);
    expect(scrollbarShown("scroll", true, false)).toBe(false);
    expect(scrollbarShown("scroll", false, true)).toBe(true);
  });

  it("shows the corner only when both axes overflow and bars are shown", () => {
    const axes = { vertical: true, horizontal: true };
    expect(cornerShown(axes, metrics, true)).toBe(true);
    expect(cornerShown(axes, metrics, false)).toBe(false);
    expect(
      cornerShown({ vertical: true, horizontal: false }, metrics, true),
    ).toBe(false);
  });
});
