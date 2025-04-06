import React from "react";
import { studyConfigStore, studyTimerStore } from "@/stores";
import { themeStore } from "@/stores/themeStore";
import Button from "@/components/button/Button";

type ControlButtonsProps = {
  handleRestart: (type: any) => void;
};

const RestartButton: React.FC<ControlButtonsProps> = ({ handleRestart }) => {
  const isConfigured = studyConfigStore((state) => state.isConfigured);
  const { theme } = themeStore();
  const isPaused = studyTimerStore((state) => state.isPaused);

  const isButtonDisabled = !isPaused || !isConfigured;
  return (
    <Button
      onPress={() => handleRestart("time")}
      disabled={isButtonDisabled}
      title={"Restart"}
      icon="replay"
      backgroundColor={
        isButtonDisabled ? theme.surfaceContainerHigh : theme.error
      }
      textColor={isButtonDisabled ? theme.onSurface : theme.onError}
    />
  );
};

export default RestartButton;
