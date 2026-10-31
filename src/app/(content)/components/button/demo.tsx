// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { Button } from "@/cli/components";

// ------------------------------------------------
// DEMO
// ------------------------------------------------

export function ButtonDemo() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}
