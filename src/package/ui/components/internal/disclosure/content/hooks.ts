// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import { useLayoutEffect, type RefObject } from "react";

import { useDisclosureContext } from "../context";
import { disclosureContentA11y } from "./a11y";
import { disclosureContentAttrs } from "./attrs";
import type { DisclosureContentSizeCssVars } from "./types";
import { measureContentSize } from "./utils";

import { presenceShouldRender, usePresence } from "../../../../utils";

// ------------------------------------------------
// CONSTANTS
// ------------------------------------------------

const defaultDisclosureContentSizeCssVars: DisclosureContentSizeCssVars = {
  width: "--disclosure-content-width",
  height: "--disclosure-content-height",
};

// ------------------------------------------------
// HOOKS
// ------------------------------------------------

function useDisclosureContentState({
  keepMounted = false,
}: {
  keepMounted?: boolean;
} = {}) {
  const { open, contentId } = useDisclosureContext();
  const { ref: presenceRef, mounted, presenceStates } = usePresence(open);

  return {
    open,
    mounted,
    presenceRef,
    shouldRender: presenceShouldRender(open, mounted, keepMounted),
    a11y: disclosureContentA11y({ contentId }),
    attrs: disclosureContentAttrs(presenceStates),
    inert: open ? undefined : true,
  };
}

function useDisclosureContentSize({
  open,
  mounted,
  shouldRender,
  elementRef,
  sizeCssVars = defaultDisclosureContentSizeCssVars,
}: {
  open: boolean;
  mounted: boolean;
  shouldRender: boolean;
  elementRef: RefObject<HTMLElement | null>;
  sizeCssVars?: DisclosureContentSizeCssVars;
}) {
  const widthVar = sizeCssVars.width;
  const heightVar = sizeCssVars.height;

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || !shouldRender) return undefined;

    function updateSize() {
      if (!element) return;
      const hasMeasured = element.style.getPropertyValue(heightVar) !== "";
      if (hasMeasured && element.hasAttribute("data-animating")) return;

      const { width, height } = measureContentSize(element);
      // Keep last good vars when a later pass can't layout (e.g. display:none).
      if (width === 0 && height === 0 && hasMeasured) return;

      const nextWidth = `${width}px`;
      const nextHeight = `${height}px`;

      if (element.style.getPropertyValue(widthVar) !== nextWidth) {
        element.style.setProperty(widthVar, nextWidth);
      }
      if (element.style.getPropertyValue(heightVar) !== nextHeight) {
        element.style.setProperty(heightVar, nextHeight);
      }
    }

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateSize);
    const observed = new Set<Element>();

    function syncObserved() {
      if (!element || !resizeObserver) return;
      const current = new Set<Element>(element.children);
      for (const child of observed) {
        if (!current.has(child)) {
          resizeObserver.unobserve(child);
          observed.delete(child);
        }
      }
      for (const child of current) {
        if (!observed.has(child)) {
          resizeObserver.observe(child);
          observed.add(child);
        }
      }
    }

    syncObserved();
    updateSize();

    const mutationObserver = new MutationObserver((records) => {
      if (records.some((record) => record.type === "childList")) {
        syncObserved();
      }
      updateSize();
    });
    mutationObserver.observe(element, {
      childList: true,
      attributes: true,
      attributeFilter: ["data-animating"],
    });

    return () => {
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
    };
  }, [open, mounted, shouldRender, elementRef, widthVar, heightVar]);
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export {
  defaultDisclosureContentSizeCssVars,
  useDisclosureContentSize,
  useDisclosureContentState,
};
