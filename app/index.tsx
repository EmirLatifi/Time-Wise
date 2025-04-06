import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const SplashScreen = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    });

    animation.start();

    const timer = setTimeout(() => {
      router.replace("/timer");
    }, 5000);

    return () => {
      clearTimeout(timer);
      progress.stopAnimation(); // Ensures animation stops when unmounting
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Time Wise App</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgb(30, 101, 134)",
  },
  text: {
    fontSize: 32,
    marginBottom: 20,
    color: "white",
  },
  progressBarContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressBarBackground: {
    height: 30,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#06d474",
    borderRadius: 15,
  },
});

export default SplashScreen;
