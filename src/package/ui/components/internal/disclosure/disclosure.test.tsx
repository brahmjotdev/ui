// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  useState,
  type ComponentProps,
} from "react";
import { describe, expect, it, vi } from "vitest";

import { Disclosure } from "./index";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function BasicDisclosure(
  props: Partial<ComponentProps<typeof Disclosure.Root>> = {},
) {
  return (
    <Disclosure.Root {...props}>
      <Disclosure.Trigger>Toggle</Disclosure.Trigger>
      <Disclosure.Content>Panel body</Disclosure.Content>
    </Disclosure.Root>
  );
}

function ControlledDisclosure() {
  const [open, setOpen] = useState(false);
  return (
    <Disclosure.Root open={open} onOpenChange={setOpen}>
      <Disclosure.Trigger>Toggle</Disclosure.Trigger>
      <Disclosure.Content>Panel body</Disclosure.Content>
    </Disclosure.Root>
  );
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("Disclosure", () => {
  it("keeps content unmounted when closed by default", () => {
    render(<BasicDisclosure />);

    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText("Panel body")).not.toBeInTheDocument();
  });

  it("toggles open uncontrolled and wires aria-controls", async () => {
    const user = userEvent.setup();
    render(<BasicDisclosure />);

    const trigger = screen.getByRole("button", { name: "Toggle" });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const content = screen.getByText("Panel body");
    expect(trigger).toHaveAttribute("aria-controls", content.id);
    await waitFor(() => {
      expect(content).toHaveAttribute("data-state", "open");
    });
  });

  it("sets behavioral data attrs without disclosure product attrs", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicDisclosure defaultOpen />);

    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-open");
    expect(root).not.toHaveAttribute("data-slot");
    expect(root).not.toHaveAttribute("data-disclosure");

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("data-open");
    expect(trigger).not.toHaveAttribute("data-slot");

    await user.click(trigger);
    expect(root).not.toHaveAttribute("data-open");
  });

  it("respects controlled open + onOpenChange", async () => {
    const user = userEvent.setup();
    render(<ControlledDisclosure />);

    expect(screen.queryByText("Panel body")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Panel body")).toBeInTheDocument();
  });

  it("freezes interaction when root disabled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <BasicDisclosure disabled defaultOpen onOpenChange={onOpenChange} />,
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("data-disabled");
    await user.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByText("Panel body")).toBeInTheDocument();
  });

  it("does not change controlled open without onOpenChange", async () => {
    const user = userEvent.setup();
    render(
      <Disclosure.Root open={false}>
        <Disclosure.Trigger>Toggle</Disclosure.Trigger>
        <Disclosure.Content>Panel body</Disclosure.Content>
      </Disclosure.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.queryByText("Panel body")).not.toBeInTheDocument();
  });

  it("keeps content mounted when keepMounted and closed", async () => {
    const user = userEvent.setup();
    render(
      <Disclosure.Root defaultOpen>
        <Disclosure.Trigger>Toggle</Disclosure.Trigger>
        <Disclosure.Content keepMounted>
          <a href="#x">Panel body</a>
        </Disclosure.Content>
      </Disclosure.Root>,
    );

    const content = screen.getByText("Panel body").closest("[id]")!;
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    await waitFor(() => {
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute("inert");
      const style = content.getAttribute("style") ?? "";
      expect(style).toContain("--disclosure-content-height");
      expect(style).toContain("--disclosure-content-width");
    });
  });

  it("sets parameterized size CSS vars when open", async () => {
    render(
      <Disclosure.Root defaultOpen>
        <Disclosure.Trigger>Toggle</Disclosure.Trigger>
        <Disclosure.Content
          sizeCssVars={{
            width: "--test-content-width",
            height: "--test-content-height",
          }}
        >
          Panel body
        </Disclosure.Content>
      </Disclosure.Root>,
    );

    const content = screen.getByText("Panel body");
    await waitFor(() => {
      const style = content.getAttribute("style") ?? "";
      expect(style).toContain("--test-content-width");
      expect(style).toContain("--test-content-height");
      expect(style).not.toContain("--disclosure-content-width");
    });
  });
});
