// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from "@cerevialabs/ui/components";

import { Loader2 } from "lucide-react";
import { cn } from "cn";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface SharedButtonProps extends BaseButtonProps {
  loadingText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonProps =
  | ({ iconOnly?: false } & SharedButtonProps)
  | ({ iconOnly: true; "aria-label": string } & SharedButtonProps);

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

function Button({
  loading = false,
  loadingText = "Loading...",
  variant,
  size = "md",
  iconOnly = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      {...props}
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly}
      loading={loading}
      disabled={disabled || loading}
      className={cn(
        // BASE
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent font-medium whitespace-nowrap focus-visible:z-button",
        // VARIANTS
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-offset-3",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        variant === "outline" &&
          "border-border bg-transparent shadow-xs hover:bg-secondary/50",
        variant === "ghost" &&
          "bg-transparent text-foreground/85 hover:bg-secondary/50",
        variant === "danger" &&
          "border-danger/5 bg-danger/5 text-danger hover:bg-danger/10 focus-visible:ring-danger/50 focus-visible:ring-offset-3",
        // SIZES (text)
        !iconOnly && size === "xs" && "h-7 gap-1 px-2 py-1 text-xs",
        !iconOnly &&
          size === "sm" &&
          "h-8 gap-1.5 px-2.5 py-1.5 text-[0.8125rem]",
        !iconOnly && size === "md" && "h-9 gap-2 px-3 py-2 text-sm",
        !iconOnly && size === "lg" && "h-10 gap-2.5 px-3.5 py-2.5 text-base",
        // SIZES (icon only)
        iconOnly && size === "xs" && "size-7",
        iconOnly && size === "sm" && "size-8",
        iconOnly && size === "md" && "size-9",
        iconOnly && size === "lg" && "size-10",
        "transition-all duration-200 ease-in-out",
        className,
      )}
    >
      {loading ? (
        iconOnly ? (
          <Loader2 className="animate-spin" aria-hidden />
        ) : (
          loadingText
        )
      ) : (
        children
      )}
    </BaseButton>
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { Button };

export type { ButtonProps, ButtonVariant, ButtonSize };
