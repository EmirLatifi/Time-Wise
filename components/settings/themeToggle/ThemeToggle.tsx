import React, { useMemo } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { themeStore } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/constants/Typography";

export function ThemeToggle() {
  const { colorScheme, setColorScheme, theme } = themeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {colorScheme === "dark" ? "Dark mode" : "Light mode"}
      </Text>

      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons
          name={colorScheme === "dark" ? "moon" : "sunny"}
          size={32}
          color={theme.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 18,
      color: theme.onSurface,
      fontFamily: Typography.fontFamily.label,
    },
    icon: {
      padding: 8,
    },

    toggleText: {
      fontSize: 20,
      fontWeight: "600",
    },
  });
