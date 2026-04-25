import React, { useEffect, useMemo } from "react";
import { useProgress } from "@react-three/drei";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

export default function LoadingScreen() {
  const { progress, active } = useProgress();

  const loaded = useStore((s) => s.loaded);
  const setLoaded = useStore((s) => s.setLoaded);
  const setProgress = useStore((s) => s.setProgress);

  const loadingMessage = useMemo(() => {
    if (progress < 30) return "Preparing the studio";
    if (progress < 65) return "Loading holographic project screens";
    if (progress < 95) return "Tuning lights, particles, and interactions";
    return "Almost ready";
  }, [progress]);

  useEffect(() => {
    setProgress(progress);

    if (progress >= 100 && !active) {
      const timer = window.setTimeout(() => setLoaded(true), 420);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [progress, active, setLoaded, setProgress]);

  if (loaded) return null;

  const safeProgress = Math.min(100, Math.max(0, progress));
  const pct = safeProgress.toFixed(0);

  return (
    <div className="loader" role="status" aria-live="polite" aria-label="Loading 3D portfolio">
      <div className="loader-logo" aria-hidden="true">
        <span className="loader-mas">{profile.initials}</span>
        <div className="loader-ring" />
        <div className="loader-ring loader-ring-secondary" />
      </div>

      <div className="loader-name">{profile.name}</div>
      <div className="loader-role">{profile.role}</div>

      <p className="loader-message">{loadingMessage}</p>

      <div className="loader-bar" aria-hidden="true">
        <div className="loader-bar-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="loader-pct">{pct}%</div>

      <p className="loader-tip">
        Tip: press <kbd>T</kbd> after entering to start the guided tour.
      </p>
    </div>
  );
}
