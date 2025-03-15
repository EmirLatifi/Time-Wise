import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment-timezone";

// Funksioni për të marrë numrin e javës
const getWeekNumber = (date: any) => {
  return moment(date).isoWeek();
};

// Funksioni për të rivendosur progresin
export const resetProgressIfNeeded = async () => {
  try {
    const timezone = moment.tz.guess(); // Merr zonën kohore të përdoruesit
    const now = moment().tz(timezone); // Koha aktuale në zonën kohore të përdoruesit

    // Merr të dhënat e fundit të rivendosjes
    const lastResetDate = await AsyncStorage.getItem("lastResetDate");
    const lastResetWeek = await AsyncStorage.getItem("lastResetWeek");
    const lastResetMonth = await AsyncStorage.getItem("lastResetMonth");

    // Rivendos progresin ditor nëse është fillimi i një dite të re
    if (!lastResetDate || !moment(lastResetDate).isSame(now, "day")) {
      await AsyncStorage.setItem("dailyStudyTime", "0");
      await AsyncStorage.setItem("lastResetDate", now.format("YYYY-MM-DD"));
    }

    // Rivendos progresin javor nëse është fillimi i një jave të re
    const currentWeek = getWeekNumber(now);
    if (!lastResetWeek || lastResetWeek !== currentWeek.toString()) {
      await AsyncStorage.setItem("weeklyStudyTime", "0");
      await AsyncStorage.setItem("lastResetWeek", currentWeek.toString());
    }

    // Rivendos progresin mujor nëse është fillimi i një muaji të ri
    const currentMonth = now.format("YYYY-MM");
    if (!lastResetMonth || lastResetMonth !== currentMonth) {
      await AsyncStorage.setItem("monthlyStudyTime", "0");
      await AsyncStorage.setItem("lastResetMonth", currentMonth);
    }
  } catch (error) {
    console.error("Failed to reset progress:", error);
  }
};

// Funksioni për të ruajtur kohën e studimit
export const saveStudyTime = async (newTime: number) => {
  try {
    if (newTime < 0) throw new Error("Invalid time value");

    // Get existing times
    const existingDaily = await getStudyTime("daily");
    const existingWeekly = await getStudyTime("weekly");
    const existingMonthly = await getStudyTime("monthly");

    // Add new time to existing times
    const updatedDaily = existingDaily + newTime;
    const updatedWeekly = existingWeekly + newTime;
    const updatedMonthly = existingMonthly + newTime;

    // Save all updated times
    await Promise.all([
      AsyncStorage.setItem("dailyStudyTime", updatedDaily.toString()),
      AsyncStorage.setItem("weeklyStudyTime", updatedWeekly.toString()),
      AsyncStorage.setItem("monthlyStudyTime", updatedMonthly.toString()),
    ]);
  } catch (error) {
    console.error("Failed to save study time:", error);
  }
};

// Funksioni për të marrë kohën e studimit
export const getStudyTime = async (type: any) => {
  try {
    const studyTime = await AsyncStorage.getItem(`${type}StudyTime`);
    return studyTime ? parseInt(studyTime, 10) : 0;
  } catch (error) {
    console.error("Failed to retrieve study time:", error);
    return 0;
  }
};

// Calculate progress based on stored time
export const calculateDailyProgress = async (target: number) => {
  const storedTime = parseInt(
    (await AsyncStorage.getItem("dailyStudyTime")) || "0",
    10
  );

  const dailyGoal = target * 60 * 60; // Convert hours to seconds
  return Math.min(storedTime / dailyGoal, 1);
};

export const calculateWeeklyProgress = async (target: number) => {
  const storedTime = parseInt(
    (await AsyncStorage.getItem("weeklyStudyTime")) || "0",
    10
  );
  const weekGoal = target * 60 * 60 * 7; // Convert hours to seconds for 7 days
  return Math.min(storedTime / weekGoal, 1);
};

export const calculateMonthlyProgress = async (target: number) => {
  const storedTime = parseInt(
    (await AsyncStorage.getItem("monthlyStudyTime")) || "0",
    10
  );
  const daysInMonth = moment().daysInMonth();
  const monthGoal = target * 60 * 60 * daysInMonth;
  return Math.min(storedTime / monthGoal, 1);
};
