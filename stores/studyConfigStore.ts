import { create } from "zustand";

type StudyConfig = {
  breakInterval: number;
  breakFrequency: number;
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
  studySettings: { breakInterval: 0, breakFrequency: 0 },
  isConfigured: false,

  setStudySettings: (settings) => set({ studySettings: settings }),
  setIsConfigured: (isConfigured) => set({ isConfigured }),

  reset: () =>
    set({
      studySettings: { breakInterval: 0, breakFrequency: 0 },
      isConfigured: false,
    }),
}));
