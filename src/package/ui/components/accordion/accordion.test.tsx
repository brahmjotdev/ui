// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { Accordion } from "./index";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function BasicAccordion(
  props: { type?: "single" | "multiple"; disabled?: boolean } = {},
) {
  return (
    <Accordion.Root type={props.type} disabled={props.disabled}>
      <Accordion.Item value="one">
        <Accordion.Header>
          <Accordion.Trigger>One</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Panel one</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Header>
          <Accordion.Trigger>Two</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Panel two</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function ControlledMultiple() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Accordion.Root type="multiple" value={value} onValueChange={setValue}>
      <Accordion.Item value="one">
        <Accordion.Trigger>One</Accordion.Trigger>
        <Accordion.Content>Panel one</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("Accordion", () => {
  it("defaults to single and closes the other item", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicAccordion />);
    const root = container.firstElementChild;

    expect(root).toHaveAttribute("data-slot", "accordion");
    expect(root).toHaveAttribute("data-accordion-part", "root");
    expect(root).toHaveAttribute("data-type", "single");
    expect(screen.queryByText("Panel one")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "One" }));
    await waitFor(() => {
      expect(screen.getByText("Panel one")).toHaveAttribute(
        "data-state",
        "open",
      );
    });

    await user.click(screen.getByRole("button", { name: "Two" }));
    await waitFor(() => {
      expect(screen.queryByText("Panel one")).not.toBeInTheDocument();
      expect(screen.getByText("Panel two")).toBeInTheDocument();
    });
    expect(
      screen.getByRole("heading", { level: 3, name: "One" }),
    ).toHaveAttribute("data-accordion-part", "header");
  });

  it("keeps items open independently when type is multiple", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicAccordion type="multiple" />);

    expect(container.firstElementChild).toHaveAttribute(
      "data-type",
      "multiple",
    );

    await user.click(screen.getByRole("button", { name: "One" }));
    await user.click(screen.getByRole("button", { name: "Two" }));

    expect(screen.getByText("Panel one")).toBeInTheDocument();
    expect(screen.getByText("Panel two")).toBeInTheDocument();
  });

  it("closes the open item in single mode and reports a string", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Accordion.Root type="single" onValueChange={onValueChange}>
        <Accordion.Item value="one">
          <Accordion.Trigger>One</Accordion.Trigger>
          <Accordion.Content>Panel one</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="two">
          <Accordion.Trigger>Two</Accordion.Trigger>
          <Accordion.Content>Panel two</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const one = screen.getByRole("button", { name: "One" });
    await user.click(one);
    expect(onValueChange).toHaveBeenLastCalledWith("one");
    await waitFor(() => {
      expect(screen.getByText("Panel one")).toHaveAttribute(
        "data-state",
        "open",
      );
    });
    expect(screen.queryByText("Panel two")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Two" }));
    expect(onValueChange).toHaveBeenLastCalledWith("two");
    await waitFor(() => {
      expect(screen.queryByText("Panel one")).not.toBeInTheDocument();
      expect(screen.getByText("Panel two")).toHaveAttribute(
        "data-state",
        "open",
      );
    });

    await user.click(screen.getByRole("button", { name: "Two" }));
    expect(onValueChange).toHaveBeenLastCalledWith("");
    await waitFor(() => {
      expect(screen.queryByText("Panel two")).not.toBeInTheDocument();
    });
  });

  it("does not change a controlled value without onValueChange", async () => {
    const user = userEvent.setup();
    render(
      <Accordion.Root value="one">
        <Accordion.Item value="one">
          <Accordion.Trigger>One</Accordion.Trigger>
          <Accordion.Content>Panel one</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="two">
          <Accordion.Trigger>Two</Accordion.Trigger>
          <Accordion.Content>Panel two</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    expect(screen.getByText("Panel one")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Two" }));
    expect(screen.getByText("Panel one")).toBeInTheDocument();
    expect(screen.queryByText("Panel two")).not.toBeInTheDocument();
  });

  it("ignores triggers when the root or item is disabled", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<BasicAccordion disabled />);

    await user.click(screen.getByRole("button", { name: "One" }));
    expect(screen.queryByText("Panel one")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "One" })).toBeDisabled();

    rerender(
      <Accordion.Root>
        <Accordion.Item value="one" disabled>
          <Accordion.Trigger>One</Accordion.Trigger>
          <Accordion.Content>Panel one</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="two">
          <Accordion.Trigger>Two</Accordion.Trigger>
          <Accordion.Content>Panel two</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    await user.click(screen.getByRole("button", { name: "One" }));
    expect(screen.queryByText("Panel one")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Two" }));
    expect(screen.getByText("Panel two")).toBeInTheDocument();
  });

  it("follows controlled multiple state", async () => {
    const user = userEvent.setup();
    render(<ControlledMultiple />);
    await user.click(screen.getByRole("button", { name: "One" }));
    await waitFor(() => {
      expect(screen.getByText("Panel one")).toHaveAttribute(
        "data-state",
        "open",
      );
    });
    await user.click(screen.getByRole("button", { name: "One" }));
    await waitFor(() => {
      expect(screen.queryByText("Panel one")).not.toBeInTheDocument();
    });
  });

  it("keeps closed content mounted and inert", async () => {
    const user = userEvent.setup();
    render(
      <Accordion.Root defaultValue="one">
        <Accordion.Item value="one">
          <Accordion.Trigger>One</Accordion.Trigger>
          <Accordion.Content keepMounted>Panel one</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const content = screen.getByText("Panel one");
    await waitFor(() => {
      expect(content).toHaveAttribute("data-accordion-part", "content");
      const style = content.getAttribute("style") ?? "";
      expect(style).toContain("--accordion-content-width");
      expect(style).toContain("--accordion-content-height");
    });

    await user.click(screen.getByRole("button", { name: "One" }));

    await waitFor(() => {
      expect(screen.getByText("Panel one")).toHaveAttribute("inert");
    });
  });

  it("wires aria-controls from the trigger to content", async () => {
    const user = userEvent.setup();
    render(<BasicAccordion />);
    const trigger = screen.getByRole("button", { name: "One" });
    expect(trigger).toHaveAttribute("data-accordion-part", "trigger");
    expect(trigger).not.toHaveAttribute("data-slot");

    await user.click(trigger);
    const content = screen.getByText("Panel one");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", content.id);
  });
});
