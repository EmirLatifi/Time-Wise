import React, { useMemo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Typography } from "@/constants/Typography";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  icon,
  backgroundColor = "#6200EE",
  textColor = "white",
  disabled,
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(
    () => getStyles(width, backgroundColor, textColor),
    [width, backgroundColor, textColor]
  );

  return (
    <TouchableOpacity
      style={styles.button}
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
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (
  screenWidth: number,
  backgroundColor: any,
  textColor: any
) => {
  return StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      backgroundColor: backgroundColor,
      paddingHorizontal: screenWidth > 600 ? 20 : 16,
      borderRadius: 20,
      width: 100,
      maxWidth: 300,
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
      color: textColor,
      letterSpacing: 1,
      fontFamily: Typography.fontFamily.button,
    },
    icon: {
      marginRight: 6,
    },
  });
};

export default Button;
