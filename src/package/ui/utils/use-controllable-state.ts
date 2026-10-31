// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface UseControllableStateParams<T> {
  value?: T;
  defaultValue: T | (() => T);
  onChange?: (value: T) => void;
}

type UseControllableStateReturn<T> = [T, Dispatch<SetStateAction<T>>];

// ------------------------------------------------
// HOOK
// ------------------------------------------------

export function useControllableState<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): UseControllableStateReturn<T> {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const valueRef = useRef(value);
  const pendingRef = useRef(value);
  const snapTicketRef = useRef(0);
  const isControlledRef = useRef(isControlled);
  const onChangeRef = useRef(onChange);
  const prevControlledRef = useRef(isControlled);

  useLayoutEffect(() => {
    valueRef.current = value;
    pendingRef.current = value;
    isControlledRef.current = isControlled;
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" &&
      prevControlledRef.current !== isControlled
    ) {
      console.error(
        "useControllableState: Switching between controlled and uncontrolled " +
          "is not supported. Decide between `value` / `onChange` (controlled) " +
          "or `defaultValue` (uncontrolled).",
      );
    }
    prevControlledRef.current = isControlled;
  }, [isControlled]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>((next) => {
    const prev = pendingRef.current;
    const nextValue =
      typeof next === "function" ? (next as (prev: T) => T)(prev) : next;

    if (Object.is(prev, nextValue)) return;

    pendingRef.current = nextValue;

    if (!isControlledRef.current) {
      setUncontrolledValue(nextValue);
    }

    onChangeRef.current?.(nextValue);

    const ticket = ++snapTicketRef.current;
    queueMicrotask(() => {
      if (snapTicketRef.current !== ticket) return;
      pendingRef.current = valueRef.current;
    });
  }, []);

  return [value, setValue];
}
