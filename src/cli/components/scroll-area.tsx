// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  ScrollArea as BaseScrollArea,
  type ScrollAreaRootProps as BaseScrollAreaRootProps,
  type ScrollAreaContentProps as BaseScrollAreaContentProps,
  type ScrollAreaScrollbarProps as BaseScrollAreaScrollbarProps,
  type ScrollAreaThumbProps as BaseScrollAreaThumbProps,
  type ScrollAreaCornerProps as BaseScrollAreaCornerProps,
} from "@cerevialabs/ui/components";

import { cn } from "cn";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type ScrollAreaRootProps = BaseScrollAreaRootProps;
type ScrollAreaContentProps = BaseScrollAreaContentProps;
type ScrollAreaScrollbarProps = BaseScrollAreaScrollbarProps;
type ScrollAreaThumbProps = BaseScrollAreaThumbProps;
type ScrollAreaCornerProps = BaseScrollAreaCornerProps;

// ------------------------------------------------
// ROOT
// ------------------------------------------------

function ScrollAreaRoot({
  className,
  children,
  ...props
}: ScrollAreaRootProps) {
  return (
    <BaseScrollArea.Root {...props} className={cn(className)}>
      {children}
    </BaseScrollArea.Root>
  );
}

// ------------------------------------------------
// CONTENT
// ------------------------------------------------

function ScrollAreaContent({
  className,
  children,
  ...props
}: ScrollAreaContentProps) {
  return (
    <BaseScrollArea.Content {...props} className={cn(className)}>
      {children}
    </BaseScrollArea.Content>
  );
}

// ------------------------------------------------
// SCROLLBAR
// ------------------------------------------------

function ScrollAreaScrollbar({
  orientation,
  className,
  children,
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <BaseScrollArea.Scrollbar
      {...props}
      orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "right-0 bottom-0 left-0 h-1"
          : "top-0 right-0 bottom-0 w-1",
        className,
      )}
    >
      {children}
    </BaseScrollArea.Scrollbar>
  );
}

// ------------------------------------------------
// THUMB
// ------------------------------------------------

function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  return (
    <BaseScrollArea.Thumb
      {...props}
      className={cn(
        "rounded bg-foreground/25 hover:bg-foreground/50",
        className,
      )}
    />
  );
}

// ------------------------------------------------
// CORNER
// ------------------------------------------------

function ScrollAreaCorner({ className, ...props }: ScrollAreaCornerProps) {
  return <BaseScrollArea.Corner {...props} className={cn(className)} />;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export const ScrollArea = {
  Root: ScrollAreaRoot,
  Content: ScrollAreaContent,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
};

export type {
  ScrollAreaRootProps,
  ScrollAreaContentProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
};
