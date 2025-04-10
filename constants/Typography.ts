import { Platform } from "react-native";

export const Typography = {
  // Font Families
  fontFamily: {
    primary: Platform.select({
      ios: "Poppins-SemiBold",
      android: "Poppins-SemiBold",
      default: "Poppins-SemiBold",
    }),

    button: "Roboto-Regular",
    label: "Montserrat-Regular",
    title: "Poppins-Regular",
    header: "Inter-Regular",
    quote: "IbarraRealNova-Italic",
    quoteCredit: "IbarraRealNova-Regular",
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },

  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  textStyles: {
    body: {
      fontFamily: "primary",
      fontSize: "base",
      fontWeight: "regular",
      lineHeight: "normal",
    },
    button: {
      fontFamily: "button",
      fontSize: "sm",
      fontWeight: "semibold",
      lineHeight: "tight",
      letterSpacing: 1,
    },
    heading: {
      fontFamily: "primary",
      fontSize: "xl",
      fontWeight: "bold",
      lineHeight: "tight",
    },
    quote: {
      fontFamily: "quote",
      fontSize: "lg",
      lineHeight: "relaxed",
    },
    quoteCredit: {
      fontFamily: "quoteCredit",
      fontSize: "sm",
      fontWeight: "semibold",
    },
    error: {
      fontFamily: "primary",
      fontSize: "sm",
      fontWeight: "medium",
      lineHeight: "normal",
    },
    alert: {
      fontFamily: "primary",
      fontSize: "base",
      fontWeight: "medium",
      lineHeight: "normal",
    },
  },
};
