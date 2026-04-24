import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { profile } from "../data/profile.js";

/**
 * A cluster of floating skill pills arranged spherically,
 * gently rotating with interaction highlights.
 */
export default function SkillsCluster({ position }) {
  const groupRef = useRef();
  const skills = useMemo(() => {
    // Flatten skills into an array of {category, skill}
    const arr = [];
    Object.entries(profile.skills).forEach(([cat, list]) => {
      list.forEach((skill) => arr.push({ category: cat, skill }));
    });
    return arr;
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useFrame((state, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.17;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
    }
  });

  // Arrange pills evenly on a sphere
  const radius = 2.9;
  const phiStep = Math.PI * (3 - Math.sqrt(5)); // golden angle

  return (
    <group position={position} ref={groupRef}>
      {skills.map(({ skill, category }, i) => {
        const y = 1 - (i / (skills.length - 1)) * 2; // y from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phiStep * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        const pos = [x * radius, y * radius, z * radius];
        const isHovered = hoveredIndex === i;

        return (
          <group key={skill} position={pos}>
            <RoundedBox
              args={[0.9, 0.34, 0.18]}
              radius={0.1}
              smoothness={3}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredIndex(i);
                document.body.style.cursor = "pointer";
                window.playHoverSound?.();
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredIndex(null);
                document.body.style.cursor = "auto";
              }}
              onClick={(e) => {
                e.stopPropagation();
                alert(`Skill: ${skill}\nCategory: ${category}`);
                window.playClickSound?.();
              }}
              scale={isHovered ? 1.12 : 1}
            >
              <meshStandardMaterial
                color={isHovered ? "#a78bfa" : "#0b1120"}
                emissive={isHovered ? "#a78bfa" : "#a78bfa"}
                emissiveIntensity={isHovered ? 0.8 : 0.3}
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
                color: isHovered ? "#a78bfa" : "#b6c3d8",
                fontWeight: isHovered ? "700" : "500",
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

      {/* Label */}
      <Html position={[0, -3.2, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="holo-label" style={{ borderColor: "#a78bfa" }}>
          <span className="holo-title">Skills</span>
        </div>
      </Html>
    </group>
  );
}
