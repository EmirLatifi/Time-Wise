import { View, StyleSheet, ScrollView } from "react-native";
import React, { useMemo } from "react";
import TimerDisplay from "@/components/timer/TimerDisplay";
import Notification from "@/components/Notification";
import QuoteComponent from "@/components/timer/QuoteComponent";
import BreaksModal from "@/components/timer/BreaksModal";
import ControlButtons from "@/components/timer/buttons/ControlButtons";
import { themeStore } from "@/stores/themeStore";
import { useStudyTimer } from "@/hooks/useStudyTimer";
import Loader from "@/components/loader/Loader";

const timer = () => {
  const { theme } = themeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const {
    breakCount,
    isBreakTime,
    breaksSettings,
    handleResumeFromBreak,
    handleStart,
    handlePause,
    handleResetConfirmation,
  } = useStudyTimer();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Notification
        visible={isBreakTime}
        type="info"
        title="Time for a Break!"
        subtitle={`Break ${breakCount} of ${breaksSettings.numberOfBreaks}`}
        onClose={handleResumeFromBreak}
      />

      <View style={styles.container}>
        <TimerDisplay />
        <ControlButtons
          handleStart={handleStart}
          handlePause={handlePause}
          handleRestart={handleResetConfirmation}
        />
        <BreaksModal />
        <QuoteComponent />
        <Loader />
      </View>
    </ScrollView>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.surface,
      paddingHorizontal: 16,
    },
  });

export default timer;
