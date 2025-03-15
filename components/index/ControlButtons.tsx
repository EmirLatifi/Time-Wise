import { View, StyleSheet } from "react-native";
import React, { memo, useMemo } from "react";

import { useThemeStore } from "@/store/useThemeStore";
import SaveStudyTimeButton from "./SaveStudyTimeButton";
import {
  useModalStore,
  useStudyConfigStore,
  useStudyTimerStore,
} from "@/store/useStudyStore";
import Button from "../button/Button";

type ControlButtonsProps = {
  handleStart: () => void;
  handlePause: () => void;
  handleRestart: (type: any) => void;
};

const ControlButtons: React.FC<ControlButtonsProps> = memo(
  ({ handleStart, handlePause, handleRestart }) => {
    const isActive = useStudyTimerStore((state) => state.isActive);
    const isConfigured = useStudyConfigStore((state) => state.isConfigured);
    const toggleModal = useModalStore((state) => state.toggleModal);
    const { theme } = useThemeStore();
    const isPaused = useStudyTimerStore((state) => state.isPaused);

    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={toggleModal}
            disabled={isConfigured}
            title={"SetUp"}
            backgroundColor={
              isConfigured ? theme.surfaceContainerHigh : theme.secondary
            }
            textColor={isConfigured ? theme.onSurface : theme.onSecondary}
            icon="add"
          />
          <Button
            onPress={isActive ? handlePause : handleStart}
            disabled={isConfigured === false}
            title={isActive ? "Pause" : "Start"}
            icon={isActive ? "pause" : "play-arrow"}
            backgroundColor={
              !isConfigured ? theme.surfaceContainerHigh : theme.primary
            }
            textColor={!isConfigured ? theme.onSurface : theme.onPrimary}
          />

          <Button
            onPress={() => handleRestart("time")}
            disabled={!isPaused || !isConfigured}
            title={"Restart"}
            icon="replay"
            backgroundColor={
              !isPaused || !isConfigured
                ? theme.surfaceContainerHigh
                : theme.error
            }
            textColor={
              !isPaused || !isConfigured ? theme.onSurface : theme.onError
            }
          />
        </View>
        <SaveStudyTimeButton />
      </View>
    );
  }
);

export default ControlButtons;

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      gap: 32,
      paddingTop: 24,
    },
    buttonsContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      gap: 16,
    },
  });
