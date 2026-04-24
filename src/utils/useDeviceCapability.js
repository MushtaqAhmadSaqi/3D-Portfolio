import { useState, useEffect } from "react";

export function useDeviceCapability() {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Basic check for mobile or low-power devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    setIsLowPower(isMobile);
  }, []);

  return { isLowPower };
}
