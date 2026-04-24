import { create } from "zustand";

export const useStore = create((set) => ({
  entered: false,
  forceFallback: false,
  setEntered: (entered) => set({ entered }),
  setForceFallback: (forceFallback) => set({ forceFallback }),
}));
