// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Docs } from "@/docs";

import { collapsibleAPI } from "./api";
import { CollapsibleDemo } from "./demo";

// ------------------------------------------------
// PAGE
// ------------------------------------------------

export default function CollapsiblePage() {
  return (
    <Docs.Page>
      <Docs.Header
        title="Collapsible"
        description="Reveals or hides content on demand to keep interfaces organised and clutter-free."
      />
      <Docs.Body>
        <Docs.Section id="demo" title="Demo">
          <Docs.Demo.Root>
            <Docs.Demo.Preview
              demo={<CollapsibleDemo />}
              className="items-center justify-center"
            />
          </Docs.Demo.Root>
        </Docs.Section>
        <Docs.Section id="api" title="API Reference">
          <Docs.API api={collapsibleAPI} />
        </Docs.Section>
      </Docs.Body>
      <Docs.Footer />
    </Docs.Page>
  );
}
