import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Colors } from "@/constants/Colors";
import { Appearance } from "react-native";

type ColorScheme = "light" | "dark" | null | undefined;

interface ThemeState {
  colorScheme: ColorScheme;
  theme: typeof Colors.light | typeof Colors.dark;
  setColorScheme: (scheme: ColorScheme) => void;
}

export const themeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: Appearance.getColorScheme(),
      theme:
        Appearance.getColorScheme() === "dark" ? Colors.dark : Colors.light,
      setColorScheme: (scheme) =>
        set({
          colorScheme: scheme,
          theme: scheme === "dark" ? Colors.dark : Colors.light,
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);
