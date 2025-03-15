import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/useThemeStore";
import {
  useAlertStore,
  useProgressModalStore,
  useStudyStore,
} from "@/store/useStudyStore";
import TargetModal from "./TargetModal";

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
  const { theme } = useThemeStore();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { toggleProgressModal } = useProgressModalStore();
  const { showAlert } = useAlertStore();
  const {
    dailyStudyTime,
    weeklyStudyTime,
    monthlyStudyTime,
    fetchStudyTimes,
    resetDailyStudyTime,
    resetMonthlyStudyTime,
    resetWeeklyStudyTime,
  } = useStudyStore();

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

  const handleReset = (type: string) => {
    switch (type) {
      case "daily":
        resetDailyStudyTime();
        break;
      case "weekly":
        resetWeeklyStudyTime();
        break;
      case "monthly":
        resetMonthlyStudyTime();
        break;
      default:
        break;
    }
  };

  const handleResetConfirmation = (type: string) => {
    showAlert({
      type: "confirmation",
      title: "Reset Progress",
      message: `Are you sure you want to reset your ${type} progress?`,
      onConfirm: () => handleReset(type),
    });
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
            <View>
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

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => toggleProgressModal(item.type)}
            >
              <MaterialIcons
                name="ads-click"
                size={24}
                color={theme.primaryText}
              />
              <Text style={styles.buttonText}>Target</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                { backgroundColor: theme.secondaryButton },
              ]}
              onPress={() => handleResetConfirmation(item.type)}
            >
              <MaterialIcons
                name="replay"
                size={24}
                color={theme.primaryText}
              />
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
          </View>
        </View>
      ))}
      <TargetModal />
    </>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      gap: 20,
      padding: 16,
      backgroundColor: theme.secondaryColor,
      borderRadius: 16,
    },

    label: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 5,
      color: theme.text,
      textAlign: "center",
    },
    progressBox: { gap: 8 },
    progressBarContainer: {
      width: "100%",
      flexDirection: "row",
      gap: 8,
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
      backgroundColor: "red",
      borderRadius: 15,
    },
    progressText: {
      position: "absolute",
      top: -3,
      right: 10,
      marginTop: 5,
      fontSize: 18,
      fontWeight: 600,
      color: theme.text,
    },
    targetText: {
      fontSize: 16,
      fontWeight: 600,
      color: theme.text,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      backgroundColor: theme.primaryColor,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    buttonText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 4,
    },
  });

export default ProgressBoxes;
