import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Stars,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import MASLogo from "./MASLogo.jsx";
import ProjectHologram from "./ProjectHologram.jsx";
import SkillsOrb from "./SkillsOrb.jsx";
import AboutPedestal from "./AboutPedestal.jsx";
import ContactTerminal from "./ContactTerminal.jsx";
import ResumeObelisk from "./ResumeObelisk.jsx";
import Particles from "./Particles.jsx";
import CameraRig from "./CameraRig.jsx";
import GuidedTour from "./GuidedTour.jsx";
import { projects } from "../data/projects.js";
import { useStore } from "../utils/useStore.js";

export default function Scene() {
  const controlsRef = useRef();
  const entered = useStore((s) => s.entered);
  const [dpr, setDpr] = React.useState([1, 1.75]);

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 3, 14], fov: 55, near: 0.1, far: 100 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      {/* Dynamically scale resolution based on fps */}
      <PerformanceMonitor
        onDecline={() => setDpr([0.75, 1])}
        onIncline={() => setDpr([1, 1.75])}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Background */}
      <color attach="background" args={["#07091a"]} />
      <fog attach="fog" args={["#07091a", 18, 38]} />

      {/* Lights */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} color="#a78bfa" />
      <pointLight position={[-6, 3, -4]} intensity={1.2} color="#38bdf8" distance={20} />
      <pointLight position={[6, 3, 4]} intensity={1.0} color="#f472b6" distance={20} />

      {/* HDRI-free: fake environment via preset */}
      <Environment preset="night" />
      <Stars radius={60} depth={40} count={3000} factor={3} saturation={0} fade speed={0.5} />

      {/* Scene content */}
      <group>
        <MASLogo position={[0, 4.6, 0]} />
        <AboutPedestal position={[0, 0.25, 0]} />
        <SkillsOrb position={[-8, 3.6, 2]} />
        <ResumeObelisk position={[8, 2.4, 2]} />
        <ContactTerminal position={[0, 1.2, -8]} />

        {projects.map((p) => (
          <ProjectHologram key={p.id} project={p} />
        ))}

        <Particles count={280} />
      </group>

      {/* Ground reflection hint */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.45}
        scale={40}
        blur={2.8}
        far={8}
        color="#38bdf8"
      />

      {/* Camera behavior */}
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
        autoRotate={entered}
        autoRotateSpeed={0.25}
      />
      <CameraRig controlsRef={controlsRef} />
      <GuidedTour />

      {/* Post-processing (lightweight) */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
