import { useEffect } from "react";
import Lenis from "lenis";

/*
  Inertial, "liquid" scrolling on the inner pages. Native scroll stays the
  source of truth (anchors, keyboard, find-in-page all keep working); Lenis
  only eases the wheel and touch input towards the target. Off under
  prefers-reduced-motion and on the bookshelf entry screen.
*/
export default function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
      anchors: true,
    });
    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [enabled]);
}
