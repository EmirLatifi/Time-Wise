import { Audio } from "expo-av";
import { Vibration } from "react-native";
import { create } from "zustand";

type SoundState = {
  sound: Audio.Sound | null;
  isSoundOn: boolean;
  vibrate: boolean;
  playBreakSound: () => Promise<void>;
  toggleSound: () => void;
  toggleVibrate: () => void;
  cleanupSound: () => Promise<void>;
};

export const soundStore = create<SoundState>((set, get) => ({
  sound: null,
  isSoundOn: true,
  vibrate: true,

  toggleSound: () => {
    set((state) => ({ isSoundOn: !state.isSoundOn }));
  },
  toggleVibrate: () => {
    set((state) => ({ vibrate: !state.vibrate }));
  },

  cleanupSound: async () => {
    const { sound } = get();
    if (sound) {
      await sound.unloadAsync();
      set({ sound: null });
    }
  },

  playBreakSound: async () => {
    const state = get();
    if (!state.isSoundOn) return;

    // Clean up any existing sound before creating a new one
    await state.cleanupSound();

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/BreakNotificationSound.mp3")
    );

    await sound.playAsync();

    if (state.vibrate) {
      Vibration.vibrate([300, 200, 300]);
    }

    set({ sound });
  },
}));
