import { useEffect, useState } from "react";

function getConnectionInfo() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    null;

  return {
    saveData: connection?.saveData === true,
    effectiveType: connection?.effectiveType || "unknown",
  };
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { powerPreference: "high-performance" }) ||
      canvas.getContext("webgl", { powerPreference: "high-performance" }) ||
      canvas.getContext("experimental-webgl");

    if (!gl) return false;

    gl.getExtension("WEBGL_lose_context")?.loseContext?.();
    return true;
  } catch {
    return false;
  }
}

function getCapabilitySnapshot() {
  const params = new URLSearchParams(window.location.search);
  const force3d = params.get("force") === "3d" || params.get("mode") === "3d";

  const width = window.innerWidth;
  const height = window.innerHeight;
  const shortestSide = Math.min(width, height);

  const coarsePointer =
    window.matchMedia?.("(pointer: coarse)")?.matches ||
    navigator.maxTouchPoints > 0;

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const hasWebGL = supportsWebGL();
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const { saveData, effectiveType } = getConnectionInfo();

  const verySmallScreen = shortestSide < 420;
  const phoneLikeViewport = coarsePointer && width < 900;
  const lowHardware = cores <= 4 && memory <= 4;
  const veryLowHardware = cores <= 2 || memory < 2;
  const slowConnection =
    saveData || effectiveType === "slow-2g" || effectiveType === "2g";

  let reason = "";

  if (!hasWebGL) {
    reason = "WebGL is not available on this device.";
  } else if (prefersReducedMotion) {
    reason = "Reduced motion is enabled in your system settings.";
  } else if (slowConnection) {
    reason = "Data saver or a slow connection is enabled.";
  } else if (verySmallScreen) {
    reason = "This screen is very small for the full 3D studio.";
  } else if (phoneLikeViewport && lowHardware) {
    reason = "This looks like a mobile or touch device with limited graphics headroom.";
  } else if (veryLowHardware) {
    reason = "This device appears to have limited CPU or memory resources.";
  }

  const shouldUseFallback =
    !force3d &&
    Boolean(
      !hasWebGL ||
        prefersReducedMotion ||
        slowConnection ||
        verySmallScreen ||
        (phoneLikeViewport && lowHardware) ||
        veryLowHardware
    );

  return {
    isLowPower: shouldUseFallback,
    reason,
    hasWebGL,
    isTouchDevice: coarsePointer,
    prefersReducedMotion,
    viewport: { width, height },
    hardware: { cores, memory },
    connection: { saveData, effectiveType },
  };
}

/**
 * Detects low-power / touch / reduced-motion scenarios and recommends the 2D fallback.
 * The app can still force 3D through ?force=3d, ?mode=3d, or the fallback's "Try 3D" button.
 */
export function useDeviceCapability() {
  const [capability, setCapability] = useState(() => {
    if (typeof window === "undefined") {
      return {
        isLowPower: false,
        reason: "",
        hasWebGL: true,
        isTouchDevice: false,
        prefersReducedMotion: false,
        viewport: { width: 0, height: 0 },
        hardware: { cores: 4, memory: 4 },
        connection: { saveData: false, effectiveType: "unknown" },
      };
    }

    return getCapabilitySnapshot();
  });

  useEffect(() => {
    let frame = null;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setCapability(getCapabilitySnapshot());
      });
    };

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return capability;
}
