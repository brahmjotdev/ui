// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  Accordion as BaseAccordion,
  type AccordionContentProps as BaseAccordionContentProps,
  type AccordionHeaderProps as BaseAccordionHeaderProps,
  type AccordionItemProps as BaseAccordionItemProps,
  type AccordionRootProps as BaseAccordionRootProps,
  type AccordionTriggerProps as BaseAccordionTriggerProps,
} from "@cerevialabs/ui/components";

import { cn } from "cn";

import { Button } from "./button";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type AccordionRootProps = BaseAccordionRootProps;
type AccordionItemProps = BaseAccordionItemProps;
type AccordionHeaderProps = BaseAccordionHeaderProps;
type AccordionTriggerProps = BaseAccordionTriggerProps;
type AccordionContentProps = BaseAccordionContentProps;

// ------------------------------------------------
// ROOT
// ------------------------------------------------

function AccordionRoot({ className, children, ...props }: AccordionRootProps) {
  return (
    <BaseAccordion.Root {...props} className={cn("flex flex-col", className)}>
      {children}
    </BaseAccordion.Root>
  );
}

// ------------------------------------------------
// ITEM
// ------------------------------------------------

function AccordionItem({ className, children, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      {...props}
      className={cn("border-b last:border-b-0", className)}
    >
      {children}
    </BaseAccordion.Item>
  );
}

// ------------------------------------------------
// HEADER
// ------------------------------------------------

function AccordionHeader({
  className,
  children,
  ...props
}: AccordionHeaderProps) {
  return (
    <BaseAccordion.Header {...props} className={cn(className)}>
      {children}
    </BaseAccordion.Header>
  );
}

// ------------------------------------------------
// TRIGGER
// ------------------------------------------------

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      {...props}
      render={
        <Button
          variant="ghost"
          className={cn("w-full justify-start text-left", className)}
        >
          {children}
        </Button>
      }
    />
  );
}

// ------------------------------------------------
// CONTENT
// ------------------------------------------------

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <BaseAccordion.Content
      {...props}
      className={cn(
        "overflow-hidden",
        "h-0 data-open:h-(--accordion-content-height)",
        "transition-all duration-200 ease-in-out",
        className,
      )}
    >
      {children}
    </BaseAccordion.Content>
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};

export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps,
};
