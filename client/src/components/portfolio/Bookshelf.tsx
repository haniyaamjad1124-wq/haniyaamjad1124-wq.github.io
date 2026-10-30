import React, { useEffect, useRef, useState } from "react";
import CatFigure from "./CatFigure";
import { resumeUrl } from "../../data/sections";

const palette: Record<string, string> = {
  cream: "#f1ebda",
  yellow: "#f5ca62",
  orange: "#df5c2c",
  rust: "#b94525",
  blue: "#3f59c3",
  deepblue: "#2b409a",
  periwinkle: "#8798d4",
};
const rows = [
  "cream cream yellow orange rust cream periwinkle blue blue deepblue yellow yellow orange cream",
  "orange rust yellow cream cream periwinkle blue deepblue yellow orange orange blue periwinkle cream",
  "blue periwinkle deepblue yellow yellow cream orange rust cream blue periwinkle orange yellow blue",
  "yellow cream cream orange rust blue periwinkle cream yellow orange blue deepblue orange yellow",
].map(row => row.split(" ").map(color => palette[color]));
const tilts: Record<string, number> = {
  "0-3": -18,
  "0-6": 15,
  "0-9": -12,
  "1-5": 16,
  "1-8": -17,
  "2-7": 14,
  "2-10": -19,
  "3-5": 14,
  "3-8": -16,
};

/* each shelf opens one page */
const shelves = [
  { name: "Work", path: "/work" },
  { name: "Play", path: "/play" },
  { name: "About", path: "/about" },
  { name: "Resume", path: resumeUrl ?? "/resume.pdf", external: true },
];

const FALL_MS = 620;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/*
  The cat lives at the collection level and is moved every frame, easing
  toward a target: the cursor while it is over the shelves, otherwise a
  spot it picks for itself. It can stand on any shelf, and a little beyond
  either end. Tapping a shelf knocks off the book under the cat on that
  shelf (or the tapped book); the page opens from where the book fell.
*/
export default function Bookshelf() {
  const [selected, setSelected] = useState<string | null>(null);
  const [wave, setWave] = useState<{ row: number; position: number } | null>(null);
  const [walking, setWalking] = useState(false);
  const [face, setFace] = useState(-1); // -1 faces left, 1 faces right
  const collection = useRef<HTMLDivElement>(null);
  const catEl = useRef<HTMLSpanElement>(null);
  const navigating = useRef(false);
  const hovering = useRef(false);
  const timers = useRef<number[]>([]);
  const cur = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const walkingRef = useRef(false);
  const faceRef = useRef(-1);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const reduced = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* geometry of the shelves inside the collection */
  const rowBox = (row: number) => {
    const el = collection.current?.querySelectorAll<HTMLElement>(".spine-books")[row];
    const root = collection.current;
    if (!el || !root) return { left: 0, top: 0, width: 0, height: 0 };
    const a = el.getBoundingClientRect();
    const b = root.getBoundingClientRect();
    return { left: a.left - b.left, top: a.top - b.top, width: a.width, height: a.height };
  };
  const standOn = (row: number, x: number) => {
    const box = rowBox(row);
    const reach = 18; // how far past either end the cat may stand
    target.current = { x: clamp(x, box.left - reach, box.left + box.width + reach), y: box.top };
  };
  const nearestRow = (y: number) => {
    let best = 0;
    let dist = Infinity;
    for (let r = 0; r < rows.length; r += 1) {
      const box = rowBox(r);
      const d = Math.abs(y - (box.top + box.height / 2));
      if (d < dist) {
        dist = d;
        best = r;
      }
    }
    return best;
  };
  const columnAt = (row: number, x: number) => {
    const box = rowBox(row);
    const n = rows[row].length;
    return clamp(Math.round(((x - box.left) / box.width) * n - 0.5), 0, n - 1);
  };

  useEffect(() => {
    const reset = () => {
      timers.current.forEach(t => window.clearTimeout(t));
      timers.current = [];
      navigating.current = false;
      setSelected(null);
      setWave(null);
    };
    window.addEventListener("pageshow", reset);
    return () => {
      timers.current.forEach(t => window.clearTimeout(t));
      window.removeEventListener("pageshow", reset);
    };
  }, []);

  /* start on the top shelf, then ease toward the target every frame */
  useEffect(() => {
    const box = rowBox(0);
    cur.current = { x: box.left + box.width * 0.7, y: box.top };
    target.current = { ...cur.current };
    let frame = 0;
    const ease = reduced() ? 1 : 0.2;
    const loop = () => {
      const c = cur.current;
      const t = target.current;
      const dx = t.x - c.x;
      const dy = t.y - c.y;
      c.x += dx * ease;
      c.y += dy * ease;
      if (catEl.current) catEl.current.style.transform = `translate(${c.x}px, ${c.y}px) translate(-50%, -100%)`;
      const moving = Math.abs(dx) > 1.2 || Math.abs(dy) > 1.2;
      if (moving !== walkingRef.current) {
        walkingRef.current = moving;
        setWalking(moving);
      }
      if (Math.abs(dx) > 4) {
        const f = dx < 0 ? -1 : 1;
        if (f !== faceRef.current) {
          faceRef.current = f;
          setFace(f);
        }
      }
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  /* left alone, the cat wanders: any shelf, any spot, now and then an end */
  useEffect(() => {
    if (reduced()) return;
    let id = 0;
    const tick = () => {
      if (!hovering.current && !navigating.current && collection.current) {
        const row = Math.floor(Math.random() * rows.length);
        const box = rowBox(row);
        const x = box.left + box.width * (Math.random() * 1.1 - 0.05);
        standOn(row, x);
      }
      id = window.setTimeout(tick, 2400 + Math.random() * 2600);
    };
    id = window.setTimeout(tick, 1800);
    return () => window.clearTimeout(id);
  }, []);

  /* open a shelf's page */
  function push(row: number, column: number) {
    if (navigating.current) return;
    navigating.current = true;
    const shelf = shelves[row];
    const id = `${row}-${column}`;
    const book = document.querySelector<HTMLElement>(`[data-book-id="${id}"]`);
    const go = () => {
      if (shelf.external) {
        window.location.assign(shelf.path);
        return;
      }
      const rect = book?.getBoundingClientRect();
      const handled = !window.dispatchEvent(
        new CustomEvent("portfolio:navigate", {
          cancelable: true,
          detail: {
            path: shelf.path,
            origin: rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined,
          },
        })
      );
      if (!handled) window.location.assign(shelf.path);
    };
    if (reduced()) {
      go();
      return;
    }
    // the cat runs to the book, then shoves it
    const box = rowBox(row);
    const n = rows[row].length;
    standOn(row, box.left + ((column + 0.5) / n) * box.width);
    const run = Math.min(900, 200 + Math.abs(target.current.x - cur.current.x) * 1.2 + Math.abs(target.current.y - cur.current.y) * 1.2);
    later(() => setSelected(id), run);
    later(go, run + FALL_MS);
  }

  function onRowClick(event: React.MouseEvent, row: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const book = (event.target as Element).closest<HTMLElement>(".entry-book");
    const column = book ? Number(book.dataset.bookId!.split("-")[1]) : columnAt(row, cur.current.x);
    push(row, column);
  }

  return (
    <div
      className={`spine-collection ${selected ? "is-entering" : ""}`}
      ref={collection}
      onPointerMove={event => {
        if (event.pointerType === "touch" || reduced() || navigating.current) return;
        hovering.current = true;
        const root = collection.current!.getBoundingClientRect();
        standOn(nearestRow(event.clientY - root.top), event.clientX - root.left);
      }}
      onPointerLeave={() => {
        hovering.current = false;
        setWave(null);
      }}
    >
      {rows.map((colors, row) => {
        const shelf = shelves[row];
        return (
          <a
            className="spine-row"
            key={row}
            href={shelf.path}
            target={shelf.external ? "_blank" : undefined}
            rel={shelf.external ? "noopener noreferrer" : undefined}
            aria-label={`${shelf.name}${shelf.external ? ", opens the PDF" : ""}`}
            onClick={event => onRowClick(event, row)}
            onPointerMove={event => {
              if (event.pointerType === "touch" || reduced()) return;
              const rect = event.currentTarget.querySelector(".spine-books")!.getBoundingClientRect();
              setWave({ row, position: ((event.clientX - rect.left) / rect.width) * colors.length - 0.5 });
            }}
          >
            <span className="spine-books" aria-hidden="true">
              {colors.map((color, column) => {
                const id = `${row}-${column}`;
                return (
                  <span
                    key={id}
                    data-book-id={id}
                    className={`entry-book ${selected === id ? "pushed" : ""}`}
                    style={
                      {
                        "--spine-color": color,
                        "--tilt": `${tilts[id] || 0}deg`,
                        "--wave": `${wave?.row === row ? Math.max(0, 1 - Math.abs(column - wave.position) / 3) * 8 : 0}px`,
                      } as React.CSSProperties
                    }
                  />
                );
              })}
            </span>
            <span className="shelf-label" aria-hidden="true">
              {shelf.name}
            </span>
          </a>
        );
      })}
      <span
        ref={catEl}
        className={`shelf-cat${walking ? " is-walking" : ""}`}
        style={{ ["--face" as string]: face }}
        aria-hidden="true"
      >
        <span className="shelf-cat-say">Let's knock over some books</span>
        <CatFigure />
      </span>
      <span className="shelf-say" aria-hidden="true">Let's knock over some books</span>
    </div>
  );
}
