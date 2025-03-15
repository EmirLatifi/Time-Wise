import React, { useMemo } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/useThemeStore";

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  borderWidth?: number;
  borderColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  icon,
  backgroundColor = "#6200EE",
  textColor = "white",
  disabled,
  borderColor,
  borderWidth,
}) => {
  const { theme } = useThemeStore();
  const styles = getStyles(borderWidth, borderColor);
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

const getStyles = (borderWidth: any, borderColor: any) => {
  return StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      borderRadius: 20,
      borderWidth: borderWidth,
      borderColor: borderColor,
      // shadowColor: "black",
      // shadowOffset: {
      //   width: 0,
      //   height: 3,
      // },
      // shadowOpacity: 0.3,
      // shadowRadius: 3,
      // // Shadow for Android
      // elevation: 6,
      flex: 1,
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

export default Button;
