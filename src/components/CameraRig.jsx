import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../utils/useStore.js";

/**
 * Smoothly moves the camera toward a target when the user focuses an object
 * (e.g. after clicking a hologram).
 */
export default function CameraRig({ controlsRef }) {
  const { camera } = useThree();
  const target = useStore((s) => s.cameraTarget);
  const setTarget = useStore((s) => s.setCameraTarget);

  const tmpPos = new THREE.Vector3();
  const tmpLook = new THREE.Vector3();

  useFrame(() => {
    if (!target) return;
    const [x, y, z] = target.position;
    const dist = target.distance ?? 4;

    // Place camera in front of the object, slightly above
    const dir = new THREE.Vector3(x, y, z).normalize();
    tmpPos.set(x, y, z).add(dir.multiplyScalar(dist));
    camera.position.lerp(tmpPos, 0.08);

    if (controlsRef?.current) {
      tmpLook.set(x, y, z);
      controlsRef.current.target.lerp(tmpLook, 0.08);
      controlsRef.current.update();
    }

    // Clear after close enough
    if (camera.position.distanceTo(tmpPos) < 0.15) setTarget(null);
  });

  return null;
}
