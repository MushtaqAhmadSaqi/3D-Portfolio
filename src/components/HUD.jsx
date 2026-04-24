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
      {/* Top-left brand */}
      <div className="hud hud-top-left">
        <div className="brand-chip">
          <span className="brand-mark">{profile.initials}</span>
          <div>
            <div className="brand-name">{profile.name}</div>
            <div className="brand-role">{profile.role}</div>
          </div>
        </div>
      </div>

      {/* Top-right nav */}
      <div className="hud hud-top-right">
        <button className="chip" onClick={() => toggleAbout(true)}>About</button>
        <button className="chip" onClick={() => toggleContact(true)}>Contact</button>
        <a className="chip" href={profile.github} target="_blank" rel="noopener">GitHub</a>
        <a className="chip" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <a className="chip primary" href={profile.resume} download>Resume ↓</a>
      </div>

      {/* Bottom-left: mode toggle + sound + 2D */}
      <div className="hud hud-bottom-left">
        <div className="mode-toggle">
          <button
            className={mode === "explore" ? "active" : ""}
            onClick={() => setMode("explore")}
          >
            Free Explore
          </button>
          <button
            className={mode === "tour" ? "active" : ""}
            onClick={() => setMode("tour")}
          >
            Guided Tour
          </button>
        </div>
        <button className="chip" onClick={toggleMuted} aria-label="Toggle sound">
          {muted ? "🔇 Sound off" : "🔊 Sound on"}
        </button>
        <button className="chip ghost" onClick={() => setFallback(true)}>
          Switch to 2D
        </button>
      </div>

      {/* Bottom-right: interaction hint */}
      <div className="hud hud-bottom-right">
        <div className="hint">
          Drag to look · Scroll to zoom · Click holograms · Press <kbd>T</kbd> for tour
        </div>
      </div>
    </>
  );
}
