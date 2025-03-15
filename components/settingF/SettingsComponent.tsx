import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import React, { useMemo } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { ThemeToggle } from "../ThemeToggle";
import { MaterialIcons } from "@expo/vector-icons";

const SettingsComponent = () => {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>General</Text>

      <View style={styles.volumeContainer}>
        <Text style={styles.volumeText}>Volume Control</Text>
        <Pressable>
          <MaterialIcons name="arrow-forward" size={24} color={theme.text} />
        </Pressable>
      </View>
      <View style={styles.volumeContainer}>
        <Text style={styles.volumeText}>Volume Control</Text>
        <Pressable>
          <MaterialIcons name="arrow-forward" size={24} color={theme.text} />
        </Pressable>
      </View>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      gap: 24,
      paddingVertical: 16,
    },
    volumeContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.text,
    },
    volumeText: {
      fontSize: 18,
      fontWeight: "500",
      color: theme.text,
    },
  });

export default SettingsComponent;
