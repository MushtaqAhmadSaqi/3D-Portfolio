import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { profile } from "../data/profile.js";

/**
 * A tall glowing obelisk — click downloads the resume PDF.
 */
export default function ResumeObelisk({ position }) {
  const ref = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state, dt) => {
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
  };

  return (
    <Float speed={0.6} floatIntensity={0.3}>
      <group
        position={position}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
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
        {/* Halo */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.1, 0.02, 8, 48]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.5} />
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
