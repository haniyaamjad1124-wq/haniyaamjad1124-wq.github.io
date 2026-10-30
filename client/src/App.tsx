import React from "react";
import Home from "./pages/Home";
import { Header, Footer } from "./components/portfolio/Layout";
import { PortfolioPage, ProjectPage } from "./pages/Portfolio";
import { projects, sections } from "./data/sections";
import usePortfolioNavigation from "./components/portfolio/usePortfolioNavigation";
import useSmoothScroll from "./components/portfolio/useSmoothScroll";
import CatCta from "./components/portfolio/CatCta";

export const staticRoutes = [
  "/",
  ...sections.map(page => page.path),
  ...projects.map(project => `/work/${project.slug}`),
];

export function metadata(path: string) {
  const page = sections.find(page => page.path === path);
  const project = projects.find(project => path === `/work/${project.slug}`);
  return {
    title:
      path === "/"
        ? "Haniya Amjad — Enter the Portfolio"
        : page
          ? `${page.title} — Haniya Amjad`
          : project
            ? `${project.title ?? `${project.client}, ${project.project}`} — Haniya Amjad`
            : "Page Not Found — Haniya Amjad",
    description:
      path === "/"
        ? "Choose a colorful book to enter Haniya Amjad’s portfolio."
        : page
          ? `${page.title}. A space for Haniya Amjad’s portfolio content.`
          : project
            ? project.goal[0] ?? `${project.client}, ${project.project}.`
            : "This page could not be found.",
    known: staticRoutes.includes(path),
  };
}

export default function App({ pathname }: { pathname?: string }) {
  const initialPath =
    (
      pathname ??
      (typeof window === "undefined" ? "/" : window.location.pathname)
    ).replace(/\/$/, "") || "/";
  const { path, arriving } = usePortfolioNavigation(
    initialPath,
    staticRoutes,
    metadata
  );
  useSmoothScroll(path !== "/");
  if (path === "/") return <Home />;

  const page = sections.find(page => page.path === path);
  const project = projects.find(project => path === `/work/${project.slug}`);

  return (
    <div className={`site-wrap${arriving ? " page-arriving" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main-content" className="portfolio-content" tabIndex={-1}>
        {page ? (
          <PortfolioPage page={page} />
        ) : project ? (
          <ProjectPage project={project} />
        ) : (
          <section className="page-shell not-found">
            <div className="page-heading">
              <span className="page-kicker">404</span>
              <h1 className="page-title">Page not found.</h1>
            </div>
            <div className="empty-state">
              <a href="/">Go to bookshelf ↗</a>
            </div>
            <nav className="footer-links not-found-links" aria-label="Pages">
              <a href="/work">Work</a>
              <a href="/play">Play</a>
              <a href="/about">About</a>
              <a href="/resume.pdf">Resume</a>
            </nav>
          </section>
        )}
      </main>
      <Footer />
      <CatCta hidden={path === "/work"} />
    </div>
  );
}
