// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  Children,
  cloneElement,
  createElement,
  isValidElement,
  type ComponentPropsWithRef,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

import { mergeProps } from "./merge-props";
import { useMergeRefs } from "./merge-refs";
import { toKebabCase } from "./to-kebab-case";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type HTMLProps = HTMLAttributes<HTMLElement> & {
  ref?: Ref<HTMLElement>;
};

type ComponentRenderFn<RenderFunctionProps, State> = (
  props: RenderFunctionProps,
  state: State,
) => ReactElement;

type UseRenderRenderProp<State = Record<string, unknown>> =
  | ReactElement
  | ComponentRenderFn<HTMLProps, State>;

type UseRenderComponentProps<
  ElementTypeName extends ElementType,
  State = Record<string, unknown>,
  RenderFunctionProps = HTMLProps,
> = ComponentPropsWithRef<ElementTypeName> & {
  render?: ReactElement | ComponentRenderFn<RenderFunctionProps, State>;
};

interface UseRenderParameters<
  State,
  RenderedElementType extends Element,
  Enabled extends boolean | undefined,
> {
  defaultTagName?: keyof React.JSX.IntrinsicElements;
  ref?: Ref<RenderedElementType> | Ref<RenderedElementType>[];
  render?: UseRenderRenderProp<State>;
  state?: State;
  enabled?: Enabled;
  props?: Record<string, unknown>;
}

type UseRenderReturnValue<Enabled extends boolean | undefined> =
  Enabled extends false ? null : ReactElement;

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

const REACT_LAZY_TYPE = Symbol.for("react.lazy");

// GET ELEMENT REF
// gets the ref from the element

function getElementRef(element: ReactElement): Ref<unknown> | undefined {
  const props = element.props as { ref?: Ref<unknown> };
  if (props.ref !== undefined) return props.ref;

  const legacy = element as ReactElement & { ref?: Ref<unknown> };
  return legacy.ref;
}

// UNWRAP LAZY RENDER PROP
// unwraps the lazy render prop if it is a lazy component

function unwrapLazyRenderProp<State extends Record<string, unknown>>(
  render?: UseRenderRenderProp<State>,
): UseRenderRenderProp<State> | undefined {
  if ((render as { $$typeof?: symbol })?.$$typeof !== REACT_LAZY_TYPE) {
    return render;
  }

  const unwrapped = Children.toArray(render as React.ReactNode)[0];
  return isValidElement(unwrapped) ? (unwrapped as ReactElement) : render;
}

// RENDER COMPONENT IDENTITY
// gets the identity of the rendered component

function renderComponentIdentity(element: ReactElement): string {
  const type = element.type;

  if (typeof type === "string") return type;

  if (
    typeof type === "function" ||
    (typeof type === "object" && type !== null)
  ) {
    const named = type as { displayName?: string; name?: string };
    const raw = named.displayName || named.name || "";
    const trimmed = String(raw).replace(/Component$/, "");
    return trimmed ? toKebabCase(trimmed) : "custom";
  }

  return "custom";
}

// STAMP RENDER HOST IDENTITY
// stamps the render host identity onto the props

function stampRenderHostIdentity(
  props: Record<string, unknown>,
  defaultTagName: keyof React.JSX.IntrinsicElements,
  renderedComponent: string,
): void {
  props["data-original-element"] = defaultTagName;
  props["data-rendered-component"] = renderedComponent;
}

// EVALUATE RENDER PROP
// evaluates the render prop and returns the result

function evaluateRenderProp<State extends Record<string, unknown>>(
  defaultTagName: keyof React.JSX.IntrinsicElements,
  resolved: UseRenderRenderProp<State> | undefined,
  props: HTMLProps,
  state: State,
): ReactElement {
  if (typeof resolved === "function") {
    const element = resolved(props, state);
    if (!isValidElement(element)) return element;

    const stamped = {
      ...(element.props as Record<string, unknown>),
    };
    stampRenderHostIdentity(
      stamped,
      defaultTagName,
      renderComponentIdentity(element),
    );
    return cloneElement(element, stamped);
  }

  if (isValidElement(resolved)) {
    const renderProps = resolved.props as Record<string, unknown>;
    const merged = mergeProps(props, renderProps) as Record<string, unknown>;
    merged.ref = props.ref;
    stampRenderHostIdentity(
      merged,
      defaultTagName,
      renderComponentIdentity(resolved),
    );
    return cloneElement(resolved, merged);
  }

  return createElement(defaultTagName, props);
}

// COLLECT RENDER REFS
// collects the refs from the render prop

function collectRenderRefs<
  State extends Record<string, unknown>,
  RenderedElementType extends Element,
>(
  props: HTMLProps,
  resolvedRender?: UseRenderRenderProp<State>,
  ref?: Ref<RenderedElementType> | Ref<RenderedElementType>[],
): Ref<RenderedElementType>[] {
  const refs: Ref<RenderedElementType>[] = [];

  if (props.ref) {
    refs.push(props.ref as Ref<RenderedElementType>);
  }

  if (isValidElement(resolvedRender)) {
    const elementRef = getElementRef(resolvedRender);
    if (elementRef) {
      refs.push(elementRef as Ref<RenderedElementType>);
    }
  }

  if (ref) {
    if (Array.isArray(ref)) {
      for (const r of ref) {
        if (r) refs.push(r);
      }
    } else {
      refs.push(ref);
    }
  }

  return refs;
}

// ------------------------------------------------
// UTIL: USE RENDER
// ------------------------------------------------

function useRender<
  State extends Record<string, unknown> = Record<string, unknown>,
  RenderedElementType extends Element = Element,
  Enabled extends boolean | undefined = undefined,
>(
  params: UseRenderParameters<State, RenderedElementType, Enabled>,
): UseRenderReturnValue<Enabled> {
  const {
    defaultTagName = "div",
    ref,
    render,
    state = {} as State,
    enabled = true as Enabled,
    props: propsParam,
  } = params;

  const props = { ...(propsParam ?? {}) } as HTMLProps;
  const resolvedRender = unwrapLazyRenderProp(render);
  const refs = collectRenderRefs(props, resolvedRender, ref);
  const mergedRef = useMergeRefs(refs);

  if (enabled === false) {
    return null as UseRenderReturnValue<Enabled>;
  }

  if (refs.length > 0) {
    props.ref = mergedRef as Ref<HTMLElement>;
  }

  return evaluateRenderProp(
    defaultTagName,
    resolvedRender,
    props,
    state,
  ) as UseRenderReturnValue<Enabled>;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { useRender };
export type { UseRenderComponentProps };
