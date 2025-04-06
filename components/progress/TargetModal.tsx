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
import { themeStore } from "@/stores/themeStore";
import { progressModalStore, studyConfigStore, targetStore } from "@/stores";
import Button from "../button/Button";

const TargetModal = () => {
  const { toggleProgressModal, isModalVisible, targetType } =
    progressModalStore();
  const { dailyTarget, weeklyTarget, monthlyTarget, setDailyTarget } =
    targetStore();

  const viewRef = useRef<Animatable.View>(null);
  const { theme } = themeStore();
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
  };

  const handleClose = async () => {
    if (viewRef.current) {
      await viewRef.current?.animate("fadeOutLeft", 300);
      toggleProgressModal();
    }
  };

  const saveTarget = () => {
    const numValue = parseInt(targetRef.current) || 0;
    setDailyTarget(numValue);

    studyConfigStore.setState({ isConfigured: true });
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
            <Text style={styles.targetModalInputText}>Set daily target</Text>
            <View>
              <TextInput
                style={styles.targetModalInput}
                keyboardType="numeric"
                defaultValue={targetRef.current}
                onChangeText={handleTargetChange}
                maxLength={3}
              />
            </View>
          </View>

          <View style={styles.buttonsDiv}>
            <Button
              onPress={saveTarget}
              backgroundColor={theme.primary}
              textColor={theme.onPrimary}
              title="Add"
            />

            <Button
              onPress={handleClose}
              backgroundColor={theme.secondary}
              textColor={theme.onSecondary}
              title="Close"
            />
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
      backgroundColor: "rgba(0,0,0,0.9)",
      paddingHorizontal: 16,
    },
    modalView: {
      width: "100%",
      backgroundColor: theme.surface,
      borderRadius: 20,
      paddingVertical: 32,
      paddingHorizontal: 32,
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
      color: theme.onSurface,
    },
    targetModalInput: {
      padding: 8,
      fontSize: 16,
      backgroundColor: "white",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.outline,
    },
    errorText: {
      color: theme.error,
      fontSize: 14,
      marginTop: 10,
    },
    buttonsDiv: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

export default TargetModal;
