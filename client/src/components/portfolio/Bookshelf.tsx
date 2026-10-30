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

export default function Bookshelf() {
  const [selected, setSelected] = useState<string | null>(null);
  const [wave, setWave] = useState<{ row: number; position: number } | null>(null);
  // where the cat stands: a shelf and a book index (index = books.length means just past the last book)
  const [catRow, setCatRow] = useState(0);
  const [catIndex, setCatIndex] = useState(rows[0].length - 1);
  const [walking, setWalking] = useState(false);
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const navigating = useRef(false);
  const timers = useRef<number[]>([]);

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

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const reduced = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* open a shelf's page: the cat walks to the book, pushes it off, then the page opens from that spot */
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
    setCatRow(row);
    setWalking(true);
    setCatIndex(column);
    later(() => {
      setWalking(false);
      setSelected(id);
    }, WALK_MS);
    later(go, WALK_MS + FALL_MS);
  }

  function onBookClick(event: React.MouseEvent, row: number, column: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    push(row, column);
  }

  function onCatClick() {
    // the cat shoves the book it is standing next to, or the last one on its shelf
    const row = catRow;
    const column = Math.min(Math.max(catIndex, 0), rows[row].length - 1);
    push(row, column);
  }

  const activeRow = hoverRow ?? catRow;

  return (
    <div className={`spine-collection ${selected ? "is-entering" : ""}`}>
      {rows.map((colors, row) => {
        const shelf = shelves[row];
        const catHere = activeRow === row;
        return (
          <a
            className={`spine-row${catHere ? " has-cat" : ""}`}
            key={row}
            href={shelf.path}
            target={shelf.external ? "_blank" : undefined}
            rel={shelf.external ? "noopener noreferrer" : undefined}
            aria-label={`${shelf.name}${shelf.external ? ", opens the PDF" : ""}`}
            onClick={event => {
              // a click on the row (not on a book) pushes the last book
              if ((event.target as Element).closest(".entry-book, .shelf-cat")) return;
              onBookClick(event, row, colors.length - 1);
            }}
            onPointerEnter={event => {
              if (event.pointerType !== "touch" && !navigating.current) setHoverRow(row);
            }}
            onPointerMove={event => {
              if (event.pointerType === "touch" || reduced()) return;
              const rect = event.currentTarget.querySelector(".spine-books")!.getBoundingClientRect();
              setWave({ row, position: ((event.clientX - rect.left) / rect.width) * colors.length - 0.5 });
            }}
            onPointerLeave={() => {
              setWave(null);
              if (!navigating.current) setHoverRow(null);
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
                    onClick={event => onBookClick(event, row, column)}
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
              <small>0{row + 1}</small>
              {shelf.name}
              <span>→</span>
            </span>
            {catHere && (
              <button
                type="button"
                className={`shelf-cat${walking ? " is-walking" : ""}`}
                style={{ ["--i" as string]: hoverRow !== null && hoverRow !== catRow ? colors.length - 1 : catIndex }}
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  onCatClick();
                }}
                aria-label={`The cat. Tap to open ${shelf.name}`}
              >
                <span className="shelf-cat-say" aria-hidden="true">
                  <b>Shall we see what Haniya can do?</b>
                  <small>tap the cat, or a book</small>
                </span>
                <CatFigure />
              </button>
            )}
          </a>
        );
      })}
    </div>
  );
}
