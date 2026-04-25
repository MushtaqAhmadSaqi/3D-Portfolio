import React, { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Html, RoundedBox, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../utils/useStore.js";
import { profile } from "../data/profile.js";

function PortraitMaterial({ src }) {
  const texture = useTexture(src);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
  }, [texture]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

/**
 * Central pedestal with a floating portrait frame — opens About modal on click.
 */
export default function AboutPedestal({ position }) {
  const toggleAbout = useStore((s) => s.toggleAbout);
  const playHoverSound = useStore((s) => s.playHoverSound);
  const playClickSound = useStore((s) => s.playClickSound);

  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  useFrame((_, dt) => {
    if (ringRef.current) ringRef.current.rotation.z += dt * 0.25;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.3, 1.6, 0.4, 40]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.34} />
      </mesh>

      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[1.32, 1.32, 0.05, 40]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.7}
        />
      </mesh>

      <group
        position={[0, 2.0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          playHoverSound();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleAbout(true);
          playClickSound();
        }}
      >
        <RoundedBox args={[1.6, 1.9, 0.1]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#0b1120"
            emissive="#38bdf8"
            emissiveIntensity={hovered ? 0.42 : 0.28}
            metalness={0.58}
            roughness={0.34}
          />
        </RoundedBox>

        <mesh position={[0, 0.05, 0.06]}>
          <planeGeometry args={[1.4, 1.65]} />
          <Suspense fallback={<meshBasicMaterial color="#38bdf8" toneMapped={false} />}>
            <PortraitMaterial src={profile.photo} />
          </Suspense>
        </mesh>

        <mesh ref={ringRef}>
          <torusGeometry args={[1.3, 0.02, 8, 56]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={hovered ? 0.74 : 0.58} />
        </mesh>

        <Html
          position={[0, -1.2, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: "none" }}
        >
          <div className="holo-label" style={{ borderColor: "#38bdf8" }}>
            <span className="holo-title">About · {profile.initials}</span>
          </div>
        </Html>
      </group>
    </group>
  );
}
