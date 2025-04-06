import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Alert from "@/components/Alert";
import { themeStore } from "@/stores/themeStore";

export default function RootLayout() {
  const { theme } = themeStore();

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="black" />
      <Alert />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
