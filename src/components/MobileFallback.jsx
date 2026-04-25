import React from "react";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { useStore } from "../utils/useStore.js";

/**
 * Lightweight 2D version of the portfolio for low-power devices,
 * mobile users, accessibility users, or anyone who prefers a classic site.
 */
export default function MobileFallback({ reason = "", isRecommended = false }) {
  const setExperienceOverride = useStore((s) => s.setExperienceOverride);

  const try3D = () => {
    setExperienceOverride("3d");
  };

  return (
    <div className="fallback">
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>

      <header className="fallback-header">
        <div className="brand-chip">
          <span className="brand-mark">{profile.initials}</span>
          <div>
            <div className="brand-name">{profile.name}</div>
            <div className="brand-role">{profile.role}</div>
          </div>
        </div>

        <nav className="fallback-nav" aria-label="Portfolio links">
          <a className="chip" href="#projects">
            Projects
          </a>
          <a className="chip" href={`mailto:${profile.email}`}>
            Contact
          </a>
          <a className="chip primary" href={profile.resume} download>
            Resume ↓
          </a>
        </nav>
      </header>

      <main>
        <section className="fallback-hero">
          <p className="eyebrow">
            {profile.role} · {profile.university}
          </p>

          <h1>{profile.tagline}</h1>

          <p className="fallback-intro">
            A fast, accessible version of my interactive 3D portfolio. You can browse the same
            projects, skills, resume, and contact links without heavy graphics.
          </p>

          {isRecommended && (
            <div className="fallback-notice" role="status">
              <strong>2D mode recommended</strong>
              <span>
                {reason ||
                  "This device may have limited graphics performance for the full 3D experience."}
              </span>
            </div>
          )}

          <div className="fallback-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-ghost" href={profile.resume} download>
              Download Resume
            </a>
            <button className="btn btn-ghost" type="button" onClick={try3D}>
              Try 3D Experience
            </button>
          </div>

          <div className="fallback-summary" aria-label="Profile highlights">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="stat-chip">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fallback-about" aria-labelledby="about-title">
          <div className="fallback-section-head">
            <span className="modal-tag">About</span>
            <h2 id="about-title">What I build</h2>
          </div>

          <div className="fallback-about-grid">
            <div className="about-photo">
              <img
                src={profile.photo}
                alt={profile.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div>
              {profile.about.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <div className="availability-note">{profile.availability}</div>
            </div>
          </div>
        </section>

        <section id="projects" className="fallback-projects" aria-labelledby="projects-title">
          <div className="fallback-section-head">
            <span className="modal-tag">Selected Work</span>
            <h2 id="projects-title">Projects</h2>
          </div>

          <div className="grid">
            {projects.map((p) => (
              <article key={p.id} className="card" style={{ "--accent": p.accent }}>
                <div className="card-topline">
                  <span className="card-tag">{p.tag}</span>
                  <span className="modal-number">{p.number}</span>
                </div>

                <h3>{p.title}</h3>

                {p.preview && (
                  <img
                    src={p.preview}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <p>{p.short}</p>

                <div className="tech" aria-label={`${p.title} technologies`}>
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="links card-links">
                  {p.links.live ? (
                    <a href={p.links.live} target="_blank" rel="noopener noreferrer">
                      Live Demo ↗
                    </a>
                  ) : (
                    <span className="muted-link">Live demo unavailable</span>
                  )}

                  {p.links.github && (
                    <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="fallback-skills" aria-labelledby="skills-title">
          <div className="fallback-section-head">
            <span className="modal-tag">Skills</span>
            <h2 id="skills-title">Current toolkit</h2>
          </div>

          <div className="skills-list">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div key={group} className="skills-group-card">
                <h3>{group}</h3>
                <div className="skills-pills">
                  {items.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="fallback-contact" aria-labelledby="contact-title">
          <div className="fallback-section-head">
            <span className="modal-tag">Contact</span>
            <h2 id="contact-title">Let’s build something useful</h2>
          </div>

          <p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>

          <p>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            ·{" "}
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </div>
  );
}
