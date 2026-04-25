import { create } from "zustand";

const noop = () => {};

const defaultSoundApi = {
  playHover: noop,
  playClick: noop,
};

// Global UI state: modals, mode toggles, sound, tour step, etc.
export const useStore = create((set, get) => ({
  // Lifecycle
  loaded: false,
  setLoaded: (v) => set({ loaded: v }),
  progress: 0,
  setProgress: (v) => set({ progress: v }),
  entered: false,
  enter: () => set({ entered: true }),

  // Modals
  activeProject: null,
  openProject: (p) => set({ activeProject: p }),
  closeProject: () => set({ activeProject: null }),

  aboutOpen: false,
  toggleAbout: (v) => set({ aboutOpen: v ?? !get().aboutOpen }),

  contactOpen: false,
  toggleContact: (v) => set({ contactOpen: v ?? !get().contactOpen }),

  // Modes
  mode: "explore", // "explore" | "tour"
  setMode: (m) => set({ mode: m }),
  tourStep: 0,
  setTourStep: (n) => set({ tourStep: n }),

  // Camera and focus
  cameraTarget: null,
  activeFocus: null,

  setCameraTarget: (target) =>
    set({
      cameraTarget: target,
      activeFocus: target
        ? {
            id: target.id ?? target.label ?? "focus",
            label: target.label ?? "Focused area",
            kind: target.kind ?? "scene",
            accent: target.accent ?? "#38bdf8",
          }
        : get().activeFocus,
    }),

  focusTarget: (target) =>
    set({
      cameraTarget: target,
      activeFocus: target
        ? {
            id: target.id ?? target.label ?? "focus",
            label: target.label ?? "Focused area",
            kind: target.kind ?? "scene",
            accent: target.accent ?? "#38bdf8",
          }
        : null,
    }),

  clearCameraTarget: () => set({ cameraTarget: null }),

  // Sound
  muted: true,
  toggleMuted: () => set({ muted: !get().muted }),

  soundApi: defaultSoundApi,
  setSoundApi: (api) => set({ soundApi: api ?? defaultSoundApi }),
  playHoverSound: () => get().soundApi.playHover?.(),
  playClickSound: () => get().soundApi.playClick?.(),

  // Experience routing
  // null = automatic, "2d" = force fallback, "3d" = force 3D even on low-power devices
  experienceOverride: null,
  setExperienceOverride: (mode) =>
    set({
      experienceOverride: mode,
      forceFallback: mode === "2d",
    }),

  // Backward-compatible fallback controls used by the current HUD
  forceFallback: false,
  setForceFallback: (v) =>
    set({
      forceFallback: v,
      experienceOverride: v ? "2d" : null,
    }),
}));
