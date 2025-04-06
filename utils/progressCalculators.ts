// utils/progressCalculators.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const getTimeInHours = async (key: string) => {
  const time = await AsyncStorage.getItem(key);
  const seconds = parseInt(time || "0", 10);
  return seconds / (60 * 60);
};

export const calculateDailyProgress = async (targetHours: number) => {
  const hours = await getTimeInHours("dailyStudyTime");
  return Math.min(hours / targetHours, 1);
};

export const calculateWeeklyProgress = async (targetHours: number) => {
  const hours = await getTimeInHours("weeklyStudyTime");
  return Math.min(hours / targetHours, 1);
};

export const calculateMonthlyProgress = async (targetHours: number) => {
  const hours = await getTimeInHours("monthlyStudyTime");
  return Math.min(hours / targetHours, 1);
};
