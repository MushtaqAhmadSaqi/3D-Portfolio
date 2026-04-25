import React, { Suspense, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import EnterOverlay from "./components/EnterOverlay.jsx";
import Scene from "./components/Scene.jsx";
import HUD from "./components/HUD.jsx";
import Minimap from "./components/Minimap.jsx";
import TourOverlay from "./components/TourOverlay.jsx";
import QuickLinks from "./components/QuickLinks.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import AboutModal from "./components/AboutModal.jsx";
import ContactModal from "./components/ContactModal.jsx";
import SoundManager from "./components/SoundManager.jsx";
import MobileFallback from "./components/MobileFallback.jsx";
import { useDeviceCapability } from "./utils/useDeviceCapability.js";
import { useStore } from "../utils/useStore.js";

export default function App() {
  const capability = useDeviceCapability();

  const forceFallback = useStore((s) => s.forceFallback);
  const experienceOverride = useStore((s) => s.experienceOverride);
  const setExperienceOverride = useStore((s) => s.setExperienceOverride);
  const entered = useStore((s) => s.entered);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const force = params.get("force");

    if (mode === "2d") setExperienceOverride("2d");
    if (mode === "3d" || force === "3d") setExperienceOverride("3d");
  }, [setExperienceOverride]);

  const shouldShowFallback =
    experienceOverride === "2d" ||
    forceFallback ||
    (capability.isLowPower && experienceOverride !== "3d");

  if (shouldShowFallback) {
    return (
      <MobileFallback
        reason={capability.reason}
        isRecommended={capability.isLowPower && experienceOverride !== "3d"}
      />
    );
  }

  return (
    <>
      <LoadingScreen />
      {!entered && <EnterOverlay />}

      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {entered && (
        <>
          <HUD />
          <Minimap />
          <TourOverlay />
          <QuickLinks />
          <ProjectModal />
          <AboutModal />
          <ContactModal />
          <SoundManager />
        </>
      )}
    </>
  );
}
