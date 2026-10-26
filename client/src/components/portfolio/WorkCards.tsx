import React, { useEffect, useRef, useState } from "react";
import { FolderDot } from "lucide-react";
import type { ListBlock as ListBlockData, Project } from "../../data/sections";

/* Arrow used on badges and pills. Same drawing as the reference, 16px box. */
export function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13.667 1.583H4a.75.75 0 0 0 0 1.5h7.856L1.803 13.136a.75.75 0 1 0 1.061 1.061L12.917 4.144V12a.75.75 0 0 0 1.5 0V2.333a.75.75 0 0 0-.75-.75Z"
      />
    </svg>
  );
}

/* Fades a block up 30px the first time it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    // Safety: if the observer never reports (hidden tab, odd embed), show anyway.
    const fallback = window.setTimeout(() => setShown(true), 1800);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return { ref, shown };
}

export function WorksLabel({ text }: { text: string }) {
  return (
    <div className="works-label">
      <FolderDot size={24} strokeWidth={1.5} aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

export function WorkCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { ref, shown } = useReveal<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href={`/work/${project.slug}`}
      className={`work-card${shown ? " is-shown" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="work-frame">
        <img src={project.cover} alt="" width={1920} height={1440} loading="lazy" decoding="async" />
        {project.tags.length > 0 && (
          <div className="work-tags">
            {project.tags.map(tag => (
              <span className="work-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="work-badge" aria-hidden="true">
          <Arrow />
        </span>
      </div>
      <div className="work-caption">
        <span className="work-client">{project.client}</span>
        <i className="work-dot" aria-hidden="true" />
        <span className="work-project">{project.project}</span>
        <span className="work-year">{project.year}</span>
      </div>
    </a>
  );
}

export function WorksGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="works-grid">
      {projects.map((project, i) => (
        <WorkCard project={project} index={i} key={project.slug} />
      ))}
    </div>
  );
}

export function ListBlock({ block }: { block: ListBlockData }) {
  const { ref, shown } = useReveal<HTMLElement>();
  if (!block.items.length) return null;
  return (
    <section ref={ref} className={`list-block${shown ? " is-shown" : ""}`} aria-label={block.heading}>
      <div className="list-block-copy">
        <h2>{block.heading}</h2>
        {block.intro && <p>{block.intro}</p>}
      </div>
      <ul className="list-rows">
        {block.items.map(item => (
          <li className="list-row" key={item.name + item.url}>
            <div className="list-text">
              <span className="list-name">{item.name}</span>
              {item.sub && (
                <>
                  <i className="work-dot" aria-hidden="true" />
                  <span className="list-sub">{item.sub}</span>
                </>
              )}
            </div>
            <a className="pill" href={item.url} target="_blank" rel="noopener noreferrer">
              View <Arrow />
              <span className="sr-only">{item.name}, opens in a new tab</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
