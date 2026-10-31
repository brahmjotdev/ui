// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface ContentSize {
  width: number;
  height: number;
}

// ------------------------------------------------
// UTILS
// ------------------------------------------------

function px(value: string): number {
  return parseFloat(value) || 0;
}

function isInFlow(style: CSSStyleDeclaration) {
  if (style.display === "none" || style.display === "contents") return false;
  if (style.position === "absolute" || style.position === "fixed") return false;
  return true;
}

function measureWithUnlock(element: HTMLElement): ContentSize {
  const previousWidth = element.style.width;
  const previousHeight = element.style.height;

  element.style.width = "auto";
  element.style.height = "auto";
  const size = {
    width: element.scrollWidth,
    height: element.scrollHeight,
  };
  element.style.width = previousWidth;
  element.style.height = previousHeight;
  return size;
}

function measureFromChildren(element: HTMLElement): ContentSize | null {
  let top = Infinity;
  let bottom = -Infinity;
  let width = 0;

  for (const child of element.children) {
    if (!(child instanceof HTMLElement)) continue;
    const style = getComputedStyle(child);
    if (!isInFlow(style)) continue;

    const rect = child.getBoundingClientRect();
    top = Math.min(top, rect.top - px(style.marginTop));
    bottom = Math.max(bottom, rect.bottom + px(style.marginBottom));
    width = Math.max(
      width,
      rect.width + px(style.marginLeft) + px(style.marginRight),
    );
  }

  if (top === Infinity || width < 1) return null;

  return {
    width,
    height: bottom - top,
  };
}

function measureContentSize(element: HTMLElement): ContentSize {
  const size =
    (element.clientWidth >= 1 ? measureFromChildren(element) : null) ??
    measureWithUnlock(element);

  return {
    width: Math.ceil(size.width - 0.01),
    height: Math.ceil(size.height - 0.01),
  };
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { measureContentSize };
export type { ContentSize };
