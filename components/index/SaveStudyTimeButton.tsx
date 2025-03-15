import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { AppState, StyleSheet, Text, Pressable, View } from "react-native";
import {
  calculateDailyProgress,
  calculateMonthlyProgress,
  calculateWeeklyProgress,
  saveStudyTime,
} from "@/utils/studyUtils";
import { useThemeStore } from "@/store/useThemeStore";
import {
  useProgressStore,
  useStudyConfigStore,
  useStudyStore,
  useStudyTimerStore,
  useTargetStore,
} from "@/store/useStudyStore";

const SaveStudyTimeButton = () => {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const isActive = useStudyTimerStore((state) => state.isActive);
  const getTime = useStudyTimerStore((state) => state.time);
  const isConfigured = useStudyConfigStore((state) => state.isConfigured);

  const { setProgress } = useProgressStore();
  const { dailyTarget, weeklyTarget, monthlyTarget } = useTargetStore();
  const { fetchStudyTimes } = useStudyStore();

  const timeRef = useRef(getTime);
  const isSaving = useRef(false);

  useEffect(() => {
    timeRef.current = getTime;
  }, [getTime]);

  const updateProgress = useCallback(async () => {
    const dailyProgress = await calculateDailyProgress(dailyTarget);
    const weeklyProgress = await calculateWeeklyProgress(weeklyTarget);
    const monthlyProgress = await calculateMonthlyProgress(monthlyTarget);

    setProgress({
      daily: dailyProgress,
      weekly: weeklyProgress,
      monthly: monthlyProgress,
    });
  }, [dailyTarget, weeklyTarget, monthlyTarget, setProgress]); // Only updates when dependencies change.

  const handleSaveTime = async () => {
    if (isSaving.current) return;

    try {
      isSaving.current = true;
      await saveStudyTime(timeRef.current);
      await updateProgress();
      fetchStudyTimes();
      useStudyTimerStore.setState({
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
    <View style={styles.container}>
      <Pressable
        onPress={handleSaveTime}
        style={[styles.saveButton]}
        disabled={isActive || !isConfigured}
      >
        <Text style={styles.saveButtonText}>Save Time</Text>
      </Pressable>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    timeDisplay: {
      fontSize: 24,
    },
    saveButton: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      backgroundColor: theme.primary,
      borderRadius: 20,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      // Shadow for Android
      elevation: 6,
    },
    saveButtonText: {
      color: theme.onPrimary,
      fontSize: 14,
      textAlign: "center",
      lineHeight: 20,
    },
    disabledButton: {
      opacity: 0.7,
    },
  });

export default SaveStudyTimeButton;
