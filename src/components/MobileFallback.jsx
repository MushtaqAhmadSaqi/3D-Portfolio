import React from "react";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { useStore } from "../utils/useStore.js";

/**
 * Lightweight 2D version of the portfolio for low-power devices,
 * accessibility users, or anyone who prefers a classic site.
 */
export default function MobileFallback() {
  const setFallback = useStore((s) => s.setForceFallback);

  return (
    <div className="fallback">
      <header className="fallback-header">
        <div className="brand-chip">
          <span className="brand-mark">{profile.initials}</span>
          <div>
            <div className="brand-name">{profile.name}</div>
            <div className="brand-role">{profile.role}</div>
          </div>
        </div>
        <button className="chip" onClick={() => setFallback(false)}>Try 3D experience →</button>
      </header>

      <section className="fallback-hero">
        <p className="eyebrow">{profile.role} · {profile.university}</p>
        <h1>{profile.tagline}</h1>
        <div className="actions">
          <a className="btn btn-primary" href="#projects">View Projects</a>
          <a className="btn btn-ghost" href={profile.resume} download>Download Resume</a>
        </div>
      </section>

      <section id="projects" className="fallback-projects">
        <h2>Projects</h2>
        <div className="grid">
          {projects.map((p) => (
            <article key={p.id} className="card" style={{ "--accent": p.accent }}>
              <span className="card-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              {p.preview && <img src={p.preview} alt={p.title} loading="lazy" />}
              <p>{p.short}</p>
              <div className="tech">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="links">
                {p.links.live && <a href={p.links.live} target="_blank" rel="noopener">Live ↗</a>}
                {p.links.github && <a href={p.links.github} target="_blank" rel="noopener">GitHub ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="fallback-contact">
        <h2>Contact</h2>
        <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        <p><a href={profile.github} target="_blank" rel="noopener">GitHub</a> · <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></p>
      </section>

      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </div>
  );
}
