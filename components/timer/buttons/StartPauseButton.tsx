import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/button/Button";
import { studyConfigStore, studyTimerStore } from "@/stores";
import { themeStore } from "@/stores/themeStore";

type ControlButtonsProps = {
  handleStart: () => void;
  handlePause: () => void;
};

const StartPauseButton: React.FC<ControlButtonsProps> = ({
  handlePause,
  handleStart,
}) => {
  const isActive = studyTimerStore((state) => state.isActive);
  const isConfigured = studyConfigStore((state) => state.isConfigured);
  const { theme } = themeStore();

  return (
    <Button
      onPress={isActive ? handlePause : handleStart}
      disabled={!isConfigured}
      title={isActive ? "Pause" : "Start"}
      icon={isActive ? "pause" : "play-arrow"}
      backgroundColor={
        !isConfigured ? theme.surfaceContainerHigh : theme.primary
      }
      textColor={!isConfigured ? theme.onSurface : theme.onPrimary}
    />
  );
};

export default StartPauseButton;
