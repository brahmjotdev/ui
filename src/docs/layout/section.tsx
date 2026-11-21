// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface SectionProps extends React.ComponentProps<"section"> {
  id: string;
  title: string;
}

// ------------------------------------------------
// SECTION
// ------------------------------------------------

export function Section({
  id,
  title,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section id={id} data-docs-section className={className} {...props}>
      <h2 data-section-title>{title}</h2>
      {children}
    </section>
  );
}
