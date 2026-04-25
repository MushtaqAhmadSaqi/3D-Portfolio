import React, { useEffect, useMemo } from "react";
import { useStore } from "../utils/useStore.js";
import { projects } from "../data/projects.js";
import { getProjectFocusTarget, STATIC_FOCUS_TARGETS } from "../utils/focusTargets.js";

/**
 * Guided tour: walks the camera through each point of interest.
 * Press "T" to toggle, or use the HUD button.
 */
export default function GuidedTour() {
  const mode = useStore((s) => s.mode);
  const step = useStore((s) => s.tourStep);
  const setStep = useStore((s) => s.setTourStep);
  const focusTarget = useStore((s) => s.focusTarget);
  const setMode = useStore((s) => s.setMode);

  const stops = useMemo(
    () => [
      STATIC_FOCUS_TARGETS.mas,
      STATIC_FOCUS_TARGETS.about,
      ...projects.map(getProjectFocusTarget),
      STATIC_FOCUS_TARGETS.skills,
      STATIC_FOCUS_TARGETS.resume,
      STATIC_FOCUS_TARGETS.contact,
    ],
    []
  );

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        e.target?.isContentEditable;

      if (isTyping) return;

      if (e.key.toLowerCase() === "t") {
        setMode(mode === "tour" ? "explore" : "tour");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, setMode]);

  useEffect(() => {
    if (mode !== "tour") return;

    const safeStep = step % stops.length;
    focusTarget(stops[safeStep]);

    const timer = setTimeout(() => {
      setStep((safeStep + 1) % stops.length);
    }, 4600);

    return () => clearTimeout(timer);
  }, [mode, step, stops, focusTarget, setStep]);

  return null;
}
