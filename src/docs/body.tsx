// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { cn } from "cn";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type DocsBodyProps = React.ComponentProps<"div">;

// ------------------------------------------------
// BODY
// ------------------------------------------------

export function DocsBody({ className, ...props }: DocsBodyProps) {
  return (
    <div
      data-docs-body
      className={cn("flex flex-col gap-12", className)}
      {...props}
    />
  );
}
