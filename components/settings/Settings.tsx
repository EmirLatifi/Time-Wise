import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemeToggle } from "./themeToggle/ThemeToggle";
import { themeStore } from "@/stores/themeStore";
import { SoundToggle } from "./soundToggle/SoundToggle";

const Settings = () => {
  const { theme, colorScheme } = themeStore();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <ThemeToggle />
      <SoundToggle type="sound" title="Break sound" />
      <SoundToggle type="vibration" title="Vibrate" />
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
  });
export default Settings;
