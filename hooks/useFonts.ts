import { useFonts } from "expo-font";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "IbarraRealNova-Italic": require("@/assets/fonts/IbarraRealNova-Italic.ttf"),
    "IbarraRealNova-Regular": require("@/assets/fonts/IbarraRealNova-Regular.ttf"),
  });

  return fontsLoaded;
};
