import React, { useMemo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  borderWidth?: number;
  borderColor?: string;
}

const LargeButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  icon,
  backgroundColor = "#6200EE",
  textColor = "white",
  disabled,
  borderColor,
  borderWidth,
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(
    () => getStyles(width, borderWidth, borderColor),
    [width, borderWidth, borderColor]
  );

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={18}
          color={textColor}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (screenWidth: number, borderWidth: any, borderColor: any) => {
  return StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      paddingHorizontal: screenWidth > 600 ? 20 : 16,
      borderRadius: 20,
      borderWidth: borderWidth ?? 0,
      borderColor: borderColor ?? "transparent",
      minWidth: "100%",
      maxWidth: 200,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.28,
      shadowRadius: 2,
      // Shadow for Android
      elevation: 6,
    },
    text: {
      fontSize: 14,
      textAlign: "center",
      lineHeight: 20,
    },
    icon: {
      marginRight: 6,
    },
  });
};

export default LargeButton;
