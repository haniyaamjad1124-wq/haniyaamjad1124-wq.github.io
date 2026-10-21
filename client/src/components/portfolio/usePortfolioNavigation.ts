import { flushSync } from "react-dom";
import { useEffect, useRef, useState } from "react";

export interface PortfolioMetadata {
  title: string;
  description: string;
  known?: boolean;
}

type RouteMetadata = (path: string) => PortfolioMetadata;
type PortfolioOrigin = { x: number; y: number };
type PortfolioNavigateDetail = {
  path?: string;
  origin?: PortfolioOrigin;
};

type ViewTransitionLike = {
  finished: Promise<unknown>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => ViewTransitionLike;
};

const FALLBACK_ARRIVAL_MS = 450;

export function normalizePortfolioPath(value: string): string {
  const path = value.split(/[?#]/, 1)[0] || "/";
  return path.replace(/\/$/, "") || "/";
}

function metaContent(
  selector: string,
  attribute: "name" | "property",
  attributeValue: string,
  value: string
) {
  if (typeof document === "undefined") return;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  element.content = value;
}

function scrollToTop() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  } catch {
    // A non-browser test environment may not implement scrollTo.
  }
}

export default function usePortfolioNavigation(
  initialPath: string,
  knownRoutes: readonly string[],
  getMetadata: RouteMetadata
): { path: string; arriving: boolean } {
  const [path, setPath] = useState(() => normalizePortfolioPath(initialPath));
  const [arriving, setArriving] = useState(false);
  const pathRef = useRef(path);
  const timerRef = useRef<number | null>(null);
  const transitionIdRef = useRef(0);
  pathRef.current = path;

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined")
      return;

    const routeSet = new Set(knownRoutes.map(normalizePortfolioPath));
    let disposed = false;

    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const clearTransitionChrome = (transitionId: number) => {
      if (transitionId !== transitionIdRef.current) return;
      const root = document.documentElement;
      delete root.dataset.transitionKind;
      root.style.removeProperty("--transition-x");
      root.style.removeProperty("--transition-y");
    };

    const focusDestination = () => {
      if (disposed) return;
      const destination = document.getElementById("main-content");
      if (destination instanceof HTMLElement) {
        try {
          destination.focus({ preventScroll: true });
        } catch {
          destination.focus();
        }
      }
    };

    const finishFallbackArrival = (transitionId: number) => {
      if (transitionId !== transitionIdRef.current) return;
      timerRef.current = null;
      clearTransitionChrome(transitionId);
      setArriving(false);
      focusDestination();
    };

    const commitRoute = (nextPath: string) => {
      flushSync(() => {
        setPath(nextPath);
        window.history.pushState({}, "", nextPath);
        scrollToTop();
      });
    };

    const navigate = (requestedPath: string, origin?: PortfolioOrigin) => {
      const nextPath = normalizePortfolioPath(requestedPath);
      if (disposed || !routeSet.has(nextPath) || nextPath === pathRef.current)
        return;

      clearTimer();
      const transitionId = ++transitionIdRef.current;
      const reducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
        false;
      const documentWithTransition = document as DocumentWithViewTransition;
      const startViewTransition = documentWithTransition.startViewTransition;
      const hasCustomOrigin =
        origin !== undefined &&
        Number.isFinite(origin.x) &&
        Number.isFinite(origin.y);

      const finish = () => {
        if (disposed || transitionId !== transitionIdRef.current) return;
        clearTransitionChrome(transitionId);
        setArriving(false);
        focusDestination();
      };

      if (reducedMotion || typeof startViewTransition !== "function") {
        setArriving(!reducedMotion);
        try {
          commitRoute(nextPath);
        } catch {
          // Keep the route update single-shot even if a host history implementation throws.
        }
        if (reducedMotion) {
          finish();
        } else {
          timerRef.current = window.setTimeout(
            () => finishFallbackArrival(transitionId),
            FALLBACK_ARRIVAL_MS
          );
        }
        return;
      }

      const root = document.documentElement;
      const x = hasCustomOrigin ? origin!.x : window.innerWidth / 2;
      const y = hasCustomOrigin ? origin!.y : window.innerHeight / 2;
      root.style.setProperty("--transition-x", `${x}px`);
      root.style.setProperty("--transition-y", `${y}px`);
      root.dataset.transitionKind = hasCustomOrigin ? "shelf" : "page";

      let committed = false;
      const commitOnce = () => {
        if (committed) return;
        committed = true;
        commitRoute(nextPath);
      };

      try {
        const transition = startViewTransition.call(document, () => {
          commitOnce();
        });
        void Promise.resolve(transition.finished)
          .catch(() => undefined)
          .finally(finish);
      } catch {
        // Some implementations expose the API but throw when a transition cannot start.
        if (!committed) {
          setArriving(true);
          try {
            commitOnce();
          } catch {
            // The attempted commit remains guarded by commitOnce.
          }
          timerRef.current = window.setTimeout(
            () => finishFallbackArrival(transitionId),
            FALLBACK_ARRIVAL_MS
          );
        } else {
          finish();
        }
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;

      const target = event.target;
      const anchor =
        target instanceof Element
          ? target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        anchor.target.toLowerCase() === "_blank"
      )
        return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, document.baseURI);
      } catch {
        return;
      }
      if (
        url.origin !== window.location.origin ||
        url.hash ||
        url.search ||
        !routeSet.has(normalizePortfolioPath(url.pathname))
      )
        return;

      const nextPath = normalizePortfolioPath(url.pathname);
      if (nextPath === pathRef.current) return;
      event.preventDefault();
      navigate(nextPath);
    };

    const handlePortfolioNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<PortfolioNavigateDetail>;
      const detail = customEvent.detail;
      const nextPath =
        typeof detail?.path === "string"
          ? normalizePortfolioPath(detail.path)
          : "";
      if (!nextPath || !routeSet.has(nextPath)) return;

      event.preventDefault();
      if (nextPath !== pathRef.current) navigate(nextPath, detail.origin);
    };

    const handlePopState = () => {
      clearTimer();
      ++transitionIdRef.current;
      clearTransitionChrome(transitionIdRef.current);
      setArriving(false);
      const nextPath = normalizePortfolioPath(window.location.pathname);
      if (nextPath !== pathRef.current) setPath(nextPath);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("portfolio:navigate", handlePortfolioNavigate);
    window.addEventListener("popstate", handlePopState);

    return () => {
      disposed = true;
      clearTimer();
      clearTransitionChrome(transitionIdRef.current);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("portfolio:navigate", handlePortfolioNavigate);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [getMetadata, knownRoutes]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const data = getMetadata(path);
    document.title = data.title;
    metaContent(
      'meta[name="description"]',
      "name",
      "description",
      data.description
    );
    metaContent(
      'meta[property="og:title"]',
      "property",
      "og:title",
      data.title
    );
    metaContent(
      'meta[property="og:description"]',
      "property",
      "og:description",
      data.description
    );
    metaContent(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      data.title
    );
    metaContent(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      data.description
    );
  }, [getMetadata, path]);

  return { path, arriving };
}

export { usePortfolioNavigation };
