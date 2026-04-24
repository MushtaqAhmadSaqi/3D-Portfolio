import React, { Suspense, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import EnterOverlay from "./components/EnterOverlay.jsx";
import Scene from "./components/Scene.jsx";
import HUD from "./components/HUD.jsx";
import Minimap from "./components/Minimap.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import AboutModal from "./components/AboutModal.jsx";
import ContactModal from "./components/ContactModal.jsx";
import SoundManager from "./components/SoundManager.jsx";
import MobileFallback from "./components/MobileFallback.jsx";
import { useDeviceCapability } from "./utils/useDeviceCapability.js";
import { useStore } from "./utils/useStore.js";

export default function App() {
  const { isLowPower } = useDeviceCapability();
  const forceFallback = useStore((s) => s.forceFallback);
  const entered = useStore((s) => s.entered);

  // Allow users to opt into the 3D experience even on low-power
  // devices via ?force=3d, or opt into the 2D fallback via ?mode=2d
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "2d") useStore.setState({ forceFallback: true });
  }, []);

  if (isLowPower || forceFallback) return <MobileFallback />;

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
          <ProjectModal />
          <AboutModal />
          <ContactModal />
          <SoundManager />
        </>
      )}
    </>
  );
}
