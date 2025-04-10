import { create } from "zustand";

type StudyConfig = {
  timeBetweenBreaks: number;
  numberOfBreaks: number;
};

type StudyConfigState = {
  studySettings: StudyConfig;
  isConfigured: boolean;

  // Actions
  setStudySettings: (settings: StudyConfig) => void;
  setIsConfigured: (isConfigured: boolean) => void;
  reset: () => void;
};

export const studyConfigStore = create<StudyConfigState>((set) => ({
  studySettings: { timeBetweenBreaks: 0, numberOfBreaks: 0 },
  isConfigured: false,

  setStudySettings: (settings) => set({ studySettings: settings }),
  setIsConfigured: (isConfigured) => set({ isConfigured }),

  reset: () =>
    set({
      studySettings: { timeBetweenBreaks: 0, numberOfBreaks: 0 },
      isConfigured: false,
    }),
}));
