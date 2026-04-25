import { create } from "zustand";

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

  // Camera target for smooth focus transitions
  cameraTarget: null,
  setCameraTarget: (t) => set({ cameraTarget: t }),

  // Sound
  muted: true,
  toggleMuted: () => set({ muted: !get().muted }),

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
