import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StudyTimeState {
  dailyStudyTime: number;
  weeklyStudyTime: number;
  monthlyStudyTime: number;
  fetchStudyTimes: () => Promise<void>;
  // resetDailyStudyTime: () => Promise<void>;
  // resetWeeklyStudyTime: () => Promise<void>;
  // resetMonthlyStudyTime: () => Promise<void>;
}

export const studyStore = create<StudyTimeState>((set) => ({
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
  // resetDailyStudyTime: async () => {
  //   try {
  //     await AsyncStorage.setItem("dailyStudyTime", "0");
  //     set({ dailyStudyTime: 0 });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // resetWeeklyStudyTime: async () => {
  //   try {
  //     await AsyncStorage.setItem("weeklyStudyTime", "0");
  //     set({ weeklyStudyTime: 0 });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // resetMonthlyStudyTime: async () => {
  //   try {
  //     await AsyncStorage.setItem("monthlyStudyTime", "0");
  //     set({ monthlyStudyTime: 0 });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
}));
