// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { describe, expect, it } from "vitest";

import { presenceAttrs, type PresenceStates } from "./use-presence";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function states(
  overrides: Partial<PresenceStates> &
    Pick<PresenceStates, "open" | "closed" | "starting" | "ending">,
): PresenceStates {
  return {
    started: false,
    ended: false,
    animating: overrides.starting || overrides.ending,
    idle: !overrides.starting && !overrides.ending,
    hidden: false,
    ...overrides,
  };
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("presenceAttrs data-state", () => {
  it("emits opening while starting", () => {
    expect(
      presenceAttrs(
        "presence",
        states({ open: true, closed: false, starting: true, ending: false }),
      )["data-state"],
    ).toBe("opening");
  });

  it("emits open when idle open", () => {
    expect(
      presenceAttrs(
        "presence",
        states({
          open: true,
          closed: false,
          starting: false,
          ending: false,
          started: true,
        }),
      )["data-state"],
    ).toBe("open");
  });

  it("emits closing while ending", () => {
    expect(
      presenceAttrs(
        "presence",
        states({ open: false, closed: true, starting: false, ending: true }),
      )["data-state"],
    ).toBe("closing");
  });

  it("emits closed when idle closed", () => {
    expect(
      presenceAttrs(
        "presence",
        states({
          open: false,
          closed: true,
          starting: false,
          ending: false,
          ended: true,
        }),
      )["data-state"],
    ).toBe("closed");
  });
});
