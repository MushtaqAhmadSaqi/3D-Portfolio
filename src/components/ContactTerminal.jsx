import React, { useState } from "react";
import { Float, Html, RoundedBox, useCursor } from "@react-three/drei";
import { useStore } from "../utils/useStore.js";

export default function ContactTerminal({ position }) {
  const toggleContact = useStore((s) => s.toggleContact);
  const playHoverSound = useStore((s) => s.playHoverSound);
  const playClickSound = useStore((s) => s.playClickSound);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <Float speed={0.8} floatIntensity={0.25}>
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
        onClick={(e) => {
          e.stopPropagation();
          toggleContact(true);
          playClickSound();
        }}
      >
        <RoundedBox args={[3, 1.6, 0.14]} radius={0.1}>
          <meshStandardMaterial
            color="#0b1120"
            emissive="#f472b6"
            emissiveIntensity={hovered ? 0.72 : 0.5}
            metalness={0.7}
            roughness={0.25}
          />
        </RoundedBox>

        <Html
          transform
          occlude
          distanceFactor={4}
          position={[0, 0, 0.08]}
          style={{ pointerEvents: "none" }}
        >
          <div className="terminal">
            <span className="terminal-prompt">$</span>
            <span className="terminal-text">
              contact <span className="terminal-accent">--open</span>
            </span>
            <span className="terminal-caret" />
          </div>
        </Html>

        <Html position={[0, -1.05, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="holo-label" style={{ borderColor: "#f472b6" }}>
            <span className="holo-title">Contact</span>
          </div>
        </Html>
      </group>
    </Float>
  );
}
