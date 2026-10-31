// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState, type ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Collapsible } from "./index";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function BasicCollapsible(
  props: Partial<ComponentProps<typeof Collapsible.Root>> = {},
) {
  return (
    <Collapsible.Root {...props}>
      <Collapsible.Trigger>Toggle</Collapsible.Trigger>
      <Collapsible.Content>Panel body</Collapsible.Content>
    </Collapsible.Root>
  );
}

function ControlledCollapsible() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger>Toggle</Collapsible.Trigger>
      <Collapsible.Content>Panel body</Collapsible.Content>
    </Collapsible.Root>
  );
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("Collapsible", () => {
  it("keeps content unmounted when closed by default", () => {
    render(<BasicCollapsible />);

    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText("Panel body")).not.toBeInTheDocument();
  });

  it("toggles open and wires product attrs + aria-controls", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicCollapsible />);

    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-slot", "collapsible");
    expect(root).toHaveAttribute("data-collapsible");

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("data-slot", "collapsible-trigger");
    expect(trigger).toHaveAttribute("data-collapsible-trigger");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const content = screen.getByText("Panel body");
    expect(trigger).toHaveAttribute("aria-controls", content.id);
    expect(content).toHaveAttribute("data-slot", "collapsible-content");
    expect(content).toHaveAttribute("data-collapsible-content");
    await waitFor(() => {
      expect(content).toHaveAttribute("data-state", "open");
      const style = content.getAttribute("style") ?? "";
      expect(style).toContain("--collapsible-content-width");
      expect(style).toContain("--collapsible-content-height");
    });
  });

  it("respects controlled open + onOpenChange", async () => {
    const user = userEvent.setup();
    render(<ControlledCollapsible />);

    expect(screen.queryByText("Panel body")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Panel body")).toBeInTheDocument();
  });

  it("freezes interaction when root disabled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <BasicCollapsible disabled defaultOpen onOpenChange={onOpenChange} />,
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByText("Panel body")).toBeInTheDocument();
  });

  it("passes keepMounted through to stay mounted when closed", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content keepMounted>Panel body</Collapsible.Content>
      </Collapsible.Root>,
    );

    const content = screen.getByText("Panel body");
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    await waitFor(() => {
      expect(content).toBeInTheDocument();

      const style = content.getAttribute("style") ?? "";
      expect(style).toContain("--collapsible-content-height");
      expect(style).toContain("--collapsible-content-width");
    });
  });
});
