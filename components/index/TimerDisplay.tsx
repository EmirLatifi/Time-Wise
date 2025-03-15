import React, { useMemo, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";
import { useStudyTimerStore } from "@/store/useStudyStore";
import { LinearGradient } from "expo-linear-gradient";

const TimerDisplay = () => {
  const { time } = useStudyTimerStore();
  const { theme } = useThemeStore();

  const formatTime = useCallback((time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  }, []);

  const { hours, minutes, seconds } = useMemo(
    () => formatTime(time),
    [time, formatTime]
  );

  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.secondaryContainer, theme.tertiaryContainer]} // Define gradient colors
        start={{ x: 0, y: 0 }} // Top-left
        end={{ x: 1, y: 1 }} // Bottom-right
        style={styles.timerContainer}
      >
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{hours}</Text>
          <Text style={styles.timerLabel}>Hours</Text>
        </View>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{minutes}</Text>
          <Text style={styles.timerLabel}>Minutes</Text>
        </View>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{seconds}</Text>
          <Text style={styles.timerLabel}>Seconds</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TimerDisplay;

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: { paddingVertical: 24 },

    timerContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      borderRadius: 12,
      paddingVertical: 16,
      backgroundColor: theme.secondaryContainer,
    },

    timerBox: {
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      flex: 1,
    },

    timerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.onSurface,
    },

    timerLabel: {
      fontSize: 14,
      color: theme.onSurface,
      marginTop: 2,
    },

    startedAtTime: {
      fontSize: 18,
      textAlign: "center",
      marginTop: 16,
      color: theme.text,
    },
  });
