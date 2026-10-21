import React, { useEffect, useRef, useState } from "react";

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

export default function Bookshelf() {
  const [selected, setSelected] = useState<string | null>(null);
  const [wave, setWave] = useState<{ row: number; position: number } | null>(
    null
  );
  const navigating = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const reset = () => {
      window.clearTimeout(timer.current);
      navigating.current = false;
      setSelected(null);
      setWave(null);
    };
    window.addEventListener("pageshow", reset);
    return () => {
      window.clearTimeout(timer.current);
      window.removeEventListener("pageshow", reset);
    };
  }, []);

  function enter(event: React.MouseEvent<HTMLAnchorElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    event.preventDefault();
    if (navigating.current) return;
    navigating.current = true;
    const target =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>(".entry-book")
        : null;
    const books = [
      ...event.currentTarget.querySelectorAll<HTMLElement>(".entry-book"),
    ];
    const distance = (book: HTMLElement) => {
      const rect = book.getBoundingClientRect();
      return (
        (rect.left + rect.width / 2 - event.clientX) ** 2 +
        (rect.top + rect.height / 2 - event.clientY) ** 2
      );
    };
    const chosen =
      target ||
      (event.detail > 0
        ? books.reduce((nearest, book) =>
            distance(book) < distance(nearest) ? book : nearest
          )
        : books[0]);
    const rect = chosen.getBoundingClientRect();
    setSelected(chosen.dataset.bookId || "0-0");
    timer.current = window.setTimeout(() => {
      const handled = !window.dispatchEvent(
        new CustomEvent("portfolio:navigate", {
          cancelable: true,
          detail: {
            path: "/work",
            origin: {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            },
          },
        })
      );
      if (!handled) window.location.assign("/work");
    }, 120);
  }

  return (
    <a
      className="entry-work-link"
      href="/work"
      aria-label="Open Work portfolio"
      onClick={enter}
    >
      <div className={`spine-collection ${selected ? "is-entering" : ""}`}>
        {rows.map((colors, row) => (
          <div
            className="spine-row"
            key={row}
            onPointerMove={event => {
              if (
                event.pointerType === "touch" ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
              )
                return;
              const rect = event.currentTarget
                .querySelector(".spine-books")!
                .getBoundingClientRect();
              setWave({
                row,
                position:
                  ((event.clientX - rect.left) / rect.width) * colors.length -
                  0.5,
              });
            }}
            onPointerLeave={() => setWave(null)}
          >
            <span className="spine-books" aria-hidden="true">
              {colors.map((color, column) => {
                const id = `${row}-${column}`;
                return (
                  <span
                    key={id}
                    data-book-id={id}
                    className={`entry-book ${selected === id ? "selected" : ""}`}
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
          </div>
        ))}
      </div>
    </a>
  );
}
