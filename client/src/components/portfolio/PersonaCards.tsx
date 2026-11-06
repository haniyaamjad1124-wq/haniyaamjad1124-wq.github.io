import React, { useEffect, useRef, useState } from "react";

export interface Persona {
  name: string;
  line: string;
  needs: string;
  tone: "yellow" | "orange" | "blue";
}

/*
  Three profile cards in a deck. Every few seconds the front card arcs out
  to the left and slides in behind the others, so the deck shuffles in a
  slow, liquid loop. Hover or focus pauses it; a dot or a click on the
  deck brings the next card forward. Reduced motion: three cards in a row.
*/
export default function PersonaCards({ personas }: { personas: Persona[] }) {
  const n = personas.length;
  const [front, setFront] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const paused = useRef(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const advance = (to?: number) => {
    setFront(f => {
      const next = to ?? (f + 1) % n;
      if (next !== f) setLeaving(f);
      return next;
    });
  };

  useEffect(() => {
    if (still || n < 2) return;
    const id = window.setInterval(() => {
      if (!paused.current) advance();
    }, 3600);
    return () => window.clearInterval(id);
  }, [still, n]);

  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), 1100);
    return () => window.clearTimeout(t);
  }, [leaving]);

  return (
    <div
      className={`persona-deck${still ? " is-still" : ""}`}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="persona-stack" onClick={() => !still && advance()}>
        {personas.map((p, i) => {
          const pos = (i - front + n) % n;
          return (
            <article
              key={p.name}
              className={`persona-card tone-${p.tone} pos-${pos}${leaving === i ? " is-leaving" : ""}`}
              aria-hidden={!still && pos !== 0}
            >
              <span className="persona-kicker">Persona</span>
              <h3>{p.name}</h3>
              <p className="persona-line">{p.line}</p>
              <span className="persona-needs-label">Needs</span>
              <p className="persona-needs">{p.needs}</p>
            </article>
          );
        })}
      </div>
      {!still && (
        <div className="persona-dots" role="tablist" aria-label="Personas">
          {personas.map((p, i) => (
            <button
              key={p.name}
              type="button"
              role="tab"
              aria-selected={front === i}
              aria-label={p.name}
              className={`persona-dot tone-${p.tone}${front === i ? " is-on" : ""}`}
              onClick={() => advance(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
