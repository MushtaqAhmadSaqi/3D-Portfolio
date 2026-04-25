import React, { useState } from "react";
import { profile } from "../data/profile.js";
import { useStore } from "../utils/useStore.js";

export default function QuickLinks() {
  const [open, setOpen] = useState(false);
  const toggleAbout = useStore((s) => s.toggleAbout);
  const toggleContact = useStore((s) => s.toggleContact);
  const setFallback = useStore((s) => s.setForceFallback);

  return (
    <div className={`quick-links ${open ? "is-open" : ""}`}>
      <button
        className="quick-links-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="quick-links-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">✦</span>
        Quick Links
      </button>

      <div id="quick-links-panel" className="quick-links-panel">
        <button type="button" onClick={() => toggleAbout(true)}>
          About
        </button>

        <button type="button" onClick={() => toggleContact(true)}>
          Contact
        </button>

        <a href={profile.resume} download>
          Resume ↓
        </a>

        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>

        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>

        <a href={`mailto:${profile.email}`}>
          Email
        </a>

        <button type="button" onClick={() => setFallback(true)}>
          2D Mode
        </button>
      </div>
    </div>
  );
}
