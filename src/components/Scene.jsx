import React, { useCallback, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Stars,
  ContactShadows,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from "@react-three/postprocessing";
import * as THREE from "three";
import MASLogo from "./MASLogo.jsx";
import ProjectHologram from "./ProjectHologram.jsx";
import SkillsCluster from "./SkillsCluster.jsx";
import AboutPedestal from "./AboutPedestal.jsx";
import ContactTerminal from "./ContactTerminal.jsx";
import ResumeObelisk from "./ResumeObelisk.jsx";
import Particles from "./Particles.jsx";
import CameraRig from "./CameraRig.jsx";
import GuidedTour from "./GuidedTour.jsx";
import StudioFloor from "./StudioFloor.jsx";
import BackgroundStructures from "./BackgroundStructures.jsx";
import { projects } from "../data/projects.js";
import { useStore } from "../utils/useStore.js";

const QUALITY_ORDER = ["low", "medium", "high"];

const QUALITY_SETTINGS = {
  low: {
    dpr: [0.75, 1],
    starCount: 900,
    particleCount: 90,
    bloom: false,
    bloomIntensity: 0,
    contactShadows: false,
    environment: false,
    antialias: false,
    autoRotate: false,
  },
  medium: {
    dpr: [0.9, 1.35],
    starCount: 1800,
    particleCount: 160,
    bloom: true,
    bloomIntensity: 0.42,
    contactShadows: true,
    environment: true,
    antialias: true,
    autoRotate: true,
  },
  high: {
    dpr: [1, 1.75],
    starCount: 3000,
    particleCount: 260,
    bloom: true,
    bloomIntensity: 0.68,
    contactShadows: true,
    environment: true,
    antialias: true,
    autoRotate: true,
  },
};

function getInitialQuality() {
  if (typeof window === "undefined") return "high";

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  const smallViewport = window.innerWidth < 820;
  const lowCores = (navigator.hardwareConcurrency || 4) <= 4;
  const lowMemory = (navigator.deviceMemory || 8) <= 4;
  const saveData = navigator.connection?.saveData === true;

  if (prefersReducedMotion || saveData) return "low";
  if (coarsePointer && smallViewport) return "low";
  if (smallViewport || (lowCores && lowMemory)) return "medium";

  return "high";
}

function lowerQuality(current) {
  const index = QUALITY_ORDER.indexOf(current);
  return QUALITY_ORDER[Math.max(0, index - 1)] || current;
}

function raiseQuality(current) {
  const index = QUALITY_ORDER.indexOf(current);
  return QUALITY_ORDER[Math.min(QUALITY_ORDER.length - 1, index + 1)] || current;
}

function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);
}

export default function Scene() {
  const controlsRef = useRef();
  const entered = useStore((s) => s.entered);
  const reducedMotion = useReducedMotion();

  const [quality, setQuality] = useState(getInitialQuality);
  const settings = QUALITY_SETTINGS[quality];

  const handleDecline = useCallback(() => {
    setQuality((current) => lowerQuality(current));
  }, []);

  const handleIncline = useCallback(() => {
    setQuality((current) => raiseQuality(current));
  }, []);

  return (
    <Canvas
      dpr={settings.dpr}
      gl={{
        antialias: settings.antialias,
        alpha: false,
        depth: true,
        stencil: false,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      camera={{ position: [0, 3, 14], fov: 55, near: 0.1, far: 100 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <PerformanceMonitor onDecline={handleDecline} onIncline={handleIncline} />
      <AdaptiveEvents />

      {/* Background */}
      <color attach="background" args={["#0b1120"]} />
      <fog attach="fog" args={["#0b1120", 17, 38]} />

      {/* Premium minimal space lighting */}
      <ambientLight intensity={0.28} />
      <hemisphereLight
        args={["#38bdf8", "#05070f", 0.28]}
      />
      <directionalLight
        position={[4, 8, 6]}
        intensity={0.82}
        color="#dbeafe"
      />
      <pointLight
        position={[-7, 3.2, -4]}
        intensity={1.25}
        color="#38bdf8"
        distance={22}
      />
      <pointLight
        position={[7, 3.4, 4]}
        intensity={1.05}
        color="#f472b6"
        distance={22}
      />
      <pointLight
        position={[0, 6, 0]}
        intensity={0.82}
        color="#a78bfa"
        distance={18}
      />

      {settings.environment && <Environment preset="night" />}

      <Stars
        radius={64}
        depth={42}
        count={settings.starCount}
        factor={3}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.28}
      />

      <StudioFloor quality={quality} />
      <BackgroundStructures />

      {/* Scene content */}
      <group>
        <MASLogo position={[0, 4.6, 0]} />
        <AboutPedestal position={[0, 0.25, 0]} />
        <SkillsCluster position={[-8, 3.6, 2]} />
        <ResumeObelisk position={[8, 2.4, 2]} />
        <ContactTerminal position={[0, 1.2, -8]} />

        {projects.map((p) => (
          <ProjectHologram key={p.id} project={p} />
        ))}

        <Particles count={settings.particleCount} motion={!reducedMotion} />
      </group>

      {settings.contactShadows && (
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.32}
          scale={34}
          blur={2.6}
          far={7}
          color="#38bdf8"
        />
      )}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={22}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2 + 0.15}
        autoRotate={entered && settings.autoRotate && !reducedMotion}
        autoRotateSpeed={0.2}
      />

      <CameraRig controlsRef={controlsRef} />
      <GuidedTour />

      {settings.bloom && (
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            intensity={settings.bloomIntensity}
            luminanceThreshold={0.34}
            luminanceSmoothing={0.86}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.0006, 0.0006]} />
          <Noise opacity={0.035} />
          <Vignette eskil={false} offset={0.2} darkness={0.68} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
