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

  // Camera target (for smooth focus transitions)
  cameraTarget: null,
  setCameraTarget: (t) => set({ cameraTarget: t }),

  // Sound
  muted: true,
  toggleMuted: () => set({ muted: !get().muted }),

  // Fallback
  forceFallback: false,
  setForceFallback: (v) => set({ forceFallback: v }),
}));
