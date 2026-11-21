// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { ChevronDown } from "lucide-react";

import { Collapsible } from "@/cli/components";
import type {
  DocsAPI,
  DocsAPIA11y,
  DocsAPIAttr,
  DocsAPIProp,
} from "../types";
import { APIName, TypeTokens } from "./type-tokens";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface APIRefProps {
  api: DocsAPI | DocsAPI[];
}

// ------------------------------------------------
// DETAIL
// ------------------------------------------------

function APIDetail({ children }: { children: ReactNode }) {
  return <div data-api-detail>{children}</div>;
}

// ------------------------------------------------
// CONTENT WRAP
// ------------------------------------------------

function APIContentWrap({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div data-api-content-wrap>
      <div data-api-content-label>{label}</div>
      <div data-api-content-value>{children}</div>
    </div>
  );
}

// ------------------------------------------------
// CARD
// ------------------------------------------------

function APICard({ children }: { children: ReactNode }) {
  return <div data-api-card>{children}</div>;
}

function APICardHeader({ label }: { label: string }) {
  return (
    <div data-api-card-header>
      <span>{label}</span>
    </div>
  );
}

function APIListCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <APICard>
      <APICardHeader label={label} />
      {children}
    </APICard>
  );
}

// ------------------------------------------------
// ROW
// ------------------------------------------------

function APIRow({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <Collapsible.Root data-api-row>
      <Collapsible.Trigger data-api-trigger className="group">
        <APIName name={name} />
        <ChevronDown data-api-chevron aria-hidden />
      </Collapsible.Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
}

function APIRowContent({ children }: { children: ReactNode }) {
  return <div data-api-row-content>{children}</div>;
}

// ------------------------------------------------
// DESCRIPTION BODY (attrs / a11y / cssVars)
// ------------------------------------------------

function isTypeLikeDescription(value: string): boolean {
  return /["'|]/.test(value);
}

function isFragmentNode(
  node: ReactNode,
): node is ReactElement<{ children?: ReactNode }> {
  return isValidElement(node) && node.type === Fragment;
}

function renderDescription(description: ReactNode): ReactNode {
  if (description == null || description === false || description === "") {
    return "—";
  }

  if (typeof description === "string") {
    return isTypeLikeDescription(description) ? (
      <TypeTokens type={description} />
    ) : (
      <APIDetail>{description}</APIDetail>
    );
  }

  if (isFragmentNode(description)) {
    const parts = Children.toArray(description.props.children).filter(
      (part) => !(typeof part === "string" && part.trim() === ""),
    );

    if (parts.length === 0) return "—";
    if (parts.length === 1) return renderDescription(parts[0]);

    return parts.map((part, index) => (
      <Fragment key={index}>{renderDescription(part)}</Fragment>
    ));
  }

  return <APIDetail>{description}</APIDetail>;
}

function APIDescriptionBody({ description }: { description?: ReactNode }) {
  return renderDescription(description);
}

// ------------------------------------------------
// PROP ROW
// ------------------------------------------------

function APIPropRow({ prop }: { prop: DocsAPIProp }) {
  const defaultValue =
    prop.defaultValue !== undefined
      ? String(prop.defaultValue)
      : prop.type === "boolean"
        ? "false"
        : undefined;

  return (
    <APIRow name={prop.name}>
      <APIRowContent>
        <APIContentWrap label="Name:">
          <APIName name={prop.name} />
        </APIContentWrap>
        <APIContentWrap label="Type:">
          <TypeTokens type={prop.type} />
        </APIContentWrap>
        <APIContentWrap label="Default Value:">
          {defaultValue !== undefined ? (
            <TypeTokens type={defaultValue} />
          ) : (
            "—"
          )}
        </APIContentWrap>
        <APIContentWrap label="Required:">
          {prop.required ? "Yes" : "No"}
        </APIContentWrap>
        {prop.description ? (
          <APIContentWrap label="Description:">
            <APIDetail>{prop.description}</APIDetail>
          </APIContentWrap>
        ) : null}
      </APIRowContent>
    </APIRow>
  );
}

// ------------------------------------------------
// PROP CARD
// ------------------------------------------------

function APIPropCard({ api }: { api: DocsAPI }) {
  const styled = api.props.styled ?? [];
  const headless = api.props.headless ?? [];
  const props = [...styled, ...headless];

  if (props.length === 0) return null;

  return (
    <APIListCard label="Props">
      <div data-api-props>
        {styled.map((prop) => (
          <APIPropRow key={`styled-${prop.name}`} prop={prop} />
        ))}
        {headless.map((prop) => (
          <APIPropRow key={`headless-${prop.name}`} prop={prop} />
        ))}
      </div>
    </APIListCard>
  );
}

// ------------------------------------------------
// ATTR ROW
// ------------------------------------------------

function APIAttrChildrenList({ attrs }: { attrs: DocsAPIAttr[] }) {
  return (
    <APIDetail>
      <ul data-api-attr-list>
        {attrs.map((attr) => (
          <li key={attr.name}>
            <code>{attr.name}</code>
            {attr.description != null && attr.description !== false ? (
              <>
                :{" "}
                {typeof attr.description === "string" &&
                isTypeLikeDescription(attr.description) ? (
                  <TypeTokens type={attr.description} />
                ) : (
                  attr.description
                )}
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </APIDetail>
  );
}

function APIAttrRow({ attr }: { attr: DocsAPIAttr }) {
  const children = attr.children ?? [];

  return (
    <APIRow name={attr.name}>
      <APIRowContent>
        {children.length > 0 ? (
          <APIAttrChildrenList attrs={children} />
        ) : (
          <APIDescriptionBody description={attr.description} />
        )}
      </APIRowContent>
    </APIRow>
  );
}

// ------------------------------------------------
// ATTR CARD
// ------------------------------------------------

function APIAttrCard({ api }: { api: DocsAPI }) {
  const attrs = api.attrs ?? [];

  if (attrs.length === 0) return null;

  return (
    <APIListCard label="Attrs">
      <div data-api-attrs>
        {attrs.map((attr) => (
          <APIAttrRow key={attr.name} attr={attr} />
        ))}
      </div>
    </APIListCard>
  );
}

// ------------------------------------------------
// A11Y ROW
// ------------------------------------------------

function APIA11yRow({ a11y }: { a11y: DocsAPIA11y }) {
  return (
    <APIRow name={a11y.name}>
      <APIRowContent>
        <APIDescriptionBody description={a11y.description} />
      </APIRowContent>
    </APIRow>
  );
}

// ------------------------------------------------
// A11Y CARD
// ------------------------------------------------

function APIA11yCard({ api }: { api: DocsAPI }) {
  const items = api.a11y ?? [];

  if (items.length === 0) return null;

  return (
    <APIListCard label="A11y">
      <div data-api-a11y>
        {items.map((item) => (
          <APIA11yRow key={item.name} a11y={item} />
        ))}
      </div>
    </APIListCard>
  );
}

// ------------------------------------------------
// PART
// ------------------------------------------------

function APIPart({ api }: { api: DocsAPI }) {
  return (
    <div data-api-part>
      <h3 data-api-part-heading>
        <span>
          &lt;
          <span data-api-part-name>{api.name}</span>
          &gt;
        </span>
        <span>|</span>
        <span data-api-part-tag-wrap>
          &lt;
          <span data-api-part-tag>{api.tag}</span>
          &gt;
        </span>
      </h3>
      <APIPropCard api={api} />
      <APIAttrCard api={api} />
      <APIA11yCard api={api} />
    </div>
  );
}

// ------------------------------------------------
// API REF
// ------------------------------------------------

export function APIRef({ api }: APIRefProps) {
  const parts = Array.isArray(api) ? api : [api];

  return (
    <div data-docs-api>
      {parts.map((part) => (
        <APIPart key={part.name} api={part} />
      ))}
    </div>
  );
}
