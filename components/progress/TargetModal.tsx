import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useRef, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useThemeStore } from "@/store/useThemeStore";
import {
  useErrorStore,
  useProgressModalStore,
  useStudyConfigStore,
  useTargetStore,
} from "@/store/useStudyStore";

const TargetModal = () => {
  const { toggleProgressModal, isModalVisible, targetType } =
    useProgressModalStore();
  const {
    dailyTarget,
    weeklyTarget,
    monthlyTarget,
    setDailyTarget,
    setWeeklyTarget,
    setMonthlyTarget,
  } = useTargetStore();
  const { errors, setErrors } = useErrorStore();

  const viewRef = useRef<Animatable.View>(null);
  const { theme } = useThemeStore();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  const targetRef = useRef("");

  useEffect(() => {
    targetRef.current = getCurrentTarget().toString();
  }, [targetType, dailyTarget, weeklyTarget, monthlyTarget]);

  const getCurrentTarget = () => {
    switch (targetType) {
      case "daily":
        return dailyTarget;
      case "weekly":
        return weeklyTarget;
      case "monthly":
        return monthlyTarget;
      default:
        return 0;
    }
  };

  const handleTargetChange = (value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    targetRef.current = value;
    // Clear any existing errors
    setErrors({ ...errors, targetError: false });
  };

  const getErrorMessage = () => {
    switch (targetType) {
      case "daily":
        return "Daily target cannot be greater than weekly target";
      case "weekly":
        return "Weekly target must be between daily and monthly targets";
      case "monthly":
        return "Monthly target cannot be less than weekly target";
      default:
        return "";
    }
  };

  const handleClose = async () => {
    if (viewRef.current) {
      await viewRef.current?.animate("fadeOutLeft", 300);
      setErrors({
        targetError: false,
      });
      toggleProgressModal();
    }
  };

  const saveTarget = () => {
    const numValue = parseInt(targetRef.current) || 0;
    let isValid = true;

    switch (targetType) {
      case "daily":
        if (numValue > weeklyTarget) {
          isValid = false;
        }
        break;
      case "weekly":
        if (numValue < dailyTarget || numValue > monthlyTarget) {
          isValid = false;
        }
        break;
      case "monthly":
        if (numValue < weeklyTarget) {
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      setErrors({ ...errors, targetError: true });
      return;
    }

    // Set the appropriate target
    switch (targetType) {
      case "daily":
        setDailyTarget(numValue);
        break;
      case "weekly":
        setWeeklyTarget(numValue);
        break;
      case "monthly":
        setMonthlyTarget(numValue);
        break;
    }

    useStudyConfigStore.setState({ isConfigured: true });
    toggleProgressModal();
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animatable.View
        ref={viewRef}
        animation="fadeInLeft"
        duration={300}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.targetModalInputDiv}>
            <Text style={styles.targetModalInputText}>
              Set {targetType} target
            </Text>
            <View>
              <TextInput
                style={[
                  styles.targetModalInput,
                  errors.targetError && { borderColor: "red" },
                ]}
                keyboardType="numeric"
                defaultValue={targetRef.current}
                onChangeText={handleTargetChange}
                maxLength={2}
              />
              {errors.targetError && (
                <Text style={styles.errorText}>{getErrorMessage()}</Text>
              )}
            </View>
          </View>

          <View style={styles.buttonsDiv}>
            <Pressable style={styles.button} onPress={saveTarget}>
              <Text style={styles.buttonText}>Add target</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Animatable.View>
    </Modal>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
      paddingHorizontal: 32,
    },
    modalView: {
      width: "100%",
      backgroundColor: theme.buttonColor,
      borderRadius: 20,
      padding: 32,
      gap: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    targetModalInputDiv: {
      gap: 8,
    },
    targetModalInputText: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
    },
    targetModalInput: {
      padding: 8,
      fontSize: 16,
      borderRadius: 4,
      backgroundColor: "white",
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginTop: 10,
    },
    buttonsDiv: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      minWidth: 80,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 8,
      backgroundColor: theme.tint,
    },
    buttonText: {
      textAlign: "center",
      color: theme.text,
    },
  });

export default TargetModal;
