import React, { useState } from "react";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { resumeUrl } from "../../data/sections";

export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/work", label: "Work" },
    { href: "/reminiscence", label: "Reminiscence" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={path === "/" ? "site-header entry-header" : "site-header"}
    >
      <a className="brand" href="/">
        Haniya Amjad
      </a>
      {path !== "/" && (
        <>
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

export function Footer() {
  return (
    <footer className="site-footer">
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
