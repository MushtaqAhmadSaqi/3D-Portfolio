import { useEffect, useState } from "react";

/**
 * Detects low-power / low-capability devices and recommends the 2D fallback.
 * Criteria: WebGL unavailable, very small viewport, very few CPU cores,
 * device memory < 2GB, or save-data enabled.
 */
export function useDeviceCapability() {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      const noWebGL = !gl;
      const tinyScreen = window.innerWidth < 360;
      const lowCores = (navigator.hardwareConcurrency || 4) <= 2;
      const lowMemory = (navigator.deviceMemory || 4) < 2;
      const saveData = navigator.connection?.saveData === true;

      const params = new URLSearchParams(window.location.search);
      const force3d = params.get("force") === "3d";

      setIsLowPower(!force3d && (noWebGL || tinyScreen || (lowCores && lowMemory) || saveData));
    } catch {
      setIsLowPower(true);
    }
  }, []);

  return { isLowPower };
}
