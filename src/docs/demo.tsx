// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { cn } from "cn";

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
    <div
      data-demo
      className={cn("rounded-2xl border", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ------------------------------------------------
// DEMO PREVIEW
// ------------------------------------------------

function DemoPreview({ demo, className, ...props }: DemoPreviewProps) {
  return (
    <div
      data-demo-preview
      className={cn("flex min-h-64 p-8", className)}
      {...props}
    >
      {demo}
    </div>
  );
}

// ------------------------------------------------
// DEMO CONTROLS
// ------------------------------------------------

function DemoControls() {
  return <div data-demo-controls></div>;
}

// ------------------------------------------------
// DEMO CODE
// ------------------------------------------------

function DemoCode() {
  return <div data-demo-code></div>;
}

// ------------------------------------------------
// DEMO
// ------------------------------------------------

export { DemoRoot, DemoPreview, DemoControls, DemoCode };
