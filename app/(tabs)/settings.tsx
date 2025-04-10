import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Settings from "@/components/settings/Settings";
import { themeStore } from "@/stores/themeStore";

const settings = () => {
  const { theme } = themeStore();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <Settings />
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.surface,
    },
  });
export default settings;
