import { Stack } from "expo-router";
import "react-native-reanimated";
import { ThemeProvider } from "@/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Alert from "@/components/test";
import { useThemeStore } from "@/store/useThemeStore";
import * as NavigationBar from "expo-navigation-bar"; // Import the package
import { ThemeToggle } from "@/components/ThemeToggle";
import { View } from "react-native";

export default function RootLayout() {
  const { theme } = useThemeStore();

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor="black" />
        <Alert />

        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="progress"
            options={{
              title: "Progress",
              headerTitleAlign: "center",
              headerRight: () => (
                <View>
                  <ThemeToggle />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="+not-found"
            options={{
              title: "Not Found",
              headerTitleAlign: "center",
              headerRight: () => (
                <View>
                  <ThemeToggle />
                </View>
              ),
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
