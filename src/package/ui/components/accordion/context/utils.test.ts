// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import {
  nextOpenValues,
  toDefaultList,
  toOpenList,
  toPublicValue,
} from "./utils";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("accordion open list", () => {
  it("maps a single value and a multiple list", () => {
    expect(toOpenList("single", "")).toEqual([]);
    expect(toOpenList("single", "a")).toEqual(["a"]);
    expect(toOpenList("single", undefined)).toBeUndefined();
    expect(toDefaultList("multiple", undefined)).toEqual([]);
    expect(toPublicValue("single", [])).toBe("");
    expect(toPublicValue("single", ["a"])).toBe("a");
    expect(toPublicValue("multiple", ["a", "b"])).toEqual(["a", "b"]);
  });

  it("opens one item in single mode and can close it", () => {
    expect(nextOpenValues([], "a", true, "single")).toEqual(["a"]);
    expect(nextOpenValues(["a"], "b", true, "single")).toEqual(["b"]);
    expect(nextOpenValues(["a"], "a", false, "single")).toEqual([]);
  });

  it("adds and removes items in multiple mode", () => {
    expect(nextOpenValues(["a"], "b", true, "multiple")).toEqual(["a", "b"]);
    expect(nextOpenValues(["a", "b"], "a", false, "multiple")).toEqual(["b"]);
    expect(nextOpenValues(["a"], "a", true, "multiple")).toEqual(["a"]);
  });

  it("ignores an empty item id", () => {
    expect(nextOpenValues(["a"], "", true, "single")).toEqual(["a"]);
  });
});
