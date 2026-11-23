// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ScrollArea } from "./index";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function BasicScrollArea({
  type = "always" as const,
  withBars = true,
  scrollHideDelay = 600,
  keepMounted = false,
}: {
  type?: "hover" | "scroll" | "always";
  withBars?: boolean;
  scrollHideDelay?: number;
  keepMounted?: boolean;
}) {
  return (
    <ScrollArea.Root
      type={type}
      scrollHideDelay={scrollHideDelay}
      style={{ width: 120, height: 120 }}
    >
      <ScrollArea.Content style={{ width: 120, height: 120 }}>
        <div style={{ width: 240, height: 240 }}>Scrollable body</div>
      </ScrollArea.Content>
      {withBars ? (
        <>
          <ScrollArea.Scrollbar
            orientation="vertical"
            keepMounted={keepMounted}
          >
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            orientation="horizontal"
            keepMounted={keepMounted}
          >
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </>
      ) : null}
    </ScrollArea.Root>
  );
}

function mockOverflow(element: HTMLElement) {
  Object.defineProperty(element, "clientWidth", {
    configurable: true,
    get: () => 120,
  });
  Object.defineProperty(element, "clientHeight", {
    configurable: true,
    get: () => 120,
  });
  Object.defineProperty(element, "scrollWidth", {
    configurable: true,
    get: () => 240,
  });
  Object.defineProperty(element, "scrollHeight", {
    configurable: true,
    get: () => 240,
  });
  let scrollTop = 0;
  let scrollLeft = 0;
  Object.defineProperty(element, "scrollTop", {
    configurable: true,
    get: () => scrollTop,
    set: (value: number) => {
      scrollTop = value;
    },
  });
  Object.defineProperty(element, "scrollLeft", {
    configurable: true,
    get: () => scrollLeft,
    set: (value: number) => {
      scrollLeft = value;
    },
  });
}

function verticalScrollbar(container: HTMLElement) {
  return container.querySelector(
    '[data-scroll-area-part="scrollbar"][data-orientation="vertical"]',
  ) as HTMLElement | null;
}

async function revealOverflow(container: HTMLElement) {
  const content = screen.getByText("Scrollable body").parentElement!;
  mockOverflow(content);
  fireEvent.scroll(content);
  await waitFor(() => {
    const scrollbar = verticalScrollbar(container);
    expect(scrollbar).toBeTruthy();
    expect(scrollbar).toHaveAttribute("data-state", "open");
  });
  return content;
}

// ------------------------------------------------
// TESTS
// ------------------------------------------------

describe("ScrollArea", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("wires root/content/part data attrs", async () => {
    const { container } = render(<BasicScrollArea />);
    const root = container.firstElementChild!;
    expect(root).toHaveAttribute("data-slot", "scroll-area");
    expect(root).toHaveAttribute("data-scroll-area-part", "root");
    expect(root).toHaveAttribute("data-type", "always");
    expect(root).toHaveAttribute("data-state", "idle");

    const content = screen.getByText("Scrollable body").parentElement!;
    expect(content).toHaveAttribute("data-scroll-area-part", "content");
    expect(content).not.toHaveAttribute("data-slot");

    await revealOverflow(container);

    expect(
      container.querySelector('[data-scroll-area-part="thumb"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-scroll-area-part="corner"]'),
    ).toBeTruthy();
  });

  it("points scrollbar aria-controls at a consumer content id", async () => {
    const { container } = render(
      <ScrollArea.Root style={{ width: 120, height: 120 }}>
        <ScrollArea.Content id="notes" style={{ width: 120, height: 120 }}>
          <div style={{ width: 240, height: 240 }}>Scrollable body</div>
        </ScrollArea.Content>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>,
    );
    const content = await revealOverflow(container);
    expect(content).toHaveAttribute("id", "notes");
    expect(verticalScrollbar(container)).toHaveAttribute(
      "aria-controls",
      "notes",
    );
  });

  it("places the horizontal thumb on the inline start in rtl", async () => {
    const { container } = render(
      <ScrollArea.Root
        type="always"
        style={{ direction: "rtl", width: 120, height: 120 }}
      >
        <ScrollArea.Content style={{ width: 120, height: 120 }}>
          <div style={{ width: 240, height: 240 }}>Scrollable body</div>
        </ScrollArea.Content>
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>,
    );
    const content = screen.getByText("Scrollable body").parentElement!;
    mockOverflow(content);
    fireEvent.scroll(content);

    await waitFor(() => {
      const thumb = container.querySelector(
        '[data-scroll-area-part="thumb"]',
      ) as HTMLElement | null;
      expect(thumb?.style.transform).toBe("translate3d(100%, 0, 0)");
    });
  });

  it("exposes scrollbar a11y pointing at content", async () => {
    const { container } = render(<BasicScrollArea />);
    const content = await revealOverflow(container);
    const scrollbar = verticalScrollbar(container)!;
    expect(scrollbar).toHaveAttribute("role", "scrollbar");
    expect(scrollbar).toHaveAttribute("aria-controls", content.id);
    expect(scrollbar).toHaveAttribute("aria-orientation", "vertical");
    expect(scrollbar).toHaveAttribute("aria-valuemin", "0");
    expect(scrollbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("updates overflow + scrolling activity on scroll", async () => {
    const { container } = render(<BasicScrollArea type="scroll" />);
    const root = container.firstElementChild!;
    const content = screen.getByText("Scrollable body").parentElement!;
    mockOverflow(content);
    content.scrollTop = 40;
    fireEvent.scroll(content);

    await waitFor(() => {
      expect(content).toHaveAttribute("data-overflow-x");
      expect(content).toHaveAttribute("data-overflow-y");
      expect(content).toHaveAttribute("data-overflow-top");
      expect(content).toHaveAttribute("data-overflow-bottom");
      expect(content).toHaveAttribute("data-overflow-right");
      expect(content).not.toHaveAttribute("data-overflow-left");
      expect(root).toHaveAttribute("data-scrolling");
      expect(root).toHaveAttribute("data-state", "scrolling");
      expect(verticalScrollbar(container)).toBeTruthy();
    });
  });

  it("toggles edge overflow attrs from 1px scroll", async () => {
    const { container } = render(<BasicScrollArea type="always" />);
    const content = await revealOverflow(container);

    expect(content).not.toHaveAttribute("data-overflow-top");
    expect(content).toHaveAttribute("data-overflow-bottom");
    expect(content).not.toHaveAttribute("data-overflow-left");
    expect(content).toHaveAttribute("data-overflow-right");

    content.scrollTop = 1;
    content.scrollLeft = 1;
    fireEvent.scroll(content);

    await waitFor(() => {
      expect(content).toHaveAttribute("data-overflow-top");
      expect(content).toHaveAttribute("data-overflow-bottom");
      expect(content).toHaveAttribute("data-overflow-left");
      expect(content).toHaveAttribute("data-overflow-right");
    });

    content.scrollTop = 120;
    content.scrollLeft = 120;
    fireEvent.scroll(content);

    await waitFor(() => {
      expect(content).toHaveAttribute("data-overflow-top");
      expect(content).not.toHaveAttribute("data-overflow-bottom");
      expect(content).toHaveAttribute("data-overflow-left");
      expect(content).not.toHaveAttribute("data-overflow-right");
    });
  });

  it("works without scrollbar parts (hidden chrome)", () => {
    render(<BasicScrollArea withBars={false} />);
    expect(screen.getByText("Scrollable body")).toBeInTheDocument();
    expect(
      document.querySelector('[data-scroll-area-part="scrollbar"]'),
    ).toBeNull();
  });

  it("pages content when track is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(<BasicScrollArea />);
    const content = await revealOverflow(container);

    const scrollbar = verticalScrollbar(container)!;
    scrollbar.getBoundingClientRect = () =>
      ({
        top: 0,
        left: 100,
        bottom: 120,
        right: 112,
        width: 12,
        height: 120,
        x: 100,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;

    await user.pointer({
      keys: "[MouseLeft]",
      target: scrollbar,
      coords: { clientX: 106, clientY: 100 },
    });

    expect(content.scrollTop).toBeGreaterThan(0);
  });

  it("keeps scrollbar mounted for type=always when overflowing", async () => {
    const { container } = render(<BasicScrollArea type="always" />);
    await revealOverflow(container);
    expect(verticalScrollbar(container)).toBeTruthy();
    vi.advanceTimersByTime(1000);
    expect(verticalScrollbar(container)).toBeTruthy();
  });

  it("shows scrollbar on root hover for type=hover and unmounts after leave", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(
      <BasicScrollArea type="hover" scrollHideDelay={50} />,
    );
    const root = container.firstElementChild as HTMLElement;
    const content = screen.getByText("Scrollable body").parentElement!;
    mockOverflow(content);
    fireEvent.scroll(content);

    await waitFor(() => {
      expect(verticalScrollbar(container)).toBeTruthy();
    });

    vi.advanceTimersByTime(100);
    await waitFor(() => {
      expect(verticalScrollbar(container)).toBeNull();
    });

    await user.hover(root);
    await waitFor(() => {
      expect(verticalScrollbar(container)).toBeTruthy();
    });

    await user.unhover(root);
    await waitFor(() => {
      expect(verticalScrollbar(container)).toBeNull();
    });
  });

  it("keeps type=scroll scrollbar while hovered, then hides after leave delay", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(
      <BasicScrollArea type="scroll" scrollHideDelay={200} />,
    );
    const content = screen.getByText("Scrollable body").parentElement!;
    mockOverflow(content);
    content.scrollTop = 40;
    fireEvent.scroll(content);

    await waitFor(() => {
      expect(verticalScrollbar(container)).toBeTruthy();
    });

    const scrollbar = verticalScrollbar(container)!;
    await user.hover(scrollbar);

    vi.advanceTimersByTime(500);
    expect(verticalScrollbar(container)).toBeTruthy();

    await user.unhover(scrollbar);
    expect(verticalScrollbar(container)).toBeTruthy();

    vi.advanceTimersByTime(200);
    await waitFor(() => {
      expect(verticalScrollbar(container)).toBeNull();
    });
  });

  it("keeps scrollbar mounted when keepMounted and hidden", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(
      <BasicScrollArea type="hover" scrollHideDelay={50} keepMounted />,
    );
    const root = container.firstElementChild as HTMLElement;
    const content = screen.getByText("Scrollable body").parentElement!;
    mockOverflow(content);
    fireEvent.scroll(content);

    await waitFor(() => {
      expect(verticalScrollbar(container)).toBeTruthy();
    });

    vi.advanceTimersByTime(100);
    await user.unhover(root);

    await waitFor(() => {
      const scrollbar = verticalScrollbar(container);
      expect(scrollbar).toBeTruthy();
      expect(scrollbar).toHaveAttribute("data-state", "closed");
      expect(scrollbar).toHaveAttribute("inert");
    });
  });
});
