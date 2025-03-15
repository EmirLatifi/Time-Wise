import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface NotificationProps {
  type: "error" | "info" | "success" | "warning";
  title: string;
  subtitle?: string;
  onClose: () => void;
  visible: boolean;
}

const getIconName = (type: NotificationProps["type"]) => {
  switch (type) {
    case "error":
      return "error";
    case "success":
      return "check-circle";
    case "warning":
      return "warning";
    case "info":
      return "info";
  }
};

const getBackgroundColor = (type: NotificationProps["type"]) => {
  switch (type) {
    case "error":
      return "#fa4d56";
    case "success":
      return "#42be65";
    case "warning":
      return "#f1c21b";
    case "info":
      return "#4589ff";
  }
};

const Notification = ({
  type,
  title,
  subtitle,
  onClose,
  visible,
}: NotificationProps) => {
  if (!visible) return null;

  return (
    <View
      style={[styles.container, { backgroundColor: getBackgroundColor(type) }]}
    >
      <View style={styles.content}>
        <MaterialIcons
          name={getIconName(type)}
          size={24}
          color="white"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <MaterialIcons name="close" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "60%",
    flexDirection: "row",
    position: "absolute",
    top: 200,
    right: 15,
    padding: 8,
    borderRadius: 4,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
  closeButton: {
    padding: 4,
  },
});

export default Notification;
