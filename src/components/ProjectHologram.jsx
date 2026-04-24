import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float, Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../utils/useStore.js";

/**
 * Floating holographic "screen" for a single project.
 * - Project preview image is mapped as a texture onto the screen.
 * - Hover lifts it + glow intensifies.
 * - Click opens the ProjectModal with that project's data.
 */
export default function ProjectHologram({ project }) {
  const openProject = useStore((s) => s.openProject);
  const setCameraTarget = useStore((s) => s.setCameraTarget);
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load preview. If missing, Drei/three will throw — we wrap with suspense fallback via React.
  let texture = null;
  try {
    texture = useTexture(project.preview);
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    }
  } catch (e) {
    texture = null;
  }

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = (project.position?.[1] ?? 1) + Math.sin(t * 0.9 + project.position[0]) * 0.08;
    if (glowRef.current) {
      glowRef.current.material.opacity = hovered ? 0.55 : 0.2 + Math.sin(t * 1.5) * 0.05;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setCameraTarget({ position: project.position, distance: 4 });
    openProject(project);
  };

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.25}>
      <group
        ref={meshRef}
        position={project.position}
        rotation={project.rotation || [0, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={handleClick}
        scale={hovered ? 1.06 : 1}
      >
        {/* Frame */}
        <RoundedBox args={[3.2, 2.0, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#0b1120"
            emissive={project.accent}
            emissiveIntensity={hovered ? 0.6 : 0.25}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Screen */}
        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[3.0, 1.82]} />
          {texture ? (
            <meshBasicMaterial map={texture} toneMapped={false} />
          ) : (
            <meshBasicMaterial color={project.accent} toneMapped={false} />
          )}
        </mesh>

        {/* Glow halo */}
        <mesh ref={glowRef} position={[0, 0, -0.08]}>
          <planeGeometry args={[3.9, 2.7]} />
          <meshBasicMaterial
            color={project.accent}
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>

        {/* Label under the hologram */}
        <Html
          position={[0, -1.25, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className="holo-label" style={{ borderColor: project.accent }}>
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
