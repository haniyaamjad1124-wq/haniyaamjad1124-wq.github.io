import React from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  aboutBook,
  aboutPortrait,
  community,
  projects,
  rumiArtwork,
  sideProjects,
  type PageDefinition,
  type Project,
} from "../data/sections";
import FluidSurface from "../components/portfolio/FluidSurface";
import FlipBook from "../components/portfolio/FlipBook";
import { Arrow, ListBlock, WorkCard, WorksGrid, WorksLabel, useReveal } from "../components/portfolio/WorkCards";

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
          Work
        </h1>
        <span className="section-axis" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </header>
      <Body paragraphs={page.body} />
      <WorksLabel text="Selected works" />
      {projects.length ? (
        <WorksGrid projects={projects} />
      ) : (
        <FluidSurface className="work-empty">
          <span className="small-label">NO PROJECTS ADDED YET</span>
          <div className="empty-crosshair" aria-hidden="true">
            <i />
            <i />
          </div>
        </FluidSurface>
      )}
      <ListBlock block={sideProjects} />
      <ListBlock block={community} />
    </section>
  );
}

function FeedPost({ paragraph }: { paragraph: string }) {
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <article ref={ref} className={`feed-post${shown ? " is-shown" : ""}`}>
      <p>{paragraph}</p>
    </article>
  );
}

/* the scroll cue is a prompt: it fades once the reader has started scrolling */
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function AboutPage({ page }: { page: PageDefinition }) {
  const [lede, ...posts] = page.body;
  const scrolled = useScrolled();
  return (
    <section className="editorial-page about-page about-feed">
      <header className="feed-hero">
        <span className="feed-hero-axis" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="feed-hero-copy">
          <span className="small-label">03 / ABOUT</span>
          <h1>
            About
          </h1>
          {lede && <p className="feed-lede">{lede}</p>}
        </div>
        <figure className="feed-portrait">
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
        <a className={`feed-scroll-cue${scrolled ? " is-hidden" : ""}`} href="#feed" aria-label="Scroll to read more">
          <i aria-hidden="true" />
          Scroll
        </a>
      </header>
      <div id="feed" className="feed" aria-label="About Haniya Amjad">
        {posts.map((paragraph, i) => (
          <FeedPost key={i} paragraph={paragraph} />
        ))}
      </div>
      <div className="feed-end">
        <span className="small-label">NEXT</span>
        <a className="pill" href="/work">
          Selected works <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      {aboutBook.length > 0 && (
      <section className="about-book" aria-label="Different sides of Haniya">
        <span className="small-label">DIFFERENT SIDES</span>
        <FlipBook
          title="Haniya Amjad"
          subtitle="different sides of the same person"
          pages={aboutBook}
          closing="Nothing is unlearnable or off-limits."
        />
      </section>
      )}
    </section>
  );
}

function ReminiscencePage({ page }: { page: PageDefinition }) {
  return (
    <section className="editorial-page rumi-page">
      <header className="editorial-heading">
        <span className="small-label">02 / REMINISCENCE</span>
        <h1>
          Reminiscence
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
  const i = projects.findIndex(p => p.slug === project.slug);
  const next = [projects[(i + 1) % projects.length], projects[(i + 2) % projects.length]].filter(
    (p, k, arr) => p && p.slug !== project.slug && arr.indexOf(p) === k
  );
  const images = project.images ?? [];
  return (
    <section className="editorial-page project-page">
      <div className="project-top">
        <a className="pill" href="/work">
          <ArrowLeft size={14} aria-hidden="true" /> Back
        </a>
        {project.caseStudyUrl && (
          <a className="pill dark" href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
            Full case study <Arrow />
          </a>
        )}
      </div>
      <div className="project-head">
        <h1>{project.title ?? `${project.client}, ${project.project}`}</h1>
      </div>
      <figure className="project-hero">
        <img src={project.cover} alt="" width={1920} height={1440} />
      </figure>
      <div className="project-copy">
        <span className="label">Goal</span>
        <div className="goal">
          {project.goal.map((paragraph, k) => (
            <p key={k}>{paragraph}</p>
          ))}
          {project.demoUrl && (
            <div className="project-demo">
              <a className="pill dark" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Try the live demo <Arrow />
              </a>
              {project.demoNote && <p className="project-demo-note">{project.demoNote}</p>}
            </div>
          )}
        </div>
        {(project.sections ?? []).map(section => (
          <React.Fragment key={section.title}>
            <span className="label">{section.title}</span>
            <div className="goal">
              {section.body.map((paragraph, k) => (
                <p key={k}>{paragraph}</p>
              ))}
            </div>
          </React.Fragment>
        ))}
        {(project.role || project.impact) && (
          <>
            <span className="label">Overview</span>
            <div className="project-meta">
              {project.role && (
                <div>
                  <span>Role</span>
                  <span>{project.role}</span>
                </div>
              )}
              {project.impact && (
                <div>
                  <span>Impact</span>
                  <span>{project.impact}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {images.length > 0 && (
        <div className="project-images">
          {images.map(image => (
            <figure className="project-figure" key={image.src}>
              <img src={image.src} alt={image.caption} loading="lazy" decoding="async" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
      {next.length > 0 && (
        <div className="project-next">
          <div className="works-label">
            <span>Up next</span>
            <a href="/work">
              All works <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="works-grid">
            {next.map((p, k) => (
              <WorkCard project={p} index={k} key={p.slug} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
