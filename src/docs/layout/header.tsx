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
    <div data-docs-header className={className} {...props}>
      <h1 data-header-title>{title}</h1>
      <p data-header-description>{description}</p>
    </div>
  );
}
