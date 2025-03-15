import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import CustomProgressBar from "@/components/progress/CustomProgressBar";
import {
  useProgressModalStore,
  useProgressStore,
  useTargetStore,
} from "@/store/useStudyStore";
import {
  calculateDailyProgress,
  calculateWeeklyProgress,
  calculateMonthlyProgress,
  resetProgressIfNeeded,
} from "@/utils/studyUtils";

const progress = () => {
  const { theme } = useThemeStore();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { progress, setProgress } = useProgressStore();
  const { dailyTarget, weeklyTarget, monthlyTarget } = useTargetStore();

  useEffect(() => {
    resetProgressIfNeeded();
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      console.log("Break effect triggered");
      try {
        // Calculate progress for each period
        const dailyProgress = await calculateDailyProgress(dailyTarget);
        const weeklyProgress = await calculateWeeklyProgress(weeklyTarget);
        const monthlyProgress = await calculateMonthlyProgress(monthlyTarget);

        setProgress({
          daily: dailyProgress,
          weekly: weeklyProgress,
          monthly: monthlyProgress,
        });
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    };

    if (dailyTarget && weeklyTarget && monthlyTarget) {
      loadProgress();
    }
  }, [dailyTarget, weeklyTarget, monthlyTarget]);

  const progressData = [
    {
      type: "daily",
      label: "Daily Progress",
      progress: progress.daily * 100,
      target: dailyTarget,
    },
    {
      type: "weekly",
      label: "Weekly Progress",
      progress: progress.weekly * 100,
      target: weeklyTarget,
    },
    {
      type: "monthly",
      label: "Monthly Progress",
      progress: progress.monthly * 100,
      target: monthlyTarget,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <CustomProgressBar progressData={progressData} />
      </View>
    </ScrollView>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    scrollView: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
      gap: 24,
    },
  });
export default progress;
