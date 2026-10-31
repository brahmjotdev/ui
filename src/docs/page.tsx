// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { cn } from "cn";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type DocsPageProps = React.ComponentProps<"div">;

// ------------------------------------------------
// PAGE
// ------------------------------------------------

export function DocsPage({ className, children, ...props }: DocsPageProps) {
  return (
    <div
      data-docs-page
      className={cn("flex min-h-full flex-col gap-16 p-16", className)}
      {...props}
    >
      {children}
    </div>
  );
}
