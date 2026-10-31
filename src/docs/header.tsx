// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { cn } from "cn";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface DocsHeaderProps extends React.ComponentProps<"div"> {
  title: string;
  description: string;
}

// ------------------------------------------------
// HEADER
// ------------------------------------------------

export function DocsHeader({
  title,
  description,
  className,
  ...props
}: DocsHeaderProps) {
  return (
    <div
      data-docs-header
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      <h1 data-header-title className="font-bold">
        {title}
      </h1>
      <p data-header-description className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
