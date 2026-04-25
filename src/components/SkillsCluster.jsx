import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox, useCursor } from "@react-three/drei";
import { profile } from "../data/profile.js";
import { useStore } from "../utils/useStore.js";

/**
 * A cluster of floating skill pills arranged spherically,
 * gently rotating with interaction highlights.
 */
export default function SkillsCluster({ position }) {
  const groupRef = useRef();

  const playHoverSound = useStore((s) => s.playHoverSound);
  const playClickSound = useStore((s) => s.playClickSound);

  const skills = useMemo(() => {
    const arr = [];

    Object.entries(profile.skills).forEach(([category, list]) => {
      list.forEach((skill) => arr.push({ category, skill }));
    });

    return arr;
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useCursor(hoveredIndex !== null);

  useFrame((state, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.17;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
    }
  });

  const radius = 2.9;
  const phiStep = Math.PI * (3 - Math.sqrt(5));

  return (
    <group position={position} ref={groupRef}>
      {skills.map(({ skill, category }, i) => {
        const y = 1 - (i / Math.max(1, skills.length - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phiStep * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        const pos = [x * radius, y * radius, z * radius];
        const isHovered = hoveredIndex === i;
        const isSelected = selectedSkill?.skill === skill;

        return (
          <group key={`${category}-${skill}`} position={pos}>
            <RoundedBox
              args={[0.9, 0.34, 0.18]}
              radius={0.1}
              smoothness={3}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredIndex(i);
                playHoverSound();
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredIndex(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSkill({ skill, category });
                playClickSound();
              }}
              scale={isHovered || isSelected ? 1.12 : 1}
            >
              <meshStandardMaterial
                color={isHovered || isSelected ? "#a78bfa" : "#0b1120"}
                emissive="#a78bfa"
                emissiveIntensity={isHovered || isSelected ? 0.82 : 0.3}
                metalness={0.7}
                roughness={0.3}
              />
            </RoundedBox>

            <Html
              center
              distanceFactor={7}
              style={{
                pointerEvents: "none",
                userSelect: "none",
                color: isHovered || isSelected ? "#a78bfa" : "#b6c3d8",
                fontWeight: isHovered || isSelected ? "700" : "500",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                textShadow: "0 0 6px rgba(167,139,250,0.8)",
              }}
              position={[0, 0, 0.11]}
            >
              {skill}
            </Html>
          </group>
        );
      })}

      <Html position={[0, -3.2, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="holo-label" style={{ borderColor: "#a78bfa" }}>
          <span className="holo-title">
            {selectedSkill
              ? `${selectedSkill.skill} · ${selectedSkill.category}`
              : "Skills"}
          </span>
        </div>
      </Html>
    </group>
  );
}
