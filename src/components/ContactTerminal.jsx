import React, { useState } from "react";
import { Float, Html, RoundedBox, useCursor } from "@react-three/drei";
import { useStore } from "../utils/useStore.js";
import { STATIC_FOCUS_TARGETS } from "../utils/focusTargets.js";

export default function ContactTerminal({ position }) {
  const toggleContact = useStore((s) => s.toggleContact);
  const focusTarget = useStore((s) => s.focusTarget);
  const playHoverSound = useStore((s) => s.playHoverSound);
  const playClickSound = useStore((s) => s.playClickSound);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <Float speed={0.7} floatIntensity={0.22} rotationIntensity={0.05}>
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
          focusTarget(STATIC_FOCUS_TARGETS.contact);
          toggleContact(true);
          playClickSound();
        }}
      >
        {/* base */}
        <mesh position={[0, -0.7, -0.08]}>
          <cylinderGeometry args={[1.15, 1.32, 0.16, 28]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive="#f472b6"
            emissiveIntensity={0.2}
            metalness={0.84}
            roughness={0.24}
          />
        </mesh>

        {/* stand */}
        <mesh position={[0, -0.15, -0.1]}>
          <boxGeometry args={[0.24, 0.9, 0.22]} />
          <meshStandardMaterial
            color="#0b1120"
            emissive="#f472b6"
            emissiveIntensity={0.18}
            metalness={0.82}
            roughness={0.22}
          />
        </mesh>

        {/* tilted screen shell */}
        <group position={[0, 0.42, 0]} rotation={[-0.18, 0, 0]}>
          <RoundedBox args={[3.35, 1.95, 0.18]} radius={0.12} smoothness={4}>
            <meshStandardMaterial
              color="#0b1120"
              emissive="#f472b6"
              emissiveIntensity={hovered ? 0.82 : 0.44}
              metalness={0.82}
              roughness={0.22}
            />
          </RoundedBox>

          <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[3.05, 1.66]} />
            <meshBasicMaterial color="#0a1528" toneMapped={false} />
          </mesh>

          <mesh position={[0, 0.73, 0.108]}>
            <boxGeometry args={[3.08, 0.024, 0.01]} />
            <meshBasicMaterial color="#f472b6" transparent opacity={0.86} />
          </mesh>

          <mesh position={[0, 0, -0.08]}>
            <planeGeometry args={[4.15, 2.55]} />
            <meshBasicMaterial
              color="#f472b6"
              transparent
              opacity={hovered ? 0.22 : 0.12}
              depthWrite={false}
            />
          </mesh>

          <Html
            transform
            occlude
            distanceFactor={4.6}
            position={[0, 0, 0.115]}
            style={{ pointerEvents: "none" }}
          >
            <div className="terminal-shell">
              <div className="terminal-header">
                <span className="terminal-led" />
                <strong>CONTACT TERMINAL</strong>
              </div>

              <div className="terminal-row">
                <span className="terminal-prompt">$</span>
                <span className="terminal-text">
                  open <span className="terminal-accent">communication_channel</span>
                </span>
              </div>

              <div className="terminal-meta">
                <span>Direct contact</span>
                <span>Fastest route to reach me</span>
              </div>

              <div className="terminal-badge">Click to open contact options</div>
            </div>
          </Html>
        </group>

        <Html position={[0, -1.55, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="holo-label" style={{ borderColor: "#f472b6" }}>
            <span className="holo-title">Contact · Messaging Station</span>
          </div>
        </Html>
      </group>
    </Float>
  );
}
