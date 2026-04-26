import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Float, Center } from "@react-three/drei";
import * as THREE from "three";
import { profile } from "../data/profile.js";

/**
 * Floating 3D "MAS" monogram in the center of the scene.
 * Premium version: stronger centerpiece, orbit rings, pulsing glow.
 */
export default function MASLogo({ position = [0, 4.5, 0] }) {
  const groupRef = useRef();
  const ringARef = useRef();
  const ringBRef = useRef();
  const ringCRef = useRef();
  const glowRef = useRef();
  const glowOuterRef = useRef();

  useFrame((state, dt) => {
    const time = state.clock.elapsedTime;
    const pulse = 0.5 + Math.sin(time * 0.8) * 0.5; // 0–1 breathing

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }

    if (ringARef.current) {
      ringARef.current.rotation.z += dt * 0.24;
      ringARef.current.rotation.y = Math.sin(time * 0.18) * 0.2;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.z -= dt * 0.18;
      ringBRef.current.rotation.x = Math.sin(time * 0.16) * 0.22;
    }

    if (ringCRef.current) {
      ringCRef.current.rotation.y += dt * 0.1;
      ringCRef.current.rotation.z = Math.sin(time * 0.22) * 0.3;
    }

    if (glowRef.current) {
      glowRef.current.material.opacity = 0.06 + pulse * 0.06;
    }

    if (glowOuterRef.current) {
      glowOuterRef.current.material.opacity = 0.025 + pulse * 0.025;
    }
  });

  return (
    <Float speed={1.05} rotationIntensity={0.24} floatIntensity={0.42}>
      <group ref={groupRef} position={position}>
        <Center>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={1.18}
            height={0.25}
            curveSegments={10}
            bevelEnabled
            bevelSize={0.035}
            bevelThickness={0.04}
          >
            {profile.initials}
            <meshStandardMaterial
              color="#0b1120"
              emissive="#38bdf8"
              emissiveIntensity={1.55}
              metalness={0.92}
              roughness={0.16}
            />
          </Text3D>
        </Center>

        {/* Inner orbit ring — cyan */}
        <mesh ref={ringARef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.82, 0.012, 8, 96]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.72} />
        </mesh>

        {/* Mid orbit ring — violet */}
        <mesh ref={ringBRef} rotation={[Math.PI / 2.4, 0.2, 0.15]}>
          <torusGeometry args={[2.08, 0.009, 8, 96]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.48} />
        </mesh>

        {/* Outer orbit ring — pink accent */}
        <mesh ref={ringCRef} rotation={[0.6, 0, Math.PI / 3]}>
          <torusGeometry args={[2.46, 0.006, 8, 96]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.28} />
        </mesh>

        {/* Inner glow disk */}
        <mesh ref={glowRef} position={[0, 0, -0.34]}>
          <circleGeometry args={[2.15, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} depthWrite={false} />
        </mesh>

        {/* Outer soft glow disk */}
        <mesh ref={glowOuterRef} position={[0, 0, -0.5]}>
          <circleGeometry args={[3.6, 64]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.04} depthWrite={false} />
        </mesh>

        {/* Accent underline */}
        <mesh position={[0, -0.86, 0]}>
          <boxGeometry args={[2.8, 0.018, 0.018]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.45} />
        </mesh>
      </group>
    </Float>
  );
}
