import React, { useCallback, useId, useRef } from "react";
import { useStore } from "../utils/useStore.js";
import { useModalAccessibility } from "../utils/useModalAccessibility.js";

export default function ProjectModal() {
  const project = useStore((s) => s.activeProject);
  const closeProject = useStore((s) => s.closeProject);

  const titleId = useId();
  const descId = useId();
  const closeButtonRef = useRef(null);

  const close = useCallback(() => {
    closeProject();
  }, [closeProject]);

  const modalRef = useModalAccessibility({
    open: Boolean(project),
    onClose: close,
    initialFocusRef: closeButtonRef,
  });

  if (!project) return null;

  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        style={{ "--accent": project.accent }}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={close}
          aria-label={`Close ${project.title} project details`}
        >
          ✕
        </button>

        <div className="modal-head">
          <span className="modal-tag">{project.tag}</span>
          <span className="modal-number" aria-label={`Project number ${project.number}`}>
            {project.number}
          </span>
        </div>

        <h2 id={titleId} className="modal-title">
          {project.title}
        </h2>

        <p id={descId} className="modal-short">
          {project.short}
        </p>

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

        <div className="modal-tech" aria-label={`${project.title} technologies`}>
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="modal-actions">
          {project.links.live && (
            <a
              className="btn btn-primary"
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo ↗
            </a>
          )}

          {project.links.github && (
            <a
              className="btn btn-ghost"
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
