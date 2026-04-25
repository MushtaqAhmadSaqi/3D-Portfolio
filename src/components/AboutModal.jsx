import React, { useCallback, useId, useMemo, useRef } from "react";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";
import { useModalAccessibility } from "../utils/useModalAccessibility.js";

export default function AboutModal() {
  const open = useStore((s) => s.aboutOpen);
  const toggleAbout = useStore((s) => s.toggleAbout);

  const titleId = useId();
  const descId = useId();
  const closeButtonRef = useRef(null);

  const close = useCallback(() => {
    toggleAbout(false);
  }, [toggleAbout]);

  const modalRef = useModalAccessibility({
    open,
    onClose: close,
    initialFocusRef: closeButtonRef,
  });

  const nameParts = useMemo(() => {
    const parts = profile.name.trim().split(/\s+/);

    return {
      first: parts.slice(0, -1).join(" "),
      last: parts.at(-1) || "",
    };
  }, []);

  if (!open) return null;

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
        style={{ "--accent": "#38bdf8" }}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={close}
          aria-label="Close about dialog"
        >
          ✕
        </button>

        <span className="modal-tag">About</span>

        <h2 id={titleId} className="modal-title">
          {nameParts.first} <span className="serif">{nameParts.last}</span>
        </h2>

        <p id={descId} className="modal-short">
          {profile.tagline}
        </p>

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

        {profile.about.map((p, i) => (
          <p key={i} className="modal-desc">
            {p}
          </p>
        ))}

        <div className="stat-row" aria-label="Profile statistics">
          {profile.stats.map((s) => (
            <div key={s.label} className="stat-chip">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="availability-note">{profile.availability}</div>

        <h3 className="modal-sub">Journey</h3>
        <div className="journey">
          {profile.journey.map((j) => (
            <div key={j.step} className="journey-item">
              <span>{j.step}</span>
              <div>
                <strong>{j.title}</strong>
                <p>{j.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="modal-sub">Vision</h3>
        <blockquote className="vision">{profile.vision}</blockquote>

        <div className="modal-actions">
          <a className="btn btn-primary" href={profile.resume} download>
            Download Resume
          </a>
          <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
            Email Me
          </a>
        </div>
      </div>
    </div>
  );
}
