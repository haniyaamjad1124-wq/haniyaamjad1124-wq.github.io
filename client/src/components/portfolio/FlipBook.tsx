import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BookPage } from "../../data/sections";

/*
  A hardback that turns its own pages.
  Sheets are stacked; each sheet has a recto (front) and a verso (back).
  Turning sheet k rotates it about the spine; the number of turned sheets is the state.
  Autoplay turns one sheet every few seconds, pauses on hover and focus, loops.
  Reduced motion: no autoplay, instant turns.
*/

interface Props {
  title: string;
  subtitle: string;
  pages: BookPage[];
  closing: string;
  interval?: number;
}

export default function FlipBook({ title, subtitle, pages, closing, interval = 3400 }: Props) {
  // narrow screens show one page at a time, so every page gets its own sheet there
  const [single, setSingle] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 600px)");
    const apply = () => setSingle(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // sheet 0: cover (recto) / blank verso. sheets 1..n: page pairs. last sheet: closing verso.
  const sheets = useMemo(() => {
    if (single) {
      const out: { front: React.ReactNode; back: React.ReactNode; kind: string }[] = [];
      out.push({
        kind: "cover",
        front: (
          <div className="book-cover-face">
            <span className="book-cover-rule" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <span className="book-cover-rule" aria-hidden="true" />
          </div>
        ),
        back: <div className="book-endpaper" aria-hidden="true" />,
      });
      pages.forEach((page, i) => {
        out.push({ kind: "leaf", front: <PageFace page={page} number={i + 1} />, back: <div className="book-endpaper" aria-hidden="true" /> });
      });
      out.push({ kind: "leaf", front: <ClosingFace text={closing} />, back: <div className="book-endpaper" aria-hidden="true" /> });
      return out;
    }
    const out: { front: React.ReactNode; back: React.ReactNode; kind: string }[] = [];
    out.push({
      kind: "cover",
      front: (
        <div className="book-cover-face">
          <span className="book-cover-rule" aria-hidden="true" />
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <span className="book-cover-rule" aria-hidden="true" />
        </div>
      ),
      back: <div className="book-endpaper" aria-hidden="true" />,
    });
    for (let i = 0; i < pages.length; i += 2) {
      const a = pages[i];
      const b = pages[i + 1];
      out.push({
        kind: "leaf",
        front: <PageFace page={a} number={i + 1} />,
        back: b ? <PageFace page={b} number={i + 2} /> : <ClosingFace text={closing} />,
      });
    }
    if (pages.length % 2 === 0) {
      out.push({ kind: "leaf", front: <ClosingFace text={closing} />, back: <div className="book-endpaper" aria-hidden="true" /> });
    }
    return out;
  }, [title, subtitle, pages, closing, single]);

  const total = sheets.length;
  const [turned, setTurned] = useState(0); // how many sheets lie on the left
  useEffect(() => { setTurned(0); }, [single]);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    reduced.current = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setTurned(t => {
      const next = t + dir;
      if (next < 0) return 0;
      if (next > total) return total;
      return next;
    });
  }, [total]);

  useEffect(() => {
    if (paused || reduced.current) return;
    timer.current = window.setTimeout(() => {
      setTurned(t => (t >= total ? 0 : t + 1));
    }, turned === 0 || turned === total ? interval * 1.4 : interval);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [turned, paused, total, interval]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  const open = turned > 0 && turned < total;

  return (
    <div
      className={`book-stage${open ? " is-open" : ""}${turned === total ? " is-closed-back" : ""}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
      tabIndex={0}
      role="group"
      aria-roledescription="book"
      aria-label={`${title}. ${pages.length} pages. Use the arrow keys to turn pages.`}
    >
      <div className="book" style={{ ["--turned" as string]: turned, ["--total" as string]: total }}>
        <div className="book-board book-board-back" aria-hidden="true" />
        {sheets.map((sheet, i) => {
          const isTurned = i < turned;
          return (
            <div
              key={i}
              className={`book-sheet${isTurned ? " is-turned" : ""} book-sheet-${sheet.kind}`}
              style={{ zIndex: isTurned ? i + 1 : total - i + 1, ["--i" as string]: i }}
            >
              <div className="book-face book-face-front">{sheet.front}</div>
              <div className="book-face book-face-back">{sheet.back}</div>
            </div>
          );
        })}
        <div className="book-board book-board-front" aria-hidden="true" />
      </div>
      <button type="button" className="book-hit book-hit-prev" aria-label="Previous page" onClick={() => step(-1)} />
      <button type="button" className="book-hit book-hit-next" aria-label="Next page" onClick={() => step(1)} />
      <p className="book-caption small-label" aria-hidden="true">
        {turned === 0 ? "Open the book" : turned >= total - (single ? 1 : 0) ? "The end" : `${turned} of ${total - 1}`}
      </p>
    </div>
  );
}

function PageFace({ page, number }: { page: BookPage; number: number }) {
  return (
    <div className="book-page">
      <span className="book-kicker">{page.kicker}</span>
      <h4>{page.title}</h4>
      <p>{page.text}</p>
      <span className="book-folio">{number}</span>
    </div>
  );
}

function ClosingFace({ text }: { text: string }) {
  return (
    <div className="book-page book-page-closing">
      <span className="book-cover-rule" aria-hidden="true" />
      <p>{text}</p>
      <span className="book-cover-rule" aria-hidden="true" />
    </div>
  );
}
