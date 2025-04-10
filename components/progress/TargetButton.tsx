import { View, StyleSheet } from "react-native";
import React from "react";
import { themeStore } from "@/stores/themeStore";
import { progressModalStore } from "@/stores";
import LargeButton from "../button/LargeButton";

const TargetButton = () => {
  const { theme } = themeStore();
  const { toggleProgressModal } = progressModalStore();

  return (
    <View style={[styles.buttonContainer]}>
      <LargeButton
        onPress={() => toggleProgressModal("daily")}
        backgroundColor={theme.primary}
        textColor={theme.onPrimary}
        title="Target"
        icon="ads-click"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    maxWidth: 600,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default TargetButton;
