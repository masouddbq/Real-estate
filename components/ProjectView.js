"use client";

import Link from "next/link";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.18 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export default function ProjectView({ project }) {
  useReveal();

  return (
    <article className="project" style={{ "--c": project.color, "--deep": project.colorDeep }}>
      <section className="proj-hero">
        <div className="proj-copy">
          <p className="kicker">{project.name}</p>
          <h1>{project.headline}</h1>
          <Link href={`/contact?topic=${project.slug}`} className="pill light" data-color="#1f2b5e">
            {project.price}
          </Link>
        </div>
        <figure className="proj-media">
          <img src={project.hero} alt={project.name} />
        </figure>
      </section>

      <section className="proj-lead" data-reveal>
        <h2>{project.subhead}</h2>
        <p>{project.lead}</p>
        {project.note && <p className="note">{project.note}</p>}
      </section>

      <section className="film" aria-label="تصاویر پروژه">
        <div className="film-track">
          {project.gallery.map((src) => (
            <figure key={src}>
              <img src={src} alt="" />
            </figure>
          ))}
        </div>
      </section>

      {project.quotes[0] && (
        <blockquote className="quote" data-reveal>
          <p>«{project.quotes[0].text}»</p>
          <cite>
            {project.quotes[0].source}
            <small>{project.quotes[0].note}</small>
          </cite>
        </blockquote>
      )}

      <section className="facts">
        {project.facts.map((fact) => (
          <article key={fact.title} data-reveal>
            <h3>{fact.title}</h3>
            <p>{fact.body}</p>
          </article>
        ))}
      </section>

      {project.quotes[1] && (
        <blockquote className="quote quote-alt" data-reveal>
          <p>«{project.quotes[1].text}»</p>
          <cite>
            {project.quotes[1].source}
            <small>{project.quotes[1].note}</small>
          </cite>
        </blockquote>
      )}

      <section className="proj-end">
        <div>
          <p className="kicker light">{project.short}</p>
          <h2>اگر این مقصد با هدف شما یکی است، از همین‌جا شروع کنیم.</h2>
        </div>
        <Link href={`/contact?topic=${project.slug}`} className="pill light" data-color="#1f2b5e">
          درخواست گفتگو
        </Link>
      </section>
    </article>
  );
}
