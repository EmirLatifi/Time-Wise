import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { loadingStore } from "@/stores/loadingStore";

const Loader = () => {
  const { isLoading, text } = loadingStore();

  if (!isLoading) return null;

  return (
    <View style={styles.fullScreenLoader}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenLoader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgb(255,255,255)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Loader;
