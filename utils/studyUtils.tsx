import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment-timezone";

// Funksioni per me marr nr e javes
const getWeekNumber = (date: any) => {
  return moment(date).isoWeek();
};

// Funksioni per me resetu progresin
export const resetProgressIfNeeded = async () => {
  try {
    const timezone = moment.tz.guess(); // Merr zonen kohore t userit
    const now = moment().tz(timezone); // Koha aktuale n zonen kohore t userit

    // Merr t dhenat e fundit t kohes t resetimit
    const lastResetDate = await AsyncStorage.getItem("lastResetDate");
    const lastResetWeek = await AsyncStorage.getItem("lastResetWeek");
    const lastResetMonth = await AsyncStorage.getItem("lastResetMonth");

    // reseto progresin ditor nese eshte fillimi i dites t re
    if (!lastResetDate || !moment(lastResetDate).isSame(now, "day")) {
      await AsyncStorage.setItem("dailyStudyTime", "0");
      await AsyncStorage.setItem("lastResetDate", now.format("YYYY-MM-DD"));
    }

    // reseto progresin javor nese eshte fillimi i javes se re
    const currentWeek = getWeekNumber(now);
    if (!lastResetWeek || lastResetWeek !== currentWeek.toString()) {
      await AsyncStorage.setItem("weeklyStudyTime", "0");
      await AsyncStorage.setItem("lastResetWeek", currentWeek.toString());
    }

    // reseto progresin mujor nese eshte fillimi i muajit t ri
    const currentMonth = now.format("YYYY-MM");
    if (!lastResetMonth || lastResetMonth !== currentMonth) {
      await AsyncStorage.setItem("monthlyStudyTime", "0");
      await AsyncStorage.setItem("lastResetMonth", currentMonth);
    }
  } catch (error) {
    console.error("Failed to reset progress:", error);
  }
};

// Funksioni per me ruajt kohen e studimit
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
export const calculateDailyProgress = async (targetHours: number) => {
  const storedTimeSeconds = parseInt(
    (await AsyncStorage.getItem("dailyStudyTime")) || "0",
    10
  );

  const storedTimeHours = storedTimeSeconds / (60 * 60);
  return Math.min(storedTimeHours / targetHours, 1);
};

export const calculateWeeklyProgress = async (targetHours: number) => {
  const storedTimeSeconds = parseInt(
    (await AsyncStorage.getItem("weeklyStudyTime")) || "0",
    10
  );

  const storedTimeHours = storedTimeSeconds / (60 * 60);
  return Math.min(storedTimeHours / targetHours, 1);
};

export const calculateMonthlyProgress = async (targetHours: number) => {
  const storedTimeSeconds = parseInt(
    (await AsyncStorage.getItem("monthlyStudyTime")) || "0",
    10
  );

  const storedTimeHours = storedTimeSeconds / (60 * 60);
  return Math.min(storedTimeHours / targetHours, 1);
};
