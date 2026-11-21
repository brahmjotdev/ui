// ------------------------------------------------
// TYPES
// ------------------------------------------------

type DemoRootProps = React.ComponentProps<"div">;

interface DemoPreviewProps extends React.ComponentProps<"div"> {
  demo: React.ReactNode;
}

// ------------------------------------------------
// DEMO ROOT
// ------------------------------------------------

function DemoRoot({ className, children, ...props }: DemoRootProps) {
  return (
    <div data-docs-demo className={className} {...props}>
      {children}
    </div>
  );
}

// ------------------------------------------------
// DEMO PREVIEW
// ------------------------------------------------

function DemoPreview({ demo, className, ...props }: DemoPreviewProps) {
  return (
    <div data-demo-preview className={className} {...props}>
      {demo}
    </div>
  );
}

// ------------------------------------------------
// DEMO
// ------------------------------------------------

export { DemoRoot, DemoPreview };
