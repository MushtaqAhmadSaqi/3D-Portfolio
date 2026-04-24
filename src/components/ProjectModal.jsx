import React from "react";
import { useStore } from "../utils/useStore.js";

export default function ProjectModal() {
  const project = useStore((s) => s.activeProject);
  const close = useStore((s) => s.closeProject);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{ "--accent": project.accent }}
      >
        <button className="modal-close" onClick={close} aria-label="Close">✕</button>
        <div className="modal-head">
          <span className="modal-tag">{project.tag}</span>
          <span className="modal-number">{project.number}</span>
        </div>
        <h2 className="modal-title">{project.title}</h2>
        <p className="modal-short">{project.short}</p>

        {project.preview && (
          <div className="modal-preview">
            <img src={project.preview} alt={`${project.title} preview`} loading="lazy" />
          </div>
        )}

        <p className="modal-desc">{project.description}</p>

        <ul className="modal-highlights">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        <div className="modal-tech">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="modal-actions">
          {project.links.live && (
            <a className="btn btn-primary" href={project.links.live} target="_blank" rel="noopener">
              Live Demo ↗
            </a>
          )}
          {project.links.github && (
            <a className="btn btn-ghost" href={project.links.github} target="_blank" rel="noopener">
              GitHub Repo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
