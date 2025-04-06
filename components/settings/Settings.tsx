import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemeToggle } from "../ThemeToggle";
import { themeStore } from "@/stores/themeStore";
import { SoundToggle } from "../soundToggle/SoundToggle";
import { soundStore } from "@/stores";

const Settings = () => {
  const { theme, colorScheme } = themeStore();
  const { isSoundOn } = soundStore();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.modeContainer}>
        <Text style={styles.modeText}>
          {colorScheme === "dark" ? "Dark Mode" : "Light Mode"}
        </Text>
        <ThemeToggle />
      </View>
      <View style={styles.modeContainer}>
        <Text style={styles.modeText}>
          {isSoundOn === true ? "Break sound on" : "Break sound off"}
        </Text>
        <SoundToggle />
      </View>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginTop: 32,
      gap: 32,
    },
    modeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    modeText: {
      fontSize: 18,
      color: theme.onSurface,
      fontWeight: 600,
    },
  });
export default Settings;
