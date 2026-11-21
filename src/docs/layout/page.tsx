// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { DocsFooter } from "./footer";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type DocsPageProps = React.ComponentProps<"div">;

// ------------------------------------------------
// PAGE
// ------------------------------------------------

export function DocsPage({ className, children, ...props }: DocsPageProps) {
  return (
    <div data-docs-page className={className} {...props}>
      {children}
      <DocsFooter />
    </div>
  );
}
