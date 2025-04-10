import { useCallback, useEffect, useRef } from "react";
import {
  studyConfigStore,
  studyTimerStore,
  soundStore,
  alertStore,
  errorStore,
} from "@/stores";

export const useStudyTimer = () => {
  const { isActive, isPaused, breakCount, isBreakTime, setIsBreakTime, time } =
    studyTimerStore();
  const { studySettings } = studyConfigStore();
  const { playBreakSound, sound } = soundStore();
  const { showAlert } = alertStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      sound?.unloadAsync?.();
    };
  }, [sound]);

  const updateTimerState = useCallback(
    (newTime: number) => {
      const isExactMinute = newTime % 60 === 0;
      const elapsedMinutes = Math.floor(newTime / 60);

      const shouldBreak =
        elapsedMinutes > 0 &&
        isExactMinute &&
        elapsedMinutes % studySettings.timeBetweenBreaks === 0 &&
        breakCount < studySettings.numberOfBreaks;

      if (shouldBreak && !isBreakTime) {
        playBreakSound();
        return {
          time: newTime,
          isBreakTime: true,
          breakCount: breakCount + 1,
        };
      }

      return { time: newTime };
    },
    [studySettings, breakCount, isBreakTime, playBreakSound]
  );

  // Timer ticking
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        studyTimerStore.setState((state) => updateTimerState(state.time + 1));
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isActive, isPaused, updateTimerState]);

  // Break reminder
  useEffect(() => {
    if (!isBreakTime) return;

    const reminderInterval = setInterval(playBreakSound, 3000);
    return () => clearInterval(reminderInterval);
  }, [isBreakTime, playBreakSound]);

  // Handlers
  const handleResumeFromBreak = useCallback(() => {
    setIsBreakTime(false);
  }, [setIsBreakTime]);

  const handleStart = useCallback(() => {
    studyTimerStore.setState({ isActive: true, isPaused: false });
  }, []);

  const handlePause = useCallback(() => {
    studyTimerStore.setState({
      isActive: false,
      isPaused: true,
      isBreakTime: false,
    });
  }, []);

  const handleRestart = useCallback(() => {
    studyTimerStore.getState().reset();
    studyConfigStore.getState().reset();
    errorStore.getState().reset();
  }, []);

  const handleResetConfirmation = useCallback(() => {
    showAlert({
      type: "confirmation",
      title: "Reset Progress",
      message: "Are you sure you want to reset your study time and set up?",
      onConfirm: handleRestart,
    });
  }, [handleRestart, showAlert]);

  return {
    breakCount,
    isBreakTime,
    studySettings,
    handleResumeFromBreak,
    handleStart,
    handlePause,
    handleResetConfirmation,
  };
};
