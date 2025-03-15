import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import TimerDisplay from "@/components/index/TimerDisplay";
import Notification from "@/components/Notification";
import {
  useAlertStore,
  useErrorStore,
  useSoundStore,
  useStudyConfigStore,
  useStudyTimerStore,
} from "@/store/useStudyStore";
import QuoteComponent from "@/components/index/QuoteComponent";
import { useThemeStore } from "@/store/useThemeStore";
import ControlButtons from "@/components/index/ControlButtons";
import StudySettingsModal from "@/components/index/StudySettingsModal";
import ProgressButton from "@/components/index/ProgressButton";
import { ThemeToggle } from "@/components/ThemeToggle";

const Home = () => {
  const { theme } = useThemeStore();
  const { isActive, isPaused, breakCount, isBreakTime, setIsBreakTime } =
    useStudyTimerStore();
  const { studySettings } = useStudyConfigStore();
  const { sound, playBreakSound } = useSoundStore();
  const { showAlert } = useAlertStore();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const styles = useMemo(() => getStyles(theme), [theme]);

  // Cleanup sound when component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Timer logic: Start or pause the timer based on `isActive` and `isPaused`
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        useStudyTimerStore.setState((state) => {
          const newTime = state.time + 1; // Increment time by 1 second
          return updateTimerState(newTime); // Update timer state
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval if timer is paused or inactive
      intervalRef.current = undefined;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Cleanup interval on component unmount
        intervalRef.current = undefined;
      }
    };
  }, [isActive, isPaused]);

  // Function to update timer state and check if it's time for a break
  const updateTimerState = (newTime: number) => {
    const isExactMinute = newTime % 60 === 0; // Check if the time is an exact minute
    const elapsedMinutes = Math.floor(newTime / 60); // Calculate elapsed minutes

    // Check if it's time for a break based on elapsed seconds
    const shouldBreak =
      elapsedMinutes > 0 &&
      isExactMinute &&
      elapsedMinutes % studySettings.breakInterval === 0 &&
      breakCount < studySettings.breakFrequency;

    if (shouldBreak && !isBreakTime) {
      playBreakSound(); // Play break sound if it's time for a break
      return {
        time: newTime,
        isBreakTime: true, // Set break time to true
        breakCount: breakCount + 1, // Increment break count
      };
    }
    return { time: newTime };
  };

  // Play break sound repeatedly during break time
  useEffect(() => {
    let reminderInterval: ReturnType<typeof setInterval>;

    if (isBreakTime) {
      reminderInterval = setInterval(() => {
        playBreakSound(); // Play break sound every 3 seconds during break
      }, 3000);
    }

    return () => {
      if (reminderInterval) {
        clearInterval(reminderInterval); // Cleanup interval on component unmount
      }
    };
  }, [isBreakTime, playBreakSound]);

  // Callback to resume from break
  const handleResumeFromBreak = useCallback(() => {
    setIsBreakTime(false); // End break time
  }, [setIsBreakTime]);

  // Callback to start the timer
  const handleStart = useCallback(() => {
    useStudyTimerStore.setState({
      isActive: true,
      isPaused: false,
    });
  }, []);

  // Callback to pause the timer
  const handlePause = useCallback(() => {
    useStudyTimerStore.setState({
      isActive: false,
      isPaused: true,
      isBreakTime: false,
    });
  }, []);

  // Function to restart the timer and reset all states
  const handleRestart = () => {
    useStudyTimerStore.getState().reset();
    useStudyConfigStore.getState().reset();
    useErrorStore.getState().reset();
  };

  const handleResetConfirmation = (type: string) => {
    showAlert({
      type: "confirmation",
      title: "Reset Progress",
      message: `Are you sure you want to reset your study time and set up?`,
      onConfirm: handleRestart,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Notification for break time */}
      <Notification
        visible={isBreakTime}
        type="info"
        title="Time for a Break!"
        subtitle={`Break ${breakCount} of ${studySettings.breakFrequency}`}
        onClose={handleResumeFromBreak}
      />

      <View style={styles.container}>
        <View style={styles.toggle}>
          <ThemeToggle />
        </View>
        <TimerDisplay />
        <ControlButtons
          handleStart={handleStart}
          handlePause={handlePause}
          handleRestart={handleResetConfirmation}
        />
        <StudySettingsModal />
        <QuoteComponent />
        <ProgressButton />
      </View>
    </View>
  );
};

// Function to generate styles based on the current theme
const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surface,
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    topSection: {
      backgroundColor: "#7D3C98", // Change this to any color you want
      height: 150,
    },
    toggle: {
      width: "100%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
  });

export default Home;
