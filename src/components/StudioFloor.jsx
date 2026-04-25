import React, { useEffect, useMemo, useRef } from "react";

const RING_CONFIG = {
  low: [3.8, 7.2],
  medium: [3.2, 5.8, 8.8],
  high: [2.6, 4.8, 7.2, 10.2],
};

export default function StudioFloor({ quality = "high" }) {
  const gridRef = useRef();
  const rings = useMemo(() => RING_CONFIG[quality] ?? RING_CONFIG.high, [quality]);

  useEffect(() => {
    if (!gridRef.current) return;

    const materials = Array.isArray(gridRef.current.material)
      ? gridRef.current.material
      : [gridRef.current.material];

    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = quality === "low" ? 0.08 : 0.12;
      material.depthWrite = false;
    });
  }, [quality]);

  return (
    <group position={[0, -0.56, 0]}>
      <gridHelper
        ref={gridRef}
        args={[28, quality === "low" ? 14 : 28, "#38bdf8", "#a78bfa"]}
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
            opacity={quality === "low" ? 0.13 : 0.19}
            depthWrite={false}
          />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
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
