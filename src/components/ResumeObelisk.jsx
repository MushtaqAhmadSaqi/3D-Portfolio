import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox, useCursor } from "@react-three/drei";
import { profile } from "../data/profile.js";
import { useStore } from "../utils/useStore.js";
import { STATIC_FOCUS_TARGETS } from "../utils/focusTargets.js";

export default function ResumeObelisk({ position }) {
  const shellRef = useRef();
  const ringRef = useRef();

  const playHoverSound = useStore((s) => s.playHoverSound);
  const playClickSound = useStore((s) => s.playClickSound);
  const focusTarget = useStore((s) => s.focusTarget);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, dt) => {
    if (shellRef.current) {
      shellRef.current.rotation.y += dt * 0.28;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= dt * 0.36;
    }
  });

  const download = (e) => {
    e.stopPropagation();

    focusTarget(STATIC_FOCUS_TARGETS.resume);

    const a = document.createElement("a");
    a.href = profile.resume;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();

    playClickSound();
  };

  return (
    <Float speed={0.62} floatIntensity={0.24} rotationIntensity={0.04}>
      <group
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          playHoverSound();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={download}
      >
        {/* base pedestal */}
        <mesh position={[0, -1.15, 0]}>
          <cylinderGeometry args={[0.95, 1.08, 0.18, 30]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive="#a78bfa"
            emissiveIntensity={0.18}
            metalness={0.84}
            roughness={0.22}
          />
        </mesh>

        {/* main slab */}
        <group ref={shellRef} position={[0, 0, 0]}>
          <RoundedBox args={[0.92, 2.45, 0.3]} radius={0.12} smoothness={4}>
            <meshStandardMaterial
              color="#0b1120"
              emissive={hovered ? "#f472b6" : "#a78bfa"}
              emissiveIntensity={hovered ? 0.95 : 0.46}
              metalness={0.92}
              roughness={0.16}
            />
          </RoundedBox>

          <mesh position={[0, 0, 0.18]}>
            <planeGeometry args={[0.64, 1.96]} />
            <meshBasicMaterial color="#10203a" toneMapped={false} />
          </mesh>

          <mesh position={[0, 0.86, 0.19]}>
            <boxGeometry args={[0.56, 0.03, 0.01]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.9} />
          </mesh>

          <mesh position={[0, 0, -0.12]}>
            <planeGeometry args={[1.7, 3.05]} />
            <meshBasicMaterial
              color={hovered ? "#f472b6" : "#a78bfa"}
              transparent
              opacity={hovered ? 0.24 : 0.12}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* orbital ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
          <torusGeometry args={[1.28, 0.022, 10, 88]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={hovered ? 0.74 : 0.5} />
        </mesh>

        <Html position={[0, -1.95, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="resume-badge">
            <span className="resume-badge-kicker">Resume</span>
            <strong>Download CV</strong>
          </div>
        </Html>
      </group>
    </Float>
  );
}
