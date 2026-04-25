import React, { useEffect, useMemo, useRef } from "react";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

export default function EnterOverlay() {
  const loaded = useStore((s) => s.loaded);
  const entered = useStore((s) => s.entered);
  const enter = useStore((s) => s.enter);
  const toggleMuted = useStore((s) => s.toggleMuted);
  const muted = useStore((s) => s.muted);

  const primaryButtonRef = useRef(null);

  const nameParts = useMemo(() => {
    const parts = profile.name.trim().split(/\s+/);

    return {
      first: parts.slice(0, -1).join(" "),
      last: parts.at(-1) || "",
    };
  }, []);

  useEffect(() => {
    if (!loaded || entered) return;

    const timer = window.setTimeout(() => {
      primaryButtonRef.current?.focus?.();
    }, 80);

    return () => window.clearTimeout(timer);
  }, [loaded, entered]);

  if (!loaded || entered) return null;

  const handleEnter = (withSound) => {
    if (withSound && muted) toggleMuted();
    enter();
  };

  return (
    <div
      className="enter-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enter-title"
      aria-describedby="enter-description"
    >
      <div className="enter-content">
        <p className="enter-eyebrow">Welcome to the studio of</p>

        <h1 id="enter-title" className="enter-name">
          {nameParts.first} <span className="enter-serif">{nameParts.last}</span>
        </h1>

        <p id="enter-description" className="enter-sub">
          A 3D, interactive portfolio. Float through holograms of real projects, skills, and
          contact channels. {profile.role} · {profile.university}.
        </p>

        <div className="enter-actions">
          <button
            ref={primaryButtonRef}
            className="btn btn-primary"
            onClick={() => handleEnter(true)}
          >
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
