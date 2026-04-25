import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { useStore } from "../utils/useStore.js";

function createFallbackAudio() {
  let ctx = null;
  let ambientOsc = null;
  let ambientGain = null;

  const getContext = () => {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctx;
  };

  const beep = ({ frequency = 440, duration = 0.08, volume = 0.08, type = "sine" }) => {
    try {
      const audio = getContext();

      if (audio.state === "suspended") {
        audio.resume();
      }

      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(0, audio.currentTime);
      gain.gain.linearRampToValueAtTime(volume, audio.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start();
      oscillator.stop(audio.currentTime + duration);
    } catch {
      // ignore audio errors
    }
  };

  return {
    startAmbient: () => {
      try {
        const audio = getContext();

        if (audio.state === "suspended") {
          audio.resume();
        }

        if (ambientOsc) return;

        ambientOsc = audio.createOscillator();
        ambientGain = audio.createGain();

        ambientOsc.type = "sine";
        ambientOsc.frequency.value = 88;

        ambientGain.gain.setValueAtTime(0.018, audio.currentTime);

        ambientOsc.connect(ambientGain);
        ambientGain.connect(audio.destination);
        ambientOsc.start();
      } catch {
        // ignore audio errors
      }
    },

    stopAmbient: () => {
      try {
        ambientOsc?.stop();
      } catch {
        // ignore
      }

      ambientOsc = null;
      ambientGain = null;
    },

    playHover: () => {
      beep({
        frequency: 620,
        duration: 0.045,
        volume: 0.035,
        type: "sine",
      });
    },

    playClick: () => {
      beep({
        frequency: 220,
        duration: 0.075,
        volume: 0.07,
        type: "triangle",
      });

      window.setTimeout(() => {
        beep({
          frequency: 440,
          duration: 0.055,
          volume: 0.04,
          type: "sine",
        });
      }, 45);
    },

    destroy: () => {
      try {
        ambientOsc?.stop();
        ctx?.close();
      } catch {
        // ignore
      }

      ambientOsc = null;
      ambientGain = null;
      ctx = null;
    },
  };
}

export default function SoundManager() {
  const muted = useStore((s) => s.muted);
  const entered = useStore((s) => s.entered);
  const setSoundApi = useStore((s) => s.setSoundApi);

  const mutedRef = useRef(muted);
  const fallbackRef = useRef(null);
  const ambientRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const usingFallbackRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;

    if (usingFallbackRef.current) {
      if (muted || !entered) {
        fallbackRef.current?.stopAmbient();
      } else {
        fallbackRef.current?.startAmbient();
      }

      return;
    }

    const ambient = ambientRef.current;
    if (!ambient) return;

    ambient.mute(muted);

    if (!muted && entered && !ambient.playing()) {
      ambient.play();
    }

    if (muted && ambient.playing()) {
      ambient.pause();
    }
  }, [muted, entered]);

  useEffect(() => {
    fallbackRef.current = createFallbackAudio();

    const useFallbackSounds = () => {
      usingFallbackRef.current = true;

      setSoundApi({
        playHover: () => {
          if (!mutedRef.current) {
            fallbackRef.current?.playHover();
          }
        },
        playClick: () => {
          if (!mutedRef.current) {
            fallbackRef.current?.playClick();
          }
        },
      });

      if (!mutedRef.current && entered) {
        fallbackRef.current?.startAmbient();
      }
    };

    try {
      ambientRef.current = new Howl({
        src: ["/sounds/ambient.mp3"],
        loop: true,
        volume: 0.22,
        html5: true,
        onloaderror: useFallbackSounds,
        onplayerror: useFallbackSounds,
      });

      hoverSoundRef.current = new Howl({
        src: ["/sounds/hover.mp3"],
        volume: 0.32,
        onloaderror: useFallbackSounds,
        onplayerror: useFallbackSounds,
      });

      clickSoundRef.current = new Howl({
        src: ["/sounds/click.mp3"],
        volume: 0.48,
        onloaderror: useFallbackSounds,
        onplayerror: useFallbackSounds,
      });

      setSoundApi({
        playHover: () => {
          if (!mutedRef.current) {
            if (usingFallbackRef.current) {
              fallbackRef.current?.playHover();
            } else {
              hoverSoundRef.current?.play();
            }
          }
        },
        playClick: () => {
          if (!mutedRef.current) {
            if (usingFallbackRef.current) {
              fallbackRef.current?.playClick();
            } else {
              clickSoundRef.current?.play();
            }
          }
        },
      });

      if (!mutedRef.current && entered) {
        ambientRef.current.play();
      }
    } catch {
      useFallbackSounds();
    }

    return () => {
      setSoundApi(null);

      ambientRef.current?.unload();
      hoverSoundRef.current?.unload();
      clickSoundRef.current?.unload();

      fallbackRef.current?.destroy();

      ambientRef.current = null;
      hoverSoundRef.current = null;
      clickSoundRef.current = null;
      fallbackRef.current = null;
      usingFallbackRef.current = false;
    };
  }, [setSoundApi, entered]);

  return null;
}
