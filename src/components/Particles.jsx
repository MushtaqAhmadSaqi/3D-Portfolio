import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ambient floating particles — gives the scene life without GPU cost.
 */
export default function Particles({ count = 250 }) {
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

  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.015;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 1; i < arr.length; i += 3) {
      arr[i] += Math.sin(state.clock.elapsedTime + i) * 0.0015;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#a7d8ff"
        transparent
        opacity={0.75}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
