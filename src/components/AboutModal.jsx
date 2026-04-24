import React from "react";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

export default function AboutModal() {
  const open = useStore((s) => s.aboutOpen);
  const toggle = useStore((s) => s.toggleAbout);
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={() => toggle(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ "--accent": "#38bdf8" }}>
        <button className="modal-close" onClick={() => toggle(false)}>✕</button>
        <span className="modal-tag">About</span>
        <h2 className="modal-title">
          {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="serif">{profile.name.split(" ").slice(-1)}</span>
        </h2>
        <p className="modal-short">{profile.tagline}</p>

        <div className="about-photo">
          <img
            src={profile.photo}
            alt={profile.name}
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        {profile.about.map((p, i) => (
          <p key={i} className="modal-desc">{p}</p>
        ))}

        <div className="stat-row">
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
          <a className="btn btn-primary" href={profile.resume} download>Download Resume</a>
          <a className="btn btn-ghost" href={`mailto:${profile.email}`}>Email Me</a>
        </div>
      </div>
    </div>
  );
}
