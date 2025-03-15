import { create } from "zustand";
import { Audio } from "expo-av";
import { Vibration } from "react-native";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const useStudyTimerStore = create<StudyTimerState>((set) => ({
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

export const useStudyConfigStore = create<StudyConfigState>((set) => ({
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

type ProgressState = {
  progress: { daily: number; weekly: number; monthly: number };
  setProgress: (progress: {
    daily: number;
    weekly: number;
    monthly: number;
  }) => void;
};

export const useProgressStore = create(
  immer<ProgressState>((set) => ({
    progress: { daily: 0, weekly: 0, monthly: 0 },

    setProgress: (progress) =>
      set((state) => {
        state.progress = progress;
      }),
  }))
);

type TargetState = {
  dailyTarget: number;
  setDailyTarget: (minutes: number) => void;
  weeklyTarget: number;
  setWeeklyTarget: (minutes: number) => void;
  monthlyTarget: number;
  setMonthlyTarget: (minutes: number) => void;
};

export const useTargetStore = create<TargetState>((set) => ({
  dailyTarget: 2,
  setDailyTarget: (minutes) => set({ dailyTarget: minutes }),
  weeklyTarget: 14,
  setWeeklyTarget: (minutes) => set({ weeklyTarget: minutes }),
  monthlyTarget: 46,
  setMonthlyTarget: (minutes) => set({ monthlyTarget: minutes }),
}));

interface StudyTimeState {
  dailyStudyTime: number;
  weeklyStudyTime: number;
  monthlyStudyTime: number;
  fetchStudyTimes: () => Promise<void>;
  resetDailyStudyTime: () => Promise<void>;
  resetWeeklyStudyTime: () => Promise<void>;
  resetMonthlyStudyTime: () => Promise<void>;
}

export const useStudyStore = create<StudyTimeState>((set) => ({
  dailyStudyTime: 0,
  weeklyStudyTime: 0,
  monthlyStudyTime: 0,

  fetchStudyTimes: async () => {
    try {
      const [daily, weekly, monthly] = await Promise.all([
        AsyncStorage.getItem("dailyStudyTime"),
        AsyncStorage.getItem("weeklyStudyTime"),
        AsyncStorage.getItem("monthlyStudyTime"),
      ]);

      set({
        dailyStudyTime: daily ? parseInt(daily, 10) : 0,
        weeklyStudyTime: weekly ? parseInt(weekly, 10) : 0,
        monthlyStudyTime: monthly ? parseInt(monthly, 10) : 0,
      });
    } catch (error) {
      console.error("Failed to fetch study times:", error);
    }
  },
  resetDailyStudyTime: async () => {
    try {
      await AsyncStorage.setItem("dailyStudyTime", "0");
      set({ dailyStudyTime: 0 });
    } catch (error) {
      console.log(error);
    }
  },
  resetWeeklyStudyTime: async () => {
    try {
      await AsyncStorage.setItem("weeklyStudyTime", "0");
      set({ weeklyStudyTime: 0 });
    } catch (error) {
      console.log(error);
    }
  },
  resetMonthlyStudyTime: async () => {
    try {
      await AsyncStorage.setItem("monthlyStudyTime", "0");
      set({ monthlyStudyTime: 0 });
    } catch (error) {
      console.log(error);
    }
  },
}));

type ErrorState = {
  errors: {
    breakInterval?: boolean;
    breakFrequency?: boolean;
    targetError?: boolean;
  };

  // Actions
  setErrors: (errors: {
    breakInterval?: boolean;
    breakFrequency?: boolean;
    targetError?: boolean;
  }) => void;
  reset: () => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  errors: { breakInterval: false, breakFrequency: false, targetError: false },
  setErrors: (errors) => set({ errors }),

  reset: () =>
    set({
      errors: {
        breakInterval: false,
        breakFrequency: false,
        targetError: false,
      },
    }),
}));

type SoundState = {
  sound: Audio.Sound | null;

  // Actions
  playBreakSound: () => Promise<void>;
};

export const useSoundStore = create<SoundState>((set) => ({
  sound: null,

  playBreakSound: async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/BreakNotificationSound.mp3")
    );
    await sound.playAsync();
    Vibration.vibrate([500, 500, 500]);
    set({ sound });
  },
}));

type ModalState = {
  isModalVisible: boolean;
  toggleModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isModalVisible: false,

  toggleModal: () =>
    set((state) => ({ isModalVisible: !state.isModalVisible })),
}));

type ProgressModalState = {
  isModalVisible: boolean;
  targetType: string;
  toggleProgressModal: (type?: string) => void;
};

export const useProgressModalStore = create<ProgressModalState>((set) => ({
  isModalVisible: false,
  targetType: "daily",
  toggleProgressModal: (type?: string) =>
    set((state) => ({
      isModalVisible: !state.isModalVisible,
      targetType: type,
    })),
}));

type AlertType = "warning" | "info" | "error" | "confirmation" | "success";

type AlertState = {
  isVisible: boolean;
  type: AlertType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;

  //Actions

  showAlert: (params: {
    type: AlertType;
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
  hideAlert: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  isVisible: false,
  type: "info",
  title: "",
  message: "",
  onConfirm: undefined,
  onCancel: undefined,

  showAlert: ({ type, title, message, onConfirm, onCancel }) =>
    set({
      isVisible: true,
      type,
      title,
      message,
      onConfirm,
      onCancel,
    }),

  hideAlert: () =>
    set({
      isVisible: false,
      title: "",
      message: "",
      onConfirm: undefined,
      onCancel: undefined,
    }),
}));
