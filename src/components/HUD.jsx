import React from "react";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

export default function HUD() {
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);
  const muted = useStore((s) => s.muted);
  const toggleMuted = useStore((s) => s.toggleMuted);
  const toggleAbout = useStore((s) => s.toggleAbout);
  const toggleContact = useStore((s) => s.toggleContact);
  const setFallback = useStore((s) => s.setForceFallback);

  return (
    <>
      <div className="hud hud-top-left">
        <div className="brand-chip" aria-label={`${profile.name}, ${profile.role}`}>
          <span className="brand-mark" aria-hidden="true">
            {profile.initials}
          </span>
          <div>
            <div className="brand-name">{profile.name}</div>
            <div className="brand-role">{profile.role}</div>
          </div>
        </div>
      </div>

      <nav className="hud hud-top-right" aria-label="Primary portfolio navigation">
        <button className="chip" onClick={() => toggleAbout(true)}>
          About
        </button>

        <button className="chip" onClick={() => toggleContact(true)}>
          Contact
        </button>

        <a className="chip" href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>

        <a className="chip" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>

        <a className="chip primary" href={profile.resume} download>
          Resume ↓
        </a>
      </nav>

      <div className="hud hud-bottom-left">
        <div className="mode-toggle" role="group" aria-label="Experience mode">
          <button
            className={mode === "explore" ? "active" : ""}
            aria-pressed={mode === "explore"}
            onClick={() => setMode("explore")}
          >
            Free Explore
          </button>

          <button
            className={mode === "tour" ? "active" : ""}
            aria-pressed={mode === "tour"}
            onClick={() => setMode("tour")}
          >
            Guided Tour
          </button>
        </div>

        <button
          className="chip"
          onClick={toggleMuted}
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
        >
          {muted ? "🔇 Sound off" : "🔊 Sound on"}
        </button>

        <button
          className="chip ghost"
          onClick={() => setFallback(true)}
          aria-label="Switch to the lightweight 2D portfolio"
        >
          Switch to 2D
        </button>
      </div>

      <div className="hud hud-bottom-right">
        <div className="hint" role="note">
          Drag to look · Scroll to zoom · Click holograms · Press <kbd>T</kbd> for tour
        </div>
      </div>
    </>
  );
}
