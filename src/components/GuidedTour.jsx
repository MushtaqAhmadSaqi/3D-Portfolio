import React, { useEffect } from "react";
import { useStore } from "../utils/useStore.js";
import { projects } from "../data/projects.js";

/**
 * Guided tour: walks the camera through each point of interest, pausing briefly.
 * Press "T" to toggle, or use the HUD button.
 */
export default function GuidedTour() {
  const mode = useStore((s) => s.mode);
  const step = useStore((s) => s.tourStep);
  const setStep = useStore((s) => s.setTourStep);
  const setCameraTarget = useStore((s) => s.setCameraTarget);
  const setMode = useStore((s) => s.setMode);

  // Build the tour path from real data
  const stops = [
    { label: "Welcome · MAS", position: [0, 4.6, 0], distance: 5 },
    { label: "About Me", position: [0, 2.0, 0], distance: 4 },
    ...projects.map((p) => ({ label: p.title, position: p.position, distance: 4 })),
    { label: "Skills", position: [-8, 3.6, 2], distance: 4 },
    { label: "Resume", position: [8, 2.4, 2], distance: 4 },
    { label: "Contact", position: [0, 1.2, -8], distance: 4 },
  ];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "t") setMode(mode === "tour" ? "explore" : "tour");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, setMode]);

  useEffect(() => {
    if (mode !== "tour") return;
    setCameraTarget(stops[step]);
    const t = setTimeout(() => {
      const next = (step + 1) % stops.length;
      setStep(next);
    }, 4500);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [mode, step]);

  return null;
}
