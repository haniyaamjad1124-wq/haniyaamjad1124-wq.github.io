import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { resumeUrl } from "../../data/sections";
import { NAV_CAT_HTML, mountNavShelf } from "./navShelf";
import { mountPageCat } from "./pageCat";

type NavShelf = { refresh(): void; destroy(): void };
type NavShelfOptions = { navigate(path: string, origin: { x: number; y: number }): void };
const mountShelf = mountNavShelf as (header: HTMLElement, options: NavShelfOptions) => NavShelf;
type PageCat = { refresh(): void; destroy(): void };
type PageCatOptions = { dividers: string; peekable: string; frame: string; books: string; host: string };
const mountCat = mountPageCat as (header: HTMLElement, options: PageCatOptions) => PageCat;
// What the cat lands on as it comes down a page: the hairline rules that close a page (the
// rule above a grid of cards is not one: it would land above the cards, not under them).
// What it peeks out of, and the picture box inside each of those that it peeks from.
const PAGE_CAT: PageCatOptions = {
  dividers: ".feed-end, .site-footer",
  peekable: ".work-card, .pin, .portrait-frame, .project-figure, .project-hero",
  frame: ".work-frame, .pin-image, img, video",
  books: ".navbook",
  // the call-to-action cat at the foot of a page: the header cat hands over to it there
  host: ".cat-cta",
};

// One object for the life of the page. React writes the markup again whenever it is handed a
// new object here, which would replace the cat the script is animating.
const navCat = { __html: NAV_CAT_HTML };

// the four books on the header shelf: spine colour, title colour and height, and, where the
// usual orange bookmark would vanish against the spine, a bookmark colour of its own
const shelfBooks = [
  { href: "/work", label: "Work", color: "#3f59c3", text: "#f1ebda", height: 60 },
  { href: "/play", label: "Play", color: "#f5ca62", text: "#3a2c08", height: 66 },
  { href: "/about", label: "About", color: "#df5c2c", text: "#fff4e6", height: 57, ribbon: "#2b409a" },
];
const resumeBook = { color: "#8798d4", text: "#17191d", height: 70 };
const spine = (book: { color: string; text: string; height: number; ribbon?: string }) =>
  ({ "--c": book.color, "--t": book.text, "--h": `${book.height}px`, "--r": book.ribbon }) as React.CSSProperties;

export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const shelf = useRef<NavShelf | null>(null);
  const pageCat = useRef<PageCat | null>(null);
  const inner = path !== "/";

  // The header shelf and its cat, on the inner pages. On phones its styles hide it and the
  // menu button below is used instead.
  useEffect(() => {
    if (!inner || !header.current) return;
    const mounted = mountShelf(header.current, {
      navigate(to, origin) {
        const handled = !window.dispatchEvent(
          new CustomEvent("portfolio:navigate", { cancelable: true, detail: { path: to, origin } })
        );
        if (!handled) window.location.assign(to);
      },
    });
    shelf.current = mounted;
    // the cat's trips down the page work on a copy of the header cat, so they come second
    const cat = mountCat(header.current, PAGE_CAT);
    pageCat.current = cat;
    return () => {
      cat.destroy();
      mounted.destroy();
      shelf.current = null;
      pageCat.current = null;
    };
  }, [inner]);
  // after a page change a different book is the current one, a knocked book is back, and the
  // cat is home in the header
  useEffect(() => {
    shelf.current?.refresh();
    pageCat.current?.refresh();
  }, [path]);

  const links = [
    { href: "/work", label: "Work" },
    { href: "/play", label: "Play" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      ref={header}
      className={path === "/" ? "site-header entry-header" : "site-header has-shelf"}
    >
      <a className="brand" href="/">
        Haniya Amjad
      </a>
      {path !== "/" && (
        <>
      <nav className="shelfnav" aria-label="Main navigation">
        {shelfBooks.map(book => {
          const active = path === book.href || path.startsWith(`${book.href}/`);
          return (
            <a
              key={book.href}
              className="navbook"
              href={book.href}
              aria-current={active ? "page" : undefined}
              style={spine(book)}
            >
              <span>{book.label}</span>
            </a>
          );
        })}
        {resumeUrl && (
          <a
            className="navbook"
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={spine(resumeBook)}
          >
            <span>Resume</span>
          </a>
        )}
      </nav>
      <div className="navcat" aria-hidden="true" dangerouslySetInnerHTML={navCat} />
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen(value => !value)}
      >
        {open ? (
          <X aria-hidden="true" size={20} />
        ) : (
          <Menu aria-hidden="true" size={20} />
        )}
      </button>
      <nav
        id="site-navigation"
        className={open ? "nav open" : "nav"}
        aria-label="Main navigation"
      >
        {links.map(link => {
          const active = path === link.href || path.startsWith(`${link.href}/`);
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          );
        })}
        {resumeUrl && (
          <a
            className="resume-nav"
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Resume <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        )}
      </nav>
        </>
      )}
    </header>
  );
}

// The entry bookshelf's palette, first shelf row, as a small spine row.
const footerSpines: [string, number][] = [
  ["#f1ebda", 28], ["#f5ca62", 34], ["#df5c2c", 31], ["#b94525", 38],
  ["#8798d4", 30], ["#3f59c3", 36], ["#2b409a", 33], ["#f5ca62", 28],
];

export function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <footer className="site-footer">
      {children}
      <a href="/">Haniya Amjad</a>
      <span className="footer-spines" aria-hidden="true">
        {footerSpines.map(([color, height], i) => (
          <i key={i} style={{ background: color, height }} className={color === "#f1ebda" ? "is-cream" : undefined} />
        ))}
      </span>
    </footer>
  );
}

export function PageIntro({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-heading">
      <span className="page-kicker">
        {number} {label}
      </span>
      <h1 className="page-title">{title}</h1>
      {children}
    </section>
  );
}

export function TextLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      className="text-link"
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.6} />
    </a>
  );
}

export function BackLink({
  href = "/",
  children = "Home",
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <a className="back-link" href={href}>
      <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.6} />
      {children}
    </a>
  );
}
