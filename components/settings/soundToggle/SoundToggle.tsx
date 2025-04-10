import React, { useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { themeStore } from "@/stores/themeStore";
import { soundStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/constants/Typography";

type SoundToggleProps = {
  type: "sound" | "vibration";
  title: string;
};

export const SoundToggle: React.FC<SoundToggleProps> = ({ type, title }) => {
  const { theme } = themeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { isSoundOn, toggleSound, vibrate, toggleVibrate } = soundStore();

  const isEnabled = type === "sound" ? isSoundOn : vibrate;
  const toggleFunction = type === "sound" ? toggleSound : toggleVibrate;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {type === "sound" ? (
        <TouchableOpacity onPress={toggleFunction}>
          <Ionicons
            name={isEnabled ? "volume-high" : "volume-mute"}
            size={32}
            color={isSoundOn ? theme.primary : theme.error}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleFunction}>
          <Text
            style={[
              styles.toggleText,
              { color: isEnabled ? theme.primary : theme.error },
            ]}
          >
            {isEnabled ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

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
      fontFamily: Typography.fontFamily.button,
    },
  });
