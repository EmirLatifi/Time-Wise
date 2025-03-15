import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import Button from "../button/Button";
import { useThemeStore } from "@/store/useThemeStore";
import { useRouter } from "expo-router";

const ProgressButton = () => {
  const { theme } = useThemeStore();
  const router = useRouter();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleNavigate = () => {
    router.push("/progress");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleNavigate}
          title={"Progress"}
          backgroundColor={theme.secondary}
          textColor={theme.onSecondary}
        />
      </View>
    </View>
  );
};

const getStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      marginTop: 24,
      justifyContent: "flex-end",
    },
    buttonContainer: {
      width: 100,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
  });
};
export default ProgressButton;
