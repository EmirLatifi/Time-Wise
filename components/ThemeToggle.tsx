import React, { useMemo } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useThemeStore();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Switch
      trackColor={{ false: "white", true: "black" }}
      ios_backgroundColor="black"
      onValueChange={toggleTheme}
      value={colorScheme === "dark"}
      thumbColor={colorScheme === "light" ? "white" : "black"}
    />
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    zIndex: 10000,
  },
});
