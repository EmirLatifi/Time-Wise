import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { View } from "react-native";
import { getStyles } from "./styles";
import LargeButton from "@/components/button/LargeButton";
import { saveStudyTime } from "@/services/progressStorage";
import {
  calculateDailyProgress,
  calculateMonthlyProgress,
  calculateWeeklyProgress,
} from "@/utils/progressCalculators";
import { themeStore } from "@/stores/themeStore";
import {
  progressStore,
  studyConfigStore,
  studyStore,
  studyTimerStore,
  targetStore,
} from "@/stores";

const SaveStudyTimeButton = () => {
  const { theme } = themeStore();

  const { isActive, time } = studyTimerStore();
  const { isConfigured } = studyConfigStore();
  const { setProgress } = progressStore();
  const { dailyTarget, weeklyTarget, monthlyTarget } = targetStore();
  const { fetchStudyTimes } = studyStore();

  const timeRef = useRef(time);
  const isSaving = useRef(false);
  const isButtonDisabled = isActive || !isConfigured || time === 0;

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  const updateProgress = useCallback(async () => {
    const dailyProgress = await calculateDailyProgress(dailyTarget);
    const weeklyProgress = await calculateWeeklyProgress(weeklyTarget);
    const monthlyProgress = await calculateMonthlyProgress(monthlyTarget);

    setProgress({
      daily: dailyProgress,
      weekly: weeklyProgress,
      monthly: monthlyProgress,
    });
  }, [dailyTarget, weeklyTarget, monthlyTarget, setProgress]);

  const handleSaveTime = async () => {
    if (isSaving.current) return;

    try {
      isSaving.current = true;
      await saveStudyTime(timeRef.current);
      await updateProgress();
      fetchStudyTimes();
      studyTimerStore.setState({
        time: 0,
        breakCount: 0,
        isBreakTime: false,
      });
    } catch (error) {
      console.error("Error saving study time:", error);
    } finally {
      isSaving.current = false;
    }
  };

  return (
    <LargeButton
      onPress={handleSaveTime}
      disabled={isButtonDisabled}
      backgroundColor={
        isButtonDisabled ? theme.surfaceContainerHigh : theme.primary
      }
      textColor={isButtonDisabled ? theme.onSurface : theme.onPrimary}
      title="Save Time"
    />
  );
};

export default SaveStudyTimeButton;
