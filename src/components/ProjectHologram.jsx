import React, { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float, Html, RoundedBox, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../utils/useStore.js";
import { getProjectFocusTarget } from "../utils/focusTargets.js";

function ProjectTextureMaterial({ src }) {
  const texture = useTexture(src);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
  }, [texture]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function ProjectScreenMaterial({ project }) {
  if (!project.preview) {
    return <meshBasicMaterial color={project.accent} toneMapped={false} />;
  }

  return (
    <Suspense fallback={<meshBasicMaterial color={project.accent} toneMapped={false} />}>
      <ProjectTextureMaterial src={project.preview} />
    </Suspense>
  );
}

export default function ProjectHologram({ project }) {
  const openProject = useStore((s) => s.openProject);
  const focusTarget = useStore((s) => s.focusTarget);
  const activeFocus = useStore((s) => s.activeFocus);
  const playHoverSound = useStore((s) => s.playHoverSound);
  const playClickSound = useStore((s) => s.playClickSound);

  const groupRef = useRef();
  const screenGlowRef = useRef();
  const dockGlowRef = useRef();
  const featuredRingRef = useRef();
  const scanlineRef = useRef();
  const glitchTimer = useRef(0);
  const glitchOffset = useRef(0);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const isFocused = activeFocus?.id === project.id;
  const isActive = hovered || isFocused;
  const isFeatured = Boolean(project.featured);

  useFrame((state, dt) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    const baseY = project.position?.[1] ?? 1;
    const targetScale = isActive ? 1.045 : 1;

    // Probabilistic glitch: fires at ~3% chance per frame when active
    glitchTimer.current -= dt;
    if (isActive && glitchTimer.current <= 0) {
      glitchOffset.current = (Math.random() - 0.5) * 0.018;
      // Next glitch after 0.5–2.5 s
      glitchTimer.current = 0.5 + Math.random() * 2.0;
    } else if (!isActive) {
      glitchOffset.current = THREE.MathUtils.damp(glitchOffset.current, 0, 12, dt);
    }

    groupRef.current.position.x = project.position[0] + glitchOffset.current;
    groupRef.current.position.y =
      baseY + Math.sin(t * 0.7 + project.position[0]) * 0.07;

    const nextScale = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 8, dt);
    groupRef.current.scale.setScalar(nextScale);

    if (screenGlowRef.current) {
      const targetOpacity = isActive ? 0.34 : 0.14;
      screenGlowRef.current.material.opacity = THREE.MathUtils.damp(
        screenGlowRef.current.material.opacity,
        targetOpacity,
        8,
        dt
      );
    }

    if (dockGlowRef.current) {
      const targetOpacity = isActive ? 0.4 : 0.16;
      dockGlowRef.current.material.opacity = THREE.MathUtils.damp(
        dockGlowRef.current.material.opacity,
        targetOpacity,
        8,
        dt
      );
    }

    if (featuredRingRef.current) {
      featuredRingRef.current.rotation.z += dt * 0.14;
    }

    if (scanlineRef.current) {
      // Loop from bottom to top of the screen (-0.85 to 0.85 relative to center)
      const scanY = ((t * 0.45) % 1.7) - 0.85;
      scanlineRef.current.position.y = 0.18 + scanY;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    focusTarget(getProjectFocusTarget(project));
    openProject(project);
    playClickSound();
  };

  return (
    <Float speed={0.72} rotationIntensity={0.08} floatIntensity={0.18}>
      <group
        ref={groupRef}
        position={project.position}
        rotation={project.rotation || [0, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          playHoverSound();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={handleClick}
      >
        {/* featured halo */}
        {isFeatured && (
          <mesh ref={featuredRingRef} position={[0, 0.22, -0.12]}>
            <ringGeometry args={[2.05, 2.1, 90]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.22}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* support stand */}
        <mesh position={[0, -0.62, -0.12]}>
          <boxGeometry args={[0.18, 0.7, 0.18]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive={project.accent}
            emissiveIntensity={0.18}
            metalness={0.84}
            roughness={0.24}
          />
        </mesh>

        <mesh position={[0, -0.98, -0.12]}>
          <cylinderGeometry args={[0.72, 0.86, 0.12, 30]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive={project.accent}
            emissiveIntensity={0.22}
            metalness={0.78}
            roughness={0.22}
          />
        </mesh>

        {/* main display frame */}
        <RoundedBox args={[3.4, 2.02, 0.16]} radius={0.11} smoothness={4} position={[0, 0.18, 0]}>
          <meshStandardMaterial
            color="#0b1120"
            emissive={project.accent}
            emissiveIntensity={isActive ? 0.72 : 0.26}
            metalness={0.84}
            roughness={0.2}
          />
        </RoundedBox>

        {/* image screen */}
        <mesh position={[0, 0.18, 0.09]}>
          <planeGeometry args={[3.08, 1.72]} />
          <ProjectScreenMaterial project={project} />
        </mesh>

        {/* screen holographic tint */}
        <mesh position={[0, 0.18, 0.096]}>
          <planeGeometry args={[3.08, 1.72]} />
          <meshBasicMaterial
            color={project.accent}
            transparent
            opacity={isActive ? 0.12 : 0.06}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Moving scanline effect */}
        <mesh ref={scanlineRef} position={[0, 0.18, 0.098]}>
          <planeGeometry args={[3.08, 0.04]} />
          <meshBasicMaterial
            color={project.accent}
            transparent
            opacity={isActive ? 0.32 : 0.14}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* edge strips */}
        <mesh position={[0, 1.05, 0.105]}>
          <boxGeometry args={[3.12, 0.025, 0.01]} />
          <meshBasicMaterial color={project.accent} transparent opacity={0.88} />
        </mesh>

        <mesh position={[0, -0.69, 0.105]}>
          <boxGeometry args={[3.12, 0.025, 0.01]} />
          <meshBasicMaterial color={project.accent} transparent opacity={0.5} />
        </mesh>

        {/* screen glow */}
        <mesh ref={screenGlowRef} position={[0, 0.18, -0.08]}>
          <planeGeometry args={[4.0, 2.6]} />
          <meshBasicMaterial
            color={project.accent}
            transparent
            opacity={0.16}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* info dock */}
        <RoundedBox args={[3.12, 0.48, 0.11]} radius={0.12} smoothness={4} position={[0, -1.45, 0.04]}>
          <meshStandardMaterial
            color="#08101f"
            emissive={project.accent}
            emissiveIntensity={isActive ? 0.3 : 0.14}
            metalness={0.78}
            roughness={0.26}
          />
        </RoundedBox>

        <mesh ref={dockGlowRef} position={[0, -1.45, -0.08]}>
          <planeGeometry args={[3.5, 0.92]} />
          <meshBasicMaterial
            color={project.accent}
            transparent
            opacity={0.18}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <Html
          position={[0, -1.45, 0.12]}
          center
          distanceFactor={9}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className={`project-dock ${isFeatured ? "featured" : ""}`}>
            <div className="project-dock-left">
              <span className="project-dock-number" style={{ color: project.accent }}>
                {project.number}
              </span>
              <div className="project-dock-main">
                <strong>{project.title}</strong>
                <span>{project.tag}</span>
              </div>
            </div>

            <div className="project-dock-right">
              {isFeatured && <span className="featured-pill">Featured</span>}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}
