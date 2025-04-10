import { create } from "zustand";

type BreaksConfig = {
  timeBetweenBreaks: number;
  numberOfBreaks: number;
};

type StudyConfigState = {
  breaksSettings: BreaksConfig;
  isConfigured: boolean;

  // Actions
  setBreaksSettings: (settings: BreaksConfig) => void;
  setIsConfigured: (isConfigured: boolean) => void;
  reset: () => void;
};

export const studyConfigStore = create<StudyConfigState>((set) => ({
  breaksSettings: { timeBetweenBreaks: 0, numberOfBreaks: 0 },
  isConfigured: false,

  setBreaksSettings: (settings) => set({ breaksSettings: settings }),
  setIsConfigured: (isConfigured) => set({ isConfigured }),

  reset: () =>
    set({
      breaksSettings: { timeBetweenBreaks: 0, numberOfBreaks: 0 },
      isConfigured: false,
    }),
}));
