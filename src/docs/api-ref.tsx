// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import type { ReactNode } from "react";

import { Collapsible } from "@/cli/components";
import type {
  DocsAPI,
  DocsAPIAttr,
  DocsAPIA11y,
  DocsAPICssVar,
  DocsAPIProp,
} from "./types";
import { PropName, TypeTokens } from "./type-tokens";

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function resolveDefaultValue(
  prop: DocsAPIProp,
): string | boolean | number | undefined {
  if (prop.defaultValue !== undefined) return prop.defaultValue;
  if (prop.type === "boolean") return false;
  return undefined;
}

function APIDetail({ children }: { children: ReactNode }) {
  return <div className="docs-api-detail">{children}</div>;
}

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface APIRefProps {
  api: DocsAPI | DocsAPI[];
}

// ------------------------------------------------
// PROP ROW
// ------------------------------------------------

function APIPropRow({ prop }: { prop: DocsAPIProp }) {
  const defaultValue = resolveDefaultValue(prop);

  return (
    <Collapsible.Root data-prop-row className="docs-api-row">
      <Collapsible.Trigger className="docs-api-trigger">
        <span data-prop-name>
          <PropName name={prop.name} />
        </span>
        <span data-prop-type>
          <TypeTokens type={prop.type} />
        </span>
        <span data-prop-default>
          {defaultValue === undefined ? "—" : String(defaultValue)}
        </span>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="docs-api-panel">
          {prop.detail && <APIDetail>{prop.detail}</APIDetail>}
          <span className="docs-api-required">
            <span className="font-medium">Required:</span>
            <span>{prop.required ? "Yes" : "No"}</span>
          </span>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

// ------------------------------------------------
// ATTR / A11Y / CSS VAR ROWS
// ------------------------------------------------

function APIAttrRow({ attr }: { attr: DocsAPIAttr }) {
  if (attr.children && attr.children.length > 0) {
    return (
      <Collapsible.Root data-attr-row className="docs-api-row">
        <Collapsible.Trigger className="docs-api-trigger">
          <span data-attr-name>
            <PropName name={attr.name} />
          </span>
          <span className="docs-api-description">
            {attr.description ?? "—"}
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className="docs-api-panel">
            {attr.detail && <APIDetail>{attr.detail}</APIDetail>}
            {attr.children.map((child) =>
              child.detail ? (
                <Collapsible.Root key={child.name} className="docs-api-row">
                  <Collapsible.Trigger className="docs-api-trigger">
                    <span data-attr-name>
                      <PropName name={child.name} />
                    </span>
                    <span className="docs-api-description">
                      {child.description ?? "—"}
                    </span>
                  </Collapsible.Trigger>
                  <Collapsible.Content>
                    <div className="docs-api-panel-compact">
                      <APIDetail>{child.detail}</APIDetail>
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              ) : (
                <div key={child.name} className="docs-api-row-child">
                  <span data-attr-name>
                    <PropName name={child.name} />
                  </span>
                  <span className="docs-api-span-2">
                    {child.description ?? "—"}
                  </span>
                </div>
              ),
            )}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  if (attr.detail) {
    return (
      <Collapsible.Root data-attr-row className="docs-api-row">
        <Collapsible.Trigger className="docs-api-trigger">
          <span data-attr-name>
            <PropName name={attr.name} />
          </span>
          <span className="docs-api-description">
            {attr.description ?? "—"}
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className="docs-api-panel-detail">
            <APIDetail>{attr.detail}</APIDetail>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <div data-attr-row className="docs-api-row-flat">
      <div data-attr-name>
        <PropName name={attr.name} />
      </div>
      <div className="docs-api-span-2">{attr.description ?? "—"}</div>
    </div>
  );
}

function APIA11yRow({ item }: { item: DocsAPIA11y }) {
  if (item.detail) {
    return (
      <Collapsible.Root data-a11y-row className="docs-api-row">
        <Collapsible.Trigger className="docs-api-trigger">
          <span data-a11y-name>
            <PropName name={item.name} />
          </span>
          <span className="docs-api-description">
            {item.description ?? "—"}
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className="docs-api-panel-detail">
            <APIDetail>{item.detail}</APIDetail>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <div data-a11y-row className="docs-api-row-flat">
      <div data-a11y-name>
        <PropName name={item.name} />
      </div>
      <div className="docs-api-span-2">{item.description ?? "—"}</div>
    </div>
  );
}

function APICssVarRow({ item }: { item: DocsAPICssVar }) {
  if (item.detail) {
    return (
      <Collapsible.Root data-css-var-row className="docs-api-row">
        <Collapsible.Trigger className="docs-api-trigger">
          <span data-css-var-name>
            <PropName name={item.name} />
          </span>
          <span className="docs-api-description">
            {item.description ?? "—"}
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className="docs-api-panel-detail">
            <APIDetail>{item.detail}</APIDetail>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <div data-css-var-row className="docs-api-row-flat">
      <div data-css-var-name>
        <PropName name={item.name} />
      </div>
      <div className="docs-api-span-2">{item.description ?? "—"}</div>
    </div>
  );
}

// ------------------------------------------------
// CARD
// ------------------------------------------------

function APICard({ api }: { api: DocsAPI }) {
  const styled = api.props.styled ?? [];
  const headless = api.props.headless ?? [];
  const attrs = api.attrs ?? [];
  const a11y = api.a11y ?? [];
  const cssVars = api.cssVars ?? [];

  return (
    <>
      <div data-api-card className="docs-api-card">
        <div className="docs-api-card-header">
          <span>Prop</span>
          <span>Type</span>
          <span>Default value</span>
        </div>
        <div>
          {styled.map((prop) => (
            <APIPropRow key={`styled-${prop.name}`} prop={prop} />
          ))}
          {headless.map((prop) => (
            <APIPropRow key={`headless-${prop.name}`} prop={prop} />
          ))}
        </div>
      </div>

      {attrs.length > 0 && (
        <div data-api-card className="docs-api-card">
          <div className="docs-api-card-header">
            <span>Attr</span>
            <span className="docs-api-span-2">Description</span>
          </div>
          {attrs.map((attr) => (
            <APIAttrRow key={attr.name} attr={attr} />
          ))}
        </div>
      )}

      {a11y.length > 0 && (
        <div data-api-card className="docs-api-card">
          <div className="docs-api-card-header">
            <span>A11y</span>
            <span className="docs-api-span-2">Description</span>
          </div>
          {a11y.map((item) => (
            <APIA11yRow key={item.name} item={item} />
          ))}
        </div>
      )}

      {cssVars.length > 0 && (
        <div data-api-card className="docs-api-card">
          <div className="docs-api-card-header">
            <span>CSS Variable</span>
            <span className="docs-api-span-2">Description</span>
          </div>
          {cssVars.map((item) => (
            <APICssVarRow key={item.name} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

// ------------------------------------------------
// PART
// ------------------------------------------------

function APIPart({ api }: { api: DocsAPI }) {
  return (
    <div data-api-part className="docs-api-part">
      <h3 className="docs-api-part-heading">
        <span>
          &lt;
          <span className="docs-api-part-name">{api.name}</span>
          &gt;
        </span>
        <span>|</span>
        <span className="docs-api-part-tag-wrap">
          &lt;
          <span className="docs-api-part-tag">{api.tag}</span>
          &gt;
        </span>
      </h3>
      <APICard api={api} />
    </div>
  );
}

// ------------------------------------------------
// API REF
// ------------------------------------------------

export function APIRef({ api }: APIRefProps) {
  const parts = Array.isArray(api) ? api : [api];

  return (
    <div data-docs-api className="docs-api-root">
      {parts.map((part) => (
        <APIPart key={part.name} api={part} />
      ))}
    </div>
  );
}
