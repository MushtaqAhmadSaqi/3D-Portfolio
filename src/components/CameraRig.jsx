import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../utils/useStore.js";

/**
 * Smoothly moves the camera toward an art-directed target.
 * Supports:
 * - position: object position
 * - lookAt: exact point controls should look at
 * - cameraOffset: camera position relative to object
 * - smoothness: damping speed
 */
export default function CameraRig({ controlsRef }) {
  const { camera } = useThree();

  const target = useStore((s) => s.cameraTarget);
  const clearCameraTarget = useStore((s) => s.clearCameraTarget);

  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredLookAt = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);
  const fallbackOffset = useMemo(() => new THREE.Vector3(0, 1.1, 4.5), []);

  useFrame((_, dt) => {
    if (!target?.position) return;

    const [x, y, z] = target.position;
    const lookAt = target.lookAt ?? target.position;
    const offset = target.cameraOffset ?? fallbackOffset.toArray();

    desiredPosition.set(
      x + offset[0],
      y + offset[1],
      z + offset[2]
    );

    desiredLookAt.set(lookAt[0], lookAt[1], lookAt[2]);

    const smoothness = target.smoothness ?? 5.5;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      desiredPosition.x,
      smoothness,
      dt
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      desiredPosition.y,
      smoothness,
      dt
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      desiredPosition.z,
      smoothness,
      dt
    );

    if (controlsRef?.current) {
      currentLookAt.copy(controlsRef.current.target);

      currentLookAt.x = THREE.MathUtils.damp(
        currentLookAt.x,
        desiredLookAt.x,
        smoothness,
        dt
      );
      currentLookAt.y = THREE.MathUtils.damp(
        currentLookAt.y,
        desiredLookAt.y,
        smoothness,
        dt
      );
      currentLookAt.z = THREE.MathUtils.damp(
        currentLookAt.z,
        desiredLookAt.z,
        smoothness,
        dt
      );

      controlsRef.current.target.copy(currentLookAt);
      controlsRef.current.update();
    } else {
      camera.lookAt(desiredLookAt);
    }

    const positionReady =
      camera.position.distanceTo(desiredPosition) < (target.epsilon ?? 0.055);

    const lookReady =
      !controlsRef?.current ||
      controlsRef.current.target.distanceTo(desiredLookAt) < (target.epsilon ?? 0.055);

    if (positionReady && lookReady) {
      clearCameraTarget();
    }
  });

  return null;
}
