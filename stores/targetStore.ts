import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TargetState = {
  dailyTarget: number;
  setDailyTarget: (hours: number) => void;
  weeklyTarget: number;
  monthlyTarget: number;
};

export const targetStore = create<TargetState>((set, get) => ({
  dailyTarget: 0,
  weeklyTarget: 0,
  monthlyTarget: 0,

  setDailyTarget: async (hours) => {
    await AsyncStorage.setItem("dailyTarget", hours.toString());
    const weeklyHours = hours * 7;
    const monthlyHours = hours * 30;

    set({
      dailyTarget: hours,
      weeklyTarget: weeklyHours,
      monthlyTarget: monthlyHours,
    });
    await AsyncStorage.setItem("weeklyTarget", weeklyHours.toString());
    await AsyncStorage.setItem("monthlyTarget", monthlyHours.toString());
  },
}));

export const initializeTargets = async () => {
  try {
    const [daily, weekly, monthly] = await Promise.all([
      AsyncStorage.getItem("dailyTarget"),
      AsyncStorage.getItem("weeklyTarget"),
      AsyncStorage.getItem("monthlyTarget"),
    ]);

    const dailyValue = daily ? parseInt(daily, 10) : 2;
    const weeklyValue = weekly ? parseInt(weekly, 10) : dailyValue * 7;
    const monthlyValue = monthly ? parseInt(monthly, 10) : dailyValue * 30;

    targetStore.setState({
      dailyTarget: dailyValue,
      weeklyTarget: weeklyValue,
      monthlyTarget: monthlyValue,
    });
  } catch (error) {
    console.error("Failed to initialize targets:", error);
  }
};
