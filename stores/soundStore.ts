import { Audio } from "expo-av";
import { Vibration } from "react-native";
import { create } from "zustand";

type SoundState = {
  sound: Audio.Sound | null;
  isSoundOn: boolean;
  playBreakSound: () => Promise<void>;
  toggleSound: () => void;
};

export const soundStore = create<SoundState>((set, get) => ({
  sound: null,
  isSoundOn: true,

  toggleSound: () => {
    set((state) => ({ isSoundOn: !state.isSoundOn }));
  },

  playBreakSound: async () => {
    const state = get();
    if (!state.isSoundOn) return;

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/BreakNotificationSound.mp3")
    );
    await sound.playAsync();
    if (state.isSoundOn) {
      Vibration.vibrate([500, 500, 500]);
    }
    set({ sound });
  },
}));
