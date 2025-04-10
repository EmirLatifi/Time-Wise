import { View } from "react-native";
import React, { memo, useMemo } from "react";
import { themeStore } from "@/stores/themeStore";
import SaveStudyTimeButton from "./SaveStudyTimeButton";
import { getStyles } from "./styles";
import BreaksButton from "./BreaksButton";
import StartPauseButton from "./StartPauseButton";
import RestartButton from "./RestartButton";

type ControlButtonsProps = {
  handleStart: () => void;
  handlePause: () => void;
  handleRestart: (type: any) => void;
};

const ControlButtons: React.FC<ControlButtonsProps> = memo(
  ({ handleStart, handlePause, handleRestart }) => {
    const { theme } = themeStore();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <BreaksButton />
          <StartPauseButton
            handleStart={handleStart}
            handlePause={handlePause}
          />
          <RestartButton handleRestart={handleRestart} />
        </View>
        <SaveStudyTimeButton />
      </View>
    );
  }
);

export default ControlButtons;
