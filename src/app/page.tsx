// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

import { Button } from "@/cli/components";
import Link from "next/link";
import { Docs } from "@/docs";

// ------------------------------------------------
// PAGE
// ------------------------------------------------

export default function HomePage() {
  return (
    <Docs.Page className="flex-col items-center">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <h1 className="display">
          Every component you need. None of the opinions.
        </h1>
        <p className="text-lg font-medium text-muted-foreground">
          A growing collection of 80+ headless, unstyled components. We handle
          the structure, behavior, and accessibility, so you can focus on
          building interfaces entirely your way.
        </p>
        <div className="mt-2 flex gap-2">
          <Button
            variant="secondary"
            className="rounded-full px-4"
            render={<Link href="/playground">Access playground</Link>}
          />
          <Button
            variant="primary"
            className="rounded-full px-4"
            render={<Link href="/overview/introduction">Get started</Link>}
          />
        </div>
      </div>
    </Docs.Page>
  );
}
