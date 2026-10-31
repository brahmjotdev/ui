// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  Collapsible as BaseCollapsible,
  type CollapsibleContentProps as BaseCollapsibleContentProps,
  type CollapsibleRootProps as BaseCollapsibleRootProps,
  type CollapsibleTriggerProps as BaseCollapsibleTriggerProps,
} from "@cerevialabs/ui/components";

import { Button, type ButtonProps } from "./button";
import { cn } from "cn";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type CollapsibleRootProps = BaseCollapsibleRootProps;
type CollapsibleTriggerProps = BaseCollapsibleTriggerProps & ButtonProps;
type CollapsibleContentProps = BaseCollapsibleContentProps;

// ------------------------------------------------
// PARTS
// ------------------------------------------------

function CollapsibleRoot({ className, ...props }: CollapsibleRootProps) {
  return (
    <BaseCollapsible.Root
      {...props}
      className={cn("flex flex-col", className)}
    />
  );
}

function CollapsibleTrigger({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      {...props}
      render={
        <Button
          variant={variant}
          size={size}
          className={cn("justify-start", className)}
        >
          {children}
        </Button>
      }
    />
  );
}

function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  return (
    <BaseCollapsible.Content
      {...props}
      className={cn(
        "overflow-hidden",
        "h-0 data-open:h-(--collapsible-content-height)", // default - height only
        // "w-0 data-open:w-(--collapsible-content-width)", // if you want to animate the width
        "transition-all duration-200 ease-in-out",
        className,
      )}
    >
      {children}
    </BaseCollapsible.Content>
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
};

export type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
};
