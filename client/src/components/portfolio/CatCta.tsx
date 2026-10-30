import React, { useEffect, useState } from "react";
import CatFigure from "./CatFigure";

/*
  The call to action is a black cat, drawn here as an original character in
  the spirit of matchbox-label illustration: round hunched body, big yellow
  eyes with slit pupils, a tiny orange nose, whiskers, a curled tail.
  It waits at the bottom-right edge, first shows a paw and waves, then peeks
  up, with a small cream bubble. Hover or focus brings it all the way up.
  Clicking opens the Work page. Reduced motion: it simply sits there.
*/
export default function CatCta({ hidden = false }: { hidden?: boolean }) {
  const [stage, setStage] = useState<"hidden" | "paw" | "peek">("hidden");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("peek");
      return;
    }
    const a = window.setTimeout(() => setStage("paw"), 1400);
    const b = window.setTimeout(() => setStage("peek"), 3600);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);
  if (hidden) return null;
  return (
    <a
      className={`cat-cta is-${stage}`}
      href="/work"
      aria-label="See the work"
    >
      <span className="cat-bubble" aria-hidden="true">
        My work <i>→</i>
      </span>
      <CatFigure />
    </a>
  );
}
