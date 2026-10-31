// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { Docs } from "@/docs";

import { buttonAPI } from "./api";
import { ButtonDemo } from "./demo";

// ------------------------------------------------
// PAGE
// ------------------------------------------------

export default function ButtonPage() {
  return (
    <Docs.Page>
      <Docs.Header
        title="Button"
        description="Initiates an action in response to user interaction."
      />
      <Docs.Body>
        <Docs.Section id="demo" title="Demo">
          <Docs.Demo.Root>
            <Docs.Demo.Preview
              demo={<ButtonDemo />}
              className="items-center justify-center"
            />
          </Docs.Demo.Root>
        </Docs.Section>
        <Docs.Section id="api" title="API Reference">
          <Docs.API api={buttonAPI} />
        </Docs.Section>
      </Docs.Body>
      <Docs.Footer />
    </Docs.Page>
  );
}
