// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type Ref,
  type RefCallback,
} from "react";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type RefCleanup = () => void;

interface RefBinding<T> {
  ref: Ref<T>;
  cleanup: RefCleanup | void;
}

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

// SAME REF LIST
// checks if the previous and next ref lists are the same

function sameRefList<T>(
  previous: readonly (Ref<T> | undefined)[],
  next: readonly (Ref<T> | undefined)[],
) {
  if (previous.length !== next.length) return false;

  for (let index = 0; index < previous.length; index += 1) {
    if (!Object.is(previous[index], next[index])) return false;
  }

  return true;
}

// BIND REF
// binds a ref to a value and returns a cleanup function

function bindRef<T>(ref: NonNullable<Ref<T>>, value: T): RefCleanup | void {
  if (typeof ref === "function") {
    const cleanup = ref(value);
    if (typeof cleanup === "function") return cleanup;
    return () => {
      ref(null);
    };
  }

  ref.current = value;
  return () => {
    ref.current = null;
  };
}

// RELEASE BINDINGS
// releases all bindings for the given ref list

function releaseBindings<T>(bindings: RefBinding<T>[]) {
  for (const binding of bindings) binding.cleanup?.();
}

// COMMIT BINDINGS
// commits the bindings to the refs and creates new bindings for new refs

function commitBindings<T>(
  bindingsRef: { current: RefBinding<T>[] },
  nextRefs: readonly (Ref<T> | undefined)[],
  node: T,
) {
  const previous = bindingsRef.current;
  const next: RefBinding<T>[] = [];
  const kept = new Set<Ref<T>>();

  for (const ref of nextRefs) {
    if (ref == null || kept.has(ref)) continue;

    const existing = previous.find((binding) => Object.is(binding.ref, ref));
    if (existing) {
      next.push(existing);
    } else {
      next.push({ ref, cleanup: bindRef(ref, node) });
    }
    kept.add(ref);
  }

  for (const binding of previous) {
    if (!kept.has(binding.ref)) binding.cleanup?.();
  }

  bindingsRef.current = next;
}

// ------------------------------------------------
// UTIL: MERGE REFS
// ------------------------------------------------

export function useMergeRefs<T>(
  refs: readonly (Ref<T> | undefined)[],
): RefCallback<T> {
  const refsRef = useRef(refs);
  const nodeRef = useRef<T | null>(null);
  const bindingsRef = useRef<RefBinding<T>[]>([]);

  useLayoutEffect(() => {
    const previous = refsRef.current;
    refsRef.current = refs;
    const node = nodeRef.current;
    if (node == null || sameRefList(previous, refs)) return;
    commitBindings(bindingsRef, refs, node);
  });

  return useCallback((node: T | null) => {
    if (node == null) {
      nodeRef.current = null;
      releaseBindings(bindingsRef.current);
      bindingsRef.current = [];
      return;
    }

    nodeRef.current = node;
    commitBindings(bindingsRef, refsRef.current, node);

    return () => {
      nodeRef.current = null;
      releaseBindings(bindingsRef.current);
      bindingsRef.current = [];
    };
  }, []);
}
