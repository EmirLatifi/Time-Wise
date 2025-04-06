import { create } from "zustand";

type StudyTimerState = {
  startedTime: Date | null;
  time: number;
  isActive: boolean;
  isPaused: boolean;
  isStarted: boolean;
  isBreakTime: boolean;
  breakCount: number;

  // Actions
  setStartedTime: (time: Date | null) => void;
  setTime: (time: number) => void;
  setIsBreakTime: (isBreakTime: boolean) => void;
  setBreakCount: (count: number) => void;
  reset: () => void;
};

export const studyTimerStore = create<StudyTimerState>((set) => ({
  startedTime: null,
  time: 0,
  isActive: false,
  isPaused: true,
  isStarted: false,
  isBreakTime: false,
  breakCount: 0,

  setStartedTime: (time) => set({ startedTime: time }),
  setTime: (time) => set({ time }),
  setIsBreakTime: (isBreakTime) => set({ isBreakTime }),
  setBreakCount: (count) => set({ breakCount: count }),

  reset: () =>
    set({
      startedTime: null,
      time: 0,
      isActive: false,
      isPaused: true,
      isStarted: false,
      isBreakTime: false,
      breakCount: 0,
    }),
}));
