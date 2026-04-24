import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useStore } from "../utils/useStore.js";

/**
 * Ambient sound + interaction clicks.
 * Place audio files in /public/sounds/ — see README for free asset sources.
 * If files are missing, this component silently does nothing.
 */
export default function SoundManager() {
  const muted = useStore((s) => s.muted);
  const ambientRef = useRef(null);

  useEffect(() => {
    try {
      ambientRef.current = new Howl({
        src: ["/sounds/ambient.mp3"],
        loop: true,
        volume: 0.22,
        html5: true,
      });
      ambientRef.current.play();
    } catch (e) {
      // no audio available
    }
    return () => ambientRef.current?.unload();
  }, []);

  useEffect(() => {
    if (!ambientRef.current) return;
    ambientRef.current.mute(muted);
  }, [muted]);

  return null;
}
