import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Icosahedron } from "@react-three/drei";
import { profile } from "../data/profile.js";

/**
 * Rotating skills orb — hovering surfaces the skill list overlay.
 */
export default function SkillsOrb({ position }) {
  const ref = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.25;
  });

  return (
    <Float speed={1} floatIntensity={0.5} rotationIntensity={0.3}>
      <group
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Icosahedron ref={ref} args={[1.1, 1]}>
          <meshStandardMaterial
            color="#0b1120"
            emissive="#a78bfa"
            emissiveIntensity={hovered ? 0.9 : 0.4}
            wireframe
          />
        </Icosahedron>
        <Icosahedron args={[1.05, 1]}>
          <meshStandardMaterial
            color="#a78bfa"
            transparent
            opacity={0.15}
            metalness={0.4}
            roughness={0.4}
          />
        </Icosahedron>

        <Html
          position={[0, -1.6, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: "none" }}
        >
          <div className="holo-label" style={{ borderColor: "#a78bfa" }}>
            <span className="holo-title">Skills</span>
          </div>
        </Html>

        {hovered && (
          <Html position={[0, 0, 0]} center distanceFactor={8}>
            <div className="skills-popup">
              {Object.entries(profile.skills).map(([group, items]) => (
                <div key={group} className="skills-group">
                  <strong>{group}</strong>
                  <div className="skills-pills">
                    {items.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}
