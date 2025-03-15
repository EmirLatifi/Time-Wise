import { useCallback, useEffect, useRef } from "react";
import {
  useStudyTimerStore,
  useStudyConfigStore,
  useSoundStore,
} from "@/store/useStudyStore";

export const useTimer = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const { isActive, isPaused, breakCount, isBreakTime } = useStudyTimerStore();
  const { studySettings } = useStudyConfigStore();
  const { playBreakSound } = useSoundStore();

  // Timer logic
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        const currentState = useStudyTimerStore.getState();
        const newTime = currentState.time + 1;
        useStudyTimerStore.setState({
          ...updateTimerState(newTime),
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [isActive, isPaused]);

  const updateTimerState = (newTime: number) => {
    const isExactMinute = newTime % 60 === 0;
    const elapsedMinutes = Math.floor(newTime / 60);

    const shouldBreak =
      elapsedMinutes > 0 &&
      isExactMinute &&
      elapsedMinutes % studySettings.breakInterval === 0 &&
      breakCount < studySettings.breakFrequency;

    if (shouldBreak && !isBreakTime) {
      playBreakSound();
      return {
        time: newTime,
        isBreakTime: true,
        breakCount: breakCount + 1,
      };
    }
    return { time: newTime };
  };

  return {
    intervalRef,
  };
};
