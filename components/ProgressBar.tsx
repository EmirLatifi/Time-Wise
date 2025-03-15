// @ts-ignore
import ProgressBar from "react-native-progress/Bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useProgressStore } from "@/store/useStudyStore";

const ProgressBarComponent = () => {
  const { progress } = useProgressStore();

  return (
    <View style={styles.progressContainer}>
      <ProgressBar
        progress={progress}
        width={300}
        color="#4CAF50"
        borderRadius={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginTop: 16,
    alignItems: "center",
  },
});

export default ProgressBarComponent;
