import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { themeStore } from "@/stores/themeStore";

export function ThemeToggle() {
  const { colorScheme, setColorScheme, theme } = themeStore();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Switch
      trackColor={{ false: theme.secondary, true: theme.secondary }}
      ios_backgroundColor="black"
      onValueChange={toggleTheme}
      value={colorScheme === "dark"}
      thumbColor={colorScheme === "light" ? "rgb(30, 101, 134)" : "black"}
    />
  );
}
