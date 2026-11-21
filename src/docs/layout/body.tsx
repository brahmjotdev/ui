// ------------------------------------------------
// TYPES
// ------------------------------------------------

type DocsBodyProps = React.ComponentProps<"div">;

// ------------------------------------------------
// BODY
// ------------------------------------------------

export function DocsBody({ className, ...props }: DocsBodyProps) {
  return <div data-docs-body className={className} {...props} />;
}
