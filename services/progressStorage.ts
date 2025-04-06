// services/progressStorage.ts
import { getItem, setItem } from "../utils/storageHelpers";

export const getStudyTime = async (type: string): Promise<number> => {
  const time = await getItem(`${type}StudyTime`);
  return time ? parseInt(time, 10) : 0;
};

export const saveStudyTime = async (newTime: number) => {
  if (newTime < 0) throw new Error("Invalid time value");

  const daily = await getStudyTime("daily");
  const weekly = await getStudyTime("weekly");
  const monthly = await getStudyTime("monthly");

  await Promise.all([
    setItem("dailyStudyTime", (daily + newTime).toString()),
    setItem("weeklyStudyTime", (weekly + newTime).toString()),
    setItem("monthlyStudyTime", (monthly + newTime).toString()),
  ]);
};
