import React, { useMemo } from "react";
import { projects } from "../data/projects.js";
import { useStore } from "../utils/useStore.js";
import { getProjectFocusTarget, STATIC_FOCUS_TARGETS } from "../utils/focusTargets.js";

/**
 * Top-down minimap of the scene. Click a dot to focus that object.
 */
export default function Minimap() {
  const focusTarget = useStore((s) => s.focusTarget);
  const openProject = useStore((s) => s.openProject);
  const activeFocus = useStore((s) => s.activeFocus);

  const SIZE = 140;
  const WORLD = 16;

  const mapX = (x) => SIZE / 2 + (x / WORLD) * (SIZE / 2);
  const mapZ = (z) => SIZE / 2 + (z / WORLD) * (SIZE / 2);

  const dots = useMemo(() => {
    const staticDots = [
      {
        id: "mas",
        x: 0,
        z: 0,
        color: "#38bdf8",
        label: "MAS",
        target: STATIC_FOCUS_TARGETS.mas,
      },
      {
        id: "skills",
        x: -8,
        z: 2,
        color: "#a78bfa",
        label: "Skills",
        target: STATIC_FOCUS_TARGETS.skills,
      },
      {
        id: "resume",
        x: 8,
        z: 2,
        color: "#f472b6",
        label: "Resume",
        target: STATIC_FOCUS_TARGETS.resume,
      },
      {
        id: "contact",
        x: 0,
        z: -8,
        color: "#f472b6",
        label: "Contact",
        target: STATIC_FOCUS_TARGETS.contact,
      },
    ];

    const projectDots = projects.map((project) => ({
      id: project.id,
      x: project.position[0],
      z: project.position[2],
      color: project.accent,
      label: project.title,
      project,
      target: getProjectFocusTarget(project),
    }));

    return [...staticDots, ...projectDots];
  }, []);

  return (
    <div className="minimap" aria-label="Studio minimap">
      <div className="minimap-title">Studio Map</div>

      <div className="minimap-map" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="0"
            y="0"
            width={SIZE}
            height={SIZE}
            rx="12"
            fill="rgba(15,23,42,0.65)"
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={SIZE / 2 - 2}
            fill="none"
            stroke="rgba(148,163,184,0.18)"
          />
          <line
            x1={SIZE / 2}
            y1="10"
            x2={SIZE / 2}
            y2={SIZE - 10}
            stroke="rgba(148,163,184,0.08)"
          />
          <line
            x1="10"
            y1={SIZE / 2}
            x2={SIZE - 10}
            y2={SIZE / 2}
            stroke="rgba(148,163,184,0.08)"
          />
        </svg>

        {dots.map((dot) => {
          const active = activeFocus?.id === dot.id;

          return (
            <button
              key={dot.id}
              type="button"
              className={`minimap-dot ${active ? "active" : ""}`}
              style={{
                left: mapX(dot.x),
                top: mapZ(dot.z),
                "--dot": dot.color,
              }}
              aria-label={`Focus ${dot.label}`}
              title={dot.label}
              onClick={() => {
                focusTarget(dot.target);

                if (dot.project) {
                  openProject(dot.project);
                }
              }}
            />
          );
        })}
      </div>

      <div className="minimap-focus">
        {activeFocus?.label ? activeFocus.label : "Free Explore"}
      </div>
    </div>
  );
}
