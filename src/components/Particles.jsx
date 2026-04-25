import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lightweight ambient particles.
 * Performance note:
 * We keep particle positions static and animate the group rotation only.
 * This avoids per-frame buffer uploads while preserving the floating space feel.
 */
const Particles = React.memo(function Particles({ count = 180, motion = true }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 12 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (!motion || !ref.current) return;

    ref.current.rotation.y += dt * 0.012;
    ref.current.rotation.x = Math.sin(performance.now() * 0.00008) * 0.025;
  });

  return (
    <points ref={ref} frustumCulled>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#a7d8ff"
        transparent
        opacity={0.68}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

export default Particles;
