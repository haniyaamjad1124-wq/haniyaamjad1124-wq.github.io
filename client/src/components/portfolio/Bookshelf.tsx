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
  { name: "Play", path: "/reminiscence" },
  { name: "About", path: "/about" },
  { name: "Resume", path: resumeUrl ?? "/resume.pdf", external: true },
];

const WALK_MS = 760;
const FALL_MS = 620;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function Bookshelf() {
  const [selected, setSelected] = useState<string | null>(null);
  const [wave, setWave] = useState<{ row: number; position: number } | null>(null);
  // where the cat stands: a shelf and a book index along it
  const [cat, setCat] = useState({ row: 0, index: rows[0].length - 3 });
  const [walking, setWalking] = useState(false);
  const navigating = useRef(false);
  const hovering = useRef(false);
  const timers = useRef<number[]>([]);
  const stillTimer = useRef<number | null>(null);
  const catRef = useRef(cat);
  catRef.current = cat;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const reduced = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const reset = () => {
      timers.current.forEach(t => window.clearTimeout(t));
      timers.current = [];
      navigating.current = false;
      setSelected(null);
      setWave(null);
      setWalking(false);
    };
    window.addEventListener("pageshow", reset);
    return () => {
      timers.current.forEach(t => window.clearTimeout(t));
      window.removeEventListener("pageshow", reset);
    };
  }, []);

  /* left alone, the cat wanders: a stroll along its shelf, now and then a hop to another shelf */
  useEffect(() => {
    if (reduced()) return;
    let id = 0;
    const tick = () => {
      if (!hovering.current && !navigating.current) {
        const { row } = catRef.current;
        const nextRow = Math.random() < 0.22 ? Math.floor(Math.random() * rows.length) : row;
        const nextIndex = Math.floor(Math.random() * rows[nextRow].length);
        setCat({ row: nextRow, index: nextIndex });
        setWalking(true);
        window.setTimeout(() => setWalking(false), WALK_MS);
      }
      id = window.setTimeout(tick, 2600 + Math.random() * 2800);
    };
    id = window.setTimeout(tick, 2200);
    return () => window.clearTimeout(id);
  }, []);

  /* the cat follows the cursor along a shelf */
  function follow(row: number, position: number) {
    const index = clamp(Math.round(position), 0, rows[row].length - 1);
    if (catRef.current.row !== row || catRef.current.index !== index) {
      setCat({ row, index });
      setWalking(true);
    }
    if (stillTimer.current) window.clearTimeout(stillTimer.current);
    stillTimer.current = window.setTimeout(() => setWalking(false), 320);
  }

  /* open a shelf's page: the cat knocks the book under its feet off the shelf, then the page opens from there */
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
    const far = cat.row !== row || cat.index !== column;
    setCat({ row, index: column });
    setWalking(far);
    const walk = far ? WALK_MS : 120;
    later(() => {
      setWalking(false);
      setSelected(id);
    }, walk);
    later(go, walk + FALL_MS);
  }

  function onRowClick(event: React.MouseEvent, row: number, columns: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const book = (event.target as Element).closest<HTMLElement>(".entry-book");
    let column = cat.row === row ? cat.index : columns - 1;
    if (book) column = Number(book.dataset.bookId!.split("-")[1]);
    push(row, column);
  }

  return (
    <div className={`spine-collection ${selected ? "is-entering" : ""}`}>
      {rows.map((colors, row) => {
        const shelf = shelves[row];
        const catHere = cat.row === row;
        return (
          <a
            className={`spine-row${catHere ? " has-cat" : ""}`}
            key={row}
            href={shelf.path}
            target={shelf.external ? "_blank" : undefined}
            rel={shelf.external ? "noopener noreferrer" : undefined}
            aria-label={`${shelf.name}${shelf.external ? ", opens the PDF" : ""}`}
            onClick={event => onRowClick(event, row, colors.length)}
            onPointerEnter={event => {
              if (event.pointerType !== "touch") hovering.current = true;
            }}
            onPointerMove={event => {
              if (event.pointerType === "touch" || reduced() || navigating.current) return;
              const rect = event.currentTarget.querySelector(".spine-books")!.getBoundingClientRect();
              const position = ((event.clientX - rect.left) / rect.width) * colors.length - 0.5;
              setWave({ row, position });
              follow(row, position);
            }}
            onPointerLeave={() => {
              hovering.current = false;
              setWave(null);
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
            {catHere && (
              <span
                className={`shelf-cat${walking ? " is-walking" : ""}`}
                style={{ ["--i" as string]: cat.index }}
                aria-hidden="true"
              >
                <span className="shelf-cat-say">Let's knock over some books</span>
                <CatFigure />
              </span>
            )}
          </a>
        );
      })}
      <span className="shelf-say" aria-hidden="true">Let's knock over some books</span>
    </div>
  );
}
