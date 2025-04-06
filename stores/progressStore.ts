import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ProgressState = {
  progress: { daily: number; weekly: number; monthly: number };
  setProgress: (progress: {
    daily: number;
    weekly: number;
    monthly: number;
  }) => void;
};

export const progressStore = create(
  immer<ProgressState>((set) => ({
    progress: { daily: 0, weekly: 0, monthly: 0 },

    setProgress: (progress) =>
      set((state) => {
        state.progress = progress;
      }),
  }))
);
