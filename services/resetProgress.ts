// services/resetProgress.ts
import moment from "moment-timezone";
import { getItem, setItem } from "../utils/storageHelpers";
import { studyStore } from "../stores/studyStore";

const getWeekNumber = (date: any) => moment(date).isoWeek();

export const resetProgressIfNeeded = async () => {
  try {
    const timezone = moment.tz.guess();
    const now = moment().tz(timezone);

    const lastResetDate = await getItem("lastResetDate");
    const lastResetWeek = await getItem("lastResetWeek");
    const lastResetMonth = await getItem("lastResetMonth");

    if (!lastResetDate || !moment(lastResetDate).isSame(now, "day")) {
      await setItem("dailyStudyTime", "0");
      await setItem("lastResetDate", now.format("YYYY-MM-DD"));
      studyStore.setState((state) => ({ ...state, dailyStudyTime: 0 }));
    }

    const currentWeek = getWeekNumber(now);
    if (!lastResetWeek || lastResetWeek !== currentWeek.toString()) {
      await setItem("weeklyStudyTime", "0");
      await setItem("lastResetWeek", currentWeek.toString());
      studyStore.setState((state) => ({ ...state, weeklyStudyTime: 0 }));
    }

    const currentMonth = now.format("YYYY-MM");
    if (!lastResetMonth || lastResetMonth !== currentMonth) {
      await setItem("monthlyStudyTime", "0");
      await setItem("lastResetMonth", currentMonth);
      studyStore.setState((state) => ({ ...state, monthlyStudyTime: 0 }));
    }
  } catch (error) {
    console.error("Failed to reset progress:", error);
  }
};
