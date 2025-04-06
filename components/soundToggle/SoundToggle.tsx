import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { themeStore } from "@/stores/themeStore";
import { soundStore } from "@/stores";

export function SoundToggle() {
  const { theme } = themeStore();
  const { isSoundOn, toggleSound } = soundStore();

  return (
    <Switch
      trackColor={{ false: theme.secondary, true: theme.secondary }}
      ios_backgroundColor="black"
      onValueChange={toggleSound}
      value={isSoundOn}
      thumbColor={isSoundOn === false ? theme.error : "rgb(144, 206, 244)"}
    />
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    zIndex: 10000,
  },
});
