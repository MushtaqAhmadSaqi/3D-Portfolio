import React, { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float, Html, RoundedBox } from "@react-three/drei";
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

/**
 * Floating holographic "screen" for a single project.
 */
export default function ProjectHologram({ project }) {
  const openProject = useStore((s) => s.openProject);
  const focusTarget = useStore((s) => s.focusTarget);
  const activeFocus = useStore((s) => s.activeFocus);

  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  const isFocused = activeFocus?.id === project.id;
  const isActive = hovered || isFocused;

  useFrame((state, dt) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;
    const baseY = project.position?.[1] ?? 1;
    const targetScale = isActive ? 1.06 : 1;

    meshRef.current.position.y =
      baseY + Math.sin(t * 0.75 + project.position[0]) * 0.065;

    const smoothScale = THREE.MathUtils.damp(
      meshRef.current.scale.x,
      targetScale,
      10,
      dt
    );

    meshRef.current.scale.setScalar(smoothScale);

    if (glowRef.current) {
      const targetOpacity = isActive ? 0.52 : 0.18 + Math.sin(t * 1.2) * 0.035;

      glowRef.current.material.opacity = THREE.MathUtils.damp(
        glowRef.current.material.opacity,
        targetOpacity,
        8,
        dt
      );
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();

    focusTarget(getProjectFocusTarget(project));
    openProject(project);

    window.playClickSound?.();
  };

  return (
    <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.2}>
      <group
        ref={meshRef}
        position={project.position}
        rotation={project.rotation || [0, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
          window.playHoverSound?.();
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={handleClick}
      >
        <RoundedBox args={[3.2, 2.0, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#0b1120"
            emissive={project.accent}
            emissiveIntensity={isActive ? 0.62 : 0.22}
            metalness={0.78}
            roughness={0.24}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[3.0, 1.82]} />
          <ProjectScreenMaterial project={project} />
        </mesh>

        <mesh ref={glowRef} position={[0, 0, -0.08]}>
          <planeGeometry args={[3.9, 2.7]} />
          <meshBasicMaterial
            color={project.accent}
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>

        <Html
          position={[0, -1.25, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            className={`holo-label ${isFocused ? "holo-label-active" : ""}`}
            style={{ borderColor: project.accent }}
          >
            <span className="holo-number" style={{ color: project.accent }}>
              {project.number}
            </span>
            <span className="holo-title">{project.title}</span>
          </div>
        </Html>
      </group>
    </Float>
  );
}
