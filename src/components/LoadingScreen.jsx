import React, { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const loaded = useStore((s) => s.loaded);
  const setLoaded = useStore((s) => s.setLoaded);
  const setProgress = useStore((s) => s.setProgress);

  useEffect(() => {
    setProgress(progress);
    if (progress >= 100 && !active) {
      const t = setTimeout(() => setLoaded(true), 400);
      return () => clearTimeout(t);
    }
  }, [progress, active]);

  if (loaded) return null;

  return (
    <div className="loader">
      <div className="loader-logo">
        <span className="loader-mas">{profile.initials}</span>
        <div className="loader-ring" />
      </div>
      <div className="loader-name">{profile.name}</div>
      <div className="loader-role">{profile.role}</div>
      <div className="loader-bar">
        <div
          className="loader-bar-fill"
          style={{ width: `${Math.min(100, progress).toFixed(0)}%` }}
        />
      </div>
      <div className="loader-pct">{Math.min(100, progress).toFixed(0)}%</div>
    </div>
  );
}
