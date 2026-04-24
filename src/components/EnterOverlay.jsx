import React from "react";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

export default function EnterOverlay() {
  const loaded = useStore((s) => s.loaded);
  const entered = useStore((s) => s.entered);
  const enter = useStore((s) => s.enter);
  const toggleMuted = useStore((s) => s.toggleMuted);
  const muted = useStore((s) => s.muted);

  if (!loaded || entered) return null;

  const handleEnter = (withSound) => {
    if (withSound && muted) toggleMuted();
    enter();
  };

  return (
    <div className="enter-overlay">
      <div className="enter-content">
        <p className="enter-eyebrow">Welcome to the studio of</p>
        <h1 className="enter-name">
          {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="enter-serif">{profile.name.split(" ").slice(-1)}</span>
        </h1>
        <p className="enter-sub">
          A 3D, interactive portfolio. Float through holograms of real projects, skills, and
          contact channels. {profile.role} · {profile.university}.
        </p>
        <div className="enter-actions">
          <button className="btn btn-primary" onClick={() => handleEnter(true)}>
            Enter with sound
          </button>
          <button className="btn btn-ghost" onClick={() => handleEnter(false)}>
            Enter silently
          </button>
        </div>
        <p className="enter-hint">
          Drag to look around · Click holograms to open details · Press <kbd>T</kbd> for guided tour
        </p>
      </div>
    </div>
  );
}
