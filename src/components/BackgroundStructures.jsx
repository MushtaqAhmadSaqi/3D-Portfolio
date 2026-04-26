import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Distant glowing pillars that add scale and mystery to the void.
 */
export default function BackgroundStructures() {
  const groupRef = useRef();

  // Generate random positions for the pillars
  const pillars = useMemo(() => {
    const count = 12;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 45 + Math.random() * 15;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const height = 15 + Math.random() * 25;
      const speed = 0.4 + Math.random() * 0.6;
      const phase = Math.random() * Math.PI * 2;
      return { position: [x, height / 2 - 10, z], height, speed, phase };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const p = pillars[i];
      if (child.material) {
        // Slow pulsing emissive intensity
        const pulse = 0.4 + Math.sin(t * p.speed + p.phase) * 0.3;
        child.material.emissiveIntensity = pulse;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {pillars.map((p, i) => (
        <mesh key={i} position={p.position}>
          <cylinderGeometry args={[0.08, 0.08, p.height, 6]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
