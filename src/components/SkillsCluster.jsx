import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { profile } from "../data/profile.js";
import { useStore } from "../utils/useStore.js";

/**
 * Premium holographic skills hub.
 * Replaces the scattered tiny pills with readable category panels orbiting a core.
 */
export default function SkillsCluster({ position }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const ringRef = useRef();

  const playHoverSound = useStore((s) => s.playHoverSound);
  const playClickSound = useStore((s) => s.playClickSound);

  const categories = useMemo(() => {
    return Object.entries(profile.skills).map(([title, skills]) => ({
      title,
      skills,
    }));
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const pulse = 0.5 + Math.sin(t * 0.8) * 0.5;

    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.12;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= dt * 0.18;
      coreRef.current.position.y = Math.sin(t * 1.2) * 0.08;
      
      // Sync emissive pulse
      const coreMesh = coreRef.current.children[0];
      if (coreMesh && coreMesh.material) {
        coreMesh.material.emissiveIntensity = 0.8 + pulse * 0.6;
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.22;
      ringRef.current.rotation.x = Math.sin(t * 0.35) * 0.18;
    }
  });

  const radius = 2.7;

  return (
    <group position={position}>
      <Float speed={0.9} floatIntensity={0.25} rotationIntensity={0.08}>
        <group ref={groupRef}>
          {/* Core */}
          <group ref={coreRef} position={[0, 0, 0]}>
            <mesh>
              <icosahedronGeometry args={[0.72, 1]} />
              <meshStandardMaterial
                color="#0b1120"
                emissive="#a78bfa"
                emissiveIntensity={1.1}
                metalness={0.82}
                roughness={0.22}
              />
            </mesh>

            <mesh ref={ringRef}>
              <torusGeometry args={[1.2, 0.018, 10, 90]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
            </mesh>

            <Html center distanceFactor={8} position={[0, 0, 0.92]} style={{ pointerEvents: "none" }}>
              <div className="skills-core-label">
                <span>Skills</span>
              </div>
            </Html>
          </group>

          {/* Category panels */}
          {categories.map((category, index) => {
            const angle = (index / Math.max(1, categories.length)) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = Math.sin(angle * 1.3) * 0.5;

            const isActive = activeIndex === index;

            return (
              <group
                key={category.title}
                position={[x, y, z]}
                rotation={[0, -angle + Math.PI / 2, 0]}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHovered(true);
                  setActiveIndex(index);
                  playHoverSound();
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  setHovered(false);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(index);
                  playClickSound();
                }}
              >
                <RoundedBox args={[2.5, 1.35, 0.14]} radius={0.12} smoothness={4}>
                  <meshStandardMaterial
                    color="#0b1120"
                    emissive={isActive ? "#a78bfa" : "#1e1b4b"}
                    emissiveIntensity={isActive ? 0.75 : 0.22}
                    metalness={0.76}
                    roughness={0.24}
                  />
                </RoundedBox>

                {/* top glow bar */}
                <mesh position={[0, 0.56, 0.08]}>
                  <boxGeometry args={[2.18, 0.03, 0.01]} />
                  <meshBasicMaterial
                    color={isActive ? "#38bdf8" : "#a78bfa"}
                    transparent
                    opacity={0.8}
                  />
                </mesh>

                {/* subtle back glow */}
                <mesh position={[0, 0, -0.08]}>
                  <planeGeometry args={[2.95, 1.72]} />
                  <meshBasicMaterial
                    color={isActive ? "#a78bfa" : "#38bdf8"}
                    transparent
                    opacity={isActive ? 0.18 : 0.08}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                  />
                </mesh>

                <Html
                  transform
                  distanceFactor={5.2}
                  position={[0, 0, 0.09]}
                  style={{ pointerEvents: "none" }}
                >
                  <div className={`skill-panel ${isActive ? "active" : ""}`}>
                    <div className="skill-panel-head">
                      <span className="skill-panel-dot" />
                      <strong>{category.title}</strong>
                    </div>

                    <div className="skill-panel-pills">
                      {category.skills.slice(0, 6).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </Html>
              </group>
            );
          })}
        </group>
      </Float>

      <Html position={[0, -2.55, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="holo-label" style={{ borderColor: "#a78bfa" }}>
          <span className="holo-title">
            {categories[activeIndex]?.title || "Skills"} · Curated Toolset
          </span>
        </div>
      </Html>
    </group>
  );
}
