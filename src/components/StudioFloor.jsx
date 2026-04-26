import React, { useEffect, useMemo, useRef } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";

const RING_CONFIG = {
  low: [3.8, 7.2],
  medium: [3.2, 5.8, 8.8],
  high: [2.6, 4.8, 7.2, 10.2],
};

export default function StudioFloor({ quality = "high" }) {
  const gridRef = useRef();
  const rings = useMemo(() => RING_CONFIG[quality] ?? RING_CONFIG.high, [quality]);

  const isLowQuality = quality === "low";

  useEffect(() => {
    if (!gridRef.current) return;

    const materials = Array.isArray(gridRef.current.material)
      ? gridRef.current.material
      : [gridRef.current.material];

    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = isLowQuality ? 0.08 : 0.12;
      material.depthWrite = false;
    });
  }, [quality, isLowQuality]);

  return (
    <group position={[0, -0.56, 0]}>
      {/* The main reflective surface - only for medium/high quality */}
      {!isLowQuality && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={quality === "high" ? 1024 : 512}
            mixBlur={1}
            mixStrength={15}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#05070a"
            metalness={0.5}
            mirror={1}
          />
        </mesh>
      )}

      <gridHelper
        ref={gridRef}
        args={[32, isLowQuality ? 16 : 32, "#38bdf8", "#a78bfa"]}
        position={[0, 0.001, 0]}
      />

      {rings.map((radius, index) => (
        <mesh
          key={radius}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0.01 + index * 0.002, 0]}
        >
          <torusGeometry args={[radius, 0.006, 8, quality === "high" ? 128 : 72]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#38bdf8" : "#a78bfa"}
            transparent
            opacity={isLowQuality ? 0.13 : 0.19}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Center glowing circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[12.5, quality === "high" ? 96 : 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.035}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
