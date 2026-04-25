import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useStore } from "../utils/useStore.js";

export default function SoundManager() {
  const muted = useStore((s) => s.muted);
  const setSoundApi = useStore((s) => s.setSoundApi);

  const mutedRef = useRef(muted);
  const ambientRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    mutedRef.current = muted;

    const ambient = ambientRef.current;
    if (!ambient) return;

    ambient.mute(muted);

    if (!muted && !ambient.playing()) {
      ambient.play();
    }
  }, [muted]);

  useEffect(() => {
    try {
      ambientRef.current = new Howl({
        src: ["/sounds/ambient.mp3"],
        loop: true,
        volume: 0.22,
        html5: true,
      });

      hoverSoundRef.current = new Howl({
        src: ["/sounds/hover.mp3"],
        volume: 0.32,
      });

      clickSoundRef.current = new Howl({
        src: ["/sounds/click.mp3"],
        volume: 0.48,
      });

      ambientRef.current.mute(mutedRef.current);

      if (!mutedRef.current) {
        ambientRef.current.play();
      }

      setSoundApi({
        playHover: () => {
          if (!mutedRef.current) {
            hoverSoundRef.current?.play();
          }
        },
        playClick: () => {
          if (!mutedRef.current) {
            clickSoundRef.current?.play();
          }
        },
      });
    } catch {
      setSoundApi(null);
    }

    return () => {
      setSoundApi(null);
      ambientRef.current?.unload();
      hoverSoundRef.current?.unload();
      clickSoundRef.current?.unload();

      ambientRef.current = null;
      hoverSoundRef.current = null;
      clickSoundRef.current = null;
    };
  }, [setSoundApi]);

  return null;
}
