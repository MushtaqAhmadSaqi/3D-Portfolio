import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

/**
 * Central pedestal with a floating portrait frame — opens About modal on click.
 */
export default function AboutPedestal({ position }) {
  const toggleAbout = useStore((s) => s.toggleAbout);
  const ringRef = useRef();

  let photo = null;
  try {
    photo = useTexture(profile.photo);
    if (photo) photo.colorSpace = THREE.SRGBColorSpace;
  } catch {
    photo = null;
  }

  useFrame((state, dt) => {
    if (ringRef.current) ringRef.current.rotation.z += dt * 0.3;
  });

  return (
    <group position={position}>
      {/* Base pedestal */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.3, 1.6, 0.4, 48]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[1.32, 1.32, 0.05, 48]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
      </mesh>

      {/* Floating portrait frame */}
      <group
        position={[0, 2.0, 0]}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
        onClick={(e) => {
          e.stopPropagation();
          toggleAbout(true);
        }}
      >
        <RoundedBox args={[1.6, 1.9, 0.1]} radius={0.08}>
          <meshStandardMaterial
            color="#0b1120"
            emissive="#38bdf8"
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.3}
          />
        </RoundedBox>
        <mesh position={[0, 0.05, 0.06]}>
          <planeGeometry args={[1.4, 1.65]} />
          {photo ? (
            <meshBasicMaterial map={photo} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#38bdf8" />
          )}
        </mesh>

        {/* Rotating rim */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.3, 0.02, 8, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>

        <Html position={[0, -1.2, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="holo-label" style={{ borderColor: "#38bdf8" }}>
            <span className="holo-title">About · {profile.initials}</span>
          </div>
        </Html>
      </group>
    </group>
  );
}
