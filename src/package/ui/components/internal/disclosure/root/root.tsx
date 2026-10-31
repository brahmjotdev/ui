// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { DisclosureProvider } from "../context";
import { useDisclosureRoot, useDisclosureRootHost } from "./hooks";
import type { DisclosureRootProps } from "./types";

import { mergeProps, useRender } from "../../../../utils";

// ------------------------------------------------
// HOST
// ------------------------------------------------

function DisclosureRootHost({
  ref,
  render,
  className,
  children,
  ...props
}: Omit<
  DisclosureRootProps,
  "open" | "defaultOpen" | "onOpenChange" | "disabled"
>) {
  const { attrs } = useDisclosureRootHost();

  return useRender({
    defaultTagName: "div",
    ref,
    render,
    props: mergeProps({ className, children }, attrs, props),
  });
}

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function DisclosureRoot(props: DisclosureRootProps) {
  const { contextValue, hostProps } = useDisclosureRoot(props);

  return (
    <DisclosureProvider contextValue={contextValue}>
      <DisclosureRootHost {...hostProps} />
    </DisclosureProvider>
  );
}
