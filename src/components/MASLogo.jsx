import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Float, Center } from "@react-three/drei";
import { profile } from "../data/profile.js";

/**
 * Floating 3D "MAS" monogram in the center of the scene.
 * Uses a built-in Drei font via the /fonts URL (loaded lazily).
 * Swap `font` to a local file in /public if you want a custom typeface.
 */
export default function MASLogo({ position = [0, 4.5, 0] }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
      <group ref={ref} position={position}>
        <Center>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={1.2}
            height={0.25}
            curveSegments={8}
            bevelEnabled
            bevelSize={0.035}
            bevelThickness={0.04}
          >
            {profile.initials}
            <meshStandardMaterial
              color="#0b1120"
              emissive="#38bdf8"
              emissiveIntensity={1.6}
              metalness={0.9}
              roughness={0.15}
            />
          </Text3D>
        </Center>
        {/* Soft glow plate behind */}
        <mesh position={[0, 0, -0.3]}>
          <circleGeometry args={[1.8, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} />
        </mesh>
      </group>
    </Float>
  );
}
