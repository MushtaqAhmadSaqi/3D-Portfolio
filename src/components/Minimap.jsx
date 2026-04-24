import React from "react";
import { projects } from "../data/projects.js";
import { useStore } from "../utils/useStore.js";

/**
 * Simple top-down minimap of the scene. Click a dot to focus that object.
 */
export default function Minimap() {
  const setCameraTarget = useStore((s) => s.setCameraTarget);
  const openProject = useStore((s) => s.openProject);

  const SIZE = 140; // px
  const WORLD = 16; // world half-range mapped to minimap
  const mapX = (x) => SIZE / 2 + (x / WORLD) * (SIZE / 2);
  const mapZ = (z) => SIZE / 2 + (z / WORLD) * (SIZE / 2);

  const staticDots = [
    { id: "me", x: 0, z: 0, color: "#38bdf8", label: "MAS" },
    { id: "skills", x: -8, z: 2, color: "#a78bfa", label: "Skills" },
    { id: "resume", x: 8, z: 2, color: "#f472b6", label: "Resume" },
    { id: "contact", x: 0, z: -8, color: "#f472b6", label: "Contact" },
  ];

  return (
    <div className="minimap" aria-hidden="false">
      <div className="minimap-title">Studio Map</div>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <rect x="0" y="0" width={SIZE} height={SIZE} rx="12" fill="rgba(15,23,42,0.65)" />
        <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 2} fill="none" stroke="rgba(148,163,184,0.18)" />
        {staticDots.map((d) => (
          <g key={d.id}>
            <circle cx={mapX(d.x)} cy={mapZ(d.z)} r="5" fill={d.color} />
          </g>
        ))}
        {projects.map((p) => (
          <g
            key={p.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCameraTarget({ position: p.position, distance: 4 });
              openProject(p);
            }}
          >
            <circle cx={mapX(p.position[0])} cy={mapZ(p.position[2])} r="4" fill={p.accent} />
          </g>
        ))}
      </svg>
    </div>
  );
}
