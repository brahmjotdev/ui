// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

"use client";

import {
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type EffectCallback,
  type RefObject,
} from "react";
import { flushSync } from "react-dom";

import { dataAttrs } from "./data-attrs";
import { usePrefersReducedMotion } from "./prefers-reduced-motion";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type PresenceStatus = "starting" | "started" | "ending" | "ended";
type PresenceDataState = "opening" | "open" | "closing" | "closed";

interface PresenceStates {
  open: boolean;
  closed: boolean;
  starting: boolean;
  started: boolean;
  ending: boolean;
  ended: boolean;
  animating: boolean;
  idle: boolean;
  hidden: boolean;
}

interface UsePresenceReturn<T extends HTMLElement = HTMLElement> {
  mounted: boolean;
  ref: RefObject<T | null>;
  presenceStatus: PresenceStatus;
  presenceStates: PresenceStates;
}

// ------------------------------------------------
// CONSTANTS
// ------------------------------------------------

const EMPTY_ARRAY: readonly unknown[] = Object.freeze([]);

// ------------------------------------------------
// STATES
// ------------------------------------------------

function getPresenceStates(
  status: PresenceStatus,
  open: boolean,
  mounted: boolean,
): PresenceStates {
  return {
    open: status === "starting" || status === "started",
    closed: status === "ending" || status === "ended",
    starting: status === "starting",
    started: status === "started",
    ending: status === "ending",
    ended: status === "ended",
    animating: status === "starting" || status === "ending",
    idle: status === "started" || status === "ended",
    hidden: !open && !mounted,
  };
}

function getPresenceDataState(
  presenceStates: PresenceStates,
): PresenceDataState {
  if (presenceStates.starting) return "opening";
  if (presenceStates.ending) return "closing";
  if (presenceStates.open) return "open";
  return "closed";
}

function presenceAttrs(
  identity: string,
  presenceStates: PresenceStates,
  extra?: Record<string, boolean | undefined>,
) {
  return {
    ...dataAttrs(identity, {
      open: presenceStates.open,
      closed: presenceStates.closed,
      starting: presenceStates.starting,
      started: presenceStates.started,
      ending: presenceStates.ending,
      ended: presenceStates.ended,
      animating: presenceStates.animating,
      idle: presenceStates.idle,
      hidden: presenceStates.hidden,
      ...extra,
    }),
    "data-state": getPresenceDataState(presenceStates),
  };
}

// ------------------------------------------------
// REF HELPERS
// ------------------------------------------------

function useRefWithInit<T>(init: () => T): RefObject<T>;
function useRefWithInit<T, U>(init: (arg: U) => T, initArg: U): RefObject<T>;
function useRefWithInit(init: (arg?: unknown) => unknown, initArg?: unknown) {
  const [ref] = useState(() => ({ current: init(initArg) }));
  return ref as RefObject<unknown>;
}

const useOnMount = (fn: EffectCallback) => useEffect(fn, EMPTY_ARRAY);

const useSafeInsertionEffect =
  useInsertionEffect && useInsertionEffect !== useLayoutEffect
    ? useInsertionEffect
    : (fn: () => void) => fn();

function useStableCallback<T extends (...args: never[]) => unknown>(
  callback: T,
): T {
  const stable = useRefWithInit(() => {
    const state = {
      next: undefined as T | undefined,
      callback: (() => {
        if (process.env.NODE_ENV !== "production") {
          throw new Error("Cannot call an event handler while rendering.");
        }
      }) as T,
      trampoline: ((...args) => state.callback?.(...args)) as T,
      effect: () => {
        state.callback = state.next as T;
      },
    };
    return state;
  }).current;

  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}

function resolveRef<T>(maybeRef: RefObject<T | null> | T | null): T | null {
  if (maybeRef == null) return maybeRef;
  return typeof maybeRef === "object" && "current" in maybeRef
    ? maybeRef.current
    : (maybeRef as T);
}

// ------------------------------------------------
// ANIMATION FRAME
// ------------------------------------------------

class AnimationFrame {
  static create() {
    return new AnimationFrame();
  }

  id: number | null = null;

  request(fn: () => void) {
    this.cancel();
    this.id = requestAnimationFrame(() => {
      this.id = null;
      fn();
    });
  }

  cancel = () => {
    if (this.id !== null) {
      cancelAnimationFrame(this.id);
      this.id = null;
    }
  };

  disposeEffect = () => this.cancel;
}

function useAnimationFrame() {
  const frame = useRefWithInit(AnimationFrame.create).current;
  useOnMount(frame.disposeEffect);
  return frame;
}

function useAnimationsFinished(
  elementOrRef: RefObject<HTMLElement | null> | HTMLElement | null,
) {
  const frame = useAnimationFrame();

  return useStableCallback(
    (fnToExecute: () => void, signal: AbortSignal | null = null) => {
      frame.cancel();

      const element = resolveRef(elementOrRef);

      if (element == null) {
        fnToExecute();
        return;
      }

      const resolvedElement = element;

      const done = () => flushSync(fnToExecute);

      if (typeof resolvedElement.getAnimations !== "function") {
        fnToExecute();
        return;
      }

      function exec() {
        Promise.all(
          resolvedElement
            .getAnimations()
            .map((animation) => animation.finished),
        ).then(
          () => {
            if (!signal?.aborted) done();
          },
          () => {
            if (signal?.aborted) return;

            const stillRunning = resolvedElement
              .getAnimations()
              .some(
                (animation) =>
                  animation.pending || animation.playState !== "finished",
              );

            if (stillRunning) exec();
            else done();
          },
        );
      }

      frame.request(exec);
    },
  );
}

function useOpenChangeComplete(parameters: {
  enabled?: boolean;
  ref: RefObject<HTMLElement | null>;
  onComplete: () => void;
}) {
  const { enabled = true, ref, onComplete: onCompleteParam } = parameters;
  const onComplete = useStableCallback(onCompleteParam);
  const runOnceAnimationsFinish = useAnimationsFinished(ref);

  useEffect(() => {
    if (!enabled) return undefined;

    const controller = new AbortController();
    runOnceAnimationsFinish(onComplete, controller.signal);

    return () => controller.abort();
  }, [enabled, onComplete, runOnceAnimationsFinish]);
}

// ------------------------------------------------
// HOOK
// ------------------------------------------------

function runOpenPresence(
  status: PresenceStatus,
  reducedMotion: boolean,
  openRef: RefObject<boolean>,
  setStatus: (status: PresenceStatus) => void,
) {
  if (status === "started" || status === "starting") return undefined;

  if (reducedMotion) {
    setStatus("started");
    return undefined;
  }

  const frame = requestAnimationFrame(() => {
    if (openRef.current) setStatus("starting");
  });
  return () => cancelAnimationFrame(frame);
}

function runClosePresence(
  status: PresenceStatus,
  reducedMotion: boolean,
  openRef: RefObject<boolean>,
  setStatus: (status: PresenceStatus) => void,
  setMounted: (mounted: boolean) => void,
) {
  if (status === "ended") return undefined;

  if (reducedMotion) {
    setStatus("ended");
    setMounted(false);
    return undefined;
  }

  const frame = requestAnimationFrame(() => {
    if (!openRef.current) setStatus("ending");
  });
  return () => cancelAnimationFrame(frame);
}

function usePresenceStatusTransition(
  open: boolean,
  reducedMotion: boolean,
  openRef: RefObject<boolean>,
  statusRef: RefObject<PresenceStatus>,
  setStatus: (status: PresenceStatus) => void,
  setMounted: (mounted: boolean) => void,
) {
  useLayoutEffect(() => {
    if (open) {
      return runOpenPresence(
        statusRef.current,
        reducedMotion,
        openRef,
        setStatus,
      );
    }

    return runClosePresence(
      statusRef.current,
      reducedMotion,
      openRef,
      setStatus,
      setMounted,
    );
  }, [open, openRef, reducedMotion, setMounted, setStatus, statusRef]);
}

function usePresenceComplete(
  reducedMotion: boolean,
  status: PresenceStatus,
  ref: RefObject<HTMLElement | null>,
  openRef: RefObject<boolean>,
  statusRef: RefObject<PresenceStatus>,
  setStatus: (status: PresenceStatus) => void,
  setMounted: (mounted: boolean) => void,
) {
  useOpenChangeComplete({
    enabled: !reducedMotion && status === "starting",
    ref,
    onComplete() {
      if (openRef.current && statusRef.current === "starting") {
        setStatus("started");
      }
    },
  });

  useOpenChangeComplete({
    enabled: !reducedMotion && status === "ending",
    ref,
    onComplete() {
      if (!openRef.current && statusRef.current === "ending") {
        setStatus("ended");
        setMounted(false);
      }
    },
  });
}

function usePresenceLifecycle(open: boolean) {
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(open);
  const [status, setStatus] = useState<PresenceStatus>(
    open ? "started" : "ended",
  );
  const ref = useRef<HTMLElement | null>(null);
  const openRef = useRef(open);
  const statusRef = useRef(status);

  if (open && !mounted) {
    setMounted(true);
  }

  useLayoutEffect(() => {
    openRef.current = open;
  });

  useLayoutEffect(() => {
    statusRef.current = status;
  });

  usePresenceStatusTransition(
    open,
    reducedMotion,
    openRef,
    statusRef,
    setStatus,
    setMounted,
  );

  usePresenceComplete(
    reducedMotion,
    status,
    ref,
    openRef,
    statusRef,
    setStatus,
    setMounted,
  );

  return { mounted, status, ref };
}

function usePresence<T extends HTMLElement = HTMLElement>(
  open: boolean,
): UsePresenceReturn<T> {
  const { mounted, status, ref } = usePresenceLifecycle(open);
  const states = useMemo(
    () => getPresenceStates(status, open, mounted),
    [status, open, mounted],
  );

  return {
    mounted,
    ref: ref as RefObject<T | null>,
    presenceStatus: status,
    presenceStates: states,
  };
}

// ------------------------------------------------
// PRESENCE GATE
// ------------------------------------------------

function presenceShouldRender(
  open: boolean,
  mounted: boolean,
  keepMounted = false,
) {
  return keepMounted || open || mounted;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { presenceAttrs, presenceShouldRender, usePresence };
export type { PresenceDataState, PresenceStates, PresenceStatus };
