import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { themeStore } from "@/stores/themeStore";
import { studyStore } from "@/stores";
import TargetModal from "./TargetModal";
import TargetButton from "././TargetButton";
import { Typography } from "@/constants/Typography";

interface ProgressData {
  type: "daily" | "weekly" | "monthly" | string;
  label: string;
  progress: number;
  target: number;
}

interface ProgressBoxesProps {
  progressData: ProgressData[];
}

const ProgressBoxes = ({ progressData }: ProgressBoxesProps) => {
  const { theme } = themeStore();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { dailyStudyTime, weeklyStudyTime, monthlyStudyTime, fetchStudyTimes } =
    studyStore();

  useEffect(() => {
    fetchStudyTimes();
  }, []);

  const getStudyTime = (type: string) => {
    switch (type) {
      case "daily":
        return dailyStudyTime;
      case "weekly":
        return weeklyStudyTime;
      case "monthly":
        return monthlyStudyTime;
      default:
        return 0;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      {progressData.map((item) => (
        <View key={item.type} style={styles.container}>
          <View style={styles.progressBox}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.targetText}>
                {`${item.label} target is: ${item.target}h`}
              </Text>
              <Text style={styles.targetText}>
                {`You have studied: ${formatTime(getStudyTime(item.type))}`}
              </Text>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, { width: `${item.progress}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{item.progress.toFixed(0)}%</Text>
          </View>
        </View>
      ))}
      <TargetButton />
      <TargetModal />
    </>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      gap: 20,
      paddingVertical: 24,
      paddingHorizontal: 16,
      backgroundColor: theme.surfaceContainerHigh,
      borderRadius: 16,
      width: "100%",
      // maxWidth: 600,
    },

    label: {
      fontSize: 18,
      marginBottom: 5,
      color: theme.onSurface,
      textAlign: "center",
      fontFamily: Typography.fontFamily.title,
    },
    progressBox: { gap: 16 },
    progressBarContainer: {
      width: "100%",
      flexDirection: "row",
    },
    progressBarBackground: {
      height: 30,
      width: "100%",
      backgroundColor: "white",
      borderRadius: 15,
      overflow: "hidden",
    },
    progressBarFill: {
      height: "100%",
      backgroundColor: "#06d474",
      borderRadius: 15,
    },
    progressText: {
      position: "absolute",
      top: 3,
      right: 10,
      fontSize: 18,
      fontFamily: Typography.fontFamily.button,
    },
    textContainer: {
      gap: 8,
    },
    targetText: {
      fontSize: 16,
      color: theme.onSurface,
      fontFamily: Typography.fontFamily.button,
      letterSpacing: 0.3,
    },
    buttonContainer: {
      width: "100%",
      //maxWidth: 600,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },
    buttonContainerCentered: {
      justifyContent: "center",
    },
  });

export default ProgressBoxes;
