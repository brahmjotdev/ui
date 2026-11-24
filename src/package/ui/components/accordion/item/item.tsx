// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Disclosure } from "../../internal/disclosure";
import { useAccordionItem } from "./hooks";
import type { AccordionItemProps } from "./types";

import { mergeProps } from "../../../utils";

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

export function AccordionItem({
  ref,
  render,
  value,
  disabled,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const item = useAccordionItem({ value, disabled });

  return (
    <Disclosure.Root
      ref={ref}
      render={render}
      open={item.open}
      onOpenChange={item.onOpenChange}
      disabled={item.disabled}
      className={className}
      {...mergeProps(item.attrs, props)}
    >
      {children}
    </Disclosure.Root>
  );
}
