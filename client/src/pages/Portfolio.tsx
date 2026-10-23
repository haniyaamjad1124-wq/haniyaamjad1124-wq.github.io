import React from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  aboutPortrait,
  projects,
  rumiArtwork,
  type PageDefinition,
  type Project,
} from "../data/sections";
import FluidSurface from "../components/portfolio/FluidSurface";

function Body({ paragraphs }: { paragraphs: string[] }) {
  return paragraphs.length ? (
    <div className="page-body">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  ) : null;
}

function WorkPage({ page }: { page: PageDefinition }) {
  return (
    <section className="editorial-page work-page">
      <header className="editorial-heading">
        <span className="small-label">01 / WORK</span>
        <h1>
          Work<span className="accent-period">.</span>
        </h1>
        <span className="section-axis" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </header>
      <Body paragraphs={page.body} />
      <div className="content-section-heading">
        <h2>Projects</h2>
        <span className="small-label">COMPANY & PASSION PROJECTS</span>
      </div>
      {projects.length ? (
        <div className="project-grid">
          {projects.map(project => (
            <a
              href={`/work/${project.slug}`}
              className="project-item"
              key={project.slug}
            >
              {project.cover && (
                <img src={project.cover} alt="" loading="lazy" />
              )}
              <div>
                <h3>{project.title}</h3>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
              {project.summary && <p>{project.summary}</p>}
            </a>
          ))}
        </div>
      ) : (
        <FluidSurface className="work-empty">
          <span className="small-label">NO PROJECTS ADDED YET</span>
          <div className="empty-crosshair" aria-hidden="true">
            <i />
            <i />
          </div>
        </FluidSurface>
      )}
    </section>
  );
}

function AboutPage({ page }: { page: PageDefinition }) {
  return (
    <section className="editorial-page about-page">
      <header className="editorial-heading">
        <span className="small-label">03 / ABOUT</span>
        <h1>
          About<span className="accent-period">.</span>
        </h1>
        <span className="section-axis" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </header>
      <section className="about-layout" aria-label="About Haniya Amjad">
        <div className="portrait-options portrait-single">
          <figure className="portrait-option portrait-option-color">
            <div className="portrait-frame">
              <img
                className="portrait-image"
                src={aboutPortrait}
                alt="Haniya Amjad"
                width={1200}
                height={1500}
              />
            </div>
          </figure>
          <Body paragraphs={page.body} />
        </div>
      </section>
    </section>
  );
}

function ReminiscencePage({ page }: { page: PageDefinition }) {
  return (
    <section className="editorial-page rumi-page">
      <header className="editorial-heading">
        <span className="small-label">02 / REMINISCENCE</span>
        <h1>
          Reminiscence<span className="accent-period">.</span>
        </h1>
        <span className="section-axis" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </header>
      <FluidSurface className="rumi-hero">
        <figure className="india-landscape">
          <img
            className="rumi-material"
            src={rumiArtwork}
            alt="Illustration of a train journey through a green Indian landscape"
          />
          <figcaption className="small-label">
            INDIA · AN EDITORIAL ILLUSTRATION
          </figcaption>
        </figure>
      </FluidSurface>
      {page.body.length > 0 && (
        <div className="remi-content">
          <Body paragraphs={page.body} />
        </div>
      )}
    </section>
  );
}

export function PortfolioPage({ page }: { page: PageDefinition }) {
  if (page.path === "/work") return <WorkPage page={page} />;
  if (page.path === "/about") return <AboutPage page={page} />;
  return <ReminiscencePage page={page} />;
}

export function ProjectPage({ project }: { project: Project }) {
  return (
    <section className="editorial-page reading-page">
      <a className="back-link" href="/work">
        <ArrowLeft size={14} aria-hidden="true" /> Work
      </a>
      <header>
        <span className="small-label">PROJECT</span>
        <h1>{project.title}</h1>
        {project.summary && <p>{project.summary}</p>}
      </header>
      {project.cover && (
        <img className="project-cover" src={project.cover} alt="" />
      )}
      <Body paragraphs={project.body} />
    </section>
  );
}
