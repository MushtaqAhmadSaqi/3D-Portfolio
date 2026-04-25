import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, useCursor } from "@react-three/drei";
import { profile } from "../data/profile.js";
import { useStore } from "../utils/useStore.js";

/**
 * A tall glowing obelisk — click downloads the resume PDF.
 */
export default function ResumeObelisk({ position }) {
  const ref = useRef();

  const playHoverSound = useStore((s) => s.playHoverSound);
  const playClickSound = useStore((s) => s.playClickSound);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.4;
  });

  const download = (e) => {
    e.stopPropagation();

    const a = document.createElement("a");
    a.href = profile.resume;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();

    playClickSound();
  };

  return (
    <Float speed={0.6} floatIntensity={0.3}>
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
        <mesh ref={ref}>
          <boxGeometry args={[0.6, 2.4, 0.6]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive={hovered ? "#f472b6" : "#a78bfa"}
            emissiveIntensity={hovered ? 1 : 0.5}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.1, 0.02, 8, 48]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={hovered ? 0.68 : 0.5} />
        </mesh>

        <Html position={[0, -1.7, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="holo-label" style={{ borderColor: "#f472b6" }}>
            <span className="holo-title">⬇ Download Resume</span>
          </div>
        </Html>
      </group>
    </Float>
  );
}
