import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useStore } from "../utils/useStore.js";

export default function SoundManager() {
  const muted = useStore((s) => s.muted);
  const ambientRef = useRef(null);
  const hoverSound = useRef(null);
  const clickSound = useRef(null);

  useEffect(() => {
    try {
      ambientRef.current = new Howl({
        src: ["/sounds/ambient.mp3"],
        loop: true,
        volume: 0.22,
        html5: true,
      });
      hoverSound.current = new Howl({ src: ["/sounds/hover.mp3"], volume: 0.35 });
      clickSound.current = new Howl({ src: ["/sounds/click.mp3"], volume: 0.5 });
      ambientRef.current.play();
    } catch {
      // silently fail
    }
    return () => ambientRef.current?.unload();
  }, []);

  useEffect(() => {
    if (!ambientRef.current) return;
    ambientRef.current.mute(muted);
  }, [muted]);

  // Expose playHover and playClick as global for simplicity
  window.playHoverSound = () => {
    if (!muted && hoverSound.current) hoverSound.current.play();
  };

  window.playClickSound = () => {
    if (!muted && clickSound.current) clickSound.current.play();
  };

  return null;
}
