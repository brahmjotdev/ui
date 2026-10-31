// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./index";

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("Button", () => {
  it("renders a native button with slot data attrs", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("data-button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies loading a11y and data attrs", () => {
    render(<Button loading>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("data-loading");
    expect(button).not.toBeDisabled();
  });

  it("applies disabled data attr and native disabled", () => {
    render(<Button disabled>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled");
  });
});

