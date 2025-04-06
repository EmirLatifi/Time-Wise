import { StyleSheet } from "react-native";

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      gap: 32,
      paddingTop: 24,
      marginBottom: 16,
    },
    buttonsContainer: {
      width: "100%",
      maxWidth: 600,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      gap: 8,
    },
    saveButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      maxWidth: 600,
    },
    timeDisplay: {
      fontSize: 24,
    },
    saveButton: {
      width: "100%",
      maxWidth: 400,
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      backgroundColor: theme.primary,
      borderRadius: 20,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      // Shadow for Android
      elevation: 6,
    },
    saveButtonText: {
      color: theme.onPrimary,
      fontSize: 14,
      textAlign: "center",
      lineHeight: 20,
    },
    disabledButton: {
      opacity: 0.7,
    },
  });
