// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import { toKebabCase } from "./to-kebab-case";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("toKebabCase", () => {
  it("converts camelCase", () => {
    expect(toKebabCase("fooBar")).toBe("foo-bar");
  });

  it("splits acronym before word", () => {
    expect(toKebabCase("XMLHttp")).toBe("xml-http");
  });

  it("collapses punctuation and trims hyphens", () => {
    expect(toKebabCase("--Hello World!!")).toBe("hello-world");
  });

  it("keeps numbers adjacent to letters", () => {
    expect(toKebabCase("foo2Bar")).toBe("foo2-bar");
  });
});
