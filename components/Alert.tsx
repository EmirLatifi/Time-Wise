import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { alertStore } from "@/stores";
import { themeStore } from "@/stores/themeStore";
import Button from "./button/Button";

const Alert = () => {
  const { theme } = themeStore();
  const { isVisible, type, title, message, onConfirm, onCancel, hideAlert } =
    alertStore();

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    hideAlert();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    hideAlert();
  };

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.alertBox, { backgroundColor: theme.surface }]}>
          <Text style={[styles.title, { color: theme.onSurface }]}>
            {title}
          </Text>
          <Text style={[styles.message, { color: theme.onSurface }]}>
            {message}
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleConfirm}
              backgroundColor={theme.primary}
              textColor={theme.onPrimary}
              title="Yes"
            />

            {type === "confirmation" && (
              <Button
                onPress={handleCancel}
                backgroundColor={theme.error}
                textColor={theme.onError}
                title="No"
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 100,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Alert;
