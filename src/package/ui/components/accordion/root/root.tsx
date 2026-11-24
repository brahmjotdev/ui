// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { AccordionProvider } from "../context";
import { useAccordionRoot, useAccordionRootHost } from "./hooks";
import type { AccordionRootProps, AccordionRootSharedProps } from "./types";

import { mergeProps, useRender } from "../../../utils";

// ------------------------------------------------
// HOST
// ------------------------------------------------

function AccordionRootHost({
  ref,
  render,
  className,
  children,
  ...props
}: AccordionRootSharedProps) {
  const { attrs } = useAccordionRootHost();

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

export function AccordionRoot(props: AccordionRootProps) {
  const { contextValue, hostProps } = useAccordionRoot(props);

  return (
    <AccordionProvider contextValue={contextValue}>
      <AccordionRootHost {...hostProps} />
    </AccordionProvider>
  );
}
